import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import {
  personaById,
  scoreSubmission,
  assertConfigValid,
  ATHLETE_CONFIG,
  ORGANIZATION_CONFIG,
  resolveTier,
  type AudienceValue,
} from "@/lib/commercial-score";
import { BUYING_INTENT_IDS } from "@/lib/commercial-score/intents";
import { buildUserEmail, buildAdminEmail } from "@/lib/commercial-score/emails";
import { buildRecord, persist, markCtaClicked } from "@/lib/commercial-score/storage";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 15;

// A drifted weight set would skew every score without ever throwing, so both
// configs are checked once at module load rather than trusted.
assertConfigValid(ATHLETE_CONFIG);
assertConfigValid(ORGANIZATION_CONFIG);

// Looser than the Self-Audit's 3/30min because there is no PDF to generate, so
// a request is cheap - but not unlimited: every submission sends two emails and
// the Resend free tier caps at 100 a day, which one abusive IP could exhaust.
const RATE_LIMIT = 6;
const RATE_WINDOW_MS = 30 * 60 * 1000;

const AudienceValueSchema = z.union([
  z.number().int().min(0).max(1_000_000_000),
  z.literal("n/a"),
  z.null(),
]);

const SubmitSchema = z.object({
  persona: z.enum(["athlete", "organization"]),
  context: z.object({
    discipline: z.string().trim().min(2).max(80),
    // Nullable: personas that derive the tier from an answer never send one,
    // and the value is recomputed server-side regardless.
    tier: z
      .enum(["lokalny", "regionalny", "ogolnopolski", "miedzynarodowy"])
      .nullable()
      .optional(),
  }),
  answers: z.record(z.string(), z.number().int().min(1).max(5)),
  audience: z.record(z.string(), AudienceValueSchema),
  lead: z.object({
    name: z.string().trim().min(2, "Podaj imię i nazwisko").max(120),
    email: z.string().trim().email("Niepoprawny adres email").max(200),
    entityName: z.string().trim().min(2, "Podaj nazwę").max(200),
    phone: z.string().trim().max(40).optional().default(""),
    buyingIntent: z.enum(BUYING_INTENT_IDS),
    consent: z.boolean().refine((v) => v === true, {
      message: "Wymagana zgoda na otrzymanie wyniku",
    }),
    consentMarketing: z.boolean(),
    /**
     * Honeypot. Accepts any string on purpose: rejecting a filled one in the
     * schema would answer the bot with a 400 telling it which field it got
     * wrong. It is checked below instead, and a hit is accepted silently.
     */
    website: z.string().max(200).optional(),
  }),
  funnel: z.object({
    startedAt: z.string().nullable(),
    completedAt: z.string().nullable(),
  }),
});

const PatchSchema = z.object({
  // Addressed by opaque id rather than by email so this endpoint can never be
  // used to probe whether a given address is in the system. With no store wired
  // up the id is always null and the client skips the call entirely; the seam
  // stays so turning storage back on needs no change here.
  submissionId: z.string().trim().min(6).max(64),
  ctaClicked: z.enum(["audit", "contact"]),
});

export async function POST(req: Request) {
  const rl = rateLimit(getClientIp(req), RATE_LIMIT, RATE_WINDOW_MS);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Zbyt wiele zgłoszeń. Spróbuj ponownie za kilka minut." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Niepoprawny format danych" }, { status: 400 });
  }

  const parsed = SubmitSchema.safeParse(json);
  if (!parsed.success) {
    console.error(
      "[commercial-score] walidacja:",
      JSON.stringify(parsed.error.issues.slice(0, 3))
    );
    // Zod's own fallback is the English "Invalid input", which would surface in
    // a Polish interface. Only messages written here are shown to the visitor.
    const written = parsed.error.issues.find(
      (i) => i.message && i.message !== "Invalid input"
    );
    return NextResponse.json(
      { error: written?.message ?? "Niepoprawne dane formularza" },
      { status: 400 }
    );
  }

  const { persona, context, answers, audience, lead, funnel } = parsed.data;

  // Honeypot caught a bot: accept silently so it learns nothing, send nothing.
  if (lead.website && lead.website.length > 0) {
    return NextResponse.json({ success: true });
  }

  const config = personaById(persona);
  if (!config) {
    return NextResponse.json({ error: "Nieznany typ zgłoszenia" }, { status: 400 });
  }

  // Every question must be answered. The client blocks this too, but the score
  // is recomputed here from raw inputs and never trusted from the request - a
  // crafted payload must not be able to mint an arbitrary result.
  const missing = config.questions.filter((q) => answers[q.id] == null);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Brakuje odpowiedzi na ${missing.length} pytań. Wróć i uzupełnij.` },
      { status: 400 }
    );
  }

  // Derived here rather than taken from the payload: for the athlete the tier
  // comes from an answer, and trusting a client-sent tier would reopen the gap
  // where understating your scale loosens the audience benchmark for free.
  const tier = resolveTier(config, answers, context.tier ?? null);
  const result = scoreSubmission(config, {
    answers,
    audience: audience as Record<string, AudienceValue>,
    tier,
  });

  // Storage must never cost the visitor their result or the team the lead.
  let submissionId: string | null = null;
  try {
    submissionId = await persist(
      buildRecord({
        persona,
        context: { discipline: context.discipline, tier: result.tier },
        lead: {
          name: lead.name,
          email: lead.email,
          entityName: lead.entityName,
          // Empty string, never undefined. Firestore rejects undefined values,
          // and phone is optional, so this silently dropped every submission
          // from a visitor who skipped it - kept correct for whenever a store
          // is wired back up.
          phone: lead.phone || "",
          buyingIntent: lead.buyingIntent,
          consent: lead.consent,
          consentMarketing: lead.consentMarketing,
        },
        answers,
        audience: audience as Record<string, AudienceValue>,
        result,
        funnel,
      })
    );
  } catch (err) {
    console.error("[commercial-score] zapis nieudany:", err);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // The visitor has already done the work; show the result rather than fail.
    console.error("[commercial-score] brak RESEND_API_KEY - wynik bez maila");
    return NextResponse.json({ success: true, emailed: false, result, submissionId });
  }

  const resend = new Resend(apiKey);
  const userEmail = buildUserEmail(config, result, lead.name);
  const adminEmail = buildAdminEmail(config, result, lead, {
    discipline: context.discipline,
    tier: result.tier,
  }, {
    answers,
    audience,
  });

  let emailed = true;
  try {
    const sent = await resend.emails.send({
      from: "Sport Space Pro <noreply@footlog.pl>",
      to: [lead.email],
      replyTo: "hello@sportspacepro.pl",
      subject: userEmail.subject,
      html: userEmail.html,
      text: userEmail.text,
    });
    if (sent.error) {
      emailed = false;
      console.error("[commercial-score] Resend (user):", sent.error);
    }
  } catch (err) {
    emailed = false;
    console.error("[commercial-score] Resend (user) wyjątek:", err);
  }

  try {
    await resend.emails.send({
      from: "Sport Space Pro <noreply@footlog.pl>",
      to: ["hello@sportspacepro.pl"],
      replyTo: lead.email,
      subject: adminEmail.subject,
      html: adminEmail.html,
      text: adminEmail.text,
    });
  } catch (err) {
    console.error("[commercial-score] powiadomienie admina nieudane:", err);
  }

  return NextResponse.json({ success: true, emailed, result, submissionId });
}

/** Closes the funnel on the stored record when the visitor clicks a CTA. */
export async function PATCH(req: Request) {
  const rl = rateLimit(getClientIp(req), 20, RATE_WINDOW_MS);
  if (!rl.ok) return NextResponse.json({ success: true });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ success: true });
  }

  const parsed = PatchSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ success: true });

  try {
    await markCtaClicked(parsed.data.submissionId, parsed.data.ctaClicked);
  } catch (err) {
    console.error("[commercial-score] PATCH CTA:", err);
  }
  return NextResponse.json({ success: true });
}

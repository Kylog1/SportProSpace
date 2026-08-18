import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { QUESTIONS, getLevel, totalScore } from "@/lib/assessment/data";
import { generateAssessmentPDF } from "@/lib/assessment/pdf";
import { buildAdminEmail, buildUserEmail } from "@/lib/assessment/emails";
import { FITNESS_CONFIG } from "@/lib/assessment/fitness";
import { overallScore, getMaturityLevel } from "@/lib/assessment/types";
import { generateFitnessPDF } from "@/lib/assessment/fitness-pdf";
import {
  buildFitnessAdminEmail,
  buildFitnessUserEmail,
} from "@/lib/assessment/fitness-emails";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

// Build a Zod schema where every question id is a required 1-5 integer.
function answersSchemaFor(ids: string[]) {
  const shape: Record<string, z.ZodNumber> = {};
  for (const id of ids) {
    shape[id] = z.number().int().min(1).max(5);
  }
  return z.object(shape);
}

const FootballAnswersSchema = answersSchemaFor(QUESTIONS.map((q) => q.id));
const FitnessAnswersSchema = answersSchemaFor(
  FITNESS_CONFIG.questions.map((q) => q.id)
);

const BaseFields = {
  name: z.string().trim().min(2, "Podaj imię i nazwisko").max(120),
  email: z.string().trim().email("Niepoprawny adres email").max(200),
  organization: z.string().trim().min(2, "Podaj nazwę klubu / organizacji").max(200),
  phone: z.string().trim().max(40).optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "Wymagana zgoda na otrzymanie raportu",
  }),
  // honeypot — bots fill this; real users leave it empty
  website: z.string().max(0).optional(),
};

// `sport` is optional and defaults to football, so any client that predates
// the multi-discipline rollout keeps working unchanged.
const FootballSchema = z.object({
  ...BaseFields,
  sport: z.literal("football").optional(),
  answers: FootballAnswersSchema,
});

const FitnessSchema = z.object({
  ...BaseFields,
  sport: z.literal("fitness"),
  answers: FitnessAnswersSchema,
});

function safeFilename(s: string): string {
  return s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 60) || "klub";
}

export async function POST(req: Request) {
  // 3 submissions per IP per 30 minutes (PDF generation is expensive)
  const rl = rateLimit(getClientIp(req), 3, 30 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Zbyt wiele zapytań. Spróbuj ponownie za kilka minut." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[submit-assessment] RESEND_API_KEY missing");
    return NextResponse.json(
      { error: "Konfiguracja serwera niekompletna. Spróbuj później." },
      { status: 500 }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Niepoprawny format danych" }, { status: 400 });
  }

  // Pick the schema by discipline. Anything without an explicit `sport`
  // is Football, exactly as before.
  const isFitness =
    typeof json === "object" &&
    json !== null &&
    (json as { sport?: unknown }).sport === "fitness";

  const questionIds = isFitness
    ? FITNESS_CONFIG.questions.map((q) => q.id)
    : QUESTIONS.map((q) => q.id);

  const parsed = isFitness
    ? FitnessSchema.safeParse(json)
    : FootballSchema.safeParse(json);

  if (!parsed.success) {
    console.error(
      "[submit-assessment] validation failed:",
      JSON.stringify(parsed.error.issues)
    );

    // If the problem is missing answers, give the user a clear message
    // pointing to which question numbers they didn't answer.
    const missingAnswerNums: number[] = [];
    for (const issue of parsed.error.issues) {
      if (
        issue.path.length === 2 &&
        issue.path[0] === "answers" &&
        typeof issue.path[1] === "string"
      ) {
        const idx = questionIds.indexOf(issue.path[1]);
        if (idx !== -1) missingAnswerNums.push(idx + 1);
      }
    }
    if (missingAnswerNums.length > 0) {
      missingAnswerNums.sort((a, b) => a - b);
      return NextResponse.json(
        {
          error: `Brakuje odpowiedzi na pytanie ${missingAnswerNums.join(", ")}. Wróć do ankiety i uzupełnij.`,
        },
        { status: 400 }
      );
    }

    const firstIssue = parsed.error.issues[0]?.message ?? "Niepoprawne dane formularza";
    return NextResponse.json({ error: firstIssue }, { status: 400 });
  }

  const { name, email, organization, phone, answers, website } = parsed.data;

  // Honeypot caught a bot — silently accept, don't send anything
  if (website && website.length > 0) {
    return NextResponse.json({ success: true });
  }

  // Score, report and emails are per-discipline. Football keeps its raw
  // 12-60 scale; Fitness reports a normalised 0-100 score.
  const scoreValue = isFitness
    ? overallScore(FITNESS_CONFIG, answers)
    : totalScore(answers);
  const levelId = isFitness
    ? getMaturityLevel(FITNESS_CONFIG, scoreValue).id
    : getLevel(scoreValue).id;

  let pdfBuffer: Buffer;
  try {
    pdfBuffer = isFitness
      ? await generateFitnessPDF({ name, email, organization, answers })
      : await generateAssessmentPDF({ name, email, organization, answers });
  } catch (err) {
    console.error("[submit-assessment] PDF generation failed:", err);
    return NextResponse.json(
      { error: "Nie udało się wygenerować raportu. Spróbuj ponownie." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const pdfPrefix = isFitness ? "Self-Audit_Fitness" : "Self-Audit";
  const pdfFilename = `${pdfPrefix}_${safeFilename(organization)}.pdf`;
  const pdfBase64 = pdfBuffer.toString("base64");

  // (1) User email — delivers the PDF
  const userEmail = isFitness
    ? buildFitnessUserEmail({ name, organization, answers })
    : buildUserEmail({ name, organization, answers });

  // (2) Admin notification — to hello@sportspacepro.pl
  const adminPayload = {
    name,
    email,
    organization,
    phone: phone || undefined,
    answers,
  };
  const adminEmail = isFitness
    ? buildFitnessAdminEmail(adminPayload)
    : buildAdminEmail(adminPayload);

  try {
    const userResult = await resend.emails.send({
      from: "Sport Space Pro <noreply@footlog.pl>",
      to: [email],
      replyTo: "hello@sportspacepro.pl",
      subject: userEmail.subject,
      html: userEmail.html,
      text: userEmail.text,
      attachments: [
        {
          filename: pdfFilename,
          content: pdfBase64,
        },
      ],
    });

    if (userResult.error) {
      console.error("[submit-assessment] Resend user error:", userResult.error);
      return NextResponse.json(
        { error: "Nie udało się wysłać raportu. Spróbuj ponownie za chwilę." },
        { status: 502 }
      );
    }

    // Admin notification — fire & don't block user response on failure
    try {
      await resend.emails.send({
        from: "Sport Space Pro <noreply@footlog.pl>",
        to: ["hello@sportspacepro.pl"],
        replyTo: email,
        subject: adminEmail.subject,
        html: adminEmail.html,
        text: adminEmail.text,
        attachments: [
          {
            filename: pdfFilename,
            content: pdfBase64,
          },
        ],
      });
    } catch (adminErr) {
      // Don't fail the user request if admin notification fails
      console.error("[submit-assessment] Admin notification failed:", adminErr);
    }

    return NextResponse.json({
      success: true,
      sport: isFitness ? "fitness" : "football",
      total: scoreValue,
      level: levelId,
    });
  } catch (err) {
    console.error("[submit-assessment] Unexpected error:", err);
    return NextResponse.json(
      { error: "Nie udało się wysłać raportu. Spróbuj ponownie za chwilę." },
      { status: 500 }
    );
  }
}

import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { buildBriefAdminEmail, buildBriefUserEmail } from "@/lib/brief/emails";
import { BRIEF_STAGE_IDS } from "@/lib/brief/stages";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 15;

// The template lives outside /public so the lead form is the only way to get
// it; it is sent as an email attachment, which also confirms the address.
// Regenerate with `node scripts/brief/build-brief.mjs`.
const BRIEF_PATH = path.join(process.cwd(), "lib/brief/brief-sponsoringowy-marki.docx");
const BRIEF_FILENAME = "Brief_sponsoringowy_marki_Sport_Space_Pro.docx";

// Same budget as the Self-Audit: each request sends two emails with an
// attachment, and the Resend free tier caps at 100 a day.
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 30 * 60 * 1000;

const Schema = z.object({
  name: z.string().trim().min(2, "Podaj imię i nazwisko").max(120),
  email: z.string().trim().email("Niepoprawny adres email").max(200),
  company: z.string().trim().min(2, "Podaj nazwę firmy lub marki").max(200),
  role: z.string().trim().max(120).optional().default(""),
  phone: z.string().trim().max(40).optional().default(""),
  stage: z.enum(BRIEF_STAGE_IDS, "Wybierz, na jakim etapie jesteście"),
  consent: z.boolean().refine((v) => v === true, {
    message: "Wymagana zgoda na przesłanie wzoru",
  }),
  // Honeypot. Accepts any string so a bot is not told which field it got
  // wrong; a filled one is accepted silently below.
  website: z.string().max(200).optional(),
});

let cached: string | null = null;
async function briefBase64(): Promise<string> {
  if (!cached) cached = (await readFile(BRIEF_PATH)).toString("base64");
  return cached;
}

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

  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    console.error("[brief] walidacja:", JSON.stringify(parsed.error.issues.slice(0, 3)));
    const written = parsed.error.issues.find(
      (i) => i.message && i.message !== "Invalid input"
    );
    return NextResponse.json(
      { error: written?.message ?? "Niepoprawne dane formularza" },
      { status: 400 }
    );
  }

  const { name, email, company, role, phone, stage, website } = parsed.data;

  if (website && website.length > 0) {
    return NextResponse.json({ success: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[brief] RESEND_API_KEY missing");
    return NextResponse.json(
      { error: "Konfiguracja serwera niekompletna. Spróbuj później." },
      { status: 500 }
    );
  }

  let attachment: string;
  try {
    attachment = await briefBase64();
  } catch (err) {
    console.error("[brief] nie można odczytać pliku:", err);
    return NextResponse.json(
      { error: "Nie udało się przygotować wzoru. Spróbuj ponownie za chwilę." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const userEmail = buildBriefUserEmail(name);
  const adminEmail = buildBriefAdminEmail({ name, email, company, role, phone, stage });

  try {
    const sent = await resend.emails.send({
      from: "Sport Space Pro <noreply@footlog.pl>",
      to: [email],
      replyTo: "hello@sportspacepro.pl",
      subject: userEmail.subject,
      html: userEmail.html,
      text: userEmail.text,
      attachments: [{ filename: BRIEF_FILENAME, content: attachment }],
    });

    if (sent.error) {
      console.error("[brief] Resend user error:", sent.error);
      return NextResponse.json(
        { error: "Nie udało się wysłać wzoru. Spróbuj ponownie za chwilę." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[brief] Unexpected error:", err);
    return NextResponse.json(
      { error: "Nie udało się wysłać wzoru. Spróbuj ponownie za chwilę." },
      { status: 500 }
    );
  }

  // The visitor already has the file; a failed notification must not undo that.
  try {
    await resend.emails.send({
      from: "Sport Space Pro <noreply@footlog.pl>",
      to: ["hello@sportspacepro.pl"],
      replyTo: email,
      subject: adminEmail.subject,
      html: adminEmail.html,
      text: adminEmail.text,
    });
  } catch (err) {
    console.error("[brief] Admin notification failed:", err);
  }

  return NextResponse.json({ success: true });
}

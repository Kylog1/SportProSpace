import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { QUESTIONS, getLevel, totalScore } from "@/lib/assessment/data";
import { generateAssessmentPDF } from "@/lib/assessment/pdf";
import { buildAdminEmail, buildUserEmail } from "@/lib/assessment/emails";

export const runtime = "nodejs";
export const maxDuration = 30;

// Build a Zod schema where every question id is a required 1-5 integer.
const answersShape: Record<string, z.ZodNumber> = {};
for (const q of QUESTIONS) {
  answersShape[q.id] = z.number().int().min(1).max(5);
}
const AnswersSchema = z.object(answersShape);

const SubmitSchema = z.object({
  name: z.string().trim().min(2, "Podaj imię i nazwisko").max(120),
  email: z.string().trim().email("Niepoprawny adres email").max(200),
  organization: z.string().trim().min(2, "Podaj nazwę klubu / organizacji").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  consent: z.literal(true, {
    message: "Wymagana zgoda na otrzymanie raportu",
  }),
  answers: AnswersSchema,
  // honeypot — bots fill this; real users leave it empty
  website: z.string().max(0).optional().or(z.literal("")),
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

  const parsed = SubmitSchema.safeParse(json);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Niepoprawne dane formularza";
    return NextResponse.json({ error: firstIssue }, { status: 400 });
  }

  const { name, email, organization, phone, answers, website } = parsed.data;

  // Honeypot caught a bot — silently accept, don't send anything
  if (website && website.length > 0) {
    return NextResponse.json({ success: true });
  }

  const total = totalScore(answers);
  const level = getLevel(total);

  let pdfBuffer: Buffer;
  try {
    pdfBuffer = await generateAssessmentPDF({
      name,
      email,
      organization,
      answers,
    });
  } catch (err) {
    console.error("[submit-assessment] PDF generation failed:", err);
    return NextResponse.json(
      { error: "Nie udało się wygenerować raportu. Spróbuj ponownie." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const pdfFilename = `SelfAssessment_${safeFilename(organization)}.pdf`;
  const pdfBase64 = pdfBuffer.toString("base64");

  // (1) User email — delivers the PDF
  const userEmail = buildUserEmail({ name, organization, answers });

  // (2) Admin notification — to hello@sportspacepro.pl
  const adminEmail = buildAdminEmail({
    name,
    email,
    organization,
    phone: phone || undefined,
    answers,
  });

  try {
    const userResult = await resend.emails.send({
      from: "Sport Pro Space <noreply@sportspacepro.pl>",
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
        from: "Sport Pro Space <noreply@sportspacepro.pl>",
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
      total,
      level: level.id,
    });
  } catch (err) {
    console.error("[submit-assessment] Unexpected error:", err);
    return NextResponse.json(
      { error: "Nie udało się wysłać raportu. Spróbuj ponownie za chwilę." },
      { status: 500 }
    );
  }
}

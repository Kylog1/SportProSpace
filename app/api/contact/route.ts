import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Podaj imię i nazwisko").max(120),
  email: z.string().trim().email("Niepoprawny adres email").max(200),
  organization: z.string().trim().min(2, "Podaj nazwę klubu / organizacji").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Wiadomość musi mieć co najmniej 10 znaków").max(4000),
  // honeypot, bots fill this; real users leave it empty
  website: z.string().max(0).optional().or(z.literal("")),
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  // 5 submissions per IP per 15 minutes
  const rl = rateLimit(getClientIp(req), 5, 15 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Zbyt wiele zapytań. Spróbuj ponownie za kilka minut." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY missing");
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

  const parsed = ContactSchema.safeParse(json);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Niepoprawne dane formularza";
    return NextResponse.json({ error: firstIssue }, { status: 400 });
  }

  const { name, email, organization, phone, message, website } = parsed.data;

  // Honeypot caught a bot, silently accept, don't send anything
  if (website && website.length > 0) {
    return NextResponse.json({ success: true });
  }

  const resend = new Resend(apiKey);

  const phoneRow = phone
    ? `<tr><td style="padding:6px 12px;color:#64748b;font-size:13px;">Telefon</td><td style="padding:6px 12px;color:#0f172a;font-size:14px;">${escapeHtml(phone)}</td></tr>`
    : "";

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0f172a;">
      <h2 style="font-size:18px;font-weight:600;margin:0 0 16px;">Nowe zapytanie z sportspacepro.pl</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
        <tbody>
          <tr><td style="padding:6px 12px;color:#64748b;font-size:13px;width:140px;">Imię i nazwisko</td><td style="padding:6px 12px;font-size:14px;">${escapeHtml(name)}</td></tr>
          <tr style="background:#f8fafc;"><td style="padding:6px 12px;color:#64748b;font-size:13px;">Email</td><td style="padding:6px 12px;font-size:14px;"><a href="mailto:${escapeHtml(email)}" style="color:#1e3a8a;">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:6px 12px;color:#64748b;font-size:13px;">Klub / organizacja</td><td style="padding:6px 12px;font-size:14px;">${escapeHtml(organization)}</td></tr>
          ${phoneRow}
        </tbody>
      </table>
      <div style="margin-top:20px;padding:16px;background:#f8fafc;border-radius:8px;border-left:3px solid #1e3a8a;">
        <div style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Wiadomość</div>
        <div style="white-space:pre-wrap;font-size:14.5px;line-height:1.6;">${escapeHtml(message)}</div>
      </div>
      <p style="margin-top:20px;color:#94a3b8;font-size:12px;">Kliknij „Odpowiedz". Wiadomość trafi bezpośrednio do nadawcy.</p>
    </div>
  `;

  const text = [
    `Nowe zapytanie z sportspacepro.pl`,
    ``,
    `Imię i nazwisko: ${name}`,
    `Email: ${email}`,
    `Klub / organizacja: ${organization}`,
    phone ? `Telefon: ${phone}` : null,
    ``,
    `Wiadomość:`,
    message,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const result = await resend.emails.send({
      from: "Sport Space Pro <noreply@footlog.pl>",
      to: ["hello@sportspacepro.pl"],
      replyTo: email,
      subject: `Nowe zapytanie - ${name} (${organization})`,
      html,
      text,
    });

    if (result.error) {
      console.error("[contact] Resend error:", result.error);
      return NextResponse.json(
        { error: "Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę." },
      { status: 500 }
    );
  }
}

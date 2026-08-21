import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { SPORTS } from "@/lib/assessment/sports";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const sportIds = SPORTS.map((s) => s.id) as [string, ...string[]];

const NotifySchema = z.object({
  email: z.string().trim().email("Niepoprawny adres email").max(200),
  sport: z.enum(sportIds),
  // honeypot, bots fill this; real users leave it empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  // 5 submissions per IP per 15 minutes, same budget as the contact form
  const rl = rateLimit(getClientIp(req), 5, 15 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Zbyt wiele zapytań. Spróbuj ponownie za kilka minut." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[notify-sport] RESEND_API_KEY missing");
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

  const parsed = NotifySchema.safeParse(json);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Niepoprawne dane formularza";
    return NextResponse.json({ error: firstIssue }, { status: 400 });
  }

  const { email, sport, website } = parsed.data;

  // Honeypot caught a bot, silently accept, don't send anything
  if (website && website.length > 0) {
    return NextResponse.json({ success: true });
  }

  const sportLabel = SPORTS.find((s) => s.id === sport)?.label ?? sport;
  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: "Sport Space Pro <noreply@footlog.pl>",
      to: ["hello@sportspacepro.pl"],
      replyTo: email,
      subject: `Zainteresowanie Self-Audit - ${sportLabel}`,
      html: `<p>Nowe zgłoszenie zainteresowania Self-Audit dla dyscypliny <strong>${sportLabel}</strong>.</p><p>Email: <a href="mailto:${email}">${email}</a></p>`,
      text: `Nowe zgłoszenie zainteresowania Self-Audit dla dyscypliny ${sportLabel}.\nEmail: ${email}`,
    });

    if (result.error) {
      console.error("[notify-sport] Resend error:", result.error);
      return NextResponse.json(
        { error: "Nie udało się wysłać zgłoszenia. Spróbuj ponownie za chwilę." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[notify-sport] Unexpected error:", err);
    return NextResponse.json(
      { error: "Nie udało się wysłać zgłoszenia. Spróbuj ponownie za chwilę." },
      { status: 500 }
    );
  }
}

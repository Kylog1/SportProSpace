// Email templates for the Self Assessment lead magnet.
// Two emails: (a) user — delivery of the PDF, (b) admin — notification at hello@sportspacepro.pl

import {
  MAX_TOTAL,
  SECTIONS,
  getLevel,
  sectionScore,
  totalScore,
  topRisks,
  scaleLabel,
} from "./data";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ──────────────────────────────────────────────────────────────────────────
// User email (delivers PDF)
// ──────────────────────────────────────────────────────────────────────────

export type UserEmailInput = {
  name: string;
  organization: string;
  answers: Record<string, number>;
};

export function buildUserEmail(input: UserEmailInput): {
  subject: string;
  html: string;
  text: string;
} {
  const total = totalScore(input.answers);
  const level = getLevel(total);
  const firstName = input.name.split(" ")[0] || input.name;

  const subject = `Twój wynik Self Assessment - ${level.name}`;

  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,sans-serif;max-width:580px;margin:0 auto;padding:32px 24px;color:#0f172a;background:#ffffff;">
  <div style="border-bottom:1px solid #e2e8f0;padding-bottom:20px;margin-bottom:24px;">
    <div style="font-size:13px;color:#64748b;letter-spacing:0.06em;text-transform:uppercase;">Sport Pro Space</div>
    <div style="font-size:20px;font-weight:600;color:#1e3a8a;margin-top:6px;">Twój wynik Self Assessment</div>
  </div>

  <p style="font-size:15px;line-height:1.65;margin:0 0 16px;">
    Cześć ${escapeHtml(firstName)},
  </p>

  <p style="font-size:15px;line-height:1.65;margin:0 0 20px;">
    Dziękuję za wypełnienie Self Assessment dla <strong>${escapeHtml(input.organization)}</strong>.
    Pełny raport (3 strony PDF) znajdziesz w załączniku tej wiadomości.
  </p>

  <div style="background:#f8fafc;border-left:4px solid #1e3a8a;padding:20px;border-radius:6px;margin:24px 0;">
    <div style="font-size:12px;color:#64748b;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:6px;">Wynik</div>
    <div style="font-size:32px;font-weight:700;color:#1e3a8a;line-height:1;">
      ${total}<span style="font-size:18px;font-weight:400;color:#64748b;"> / ${MAX_TOTAL}</span>
    </div>
    <div style="font-size:15px;font-weight:600;color:#0f172a;margin-top:10px;">
      ${escapeHtml(level.name)}
    </div>
    <div style="font-size:13px;color:#64748b;margin-top:4px;">
      ${escapeHtml(level.short)}
    </div>
  </div>

  <p style="font-size:15px;line-height:1.65;margin:0 0 12px;">
    W raporcie znajdziesz:
  </p>
  <ul style="font-size:14.5px;line-height:1.7;margin:0 0 24px;padding-left:22px;color:#0f172a;">
    <li>Wynik w 4 sekcjach + Wasza pozycja na skali dojrzałości</li>
    <li>Ryzyka i typowe problemy dla Waszego poziomu</li>
    <li>3 najsłabsze pytania - gdzie zacząć w pierwszej kolejności</li>
    <li>Co dalej: jak Self Assessment łączy się z badaniem satysfakcji</li>
  </ul>

  <div style="background:#1e3a8a;border-radius:8px;padding:24px;margin:28px 0;">
    <div style="font-size:16px;font-weight:600;color:#ffffff;margin-bottom:8px;">
      Chcesz porozmawiać o wynikach?
    </div>
    <div style="font-size:14px;line-height:1.6;color:#cbd5e1;margin-bottom:16px;">
      30 minut. Pokażę, jak skalibrować pełne badanie satysfakcji pod Waszą organizację
      i co wyjdzie z porównania z Self Assessment.
    </div>
    <a href="https://calendly.com/grzyb-krzysiek/new-meeting"
       style="display:inline-block;background:#ffffff;color:#1e3a8a;font-weight:600;font-size:14px;padding:11px 22px;border-radius:6px;text-decoration:none;">
      Umów rozmowę &rarr;
    </a>
  </div>

  <p style="font-size:14px;line-height:1.65;color:#64748b;margin:24px 0 0;">
    Jeśli masz pytania - po prostu odpowiedz na tego maila. Trafi prosto do mnie.
  </p>

  <p style="font-size:14px;line-height:1.65;margin:16px 0 0;">
    Krzysztof Grzyb<br/>
    <span style="color:#64748b;">Sport Pro Space</span>
  </p>

  <div style="border-top:1px solid #e2e8f0;margin-top:32px;padding-top:16px;font-size:11px;color:#94a3b8;line-height:1.5;">
    Otrzymujesz tę wiadomość, ponieważ wypełniłeś/aś Self Assessment na sportspacepro.pl.
  </div>
</div>
  `.trim();

  const text = [
    `Cześć ${firstName},`,
    ``,
    `Dziękuję za wypełnienie Self Assessment dla ${input.organization}.`,
    `Pełny raport (3 strony PDF) znajdziesz w załączniku tej wiadomości.`,
    ``,
    `WYNIK: ${total} / ${MAX_TOTAL}`,
    `POZIOM: ${level.name} - ${level.short}`,
    ``,
    `W raporcie znajdziesz:`,
    `- Wynik w 4 sekcjach + Wasza pozycja na skali dojrzałości`,
    `- Ryzyka i typowe problemy dla Waszego poziomu`,
    `- 3 najsłabsze pytania - gdzie zacząć w pierwszej kolejności`,
    `- Co dalej: jak Self Assessment łączy się z badaniem satysfakcji`,
    ``,
    `Chcesz porozmawiać o wynikach?`,
    `30 minut: https://calendly.com/grzyb-krzysiek/new-meeting`,
    ``,
    `Jeśli masz pytania - po prostu odpowiedz na tego maila.`,
    ``,
    `Krzysztof Grzyb`,
    `Sport Pro Space`,
  ].join("\n");

  return { subject, html, text };
}

// ──────────────────────────────────────────────────────────────────────────
// Admin notification (to hello@sportspacepro.pl)
// ──────────────────────────────────────────────────────────────────────────

export type AdminEmailInput = {
  name: string;
  email: string;
  organization: string;
  phone?: string;
  answers: Record<string, number>;
};

export function buildAdminEmail(input: AdminEmailInput): {
  subject: string;
  html: string;
  text: string;
} {
  const total = totalScore(input.answers);
  const level = getLevel(total);
  const weakest = topRisks(input.answers, 3);

  const subject = `Nowy lead (Self Assessment) - ${input.organization} - ${level.name} (${total}/${MAX_TOTAL})`;

  const sectionRows = SECTIONS.map((s) => {
    const r = sectionScore(input.answers, s.id);
    return `<tr>
      <td style="padding:6px 12px;color:#64748b;font-size:13px;">${escapeHtml(s.short)}</td>
      <td style="padding:6px 12px;font-size:14px;font-weight:600;color:#0f172a;">${r.score}/${r.max} (${r.pct}%)</td>
    </tr>`;
  }).join("");

  const weakestRows = weakest.map((q) => {
    const v = input.answers[q.id] || 0;
    return `<li style="margin-bottom:8px;">
      <strong>${v}/5 - ${escapeHtml(scaleLabel(v))}</strong><br/>
      <span style="color:#64748b;font-size:13px;">${escapeHtml(q.text)}</span>
    </li>`;
  }).join("");

  const phoneRow = input.phone
    ? `<tr><td style="padding:6px 12px;color:#64748b;font-size:13px;">Telefon</td><td style="padding:6px 12px;font-size:14px;">${escapeHtml(input.phone)}</td></tr>`
    : "";

  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#0f172a;">
  <h2 style="font-size:18px;font-weight:600;margin:0 0 6px;">Nowy lead - Self Assessment</h2>
  <p style="margin:0 0 20px;color:#64748b;font-size:13px;">sportspacepro.pl/self-assessment</p>

  <div style="background:#f8fafc;border-left:4px solid #1e3a8a;padding:16px;border-radius:6px;margin-bottom:20px;">
    <div style="font-size:11px;color:#64748b;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:4px;">Wynik</div>
    <div style="font-size:24px;font-weight:700;color:#1e3a8a;line-height:1;">${total} / ${MAX_TOTAL}</div>
    <div style="font-size:14px;font-weight:600;margin-top:6px;">${escapeHtml(level.name)}</div>
    <div style="font-size:12px;color:#64748b;">${escapeHtml(level.short)}</div>
  </div>

  <h3 style="font-size:14px;font-weight:600;margin:20px 0 8px;">Kontakt</h3>
  <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
    <tbody>
      <tr><td style="padding:6px 12px;color:#64748b;font-size:13px;width:150px;">Imię i nazwisko</td><td style="padding:6px 12px;font-size:14px;">${escapeHtml(input.name)}</td></tr>
      <tr style="background:#f8fafc;"><td style="padding:6px 12px;color:#64748b;font-size:13px;">Email</td><td style="padding:6px 12px;font-size:14px;"><a href="mailto:${escapeHtml(input.email)}" style="color:#1e3a8a;">${escapeHtml(input.email)}</a></td></tr>
      <tr><td style="padding:6px 12px;color:#64748b;font-size:13px;">Klub / organizacja</td><td style="padding:6px 12px;font-size:14px;">${escapeHtml(input.organization)}</td></tr>
      ${phoneRow}
    </tbody>
  </table>

  <h3 style="font-size:14px;font-weight:600;margin:24px 0 8px;">Wyniki w sekcjach</h3>
  <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
    <tbody>${sectionRows}</tbody>
  </table>

  <h3 style="font-size:14px;font-weight:600;margin:24px 0 8px;">Najsłabsze obszary</h3>
  <ol style="margin:0;padding-left:22px;font-size:14px;color:#0f172a;">
    ${weakestRows}
  </ol>

  <p style="margin-top:24px;color:#64748b;font-size:12px;">Kliknij "Odpowiedz" - trafi bezpośrednio do leada.</p>
</div>
  `.trim();

  const text = [
    `Nowy lead - Self Assessment (sportspacepro.pl)`,
    ``,
    `WYNIK: ${total} / ${MAX_TOTAL} - ${level.name}`,
    `${level.short}`,
    ``,
    `Kontakt:`,
    `  Imię: ${input.name}`,
    `  Email: ${input.email}`,
    `  Organizacja: ${input.organization}`,
    input.phone ? `  Telefon: ${input.phone}` : null,
    ``,
    `Sekcje:`,
    ...SECTIONS.map((s) => {
      const r = sectionScore(input.answers, s.id);
      return `  ${s.short}: ${r.score}/${r.max} (${r.pct}%)`;
    }),
    ``,
    `Najsłabsze obszary:`,
    ...weakest.map((q, i) => {
      const v = input.answers[q.id] || 0;
      return `  ${i + 1}. ${v}/5 - ${scaleLabel(v)}\n     ${q.text}`;
    }),
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}

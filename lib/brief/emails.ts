// Emails for the "Brief sponsoringowy marki" download: the template itself to
// the visitor (as a .docx attachment) and a lead notification to the team.

import { BRIEF_STAGE_LABELS, type BriefStage } from "./stages";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const NAVY = "#1e3a8a";
const MUTED = "#64748b";
const RULE = "#e2e8f0";

export function buildBriefUserEmail(name: string): {
  subject: string;
  html: string;
  text: string;
} {
  const firstName = name.split(" ")[0] || name;

  const steps = [
    "Wypełnijcie go wspólnie: marketing, sprzedaż i osoba, która podpisze umowę.",
    "Wyślijcie tę samą wersję do kilku kandydatów, żeby propozycje dało się porównać.",
    "Oceńcie propozycje Kartą oceny z ostatniej strony, zanim spojrzycie na cenę.",
  ];

  const html = `<!doctype html><html lang="pl"><body style="margin:0;background:#f8fafc;padding:24px">
<table role="presentation" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border:1px solid ${RULE};border-radius:12px">
  <tr><td style="padding:32px 32px 8px">
    <div style="font:600 12px/1 Arial,sans-serif;color:${NAVY};letter-spacing:.14em;text-transform:uppercase">Wzór do pobrania</div>
    <div style="font:700 26px/1.25 Arial,sans-serif;color:#0f172a;margin-top:14px">Brief sponsoringowy marki</div>
    <div style="font:400 14px/1.6 Arial,sans-serif;color:${MUTED};margin-top:10px">
      Cześć ${esc(firstName)}, w załączniku znajdziesz wzór w formacie Word. Szare pola są do wpisania,
      pola wyboru zaznaczasz kliknięciem. Możesz go dowolnie zmieniać.
    </div>
  </td></tr>

  <tr><td style="padding:16px 32px 8px">
    <div style="font:600 12px/1 Arial,sans-serif;color:${MUTED};letter-spacing:.1em;text-transform:uppercase;padding-bottom:4px">Jak z niego korzystać</div>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%">
      ${steps
        .map(
          (s, i) => `<tr><td style="padding:10px 0;border-bottom:1px solid ${RULE};font:400 14px/1.5 Arial,sans-serif;color:#0f172a">
        <span style="font-weight:700;color:${NAVY}">${i + 1}.</span> ${esc(s)}
      </td></tr>`
        )
        .join("")}
    </table>
  </td></tr>

  <tr><td style="padding:24px 32px">
    <div style="background:#0b1736;border-radius:10px;padding:20px">
      <div style="font:600 11px/1 Arial,sans-serif;color:#8aa6cd;letter-spacing:.12em;text-transform:uppercase">Commercial Score</div>
      <div style="font:500 15px/1.55 Arial,sans-serif;color:#fff;margin-top:10px">
        Poproście kandydatów o wynik Commercial Score. To bezpłatna samoocena gotowości komercyjnej
        klubu lub zawodnika w sześciu obszarach, w skali 0-100.
      </div>
      <a href="https://sportspacepro.pl/commercial-score" style="display:inline-block;margin-top:14px;font:600 14px/1 Arial,sans-serif;color:#fff;text-decoration:underline">sportspacepro.pl/commercial-score</a>
    </div>
  </td></tr>

  <tr><td style="padding:0 32px 32px">
    <div style="font:400 13px/1.6 Arial,sans-serif;color:${MUTED}">
      Jeśli chcecie przejść przez wybór partnera sportowego z kimś, kto robi to na co dzień,
      odpisz na tego maila. Pierwsza rozmowa jest bezpłatna.
    </div>
    <div style="font:400 12px/1.6 Arial,sans-serif;color:#94a3b8;margin-top:16px;border-top:1px solid ${RULE};padding-top:16px">
      Sport Space Pro &middot; sportspacepro.pl
    </div>
  </td></tr>
</table></body></html>`;

  const text = [
    `Cześć ${firstName},`,
    "",
    "w załączniku znajdziesz wzór briefu sponsoringowego marki w formacie Word.",
    "Szare pola są do wpisania, pola wyboru zaznaczasz kliknięciem.",
    "",
    "Jak z niego korzystać:",
    ...steps.map((s, i) => `${i + 1}. ${s}`),
    "",
    "Poproście kandydatów o wynik Commercial Score: https://sportspacepro.pl/commercial-score",
    "",
    "Jeśli chcecie porozmawiać o wyborze partnera sportowego, odpisz na tego maila.",
    "",
    "Sport Space Pro · sportspacepro.pl",
  ].join("\n");

  return { subject: "Brief sponsoringowy marki - wzór do pobrania", html, text };
}

export function buildBriefAdminEmail(lead: {
  name: string;
  email: string;
  company: string;
  role?: string;
  phone?: string;
  stage: BriefStage;
}): { subject: string; html: string; text: string } {
  const rows: [string, string][] = [
    ["Imię i nazwisko", lead.name],
    ["Email", lead.email],
    ["Firma / marka", lead.company],
    ["Stanowisko", lead.role || "-"],
    ["Telefon", lead.phone || "-"],
    ["Etap", BRIEF_STAGE_LABELS[lead.stage]],
  ];

  const html = `<!doctype html><html lang="pl"><body style="font:14px/1.6 Arial,sans-serif;color:#0f172a">
<h2 style="margin:0 0 12px">Nowe pobranie: Brief sponsoringowy marki</h2>
<table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="color:${MUTED};border-bottom:1px solid ${RULE}">${esc(k)}</td><td style="border-bottom:1px solid ${RULE}"><strong>${esc(v)}</strong></td></tr>`
  )
  .join("")}
</table></body></html>`;

  const text = [
    "Nowe pobranie: Brief sponsoringowy marki",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
  ].join("\n");

  return {
    subject: `Brief sponsoringowy: ${lead.company} (${BRIEF_STAGE_LABELS[lead.stage]})`,
    html,
    text,
  };
}

// Email templates for the Tennis & Padel Self-Audit lead magnet.
// Mirrors lib/assessment/fitness-emails.ts. The only addition is `discipline`
// (tennis | padel) — one shared audit, but the admin email records which of
// the two the visitor actually picked, so results can be split out later.

import { TENNIS_PADEL_CONFIG } from "./tennis-padel";
import {
  overallScore,
  categoryScores,
  getMaturityLevel,
  weakestCategories,
} from "./types";

const C = TENNIS_PADEL_CONFIG;

export type Discipline = "tennis" | "padel";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export type TennisPadelUserEmailInput = {
  name: string;
  organization: string;
  answers: Record<string, number>;
};

export function buildTennisPadelUserEmail(input: TennisPadelUserEmailInput): {
  subject: string;
  html: string;
  text: string;
} {
  const score = overallScore(C, input.answers);
  const level = getMaturityLevel(C, score);
  const top3 = weakestCategories(C, input.answers, 3);
  const firstName = input.name.split(" ")[0] || input.name;

  const subject = `Twój wynik Self-Auditu - ${level.name} (${score}/100)`;

  const top3Html = top3
    .map(
      (c, i) =>
        `<li style="margin-bottom:6px;"><strong>${i + 1}. ${escapeHtml(c.label)}</strong> - ${c.score}/100 <span style="color:#64748b;">(${escapeHtml(c.short)})</span></li>`
    )
    .join("");

  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,sans-serif;max-width:580px;margin:0 auto;padding:32px 24px;color:#0f172a;background:#ffffff;">
  <div style="border-bottom:1px solid #e2e8f0;padding-bottom:20px;margin-bottom:24px;">
    <div style="font-size:13px;color:#64748b;letter-spacing:0.06em;text-transform:uppercase;">Sport Space Pro</div>
    <div style="font-size:20px;font-weight:600;color:#1e3a8a;margin-top:6px;">Twój wynik Self-Auditu</div>
  </div>

  <p style="font-size:15px;line-height:1.65;margin:0 0 16px;">Cześć ${escapeHtml(firstName)},</p>

  <p style="font-size:15px;line-height:1.65;margin:0 0 20px;">
    Dziękuję za wypełnienie Self-Auditu dla <strong>${escapeHtml(input.organization)}</strong>.
    Pełny raport PDF znajdziesz w załączniku tej wiadomości.
  </p>

  <div style="background:#f8fafc;border-left:4px solid #1e3a8a;padding:20px;border-radius:6px;margin:24px 0;">
    <div style="font-size:12px;color:#64748b;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:6px;">${escapeHtml(C.scoreLabel)}</div>
    <div style="font-size:32px;font-weight:700;color:#1e3a8a;line-height:1;">
      ${score}<span style="font-size:18px;font-weight:400;color:#64748b;"> / 100</span>
    </div>
    <div style="font-size:15px;font-weight:600;color:#0f172a;margin-top:10px;">${escapeHtml(level.name)}</div>
    <div style="font-size:13px;color:#64748b;margin-top:4px;">${escapeHtml(level.description)}</div>
  </div>

  <p style="font-size:15px;line-height:1.65;margin:0 0 12px;">Wasze Top 3 obszary do poprawy:</p>
  <ol style="font-size:14.5px;line-height:1.7;margin:0 0 24px;padding-left:22px;color:#0f172a;list-style:none;padding-left:0;">
    ${top3Html}
  </ol>

  <p style="font-size:15px;line-height:1.65;margin:0 0 24px;">
    W raporcie znajdziesz wynik we wszystkich 6 obszarach, pozycję na skali dojrzałości
    i opis największej szansy na poprawę.
  </p>

  <div style="border-top:1px solid #e2e8f0;padding-top:20px;margin-top:28px;">
    <p style="font-size:13px;line-height:1.6;color:#64748b;margin:0;">
      Otrzymujesz tę wiadomość, ponieważ wypełniłeś/aś Self-Audit na sportspacepro.pl.
    </p>
  </div>
</div>`.trim();

  const text = [
    `Twój wynik Self-Auditu`,
    ``,
    `Cześć ${firstName},`,
    ``,
    `Dziękuję za wypełnienie Self-Auditu dla ${input.organization}.`,
    `Pełny raport PDF znajdziesz w załączniku.`,
    ``,
    `${C.scoreLabel}: ${score}/100`,
    `Poziom: ${level.name}`,
    `${level.description}`,
    ``,
    `Top 3 obszary do poprawy:`,
    ...top3.map((c, i) => `${i + 1}. ${c.label} - ${c.score}/100 (${c.short})`),
    ``,
    `Sport Space Pro - sportspacepro.pl`,
  ].join("\n");

  return { subject, html, text };
}

export type TennisPadelAdminEmailInput = {
  name: string;
  email: string;
  organization: string;
  phone?: string;
  discipline: Discipline;
  answers: Record<string, number>;
};

export function buildTennisPadelAdminEmail(input: TennisPadelAdminEmailInput): {
  subject: string;
  html: string;
  text: string;
} {
  const score = overallScore(C, input.answers);
  const level = getMaturityLevel(C, score);
  const cats = categoryScores(C, input.answers);
  const top3 = weakestCategories(C, input.answers, 3);

  const subject = `Nowy lead (Self-Audit Tennis & Padel) - ${input.organization} - ${level.name} (${score}/100)`;

  const catRows = cats
    .map(
      (c) =>
        `<tr><td style="padding:5px 12px;color:#64748b;font-size:13px;">${escapeHtml(c.label)}</td><td style="padding:5px 12px;font-size:13px;font-weight:600;">${c.score}/100</td></tr>`
    )
    .join("");

  const phoneRow = input.phone
    ? `<tr><td style="padding:5px 12px;color:#64748b;font-size:13px;">Telefon</td><td style="padding:5px 12px;font-size:13px;">${escapeHtml(input.phone)}</td></tr>`
    : "";

  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#0f172a;">
  <h2 style="font-size:18px;font-weight:600;margin:0 0 6px;">Nowy lead - Self-Audit Tennis &amp; Padel</h2>
  <p style="color:#64748b;font-size:13px;margin:0 0 18px;">sportspacepro.pl/self-assessment/tennis-padel</p>

  <div style="background:#f8fafc;border-left:4px solid #1e3a8a;padding:16px;border-radius:6px;margin-bottom:20px;">
    <div style="font-size:26px;font-weight:700;color:#1e3a8a;line-height:1;">${score}<span style="font-size:15px;font-weight:400;color:#64748b;"> / 100</span></div>
    <div style="font-size:14px;font-weight:600;margin-top:8px;">${escapeHtml(level.name)}</div>
  </div>

  <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:18px;">
    <tbody>
      <tr><td style="padding:5px 12px;color:#64748b;font-size:13px;width:150px;">Imię i nazwisko</td><td style="padding:5px 12px;font-size:13px;">${escapeHtml(input.name)}</td></tr>
      <tr style="background:#f8fafc;"><td style="padding:5px 12px;color:#64748b;font-size:13px;">Email</td><td style="padding:5px 12px;font-size:13px;"><a href="mailto:${escapeHtml(input.email)}" style="color:#1e3a8a;">${escapeHtml(input.email)}</a></td></tr>
      <tr><td style="padding:5px 12px;color:#64748b;font-size:13px;">Klub / organizacja</td><td style="padding:5px 12px;font-size:13px;">${escapeHtml(input.organization)}</td></tr>
      ${phoneRow}
      <tr style="background:#f8fafc;"><td style="padding:5px 12px;color:#64748b;font-size:13px;">Dyscyplina</td><td style="padding:5px 12px;font-size:13px;">${input.discipline}</td></tr>
    </tbody>
  </table>

  <div style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Wyniki obszarów</div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:18px;">
    <tbody>${catRows}</tbody>
  </table>

  <div style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Top 3 szanse</div>
  <ol style="font-size:13.5px;line-height:1.7;margin:0;padding-left:20px;">
    ${top3.map((c) => `<li>${escapeHtml(c.label)} - ${c.score}/100</li>`).join("")}
  </ol>
</div>`.trim();

  const text = [
    `Nowy lead - Self-Audit Tennis & Padel (sportspacepro.pl)`,
    ``,
    `${C.scoreLabel}: ${score}/100 - ${level.name}`,
    ``,
    `Imię i nazwisko: ${input.name}`,
    `Email: ${input.email}`,
    `Klub / organizacja: ${input.organization}`,
    input.phone ? `Telefon: ${input.phone}` : null,
    `Dyscyplina: ${input.discipline}`,
    ``,
    `Wyniki obszarów:`,
    ...cats.map((c) => `- ${c.label}: ${c.score}/100`),
    ``,
    `Top 3 szanse:`,
    ...top3.map((c, i) => `${i + 1}. ${c.label} - ${c.score}/100`),
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}

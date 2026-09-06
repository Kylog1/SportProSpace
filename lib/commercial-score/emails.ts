// Emails for Commercial Score. Two messages: the result to the visitor, and a
// qualified-lead notification to the team.
//
// No PDF in this version. The report generators in lib/assessment carry a lot of
// layout weight and the recommendation copy here has not settled yet; an HTML
// summary delivers the same content today and can be swapped for a PDF once the
// wording stops moving.

import { BUYING_INTENT_LABELS } from "./intents";
import type { CommercialScoreResult, PersonaConfig } from "./types";

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

function bar(score: number): string {
  const color =
    score < 40 ? "#dc2626" : score < 60 ? "#f59e0b" : score < 80 ? "#2563eb" : "#059669";
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-top:4px"><tr>
    <td style="width:${score}%;background:${color};height:6px;border-radius:9999px;font-size:0;line-height:0">&nbsp;</td>
    <td style="background:#f1f5f9;height:6px;border-radius:9999px;font-size:0;line-height:0">&nbsp;</td>
  </tr></table>`;
}

function categoryRows(result: CommercialScoreResult<string>): string {
  return result.categories
    .map(
      (c) => `<tr><td style="padding:10px 0;border-bottom:1px solid ${RULE}">
        <div style="font:600 13px/1.4 Arial,sans-serif;color:#0f172a;letter-spacing:.04em">
          ${esc(c.label)}
          <span style="float:right;font-weight:400;color:${MUTED}">${c.score}/100</span>
        </div>
        ${bar(c.score)}
      </td></tr>`
    )
    .join("");
}

export function buildUserEmail(
  config: PersonaConfig<string>,
  result: CommercialScoreResult<string>,
  name: string
): { subject: string; html: string; text: string } {
  const firstName = name.split(" ")[0] || name;

  const improvements = result.improvements
    .map(
      (i, idx) => `<tr><td style="padding:12px 0;border-bottom:1px solid ${RULE}">
        <div style="font:600 14px/1.4 Arial,sans-serif;color:#0f172a">
          ${idx + 1}. ${esc(i.categoryLabel)}
          <span style="font-weight:400;color:${NAVY}">+${i.gain} pkt</span>
        </div>
        <div style="font:400 13px/1.6 Arial,sans-serif;color:${MUTED};margin-top:4px">${esc(i.recommendation)}</div>
      </td></tr>`
    )
    .join("");

  const html = `<!doctype html><html lang="pl"><body style="margin:0;background:#f8fafc;padding:24px">
<table role="presentation" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border:1px solid ${RULE};border-radius:12px">
  <tr><td style="padding:32px 32px 24px">
    <div style="font:600 12px/1 Arial,sans-serif;color:${NAVY};letter-spacing:.14em;text-transform:uppercase">${esc(config.scoreLabel)}</div>
    <div style="font:700 48px/1 Arial,sans-serif;color:#0f172a;margin-top:16px">${result.total}<span style="font-size:20px;color:${MUTED}">/100</span></div>
    <div style="font:600 18px/1.3 Arial,sans-serif;color:${NAVY};margin-top:8px">${esc(result.level.name)}</div>
    <div style="font:400 14px/1.6 Arial,sans-serif;color:${MUTED};margin-top:8px">${esc(result.level.description)}</div>
  </td></tr>

  <tr><td style="padding:0 32px">
    <div style="font:600 12px/1 Arial,sans-serif;color:${MUTED};letter-spacing:.1em;text-transform:uppercase;padding-bottom:8px">Wynik według kategorii</div>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%">${categoryRows(result)}</table>
  </td></tr>

  <tr><td style="padding:24px 32px">
    <div style="background:#0b1736;border-radius:10px;padding:20px">
      <div style="font:600 11px/1 Arial,sans-serif;color:#8aa6cd;letter-spacing:.12em;text-transform:uppercase">Największa szansa</div>
      <div style="font:500 16px/1.5 Arial,sans-serif;color:#fff;margin-top:10px">${esc(result.headline)}</div>
    </div>
  </td></tr>

  <tr><td style="padding:0 32px 8px">
    <div style="font:600 12px/1 Arial,sans-serif;color:${MUTED};letter-spacing:.1em;text-transform:uppercase;padding-bottom:4px">Trzy obszary o największym potencjale</div>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%">${improvements}</table>
  </td></tr>

  <tr><td style="padding:24px 32px 32px">
    <div style="font:400 13px/1.6 Arial,sans-serif;color:${MUTED}">
      Cześć ${esc(firstName)} - Commercial Score jest narzędziem diagnostycznym, nie wyceną.
      Pokazuje, gdzie leży niewykorzystany potencjał. Jeśli chcesz przejść przez to
      konkretniej, odpisz na tego maila.
    </div>
    <div style="font:400 12px/1.6 Arial,sans-serif;color:#94a3b8;margin-top:16px;border-top:1px solid ${RULE};padding-top:16px">
      Sport Space Pro &middot; sportspacepro.pl
    </div>
  </td></tr>
</table></body></html>`;

  const text = [
    `${config.scoreLabel}: ${result.total}/100 - ${result.level.name}`,
    result.level.description,
    "",
    "Wynik według kategorii:",
    ...result.categories.map((c) => `- ${c.label}: ${c.score}/100`),
    "",
    `Największa szansa: ${result.headline}`,
    "",
    "Trzy obszary o największym potencjale:",
    ...result.improvements.map(
      (i, idx) => `${idx + 1}. ${i.categoryLabel} (+${i.gain} pkt) - ${i.recommendation}`
    ),
    "",
    "Sport Space Pro - sportspacepro.pl",
  ].join("\n");

  return {
    subject: `Twój ${config.scoreLabel}: ${result.total}/100 (${result.level.name})`,
    html,
    text,
  };
}

export function buildAdminEmail(
  config: PersonaConfig<string>,
  result: CommercialScoreResult<string>,
  lead: {
    name: string;
    email: string;
    entityName: string;
    phone?: string;
    buyingIntent: string;
    consentMarketing: boolean;
  },
  context: { discipline: string; tier: string | null },
  /**
   * Raw inputs, included because this email is the record.
   *
   * There is no database, so anything missing here is gone. Category scores are
   * lossy - they cannot be turned back into answers - which is why the answers
   * ship verbatim, both as a readable table and as one line of JSON that pastes
   * straight into an assistant when several submissions need aggregating.
   */
  raw?: { answers: Record<string, number>; audience: Record<string, unknown> }
): { subject: string; html: string; text: string } {
  const intent = BUYING_INTENT_LABELS[lead.buyingIntent] ?? lead.buyingIntent;
  const hot = lead.buyingIntent === "active" || lead.buyingIntent === "3months";

  const rows: [string, string][] = [
    ["Typ", config.label],
    ["Nazwa", lead.entityName],
    ["Osoba", lead.name],
    ["Email", lead.email],
    ["Telefon", lead.phone || "-"],
    ["Dyscyplina", context.discipline],
    ["Skala", context.tier ?? "-"],
    ["Szuka partnerów", intent],
    ["Zgoda marketingowa", lead.consentMarketing ? "tak" : "nie"],
    ["Wynik", `${result.total}/100 (${result.level.name})`],
    ...result.categories.map(
      (c) => [c.label, `${c.score}/100`] as [string, string]
    ),
    [
      "Zasięg (surowe)",
      result.audience.channels
        .map((c) => `${c.label}: ${c.status === "na" ? "n/d" : c.value ?? 0}`)
        .join(", "),
    ],
  ];

  // Question-by-question, with the option the visitor actually chose. Without
  // this the answers exist nowhere after the request ends.
  const answerRows = raw
    ? config.questions
        .map((q) => {
          const v = raw.answers[q.id];
          const chosen = q.options.find((o) => o.value === v);
          return `<tr>
            <td style="padding:6px 8px 6px 0;border-bottom:1px solid ${RULE};font:400 12px/1.45 Arial,sans-serif;color:${MUTED};vertical-align:top">${esc(q.text)}</td>
            <td style="padding:6px 0;border-bottom:1px solid ${RULE};font:600 12px/1.45 Arial,sans-serif;color:#0f172a;white-space:nowrap;vertical-align:top">${v ?? "-"}/5 &middot; ${esc(chosen?.label ?? "-")}</td>
          </tr>`;
        })
        .join("")
    : "";

  const jsonBlock = raw
    ? JSON.stringify({
        persona: config.id,
        context,
        lead: { entityName: lead.entityName, email: lead.email, buyingIntent: lead.buyingIntent },
        answers: raw.answers,
        audience: raw.audience,
        total: result.total,
        level: result.level.id,
        categories: Object.fromEntries(result.categories.map((c) => [c.id, c.score])),
        modelVersion: result.modelVersion,
        benchmarkVersion: result.benchmarkVersion,
      })
    : "";

  const html = `<!doctype html><html lang="pl"><body style="margin:0;background:#f8fafc;padding:24px">
<table role="presentation" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border:1px solid ${RULE};border-radius:12px">
  <tr><td style="padding:28px 28px 12px">
    <div style="font:600 12px/1 Arial,sans-serif;color:${hot ? "#b45309" : NAVY};letter-spacing:.12em;text-transform:uppercase">
      ${hot ? "Lead gorący" : "Nowy lead"} &middot; Commercial Score
    </div>
    <div style="font:700 22px/1.2 Arial,sans-serif;color:#0f172a;margin-top:10px">${esc(lead.entityName)}</div>
    <div style="font:400 14px/1.5 Arial,sans-serif;color:${MUTED};margin-top:4px">${esc(intent)}</div>
  </td></tr>
  <tr><td style="padding:8px 28px 28px">
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr>
              <td style="padding:7px 0;border-bottom:1px solid ${RULE};font:400 13px/1.4 Arial,sans-serif;color:${MUTED};width:40%">${esc(k)}</td>
              <td style="padding:7px 0;border-bottom:1px solid ${RULE};font:600 13px/1.4 Arial,sans-serif;color:#0f172a">${esc(v)}</td>
            </tr>`
        )
        .join("")}
    </table>
    <div style="font:400 13px/1.6 Arial,sans-serif;color:${MUTED};margin-top:16px">
      <strong style="color:#0f172a">Największa szansa:</strong> ${esc(result.headline)}
    </div>
  </td></tr>

  ${
    raw
      ? `<tr><td style="padding:0 28px 20px">
    <div style="font:600 11px/1 Arial,sans-serif;color:${MUTED};letter-spacing:.1em;text-transform:uppercase;padding-bottom:8px">Odpowiedzi</div>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">${answerRows}</table>
  </td></tr>
  <tr><td style="padding:0 28px 28px">
    <div style="font:600 11px/1 Arial,sans-serif;color:${MUTED};letter-spacing:.1em;text-transform:uppercase;padding-bottom:6px">Rekord do zestawień</div>
    <div style="font:400 11px/1.5 monospace;color:#334155;background:#f8fafc;border:1px solid ${RULE};border-radius:8px;padding:12px;word-break:break-all">${esc(jsonBlock)}</div>
  </td></tr>`
      : ""
  }
</table></body></html>`;

  const text = [
    `${hot ? "LEAD GORACY" : "Nowy lead"} - Commercial Score`,
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    `Największa szansa: ${result.headline}`,
    ...(raw
      ? [
          "",
          "Odpowiedzi:",
          ...config.questions.map((q) => {
            const v = raw.answers[q.id];
            const chosen = q.options.find((o) => o.value === v);
            return `- [${v ?? "-"}/5] ${q.text} -> ${chosen?.label ?? "-"}`;
          }),
          "",
          "Rekord do zestawien (JSON):",
          jsonBlock,
        ]
      : []),
  ].join("\n");

  return {
    subject: `${hot ? "[GORACY] " : ""}Commercial Score ${result.total}/100 - ${lead.entityName}`,
    html,
    text,
  };
}

// Server-side PDF generator for the Tennis & Padel Self-Audit.
// Mirrors lib/assessment/fitness-pdf.ts on the shared pdf-shared.ts primitives.

import path from "path";
import PDFDocument from "pdfkit";
import {
  W,
  H,
  ML,
  CW,
  FONT_DIR,
  FONT_REG,
  FONT_BOLD,
  COLORS,
  formatDateTodayPL,
  drawFooter,
  drawHeader,
  drawBulletList,
  drawScoreBar,
} from "./pdf-shared";
import { TENNIS_PADEL_CONFIG } from "./tennis-padel";
import {
  overallScore,
  categoryScores,
  getMaturityLevel,
  weakestCategories,
  scaleLabelFor,
} from "./types";
import {
  buildLossCopy,
  describeVenueAnswers,
  partsToText,
  type LossResult,
} from "./tennis-padel-loss";

const C = TENNIS_PADEL_CONFIG;
/** Score + opportunities. The empty-hours page, when present, comes first. */
const SCORE_PAGES = 2;

const LEVEL_COLOR: Record<string, string> = {
  reaktywny: "#dc2626",
  podstawowy: "#f59e0b",
  rozwijajacy: "#f97316",
  zarzadzany: "#3b82f6",
  dojrzaly: "#059669",
};

export type GenerateTennisPadelPdfInput = {
  name: string;
  email: string;
  organization: string;
  answers: Record<string, number>;
  /** Empty-hours calculation; without it the report keeps its original two pages. */
  loss?: LossResult;
};

export function generateTennisPadelPDF(
  input: GenerateTennisPadelPdfInput
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 0,
        bufferPages: true,
        info: {
          Title: "Self-Audit Tennis & Padel - Sport Space Pro",
          Author: "Sport Space Pro",
          Subject: `Wyniki Self-Auditu - ${input.organization}`,
        },
      });

      doc.registerFont(FONT_REG, path.join(FONT_DIR, "Lato-Regular.ttf"));
      doc.registerFont(FONT_BOLD, path.join(FONT_DIR, "Lato-Bold.ttf"));

      const chunks: Buffer[] = [];
      doc.on("data", (ch: Buffer) => chunks.push(ch));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      const score = overallScore(C, input.answers);
      const level = getMaturityLevel(C, score);
      const cats = categoryScores(C, input.answers);
      const top3 = weakestCategories(C, input.answers, 3);
      const biggest = top3[0];
      const biggestCopy =
        C.categories.find((c) => c.id === biggest.id)?.opportunity ?? "";
      const tierColor = LEVEL_COLOR[level.id] ?? COLORS.navy;

      const pageOffset = input.loss ? 1 : 0;
      const totalPages = SCORE_PAGES + pageOffset;

      // ════════════════════════════════════════════════════════════════
      // Puste godziny na kortach (only when the club filled in Blocks A and B)
      // ════════════════════════════════════════════════════════════════
      if (input.loss) {
        drawLossPage(doc, input.loss, input.organization, totalPages);
        doc.addPage();
      }

      // ════════════════════════════════════════════════════════════════
      // Wynik
      // ════════════════════════════════════════════════════════════════
      doc.rect(0, 0, W, H).fillColor(COLORS.white).fillOpacity(1).fill();

      drawHeader(
        doc,
        "Self-Audit Tennis & Padel",
        `${input.organization} - ${formatDateTodayPL()}`
      );

      // Big score block
      const scoreBlockY = 120;
      doc.rect(ML, scoreBlockY, CW, 110)
        .fillColor(COLORS.cardBg).fillOpacity(1).fill();
      doc.rect(ML, scoreBlockY, 4, 110)
        .fillColor(COLORS.navy).fillOpacity(1).fill();

      doc.font(FONT_REG).fontSize(9).fillColor(COLORS.muted).fillOpacity(1)
        .text(C.scoreLabel.toUpperCase(), ML + 20, scoreBlockY + 16);
      doc.font(FONT_BOLD).fontSize(48).fillColor(COLORS.navy).fillOpacity(1)
        .text(`${score}`, ML + 20, scoreBlockY + 30, { continued: true })
        .font(FONT_REG).fontSize(20).fillColor(COLORS.muted)
        .text(" / 100");

      const badgeX = ML + 20;
      const badgeY = scoreBlockY + 84;
      const badgeText = level.name.toUpperCase();
      doc.font(FONT_BOLD).fontSize(9);
      const badgeW = doc.widthOfString(badgeText) + 24;
      doc.save().roundedRect(badgeX, badgeY, badgeW, 18, 9)
        .fillColor(tierColor).fillOpacity(0.14).fill().restore();
      doc.save().roundedRect(badgeX, badgeY, badgeW, 18, 9)
        .strokeColor(tierColor).lineWidth(0.6).stroke().restore();
      doc.font(FONT_BOLD).fontSize(9).fillColor(tierColor).fillOpacity(1)
        .text(badgeText, badgeX, badgeY + 5, { width: badgeW, align: "center" });

      // Level description
      let y = scoreBlockY + 130;
      doc.font(FONT_BOLD).fontSize(12).fillColor(COLORS.text).fillOpacity(1)
        .text("Co oznacza ten poziom", ML, y);
      y += 18;
      doc.font(FONT_REG).fontSize(10.5).fillColor(COLORS.muted)
        .text(level.description, ML, y, { width: CW, lineGap: 2 });
      y += doc.heightOfString(level.description, { width: CW, lineGap: 2 }) + 24;

      // Maturity scale
      doc.font(FONT_BOLD).fontSize(8).fillColor(COLORS.muted).fillOpacity(1)
        .text("POZYCJA NA SKALI DOJRZAŁOŚCI", ML, y);
      const barY = y + 12;
      const barH = 14;
      const segW = CW / C.levels.length;
      C.levels.forEach((lvl, i) => {
        const x = ML + i * segW;
        const color = LEVEL_COLOR[lvl.id] ?? COLORS.navy;
        const isCurrent = lvl.id === level.id;
        doc.save().rect(x, barY, segW, barH)
          .fillColor(color).fillOpacity(isCurrent ? 0.28 : 0.12).fill().restore();
        doc.save().rect(x, barY, segW, barH)
          .strokeColor(color).lineWidth(0.5).stroke().restore();
        doc.font(isCurrent ? FONT_BOLD : FONT_REG).fontSize(6.5)
          .fillColor(isCurrent ? COLORS.text : COLORS.muted).fillOpacity(1)
          .text(lvl.name, x, barY + barH + 4, { width: segW, align: "center" });
        doc.font(FONT_REG).fontSize(6).fillColor(COLORS.faint)
          .text(`${lvl.range[0]}-${lvl.range[1]}`, x, barY + barH + 14, {
            width: segW, align: "center",
          });
      });
      // marker
      const markerX = ML + (score / 100) * CW;
      doc.save()
        .moveTo(markerX, barY - 2)
        .lineTo(markerX - 5, barY - 9)
        .lineTo(markerX + 5, barY - 9)
        .closePath()
        .fillColor(COLORS.navy).fillOpacity(1).fill().restore();

      y = barY + barH + 34;

      // Category scores
      doc.font(FONT_BOLD).fontSize(12).fillColor(COLORS.text).fillOpacity(1)
        .text("Wynik w 6 obszarach", ML, y);
      y += 22;
      for (const cat of cats) {
        drawScoreBar(doc, ML, y, CW, `${cat.label} - ${cat.short}`, `${cat.score}/100`, cat.score);
        y += 40;
      }

      drawFooter(doc, 1 + pageOffset, totalPages);

      // ════════════════════════════════════════════════════════════════
      // Szanse
      // ════════════════════════════════════════════════════════════════
      doc.addPage();
      doc.rect(0, 0, W, H).fillColor(COLORS.white).fillOpacity(1).fill();
      drawHeader(doc, "Największe szanse", `${input.organization} - ${C.scoreLabel} ${score}/100`);

      y = 125;

      // Biggest opportunity - dark panel
      const panelH = 130;
      doc.rect(ML, y, CW, panelH).fillColor(COLORS.navyDeep).fillOpacity(1).fill();
      doc.font(FONT_BOLD).fontSize(8).fillColor("#8aa6cd").fillOpacity(1)
        .text("WASZA NAJWIĘKSZA SZANSA NA POPRAWĘ", ML + 20, y + 18);
      doc.font(FONT_BOLD).fontSize(22).fillColor(COLORS.white).fillOpacity(1)
        .text(`${biggest.label}`, ML + 20, y + 36, { continued: true })
        .font(FONT_REG).fontSize(13).fillColor("#8aa6cd")
        .text(`   ${biggest.score}/100`);
      doc.font(FONT_REG).fontSize(10).fillColor(COLORS.white).fillOpacity(0.92)
        .text(biggestCopy, ML + 20, y + 70, { width: CW - 40, lineGap: 2 });

      y += panelH + 28;

      // Top 3
      doc.font(FONT_BOLD).fontSize(12).fillColor(COLORS.text).fillOpacity(1)
        .text("Top 3 obszary do poprawy", ML, y);
      y += 22;
      top3.forEach((cat, i) => {
        doc.rect(ML, y, CW, 46).fillColor(COLORS.cardBg).fillOpacity(1).fill();
        doc.save().circle(ML + 22, y + 23, 11)
          .fillColor(COLORS.navy).fillOpacity(1).fill().restore();
        doc.font(FONT_BOLD).fontSize(10).fillColor(COLORS.white).fillOpacity(1)
          .text(`${i + 1}`, ML + 17, y + 18, { width: 10, align: "center" });
        doc.font(FONT_BOLD).fontSize(11).fillColor(COLORS.text).fillOpacity(1)
          .text(cat.label, ML + 44, y + 12);
        doc.font(FONT_REG).fontSize(9).fillColor(COLORS.muted)
          .text(cat.short, ML + 44, y + 27, { width: CW - 130 });
        doc.font(FONT_BOLD).fontSize(13).fillColor(COLORS.navy)
          .text(`${cat.score}/100`, ML + CW - 90, y + 17, { width: 76, align: "right" });
        y += 54;
      });

      y += 8;

      // Answer recap
      doc.font(FONT_BOLD).fontSize(12).fillColor(COLORS.text).fillOpacity(1)
        .text("Wasze odpowiedzi", ML, y);
      y += 20;
      const lowest = C.questions
        .filter((q) => (input.answers[q.id] ?? 0) <= 2)
        .slice(0, 5)
        .map((q) => `${q.text} - ocena: ${scaleLabelFor(C, input.answers[q.id])}`);
      if (lowest.length > 0) {
        doc.font(FONT_REG).fontSize(9.5).fillColor(COLORS.muted).fillOpacity(1)
          .text("Obszary ocenione najniżej:", ML, y);
        y += 16;
        y = drawBulletList(doc, lowest, ML, y, CW, { size: 9.5, gap: 7 });
      } else {
        doc.font(FONT_REG).fontSize(9.5).fillColor(COLORS.muted).fillOpacity(1)
          .text(
            "Żaden obszar nie został oceniony poniżej 3 - to dobra baza do dalszej optymalizacji.",
            ML, y, { width: CW }
          );
        y += 24;
      }

      y += 16;

      // Next step
      doc.rect(ML, y, CW, 76).fillColor(COLORS.cardBg).fillOpacity(1).fill();
      doc.rect(ML, y, 4, 76).fillColor(COLORS.navy).fillOpacity(1).fill();
      doc.font(FONT_BOLD).fontSize(11).fillColor(COLORS.text).fillOpacity(1)
        .text("Co dalej?", ML + 20, y + 14);
      doc.font(FONT_REG).fontSize(9.5).fillColor(COLORS.muted)
        .text(
          "Self-Audit pokazuje, gdzie są luki - na podstawie tego, co widzi zarząd. Pełna diagnoza przyczyn, dane od samych klientów i plan działań to zakres Growth Audit. Umów rozmowę: sportspacepro.pl",
          ML + 20, y + 32,
          { width: CW - 40, lineGap: 2 }
        );

      drawFooter(doc, 2 + pageOffset, totalPages);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

// ────────────────────────────────────────────────────────────────────
// Empty-hours page. Same figures and wording as the result screen
// (buildLossCopy), laid out for A4. Positions follow measured text
// heights, so a long list of agents pushes the rest down instead of
// overlapping it.
// ────────────────────────────────────────────────────────────────────

/** Amounts keep their non-breaking spaces, so "1 296 000 zł" never splits across lines. */
function pdfText(s: string): string {
  return s;
}

function drawLossPage(
  doc: PDFKit.PDFDocument,
  loss: LossResult,
  organization: string,
  totalPages: number
) {
  const copy = buildLossCopy(loss);

  doc.rect(0, 0, W, H).fillColor(COLORS.white).fillOpacity(1).fill();
  drawHeader(
    doc,
    "Puste godziny na kortach",
    `${organization} - ${formatDateTodayPL()}`
  );

  let y = 120;

  // Headline block
  const headline = pdfText(partsToText(copy.headline));
  const untapped = copy.untappedLine ? pdfText(partsToText(copy.untappedLine)) : null;
  const innerW = CW - 40;
  doc.font(FONT_BOLD).fontSize(17);
  const headlineH = doc.heightOfString(headline, { width: innerW, lineGap: 2 });
  doc.font(FONT_BOLD).fontSize(13);
  const untappedH = untapped ? doc.heightOfString(untapped, { width: innerW }) : 0;
  const blockH = 14 + 18 + headlineH + (untapped ? 10 + untappedH : 0) + 16;

  doc.rect(ML, y, CW, blockH).fillColor(COLORS.cardBg).fillOpacity(1).fill();
  doc.rect(ML, y, 4, blockH).fillColor(COLORS.navy).fillOpacity(1).fill();
  doc.font(FONT_REG).fontSize(9).fillColor(COLORS.muted).fillOpacity(1)
    .text("PUSTE GODZINY POZA SZCZYTEM", ML + 20, y + 16);
  doc.font(FONT_BOLD).fontSize(17).fillColor(COLORS.navy).fillOpacity(1)
    .text(headline, ML + 20, y + 34, { width: innerW, lineGap: 2 });
  if (untapped) {
    doc.font(FONT_BOLD).fontSize(13).fillColor(COLORS.text).fillOpacity(1)
      .text(untapped, ML + 20, y + 32 + headlineH + 10, { width: innerW });
  }
  y += blockH + 16;

  // What we assumed and how much of it is recoverable
  const body = copy.paragraph ?? copy.noOffPeakBody;
  if (body) {
    const text = typeof body === "string" ? body : pdfText(partsToText(body));
    doc.font(FONT_REG).fontSize(10.5).fillColor(COLORS.muted).fillOpacity(1)
      .text(text, ML, y, { width: CW, lineGap: 2 });
    y += doc.heightOfString(text, { width: CW, lineGap: 2 }) + 12;
  }

  if (copy.unknownNote) {
    doc.font(FONT_REG).fontSize(9.5);
    const noteH = doc.heightOfString(copy.unknownNote, { width: CW - 28, lineGap: 2 });
    doc.rect(ML, y, CW, noteH + 16).fillColor(COLORS.cardBg).fillOpacity(1).fill();
    doc.rect(ML, y, 4, noteH + 16).fillColor(COLORS.reactive).fillOpacity(1).fill();
    doc.font(FONT_REG).fontSize(9.5).fillColor(COLORS.text).fillOpacity(1)
      .text(copy.unknownNote, ML + 18, y + 8, { width: CW - 28, lineGap: 2 });
    y += noteH + 16 + 12;
  }

  const inputs = pdfText(
    "Dane, na których liczymy: " +
      describeVenueAnswers(loss)
        .map((r) => `${r.label.toLowerCase()}: ${r.value}`)
        .join("; ") +
      "."
  );
  doc.font(FONT_REG).fontSize(8.5).fillColor(COLORS.faint).fillOpacity(1)
    .text(inputs, ML, y, { width: CW, lineGap: 2 });
  y += doc.heightOfString(inputs, { width: CW, lineGap: 2 }) + 18;

  // Agents to start with
  doc.font(FONT_BOLD).fontSize(12).fillColor(COLORS.text).fillOpacity(1)
    .text(copy.agentsTitle, ML, y);
  y += 20;

  if (loss.agents.length === 0) {
    const none = copy.agentsNone ?? "";
    doc.font(FONT_REG).fontSize(10).fillColor(COLORS.muted).fillOpacity(1)
      .text(none, ML, y, { width: CW, lineGap: 2 });
    y += doc.heightOfString(none, { width: CW, lineGap: 2 }) + 14;
  }
  loss.agents.forEach((agent, i) => {
    const description = agent.description.charAt(0).toUpperCase() + agent.description.slice(1);
    doc.font(FONT_REG).fontSize(9);
    const descH = doc.heightOfString(description, { width: CW - 66, lineGap: 1 });
    const cardH = Math.max(40, 9 + 15 + descH + 8);
    doc.rect(ML, y, CW, cardH).fillColor(COLORS.cardBg).fillOpacity(1).fill();
    doc.save().circle(ML + 22, y + cardH / 2, 11)
      .fillColor(COLORS.navy).fillOpacity(1).fill().restore();
    doc.font(FONT_BOLD).fontSize(10).fillColor(COLORS.white).fillOpacity(1)
      .text(`${i + 1}`, ML + 17, y + cardH / 2 - 5, { width: 10, align: "center" });
    doc.font(FONT_BOLD).fontSize(11).fillColor(COLORS.text).fillOpacity(1)
      .text(agent.name, ML + 44, y + 9);
    doc.font(FONT_REG).fontSize(9).fillColor(COLORS.muted).fillOpacity(1)
      .text(description, ML + 44, y + 24, { width: CW - 66, lineGap: 1 });
    y += cardH + 6;
  });

  y += 6;

  // Call to action
  doc.font(FONT_REG).fontSize(9.5);
  const captionH = doc.heightOfString(copy.ctaCaption, { width: CW - 40, lineGap: 2 });
  const ctaH = 16 + 16 + 4 + captionH + 14;
  doc.rect(ML, y, CW, ctaH).fillColor(COLORS.navyDeep).fillOpacity(1).fill();
  doc.font(FONT_BOLD).fontSize(12).fillColor(COLORS.white).fillOpacity(1)
    .text(copy.ctaLabel, ML + 20, y + 16, {
      width: CW - 40,
      link: copy.ctaUrl,
      underline: true,
    });
  doc.font(FONT_REG).fontSize(9.5).fillColor(COLORS.white).fillOpacity(0.9)
    .text(copy.ctaCaption, ML + 20, y + 16 + 16 + 4, { width: CW - 40, lineGap: 2 });
  y += ctaH + 8;

  doc.font(FONT_REG).fontSize(8.5).fillColor(COLORS.faint).fillOpacity(1)
    .text(copy.disclaimer, ML, y, { width: CW });

  drawFooter(doc, 1, totalPages);
}

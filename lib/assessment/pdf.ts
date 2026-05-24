// Server-side PDF generator for Self Assessment results.
// Imports the shared domain data and renders a 3-page PDF with PDFKit.

import path from "path";
import PDFDocument from "pdfkit";
import {
  INSIGHTS,
  LEVELS,
  MAX_TOTAL,
  SCALE,
  SECTIONS,
  getLevel,
  scaleLabel,
  sectionScore,
  topRisks,
  totalScore,
  type LevelId,
} from "./data";

// ──────────────────────────────────────────────────────────────────────────
// Layout & theme
// ──────────────────────────────────────────────────────────────────────────

const W = 595.28; // A4 width in pt
const H = 841.89; // A4 height in pt
const ML = 48; // left/right margin
const CW = W - ML * 2;

const FONT_DIR = path.join(process.cwd(), "lib", "assessment", "pdf-fonts");
const FONT_REG = "Lato";
const FONT_BOLD = "Lato-Bold";

const COLORS = {
  navy: "#1e3a8a",
  navyDeep: "#0f1e4d",
  text: "#0f172a",
  muted: "#64748b",
  faint: "#94a3b8",
  rule: "#e2e8f0",
  cardBg: "#f8fafc",
  white: "#ffffff",
  chaos: "#dc2626",
  reactive: "#f59e0b",
  developing: "#3b82f6",
  high: "#059669",
};

const LEVEL_COLOR: Record<LevelId, string> = {
  chaos: COLORS.chaos,
  reactive: COLORS.reactive,
  developing: COLORS.developing,
  high: COLORS.high,
};

// ──────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────

function formatDateTodayPL(): string {
  const months = [
    "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
    "lipca", "sierpnia", "września", "października", "listopada", "grudnia",
  ];
  const d = new Date();
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function drawFooter(doc: PDFKit.PDFDocument, pageNum: number) {
  doc
    .moveTo(ML, H - 40)
    .lineTo(W - ML, H - 40)
    .strokeColor(COLORS.rule)
    .lineWidth(0.5)
    .stroke();
  doc
    .font(FONT_REG)
    .fontSize(8)
    .fillColor(COLORS.faint)
    .fillOpacity(1)
    .text("Sport Space Pro - sportspacepro.pl", ML, H - 30, {
      width: CW,
      align: "left",
    });
  doc
    .font(FONT_REG)
    .fontSize(8)
    .fillColor(COLORS.faint)
    .text(`Strona ${pageNum}/3`, ML, H - 30, {
      width: CW,
      align: "right",
    });
}

function drawHeader(
  doc: PDFKit.PDFDocument,
  title: string,
  subtitle: string
) {
  doc.font(FONT_BOLD).fontSize(20).fillColor(COLORS.navy).fillOpacity(1)
    .text(title, ML, 50, { width: CW });
  doc.font(FONT_REG).fontSize(11).fillColor(COLORS.muted)
    .text(subtitle, ML, 76, { width: CW });
  doc.moveTo(ML, 100).lineTo(W - ML, 100)
    .strokeColor(COLORS.rule).lineWidth(0.5).stroke();
}

function drawStatusBar(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number,
  currentScore: number
) {
  const span = MAX_TOTAL - 12; // 48
  const segments = LEVELS.map((l) => {
    const segWidthFrac = (l.range[1] - l.range[0] + 1) / (span + 1);
    return { level: l, frac: segWidthFrac, color: LEVEL_COLOR[l.id] };
  });

  const barY = y + 12;
  const barH = 14;
  let segX = x;

  doc.font(FONT_BOLD).fontSize(8).fillColor(COLORS.muted).fillOpacity(1)
    .text("POZYCJA NA SKALI DOJRZAŁOŚCI", x, y);

  for (const seg of segments) {
    const segW = width * seg.frac;
    doc.save().rect(segX, barY, segW, barH)
      .fillColor(seg.color).fillOpacity(0.18).fill().restore();
    doc.save().rect(segX, barY, segW, barH)
      .strokeColor(seg.color).lineWidth(0.5).stroke().restore();
    doc.font(FONT_REG).fontSize(7).fillColor(COLORS.muted).fillOpacity(1)
      .text(seg.level.name, segX, barY + barH + 4, {
        width: segW, align: "center",
      });
    doc.font(FONT_REG).fontSize(6.5).fillColor(COLORS.faint)
      .text(`${seg.level.range[0]}-${seg.level.range[1]}`, segX, barY + barH + 16, {
        width: segW, align: "center",
      });
    segX += segW;
  }

  const currentLevel = getLevel(currentScore);
  const segCenter = (currentLevel.range[0] + currentLevel.range[1]) / 2;
  const fracPos = (segCenter - 12) / span;
  const arrowX = x + width * fracPos;

  doc.save()
    .moveTo(arrowX, barY - 2)
    .lineTo(arrowX - 5, barY - 9)
    .lineTo(arrowX + 5, barY - 9)
    .closePath()
    .fillColor(COLORS.navy).fillOpacity(1).fill().restore();

  doc.font(FONT_BOLD).fontSize(9).fillColor(COLORS.navy).fillOpacity(1)
    .text(`${currentScore} pkt`, arrowX - 20, barY - 22, {
      width: 40, align: "center",
    });
}

function drawSectionBar(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number,
  label: string,
  score: number,
  max: number
) {
  const pct = Math.round((score / max) * 100);
  const barY = y + 16;
  const barH = 8;

  doc.font(FONT_BOLD).fontSize(10).fillColor(COLORS.text).fillOpacity(1)
    .text(label, x, y, { width: width - 80 });
  doc.font(FONT_BOLD).fontSize(10).fillColor(COLORS.navy)
    .text(`${score}/${max}  ·  ${pct}%`, x + width - 80, y, {
      width: 80, align: "right",
    });

  doc.save().roundedRect(x, barY, width, barH, 4)
    .fillColor(COLORS.rule).fillOpacity(1).fill().restore();

  const fillW = Math.max(2, width * (pct / 100));
  doc.save().roundedRect(x, barY, fillW, barH, 4)
    .fillColor(COLORS.navy).fillOpacity(1).fill().restore();
}

function drawBulletList(
  doc: PDFKit.PDFDocument,
  items: string[],
  x: number,
  y: number,
  width: number,
  opts?: { bulletColor?: string; size?: number; gap?: number; textColor?: string }
): number {
  const bulletColor = opts?.bulletColor ?? COLORS.navy;
  const textColor = opts?.textColor ?? COLORS.text;
  const size = opts?.size ?? 10;
  const gap = opts?.gap ?? 6;
  const indent = 12;
  let cursorY = y;

  for (const item of items) {
    doc.save().circle(x + 3, cursorY + size * 0.55, 2)
      .fillColor(bulletColor).fillOpacity(1).fill().restore();
    doc.font(FONT_REG).fontSize(size).fillColor(textColor).fillOpacity(1)
      .text(item, x + indent, cursorY, { width: width - indent });
    const h = doc.heightOfString(item, { width: width - indent });
    cursorY += h + gap;
  }
  return cursorY;
}

// ──────────────────────────────────────────────────────────────────────────
// Main entry
// ──────────────────────────────────────────────────────────────────────────

export type GeneratePdfInput = {
  name: string;
  email: string;
  organization: string;
  answers: Record<string, number>;
};

export function generateAssessmentPDF(input: GeneratePdfInput): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 0,
        bufferPages: true,
        info: {
          Title: "Self Assessment - Sport Space Pro",
          Author: "Sport Space Pro",
          Subject: `Wyniki Self Assessment - ${input.organization}`,
        },
      });

      doc.registerFont(FONT_REG, path.join(FONT_DIR, "Lato-Regular.ttf"));
      doc.registerFont(FONT_BOLD, path.join(FONT_DIR, "Lato-Bold.ttf"));

      const chunks: Buffer[] = [];
      doc.on("data", (ch: Buffer) => chunks.push(ch));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      const total = totalScore(input.answers);
      const level = getLevel(total);
      const tierColor = LEVEL_COLOR[level.id];
      const ptsToHigh = Math.max(0, 49 - total);

      // ════════════════════════════════════════════════════════════════
      // PAGE 1 — Wynik
      // ════════════════════════════════════════════════════════════════
      doc.rect(0, 0, W, H).fillColor(COLORS.white).fillOpacity(1).fill();

      drawHeader(
        doc,
        "Self Assessment",
        `${input.organization} - ${formatDateTodayPL()}`
      );

      // Big score block
      const scoreBlockY = 120;
      doc.rect(ML, scoreBlockY, CW, 110)
        .fillColor(COLORS.cardBg).fillOpacity(1).fill();
      doc.rect(ML, scoreBlockY, 4, 110)
        .fillColor(COLORS.navy).fillOpacity(1).fill();

      doc.font(FONT_REG).fontSize(9).fillColor(COLORS.muted).fillOpacity(1)
        .text("WYNIK CAŁKOWITY", ML + 20, scoreBlockY + 16);
      doc.font(FONT_BOLD).fontSize(48).fillColor(COLORS.navy).fillOpacity(1)
        .text(`${total}`, ML + 20, scoreBlockY + 30, { continued: true })
        .font(FONT_REG).fontSize(20).fillColor(COLORS.muted)
        .text(` / ${MAX_TOTAL}`);

      const badgeX = ML + 20;
      const badgeY = scoreBlockY + 84;
      const badgeText = level.name.toUpperCase();
      doc.font(FONT_BOLD).fontSize(9);
      const badgeW = doc.widthOfString(badgeText) + 24;
      doc.save().roundedRect(badgeX, badgeY, badgeW, 18, 9)
        .fillColor(tierColor).fillOpacity(0.14).fill().restore();
      doc.save().roundedRect(badgeX, badgeY, badgeW, 18, 9)
        .strokeColor(tierColor).lineWidth(0.8).stroke().restore();
      doc.font(FONT_BOLD).fontSize(9).fillColor(tierColor).fillOpacity(1)
        .text(badgeText, badgeX, badgeY + 5, {
          width: badgeW, align: "center",
        });

      const descX = ML + CW / 2 + 10;
      const descW = CW / 2 - 30;
      doc.font(FONT_BOLD).fontSize(11).fillColor(COLORS.text).fillOpacity(1)
        .text(level.short, descX, scoreBlockY + 16, { width: descW });
      doc.font(FONT_REG).fontSize(9).fillColor(COLORS.muted)
        .text(`Oczekiwany churn: ${level.expectedChurn} rocznie`,
              descX, scoreBlockY + 84, { width: descW });

      // Section bars
      let y = scoreBlockY + 130;
      doc.font(FONT_BOLD).fontSize(11).fillColor(COLORS.text).fillOpacity(1)
        .text("Wyniki w sekcjach", ML, y);
      y += 22;
      for (const sec of SECTIONS) {
        const s = sectionScore(input.answers, sec.id);
        drawSectionBar(doc, ML, y, CW, sec.short, s.score, s.max);
        y += 38;
      }

      // Status bar
      y += 8;
      drawStatusBar(doc, ML, y, CW, total);
      y += 78;

      // Gap to High Retention
      if (ptsToHigh > 0) {
        doc.rect(ML, y, CW, 36).fillColor(COLORS.cardBg).fillOpacity(1).fill();
        doc.font(FONT_REG).fontSize(10).fillColor(COLORS.muted).fillOpacity(1)
          .text("Do progu High Retention Organization brakuje:",
                ML + 16, y + 11);
        doc.font(FONT_BOLD).fontSize(14).fillColor(COLORS.navy)
          .text(`${ptsToHigh} pkt`, ML, y + 8, {
            width: CW - 16, align: "right",
          });
      } else {
        doc.rect(ML, y, CW, 36).fillColor(COLORS.cardBg).fillOpacity(1).fill();
        doc.font(FONT_BOLD).fontSize(11).fillColor(COLORS.high).fillOpacity(1)
          .text("Jesteście w 10% najlepiej zorganizowanych klubów.",
                ML + 16, y + 13);
      }

      drawFooter(doc, 1);

      // ════════════════════════════════════════════════════════════════
      // PAGE 2 — Diagnoza
      // ════════════════════════════════════════════════════════════════
      doc.addPage();
      doc.rect(0, 0, W, H).fillColor(COLORS.white).fillOpacity(1).fill();

      drawHeader(
        doc,
        "Diagnoza",
        `${level.name} - ${level.short}`
      );

      y = 120;

      // Level description
      doc.font(FONT_REG).fontSize(10.5).fillColor(COLORS.text).fillOpacity(1)
        .text(level.description, ML, y, { width: CW, align: "left" });
      y += doc.heightOfString(level.description, { width: CW }) + 18;

      // Risks
      doc.font(FONT_BOLD).fontSize(11).fillColor(COLORS.navy).fillOpacity(1)
        .text("Ryzyka na tym poziomie", ML, y);
      y += 16;
      y = drawBulletList(doc, level.risks, ML, y, CW, {
        bulletColor: tierColor, size: 10, gap: 5,
      });
      y += 12;

      // Typowe problemy
      doc.font(FONT_BOLD).fontSize(11).fillColor(COLORS.navy).fillOpacity(1)
        .text("Typowe problemy", ML, y);
      y += 16;
      y = drawBulletList(doc, level.problems, ML, y, CW, {
        bulletColor: "#f59e0b", size: 10, gap: 5,
      });
      y += 14;

      // Consequences (dark card at bottom)
      const conseqText = level.consequences.join("  ·  ");
      const cH = doc.heightOfString(conseqText, { width: CW - 32 }) + 36;
      doc.rect(ML, y, CW, cH).fillColor(COLORS.navy).fillOpacity(1).fill();
      doc.font(FONT_BOLD).fontSize(10).fillColor(COLORS.white).fillOpacity(0.7)
        .text("KONSEKWENCJE BIZNESOWE", ML + 16, y + 12);
      doc.font(FONT_REG).fontSize(10).fillColor(COLORS.white).fillOpacity(1)
        .text(conseqText, ML + 16, y + 28, { width: CW - 32 });

      drawFooter(doc, 2);

      // ════════════════════════════════════════════════════════════════
      // PAGE 3 — Co dalej + Calendly
      // ════════════════════════════════════════════════════════════════
      doc.addPage();
      doc.rect(0, 0, W, H).fillColor(COLORS.white).fillOpacity(1).fill();

      drawHeader(
        doc,
        "Co dalej",
        "Najsłabsze obszary, insighty i następny krok"
      );

      y = 120;

      // Top 3 weakest questions
      doc.font(FONT_BOLD).fontSize(11).fillColor(COLORS.navy).fillOpacity(1)
        .text("Top 3 obszary do natychmiastowej pracy", ML, y);
      y += 18;

      const weakest = topRisks(input.answers, 3);
      for (const q of weakest) {
        const v = input.answers[q.id] || 0;
        const cardH = 52;

        doc.save().rect(ML, y, CW, cardH)
          .fillColor(COLORS.cardBg).fillOpacity(1).fill().restore();
        doc.save().rect(ML, y, 3, cardH)
          .fillColor(tierColor).fillOpacity(1).fill().restore();

        const chipX = ML + CW - 70;
        const chipY = y + 10;
        doc.save().roundedRect(chipX, chipY, 56, 18, 9)
          .fillColor(tierColor).fillOpacity(0.14).fill().restore();
        doc.font(FONT_BOLD).fontSize(8).fillColor(tierColor).fillOpacity(1)
          .text(`${v}/5 - ${scaleLabel(v)}`, chipX, chipY + 5, {
            width: 56, align: "center",
          });

        doc.font(FONT_REG).fontSize(9).fillColor(COLORS.muted).fillOpacity(1)
          .text(q.text, ML + 14, y + 10, { width: CW - 90 });
        y += cardH + 6;
      }

      y += 8;

      // Insights — dark card
      const insights = INSIGHTS[level.id];
      // Calculate insights card height
      doc.font(FONT_REG).fontSize(10);
      let insightsContentH = 0;
      for (const ins of insights) {
        insightsContentH += doc.heightOfString(ins, { width: CW - 50 }) + 8;
      }
      const insightsCardH = insightsContentH + 44;

      doc.rect(ML, y, CW, insightsCardH).fillColor(COLORS.navyDeep).fillOpacity(1).fill();
      doc.font(FONT_BOLD).fontSize(9).fillColor(COLORS.white).fillOpacity(0.7)
        .text("3 RZECZY, KTÓRE WARTO PRZECZYTAĆ DWA RAZY",
              ML + 16, y + 14);

      let insY = y + 32;
      let idx = 1;
      for (const ins of insights) {
        doc.font(FONT_BOLD).fontSize(10).fillColor(COLORS.white).fillOpacity(0.5)
          .text(`0${idx}`, ML + 16, insY, { width: 20 });
        doc.font(FONT_REG).fontSize(10).fillColor(COLORS.white).fillOpacity(1)
          .text(ins, ML + 40, insY, { width: CW - 56 });
        insY += doc.heightOfString(ins, { width: CW - 56 }) + 8;
        idx++;
      }
      y += insightsCardH + 16;

      // CTA card (Calendly)
      const ctaH = 110;
      doc.rect(ML, y, CW, ctaH).fillColor(COLORS.navy).fillOpacity(1).fill();
      doc.font(FONT_BOLD).fontSize(14).fillColor(COLORS.white).fillOpacity(1)
        .text("Umówmy 30-minutową rozmowę", ML + 24, y + 18, {
          width: CW - 48,
        });
      doc.font(FONT_REG).fontSize(10).fillColor(COLORS.white).fillOpacity(0.85)
        .text(
          "Pokażę, jak skalibrować badanie satysfakcji pod Waszą organizację " +
          "i co realnie wyjdzie z porównania z Self Assessment.",
          ML + 24, y + 42, { width: CW - 48 }
        );

      const btnY = y + 76;
      const btnText = "calendly.com/grzyb-krzysiek/new-meeting";
      doc.font(FONT_BOLD).fontSize(10);
      const btnW = doc.widthOfString(btnText) + 28;
      doc.save().roundedRect(ML + 24, btnY, btnW, 24, 4)
        .fillColor(COLORS.white).fillOpacity(1).fill().restore();
      doc.font(FONT_BOLD).fontSize(10).fillColor(COLORS.navy).fillOpacity(1)
        .text(btnText, ML + 24, btnY + 7, {
          width: btnW, align: "center",
          link: "https://calendly.com/grzyb-krzysiek/new-meeting",
          underline: false,
        });

      drawFooter(doc, 3);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

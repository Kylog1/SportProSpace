// Layout constants and drawing primitives shared by every Self-Audit PDF.
// Moved verbatim out of lib/assessment/pdf.ts — the Football report must render
// byte-identical, which is asserted by the baseline PDF hash check.

import path from "path";

export const W = 595.28; // A4 width in pt
export const H = 841.89; // A4 height in pt
export const ML = 48; // left/right margin
export const CW = W - ML * 2;

export const FONT_DIR = path.join(process.cwd(), "lib", "assessment", "pdf-fonts");
export const FONT_REG = "Lato";
export const FONT_BOLD = "Lato-Bold";

export const COLORS = {
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

export function formatDateTodayPL(): string {
  const months = [
    "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
    "lipca", "sierpnia", "września", "października", "listopada", "grudnia",
  ];
  const d = new Date();
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function drawFooter(
  doc: PDFKit.PDFDocument,
  pageNum: number,
  totalPages = 3
) {
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
    .text(`Strona ${pageNum}/${totalPages}`, ML, H - 30, {
      width: CW,
      align: "right",
    });
}

export function drawHeader(
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

export function drawBulletList(
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

/** Horizontal labelled progress bar used for per-area scores. */
export function drawScoreBar(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number,
  label: string,
  valueText: string,
  pct: number
) {
  const barY = y + 16;
  const barH = 8;

  doc.font(FONT_BOLD).fontSize(10).fillColor(COLORS.text).fillOpacity(1)
    .text(label, x, y, { width: width - 80 });
  doc.font(FONT_BOLD).fontSize(10).fillColor(COLORS.navy)
    .text(valueText, x + width - 80, y, { width: 80, align: "right" });

  doc.save().roundedRect(x, barY, width, barH, 4)
    .fillColor(COLORS.rule).fillOpacity(1).fill().restore();

  const fillW = Math.max(2, width * (pct / 100));
  doc.save().roundedRect(x, barY, fillW, barH, 4)
    .fillColor(COLORS.navy).fillOpacity(1).fill().restore();
}

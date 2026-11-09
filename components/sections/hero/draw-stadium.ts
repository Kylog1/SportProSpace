/**
 * Hero visual "Trybuny": a stadium bowl made of dots (one dot = one customer voice), a hybrid pitch in the
 * middle (football with a padel/tennis court laid over its centre), LED boards around the pitch and a few
 * streams of dots leaving through the exits.
 *
 * Pure canvas code with no dependencies. The geometry is authored in a virtual 1440 x 900 space (the mockup)
 * and scaled to the real canvas. Draw once per resize; nothing animates.
 */

export type StadiumLayout = 'wide' | 'narrow';

export interface StadiumSample {
  /** Shares of customer voices in percent (0-100). They decide how many dots get each colour. */
  promoters: number;
  passives: number;
  detractors: number;
}

export interface StadiumInput {
  /** Canvas size in CSS pixels. */
  width: number;
  height: number;
  dpr: number;
  /** 'wide': stage fills the hero, bowl hugs the right edge. 'narrow': stage is its own block, bowl centred. */
  layout: StadiumLayout;
  sample: StadiumSample;
}

export interface ChipAnchor {
  /** CSS pixels, relative to the canvas. */
  x: number;
  y: number;
  align: 'center' | 'right';
}

export interface StadiumAnchors {
  boards: ChipAnchor;
  seats: ChipAnchor;
  exits: ChipAnchor;
}

type Rgb = readonly [number, number, number];

const COLORS = {
  glowCore: [22, 80, 200],
  glowMid: [10, 36, 100],
  star: [200, 220, 255],
  promoter: [156, 200, 255],
  promoterBright: [240, 247, 255],
  passive: [75, 107, 166],
  detractor: [255, 122, 89],
  ice: [170, 210, 255],
  cyan: [127, 230, 255],
  pitch: [30, 100, 230],
} as const satisfies Record<string, Rgb>;

const rgba = (c: Rgb, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const smooth = (x: number, a: number, b: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

/** Small seeded RNG, so the picture is identical on every render. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Superellipse point: a rounded-rectangle "stadium" ring. */
function superellipse(a: number, b: number, theta: number, n: number): [number, number] {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  return [a * Math.sign(c) * Math.abs(c) ** (2 / n), b * Math.sign(s) * Math.abs(s) ** (2 / n)];
}

const REF_W = 1440;
const REF_H = 900;
const CENTER = { x: 1170, y: 505 }; // centre of the pitch in the virtual space
const ROT = -0.18; // the whole bowl is rotated a little
const TILT = 0.6; // and flattened vertically, which gives the "seen from above" feel
const PX = 205; // half length / half width of the pitch (before the 1.12 zoom)
const PY = 133;
const PITCH_ZOOM = 1.12;
const RINGS = 16;
const BRIGHT_SHARE = 0.22; // the brightest part of the promoters is drawn white

export function drawStadium(ctx: CanvasRenderingContext2D, input: StadiumInput): StadiumAnchors {
  const { width, height, dpr, layout, sample } = input;
  const wide = layout === 'wide';
  const scale = wide ? clamp(height / REF_H, 0.62, 1.5) : width / 720;
  const offX = wide ? width - REF_W * scale : width / 2 - CENTER.x * scale;
  const offY = wide ? (height - REF_H * scale) / 2 : height / 2 - CENTER.y * scale;
  const rand = mulberry32(5);

  /* ---- screen space: glow and stars ---- */
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  const gx = offX + CENTER.x * scale;
  const gy = offY + 500 * scale;
  const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, 840 * scale);
  glow.addColorStop(0, rgba(COLORS.glowCore, 0.42));
  glow.addColorStop(0.5, rgba(COLORS.glowMid, 0.28));
  glow.addColorStop(1, rgba(COLORS.glowMid, 0));
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
  const starCount = Math.round((width * height) / 9000);
  for (let i = 0; i < starCount; i++) {
    ctx.fillStyle = rgba(COLORS.star, 0.1 + rand() * 0.4);
    ctx.beginPath();
    ctx.arc(rand() * width, rand() * height, rand() * 0.9 + 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  /* ---- virtual space ---- */
  ctx.setTransform(dpr * scale, 0, 0, dpr * scale, dpr * offX, dpr * offY);
  let zoom = 1;
  const tr = (x: number, y: number): [number, number] => {
    const px = x * zoom;
    const py = y * zoom;
    const xr = px * Math.cos(ROT) - py * Math.sin(ROT);
    const yr = px * Math.sin(ROT) + py * Math.cos(ROT);
    return [CENTER.x + xr, CENTER.y + yr * TILT];
  };
  const poly = (pts: Array<[number, number]>, close = false) => {
    ctx.beginPath();
    pts.forEach((p, i) => {
      const q = tr(p[0], p[1]);
      if (i === 0) ctx.moveTo(q[0], q[1]);
      else ctx.lineTo(q[0], q[1]);
    });
    if (close) ctx.closePath();
  };
  const rectPath = (x0: number, y0: number, x1: number, y1: number) =>
    poly(
      [
        [x0, y0],
        [x1, y0],
        [x1, y1],
        [x0, y1],
      ],
      true,
    );
  const circlePath = (cx: number, cy: number, r: number) => {
    const pts: Array<[number, number]> = [];
    for (let i = 0; i <= 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    poly(pts);
  };
  const line = (color: string, w: number) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = w;
    ctx.setLineDash([]);
  };
  const toScreen = (x: number, y: number): [number, number] => [offX + x * scale, offY + y * scale];

  /* ---- the stands ----
     Every dot gets a score (smooth noise + a few clusters of unhappy members). The colour is then chosen by
     percentile, so the shares of the three colours match the sample exactly (NPS = promoters - detractors). */
  const clusters = [
    { x: -330, y: 300, r: 200, b: -1.5 },
    { x: 150, y: 400, r: 140, b: -1.1 },
    { x: -60, y: -390, r: 100, b: -0.9 },
  ];
  // Where the stands melt into the background, in virtual x. The mockup values
  // (440 to 900) are the minimum; on narrower heroes the copy covers a larger
  // share of the width, so the fade is also kept past 40% and 70% of the width.
  const fadeFrom = wide ? Math.max(440, (width * 0.4 - offX) / scale) : 0;
  const fadeTo = wide ? Math.max(900, (width * 0.7 - offX) / scale) : 1;
  type Dot = { sx: number; sy: number; score: number; fade: number };
  const dots: Dot[] = [];
  for (let ring = 0; ring < RINGS; ring++) {
    const a = 322 + ring * 27;
    const b = 222 + ring * 21.5;
    const count = Math.floor((Math.PI * 2 * ((a + b) / 2) * 0.93) / 9.6);
    const offset = rand() * 6;
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2 + offset;
      const aisle = ((theta % (Math.PI / 8)) + Math.PI / 8) % (Math.PI / 8);
      if (aisle < 0.045) continue; // aisles between the sectors
      const [bx, by] = superellipse(a, b, theta, 2.7);
      const [sx, sy] = tr(bx, by);
      const [screenX, screenY] = toScreen(sx, sy);
      if (screenX > width + 24 || screenX < -24 || screenY < -24 || screenY > height + 24) continue;
      const fade = wide ? smooth(sx, fadeFrom, fadeTo) : 1; // the left side melts into the background behind the copy
      if (fade < 0.02) continue;
      let score =
        0.5 * Math.sin(bx * 0.011 + 1) * Math.cos(by * 0.013) +
        0.3 * Math.sin((bx - by) * 0.008 + ring * 0.2) +
        0.35 * (rand() - 0.5);
      for (const c of clusters) {
        const d = Math.hypot(bx - c.x, by - c.y);
        if (d < c.r) score += c.b * (1 - d / c.r) * 1.7;
      }
      dots.push({ sx, sy, score, fade });
    }
  }
  const sorted = dots
    .filter((d) => d.fade > 0.6)
    .map((d) => d.score)
    .sort((p, q) => p - q);
  const pick = (share: number) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * share))] ?? 0;
  const detractorMax = pick(sample.detractors / 100);
  const passiveMax = pick((sample.detractors + sample.passives) / 100);
  const brightMin = pick(1 - BRIGHT_SHARE);
  const minRadius = 1.5 / scale;
  for (const d of dots) {
    let color: string;
    let r = 2.3;
    if (d.score <= detractorMax) {
      color = rgba(COLORS.detractor, 0.95 * d.fade);
      r = 2.7;
    } else if (d.score <= passiveMax) {
      color = rgba(COLORS.passive, 0.7 * d.fade);
    } else if (d.score >= brightMin) {
      color = rgba(COLORS.promoterBright, d.fade);
      r = 2.5;
    } else {
      color = rgba(COLORS.promoter, 0.92 * d.fade);
    }
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(d.sx, d.sy, Math.max(r, minRadius), 0, Math.PI * 2);
    ctx.fill();
  }

  /* ---- exits: people leaving through the lower-left aisles (churn) ---- */
  let exitPoint: [number, number] = [CENTER.x - 400, CENTER.y + 330];
  [128, 138, 148].forEach((deg, idx) => {
    const theta = (deg * Math.PI) / 180;
    for (let j = 1; j <= 11; j++) {
      const a = 727 + j * (15 + j * 1.5);
      const b = 544 + j * (12 + j * 1.2);
      const [bx, by] = superellipse(a, b, theta, 2.7);
      const [sx, sy] = tr(bx + (rand() - 0.5) * 8, by + (rand() - 0.5) * 8);
      const life = 1 - j / 12;
      ctx.fillStyle = rgba(COLORS.detractor, 0.95 * life);
      ctx.beginPath();
      ctx.arc(sx, sy, Math.max(2.9 * (1 - j * 0.035), minRadius), 0, Math.PI * 2);
      ctx.fill();
      if (idx === 1 && j === 4) exitPoint = [sx, sy];
    }
  });

  /* ---- the pitch: football, with a padel/tennis court over its centre (the net sits on the halfway line) ---- */
  zoom = PITCH_ZOOM;
  rectPath(-PX, -PY, PX, PY);
  const fill = ctx.createLinearGradient(CENTER.x - 220, CENTER.y, CENTER.x + 220, CENTER.y);
  fill.addColorStop(0, rgba(COLORS.pitch, 0.34));
  fill.addColorStop(1, rgba(COLORS.pitch, 0.16));
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.fillStyle = rgba(COLORS.cyan, 0.13);
  rectPath(-112, -56, 112, 56);
  ctx.fill();

  line(rgba(COLORS.ice, 0.92), 1.4); // football
  rectPath(-PX, -PY, PX, PY);
  ctx.stroke();
  poly([[0, -PY], [0, PY]]);
  ctx.stroke();
  circlePath(0, 0, 35.7);
  ctx.stroke();
  for (const s of [-1, 1]) {
    rectPath(s * PX, -78.6, s * (PX - 64), 78.6);
    ctx.stroke();
    rectPath(s * PX, -35.7, s * (PX - 21.5), 35.7);
    ctx.stroke();
    circlePath(s * (PX - 43), 0, 2);
    ctx.stroke();
  }

  line(rgba(COLORS.cyan, 0.98), 1.4); // padel / tennis
  rectPath(-112, -56, 112, 56);
  ctx.stroke();
  poly([[-78, -56], [-78, 56]]);
  ctx.stroke();
  poly([[78, -56], [78, 56]]);
  ctx.stroke();
  poly([[-78, 0], [78, 0]]);
  ctx.stroke();
  line(rgba(COLORS.cyan, 0.98), 2.6); // the net
  poly([[0, -64], [0, 64]]);
  ctx.stroke();

  /* ---- LED boards around the pitch: the commercial layer ---- */
  const segments = 10;
  const gap = 5;
  const segWidth = (2 * PX - gap * (segments - 1)) / segments;
  const alphas = [0.95, 0.45, 0.75, 0.35, 0.9, 0.5, 0.85, 0.4, 0.95, 0.6];
  for (let i = 0; i < segments; i++) {
    const x0 = -PX + i * (segWidth + gap);
    const x1 = x0 + segWidth;
    ctx.fillStyle = rgba(COLORS.cyan, alphas[i]);
    poly([[x0, -PY - 16], [x1, -PY - 16], [x1, -PY - 7], [x0, -PY - 7]], true);
    ctx.fill();
    poly([[x0, PY + 7], [x1, PY + 7], [x1, PY + 16], [x0, PY + 16]], true);
    ctx.fill();
  }
  const endAlphas = [0.8, 0.4, 0.7, 0.5];
  for (let j = 0; j < 4; j++) {
    const y0 = -PY + 6 + j * 66;
    const y1 = y0 + 54;
    ctx.fillStyle = rgba(COLORS.cyan, endAlphas[j]);
    poly([[-PX - 16, y0], [-PX - 7, y0], [-PX - 7, y1], [-PX - 16, y1]], true);
    ctx.fill();
    poly([[PX + 7, y0], [PX + 16, y0], [PX + 16, y1], [PX + 7, y1]], true);
    ctx.fill();
  }
  const boardPoint = tr(40, -PY - 12);
  zoom = 1;

  /* ---- connectors for the three annotation chips (the chips themselves are DOM elements) ---- */
  const seatPoint = tr(260, -330);
  const connector = (color: string, ax: number, ay: number, bx: number, by: number) => {
    line(color, 1);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(bx, by, 3.2, 0, Math.PI * 2);
    ctx.fill();
  };
  const boardsChip: [number, number] = [boardPoint[0], boardPoint[1] - 40];
  const seatsChip: [number, number] = [seatPoint[0] - 70, seatPoint[1] - 92];
  const exitsChip: [number, number] = [exitPoint[0] - 28, exitPoint[1] + 10];
  if (wide) {
    // Keep the chip above the legend line at the bottom of the hero (legend top
    // is about 34px from the bottom edge, the chip is about 26px tall).
    exitsChip[1] = Math.min(exitsChip[1], (height - 56 - offY) / scale);
  }
  connector(rgba(COLORS.cyan, 1), boardPoint[0], boardPoint[1] - 28, boardPoint[0], boardPoint[1] - 2);
  connector(rgba(COLORS.promoter, 1), seatsChip[0], seatsChip[1], seatPoint[0] - 24, seatPoint[1] - 18);
  connector(rgba(COLORS.detractor, 1), exitsChip[0], exitsChip[1], exitPoint[0] - 3, exitPoint[1] + 2);

  const css = (p: [number, number], align: ChipAnchor['align']): ChipAnchor => {
    const [x, y] = toScreen(p[0], p[1]);
    return { x, y, align };
  };
  return { boards: css(boardsChip, 'center'), seats: css(seatsChip, 'right'), exits: css(exitsChip, 'right') };
}

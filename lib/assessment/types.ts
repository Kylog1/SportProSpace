// Shared shape for a normalised (0-100) Self-Audit configuration.
//
// NOTE ON FOOTBALL: the Football audit predates this abstraction and scores on a
// raw 12-60 scale with its own level model. It deliberately does NOT implement
// this interface — see lib/assessment/data.ts, which stays the single source of
// truth for Football and is intentionally untouched. New disciplines are built
// on the config below.

export type ScaleOption = {
  value: number;
  label: string;
  sub: string;
};

/** The 1-5 answer scale. Identical wording to Football's SCALE by design. */
export const SHARED_SCALE: ScaleOption[] = [
  { value: 1, label: "Nie", sub: "Nie mamy tego w ogóle" },
  { value: 2, label: "Raczej nie", sub: "Pojedyncze próby, bez systemu" },
  { value: 3, label: "Częściowo", sub: "Działa w niektórych grupach" },
  { value: 4, label: "W większości", sub: "Działa, ale z lukami" },
  { value: 5, label: "W pełni", sub: "Standard, mierzalny, powtarzalny" },
];

export type CategoryDef<TId extends string = string> = {
  id: TId;
  /** Short uppercase key shown in the UI, e.g. "ATTRACT". */
  label: string;
  /** One-line Polish description of what the category covers. */
  short: string;
  /** Shown as "Wasza największa szansa" copy when this is the weakest area. */
  opportunity: string;
};

export type QuestionDef<TId extends string = string> = {
  id: string;
  category: TId;
  text: string;
  hint?: string;
};

export type MaturityLevel = {
  id: string;
  name: string;
  /** Inclusive bounds on the normalised 0-100 score. */
  range: [number, number];
  description: string;
};

export type SportConfig<TId extends string = string> = {
  /** Matches the id in lib/assessment/sports.ts and the API `sport` field. */
  id: string;
  /** Human label, e.g. "Fitness i siłownie". */
  label: string;
  /** Headline used above the final score, e.g. "Fitness Growth Score". */
  scoreLabel: string;
  categories: CategoryDef<TId>[];
  questions: QuestionDef<TId>[];
  levels: MaturityLevel[];
  scale: ScaleOption[];
};

// ──────────────────────────────────────────────────────────────────────────
// Scoring (pure). Normalised to 0-100 regardless of question count.
// ──────────────────────────────────────────────────────────────────────────

const MIN_PER_Q = 1;
const MAX_PER_Q = 5;

/**
 * Normalise a raw point total to 0-100.
 * With n questions the raw range is [n, 5n], so:
 *   score = ((total - n) / (4n)) * 100
 * For the 18-question Fitness audit this is exactly ((total - 18) / 72) * 100.
 */
export function normaliseScore(total: number, questionCount: number): number {
  const min = questionCount * MIN_PER_Q;
  const span = questionCount * MAX_PER_Q - min;
  if (span <= 0) return 0;
  const pct = ((total - min) / span) * 100;
  return Math.round(Math.min(100, Math.max(0, pct)));
}

export function rawTotal(answers: Record<string, number>): number {
  return Object.values(answers).reduce((a, b) => a + b, 0);
}

export type CategoryScore<TId extends string = string> = {
  id: TId;
  label: string;
  short: string;
  /** Normalised 0-100. */
  score: number;
  /** Raw points and max, kept for display/debugging. */
  raw: number;
  rawMax: number;
};

export function categoryScores<TId extends string>(
  config: SportConfig<TId>,
  answers: Record<string, number>
): CategoryScore<TId>[] {
  return config.categories.map((cat) => {
    const qs = config.questions.filter((q) => q.category === cat.id);
    const raw = qs.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0);
    const answered = qs.filter((q) => answers[q.id] != null).length;
    return {
      id: cat.id,
      label: cat.label,
      short: cat.short,
      score: answered === qs.length ? normaliseScore(raw, qs.length) : 0,
      raw,
      rawMax: qs.length * MAX_PER_Q,
    };
  });
}

/**
 * Overall score, derived from the raw total.
 *
 * This is mathematically identical to the unweighted mean of the category
 * scores — every category holds the same number of questions, so
 *   mean(((Ci - 3) / 12) * 100) === ((T - 18) / 72) * 100
 * Deriving it from the total avoids compounding per-category rounding.
 */
export function overallScore<TId extends string>(
  config: SportConfig<TId>,
  answers: Record<string, number>
): number {
  return normaliseScore(rawTotal(answers), config.questions.length);
}

export function getMaturityLevel<TId extends string>(
  config: SportConfig<TId>,
  score: number
): MaturityLevel {
  return (
    config.levels.find((l) => score >= l.range[0] && score <= l.range[1]) ??
    config.levels[0]
  );
}

/**
 * Weakest categories first. Ties break on the config's category order so the
 * output is stable rather than dependent on sort implementation.
 */
export function weakestCategories<TId extends string>(
  config: SportConfig<TId>,
  answers: Record<string, number>,
  limit = 3
): CategoryScore<TId>[] {
  const scored = categoryScores(config, answers);
  const order = new Map(config.categories.map((c, i) => [c.id, i]));
  return [...scored]
    .sort((a, b) => a.score - b.score || order.get(a.id)! - order.get(b.id)!)
    .slice(0, limit);
}

export function scaleLabelFor(config: SportConfig, value: number): string {
  return config.scale.find((s) => s.value === value)?.label ?? String(value);
}

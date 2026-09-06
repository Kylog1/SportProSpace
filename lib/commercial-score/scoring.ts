// The Commercial Score engine. Pure functions, no I/O, no React.
//
// Final score is a weighted mean of category scores on 0-100. One category
// (Audience Power) is computed from declared numbers via audience.ts; the rest
// are computed from 1-5 answers. Weights live in the persona config, thresholds
// in types.ts, market assumptions in benchmarks.ts - so tuning the model never
// means editing this file.

import { scoreAudience, clamp } from "./audience";
import { resolveAnchors, BENCHMARK_VERSION } from "./benchmarks";
import { getRecommendation } from "./recommendations";
import {
  MODEL_VERSION,
  getScoreLevel,
  type AudienceValue,
  type CategoryResult,
  type CommercialScoreResult,
  type ImprovementItem,
  type LevelTier,
  type PersonaConfig,
} from "./types";

const MIN_POINTS = 1;
const MAX_POINTS = 5;

/** How many process areas to surface as "areas to improve". */
const IMPROVEMENT_COUNT = 3;

/** Below this, the top category is the least bad one, not a strength. */
const STRENGTH_FLOOR = 50;

/** Minimum spread between best and worst before the contrast is worth drawing. */
const MIN_CONTRAST = 10;

export type ScoreInput = {
  answers: Record<string, number>;
  audience: Record<string, AudienceValue>;
  tier?: LevelTier | null;
};

/**
 * Normalise a raw point total to 0-100. With n questions the raw range is
 * [n, 5n], so score = ((total - n) / 4n) * 100.
 */
export function normalise(total: number, questionCount: number): number {
  const min = questionCount * MIN_POINTS;
  const span = questionCount * MAX_POINTS - min;
  if (span <= 0) return 0;
  return clamp(((total - min) / span) * 100, 0, 100);
}

function qualitativeScore<C extends string>(
  config: PersonaConfig<C>,
  categoryId: C,
  answers: Record<string, number>
): number {
  const qs = config.questions.filter((q) => q.category === categoryId);
  if (qs.length === 0) return 0;
  const raw = qs.reduce((acc, q) => acc + (answers[q.id] ?? MIN_POINTS), 0);
  return Math.round(normalise(raw, qs.length));
}

/**
 * Ranks the areas worth acting on.
 *
 * Ordering by recoverable points - (100 - score) * weight - rather than by the
 * raw score, because a category sitting at 30 with an 11% weight matters less
 * than one at 45 with 25%. The visitor gets the advice that moves their score
 * furthest, and the number doubles as the pitch for the paid audit.
 *
 * Audience Power is excluded on purpose. It is an asset, not a process: ranked
 * on the gap alone it tops the list for exactly the profiles least able to act
 * on it, and the resulting advice reduces to "have more followers".
 */
function buildImprovements<C extends string>(
  config: PersonaConfig<C>,
  categories: CategoryResult<C>[],
  answers: Record<string, number>
): ImprovementItem[] {
  const order = new Map(config.categories.map((c, i) => [c.id, i]));

  return categories
    .filter((c) => c.kind === "qualitative")
    .sort((a, b) => b.gain - a.gain || order.get(a.id)! - order.get(b.id)!)
    .slice(0, IMPROVEMENT_COUNT)
    .map((cat) => {
      // Within the category, the weakest answer is the concrete thing to fix.
      const weakest = config.questions
        .filter((q) => q.category === cat.id)
        .map((q) => ({ q, answer: answers[q.id] ?? MIN_POINTS }))
        .sort((a, b) => a.answer - b.answer)[0];

      return {
        categoryId: cat.id,
        categoryLabel: cat.label,
        gain: cat.gain,
        questionId: weakest.q.id,
        questionText: weakest.q.text,
        answer: weakest.answer,
        recommendation: getRecommendation(weakest.q.id, weakest.answer),
      };
    });
}

/**
 * The one-sentence "biggest opportunity" line, assembled from two clauses
 * written by hand in the persona config. Deterministic by construction - the
 * same answers always produce the same sentence, and no text is generated.
 */
function buildHeadline<C extends string>(
  config: PersonaConfig<C>,
  strongest: CategoryResult<C>,
  weakest: CategoryResult<C>
): string {
  const strong = config.categories.find((c) => c.id === strongest.id);
  const weak = config.categories.find((c) => c.id === weakest.id);
  if (!strong || !weak) return "";

  // Two cases where the "X is your strength, but Y limits it" contrast would
  // read as flattery rather than diagnosis:
  //   - a flat profile, where the top category is no better than the rest;
  //   - a uniformly weak profile, where the top category is simply the least
  //     bad one. Calling 33/100 a strong asset portfolio costs credibility for
  //     the whole result screen.
  const hasRealStrength = strongest.score >= STRENGTH_FLOOR;
  const hasContrast = strongest.score - weakest.score >= MIN_CONTRAST;
  if (strongest.id === weakest.id || !hasRealStrength || !hasContrast) {
    return weak.opportunity;
  }
  return `${strong.strength}, ale ${weak.limits}.`;
}

export function scoreSubmission<C extends string>(
  config: PersonaConfig<C>,
  input: ScoreInput
): CommercialScoreResult<C> {
  const anchors = resolveAnchors({ persona: config.id, tier: input.tier });
  const audience = scoreAudience(
    config.channels,
    input.audience,
    anchors,
    config.quality
  );

  const categories: CategoryResult<C>[] = config.categories.map((cat) => {
    const score =
      cat.kind === "audience"
        ? audience.score
        : qualitativeScore(config, cat.id, input.answers);

    return {
      id: cat.id,
      label: cat.label,
      short: cat.short,
      weight: cat.weight,
      kind: cat.kind,
      score,
      gain: Math.round((100 - score) * cat.weight * 10) / 10,
    };
  });

  const total = Math.round(
    categories.reduce((acc, c) => acc + c.weight * c.score, 0)
  );

  // Ties break on config order so the output is stable rather than dependent on
  // sort implementation.
  const order = new Map(config.categories.map((c, i) => [c.id, i]));
  const byScore = [...categories].sort(
    (a, b) => b.score - a.score || order.get(a.id)! - order.get(b.id)!
  );
  const strongest = byScore[0];
  const weakest = byScore[byScore.length - 1];

  return {
    total,
    level: getScoreLevel(total),
    categories,
    strongest,
    weakest,
    improvements: buildImprovements(config, categories, input.answers),
    headline: buildHeadline(config, strongest, weakest),
    audience,
    modelVersion: MODEL_VERSION,
    benchmarkVersion: BENCHMARK_VERSION,
  };
}

/**
 * Guard against a config whose weights drift after an edit. Called by the test
 * script and by the API route at module load - a silently unnormalised weight
 * set would skew every score without ever throwing.
 */
export function assertConfigValid<C extends string>(
  config: PersonaConfig<C>
): void {
  const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
  const near = (v: number) => Math.abs(v - 1) < 1e-9;

  const catWeights = sum(config.categories.map((c) => c.weight));
  if (!near(catWeights)) {
    throw new Error(
      `[commercial-score:${config.id}] wagi kategorii sumują się do ${catWeights}, oczekiwano 1`
    );
  }

  const chWeights = sum(config.channels.map((c) => c.weight));
  if (!near(chWeights)) {
    throw new Error(
      `[commercial-score:${config.id}] wagi kanałów sumują się do ${chWeights}, oczekiwano 1`
    );
  }

  const audienceCats = config.categories.filter((c) => c.kind === "audience");
  if (audienceCats.length !== 1) {
    throw new Error(
      `[commercial-score:${config.id}] oczekiwano dokładnie 1 kategorii typu "audience", jest ${audienceCats.length}`
    );
  }

  for (const q of config.questions) {
    if (q.options.length !== 5) {
      throw new Error(
        `[commercial-score:${config.id}] pytanie ${q.id} ma ${q.options.length} opcji, oczekiwano 5`
      );
    }
  }
}

// Shared types for the Commercial Score.
//
// Deliberately independent of lib/assessment/*: the Self-Audit engine scores an
// unweighted 1-5 Likert questionnaire where every category holds the same number
// of questions. Commercial Score needs three things that engine cannot express -
// per-question answer options, weighted categories, and a category scored from
// raw numbers instead of answers - so it gets its own model rather than a fourth
// branch in the existing one. Nothing here imports React or touches the network.

export type PersonaId = "athlete" | "organization";

/** Declared size/reach tier. Selects which benchmark anchor table applies. */
export type LevelTier =
  | "lokalny"
  | "regionalny"
  | "ogolnopolski"
  | "miedzynarodowy";

export type CategoryKind = "qualitative" | "audience";

export type AnswerOption = {
  /** 1-5. The raw points this answer contributes. */
  value: number;
  label: string;
  sub?: string;
};

export type QuestionDef<C extends string = string> = {
  id: string;
  category: C;
  text: string;
  hint?: string;
  /**
   * Exactly five options, anchored in observable facts rather than agreement.
   * A generic "Nie / Raczej nie / Częściowo" scale invites self-flattery; asking
   * what actually exists does not.
   */
  options: AnswerOption[];
};

export type CategoryDef<C extends string = string> = {
  id: C;
  /** Short uppercase key shown in the UI, e.g. "SALES CAPABILITY". */
  label: string;
  /** One-line Polish description of what the category covers. */
  short: string;
  /** Share of the final score. All categories in a config must sum to 1. */
  weight: number;
  kind: CategoryKind;
  /**
   * Clause used when this is the strongest category, e.g.
   * "Wasz zasięg jest mocną stroną". Joined with another category's `limits`
   * into the headline sentence - see buildHeadline() in scoring.ts.
   */
  strength: string;
  /** Clause used when this is the weakest, e.g. "brak oferty ogranicza...". */
  limits: string;
  /** Full sentence shown when this category tops the improvement list. */
  opportunity: string;
};

// ──────────────────────────────────────────────────────────────────────────
// Audience
// ──────────────────────────────────────────────────────────────────────────

/**
 * A number the visitor declares. `null` means "not answered yet", "n/a" means
 * the channel structurally does not apply (a federation has no home attendance).
 * The two are scored differently on purpose - see audience.ts.
 */
export type AudienceValue = number | "n/a" | null;

export type AudienceChannelDef = {
  /** Also the key in the benchmark anchor table. */
  id: string;
  label: string;
  hint?: string;
  /** Share of the audience sub-score. All channels must sum to 1. */
  weight: number;
  placeholder?: string;
  /** Label of the "does not apply" toggle. Omit to hide the toggle. */
  naLabel?: string;
};

/** [floor, ref] - floor scores 0, ref scores 100, log-interpolated between. */
export type Anchor = [number, number];

export type AnchorTable = Record<string, Anchor>;

/**
 * Optional quality correction applied to the weighted channel mean. Used by the
 * athlete model to turn declared views into a check on declared followers.
 */
export type QualityMultiplierDef = {
  /** Field holding the observed metric (e.g. average video views). */
  numerator: string;
  /** Fields summed into the base the metric is compared against. */
  denominator: string[];
  /** Ascending by `below`; the first matching bracket wins. */
  brackets: { below: number; factor: number; label: string }[];
  /** Applied when the metric is missing, so a blank field never penalises. */
  fallback: number;
};

// ──────────────────────────────────────────────────────────────────────────
// Levels
// ──────────────────────────────────────────────────────────────────────────

export type ScoreLevel = {
  id: string;
  /** English product term, kept as a brand label. */
  name: string;
  /** Inclusive bounds on the final 0-100 score. */
  range: [number, number];
  /** Polish sentence shown under the level name. */
  description: string;
};

/**
 * One scale for both personas. The brief used "Commercially Ready" for an
 * athlete at 73 and "Strong Commercial Potential" for an organization at the
 * same 73; keeping both would make the top level meaningless, so 65-84 is
 * Strong and Commercially Ready starts at 85.
 *
 * The lowest level is named for what is unused rather than what is missing -
 * a lead magnet that opens with "Early Stage" ends the conversation.
 */
export const SCORE_LEVELS: ScoreLevel[] = [
  {
    id: "untapped",
    name: "Untapped Potential",
    range: [0, 24],
    description:
      "Aktywa istnieją, ale nie są jeszcze opisane ani zamienione na ofertę dla marek.",
  },
  {
    id: "developing",
    name: "Developing",
    range: [25, 44],
    description:
      "Pierwsze elementy są na miejscu, brakuje powtarzalnego procesu i konsekwencji.",
  },
  {
    id: "emerging",
    name: "Emerging Commercial Potential",
    range: [45, 64],
    description:
      "Podstawy działają. Największe rezerwy leżą w ofercie, sprzedaży i mierzeniu efektów.",
  },
  {
    id: "strong",
    name: "Strong Commercial Potential",
    range: [65, 84],
    description:
      "Solidna baza aktywów i procesu. Do najwyższego poziomu brakuje dopracowania kilku obszarów.",
  },
  {
    id: "ready",
    name: "Commercially Ready",
    range: [85, 100],
    description:
      "Aktywa, oferta i proces sprzedaży działają razem. Gotowość do rozmów z markami na poziomie rynkowym.",
  },
];

export function getScoreLevel(score: number): ScoreLevel {
  return (
    SCORE_LEVELS.find((l) => score >= l.range[0] && score <= l.range[1]) ??
    SCORE_LEVELS[0]
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Persona configuration
// ──────────────────────────────────────────────────────────────────────────

export type PersonaConfig<C extends string = string> = {
  id: PersonaId;
  /** URL segment under /commercial-score. */
  slug: string;
  /** Headline above the score, e.g. "Athlete Commercial Score". */
  scoreLabel: string;
  /** Human label for the persona, used in copy and lead emails. */
  label: string;
  categories: CategoryDef<C>[];
  questions: QuestionDef<C>[];
  /** The single category with kind "audience". */
  audienceCategory: C;
  channels: AudienceChannelDef[];
  quality?: QualityMultiplierDef;
};

// ──────────────────────────────────────────────────────────────────────────
// Results
// ──────────────────────────────────────────────────────────────────────────

export type CategoryResult<C extends string = string> = {
  id: C;
  label: string;
  short: string;
  weight: number;
  kind: CategoryKind;
  /** Normalised 0-100. */
  score: number;
  /**
   * Points recoverable by lifting this category to 100, i.e.
   * (100 - score) * weight. Ranking on this rather than on the raw score means
   * the advice points where the score actually moves most.
   */
  gain: number;
};

export type ImprovementItem = {
  categoryId: string;
  categoryLabel: string;
  gain: number;
  questionId: string;
  questionText: string;
  /** The answer the visitor actually gave, 1-5. */
  answer: number;
  /** Pre-written line keyed to that question. Never generated. */
  recommendation: string;
};

export type AudienceChannelResult = {
  id: string;
  label: string;
  /** Weight after redistribution, so the numbers on screen add up. */
  weight: number;
  score: number;
  value: AudienceValue;
  status: "scored" | "zero" | "na";
};

export type AudienceResult = {
  /** 0-100, after the quality multiplier. */
  score: number;
  /** Before the quality multiplier, for debugging and admin views. */
  reachScore: number;
  multiplier: number;
  multiplierLabel: string | null;
  channels: AudienceChannelResult[];
};

export type CommercialScoreResult<C extends string = string> = {
  total: number;
  level: ScoreLevel;
  categories: CategoryResult<C>[];
  strongest: CategoryResult<C>;
  weakest: CategoryResult<C>;
  /** Three process categories, audience excluded. See scoring.ts. */
  improvements: ImprovementItem[];
  /** Single deterministic sentence built from strongest + weakest. */
  headline: string;
  audience: AudienceResult;
  modelVersion: string;
  benchmarkVersion: string;
};

// ──────────────────────────────────────────────────────────────────────────
// Versioning
// ──────────────────────────────────────────────────────────────────────────

/**
 * Bumped whenever weights, question points or level bounds change. Stored on
 * every submission so historical results stay interpretable after a
 * recalibration, and so old raw answers can be re-scored and compared.
 */
export const MODEL_VERSION = "1.0.0";

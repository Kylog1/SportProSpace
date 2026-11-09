// Tennis & Padel: how much money the club loses on empty off-peak hours, and
// which AI agents to recommend. Pure functions, no I/O, shared by the quiz UI,
// the API route, the e-mails and the PDF so the number is the same everywhere.
// All wording and coefficients come from tennis-padel-loss-config.ts.

import {
  TENNIS_PADEL_LOSS_CONFIG,
  type AgentDef,
  type AgentId,
  type NumberFieldDef,
  type NumberFieldId,
  type OccupancyChoiceId,
  type TennisPadelLossConfig,
} from "./tennis-padel-loss-config";

const NBSP = " ";

// ──────────────────────────────────────────────────────────────────────────
// Formatting (Polish: space as thousands separator, "zł" after the amount)
// ──────────────────────────────────────────────────────────────────────────

/** 139000 -> "139 000" (non-breaking spaces, also for 4-digit numbers). */
export function formatInt(n: number): string {
  const rounded = Math.round(n);
  const digits = String(Math.abs(rounded)).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    NBSP
  );
  return rounded < 0 ? `-${digits}` : digits;
}

/** 139000 -> "139 000 zł". */
export function formatPln(n: number): string {
  return `${formatInt(n)}${NBSP}zł`;
}

/** 9900, 19800 -> "9 900–19 800 zł" (one "zł", at the end). */
export function formatRange(low: number, high: number): string {
  return `${formatInt(low)}–${formatPln(high)}`;
}

/**
 * Round to the nearest `step`. A positive value never rounds down to zero:
 * "0 zł" next to "puste godziny" would contradict itself.
 */
export function roundTo(value: number, step: number): number {
  if (value <= 0) return 0;
  const rounded = Math.round(Number((value / step).toFixed(6))) * step;
  return Math.max(rounded, step);
}

// ──────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────

export type VenueInputs = {
  courts: number;
  openHoursPerDay: number;
  peakHoursPerDay: number;
  offPeakPricePln: number;
  occupancyChoice: OccupancyChoiceId;
};

export type AgentAnswers = Record<AgentId, number>;

export type RecommendedAgent = {
  id: AgentId;
  name: string;
  description: string;
  /** The 1-5 answer that triggered the recommendation. */
  score: number;
  /** Label of that answer card, e.g. "Raczej nie". */
  answerLabel: string;
  /** "weak": answered 1-2. "lowest": nothing weak, so the lowest-rated ones. */
  reason: "weak" | "lowest";
};

export type LossResult = {
  inputs: VenueInputs;
  agentAnswers: AgentAnswers;
  occupancy: number;
  occupancyUnknown: boolean;
  offPeakHoursPerDay: number;
  /** Court-hours available off-peak per month. */
  offPeakCapacity: number;
  hasOffPeak: boolean;
  emptyHoursExact: number;
  emptyHours: number;
  untappedValue: number;
  recoverLow: number;
  recoverHigh: number;
  yearlyLow: number;
  yearlyHigh: number;
  /** True when the upper estimate was capped because occupancy is already high. */
  recoverHighCapped: boolean;
  agents: RecommendedAgent[];
};

// ──────────────────────────────────────────────────────────────────────────
// Validation
// ──────────────────────────────────────────────────────────────────────────

export type FieldContext = Partial<Record<NumberFieldId, number>>;

export type FieldCheck =
  | { ok: true; value: number }
  | { ok: false; error: string };

function fieldDef(
  id: NumberFieldId,
  cfg: TennisPadelLossConfig
): NumberFieldDef {
  const def = cfg.numberFields.find((f) => f.id === id);
  if (!def) throw new Error(`Unknown number field: ${id}`);
  return def;
}

/** Upper bound of a field, taking the dependent field (peak <= open) into account. */
export function effectiveMax(
  def: NumberFieldDef,
  ctx: FieldContext
): number {
  if (def.maxFrom) {
    const bound = ctx[def.maxFrom];
    if (bound != null) return Math.min(def.max, bound);
  }
  return def.max;
}

/** Parse what a person typed: "16", "99,50", "1 000". Null when it is not a number. */
export function parseNumberInput(raw: string): number | null {
  const cleaned = raw.replace(/[\s ]/g, "").replace(",", ".");
  if (!/^-?\d+(\.\d+)?$/.test(cleaned)) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

/** Range and type check of an already-numeric value. Used by the UI and the server. */
export function checkNumberField(
  id: NumberFieldId,
  value: number,
  ctx: FieldContext = {},
  cfg: TennisPadelLossConfig = TENNIS_PADEL_LOSS_CONFIG
): FieldCheck {
  const def = fieldDef(id, cfg);
  if (!Number.isFinite(value)) {
    return { ok: false, error: "Wpisz liczbę." };
  }
  if (def.integer && !Number.isInteger(value)) {
    return { ok: false, error: "Wpisz liczbę całkowitą, bez przecinka." };
  }
  const max = effectiveMax(def, ctx);
  if (value < def.min || value > max) {
    if (def.maxFrom && ctx[def.maxFrom] != null && max < def.max && value > max) {
      return {
        ok: false,
        error: `Szczyt nie może trwać dłużej niż obiekt jest otwarty (${formatInt(max)} h).`,
      };
    }
    const unit = def.unit ? `${NBSP}${def.unit}` : "";
    return {
      ok: false,
      error: `Wpisz liczbę od ${formatInt(def.min)} do ${formatInt(max)}${unit}.`,
    };
  }
  return { ok: true, value };
}

/** Validate raw text from the input. Empty text is an error: fields have no defaults. */
export function validateNumberField(
  id: NumberFieldId,
  raw: string,
  ctx: FieldContext = {},
  cfg: TennisPadelLossConfig = TENNIS_PADEL_LOSS_CONFIG
): FieldCheck {
  if (raw.trim() === "") return { ok: false, error: "Wpisz liczbę." };
  const value = parseNumberInput(raw);
  if (value === null) {
    return { ok: false, error: "Wpisz samą liczbę, bez liter i jednostek." };
  }
  return checkNumberField(id, value, ctx, cfg);
}

export type VenueCheck =
  | { ok: true; value: VenueInputs }
  | { ok: false; error: string };

/** Server-side check of a whole venue payload (never trust the client's numbers). */
export function validateVenueInputs(
  raw: VenueInputs,
  cfg: TennisPadelLossConfig = TENNIS_PADEL_LOSS_CONFIG
): VenueCheck {
  const ctx: FieldContext = {};
  for (const def of cfg.numberFields) {
    const check = checkNumberField(def.id, raw[def.id], ctx, cfg);
    if (!check.ok) return { ok: false, error: check.error };
    ctx[def.id] = check.value;
  }
  if (!cfg.occupancy.options.some((o) => o.id === raw.occupancyChoice)) {
    return { ok: false, error: "Niepoprawna odpowiedź o obłożeniu." };
  }
  return { ok: true, value: raw };
}

export function isValidAgentAnswers(
  raw: Record<string, number>,
  cfg: TennisPadelLossConfig = TENNIS_PADEL_LOSS_CONFIG
): boolean {
  return cfg.agents.every((a) => {
    const v = raw[a.id];
    return Number.isInteger(v) && v >= 1 && v <= 5;
  });
}

// ──────────────────────────────────────────────────────────────────────────
// Quiz answers <-> typed inputs
// ──────────────────────────────────────────────────────────────────────────

/** Every question id of Blocks A and B, in quiz order. */
export function lossQuestionIds(
  cfg: TennisPadelLossConfig = TENNIS_PADEL_LOSS_CONFIG
): string[] {
  return [
    ...cfg.numberFields.map((f) => f.questionId),
    cfg.occupancy.questionId,
    ...cfg.agents.map((a) => a.questionId),
  ];
}

/** Block A values entered so far, keyed by field id (the range of one field can depend on another). */
export function fieldContextFromAnswers(
  answers: Record<string, number>,
  cfg: TennisPadelLossConfig = TENNIS_PADEL_LOSS_CONFIG
): FieldContext {
  const ctx: FieldContext = {};
  for (const def of cfg.numberFields) {
    const v = answers[def.questionId];
    if (v != null) ctx[def.id] = v;
  }
  return ctx;
}

/**
 * Question ids whose answer is no longer valid after `changedQuestionId` was
 * set to `value`. Lowering the opening hours below an earlier peak answer
 * makes that peak impossible, so the quiz asks for it again.
 */
export function staleAnswerIds(
  answers: Record<string, number>,
  changedQuestionId: string,
  value: number,
  cfg: TennisPadelLossConfig = TENNIS_PADEL_LOSS_CONFIG
): string[] {
  const changed = cfg.numberFields.find((f) => f.questionId === changedQuestionId);
  if (!changed) return [];
  return cfg.numberFields
    .filter((f) => f.maxFrom === changed.id && answers[f.questionId] != null)
    .filter((f) => answers[f.questionId] > value)
    .map((f) => f.questionId);
}

/** Keep only the listed question ids (used to score the original questions on their own). */
export function pickAnswers(
  answers: Record<string, number>,
  ids: string[]
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const id of ids) if (answers[id] != null) out[id] = answers[id];
  return out;
}

/** Complete, valid Block A from the quiz answers, or null while anything is missing. */
export function venueFromAnswers(
  answers: Record<string, number>,
  cfg: TennisPadelLossConfig = TENNIS_PADEL_LOSS_CONFIG
): VenueInputs | null {
  const option = cfg.occupancy.options.find(
    (o) => o.value === answers[cfg.occupancy.questionId]
  );
  if (!option) return null;

  const values: Partial<Record<NumberFieldId, number>> = {};
  for (const def of cfg.numberFields) {
    const v = answers[def.questionId];
    if (v == null) return null;
    values[def.id] = v;
  }
  const venue: VenueInputs = {
    courts: values.courts as number,
    openHoursPerDay: values.openHoursPerDay as number,
    peakHoursPerDay: values.peakHoursPerDay as number,
    offPeakPricePln: values.offPeakPricePln as number,
    occupancyChoice: option.id,
  };
  const checked = validateVenueInputs(venue, cfg);
  return checked.ok ? checked.value : null;
}

/** Complete Block B from the quiz answers, or null while anything is missing. */
export function agentAnswersFromAnswers(
  answers: Record<string, number>,
  cfg: TennisPadelLossConfig = TENNIS_PADEL_LOSS_CONFIG
): AgentAnswers | null {
  const out: Partial<AgentAnswers> = {};
  for (const agent of cfg.agents) {
    const v = answers[agent.questionId];
    if (v == null) return null;
    out[agent.id] = v;
  }
  return isValidAgentAnswers(out as Record<string, number>, cfg)
    ? (out as AgentAnswers)
    : null;
}

// ──────────────────────────────────────────────────────────────────────────
// The calculation
// ──────────────────────────────────────────────────────────────────────────

export function recommendAgents(
  agentAnswers: AgentAnswers,
  cfg: TennisPadelLossConfig = TENNIS_PADEL_LOSS_CONFIG
): RecommendedAgent[] {
  const rated = cfg.agents.map((agent: AgentDef, order) => ({
    agent,
    order,
    score: agentAnswers[agent.id],
  }));
  const byWeakest = (a: (typeof rated)[number], b: (typeof rated)[number]) =>
    a.score - b.score || a.order - b.order;
  const toRecommendation =
    (reason: RecommendedAgent["reason"]) =>
    (r: (typeof rated)[number]): RecommendedAgent => ({
      id: r.agent.id,
      name: r.agent.name,
      description: r.agent.description,
      score: r.score,
      answerLabel:
        r.agent.options.find((o) => o.value === r.score)?.label ?? String(r.score),
      reason,
    });

  const weak = rated
    .filter((r) => r.score <= cfg.calc.weakAgentMaxScore)
    .sort(byWeakest);
  if (weak.length > 0) return weak.map(toRecommendation("weak"));

  return rated
    .filter((r) => r.score <= cfg.calc.fallbackAgentMaxScore)
    .sort(byWeakest)
    .slice(0, cfg.calc.fallbackAgentCount)
    .map(toRecommendation("lowest"));
}

export function computeTennisPadelLoss(
  venue: VenueInputs,
  agentAnswers: AgentAnswers,
  cfg: TennisPadelLossConfig = TENNIS_PADEL_LOSS_CONFIG
): LossResult {
  const { calc } = cfg;
  const option = cfg.occupancy.options.find((o) => o.id === venue.occupancyChoice);
  if (!option) throw new Error(`Unknown occupancy choice: ${venue.occupancyChoice}`);

  const occupancy = option.occupancy;
  const offPeakHoursPerDay = Math.max(venue.openHoursPerDay - venue.peakHoursPerDay, 0);
  const offPeakCapacity = venue.courts * offPeakHoursPerDay * calc.daysPerMonth;

  const emptyHoursExact = offPeakCapacity * (1 - occupancy);
  // Rounded hours are what the screen shows, so the amount is built from them:
  // "1 390 godzin" x 100 zł = "139 000 zł" adds up in front of the reader.
  const emptyHours = roundTo(emptyHoursExact, calc.hoursRoundingStep);
  const untappedValue = roundTo(emptyHours * venue.offPeakPricePln, calc.moneyRoundingStep);

  const recoverHighCapped = occupancy >= calc.highOccupancyThreshold;
  const highShare = recoverHighCapped
    ? calc.highOccupancyRecoverHighShare
    : calc.recoverHighShare;

  const recoverLow = roundTo(
    offPeakCapacity * calc.recoverLowShare * venue.offPeakPricePln,
    calc.moneyRoundingStep
  );
  const recoverHigh = roundTo(
    offPeakCapacity * highShare * venue.offPeakPricePln,
    calc.moneyRoundingStep
  );

  return {
    inputs: venue,
    agentAnswers,
    occupancy,
    occupancyUnknown: option.unknown === true,
    offPeakHoursPerDay,
    offPeakCapacity,
    hasOffPeak: offPeakCapacity > 0,
    emptyHoursExact,
    emptyHours,
    untappedValue,
    recoverLow,
    recoverHigh,
    // Built from the rounded monthly figures so the screen adds up.
    yearlyLow: recoverLow * calc.monthsPerYear,
    yearlyHigh: recoverHigh * calc.monthsPerYear,
    recoverHighCapped,
    agents: recommendAgents(agentAnswers, cfg),
  };
}

// ──────────────────────────────────────────────────────────────────────────
// Copy: one place that turns a result into the texts shown on the screen,
// in the e-mails and in the PDF.
// ──────────────────────────────────────────────────────────────────────────

/** A piece of text; `value` parts are the inserted figures (rendered bold). */
export type TextPart = { text: string; value: boolean };

export function fillTemplate(
  template: string,
  values: Record<string, string>
): TextPart[] {
  const parts: TextPart[] = [];
  for (const chunk of template.split(/(\{[A-Za-z]+\})/)) {
    if (chunk === "") continue;
    const m = /^\{([A-Za-z]+)\}$/.exec(chunk);
    if (m && m[1] in values) parts.push({ text: values[m[1]], value: true });
    else parts.push({ text: chunk, value: false });
  }
  return parts;
}

export function partsToText(parts: TextPart[]): string {
  return parts.map((p) => p.text).join("");
}

export type LossCopy = {
  mode: "normal" | "capped" | "noOffPeak";
  headline: TextPart[];
  untappedLine: TextPart[] | null;
  paragraph: TextPart[] | null;
  unknownNote: string | null;
  agentsTitle: string;
  /** Shown instead of the list when no agent qualifies. */
  agentsNone: string | null;
  noOffPeakBody: string | null;
  ctaLabel: string;
  ctaCaption: string;
  ctaUrl: string;
  disclaimer: string;
};

export function buildLossCopy(
  result: LossResult,
  cfg: TennisPadelLossConfig = TENNIS_PADEL_LOSS_CONFIG
): LossCopy {
  const { copy, calc } = cfg;
  const values: Record<string, string> = {
    emptyHours: formatInt(result.emptyHours),
    untappedValue: formatPln(result.untappedValue),
    recoverLow: formatPln(result.recoverLow),
    recoverHigh: formatPln(result.recoverHigh),
    yearlyLow: formatPln(result.yearlyLow),
    yearlyHigh: formatPln(result.yearlyHigh),
    recoverRange: formatRange(result.recoverLow, result.recoverHigh),
    yearlyRange: formatRange(result.yearlyLow, result.yearlyHigh),
    lowPp: String(Math.round(calc.recoverLowShare * 100)),
    highPp: String(Math.round(calc.recoverHighShare * 100)),
    cappedPp: String(Math.round(calc.highOccupancyRecoverHighShare * 100)),
  };

  const mode: LossCopy["mode"] = !result.hasOffPeak
    ? "noOffPeak"
    : result.recoverHighCapped
    ? "capped"
    : "normal";

  const common = {
    agentsTitle: copy.agentsTitle,
    agentsNone: result.agents.length === 0 ? copy.agentsNone : null,
    ctaLabel: copy.ctaLabel,
    ctaCaption: copy.ctaCaption,
    ctaUrl: copy.ctaUrl,
    disclaimer: copy.disclaimer,
  };

  if (mode === "noOffPeak") {
    return {
      ...common,
      mode,
      headline: [{ text: copy.noOffPeakHeadline, value: false }],
      untappedLine: null,
      paragraph: null,
      unknownNote: null,
      noOffPeakBody: copy.noOffPeakBody,
    };
  }

  return {
    ...common,
    mode,
    headline: fillTemplate(copy.headline, values),
    untappedLine: fillTemplate(copy.untappedLine, values),
    paragraph: fillTemplate(
      mode === "capped" ? copy.recoverParagraphCapped : copy.recoverParagraph,
      values
    ),
    unknownNote: result.occupancyUnknown ? copy.occupancyUnknownNote : null,
    noOffPeakBody: null,
  };
}

/** Selected answer labels for the admin e-mail and the PDF. */
export function describeVenueAnswers(
  result: LossResult,
  cfg: TennisPadelLossConfig = TENNIS_PADEL_LOSS_CONFIG
): { label: string; value: string }[] {
  const { inputs } = result;
  const occupancy = cfg.occupancy.options.find((o) => o.id === inputs.occupancyChoice);
  return [
    { label: "Liczba kortów", value: formatInt(inputs.courts) },
    { label: "Godziny otwarcia dziennie", value: `${formatInt(inputs.openHoursPerDay)} h` },
    { label: "Godziny szczytu dziennie", value: `${formatInt(inputs.peakHoursPerDay)} h` },
    { label: "Cena godziny poza szczytem", value: formatPln(inputs.offPeakPricePln) },
    {
      label: "Obłożenie poza szczytem",
      value: occupancy
        ? `${occupancy.label} (${Math.round(result.occupancy * 100)}%${occupancy.unknown ? ", wartość przyjęta, klub nie wie" : ""})`
        : inputs.occupancyChoice,
    },
  ];
}

export function describeAgentAnswers(
  result: LossResult,
  cfg: TennisPadelLossConfig = TENNIS_PADEL_LOSS_CONFIG
): { agent: string; question: string; score: number; answer: string }[] {
  return cfg.agents.map((agent) => {
    const score = result.agentAnswers[agent.id];
    const option = agent.options.find((o) => o.value === score);
    return {
      agent: agent.name,
      question: agent.question,
      score,
      answer: option ? `${option.label} (${option.sub})` : String(score),
    };
  });
}

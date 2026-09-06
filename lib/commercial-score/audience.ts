// Audience Power: turning declared follower counts into a 0-100 score.
//
// Three properties the model has to hold, all from the brief:
//   1. size matters, but with diminishing returns - 100k followers is not ten
//      times 10k;
//   2. no single channel can carry the whole score;
//   3. small and large organisations stay comparable, and the comparison basis
//      must be swappable for discipline/level benchmarks later.
//
// A logarithmic curve between two anchors covers all three, and has the rare
// virtue of being explainable to a client in one sentence: every tenfold
// increase in reach adds the same number of points.

import type {
  Anchor,
  AnchorTable,
  AudienceChannelDef,
  AudienceChannelResult,
  AudienceResult,
  AudienceValue,
  QualityMultiplierDef,
} from "./types";

/**
 * Share of a declared-zero channel's weight handed to the channels that do
 * exist. The rest is forfeited.
 *
 * Full redistribution would let one channel with a million followers reach
 * 100/100, which is exactly what the brief rules out. No redistribution would
 * punish an organisation that deliberately skips TikTok. Half says: a missing
 * channel is a real limitation for a brand, not a disqualification.
 *
 * A channel marked "n/a" is different - it is inapplicable, not neglected - and
 * its weight is redistributed in full.
 */
const ZERO_REALLOCATION = 0.5;

export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/**
 * Log-normalise a raw count onto 0-100 between two anchors.
 *
 *   s(x) = 100 * (log10(1+x) - log10(1+floor)) / (log10(1+ref) - log10(1+floor))
 *
 * At or below `floor` the score is 0; at or above `ref` it is 100. The +1 keeps
 * log10 defined at zero and makes the curve behave near the bottom of the range.
 */
export function logNormalise(x: number, anchor: Anchor): number {
  const [floor, ref] = anchor;
  if (!(x > 0)) return 0;
  const lo = Math.log10(1 + floor);
  const hi = Math.log10(1 + ref);
  if (hi <= lo) return 0;
  return clamp(((Math.log10(1 + x) - lo) / (hi - lo)) * 100, 0, 100);
}

function statusOf(value: AudienceValue): AudienceChannelResult["status"] {
  if (value === "n/a") return "na";
  if (typeof value === "number" && value > 0) return "scored";
  return "zero";
}

/**
 * Weighted mean of per-channel scores, with weight redistributed away from
 * channels that are absent. Returns the pre-multiplier reach score.
 */
function reachScore(
  channels: AudienceChannelDef[],
  values: Record<string, AudienceValue>,
  anchors: AnchorTable
): { score: number; results: AudienceChannelResult[] } {
  const rows = channels.map((c) => ({
    def: c,
    value: values[c.id] ?? null,
    status: statusOf(values[c.id] ?? null),
  }));

  const scored = rows.filter((r) => r.status === "scored");
  const scoredWeight = scored.reduce((a, r) => a + r.def.weight, 0);

  const naWeight = rows
    .filter((r) => r.status === "na")
    .reduce((a, r) => a + r.def.weight, 0);
  const zeroWeight = rows
    .filter((r) => r.status === "zero")
    .reduce((a, r) => a + r.def.weight, 0);

  const pool = naWeight + ZERO_REALLOCATION * zeroWeight;

  const results: AudienceChannelResult[] = rows.map((r) => {
    if (r.status !== "scored") {
      return {
        id: r.def.id,
        label: r.def.label,
        weight: 0,
        score: 0,
        value: r.value,
        status: r.status,
      };
    }
    const share = scoredWeight > 0 ? r.def.weight / scoredWeight : 0;
    const anchor = anchors[r.def.id];
    return {
      id: r.def.id,
      label: r.def.label,
      weight: r.def.weight + pool * share,
      score: anchor ? logNormalise(r.value as number, anchor) : 0,
      value: r.value,
      status: r.status,
    };
  });

  const total = results.reduce((a, r) => a + r.weight * r.score, 0);
  return { score: clamp(total, 0, 100), results };
}

/**
 * Correction that turns declared views into a check on declared followers.
 *
 * Asking for an engagement rate invites a number copied from whichever
 * calculator the visitor found first. Asking for average views on the last ten
 * videos is a figure they can read off the app in seconds, and dividing it by
 * the followers they just declared is the only part of this model that resists
 * bought audiences.
 */
function qualityMultiplier(
  def: QualityMultiplierDef | undefined,
  values: Record<string, AudienceValue>
): { factor: number; label: string | null } {
  if (!def) return { factor: 1, label: null };

  const raw = values[def.numerator];
  const observed = typeof raw === "number" ? raw : 0;
  const base = def.denominator.reduce((a, key) => {
    const v = values[key];
    return a + (typeof v === "number" && v > 0 ? v : 0);
  }, 0);

  if (!(observed > 0) || !(base > 0)) {
    return { factor: def.fallback, label: null };
  }

  const ratio = observed / base;
  for (const bracket of def.brackets) {
    if (ratio < bracket.below) {
      return { factor: bracket.factor, label: bracket.label };
    }
  }
  const last = def.brackets[def.brackets.length - 1];
  return { factor: last.factor, label: last.label };
}

export function scoreAudience(
  channels: AudienceChannelDef[],
  values: Record<string, AudienceValue>,
  anchors: AnchorTable,
  quality?: QualityMultiplierDef
): AudienceResult {
  const { score: reach, results } = reachScore(channels, values, anchors);
  const { factor, label } = qualityMultiplier(quality, values);

  return {
    score: Math.round(clamp(reach * factor, 0, 100)),
    reachScore: Math.round(reach),
    multiplier: factor,
    multiplierLabel: label,
    channels: results,
  };
}

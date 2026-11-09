/**
 * Illustrative numbers shown in the hero. They are NOT real client data and the
 * UI must keep saying so ("dane przykładowe", see PRODUCT.md). Everything that
 * has to agree with something else is derived here, so the stadium dots, the
 * KPI board and the legend can never drift apart. Change the numbers only here.
 */
export const HERO_SAMPLE = {
  /** Share of customer voices, in percent. The three add up to 100. */
  promoters: 70,
  passives: 22,
  detractors: 8,
  /** Commercial Score, 0-100. */
  commercialScore: 72,
  /** Annual churn, in percent. */
  churn: 13,
} as const;

/** NPS = % promoters - % detractors. */
export const heroNps: number = HERO_SAMPLE.promoters - HERO_SAMPLE.detractors; // 62

/** Retention = 100 - churn. */
export const heroRetention: number = 100 - HERO_SAMPLE.churn; // 87

export function formatNps(value: number): string {
  return value > 0 ? `+${value}` : String(value);
}

if (process.env.NODE_ENV !== "production") {
  const sum =
    HERO_SAMPLE.promoters + HERO_SAMPLE.passives + HERO_SAMPLE.detractors;
  if (sum !== 100) {
    console.warn(
      `HERO_SAMPLE: promoters + passives + detractors should be 100, got ${sum}`
    );
  }
}

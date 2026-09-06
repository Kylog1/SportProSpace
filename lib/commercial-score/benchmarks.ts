// Benchmark anchor tables.
//
// This file holds every market assumption in the model. Changing what counts as
// a strong audience is a data edit here, never a code change - which is the
// point: 5 000 followers is a good result for a local club and a poor one for a
// top-flight one, and the only honest way to express that is to score each
// against its own reference.
//
// IMPORTANT - these are EXPERT ESTIMATES, not market data. They were set to
// produce a sensible spread across known profile shapes, not measured against a
// sample. They are the first thing to recalibrate once real submissions exist,
// which is why every submission stores its raw numbers and the benchmark version
// used, so history can be re-scored and compared.

import type { AnchorTable, LevelTier, PersonaId } from "./types";

/** Bumped whenever any anchor below changes. Stored on every submission. */
export const BENCHMARK_VERSION = "1.1.0";

export const LEVEL_TIERS: { id: LevelTier; label: string; hint: string }[] = [
  {
    id: "lokalny",
    label: "Lokalny",
    hint: "Rozgrywki i odbiorcy w skali miasta lub powiatu",
  },
  {
    id: "regionalny",
    label: "Regionalny",
    hint: "Rozgrywki i odbiorcy w skali województwa",
  },
  {
    id: "ogolnopolski",
    label: "Ogólnopolski",
    hint: "Rozgrywki krajowe, odbiorcy z całej Polski",
  },
  {
    id: "miedzynarodowy",
    label: "Międzynarodowy",
    hint: "Rozgrywki lub odbiorcy poza Polską",
  },
];

// ──────────────────────────────────────────────────────────────────────────
// Organization
// ──────────────────────────────────────────────────────────────────────────
//
// Facebook carries a higher floor and ref than Instagram at every tier: club
// pages accumulated large follower counts years ago that no longer convert into
// organic reach, so the same number means less.

const ORGANIZATION: Record<LevelTier, AnchorTable> = {
  lokalny: {
    instagram: [100, 20_000],
    facebook: [200, 30_000],
    tiktok: [100, 15_000],
    youtube: [50, 8_000],
    attendance: [30, 1_500],
    database: [50, 3_000],
  },
  regionalny: {
    instagram: [200, 60_000],
    facebook: [300, 100_000],
    tiktok: [150, 50_000],
    youtube: [80, 25_000],
    attendance: [50, 4_000],
    database: [80, 10_000],
  },
  ogolnopolski: {
    instagram: [300, 300_000],
    facebook: [500, 500_000],
    tiktok: [200, 200_000],
    youtube: [100, 100_000],
    attendance: [50, 20_000],
    database: [100, 50_000],
  },
  miedzynarodowy: {
    instagram: [1_000, 2_000_000],
    facebook: [2_000, 3_000_000],
    tiktok: [500, 1_000_000],
    youtube: [300, 500_000],
    attendance: [500, 50_000],
    database: [500, 200_000],
  },
};

// ──────────────────────────────────────────────────────────────────────────
// Athlete
// ──────────────────────────────────────────────────────────────────────────

// The spread between athlete tiers is deliberately narrower than the
// organization one. The tier is derived from the declared competition level, so
// a wide spread would pay for understating it: loosening the audience anchors
// gained more than the sport score lost. Compressed like this, understating the
// level costs a point rather than earning four.
const ATHLETE: Record<LevelTier, AnchorTable> = {
  lokalny: {
    instagram: [300, 150_000],
    tiktok: [200, 200_000],
    youtube: [80, 50_000],
    facebook: [200, 80_000],
  },
  regionalny: {
    instagram: [400, 300_000],
    tiktok: [250, 400_000],
    youtube: [90, 90_000],
    facebook: [250, 130_000],
  },
  ogolnopolski: {
    instagram: [500, 500_000],
    tiktok: [300, 600_000],
    youtube: [100, 150_000],
    facebook: [300, 200_000],
  },
  miedzynarodowy: {
    instagram: [500, 1_000_000],
    tiktok: [300, 1_000_000],
    youtube: [100, 300_000],
    facebook: [300, 300_000],
  },
};

const TABLES: Record<PersonaId, Record<LevelTier, AnchorTable>> = {
  athlete: ATHLETE,
  organization: ORGANIZATION,
};

/** Tier used when the visitor has not declared one. */
const DEFAULT_TIER: LevelTier = "ogolnopolski";

/**
 * Resolve the anchor table for a profile. Today the only dimension is the
 * declared level; discipline, league and region slot in here later without
 * touching any caller - hence the object argument rather than a bare tier.
 */
export function resolveAnchors(profile: {
  persona: PersonaId;
  tier?: LevelTier | null;
}): AnchorTable {
  const table = TABLES[profile.persona];
  return table[profile.tier ?? DEFAULT_TIER] ?? table[DEFAULT_TIER];
}

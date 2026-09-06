// Persona registry and public surface of the Commercial Score model.
//
// Adding a third persona (agency, event organiser) means writing one config file
// and adding it here - no UI, routing or API change beyond the new slug.

import { ATHLETE_CONFIG } from "./athlete";
import { ORGANIZATION_CONFIG } from "./organization";
import type { PersonaConfig, PersonaId } from "./types";

export const PERSONAS: Record<PersonaId, PersonaConfig<string>> = {
  athlete: ATHLETE_CONFIG as PersonaConfig<string>,
  organization: ORGANIZATION_CONFIG as PersonaConfig<string>,
};

export const PERSONA_LIST = Object.values(PERSONAS);

/** Resolve a URL segment (`zawodnik`, `organizacja`) to its config. */
export function personaBySlug(slug: string): PersonaConfig<string> | null {
  return PERSONA_LIST.find((p) => p.slug === slug) ?? null;
}

export function personaById(id: string): PersonaConfig<string> | null {
  return (PERSONAS as Record<string, PersonaConfig<string>>)[id] ?? null;
}

export { ATHLETE_CONFIG, ATHLETE_VIEWS_FIELD } from "./athlete";
export { ORGANIZATION_CONFIG } from "./organization";
export {
  scoreSubmission,
  assertConfigValid,
  normalise,
  resolveTier,
} from "./scoring";
export { scoreAudience, logNormalise } from "./audience";
export {
  resolveAnchors,
  effectiveTier,
  BENCHMARK_VERSION,
  LEVEL_TIERS,
} from "./benchmarks";
export { getRecommendation, missingRecommendations } from "./recommendations";
export {
  MODEL_VERSION,
  SCORE_LEVELS,
  getScoreLevel,
  type AudienceChannelDef,
  type AudienceValue,
  type CategoryResult,
  type CommercialScoreResult,
  type ImprovementItem,
  type LevelTier,
  type PersonaConfig,
  type PersonaId,
  type ScoreLevel,
} from "./types";

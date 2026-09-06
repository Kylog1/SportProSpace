// Persistence seam for Commercial Score submissions.
//
// Storing the raw answers and raw numbers - not just the final score - is what
// makes the model recalibratable: once real submissions exist, the anchors in
// benchmarks.ts can be re-fitted and the whole history re-scored and compared.
// That is why every record carries modelVersion and benchmarkVersion.
//
// No database is wired up yet: Firestore needs a service account this project
// does not have. Until it does, this module records nothing and says so once
// per cold start, and the lead still reaches the team by email - so a missing
// database loses analysis data, never a lead.
//
// To activate: implement persist() against Firestore and drop the guard.

import type { AudienceValue, CommercialScoreResult } from "./types";

export type SubmissionRecord = {
  createdAt: string;
  modelVersion: string;
  benchmarkVersion: string;
  persona: string;
  context: { discipline: string; tier: string | null };
  lead: {
    name: string;
    email: string;
    entityName: string;
    phone?: string;
    buyingIntent: string;
    consent: boolean;
    consentMarketing: boolean;
  };
  answers: Record<string, number>;
  audienceInputs: Record<string, AudienceValue>;
  result: {
    total: number;
    level: string;
    categories: Record<string, number>;
  };
  funnel: {
    startedAt: string | null;
    completedAt: string | null;
    ctaClicked?: string;
  };
};

export function buildRecord(input: {
  persona: string;
  context: { discipline: string; tier: string | null };
  lead: SubmissionRecord["lead"];
  answers: Record<string, number>;
  audience: Record<string, AudienceValue>;
  result: CommercialScoreResult<string>;
  funnel: { startedAt: string | null; completedAt: string | null };
}): SubmissionRecord {
  return {
    createdAt: new Date().toISOString(),
    modelVersion: input.result.modelVersion,
    benchmarkVersion: input.result.benchmarkVersion,
    persona: input.persona,
    context: input.context,
    lead: input.lead,
    answers: input.answers,
    audienceInputs: input.audience,
    result: {
      total: input.result.total,
      level: input.result.level.id,
      categories: Object.fromEntries(
        input.result.categories.map((c) => [c.id, c.score])
      ),
    },
    funnel: input.funnel,
  };
}

let warned = false;

export function isStorageConfigured(): boolean {
  return false;
}

/**
 * Never throws and never blocks the response: a storage failure must not cost
 * the visitor their result or the team their lead.
 */
export async function persist(_record: SubmissionRecord): Promise<void> {
  if (!isStorageConfigured()) {
    if (!warned) {
      warned = true;
      console.warn(
        "[commercial-score] Brak skonfigurowanej bazy - zgloszenie tylko mailem."
      );
    }
    return;
  }
}

export async function markCtaClicked(
  _email: string,
  _cta: string
): Promise<void> {
  if (!isStorageConfigured()) return;
}

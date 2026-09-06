// Persistence seam for Commercial Score submissions.
//
// There is deliberately no database. At the volume this tool is expected to see
// first - tens of submissions, not thousands - a database earns nothing: the
// recalibration it would enable needs hundreds of records before it means
// anything, and the admin email already carries the full record, raw answers
// and raw numbers included, in a form that pastes straight into an assistant
// for aggregation.
//
// The cost of keeping it wired up was not zero: firebase-admin pulled 359 of
// the 765 files traced into this route's serverless bundle, for a client that
// would never have been initialised.
//
// To reactivate: `npm i firebase-admin`, implement persist() and
// markCtaClicked() against Firestore, and return a real document id. Every
// caller is already null-safe, and the record shape below is the one that was
// tested against Firestore, including the phone-must-not-be-undefined rule that
// Firestore enforces. Nothing else has to change.

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
    /** Empty string, never undefined - Firestore rejects undefined values. */
    phone: string;
    buyingIntent: string;
    consent: boolean;
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
    ctaClickedAt?: string;
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

export function isStorageConfigured(): boolean {
  return false;
}

/** Returns the stored document id, or null when there is no store. */
export async function persist(
  _record: SubmissionRecord
): Promise<string | null> {
  return null;
}

export async function markCtaClicked(
  _submissionId: string,
  _cta: string
): Promise<void> {}

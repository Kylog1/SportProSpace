// Firestore persistence for Commercial Score submissions.
//
// Storing the raw answers and raw numbers - not just the final score - is what
// makes the model recalibratable: once real submissions exist, the anchors in
// benchmarks.ts can be re-fitted and the whole history re-scored and compared
// against what the old model said. That is why every record carries
// modelVersion and benchmarkVersion.
//
// Credentials are optional by design. With no service account configured this
// module records nothing, warns once per cold start and lets the request carry
// on - so a missing or misconfigured database costs analysis data, never a
// lead, which still reaches the team by email.

import type { App } from "firebase-admin/app";
import type { Firestore } from "firebase-admin/firestore";
import type { AudienceValue, CommercialScoreResult } from "./types";

const COLLECTION = "commercial_score_submissions";

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
    phone: string;
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

// ──────────────────────────────────────────────────────────────────────────
// Firestore client
// ──────────────────────────────────────────────────────────────────────────

export function isStorageConfigured(): boolean {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
  );
}

let db: Firestore | null = null;
let initFailed = false;
let warned = false;

function warnOnce(message: string, err?: unknown) {
  if (warned) return;
  warned = true;
  console.warn(`[commercial-score] ${message}`, err ?? "");
}

/**
 * Lazily initialised so importing this module never touches the network, and so
 * a serverless instance that only ever serves GETs pays nothing for Firestore.
 */
async function getDb(): Promise<Firestore | null> {
  if (db) return db;
  if (initFailed || !isStorageConfigured()) return null;

  try {
    const { getApps, initializeApp, cert } = await import("firebase-admin/app");
    const { getFirestore } = await import("firebase-admin/firestore");

    const existing = getApps();
    const app: App =
      existing.length > 0
        ? existing[0]
        : initializeApp({
            credential: cert({
              projectId: process.env.FIREBASE_PROJECT_ID,
              clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
              // Vercel stores the key as a single line, so the literal \n
              // sequences have to become real newlines before PEM parsing.
              privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(
                /\\n/g,
                "\n"
              ),
            }),
          });

    db = getFirestore(app);
    // Belt and braces after an optional field once broke every write: a stray
    // undefined on a future field should drop that field, not the record.
    db.settings({ ignoreUndefinedProperties: true });
    return db;
  } catch (err) {
    initFailed = true;
    warnOnce("Firestore niedostepny - zgloszenia tylko mailem.", err);
    return null;
  }
}

/**
 * Writes the submission and returns its document id, or null when storage is
 * unavailable. Never throws: a storage failure must not cost the visitor their
 * result or the team their lead.
 */
export async function persist(
  record: SubmissionRecord
): Promise<string | null> {
  const client = await getDb();
  if (!client) {
    warnOnce("Brak skonfigurowanej bazy - zgloszenie tylko mailem.");
    return null;
  }

  try {
    const ref = await client.collection(COLLECTION).add(record);
    return ref.id;
  } catch (err) {
    console.error("[commercial-score] zapis do Firestore nieudany:", err);
    return null;
  }
}

/**
 * Closes the funnel on an existing record. Addressed by document id rather than
 * by email so the endpoint cannot be used to probe whether a given address is
 * in the database.
 */
export async function markCtaClicked(
  submissionId: string,
  cta: string
): Promise<void> {
  const client = await getDb();
  if (!client) return;

  try {
    await client
      .collection(COLLECTION)
      .doc(submissionId)
      .update({
        "funnel.ctaClicked": cta,
        "funnel.ctaClickedAt": new Date().toISOString(),
      });
  } catch (err) {
    // A missing document is the expected case when storage was unavailable at
    // submit time, so this stays a warning rather than an error.
    console.warn("[commercial-score] nie udalo sie zapisac CTA:", err);
  }
}

// Qualification question on the brief download form. Shared by the form and
// the API route so the two can never drift apart.

export const BRIEF_STAGES = [
  { id: "now", label: "Szukamy partnera sportowego teraz" },
  { id: "6months", label: "Planujemy w ciągu 6 miesięcy" },
  { id: "existing", label: "Mamy partnera, chcemy lepiej mierzyć efekty" },
  { id: "sport-side", label: "Reprezentuję klub, organizację lub zawodnika" },
] as const;

export type BriefStage = (typeof BRIEF_STAGES)[number]["id"];

export const BRIEF_STAGE_IDS = BRIEF_STAGES.map((s) => s.id) as [
  BriefStage,
  ...BriefStage[],
];

export const BRIEF_STAGE_LABELS = Object.fromEntries(
  BRIEF_STAGES.map((s) => [s.id, s.label])
) as Record<BriefStage, string>;

// Anchor of the download form. Lives here, not in the "use client" form
// module: a server component importing a value from a client module gets a
// client reference object, which rendered the link as "#[object Object]".
export const BRIEF_FORM_ID = "pobierz-brief";

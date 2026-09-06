// Buying-intent labels, shared by the form, the API schema and the admin email.
// Kept in its own module so the API route (server) never has to import a
// "use client" component just to read a label.

export const BUYING_INTENT_IDS = [
  "active",
  "3months",
  "planning",
  "curious",
] as const;

export type BuyingIntentId = (typeof BUYING_INTENT_IDS)[number];

export const BUYING_INTENT_LABELS: Record<string, string> = {
  active: "Tak, aktywnie szuka",
  "3months": "Tak, w ciągu 3 miesięcy",
  planning: "Jeszcze nie, ale chce zacząć",
  curious: "Sprawdza tylko wynik",
};

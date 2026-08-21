// Registry of disciplines shown on the /self-assessment hub. Pure display/routing
// metadata, no question data lives here. Icons are attached in the UI layer (see
// the SECTION_ICONS pattern in components/SelfAssessment.tsx), not in this file.

export type SportStatus = "available" | "coming-soon";

export type SportEntry = {
  id: string;
  label: string;
  note: string;
  status: SportStatus;
  /** Only set for status "available", where the real audit lives. */
  href?: string;
};

export const SPORTS: SportEntry[] = [
  {
    id: "football",
    label: "Piłka nożna",
    note: "Akademie i kluby piłkarskie",
    status: "available",
    href: "/self-assessment/football",
  },
  {
    id: "fitness",
    label: "Fitness i siłownie",
    note: "Kluby fitness i siłownie",
    status: "available",
    href: "/self-assessment/fitness",
  },
  {
    id: "tennis-padel",
    label: "Tenis i padel",
    note: "Kluby tenisowe i padlowe",
    status: "available",
    href: "/self-assessment/tennis-padel",
  },
  {
    id: "golf",
    label: "Golf",
    note: "Kluby i akademie golfowe",
    status: "coming-soon",
  },
  {
    id: "swimming",
    label: "Pływanie",
    note: "Akademie i kluby pływackie",
    status: "coming-soon",
  },
  {
    id: "multi-sport",
    label: "Kluby wielosekcyjne",
    note: "Organizacje z wieloma dyscyplinami",
    status: "coming-soon",
  },
];

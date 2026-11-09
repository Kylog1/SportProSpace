// Tennis & Padel: "ile klub traci" block of the Self-Audit.
//
// EVERYTHING you may want to edit lives in this one object: question wording,
// answer cards, ranges, coefficients and the copy of the result screen.
// The maths is in tennis-padel-loss.ts, the screens read from here.
//
// Order of the quiz for this discipline: Block A (facts about the venue),
// Block B (1-5 scale, one agent per question), then the 16 original questions
// from tennis-padel.ts, which are left untouched.

export type NumberFieldId =
  | "courts"
  | "openHoursPerDay"
  | "peakHoursPerDay"
  | "offPeakPricePln";

export type OccupancyChoiceId = "empty" | "weak" | "half" | "good" | "unknown";

export type AgentId =
  | "filler"
  | "retention"
  | "fourthPlayer"
  | "support"
  | "events";

export type NumberFieldDef = {
  id: NumberFieldId;
  /** Key of this question in the quiz answers map. */
  questionId: string;
  text: string;
  placeholder: string;
  /** Shown under the field. */
  hint?: string;
  /** Shown inside the field, right side (e.g. "zł"). */
  unit?: string;
  min: number;
  max: number;
  /** When set, the upper bound is the smaller of `max` and this field's value. */
  maxFrom?: NumberFieldId;
  integer: boolean;
};

export type OccupancyOptionDef = {
  id: OccupancyChoiceId;
  /** Card number 1-5 shown in the circle; also what the quiz stores. */
  value: number;
  label: string;
  sub: string;
  /** Share of off-peak hours that are booked, 0-1. */
  occupancy: number;
  /** "Nie wiem": typical value is used and the result says so. */
  unknown?: true;
};

export type AgentScaleOption = { value: number; label: string; sub: string };

export type AgentDef = {
  id: AgentId;
  name: string;
  /** Lower-case sentence fragment, rendered as "{name}: {description}". */
  description: string;
  questionId: string;
  question: string;
  options: AgentScaleOption[];
};

export type TennisPadelLossConfig = {
  groups: {
    venue: { id: string; label: string };
    practice: { id: string; label: string };
  };
  numberFields: NumberFieldDef[];
  occupancy: {
    questionId: string;
    text: string;
    options: OccupancyOptionDef[];
  };
  agents: AgentDef[];
  calc: {
    daysPerMonth: number;
    monthsPerYear: number;
    /** Lower and upper estimate of regained occupancy, as a share (0.05 = 5 pp). */
    recoverLowShare: number;
    recoverHighShare: number;
    /** From this occupancy up, the upper estimate is capped. */
    highOccupancyThreshold: number;
    highOccupancyRecoverHighShare: number;
    /** Hours are rounded to this step, amounts to this step (full hundreds). */
    hoursRoundingStep: number;
    moneyRoundingStep: number;
    /** Answer 1 or 2 puts the agent on the "Od czego zacząć" list. */
    weakAgentMaxScore: number;
    /** When no answer is weak: show at most this many agents, lowest first... */
    fallbackAgentCount: number;
    /** ...and only those rated at most this (a 5 needs no recommendation). */
    fallbackAgentMaxScore: number;
  };
  copy: {
    headline: string;
    untappedLine: string;
    recoverParagraph: string;
    recoverParagraphCapped: string;
    occupancyUnknownNote: string;
    noOffPeakHeadline: string;
    noOffPeakBody: string;
    agentsTitle: string;
    agentsNone: string;
    ctaLabel: string;
    ctaCaption: string;
    ctaUrl: string;
    disclaimer: string;
  };
};

export const TENNIS_PADEL_LOSS_CONFIG: TennisPadelLossConfig = {
  groups: {
    venue: { id: "venue", label: "OBIEKT" },
    practice: { id: "practice", label: "GRACZE I GODZINY" },
  },

  // ── BLOK A: dane o obiekcie ────────────────────────────────────────────
  numberFields: [
    {
      id: "courts",
      questionId: "venue_courts",
      text: "Ile macie kortów do wynajęcia?",
      placeholder: "np. 6",
      min: 1,
      max: 50,
      integer: true,
    },
    {
      id: "openHoursPerDay",
      questionId: "venue_open_hours",
      text: "Ile godzin dziennie obiekt jest otwarty?",
      placeholder: "np. 16",
      hint: "np. 7:00–23:00 = 16 h",
      min: 1,
      max: 24,
      integer: false,
    },
    {
      id: "peakHoursPerDay",
      questionId: "venue_peak_hours",
      text: "Ile godzin dziennie to u Was szczyt?",
      placeholder: "np. 5",
      hint: "godziny, w których prawie wszystko jest zajęte, zwykle 17–22",
      min: 0,
      max: 24,
      maxFrom: "openHoursPerDay",
      integer: false,
    },
    {
      id: "offPeakPricePln",
      questionId: "venue_off_peak_price",
      text: "Ile średnio kosztuje godzina kortu poza szczytem?",
      placeholder: "np. 100",
      unit: "zł",
      min: 20,
      max: 1000,
      integer: false,
    },
  ],

  occupancy: {
    questionId: "venue_occupancy",
    text: "Jak bardzo zajęte są korty poza szczytem?",
    options: [
      {
        id: "empty",
        value: 1,
        label: "Prawie puste",
        sub: "Mniej niż 1 na 5 godzin zajęta",
        occupancy: 0.15,
      },
      {
        id: "weak",
        value: 2,
        label: "Słabo",
        sub: "Mniej więcej co trzecia godzina",
        occupancy: 0.3,
      },
      {
        id: "half",
        value: 3,
        label: "Połowa",
        sub: "Mniej więcej co druga godzina",
        occupancy: 0.5,
      },
      {
        id: "good",
        value: 4,
        label: "Dobrze",
        sub: "Większość godzin zajęta",
        occupancy: 0.7,
      },
      {
        id: "unknown",
        value: 5,
        label: "Nie wiem",
        sub: "Nie mierzymy tego",
        occupancy: 0.3,
        unknown: true,
      },
    ],
  },

  // ── BLOK B: skala 1-5, jedno pytanie = jeden agent ─────────────────────
  agents: [
    {
      id: "filler",
      name: "Wypełniacz godzin",
      description:
        "wysyła graczom propozycje wolnych godzin dopasowane do tego, kiedy zwykle grają.",
      questionId: "agent_filler",
      question: "Czy aktywnie zapełniacie wolne godziny poza szczytem?",
      options: [
        { value: 1, label: "Nie", sub: "Czekamy, aż ktoś zarezerwuje" },
        { value: 2, label: "Raczej nie", sub: "Czasem post w social mediach" },
        {
          value: 3,
          label: "Częściowo",
          sub: "Mamy tańsze godziny, ale ich nie promujemy",
        },
        {
          value: 4,
          label: "W większości",
          sub: "Regularne akcje, ale robione ręcznie",
        },
        {
          value: 5,
          label: "W pełni",
          sub: "Gracze dostają propozycje wolnych godzin dopasowane do nich",
        },
      ],
    },
    {
      id: "retention",
      name: "Retencja",
      description:
        "wyłapuje graczy, którzy przestali rezerwować, i zaprasza ich z powrotem.",
      questionId: "agent_retention",
      question: "Czy wiecie, którzy gracze przestali u Was grać?",
      options: [
        { value: 1, label: "Nie", sub: "Nie mamy jak tego sprawdzić" },
        {
          value: 2,
          label: "Raczej nie",
          sub: "Zauważamy tylko stałych bywalców",
        },
        { value: 3, label: "Częściowo", sub: "Czasem przeglądamy listę" },
        {
          value: 4,
          label: "W większości",
          sub: "Sprawdzamy regularnie, ale nie zawsze reagujemy",
        },
        {
          value: 5,
          label: "W pełni",
          sub: "Wiemy od razu i mamy gotową akcję powrotu",
        },
      ],
    },
    {
      id: "fourthPlayer",
      name: "Czwarty gracz",
      description: "dobiera brakującego gracza według poziomu i dostępności.",
      questionId: "agent_fourth_player",
      question: "Czy pomagacie graczom znaleźć partnerów do gry?",
      options: [
        { value: 1, label: "Nie", sub: "Każdy organizuje się sam" },
        {
          value: 2,
          label: "Raczej nie",
          sub: "Jest grupa na WhatsAppie, która żyje własnym życiem",
        },
        {
          value: 3,
          label: "Częściowo",
          sub: "Recepcja czasem kogoś poleci",
        },
        {
          value: 4,
          label: "W większości",
          sub: "Mamy otwarte mecze w aplikacji",
        },
        {
          value: 5,
          label: "W pełni",
          sub: "Aktywnie dobieramy graczy według poziomu",
        },
      ],
    },
    {
      id: "support",
      name: "Obsługa 24/7",
      description:
        "odpowiada na pytania o ceny, zasady i rezerwacje o każdej porze.",
      questionId: "agent_support",
      question:
        "Jak szybko odpowiadacie na wiadomości poza godzinami recepcji?",
      options: [
        {
          value: 1,
          label: "Następnego dnia albo wcale",
          sub: "Wiadomości czekają do rana",
        },
        {
          value: 2,
          label: "Gdy ktoś znajdzie chwilę",
          sub: "Bez zasad i dyżurów",
        },
        {
          value: 3,
          label: "Zwykle w ciągu kilku godzin",
          sub: "Ale nie zawsze",
        },
        {
          value: 4,
          label: "Szybko",
          sub: "Kosztem czasu prywatnego zespołu",
        },
        {
          value: 5,
          label: "Od razu",
          sub: "O każdej porze, bez obciążania ludzi",
        },
      ],
    },
    {
      id: "events",
      name: "Ligi i eventy",
      description: "prowadzi zapisy, drabinki i komunikację turniejów.",
      questionId: "agent_events",
      question: "Czy organizujecie regularne ligi, turnieje albo Americano?",
      options: [
        { value: 1, label: "Nie", sub: "Nie organizujemy" },
        { value: 2, label: "Raczej nie", sub: "Kilka razy w roku" },
        {
          value: 3,
          label: "Częściowo",
          sub: "Regularnie, ale z dużym nakładem pracy",
        },
        {
          value: 4,
          label: "W większości",
          sub: "Stały kalendarz, organizacja ręczna",
        },
        {
          value: 5,
          label: "W pełni",
          sub: "Stały kalendarz, zapisy i komunikacja działają same",
        },
      ],
    },
  ],

  // ── Współczynniki wzoru ────────────────────────────────────────────────
  calc: {
    daysPerMonth: 30,
    monthsPerYear: 12,
    recoverLowShare: 0.05,
    recoverHighShare: 0.1,
    highOccupancyThreshold: 0.7,
    highOccupancyRecoverHighShare: 0.05,
    hoursRoundingStep: 10,
    moneyRoundingStep: 100,
    weakAgentMaxScore: 2,
    fallbackAgentCount: 2,
    fallbackAgentMaxScore: 4,
  },

  // ── Treści ekranu wyniku. {nazwa} to wartość wstawiana z wyliczenia. ───
  // Dostępne: {emptyHours} {untappedValue} {recoverLow} {recoverHigh}
  // {yearlyLow} {yearlyHigh} (kwoty z "zł"), {recoverRange} {yearlyRange}
  // (przedział z jednym "zł" na końcu, np. 9 900–19 800 zł) oraz
  // {lowPp} {highPp} {cappedPp} (punkty procentowe ze współczynników).
  copy: {
    headline:
      "Poza szczytem macie ok. {emptyHours} pustych godzin kortowych miesięcznie.",
    untappedLine: "To ok. {untappedValue} niewykorzystanego potencjału.",
    recoverParagraph:
      "Nie da się zapełnić wszystkiego. Kluby, które aktywnie zapełniają wolne godziny, podnoszą obłożenie poza szczytem o {lowPp}–{highPp} punktów procentowych. U Was to {recoverRange} miesięcznie, czyli {yearlyRange} rocznie.",
    recoverParagraphCapped:
      "Nie da się zapełnić wszystkiego. Kluby, które aktywnie zapełniają wolne godziny, podnoszą obłożenie poza szczytem o {lowPp}–{highPp} punktów procentowych. Przy Waszym już wysokim obłożeniu liczymy ostrożnie {cappedPp} punktów: {recoverLow} miesięcznie, czyli {yearlyLow} rocznie.",
    occupancyUnknownNote:
      "Przyjęliśmy typową wartość dla branży. Pierwsze, co sprawdzimy w audycie, to Wasze faktyczne obłożenie.",
    noOffPeakHeadline:
      "Z podanych godzin wynika, że szczyt trwa u Was przez cały czas otwarcia obiektu.",
    noOffPeakBody:
      "Nie liczymy więc pustych godzin poza szczytem. Poniżej widać, od czego warto zacząć.",
    agentsTitle: "Od czego zacząć",
    agentsNone:
      "Wszystkie pięć obszarów macie dobrze obsłużone. Zostaje dopracowanie szczegółów w audycie.",
    ctaLabel: "Umów bezpłatny Audyt pustych godzin",
    ctaCaption:
      "Przeanalizujemy eksport z Waszego systemu rezerwacji i pokażemy, które godziny i dni tracicie najbardziej.",
    ctaUrl: "https://calendly.com/grzyb-krzysiek/new-meeting",
    disclaimer:
      "Szacunek na podstawie podanych danych. Dokładne wyliczenie przygotujemy w audycie.",
  },
};

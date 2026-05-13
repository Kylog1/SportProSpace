// Shared assessment domain data. Used by the frontend component, the API route,
// the PDF generator and the email templates. Single source of truth.

export type SectionId =
  | "retention"
  | "communication"
  | "experience"
  | "organization";

export type Question = {
  id: string;
  section: SectionId;
  text: string;
  hint?: string;
};

export const SECTIONS: {
  id: SectionId;
  label: string;
  short: string;
}[] = [
  { id: "retention", label: "Retention Risk", short: "Ryzyko odejść" },
  {
    id: "communication",
    label: "Parent & Player Communication",
    short: "Komunikacja",
  },
  {
    id: "experience",
    label: "Player Experience & Development",
    short: "Doświadczenie zawodnika",
  },
  {
    id: "organization",
    label: "Organization & Culture",
    short: "Organizacja i kultura",
  },
];

export const QUESTIONS: Question[] = [
  // 1. Retention Risk
  {
    id: "r1",
    section: "retention",
    text: "Mamy powtarzalny proces, w którym co kwartał identyfikujemy zawodników zagrożonych odejściem (spadek frekwencji, zmiana zachowania, sygnały od rodzica).",
    hint: "Nie chodzi o 'wyczucie trenera' - chodzi o listę nazwisk z konkretnym terminem.",
  },
  {
    id: "r2",
    section: "retention",
    text: "Po odejściu zawodnika przeprowadzamy ustrukturyzowaną rozmowę z nim i/lub rodzicem, a wnioski trafiają do osoby odpowiedzialnej za retencję.",
    hint: "Bez exit-interview tracicie najcenniejsze dane - od osób, które właśnie podjęły decyzję.",
  },
  {
    id: "r3",
    section: "retention",
    text: "Znamy dokładną liczbę zawodników, którzy odeszli w ciągu ostatnich 12 miesięcy - w podziale na grupy wiekowe i trenerów.",
    hint: "Jeśli liczba jest 'gdzieś tam' - w praktyce nie istnieje.",
  },
  // 2. Communication
  {
    id: "c1",
    section: "communication",
    text: "Rodzic w pierwszych 30 dniach od zapisu otrzymuje zaplanowane komunikaty (powitanie, plan sezonu, zasady, kontakt do trenera) - nie ad hoc.",
    hint: "Onboarding rodzica jest tak samo ważny jak onboarding zawodnika.",
  },
  {
    id: "c2",
    section: "communication",
    text: "Mamy jeden oficjalny kanał komunikacji z rodzicami i zdefiniowany czas odpowiedzi - nie 3 grupy WhatsApp prowadzone na własną rękę przez trenerów.",
    hint: "Każdy dodatkowy kanał to dodatkowe ryzyko konfliktu i utraty informacji.",
  },
  {
    id: "c3",
    section: "communication",
    text: "Co najmniej raz w sezonie zbieramy ustrukturyzowany feedback od rodziców i zawodników, a wyniki są omawiane przez zarząd i sztab szkoleniowy.",
    hint: "Feedback bez decyzji jest tylko teatrem.",
  },
  // 3. Experience
  {
    id: "e1",
    section: "experience",
    text: "Każdy zawodnik ma indywidualny plan rozwoju (cele, kompetencje, mierniki postępu), do którego ma wgląd on i jego rodzic.",
    hint: "Bez planu rozwoju zawodnik i rodzic nie mają jak ocenić, czy 'idzie do przodu'.",
  },
  {
    id: "e2",
    section: "experience",
    text: "Trener przeprowadza udokumentowaną rozmowę indywidualną z zawodnikiem (i/lub rodzicem) co najmniej raz na 3 miesiące.",
    hint: "Brak rozmowy = rodzic interpretuje sam. Zwykle na Waszą niekorzyść.",
  },
  {
    id: "e3",
    section: "experience",
    text: "Mamy zdefiniowany standard treningu i zachowania trenera, który obowiązuje wszystkie grupy - niezależnie od tego, kto je prowadzi.",
    hint: "Jeśli standard 'zależy od trenera' - to nie jest standard.",
  },
  // 4. Organization
  {
    id: "o1",
    section: "organization",
    text: "Nowy trener przechodzi formalny onboarding (wartości, standard pracy, komunikacji z rodzicem, prowadzenie zawodnika) zanim samodzielnie poprowadzi grupę.",
    hint: "Trener bez onboardingu to gwarantowany konflikt w pierwszych 6 miesiącach.",
  },
  {
    id: "o2",
    section: "organization",
    text: "Mamy spisaną procedurę rozwiązywania konfliktów (rodzic-trener, trener-trener, zawodnik-trener) - wszyscy wiedzą, do kogo i jak eskalować.",
    hint: "Brak procedury = konflikt trafia na social media zanim trafi do prezesa.",
  },
  {
    id: "o3",
    section: "organization",
    text: "Decyzje sportowe i organizacyjne opieramy na danych (frekwencja, retencja, feedback) - a nie tylko na intuicji właściciela lub głównego trenera.",
    hint: "Intuicja działa, ale tylko do pewnej skali. Potem zaczyna kosztować.",
  },
];

export const SCALE: { value: number; label: string; sub: string }[] = [
  { value: 1, label: "Nie", sub: "Nie mamy tego w ogóle" },
  { value: 2, label: "Raczej nie", sub: "Pojedyncze próby, bez systemu" },
  { value: 3, label: "Częściowo", sub: "Działa w niektórych grupach" },
  { value: 4, label: "W większości", sub: "Działa, ale z lukami" },
  { value: 5, label: "W pełni", sub: "Standard, mierzalny, powtarzalny" },
];

export type LevelId = "chaos" | "reactive" | "developing" | "high";

export type Level = {
  id: LevelId;
  name: string;
  range: [number, number];
  short: string;
  description: string;
  risks: string[];
  problems: string[];
  consequences: string[];
  expectedChurn: string;
};

export const LEVELS: Level[] = [
  {
    id: "chaos",
    name: "Chaos Mode",
    range: [12, 24],
    short: "Działanie 'na czuja' bez systemu",
    description:
      "Klub działa reaktywnie. Nie wiecie, kto, kiedy i dlaczego odchodzi. Komunikacja z rodzicami włącza się dopiero, gdy wybucha problem. Standard pracy zależy od konkretnej osoby - nie od organizacji.",
    risks: [
      "Brak danych o odejściach i ich przyczynach",
      "Komunikacja rozproszona w prywatnych kanałach trenerów",
      "Brak onboardingu - ani zawodnika, ani rodzica, ani trenera",
      "Konflikty eskalują, bo nie ma procedury",
    ],
    problems: [
      "Rotacja trenerów = utrata całych grup zawodników (lojalność dotyczy osoby, nie klubu)",
      "Skargi rodziców trafiają na social media zanim trafią do prezesa",
      "Nikt w zarządzie nie zna realnego CLV zawodnika ani kosztu pozyskania",
      "Decyzje sportowe są podejmowane na bazie pojedynczych głosów",
    ],
    consequences: [
      "25-40% odejść rocznie - bez świadomości skali",
      "Stała utrata przychodu na poziomie kilkudziesięciu do kilkuset tysięcy zł rocznie",
      "Rosnący koszt pozyskania zawodnika (trzeba 'łatać dziury')",
      "Reputacja klubu: 'nie wiadomo, co się tam dzieje'",
    ],
    expectedChurn: "25-40%",
  },
  {
    id: "reactive",
    name: "Reactive Club",
    range: [25, 36],
    short: "Reagujecie sprawnie, ale gasicie pożary",
    description:
      "Macie ludzi, którzy 'ogarniają'. Problem w tym, że bez systemu wczesnego ostrzegania reagujecie dopiero, gdy zawodnik już zdecydował o odejściu albo rodzic już napisał maila do prezesa.",
    risks: [
      "Brak wczesnych sygnałów ryzyka - wiecie po fakcie",
      "Komunikacja niespójna między trenerami / grupami",
      "Onboarding nowego trenera zależy od tego, kto akurat ma czas",
      "Feedback zbierany ad hoc, bez konsekwencji w decyzjach",
    ],
    problems: [
      "Standard zależy od zaangażowania konkretnego trenera",
      "Zarząd nie ma twardych danych do strategicznych decyzji",
      "Rodzic czuje, że 'klub się stara', ale nie wie, czego się spodziewać",
      "Reputacja zbudowana na nazwiskach trenerów, nie na klubie",
    ],
    consequences: [
      "15-25% odejść rocznie",
      "Wzrost kosztów pozyskania zawodnika - wciąż łatacie",
      "Wzrost organiczny zatrzymuje się przy 2-3 lokalizacjach",
      "Ryzyko utraty kluczowego trenera = utrata 8-22 zawodników",
    ],
    expectedChurn: "15-25%",
  },
  {
    id: "developing",
    name: "Developing Experience Club",
    range: [37, 48],
    short: "Macie procesy, ale nierówno wdrożone",
    description:
      "Część grup działa jak w podręczniku - część 'po staremu'. Macie narzędzia, ale nie wszyscy z nich korzystają. Zaczynacie mierzyć, ale rzadko działać na danych.",
    risks: [
      "Nierówny standard między grupami i lokalizacjami",
      "Dane zbierane, ale nie zawsze wykorzystywane do decyzji",
      "Onboarding nowego trenera istnieje, ale jest skrócony pod presją czasu",
      "Procedury konfliktowe są - ale część osób ich nie zna",
    ],
    problems: [
      "Zawodnicy z 'silnych' grup zostają, z 'słabych' odchodzą",
      "Ryzyko utraty osoby kluczowej = utrata standardu w jej grupie",
      "Brak benchmarków - nie wiecie, czy 12% odejść to dużo czy mało",
      "Zarząd ma dane, ale brakuje rytmu pracy z nimi",
    ],
    consequences: [
      "8-15% odejść rocznie",
      "Stabilna baza, ale ograniczony wzrost organiczny",
      "Trudność w przyciąganiu najlepszych trenerów (bez wyraźnego employer brandu)",
      "Klub odporny na pojedyncze problemy, wrażliwy na nakładające się ryzyka",
    ],
    expectedChurn: "8-15%",
  },
  {
    id: "high",
    name: "High Retention Organization",
    range: [49, 60],
    short: "Organizacja, do której się stoi w kolejce",
    description:
      "Standard jest niezależny od konkretnej osoby. Rodzic wie, czego się spodziewać. Zawodnik wie, dokąd idzie. Trener wie, co znaczy 'tak pracujemy'. Klub jest brandem - nie zbiorem grup.",
    risks: [
      "Skalowanie standardu na nowe lokalizacje / grupy",
      "Utrzymanie kultury przy szybkim wzroście kadry",
      "Ryzyko samozadowolenia i wewnętrznej rotacji standardu",
      "Konkurencja zaczyna kopiować Wasze procesy",
    ],
    problems: [
      "Wewnętrzna komunikacja zaczyna nie nadążać za rozwojem",
      "Najlepsze praktyki przestają być przekazywane 'z ust do ust'",
      "Wzrost wymaga formalizacji ról i odpowiedzialności",
    ],
    consequences: [
      "Poniżej 8% odejść rocznie",
      "CLV zawodnika nawet 3x wyższy niż w Chaos Mode",
      "Klub przyciąga najlepszych trenerów - bez aktywnej rekrutacji",
      "Realna możliwość premium pricingu i skalowania na nowe lokalizacje",
    ],
    expectedChurn: "<8%",
  },
];

export const INSIGHTS: Record<LevelId, string[]> = {
  chaos: [
    "Każdy zawodnik, który odszedł, zabrał ze sobą 12-36 miesięcy przychodu. Nikt z Waszego zarządu nie wie dokładnie ile.",
    "Trener, który odejdzie z Waszego klubu, zabierze od 8 do 22 zawodników. Bo to oni byli przywiązani do niego, nie do Was.",
    "70% odejść jest poprzedzonych sygnałami widocznymi 60-90 dni wcześniej. Tylko nikt ich u Was nie zbierał.",
  ],
  reactive: [
    "Gasicie pożary skutecznie - ale za każdym z nich stoi zawodnik, który już zdążył napisać do innego klubu.",
    "Wasza komunikacja jest tak dobra, jak najsłabszy trener prowadzący prywatną grupę WhatsApp.",
    "67% rodziców nie zgłasza zastrzeżeń wprost. Wy słyszycie dopiero ostatnie 33%.",
  ],
  developing: [
    "Macie dwa kluby w jednym: ten z silnym standardem i ten 'po staremu'. Rodzice to czują w pierwszych 3 miesiącach.",
    "Wasze dane są dobre. Wasze decyzje są oparte głównie na intuicji. Te dwie rzeczy się nie spotykają wystarczająco często.",
    "Jeden kluczowy trener = jeden punkt awarii. Wiecie, który to?",
  ],
  high: [
    "Jesteście w 10% klubów w Polsce. To znaczy, że konkurencja zaczyna Was kopiować - pytanie, jak szybko zwiększacie przewagę.",
    "Największe ryzyko: samozadowolenie. Standard, który nie ewoluuje, w 24 miesiące staje się przeciętny.",
    "Skalowanie standardu na nowe lokalizacje to inna umiejętność niż jego utrzymanie. Czy macie tę pierwszą?",
  ],
};

// ──────────────────────────────────────────────────────────────────────────
// Helpers (pure, work on plain answer maps)
// ──────────────────────────────────────────────────────────────────────────

export function getLevel(total: number): Level {
  return (
    LEVELS.find((l) => total >= l.range[0] && total <= l.range[1]) ?? LEVELS[0]
  );
}

export function sectionScore(
  answers: Record<string, number>,
  section: SectionId
) {
  const qs = QUESTIONS.filter((q) => q.section === section);
  const answered = qs.filter((q) => answers[q.id] != null);
  if (answered.length === 0) return { score: 0, max: qs.length * 5, pct: 0 };
  const score = answered.reduce((acc, q) => acc + (answers[q.id] || 0), 0);
  const max = qs.length * 5;
  return { score, max, pct: Math.round((score / max) * 100) };
}

export function totalScore(answers: Record<string, number>): number {
  return Object.values(answers).reduce((a, b) => a + b, 0);
}

export function topRisks(
  answers: Record<string, number>,
  limit = 3
): Question[] {
  return [...QUESTIONS]
    .filter((q) => answers[q.id] != null)
    .sort((a, b) => (answers[a.id] || 0) - (answers[b.id] || 0))
    .slice(0, limit);
}

export function scaleLabel(value: number): string {
  return SCALE.find((s) => s.value === value)?.label ?? String(value);
}

export const MAX_TOTAL = QUESTIONS.length * 5; // 60
export const MIN_TOTAL = QUESTIONS.length; // 12

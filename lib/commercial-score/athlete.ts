// Athlete Commercial Score - configuration for individual athletes.
//
// 15 questions across 4 process categories plus Audience Power computed from
// four follower counts and one views figure. Pure data.
//
// Weighting: audience 32%, everything else 68%. An athlete's reach is a real
// asset, but a player with 300k followers and no commercial readiness earns
// nothing - and is precisely the person Sport Space Pro represents. 32% is
// enough for a large reach to show in the score and too little for it to paper
// over zero readiness.

import type { AnswerOption, PersonaConfig } from "./types";

export type AthleteCategoryId =
  | "audience"
  | "sport"
  | "content"
  | "readiness"
  | "brandfit";

const opts = (...labels: [string, string, string, string, string]): AnswerOption[] =>
  labels.map((label, i) => ({ value: i + 1, label }));

const categories: PersonaConfig<AthleteCategoryId>["categories"] = [
  {
    id: "audience",
    label: "AUDIENCE POWER",
    short: "Zasięg i realna oglądalność treści",
    weight: 0.32,
    kind: "audience",
    strength: "Twój zasięg jest mocną stroną",
    limits: "zasięg jest na razie za mały, żeby był głównym argumentem",
    opportunity:
      "Największą szansą jest zbudowanie zasięgu na jednym kanale, zamiast rozpraszania się na wszystkie. Marki patrzą na realną oglądalność, nie na sumę followersów z pięciu profili.",
  },
  {
    id: "sport",
    label: "SPORT VALUE",
    short: "Poziom, wyniki i perspektywa sportowa",
    weight: 0.2,
    kind: "qualitative",
    strength: "Twoje wyniki sportowe są mocnym argumentem",
    limits:
      "poziom sportowy nie jest jeszcze argumentem, który sam otwiera drzwi",
    opportunity:
      "Sport Value zmienia się wolno i głównie na treningu. W rozmowie z markami rekompensuje się je zasięgiem, jakością treści i wyrazistym wizerunkiem - i tam warto skierować energię.",
  },
  {
    id: "content",
    label: "CONTENT POWER",
    short: "Regularność, format i gotowość do tworzenia dla marek",
    weight: 0.18,
    kind: "qualitative",
    strength: "Tworzysz treści na poziomie, który interesuje marki",
    limits: "nieregularny content ogranicza to, co marka może kupić",
    opportunity:
      "Największą szansą jest regularność i video. Marka nie kupuje pojedynczego posta, tylko przewidywalny format, który potrafisz powtórzyć w umówionym terminie.",
  },
  {
    id: "readiness",
    label: "COMMERCIAL READINESS",
    short: "Media kit, znajomość danych, stawki, gotowość do współpracy",
    weight: 0.16,
    kind: "qualitative",
    strength: "Jesteś przygotowany do rozmów z markami",
    limits: "gotowość komercyjna ogranicza jego wykorzystanie",
    opportunity:
      "Największą szansą jest przygotowanie podstaw: media kit, znajomość demografii odbiorców i ustalone stawki. To najszybciej odwracalny brak z całej listy i najczęstszy powód, dla którego rozmowa z marką się nie zaczyna.",
  },
  {
    id: "brandfit",
    label: "BRAND FIT",
    short: "Wizerunek, wartości i dopasowanie do kategorii marek",
    weight: 0.14,
    kind: "qualitative",
    strength: "Masz czytelny i wiarygodny wizerunek",
    limits: "nieokreślony wizerunek utrudnia dopasowanie do konkretnych marek",
    opportunity:
      "Największą szansą jest nazwanie, kim jesteś poza wynikiem sportowym. Marka szuka dopasowania do swojej grupy, a nie najlepszego zawodnika - i musi umieć to dopasowanie zobaczyć.",
  },
];

const questions: PersonaConfig<AthleteCategoryId>["questions"] = [
  // ── SPORT VALUE ──────────────────────────────────────────────────────────
  {
    id: "sp1",
    category: "sport",
    text: "Na jakim poziomie rozgrywkowym obecnie występujesz?",
    options: opts(
      "Amatorski",
      "Regionalny",
      "Ogólnopolski",
      "Najwyższa liga krajowa",
      "Poziom międzynarodowy"
    ),
  },
  {
    id: "sp2",
    category: "sport",
    text: "Jakie masz najważniejsze osiągnięcie z ostatnich 24 miesięcy?",
    options: opts(
      "Brak znaczącego osiągnięcia",
      "Sukces na poziomie regionalnym",
      "Medal lub czołowe miejsce w kraju",
      "Tytuł mistrzowski w kraju",
      "Sukces na arenie międzynarodowej"
    ),
  },
  {
    id: "sp3",
    category: "sport",
    text: "Czy reprezentujesz kraj lub reprezentowałeś go w ostatnich 24 miesiącach?",
    options: opts(
      "Nie",
      "Kadra młodzieżowa w przeszłości",
      "Obecnie kadra młodzieżowa",
      "Pojedyncze powołania seniorskie",
      "Stały reprezentant kraju"
    ),
  },
  {
    id: "sp4",
    category: "sport",
    text: "Jak wygląda Twoja perspektywa sportowa na najbliższe 2-3 lata?",
    hint: "Marki podpisują umowy na przyszłość, nie na przeszłość.",
    options: opts(
      "Zbliżam się do końca kariery",
      "Stabilizacja na obecnym poziomie",
      "Rozwój w obecnym otoczeniu",
      "Realna szansa awansu na wyższy poziom",
      "Transfer lub awans międzynarodowy w planie"
    ),
  },

  // ── CONTENT POWER ────────────────────────────────────────────────────────
  {
    id: "co1",
    category: "content",
    text: "Jak często publikujesz treści w mediach społecznościowych?",
    options: opts(
      "Rzadziej niż raz w miesiącu",
      "Kilka razy w miesiącu",
      "Raz w tygodniu",
      "Kilka razy w tygodniu",
      "Codziennie"
    ),
  },
  {
    id: "co2",
    category: "content",
    text: "Jaką część Twoich treści stanowi video?",
    options: opts(
      "Nie publikuję video",
      "Sporadycznie",
      "Około jednej trzeciej",
      "Mniej więcej połowę",
      "Zdecydowaną większość"
    ),
  },
  {
    id: "co3",
    category: "content",
    text: "Czy jesteś w stanie samodzielnie przygotować materiał wideo dla marki w ciągu tygodnia?",
    options: opts(
      "Nie",
      "Tylko z dużym wsparciem z zewnątrz",
      "Z pomocą znajomych",
      "Tak, samodzielnie",
      "Tak, mam stałą osobę lub ekipę"
    ),
  },

  // ── BRAND FIT ────────────────────────────────────────────────────────────
  {
    id: "bf1",
    category: "brandfit",
    text: "Czy potrafisz nazwać trzy wartości, które konsekwentnie pokazujesz w swoich treściach?",
    options: opts(
      "Nie potrafię",
      "Wyczuwam je, ale nie umiem nazwać",
      "Potrafię je nazwać",
      "Są widoczne w tym, co publikuję",
      "Są spójne i rozpoznawalne przez odbiorców"
    ),
  },
  {
    id: "bf2",
    category: "brandfit",
    text: "Czy potrafisz wskazać konkretne kategorie marek, do których pasujesz?",
    options: opts(
      "Nie zastanawiałem się nad tym",
      "Ogólnie: coś związanego ze sportem",
      "Jedną lub dwie kategorie",
      "Trzy i więcej, z uzasadnieniem",
      "Mam listę konkretnych marek"
    ),
  },
  {
    id: "bf3",
    category: "brandfit",
    text: "Czy zdarzyło Ci się odmówić współpracy niepasującej do Twojego wizerunku?",
    hint: "Sprawdza, czy wizerunek jest realnym kryterium, czy deklaracją.",
    options: opts(
      "Nie miałem jeszcze żadnych propozycji",
      "Nie odmawiam, biorę co przyjdzie",
      "Raz się zdarzyło",
      "Kilka razy",
      "Mam jasne kryteria i konsekwentnie ich pilnuję"
    ),
  },

  // ── COMMERCIAL READINESS ─────────────────────────────────────────────────
  {
    id: "cr1",
    category: "readiness",
    text: "Ile płatnych współprac z markami zrealizowałeś w ostatnich 12 miesiącach?",
    options: opts(
      "Żadnej",
      "Jedną",
      "Dwie lub trzy",
      "Od czterech do sześciu",
      "Powyżej sześciu"
    ),
  },
  {
    id: "cr2",
    category: "readiness",
    text: "Czy masz przygotowany media kit z danymi o zasięgu i grupie odbiorców?",
    options: opts(
      "Nie mam",
      "Mam, ale nieaktualny",
      "Mam podstawowy",
      "Mam aktualny, z danymi",
      "Mam aktualny, z opisem zrealizowanych współprac"
    ),
  },
  {
    id: "cr3",
    category: "readiness",
    text: "Czy znasz demografię swoich odbiorców - wiek, płeć, lokalizację?",
    options: opts(
      "Nie sprawdzałem",
      "Z grubsza",
      "Znam główne dane",
      "Znam i używam ich w rozmowach",
      "Znam i porównuję z grupą docelową marki"
    ),
  },
  {
    id: "cr4",
    category: "readiness",
    text: "Czy masz ustalone stawki za formaty współpracy?",
    options: opts(
      "Nie mam",
      "Wyceniam za każdym razem od zera",
      "Mam widełki",
      "Mam cennik formatów",
      "Mam cennik i potrafię go obronić argumentami"
    ),
  },
];

const channels: PersonaConfig<AthleteCategoryId>["channels"] = [
  {
    id: "instagram",
    label: "Instagram",
    hint: "Liczba obserwujących.",
    weight: 0.4,
    placeholder: "np. 8 500",
  },
  {
    id: "tiktok",
    label: "TikTok",
    weight: 0.27,
    placeholder: "np. 3 200",
  },
  {
    id: "youtube",
    label: "YouTube",
    hint: "Liczba subskrybentów.",
    weight: 0.22,
    placeholder: "np. 900",
  },
  {
    id: "facebook",
    label: "Facebook",
    weight: 0.11,
    placeholder: "np. 2 000",
  },
];

export const ATHLETE_CONFIG: PersonaConfig<AthleteCategoryId> = {
  id: "athlete",
  slug: "zawodnik",
  label: "Zawodnik",
  scoreLabel: "Athlete Commercial Score",
  categories,
  questions,
  audienceCategory: "audience",
  /**
   * The competition level already asked in sp1 is the same fact the benchmark
   * needs, so asking again only created a way for the two answers to disagree.
   * Both national tiers map to the same anchors - a top-flight domestic player
   * and a nationally competing one face the same Polish audience benchmarks.
   */
  tierFrom: {
    questionId: "sp1",
    map: {
      1: "lokalny",
      2: "regionalny",
      3: "ogolnopolski",
      4: "ogolnopolski",
      5: "miedzynarodowy",
    },
  },
  channels,
  /**
   * Average views on the last ten Reels/TikToks, divided by the followers the
   * athlete just declared. Asking for an engagement rate returns a number
   * copied from whichever calculator came up first; asking for views returns
   * something readable off the app in seconds - and the ratio is the only part
   * of this model that resists bought followers.
   *
   * Brackets are an expert estimate, not a measured distribution. A missing
   * figure scores neutral so a blank field never penalises.
   */
  quality: {
    numerator: "views",
    denominator: ["instagram", "tiktok"],
    brackets: [
      { below: 0.05, factor: 0.85, label: "Zasięg poniżej normy rynkowej" },
      { below: 0.15, factor: 0.95, label: "Zasięg nieco poniżej normy" },
      { below: 0.35, factor: 1.05, label: "Zdrowa, zaangażowana społeczność" },
      { below: Infinity, factor: 1.15, label: "Wyjątkowo zaangażowana społeczność" },
    ],
    fallback: 1,
  },
};

/**
 * Not a scored channel - it feeds the quality multiplier above, so it carries no
 * weight of its own but still has to be collected on the audience screen.
 */
export const ATHLETE_VIEWS_FIELD = {
  id: "views",
  label: "Średnie wyświetlenia Reels / TikTok",
  hint: "Średnia z ostatnich 10 filmów. Zostaw puste, jeśli nie publikujesz video - nie obniży to wyniku.",
  placeholder: "np. 4 500",
};

// Sponsorship Commercial Score - configuration for sports organizations
// (clubs, academies, federations, tournament and event organisers).
//
// 15 questions across 5 process categories plus Audience Power computed from
// six declared numbers. Pure data: no scoring logic, no UI.
//
// On the split between assets and process: two clubs with identical reach can
// differ tenfold in sponsorship revenue, and what separates them is the sales
// process, not the follower count. So audience carries 25% and the process 75%.
// A model that gave reach 40% would tell a small club "you are weak because you
// have few followers" - something the club cannot fix and Sport Space Pro does
// not sell. At 25% the message becomes "you have assets but no offer built from
// them", which is the actual diagnosis and the actual service.

import type { AnswerOption, PersonaConfig } from "./types";

export type OrganizationCategoryId =
  | "audience"
  | "assets"
  | "offer"
  | "sales"
  | "activation"
  | "b2b";

/** Terse helper so the question bank below stays readable. */
const opts = (...labels: [string, string, string, string, string]): AnswerOption[] =>
  labels.map((label, i) => ({ value: i + 1, label }));

const categories: PersonaConfig<OrganizationCategoryId>["categories"] = [
  {
    id: "audience",
    label: "AUDIENCE POWER",
    short: "Zasięg, frekwencja i własna baza kontaktów",
    weight: 0.25,
    kind: "audience",
    strength: "Wasz zasięg i publiczność są mocną stroną",
    limits: "zasięg jest zbyt mały, żeby udźwignąć rozmowę o dużych budżetach",
    opportunity:
      "Największą szansą jest zamiana obecnej publiczności w policzalne aktywo: uporządkowanie danych o frekwencji, zasięgach i bazie kontaktów tak, żeby dało się je pokazać marce w jednej tabeli.",
  },
  {
    id: "assets",
    label: "COMMERCIAL ASSETS",
    short: "Co realnie macie do sprzedania",
    weight: 0.18,
    kind: "qualitative",
    strength: "Macie mocne portfolio aktywów komercyjnych",
    limits:
      "nieopisane aktywa ograniczają to, co da się z nich sprzedać",
    opportunity:
      "Największą szansą jest spisanie pełnej listy aktywów wraz z parametrami. Sponsor nie kupuje tego, czego nie potraficie nazwać i policzyć, a większość klubów sprzedaje wyłącznie te aktywa, które sama ma przed oczami.",
  },
  {
    id: "offer",
    label: "POSITIONING & OFFER",
    short: "Dlaczego marka ma zostać Waszym partnerem",
    weight: 0.18,
    kind: "qualitative",
    strength: "Potraficie jasno uzasadnić wartość współpracy z Wami",
    limits:
      "brak gotowej oferty ogranicza wykorzystanie tego, co macie",
    opportunity:
      "Największą szansą jest przełożenie potencjału na konkretną ofertę: pakiety, ceny i jedno zdanie odpowiadające, dlaczego akurat ta firma ma zostać Waszym partnerem.",
  },
  {
    id: "sales",
    label: "SALES CAPABILITY",
    short: "Kto i jak prowadzi rozmowy z firmami",
    weight: 0.16,
    kind: "qualitative",
    strength: "Macie realny proces sprzedaży sponsoringu",
    limits:
      "brak procesu sprzedaży sprawia, że rozmowy zależą od przypadku",
    opportunity:
      "Największą szansą jest nadanie sprzedaży sponsoringu właściciela i rytmu. Bez osoby odpowiedzialnej i listy firm do kontaktu sponsoring pozostaje efektem znajomości, a nie działania.",
  },
  {
    id: "activation",
    label: "ACTIVATION & MEASUREMENT",
    short: "Co sponsor dostaje i co mu z tego raportujecie",
    weight: 0.12,
    kind: "qualitative",
    strength: "Potraficie aktywować i rozliczać współpracę z partnerami",
    limits:
      "brak raportowania efektów utrudnia przedłużanie umów",
    opportunity:
      "Największą szansą jest raportowanie efektów współpracy. Sponsor, który nie widzi wyniku, nie ma na czym oprzeć decyzji o przedłużeniu - i najczęściej jej nie podejmuje.",
  },
  {
    id: "b2b",
    label: "B2B & HOSPITALITY",
    short: "Dostęp do przedsiębiorców i formaty biznesowe",
    weight: 0.11,
    kind: "qualitative",
    strength: "Macie realny dostęp do środowiska biznesowego",
    limits:
      "niewykorzystany potencjał B2B zawęża ofertę do samej ekspozycji",
    opportunity:
      "Największą szansą jest zbudowanie formatu B2B wokół klubu. Dla wielu firm dostęp do innych przedsiębiorców jest wart więcej niż logo na koszulce, a jest to aktywo, które nie wymaga zasięgu.",
  },
];

const questions: PersonaConfig<OrganizationCategoryId>["questions"] = [
  // ── POSITIONING & OFFER ──────────────────────────────────────────────────
  {
    id: "of1",
    category: "offer",
    text: "Czy potraficie jednym zdaniem odpowiedzieć, dlaczego konkretna firma powinna zostać Waszym partnerem?",
    hint: "Nie chodzi o to, czego Wy potrzebujecie, tylko co firma z tego ma.",
    options: opts(
      "Nie mamy takiej odpowiedzi",
      "Wiemy, ale nigdzie tego nie zapisaliśmy",
      "Mamy to spisane",
      "Mamy to w ofercie i używamy w rozmowach",
      "Mamy to i potwierdzamy danymi z ostatnich 12 miesięcy"
    ),
  },
  {
    id: "of2",
    category: "offer",
    text: "Czy macie przygotowaną ofertę sponsorską z pakietami i cenami?",
    options: opts(
      "Nie mamy oferty",
      "Robimy prezentację doraźnie pod rozmowę",
      "Mamy pakiety, ale bez cen",
      "Mamy pakiety z cenami",
      "Mamy pakiety z cenami i wyceniamy rozwiązania indywidualne"
    ),
  },
  {
    id: "of3",
    category: "offer",
    text: "Czy potraficie przygotować rozwiązanie szyte pod cel biznesowy konkretnej marki?",
    hint: "Np. dotarcie do rodziców, rekrutacja pracowników, sprzedaż w regionie.",
    options: opts(
      "Nie, proponujemy wszystkim to samo",
      "Rzadko, przy wyjątkowych sytuacjach",
      "Tak, ale tylko dla dużych partnerów",
      "Tak, standardowo dla każdego partnera",
      "Tak, zaczynamy od briefu i celu po stronie marki"
    ),
  },

  // ── COMMERCIAL ASSETS ────────────────────────────────────────────────────
  {
    id: "as1",
    category: "assets",
    text: "Czy macie spisaną listę wszystkich aktywów komercyjnych wraz z ich parametrami?",
    hint: "Powierzchnie, koszulki, obiekt, digital, content, eventy, akademia, społeczność.",
    options: opts(
      "Nie mamy takiej listy",
      "Mamy ją w głowie",
      "Mamy listę, ale bez parametrów",
      "Mamy listę z parametrami",
      "Mamy listę z parametrami, wycenami i dostępnością"
    ),
  },
  {
    id: "as2",
    category: "assets",
    text: "Ile z Waszych aktywów wykracza poza logo na koszulce i banery przy boisku?",
    options: opts(
      "Sprzedajemy tylko logo i banery",
      "Dokładamy do tego digital",
      "Dokładamy digital i content",
      "Dokładamy eventy i akademię",
      "Mamy pełne portfolio, łącznie z B2B i społecznością"
    ),
  },
  {
    id: "as3",
    category: "assets",
    text: "Czy Wasze aktywa cyfrowe są opisane jako produkt sprzedażowy?",
    hint: "Content, social media, video - z formatami, zasięgami i miejscem dla partnera.",
    options: opts(
      "Nie, publikujemy bez myślenia o partnerach",
      "Publikujemy regularnie, ale bez planu komercyjnego",
      "Mamy statystyki zasięgów",
      "Mamy zdefiniowane formaty sprzedażowe",
      "Mamy formaty sprzedażowe z cennikiem"
    ),
  },

  // ── B2B & HOSPITALITY ────────────────────────────────────────────────────
  {
    id: "bb1",
    category: "b2b",
    text: "Czy macie przestrzeń i format do goszczenia partnerów oraz ich klientów?",
    options: opts(
      "Nie mamy takiej możliwości",
      "Mamy miejsce, ale bez formatu",
      "Zapraszamy nieregularnie, przy okazji",
      "Mamy stały format na wydarzeniach",
      "Hospitality jest osobnym produktem w ofercie"
    ),
  },
  {
    id: "bb2",
    category: "b2b",
    text: "Czy organizujecie spotkania biznesowe lub networking dla firm z Waszego otoczenia?",
    options: opts(
      "Nie organizujemy",
      "Sporadycznie, bez planu",
      "Raz w roku",
      "Cyklicznie, kilka razy w roku",
      "Prowadzimy Business Club z bazą członków"
    ),
  },

  // ── SALES CAPABILITY ─────────────────────────────────────────────────────
  {
    id: "sa1",
    category: "sales",
    text: "Czy jest u Was osoba, dla której pozyskiwanie sponsorów to główna odpowiedzialność?",
    options: opts(
      "Nikt się tym nie zajmuje",
      "Prezes lub zarząd przy okazji innych obowiązków",
      "Osoba, która ma to jako jedno z wielu zadań",
      "Osoba dedykowana do sponsoringu",
      "Zespół z przypisanymi celami sprzedażowymi"
    ),
  },
  {
    id: "sa2",
    category: "sales",
    text: "Ile aktywnych rozmów z potencjalnymi partnerami prowadzicie w tej chwili?",
    hint: "Aktywna rozmowa to taka, która ma następny ustalony krok.",
    options: opts(
      "Żadnej",
      "Jedną lub dwie",
      "Od trzech do pięciu",
      "Od sześciu do dziesięciu",
      "Powyżej dziesięciu"
    ),
  },
  {
    id: "sa3",
    category: "sales",
    text: "Czy prowadzicie regularny prospecting, czyli sami docieracie do firm?",
    options: opts(
      "Czekamy, aż firmy zgłoszą się same",
      "Odzywamy się sporadycznie",
      "Robimy akcję przed sezonem",
      "Docieramy do firm regularnie",
      "Mamy listę docelową i stały rytm tygodniowy"
    ),
  },
  {
    id: "sa4",
    category: "sales",
    text: "Czy rozmowy z partnerami są zapisywane w jednym miejscu, ze statusem i terminem kolejnego kroku?",
    options: opts(
      "Nigdzie tego nie zapisujemy",
      "W mailach i w pamięci",
      "W arkuszu kalkulacyjnym",
      "W systemie CRM",
      "W CRM z pipeline'em i prognozą przychodu"
    ),
  },

  // ── ACTIVATION & MEASUREMENT ─────────────────────────────────────────────
  {
    id: "ac1",
    category: "activation",
    text: "Czy sponsor otrzymuje od Was zaplanowane aktywacje, a nie tylko ekspozycję logo?",
    options: opts(
      "Tylko ekspozycja",
      "Pojedyncze akcje, gdy ktoś o nie poprosi",
      "Plan aktywacji dla największych partnerów",
      "Plan aktywacji dla każdego partnera",
      "Plan aktywacji zbudowany wokół celu biznesowego marki"
    ),
  },
  {
    id: "ac2",
    category: "activation",
    text: "Czy raportujecie partnerom efekty współpracy?",
    options: opts(
      "Nie raportujemy",
      "Tylko na wyraźną prośbę",
      "Raz w roku, podsumowanie sezonu",
      "Cyklicznie w trakcie współpracy",
      "Cyklicznie, według KPI uzgodnionych na starcie"
    ),
  },
  {
    id: "ac3",
    category: "activation",
    text: "Jaka część partnerów przedłużyła współpracę na kolejny okres?",
    hint: "Najtwardszy wskaźnik jakości sponsoringu - i najczęściej niepoliczony.",
    options: opts(
      "Nie wiemy, nie liczymy tego",
      "Mniej niż połowa",
      "Około połowy",
      "Większość",
      "Prawie wszyscy, część z wyższym budżetem"
    ),
  },
];

const channels: PersonaConfig<OrganizationCategoryId>["channels"] = [
  {
    id: "attendance",
    label: "Średnia frekwencja",
    hint: "Średnia liczba osób na meczu lub wydarzeniu w ostatnim sezonie.",
    weight: 0.32,
    placeholder: "np. 850",
    naLabel: "Nie organizujemy własnych wydarzeń",
  },
  {
    id: "database",
    label: "Baza e-mail / CRM",
    hint: "Liczba aktywnych kontaktów, do których możecie legalnie wysłać wiadomość.",
    weight: 0.25,
    placeholder: "np. 2 400",
  },
  {
    id: "instagram",
    label: "Instagram",
    hint: "Liczba obserwujących profil organizacji.",
    weight: 0.17,
    placeholder: "np. 12 000",
  },
  {
    id: "facebook",
    label: "Facebook",
    weight: 0.1,
    placeholder: "np. 20 000",
  },
  {
    id: "tiktok",
    label: "TikTok",
    weight: 0.08,
    placeholder: "np. 2 000",
  },
  {
    id: "youtube",
    label: "YouTube",
    hint: "Liczba subskrybentów.",
    weight: 0.08,
    placeholder: "np. 1 500",
  },
];

export const ORGANIZATION_CONFIG: PersonaConfig<OrganizationCategoryId> = {
  id: "organization",
  slug: "organizacja",
  label: "Organizacja sportowa",
  scoreLabel: "Sponsorship Commercial Score",
  categories,
  questions,
  audienceCategory: "audience",
  channels,
};

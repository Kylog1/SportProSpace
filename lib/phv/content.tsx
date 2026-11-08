// Kalkulator PHV: treści faz, filmy i źródła.
// Teksty edytujesz tutaj, bez ruszania logiki i komponentów.

import type { ReactNode } from "react";
import { addMonths, bySex, gen, type PhaseId, type PhvResult } from "./calc";

/* ================= FILMY: podmień linki tutaj ================= */
export interface Video {
  label: string;
  url: string;
  alt?: string; // zapasowa wersja angielska
}

export const VIDEOS = {
  "11-seria": { label: "FIFA 11+ · cały program", url: "https://www.youtube.com/watch?v=RSJIp7e7fyY" },
  "11-7a": { label: "FIFA 11+ · ćw. 7a", url: "https://www.youtube.com/watch?v=gf-XEapqXPU" },
  "11-7b": { label: "FIFA 11+ · ćw. 7b", url: "https://www.youtube.com/watch?v=xIjMKLQbYN4" },
  "11-8a": { label: "FIFA 11+ · ćw. 8a", url: "https://www.youtube.com/watch?v=U4qn6CHzZ2Q" },
  "11-8b": { label: "FIFA 11+ · ćw. 8b", url: "https://www.youtube.com/watch?v=2G3PeyIQNxg" },
  "11-9a": { label: "FIFA 11+ · ćw. 9a", url: "https://www.youtube.com/watch?v=rfZ-i7erbaY" },
  "11-9b": { label: "FIFA 11+ · ćw. 9b", url: "https://www.youtube.com/watch?v=45QvWza5DAM" },
  "11-9c": { label: "FIFA 11+ · ćw. 9c", url: "https://www.youtube.com/watch?v=XGq0PFDuH0M" },
  "11-10a": { label: "FIFA 11+ · ćw. 10a", url: "https://www.youtube.com/watch?v=oN15EId6A3U" },
  "11-10b": { label: "FIFA 11+ · ćw. 10b", url: "https://www.youtube.com/watch?v=q_4OC5tUCro" },
  "11-11a": { label: "FIFA 11+ · ćw. 11a", url: "https://www.youtube.com/watch?v=_zYjf23XcRU" },
  "11-11b": { label: "FIFA 11+ · ćw. 11b", url: "https://www.youtube.com/watch?v=vOd7JmOgF6Y" },
  "11-12b": { label: "FIFA 11+ · ćw. 12b", url: "https://www.youtube.com/watch?v=V76W_0EaKcg" },
  "11-12c": { label: "FIFA 11+ · ćw. 12c", url: "https://www.youtube.com/watch?v=P9EtKVKC8uA" },
  k2: { label: "FIFA 11+ Kids · ćw. 2 (PL)", url: "https://www.youtube.com/watch?v=tZf-_gqnCT0", alt: "https://www.youtube.com/watch?v=Z13C1OMTebk" },
  k3: { label: "FIFA 11+ Kids · ćw. 3 (PL)", url: "https://www.youtube.com/watch?v=fUiYmaKm430", alt: "https://www.youtube.com/watch?v=nWgQC6ga-_w" },
  k4: { label: "FIFA 11+ Kids · ćw. 4 (PL)", url: "https://www.youtube.com/watch?v=MbYqA0lGlPU", alt: "https://www.youtube.com/watch?v=BvW9_y_7l1I" },
  k5: { label: "FIFA 11+ Kids · ćw. 5 (PL)", url: "https://www.youtube.com/watch?v=0OJu-CWBmzo", alt: "https://www.youtube.com/watch?v=ccUdcHO8Kvo" },
  k6: { label: "FIFA 11+ Kids · ćw. 6 (PL)", url: "https://www.youtube.com/watch?v=NIdaO27MHAM", alt: "https://www.youtube.com/watch?v=b9sahE1oHFE" },
} satisfies Record<string, Video>;

export type VideoCode = keyof typeof VIDEOS;

/* ================= FAZY ================= */
export interface Exercise {
  name: string;
  how: string;
  dose: string;
  video?: VideoCode;
}

export interface Phase {
  id: PhaseId;
  name: string;
  what: (r: PhvResult) => string;
  focus: ReactNode[];
  plan: string;
  exercises: Exercise[];
  roll: string;
  next: (r: PhvResult) => string;
  female?: string;
}

export const PHASES: Record<PhaseId, Phase> = {
  1: {
    id: 1,
    name: "Przed skokiem wzrostowym",
    what: () => "Twój szczyt wzrostu jest jeszcze ponad rok przed tobą. To najlepszy czas na naukę ruchu. Układ nerwowy szybko się uczy, więc każda nowa umiejętność zostaje na długo.",
    focus: [
      "koordynacja, zwinność, szybkość reakcji, równowaga,",
      "technika podstawowych ruchów: przysiad, wykrok, lądowanie po skoku, podpór,",
      "dużo różnych sportów i zabaw ruchowych, nie tylko piłka,",
      "siła na wadze własnego ciała, zawsze z czystą techniką.",
    ],
    plan: "2–3 razy w tygodniu, ok. 20 min",
    exercises: [
      { name: "Stanie na jednej nodze z piłką", how: "Stoisz na jednej nodze i podajesz piłkę wokół bioder, potem z zamkniętymi oczami.", dose: "3 × 30 s / stronę", video: "k3" },
      { name: "Wykroki w marszu", how: "Długi krok do przodu, tylne kolano prawie dotyka podłogi, tułów prosto.", dose: "2 × 8 / stronę", video: "11-11b" },
      { name: "Pompki", how: "Ciało w jednej linii, zacznij od pompek z kolan, jeśli trzeba.", dose: "2 × 6–10", video: "k4" },
      { name: "Skoki łyżwiarza", how: "Skok w bok z nogi na nogę i miękkie, ciche lądowanie, kolano nad stopą.", dose: "3 × 5 / stronę", video: "k2" },
      { name: "Spiderman", how: "Chód na dłoniach i stopach, plecy płaskie.", dose: "3 × 10 m", video: "k6" },
      { name: "Podpór przodem", how: "Na przedramionach, ciało w jednej linii.", dose: "3 × 20–30 s", video: "11-7a" },
    ],
    roll: "2–3 razy w tygodniu, ok. 5 minut.",
    next: (r) => `Kolejna faza, „skok tuż przed tobą”, zacznie się mniej więcej około ${gen(addMonths(r.peak, -12))}. Zmierz się ponownie za 3 miesiące.`,
    female: "To dobry moment, żeby nauczyć się prawidłowego lądowania i hamowania (kolana nie uciekają do środka). To podstawa ochrony kolan na kolejne lata.",
  },
  2: {
    id: 2,
    name: "Skok tuż przed tobą",
    what: () => "Do szczytu wzrostu zostało mniej niż rok. Tempo rośnięcia już przyspiesza. To ostatni moment, żeby utrwalić dobrą technikę, zanim ciało zacznie się szybko zmieniać.",
    focus: [
      "utrwalenie techniki przysiadu, wykroku, lądowania i zmiany kierunku,",
      "stabilizacja tułowia,",
      "wprowadzenie codziennego rollowania i rozciągania jako nawyku,",
      "regularne pomiary, bo przyspieszenie przyjdzie niedługo.",
    ],
    plan: "2–3 razy w tygodniu, 20–25 min",
    exercises: [
      { name: "Stanie na jednej nodze z piłką", how: "Jak w poprzedniej fazie, dodaj podrzut i chwyt piłki.", dose: "3 × 30 s / stronę", video: "11-10b" },
      { name: "Przysiad ze wspięciem na palce", how: "Stopy na szerokość bioder, kolana nad stopami, na górze wspięcie na palce.", dose: "3 × 10", video: "11-11a" },
      { name: "Wykroki w marszu", how: "Powoli, 2 s w dół.", dose: "2 × 8 / stronę", video: "11-11b" },
      { name: "Podpór bokiem", how: "Biodro w górze, ciało w jednej linii.", dose: "3 × 20 s / stronę", video: "11-8a" },
      { name: "Podpór przodem z unoszeniem nogi", how: "Na przedramionach, naprzemiennie unosisz nogi.", dose: "3 × 20–30 s", video: "11-7b" },
      { name: "Skoki boczne z lądowaniem", how: "Skok na bok obunóż, miękkie lądowanie, kolana nad stopami.", dose: "3 × 5 / stronę", video: "11-12b" },
    ],
    roll: "3–4 razy w tygodniu, 5–8 minut.",
    next: (r) => `Najszybsze rośnięcie zacznie się mniej więcej około ${gen(r.w1from)}. Zmierz się ponownie za 3 miesiące.`,
  },
  3: {
    id: 3,
    name: "Szczyt wzrostu",
    what: (r) =>
      `Jesteś w szczycie wzrostu, czyli rośniesz teraz najszybciej w życiu. To okno trwa mniej więcej od ${gen(r.w1from)} do ${gen(r.w1to)}. Ruchy mogą być chwilowo mniej płynne, a lądowanie czy przysiad wyglądać gorzej niż kilka miesięcy temu. To nie jest cofnięcie się. Ciało uczy się poruszać na nowych, dłuższych dźwigniach. Kości rosną szybciej, niż nadążają za nimi mięśnie i ścięgna, dlatego łatwiej o przeciążenia, np. bóle pod rzepką albo w pięcie.`,
    focus: [
      "jakość ruchu przed ilością i ciężarem,",
      "stabilizacja tułowia, równowaga, mobilność,",
      "ćwiczenia na wadze własnego ciała, powoli w dół (ok. 3 s),",
      "mniej skoków i sprintów na twardym podłożu, jeśli coś boli,",
      <>
        <strong>nie przerywaj treningów</strong>. Regularny ruch pomaga szybciej opanować nowe ciało.
      </>,
    ],
    plan: "2–3 razy w tygodniu, 25–30 min",
    exercises: [
      { name: "Przekładanie piłki za kolanem", how: "Stoisz na jednej nodze w skłonie i przekładasz piłkę pod kolanem z ręki do ręki.", dose: "2–3 × 6 / stronę" },
      { name: "Podpór bokiem ze zmianą strony", how: "Z podporu bokiem przez podpór przodem na drugi bok, 2 s pauzy.", dose: "2–3 × 6 / stronę", video: "11-8a" },
      { name: "Niedźwiedź bokiem", how: "Podpór na dłoniach i stopach, kolana tuż nad podłogą, kroki w bok.", dose: "2–3 × 15 kroków / stronę" },
      { name: "Przysiad bułgarski", how: "Tylna stopa na krześle, schodzisz na przedniej nodze, kolano nad stopą.", dose: "2–3 × 8 / stronę" },
      { name: "Deska kopenhaska (krótka)", how: "Podpór bokiem, górna noga kolanem na ławce. Wzmacnia pachwiny.", dose: "2–3 × 10–15 s / stronę" },
      { name: "Schodzenie ze stopnia", how: "Na niskim stopniu powoli opuszczasz drugą nogę, aż pięta dotknie podłogi.", dose: "2–3 × 10 / stronę" },
      { name: "Martwy ciąg na jednej nodze", how: "Skłon na jednej nodze, druga w tył, tułów i noga w jednej linii.", dose: "2–3 × 8 / stronę" },
    ],
    roll: "codziennie lub po każdym treningu, 8–10 minut. W tej fazie najważniejsze są przód uda i łydki.",
    next: (r) =>
      `Mniej więcej od ${gen(r.w1to)} zaczniesz stopniowo wychodzić ze szczytu. Mniej więcej od ${gen(r.w2from)} przyjdzie dobry czas na budowanie siły. Mierz się co 3 miesiące, żeby zobaczyć, kiedy tempo wzrostu zacznie spadać.`,
    female: "Pierwsza miesiączka pojawia się zwykle mniej więcej rok po szczycie wzrostu. W tym czasie szczególnie dbaj o technikę lądowania i zmiany kierunku, bo kolana są wtedy bardziej narażone.",
  },
  4: {
    id: 4,
    name: "Za szczytem",
    what: () => "Najszybsze rośnięcie masz już za sobą, ale ciało nadal rośnie, a tułów nadrabia za nogami. Koordynacja zwykle wraca do normy. To czas przejścia: z ćwiczeń tylko na wadze ciała stopniowo przechodzisz do ćwiczeń z lekkim oporem.",
    focus: [
      "powrót płynności i szybkości ruchu,",
      "stopniowe dodawanie oporu: gumy, lekkie hantle lub kettle,",
      "więcej ćwiczeń na jednej nodze i zmian kierunku,",
      "dalej rollowanie i mobilność.",
    ],
    plan: "2–3 razy w tygodniu, ok. 30 min",
    exercises: [
      { name: "Przysiad bułgarski", how: "Tylna stopa na krześle, można wziąć lekkie hantle do rąk.", dose: "3 × 8–10 / stronę" },
      { name: "Martwy ciąg na jednej nodze", how: "Z lekkim ciężarem w ręce po stronie nogi uniesionej.", dose: "3 × 8 / stronę" },
      { name: "Deska kopenhaska (krótka)", how: "Kolano górnej nogi na ławce, dłuższy czas.", dose: "3 × 15–20 s / stronę" },
      { name: "Nordic hamstring (wersja łatwa)", how: "Klęk, ktoś trzyma kostki, powoli pochylasz się w przód, ile dasz radę, i podpierasz rękami.", dose: "2 × 4–5", video: "11-9a" },
      { name: "Skoki z lądowaniem na jednej nodze", how: "Mały skok w przód, lądowanie na jednej nodze, zatrzymaj na 2 s.", dose: "3 × 4 / stronę", video: "k5" },
      { name: "Podpór bokiem z unoszeniem biodra", how: "Z podporu bokiem opuszczasz biodro prawie do podłogi i unosisz z powrotem.", dose: "3 × 8 / stronę", video: "11-8b" },
    ],
    roll: "4–5 razy w tygodniu, ok. 8 minut.",
    next: (r) => `Mniej więcej od ${gen(r.w2from)} zaczyna się „czas na siłę”. Zmierz się ponownie za 3 miesiące.`,
  },
  5: {
    id: 5,
    name: "Czas na siłę",
    what: (r) =>
      `Masz już większość dorosłego wzrostu, ale ciało jest dłuższe i cięższe, a mięśnie jeszcze go nie „obudowały”. ${bySex(
        r,
        "Po szczycie wzrostu rośnie poziom testosteronu, więc mięśnie bardzo dobrze reagują teraz na trening siłowy.",
        "Trening siłowy daje teraz duży przyrost siły i chroni stawy, szczególnie kolana.",
      )} To najlepszy moment, żeby zbudować sportową „zbroję”: siłę, moc i odporność na kontuzje. Łatwiej teraz o przeciążenia (ból pod rzepką, w pięcie, w krzyżu), więc obciążenie dokładaj stopniowo.`,
    focus: [
      "trening siłowy 2 razy w tygodniu, z ciężarem dobieranym przez trenera,",
      "więcej skoczności, mocy i sprintów,",
      "technika z ciężarem: przysiad, martwy ciąg, wykroki,",
      "dalej regeneracja: sen, jedzenie, roller.",
    ],
    plan: "2 razy w tygodniu, 35–45 min, w domu lub na siłowni",
    exercises: [
      { name: "Przysiad z ciężarem przed sobą", how: "Hantel lub kettle przy klatce piersiowej, tułów prosto.", dose: "3–4 × 6–10" },
      { name: "Przysiad bułgarski", how: "Z hantlami.", dose: "3 × 8 / stronę" },
      { name: "Martwy ciąg rumuński", how: "Hantle wzdłuż ud, biodra w tył, plecy proste.", dose: "3 × 8" },
      { name: "Nordic hamstring", how: "Pełniejsza wersja, powoli w dół.", dose: "3 × 5–6", video: "11-9b" },
      { name: "Deska kopenhaska (długa)", how: "Na ławce opiera się stopa, nie kolano.", dose: "3 × 15–20 s / stronę" },
      { name: "Skoki dynamiczne", how: "Maksymalny skok, miękkie lądowanie, pełny odpoczynek między skokami.", dose: "3 × 4", video: "11-12c" },
      { name: "Wspięcia na palce na jednej nodze", how: "Na stopniu, powoli w dół.", dose: "3 × 12 / stronę" },
    ],
    roll: "po każdym treningu, 8–10 minut.",
    next: (r) => `Ta faza trwa mniej więcej do ${gen(r.w2to)}. Mierz się co 3 miesiące, aż wzrost praktycznie się zatrzyma.`,
    female: "Zwróć uwagę na regularność miesiączki i energię w ciągu dnia. Brak miesiączki albo ciągłe zmęczenie przy dużym wysiłku może oznaczać, że jesz za mało w stosunku do treningów. Warto wtedy porozmawiać z lekarzem.",
  },
  6: {
    id: 6,
    name: "Ciało prawie dorosłe",
    what: () => "Wzrost zbliża się do dorosłego i rośnie już powoli. Ciało jest gotowe na trening podobny do dorosłego, z rozsądną progresją.",
    focus: [
      "pełny trening siłowy i mocy pod okiem trenera,",
      "szybkość, zwinność, wytrzymałość specyficzna dla piłki,",
      "profilaktyka urazów jako stały element rozgrzewki (FIFA 11+),",
      "regeneracja i jedzenie jak u dorosłego sportowca.",
    ],
    plan: "2–3 razy w tygodniu",
    exercises: [
      { name: "Rozgrzewka FIFA 11+", how: "Pełny program przed każdym treningiem.", dose: "ok. 20 min", video: "11-seria" },
      { name: "Przysiad, martwy ciąg, wykroki", how: "Z ciężarem dobranym przez trenera.", dose: "3–4 × 5–8" },
      { name: "Nordic hamstring", how: "Pełna wersja.", dose: "3 × 6–8", video: "11-9c" },
      { name: "Deska kopenhaska (długa)", how: "Na ławce opiera się stopa.", dose: "3 × 20–30 s / stronę" },
      { name: "Skoki i sprinty", how: "Krótkie, maksymalne, z pełnym odpoczynkiem.", dose: "4–6 powtórzeń" },
    ],
    roll: "po treningach i według potrzeby.",
    next: () => "Pomiary co 6 miesięcy wystarczą, a gdy przyrost spadnie poniżej 1 cm na pół roku, można je zakończyć.",
  },
};

/* ================= ŻYWIENIE ================= */
export const PROTEIN_FOODS: [string, string][] = [
  ["Skyr / jogurt wysokobiałkowy 150 g", "15–18 g"],
  ["Twaróg półtłusty 150 g", "~27 g"],
  ["3 jajka", "~19 g"],
  ["Pierś z kurczaka 120 g", "~35 g"],
  ["Serek wiejski 200 g", "~22 g"],
  ["Tuńczyk 100 g", "~25 g"],
  ["Ser żółty 60 g", "~15 g"],
  ["Soczewica ugotowana 200 g", "~18 g"],
];

/* ================= ŹRÓDŁA ================= */
export const SOURCES: [string, string][] = [
  ["Moore SA i in. Enhancing a Somatic Maturity Prediction Model. Med Sci Sports Exerc. 2015;47(8):1755–1764.", "https://dspace.lboro.ac.uk/dspace-jspui/handle/2134/19605"],
  ["Kozieł SM, Malina RM. Modified maturity offset prediction equations: validation in independent longitudinal samples of boys and girls. Sports Med. 2018;48:221–236.", "https://doi.org/10.1007/s40279-017-0750-y"],
  ["Lloyd RS, Oliver JL. The Youth Physical Development Model: A new approach to long-term athletic development. Strength Cond J. 2012;34(3):61–72.", "https://doi.org/10.1519/SSC.0b013e31825760ea"],
  ["Lloyd RS i in. Position statement on youth resistance training: the 2014 International Consensus. Br J Sports Med. 2014;48(7):498–505.", "https://doi.org/10.1136/bjsports-2013-092952"],
  ["van der Sluis A i in. Sport injuries aligned to peak height velocity in talented pubertal soccer players. Int J Sports Med. 2014;35(4):351–355.", "https://pubmed.ncbi.nlm.nih.gov/24022568/"],
  ["Cumming SP i in. Bio-banding in sport: applications to competition, talent identification, and strength and conditioning of youth athletes. Strength Cond J. 2017;39(2):34–47.", "https://doi.org/10.1519/SSC.0000000000000281"],
  ["FIFA 11+: program rozgrzewki zapobiegającej urazom (filmy FIFA).", "https://www.youtube.com/watch?v=RSJIp7e7fyY"],
  ["FIFA 11+ Kids po polsku: seria dr Urszuli Zdanowicz.", "https://www.youtube.com/watch?v=AZ9w5E3E5CE"],
  ["Płudowski P i in. Guidelines for Preventing and Treating Vitamin D Deficiency: A 2023 Update in Poland. Nutrients. 2023;15(3):695.", "https://doi.org/10.3390/nu15030695"],
  ["Desbrow B i in. Sports Dietitians Australia position statement: sports nutrition for the adolescent athlete. Int J Sport Nutr Exerc Metab. 2014;24(5):570–584.", "https://pubmed.ncbi.nlm.nih.gov/24668620/"],
  ["Rychlik E, Stoś K, Woźniak A, Mojska H (red.). Normy żywienia dla populacji Polski. NIZP PZH-PIB, 2024.", "https://www.pzh.gov.pl/normy-zywienia-2024/"],
  ["Medycyna Praktyczna: Żywienie sportowców w wieku rozwojowym.", "https://www.mp.pl/pytania/pediatria/zywienie-dzieci-zdrowych/kompendium/344791,zywienie-sportowcow-w-wieku-rozwojowym"],
];

export const DISCLAIMER =
  "Kalkulator i dokument mają charakter edukacyjny i szacunkowy. Wynik pochodzi ze wzoru opartego na pomiarach ciała (Moore i in. 2015), którego błąd wynosi ok. ±0,5 roku. Wzór jest mniej dokładny u osób dojrzewających bardzo wcześnie lub bardzo późno. Treści nie są poradą lekarską, medyczną ani dietetyczną i nie zastępują konsultacji z lekarzem, fizjoterapeutą lub dietetykiem. Wartości witamin, składników odżywczych i suplementów to ogólne rekomendacje oparte na wytycznych i stanowiskach naukowych. Dawkowanie suplementów warto skonsultować z lekarzem, najlepiej po badaniu krwi. Ćwiczenia wykonuj z zachowaniem prawidłowej techniki, najlepiej pod okiem trenera. W razie bólu, który nie mija, utykania, obrzęku lub bólu nocnego skontaktuj się z lekarzem. SportSpacePro nie zapisuje ani nie przetwarza danych wpisanych do kalkulatora.";

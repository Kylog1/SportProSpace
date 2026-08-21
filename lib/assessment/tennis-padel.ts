// Tennis & Padel Self-Audit configuration.
// 18 questions across 6 categories, scored 0-100. See lib/assessment/types.ts
// for the shared engine this plugs into. Structure mirrors lib/assessment/fitness.ts.

import {
  SHARED_SCALE,
  type SportConfig,
  type CategoryDef,
  type QuestionDef,
  type MaturityLevel,
} from "./types";

export type TennisPadelCategoryId =
  | "attract"
  | "activate"
  | "engage"
  | "retain"
  | "expand"
  | "insight";

const categories: CategoryDef<TennisPadelCategoryId>[] = [
  {
    id: "attract",
    label: "ATTRACT",
    short: "Pozyskanie i pierwsze doświadczenie",
    opportunity:
      "Największą szansą jest uporządkowanie doświadczenia od pierwszego kontaktu aż do pierwszej rezerwacji lub rozpoczęcia członkostwa.",
  },
  {
    id: "activate",
    label: "ACTIVATE",
    short: "Pierwsze 30-90 dni",
    opportunity:
      "Największą szansą jest lepsze wdrożenie nowych klientów i monitorowanie ich pierwszych tygodni korzystania z klubu.",
  },
  {
    id: "engage",
    label: "ENGAGE",
    short: "Aktywność obecnych klientów",
    opportunity:
      "Największą szansą jest lepsze wykorzystanie danych o aktywności klientów i wcześniejsze reagowanie na spadek zaangażowania.",
  },
  {
    id: "retain",
    label: "RETAIN",
    short: "Utrzymanie klientów",
    opportunity:
      "Największą szansą jest lepsze rozumienie powodów odejść oraz wcześniejsze identyfikowanie klientów zagrożonych rezygnacją.",
  },
  {
    id: "expand",
    label: "EXPAND",
    short: "Zwiększanie wartości obecnego klienta",
    opportunity:
      "Klub ma przestrzeń do lepszego wykorzystania potencjału obecnych klientów poprzez dopasowanie dodatkowych usług do ich potrzeb i zachowania.",
  },
  {
    id: "insight",
    label: "INSIGHT",
    short: "Feedback i decyzje",
    opportunity:
      "Największą szansą jest przełożenie feedbacku i danych od klientów na konkretne decyzje i działania.",
  },
];

const questions: QuestionDef<TennisPadelCategoryId>[] = [
  // 1. ATTRACT
  {
    id: "at1",
    category: "attract",
    text: "Czy proces od pierwszego kontaktu potencjalnego klienta do pierwszej rezerwacji lub zakupu członkostwa jest jasno określony i spójny?",
  },
  {
    id: "at2",
    category: "attract",
    text: "Czy klub regularnie analizuje, dlaczego potencjalni klienci wybierają lub nie wybierają Waszego klubu?",
  },
  {
    id: "at3",
    category: "attract",
    text: "Czy pierwsze doświadczenie nowego klienta odpowiada standardowi, jaki chcecie reprezentować?",
  },
  // 2. ACTIVATE
  {
    id: "ac1",
    category: "activate",
    text: "Czy każdy nowy klient przechodzi zaplanowany proces wdrożenia, który pomaga mu zacząć regularnie korzystać z klubu?",
  },
  {
    id: "ac2",
    category: "activate",
    text: "Czy monitorujecie, jak często nowi klienci rezerwują korty lub uczestniczą w zajęciach w pierwszych 30-90 dniach?",
  },
  {
    id: "ac3",
    category: "activate",
    text: "Czy reagujecie, gdy nowy klient nie zaczyna regularnie korzystać z klubu?",
  },
  // 3. ENGAGE
  {
    id: "en1",
    category: "engage",
    text: "Czy regularnie monitorujecie częstotliwość korzystania z kortów, zajęć lub innych aktywności przez klientów?",
  },
  {
    id: "en2",
    category: "engage",
    text: "Czy potraficie zidentyfikować klientów, których aktywność zaczyna wyraźnie spadać?",
  },
  {
    id: "en3",
    category: "engage",
    text: "Czy macie określony sposób reagowania na spadek aktywności klienta?",
  },
  // 4. RETAIN
  {
    id: "re1",
    category: "retain",
    text: "Czy regularnie analizujecie, dlaczego klienci przestają korzystać z klubu lub rezygnują z członkostwa?",
  },
  {
    id: "re2",
    category: "retain",
    text: "Czy potraficie wskazać klientów najbardziej narażonych na odejście lub zaprzestanie korzystania z klubu?",
  },
  {
    id: "re3",
    category: "retain",
    text: "Czy podejmujecie konkretne działania, aby zatrzymać lub reaktywować klientów zagrożonych odejściem?",
  },
  // 5. EXPAND
  {
    id: "ex1",
    category: "expand",
    text: "Czy znacie średnią wartość klienta w całym okresie jego relacji z klubem?",
  },
  {
    id: "ex2",
    category: "expand",
    text: "Czy analizujecie, z jakich dodatkowych usług korzystają najbardziej wartościowi klienci?",
  },
  {
    id: "ex3",
    category: "expand",
    text: "Czy aktywnym klientom proponujecie dodatkowe usługi dopasowane do ich potrzeb i zachowania?",
  },
  // 6. INSIGHT
  {
    id: "in1",
    category: "insight",
    text: "Czy regularnie zbieracie uporządkowany feedback od klientów?",
  },
  {
    id: "in2",
    category: "insight",
    text: "Czy wyniki feedbacku są analizowane i przekładane na konkretne decyzje?",
  },
  {
    id: "in3",
    category: "insight",
    text: "Czy sprawdzacie, czy wdrożone działania rzeczywiście poprawiły doświadczenie lub zachowanie klientów?",
  },
];

// Identical model to lib/assessment/fitness.ts, same ids, ranges and descriptions.
const levels: MaturityLevel[] = [
  {
    id: "reaktywny",
    name: "REAKTYWNY",
    range: [0, 20],
    description:
      "Działania zależą głównie od pojedynczych osób i bieżących problemów.",
  },
  {
    id: "podstawowy",
    name: "PODSTAWOWY",
    range: [21, 40],
    description:
      "Pierwsze procesy istnieją, ale nie są jeszcze spójne ani powtarzalne.",
  },
  {
    id: "rozwijajacy",
    name: "ROZWIJAJĄCY SIĘ",
    range: [41, 60],
    description:
      "Klub ma podstawy, ale w kluczowych obszarach występują istotne luki.",
  },
  {
    id: "zarzadzany",
    name: "ZARZĄDZANY",
    range: [61, 80],
    description: "Procesy są uporządkowane i w dużej mierze mierzalne.",
  },
  {
    id: "dojrzaly",
    name: "DOJRZAŁY",
    range: [81, 100],
    description:
      "Decyzje są systematycznie oparte na danych, a działania są regularnie optymalizowane.",
  },
];

export const TENNIS_PADEL_CONFIG: SportConfig<TennisPadelCategoryId> = {
  id: "tennis-padel",
  label: "Tenis i padel",
  scoreLabel: "Tennis & Padel Growth Score",
  categories,
  questions,
  levels,
  scale: SHARED_SCALE,
};

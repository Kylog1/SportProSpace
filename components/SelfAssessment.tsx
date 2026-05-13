"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  TrendingDown,
  Users,
  MessageSquare,
  Award,
  Building2,
  CheckCircle2,
  Calculator,
  Download,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ──────────────────────────────────────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────────────────────────────────────

type SectionId = "retention" | "communication" | "experience" | "organization";

type Question = {
  id: string;
  section: SectionId;
  text: string;
  hint?: string;
};

const SECTIONS: {
  id: SectionId;
  label: string;
  short: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "retention", label: "Retention Risk", short: "Ryzyko odejść", icon: TrendingDown },
  { id: "communication", label: "Parent & Player Communication", short: "Komunikacja", icon: MessageSquare },
  { id: "experience", label: "Player Experience & Development", short: "Doświadczenie zawodnika", icon: Award },
  { id: "organization", label: "Organization & Culture", short: "Organizacja i kultura", icon: Building2 },
];

const QUESTIONS: Question[] = [
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
    text: "Mamy spisaną procedurę rozwiązywania konfliktów (rodzic–trener, trener–trener, zawodnik–trener) - wszyscy wiedzą, do kogo i jak eskalować.",
    hint: "Brak procedury = konflikt trafia na social media zanim trafi do prezesa.",
  },
  {
    id: "o3",
    section: "organization",
    text: "Decyzje sportowe i organizacyjne opieramy na danych (frekwencja, retencja, feedback) - a nie tylko na intuicji właściciela lub głównego trenera.",
    hint: "Intuicja działa, ale tylko do pewnej skali. Potem zaczyna kosztować.",
  },
];

const SCALE: { value: number; label: string; sub: string }[] = [
  { value: 1, label: "Nie", sub: "Nie mamy tego w ogóle" },
  { value: 2, label: "Raczej nie", sub: "Pojedyncze próby, bez systemu" },
  { value: 3, label: "Częściowo", sub: "Działa w niektórych grupach" },
  { value: 4, label: "W większości", sub: "Działa, ale z lukami" },
  { value: 5, label: "W pełni", sub: "Standard, mierzalny, powtarzalny" },
];

type LevelId = "chaos" | "reactive" | "developing" | "high";

type Level = {
  id: LevelId;
  name: string;
  range: [number, number];
  short: string;
  description: string;
  risks: string[];
  problems: string[];
  consequences: string[];
  accent: string; // tailwind classes
  expectedChurn: string;
};

const LEVELS: Level[] = [
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
      "25–40% odejść rocznie - bez świadomości skali",
      "Stała utrata przychodu na poziomie kilkudziesięciu do kilkuset tysięcy zł rocznie",
      "Rosnący koszt pozyskania zawodnika (trzeba 'łatać dziury')",
      "Reputacja klubu: 'nie wiadomo, co się tam dzieje'",
    ],
    accent: "bg-red-50 border-red-200 text-red-900",
    expectedChurn: "25–40%",
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
      "15–25% odejść rocznie",
      "Wzrost kosztów pozyskania zawodnika - wciąż łatacie",
      "Wzrost organiczny zatrzymuje się przy 2–3 lokalizacjach",
      "Ryzyko utraty kluczowego trenera = utrata 8–22 zawodników",
    ],
    accent: "bg-amber-50 border-amber-200 text-amber-900",
    expectedChurn: "15–25%",
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
      "8–15% odejść rocznie",
      "Stabilna baza, ale ograniczony wzrost organiczny",
      "Trudność w przyciąganiu najlepszych trenerów (bez wyraźnego employer brandu)",
      "Klub odporny na pojedyncze problemy, wrażliwy na nakładające się ryzyka",
    ],
    accent: "bg-blue-50 border-blue-200 text-blue-900",
    expectedChurn: "8–15%",
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
      "CLV zawodnika nawet 3× wyższy niż w Chaos Mode",
      "Klub przyciąga najlepszych trenerów - bez aktywnej rekrutacji",
      "Realna możliwość premium pricingu i skalowania na nowe lokalizacje",
    ],
    accent: "bg-emerald-50 border-emerald-200 text-emerald-900",
    expectedChurn: "<8%",
  },
];

// Insighty, które mają "boleć"
const INSIGHTS: Record<LevelId, string[]> = {
  chaos: [
    "Każdy zawodnik, który odszedł, zabrał ze sobą 12–36 miesięcy przychodu. Nikt z Waszego zarządu nie wie dokładnie ile.",
    "Trener, który odejdzie z Waszego klubu, zabierze od 8 do 22 zawodników. Bo to oni byli przywiązani do niego, nie do Was.",
    "70% odejść jest poprzedzonych sygnałami widocznymi 60–90 dni wcześniej. Tylko nikt ich u Was nie zbierał.",
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

// ──────────────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────────────

function getLevel(total: number): Level {
  return LEVELS.find((l) => total >= l.range[0] && total <= l.range[1]) ?? LEVELS[0];
}

function sectionScore(answers: Record<string, number>, section: SectionId) {
  const qs = QUESTIONS.filter((q) => q.section === section);
  const answered = qs.filter((q) => answers[q.id] != null);
  if (answered.length === 0) return { score: 0, max: qs.length * 5, pct: 0 };
  const score = answered.reduce((acc, q) => acc + (answers[q.id] || 0), 0);
  const max = qs.length * 5;
  return { score, max, pct: Math.round((score / max) * 100) };
}

function topRisks(answers: Record<string, number>): Question[] {
  return [...QUESTIONS]
    .filter((q) => answers[q.id] != null)
    .sort((a, b) => (answers[a.id] || 0) - (answers[b.id] || 0))
    .slice(0, 3);
}

// ──────────────────────────────────────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────────────────────────────────────

type Step = "intro" | "quiz" | "results";

export function SelfAssessment() {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQ, setCurrentQ] = useState(0);

  const totalAnswered = Object.keys(answers).length;
  const total = useMemo(
    () => Object.values(answers).reduce((a, b) => a + b, 0),
    [answers]
  );
  const level = getLevel(total || 12);
  const progress = Math.round((totalAnswered / QUESTIONS.length) * 100);

  function setAnswer(qid: string, value: number) {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }

  function next() {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((i) => i + 1);
    } else {
      setStep("results");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }

  function prev() {
    if (currentQ > 0) setCurrentQ((i) => i - 1);
  }

  function reset() {
    setAnswers({});
    setCurrentQ(0);
    setStep("intro");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <>
      {step === "intro" && <IntroBlock onStart={() => setStep("quiz")} />}

      {step === "quiz" && (
        <QuizBlock
          currentQ={currentQ}
          answers={answers}
          progress={progress}
          onAnswer={setAnswer}
          onNext={next}
          onPrev={prev}
        />
      )}

      {step === "results" && (
        <ResultsBlock
          answers={answers}
          total={total}
          level={level}
          onReset={reset}
        />
      )}
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// INTRO
// ──────────────────────────────────────────────────────────────────────────────

function IntroBlock({ onStart }: { onStart: () => void }) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-navy-100 bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-bg mask-fade-bottom opacity-60"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute - right-40 - top-40 h-[500px] w-[500px] rounded-full bg-navy-100/50 blur-3xl"
        />

        <div className="container relative py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <Badge variant="soft" className="mb-5 gap-1.5 px-3 py-1">
              <ShieldCheck className="size-3.5" />
              Self Assessment dla klubów i akademii
            </Badge>

            <h1 className="text-balance text-[36px] font-semibold leading-[1.05] tracking-tightest text-navy-950 sm:text-[44px] lg:text-[52px]">
              Sprawdź, ilu zawodników stracicie w tym sezonie -{" "}
              <span className="text-navy-800">zanim odejdą.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
              12 pytań o procesy, nie o opinie. W 2 minuty pokazuje, gdzie Wasz
              klub realnie traci zawodników, rodziców i pieniądze - z perspektywy
              zarządu. To pierwszy krok, zanim zapytacie rodziców, zawodników
              i trenerów, jak wygląda to z ich strony.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" onClick={onStart}>
                Rozpocznij assessment
                <ArrowRight />
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#calculator">Najpierw policz, ile tracicie</Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-navy-800" />
                12 pytań, ~2 minuty
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-navy-800" />
                Wynik + 4 poziomy dojrzałości
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-navy-800" />
                Kalkulator strat z odejść
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Kalkulator Dziurawego Wiadra */}
      <section id="calculator" className="border-b border-navy-100 bg-navy-50/40">
        <div className="container py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700">
              Krok 0 - The Hook
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl">
              Kalkulator Dziurawego Wiadra
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">
              Zanim odpowiesz na 12 pytań - odpowiedz na jedno. Ilu zawodników
              odeszło z Was w zeszłym sezonie i ile to dla Was kosztowało.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <LeakyBucketCalculator embedded />
          </div>

          <div className="mx-auto mt-8 max-w-3xl text-center">
            <p className="text-[15px] leading-relaxed text-navy-800">
              Teraz pytanie nie brzmi: <em>czy macie problem</em>. Pytanie
              brzmi: <strong>gdzie dokładnie wycieka i kto za to odpowiada.</strong>
              <br />
              Na to odpowie Self Assessment.
            </p>
            <Button size="lg" onClick={onStart} className="mt-6">
              Przejdź do assessmentu
              <ArrowRight />
            </Button>
          </div>
        </div>
      </section>

      {/* Two complementary perspectives */}
      <section className="border-b border-navy-100 bg-white">
        <div className="container py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700">
              Dwie perspektywy. Obie potrzebne.
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950">
              Self Assessment to <em className="not-italic text-navy-800">Wy o sobie.</em>
              <br />
              Badanie satysfakcji to <em className="not-italic text-navy-800">oni o Was.</em>
            </h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
              Self Assessment, który właśnie wypełnisz, pokazuje obraz klubu
              z perspektywy zarządu i sztabu. To Wasze hipotezy o ryzykach.
              Badanie satysfakcji weryfikuje te hipotezy u rodziców, zawodników
              i trenerów - czyli u tych, dla których prowadzicie klub.
              Razem dają pełen obraz. Osobno - tylko połowę.
            </p>

            <div className="mt-10 space-y-4">
              <ComparePair
                topic="Komunikacja z rodzicami"
                leftQ={`Macie jeden oficjalny kanał komunikacji z rodzicami i zdefiniowany czas odpowiedzi?`}
                leftWhy={`Pokazuje, czy w ogóle macie procedurę. Odpowiada na to zarząd.`}
                rightQ={`Czy informacje z klubu docierają do Was na czas i w sposób, który jest dla Was wygodny?`}
                rightWhy={`Pokazuje, czy ta procedura działa w praktyce - z perspektywy odbiorcy. Odpowiadają rodzice.`}
              />
              <ComparePair
                topic="Praca trenerów"
                leftQ={`Czy nowy trener przechodzi formalny onboarding zanim samodzielnie poprowadzi grupę?`}
                leftWhy={`Pokazuje, czy klub jest odporny na rotację kadry. Odpowiada zarząd.`}
                rightQ={`Jak oceniacie wsparcie, które otrzymaliście w pierwszych 3 miesiącach pracy w klubie?`}
                rightWhy={`Pokazuje, jak onboarding wygląda w odbiorze trenera. Odpowiadają trenerzy.`}
              />
              <ComparePair
                topic="Rozwój zawodnika"
                leftQ={`Czy każdy zawodnik ma indywidualny plan rozwoju z miernikami postępu?`}
                leftWhy={`Pokazuje, czy macie czym pokazać postęp. Odpowiada sztab szkoleniowy.`}
                rightQ={`Czy wiesz, nad czym konkretnie pracujesz w tym sezonie i jak mierzysz swój postęp?`}
                rightWhy={`Pokazuje, czy ten plan dotarł do zawodnika - czy istnieje tylko w teczce trenera. Odpowiadają zawodnicy.`}
              />
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-navy-100 bg-navy-50/40 p-6">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-navy-700">
                  Self Assessment (ten kwestionariusz)
                </div>
                <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-navy-900">
                  <li>· 12 pytań, 2 minuty</li>
                  <li>· Wypełnia zarząd / właściciel / główny trener</li>
                  <li>· Pokazuje, czego brakuje w procesach</li>
                  <li>· Bez kosztów, do wielokrotnego użycia</li>
                </ul>
              </div>
              <div className="rounded-xl border border-navy-800 bg-navy-950 p-6 text-white">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-navy-300">
                  Badanie satysfakcji (to, co robimy)
                </div>
                <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-white">
                  <li>· Niezależne ankiety rodziców, zawodników, trenerów</li>
                  <li>· Pełna metodologia + raport + rekomendacje</li>
                  <li>· Mówi, co naprawdę myślą i czują Wasi odbiorcy</li>
                  <li>· To, czego Self Assessment nie potrafi zobaczyć</li>
                </ul>
              </div>
            </div>

            <p className="mt-8 text-center text-[15px] leading-relaxed text-navy-900">
              Najpierw Self Assessment - żeby wiedzieć, <strong>czego szukać</strong>.<br />
              Potem badanie - żeby wiedzieć, <strong>jak to wygląda naprawdę</strong>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function ComparePair({
  topic,
  leftQ,
  leftWhy,
  rightQ,
  rightWhy,
}: {
  topic: string;
  leftQ: string;
  leftWhy: string;
  rightQ: string;
  rightWhy: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-navy-100 bg-white">
      <div className="border-b border-navy-100 bg-navy-50/60 px-5 py-2.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-700">
          Temat: {topic}
        </span>
      </div>
      <div className="grid divide-y divide-navy-100 md:grid-cols-2 md:divide-x md:divide-y-0">
        {/* LEFT - Self Assessment */}
        <div className="p-5 sm:p-6">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy-800">
            <span className="size-1.5 rounded-full bg-navy-800" />
            Self Assessment · pyta zarząd
          </div>
          <p className="text-[14.5px] font-medium leading-snug text-navy-950">
            {leftQ}
          </p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
            {leftWhy}
          </p>
        </div>
        {/* RIGHT - Survey */}
        <div className="bg-navy-950 p-5 sm:p-6">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-navy-800 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Badanie satysfakcji · pyta odbiorców
          </div>
          <p className="text-[14.5px] font-medium leading-snug text-white">
            {rightQ}
          </p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-navy-300">
            {rightWhy}
          </p>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// QUIZ
// ──────────────────────────────────────────────────────────────────────────────

function QuizBlock({
  currentQ,
  answers,
  progress,
  onAnswer,
  onNext,
  onPrev,
}: {
  currentQ: number;
  answers: Record<string, number>;
  progress: number;
  onAnswer: (qid: string, v: number) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const q = QUESTIONS[currentQ];
  const section = SECTIONS.find((s) => s.id === q.section)!;
  const SectionIcon = section.icon;
  const value = answers[q.id];

  return (
    <section className="border-b border-navy-100 bg-navy-50/40">
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Progress + section pill */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-3 py-1.5">
              <SectionIcon className="size-3.5 text-navy-800" />
              <span className="text-[12px] font-medium text-navy-900">
                Sekcja {SECTIONS.findIndex((s) => s.id === q.section) + 1}/4 ·{" "}
                {section.label}
              </span>
            </div>
            <div className="text-[12px] font-medium text-muted-foreground">
              Pytanie {currentQ + 1} z {QUESTIONS.length}
            </div>
          </div>

          {/* progress bar */}
          <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-navy-100">
            <div
              className="h-full rounded-full bg-navy-800 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Question card */}
          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.18)] sm:p-8">
            <h2 className="text-balance text-[22px] font-semibold leading-snug tracking-tight text-navy-950 sm:text-[26px]">
              {q.text}
            </h2>
            {q.hint && (
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                {q.hint}
              </p>
            )}

            <div className="mt-7 grid gap-2.5">
              {SCALE.map((opt) => {
                const active = value === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      onAnswer(q.id, opt.value);
                      setTimeout(onNext, 350);
                    }}
                    className={cn(
                      "group flex w-full items-center gap-4 rounded-lg border px-4 py-3 text-left transition-all",
                      active
                        ? "border-navy-800 bg-navy-50/60 shadow-[0_2px_8px_-4px_rgba(30,58,138,0.3)]"
                        : "border-navy-100 bg-white hover:border-navy-300 hover:bg-navy-50/30"
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-full border text-[14px] font-semibold transition-all",
                        active
                          ? "border-navy-800 bg-navy-800 text-white"
                          : "border-navy-200 bg-white text-navy-700 group-hover:border-navy-400"
                      )}
                    >
                      {opt.value}
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-medium text-navy-950">
                        {opt.label}
                      </div>
                      <div className="text-[12.5px] text-muted-foreground">
                        {opt.sub}
                      </div>
                    </div>
                    {active && (
                      <CheckCircle2 className="size-5 text-navy-800" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nav */}
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={onPrev}
              disabled={currentQ === 0}
            >
              <ArrowLeft />
              Wstecz
            </Button>
            <p className="text-[12px] text-muted-foreground">
              Kliknij odpowiedź, aby przejść dalej
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// RESULTS
// ──────────────────────────────────────────────────────────────────────────────

function ResultsBlock({
  answers,
  total,
  level,
  onReset,
}: {
  answers: Record<string, number>;
  total: number;
  level: Level;
  onReset: () => void;
}) {
  const insights = INSIGHTS[level.id];
  const risks = topRisks(answers);
  const overallPct = Math.round((total / 60) * 100);

  return (
    <>
      {/* Header */}
      <section className="border-b border-navy-100 bg-white">
        <div className="container py-12 md:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Badge variant="soft" className="gap-1.5 px-3 py-1">
                <CheckCircle2 className="size-3.5" />
                Wynik gotowy
              </Badge>
              <Button variant="ghost" size="sm" onClick={onReset}>
                <RefreshCw />
                Wypełnij ponownie
              </Button>
            </div>

            <h1 className="mt-5 text-balance text-[34px] font-semibold leading-[1.08] tracking-tightest text-navy-950 sm:text-[42px]">
              Wasz klub: <span className="text-navy-800">{level.name}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
              {level.description}
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="border-b border-navy-100 bg-navy-50/40">
        <div className="container py-12 md:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-5 lg:grid-cols-3">
              {/* Gauge */}
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)]">
                <div className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Wynik ogólny
                </div>
                <Gauge value={total} max={60} pct={overallPct} />
                <div className="mt-3 text-center text-[13px] text-muted-foreground">
                  Oczekiwany churn na tym poziomie:{" "}
                  <span className="font-semibold text-navy-900">
                    {level.expectedChurn}
                  </span>{" "}
                  rocznie
                </div>
              </div>

              {/* Section bars */}
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] lg:col-span-2">
                <div className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Wynik wg sekcji
                </div>
                <div className="mt-4 space-y-4">
                  {SECTIONS.map((s) => {
                    const { score, max, pct } = sectionScore(answers, s.id);
                    const Icon = s.icon;
                    return (
                      <div key={s.id}>
                        <div className="mb-1.5 flex items-center justify-between text-[13px]">
                          <span className="inline-flex items-center gap-2 text-navy-900">
                            <Icon className="size-3.5 text-navy-700" />
                            {s.label}
                          </span>
                          <span className="text-muted-foreground">
                            {score}/{max} · {pct}%
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-navy-50">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              pct < 50
                                ? "bg-red-500"
                                : pct < 70
                                ? "bg-amber-500"
                                : pct < 85
                                ? "bg-blue-600"
                                : "bg-emerald-600"
                            )}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Level details */}
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <DetailCard title="Ryzyka na tym poziomie" items={level.risks} accent="risk" />
              <DetailCard title="Typowe problemy" items={level.problems} accent="problem" />
              <DetailCard title="Konsekwencje biznesowe" items={level.consequences} accent="biz" />
            </div>

            {/* Top 3 weakest */}
            <div className="mt-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-8">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-4 text-red-600" />
                <h3 className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Top 3 obszary do natychmiastowej pracy
                </h3>
              </div>
              <ul className="mt-4 space-y-3">
                {risks.map((q, i) => {
                  const s = SECTIONS.find((x) => x.id === q.section)!;
                  return (
                    <li
                      key={q.id}
                      className="flex items-start gap-4 rounded-lg border border-navy-100 bg-navy-50/40 p-4"
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-[13px] font-semibold text-white">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {s.label} · ocena {answers[q.id]}/5
                        </div>
                        <div className="mt-1 text-[14.5px] font-medium leading-snug text-navy-950">
                          {q.text}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Insights -"bolące" */}
            <div className="mt-5 rounded-2xl border border-navy-900 bg-navy-950 p-6 text-white sm:p-8">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-navy-300">
                3 rzeczy, które warto przeczytać dwa razy
              </div>
              <ul className="mt-4 space-y-4">
                {insights.map((ins, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 text-[14px] font-semibold text-navy-300">
                      0{i + 1}
                    </span>
                    <p className="text-[15.5px] leading-relaxed text-white">
                      {ins}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Powiązany kalkulator */}
      <section className="border-b border-navy-100 bg-white">
        <div className="container py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700">
              Twój wynik × Twoje pieniądze
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950">
              Policz, ile kosztuje Was poziom {level.name}.
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">
              Kalkulator zakłada Wasz oczekiwany churn (
              <strong>{level.expectedChurn}</strong>) - możesz go nadpisać
              własną liczbą odejść z zeszłego sezonu.
            </p>

            <div className="mt-8">
              <LeakyBucketCalculator suggestedLevel={level} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950">
        <div className="container py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-[32px] font-semibold leading-tight tracking-tight text-white sm:text-[40px]">
              Znacie już swoje hipotezy.
              <br />
              <span className="text-navy-300">
                Czas sprawdzić, co o klubie myślą rodzice, zawodnicy i trenerzy.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-navy-200">
              Badanie satysfakcji to ustrukturyzowane, niezależne ankiety
              wśród Waszych odbiorców + analiza wyników na tle benchmarków.
              Tam, gdzie Self Assessment kończy listę pytań, badanie zaczyna
              dostarczać konkretne odpowiedzi.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-white text-navy-950 hover:bg-navy-100">
                <Link href="/#contact">
                  Zamów badanie satysfakcji
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-navy-700 bg-transparent text-white hover:border-white hover:text-white hover:bg-navy-900"
              >
                <Link href="/#how-we-help">Zobacz, jak prowadzimy badania</Link>
              </Button>
            </div>
            <p className="mt-6 text-[13px] text-navy-300">
              Otrzymasz na maila raport PDF z Twojego Self Assessmentu wraz z
              propozycją zakresu badania dopasowanego do wyniku.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Gauge({ value, max, pct }: { value: number; max: number; pct: number }) {
  const size = 160;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  const color =
    pct < 40
      ? "stroke-red-500"
      : pct < 60
      ? "stroke-amber-500"
      : pct < 80
      ? "stroke-blue-600"
      : "stroke-emerald-600";

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            strokeWidth={stroke}
            className="fill-none stroke-navy-100"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            className={cn("fill-none transition-all duration-700", color)}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[28px] font-semibold leading-none tracking-tight text-navy-950">
            {value}
            <span className="text-[14px] font-medium text-muted-foreground">
              /{max}
            </span>
          </div>
          <div className="mt-1 text-[12px] font-medium text-muted-foreground">
            {pct}%
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailCard({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent: "risk" | "problem" | "biz";
}) {
  const dot =
    accent === "risk"
      ? "bg-red-500"
      : accent === "problem"
      ? "bg-amber-500"
      : "bg-navy-800";
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)]">
      <h3 className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed text-navy-900">
            <span className={cn("mt-2 size-1.5 shrink-0 rounded-full", dot)} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// LEAKY BUCKET CALCULATOR
// ──────────────────────────────────────────────────────────────────────────────

function LeakyBucketCalculator({
  embedded = false,
  suggestedLevel,
}: {
  embedded?: boolean;
  suggestedLevel?: Level;
}) {
  const [fee, setFee] = useState(250);
  const [left, setLeft] = useState(20);
  const [months, setMonths] = useState(10);

  const annualLoss = fee * left * months;
  const saveHalf = Math.round(annualLoss / 2);

  return (
    <div
      className={cn(
        "rounded-2xl border bg-white p-6 sm:p-8",
        embedded
          ? "border-navy-100 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)]"
          : "border-navy-100 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)]"
      )}
    >
      <div className="flex items-center gap-2">
        <Calculator className="size-4 text-navy-800" />
        <h3 className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
          Kalkulator strat z odejść
        </h3>
      </div>

      <div className="mt-6 grid items-end gap-5 sm:grid-cols-3">
        <Field
          label="Czesne miesięczne (zł)"
          value={fee}
          onChange={setFee}
          min={0}
          step={50}
        />
        <Field
          label="Odeszło w zeszłym sezonie (os.)"
          value={left}
          onChange={setLeft}
          min={0}
          step={1}
        />
        <Field
          label="Długość sezonu (mies.)"
          value={months}
          onChange={setMonths}
          min={1}
          max={12}
          step={1}
        />
      </div>

      {suggestedLevel && (
        <button
          type="button"
          onClick={() => {
            // map expected churn % to a rough number of leavers per 100-osobowy klub
            const map: Record<LevelId, number> = {
              chaos: 32,
              reactive: 20,
              developing: 11,
              high: 6,
            };
            setLeft(map[suggestedLevel.id]);
          }}
          className="mt-4 inline-flex items-center gap-2 text-[12.5px] font-medium text-navy-700 underline-offset-2 hover:text-navy-900 hover:underline"
        >
          Wstaw oczekiwaną liczbę przy poziomie {suggestedLevel.name} (zakładając ~100-osobowy klub)
        </button>
      )}

      <div className="mt-6 grid gap-4 rounded-xl border border-navy-100 bg-navy-50/60 p-5 sm:grid-cols-2">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Roczna strata przychodu
          </div>
          <div className="mt-1 text-[34px] font-semibold leading-none tracking-tight text-navy-950">
            {formatPLN(annualLoss)}
          </div>
          <div className="mt-1 text-[12px] text-muted-foreground">
            = {fee} zł × {left} osób × {months} mies.
          </div>
        </div>
        <div className="border-t border-navy-100 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Gdybyście zatrzymali tylko połowę z nich
          </div>
          <div className="mt-1 text-[34px] font-semibold leading-none tracking-tight text-navy-800">
            +{formatPLN(saveHalf)}
          </div>
          <div className="mt-1 text-[12px] text-muted-foreground">
            zostaje w klubie w przyszłym sezonie
          </div>
        </div>
      </div>

      {embedded && (
        <p className="mt-5 text-[14px] leading-relaxed text-navy-800">
          To liczba, której zwykle nikt w zarządzie nie wypowiada na głos.
          Self Assessment pokazuje, <strong>gdzie dokładnie</strong> ta woda wycieka.
        </p>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <label className="flex h-full flex-col">
      <span className="min-h-[2.6em] text-[12px] font-medium leading-tight text-muted-foreground">
        {label}
      </span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const n = Number(e.target.value);
          onChange(Number.isNaN(n) ? 0 : n);
        }}
        className="mt-auto block w-full rounded-lg border border-navy-200 bg-white px-3.5 py-2.5 text-[16px] font-semibold tracking-tight text-navy-950 outline-none transition-colors focus:border-navy-800 focus:ring-2 focus:ring-navy-800/20"
      />
    </label>
  );
}

function formatPLN(n: number) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(n || 0);
}

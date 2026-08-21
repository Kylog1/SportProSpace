"use client";

import { useMemo, useState, type ComponentType } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Magnet,
  Zap,
  Activity,
  Anchor,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { QuizBlock } from "@/components/assessment/QuizBlock";
import { LeadForm } from "@/components/assessment/LeadForm";
import { ScoreGauge } from "@/components/assessment/ScoreGauge";
import {
  trackSelfAuditStarted,
  trackAuditCompleted,
  trackAuditResultViewed,
  trackLeadSubmitted,
} from "@/lib/analytics";
import {
  TENNIS_PADEL_CONFIG,
  type TennisPadelCategoryId,
} from "@/lib/assessment/tennis-padel";
import {
  overallScore,
  categoryScores,
  getMaturityLevel,
  weakestCategories,
} from "@/lib/assessment/types";

const CALENDLY_URL = "https://calendly.com/grzyb-krzysiek/new-meeting";
const C = TENNIS_PADEL_CONFIG;

type Discipline = "tennis" | "padel";

// Same category concept (Attract/Activate/Engage/Retain/Expand/Insight) as
// Fitness, so the same icon language is reused rather than inventing a
// second one for an identical structure.
const CATEGORY_ICONS: Record<TennisPadelCategoryId, ComponentType<{ className?: string }>> = {
  attract: Magnet,
  activate: Zap,
  engage: Activity,
  retain: Anchor,
  expand: TrendingUp,
  insight: Lightbulb,
};

const GROUPS = C.categories.map((c) => ({
  id: c.id,
  label: c.label,
  icon: CATEGORY_ICONS[c.id],
}));

const QUIZ_QUESTIONS = C.questions.map((q) => ({
  id: q.id,
  group: q.category,
  text: q.text,
}));

type Step = "intro" | "quiz" | "teaser" | "form" | "results";

export function TennisPadelAssessment() {
  const [step, setStep] = useState<Step>("intro");
  const [discipline, setDiscipline] = useState<Discipline>("tennis");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const totalAnswered = Object.keys(answers).length;
  const score = useMemo(() => overallScore(C, answers), [answers]);
  const level = getMaturityLevel(C, score);
  const progress = Math.round((totalAnswered / C.questions.length) * 100);

  function setAnswer(qid: string, value: number) {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }

  function next() {
    if (currentQ < C.questions.length - 1) {
      setCurrentQ((i) => i + 1);
    } else {
      setStep("teaser");
      scrollTop();
    }
  }

  function prev() {
    if (currentQ > 0) setCurrentQ((i) => i - 1);
  }

  function scrollTop() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function reset() {
    setAnswers({});
    setCurrentQ(0);
    setStep("intro");
    setSubmittedEmail(null);
    scrollTop();
  }

  function onFormSuccess(email: string) {
    setSubmittedEmail(email);
    setStep("results");
    trackAuditCompleted(discipline, level.id);
    trackLeadSubmitted(`self-assessment:${discipline}`);
    trackAuditResultViewed(discipline, level.id);
    scrollTop();
  }

  return (
    <>
      {step === "intro" && (
        <IntroBlock
          discipline={discipline}
          onDisciplineChange={setDiscipline}
          onStart={() => {
            trackSelfAuditStarted(discipline);
            setStep("quiz");
          }}
        />
      )}

      {step === "quiz" && (
        <QuizBlock
          questions={QUIZ_QUESTIONS}
          groups={GROUPS}
          scale={C.scale}
          groupNoun="Kategoria"
          currentQ={currentQ}
          answers={answers}
          progress={progress}
          onAnswer={setAnswer}
          onNext={next}
          onPrev={prev}
        />
      )}

      {step === "teaser" && (
        <TeaserBlock
          score={score}
          levelName={level.name}
          onContinue={() => {
            setStep("form");
            scrollTop();
          }}
          onBack={() => {
            setCurrentQ(C.questions.length - 1);
            setStep("quiz");
            scrollTop();
          }}
        />
      )}

      {step === "form" && (
        <LeadForm
          answers={answers}
          questionIds={C.questions.map((q) => q.id)}
          sport={discipline}
          reportDescription="Wynik i pełny raport PDF (Tennis & Padel Growth Score, wyniki 6 obszarów i największe szanse) wyślemy na podany adres email. Po wysłaniu zobaczysz też wynik tutaj, na stronie."
          chipScore={`${score} / 100`}
          chipLevel={level.name}
          onBack={(targetIdx) => {
            if (typeof targetIdx === "number") {
              setCurrentQ(targetIdx);
              setStep("quiz");
            } else {
              setStep("teaser");
            }
            scrollTop();
          }}
          onSuccess={onFormSuccess}
        />
      )}

      {step === "results" && (
        <ResultsBlock
          answers={answers}
          score={score}
          levelName={level.name}
          levelDescription={level.description}
          submittedEmail={submittedEmail}
          onReset={reset}
        />
      )}
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// INTRO
// ──────────────────────────────────────────────────────────────────────────────

function IntroBlock({
  discipline,
  onDisciplineChange,
  onStart,
}: {
  discipline: Discipline;
  onDisciplineChange: (d: Discipline) => void;
  onStart: () => void;
}) {
  return (
    <section className="relative overflow-hidden border-b border-navy-100 bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-bg mask-fade-bottom opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-navy-100/50 blur-3xl"
      />

      <div className="container relative py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <Badge variant="soft" className="mb-5 gap-1.5 px-3 py-1">
            <ShieldCheck className="size-3.5" />
            Self-Audit dla klubów tenisowych i padlowych
          </Badge>

          <h1 className="text-balance text-[36px] font-semibold leading-[1.05] tracking-tightest text-navy-950 sm:text-[44px] lg:text-[52px]">
            Sprawdź, gdzie Wasz klub traci{" "}
            <span className="text-navy-800">potencjał wzrostu.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
            18 pytań o procesy, nie o opinie. W kilka minut pokazuje, jak
            wygląda ścieżka klienta w Waszym klubie - od pierwszej rezerwacji,
            przez pierwsze tygodnie, po rezygnację lub rozwój współpracy.
          </p>

          {/* Discipline toggle, one shared audit, tags the lead as tennis/padel */}
          <div className="mt-6 flex items-center gap-2">
            <span className="text-[13px] font-medium text-muted-foreground">
              Wasz klub to głównie:
            </span>
            <div className="inline-flex rounded-lg border border-navy-200 p-0.5">
              {(["tennis", "padel"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => onDisciplineChange(d)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors",
                    discipline === d
                      ? "bg-navy-800 text-white"
                      : "text-navy-700 hover:bg-navy-50"
                  )}
                >
                  {d === "tennis" ? "Tenis" : "Padel"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" onClick={onStart}>
              Rozpocznij Self-Audit
              <ArrowRight />
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-navy-800" />
              18 pytań, ~5 minut
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-navy-800" />
              Wynik 0-100 + 5 poziomów dojrzałości
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-navy-800" />
              Raport PDF na maila
            </span>
          </div>

          {/* What we look at */}
          <div className="mt-12 border-t border-navy-100 pt-8">
            <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-navy-700">
              Sześć obszarów, które badamy
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {C.categories.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.id];
                return (
                  <div
                    key={cat.id}
                    className="rounded-xl border border-navy-100 bg-white p-4"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-800">
                        <Icon className="size-4" />
                      </div>
                      <span className="text-[13px] font-semibold tracking-wider text-navy-950">
                        {cat.label}
                      </span>
                    </div>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
                      {cat.short}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// TEASER (score visible, category breakdown locked behind the form)
// ──────────────────────────────────────────────────────────────────────────────

function TeaserBlock({
  score,
  levelName,
  onContinue,
  onBack,
}: {
  score: number;
  levelName: string;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <section className="border-b border-navy-100 bg-navy-50/40">
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <Badge variant="soft" className="gap-1.5 px-3 py-1">
              <CheckCircle2 className="size-3.5" />
              Self-Audit ukończony
            </Badge>
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft />
              Wróć do pytań
            </Button>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {/* Left: score */}
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-8">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                {C.scoreLabel}
              </div>
              <ScoreGauge value={score} max={100} pct={score} caption={null} />
              <div className="mt-4 text-center">
                <div className="text-[16px] font-semibold text-navy-800">
                  {levelName}
                </div>
              </div>
              <MaturityScale score={score} />
            </div>

            {/* Right: blurred categories */}
            <div className="relative overflow-hidden rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-8">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                Wynik wg obszarów
              </div>
              <div
                className="pointer-events-none mt-4 select-none space-y-4"
                style={{ filter: "blur(5px)" }}
              >
                {C.categories.map((cat, i) => (
                  <CategoryBar
                    key={cat.id}
                    label={cat.label}
                    icon={CATEGORY_ICONS[cat.id]}
                    score={[72, 58, 44, 66, 81, 60][i]}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
                <div className="mx-6 rounded-xl border border-navy-100 bg-white/95 px-6 py-5 text-center shadow-lg">
                  <div className="text-[14px] font-semibold text-navy-950">
                    Pełne wyniki 6 obszarów w raporcie
                  </div>
                  <div className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                    Podaj adres email, wyślemy raport PDF z wynikiem, Top 3
                    szansami i największym obszarem do poprawy.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <Button size="lg" onClick={onContinue}>
              Odbierz pełny raport PDF
              <ArrowRight />
            </Button>
            <p className="text-[13px] text-muted-foreground">
              Raport wyślemy na Twój email. Podaj adres w następnym kroku.
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
  score,
  levelName,
  levelDescription,
  submittedEmail,
  onReset,
}: {
  answers: Record<string, number>;
  score: number;
  levelName: string;
  levelDescription: string;
  submittedEmail: string | null;
  onReset: () => void;
}) {
  const cats = categoryScores(C, answers);
  const top3 = weakestCategories(C, answers, 3);
  const biggest = top3[0];
  const biggestCopy = C.categories.find((c) => c.id === biggest.id)!.opportunity;

  return (
    <>
      {submittedEmail && (
        <section className="border-b border-emerald-200 bg-emerald-50">
          <div className="container py-4">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 text-[14px] text-emerald-900">
              <CheckCircle2 className="size-5 shrink-0 text-emerald-700" />
              <span>
                Raport PDF wysłany na <strong>{submittedEmail}</strong>. Sprawdź
                skrzynkę (a na wszelki wypadek - również spam).
              </span>
            </div>
          </div>
        </section>
      )}

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
              Wasz poziom dojrzałości:{" "}
              <span className="text-navy-800">{levelName}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
              {levelDescription}
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
                  {C.scoreLabel}
                </div>
                <ScoreGauge value={score} max={100} pct={score} caption={null} />
                <div className="mt-3 text-center text-[13px] text-muted-foreground">
                  Poziom:{" "}
                  <span className="font-semibold text-navy-900">{levelName}</span>
                </div>
                <MaturityScale score={score} />
              </div>

              {/* Category bars */}
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] lg:col-span-2">
                <div className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Wynik wg obszarów
                </div>
                <div className="mt-4 space-y-4">
                  {cats.map((c) => (
                    <CategoryBar
                      key={c.id}
                      label={c.label}
                      icon={CATEGORY_ICONS[c.id as TennisPadelCategoryId]}
                      score={c.score}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Biggest opportunity */}
            <div className="mt-5 rounded-2xl border border-navy-900 bg-navy-950 p-6 text-white sm:p-8">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-navy-300">
                Wasza największa szansa na poprawę
              </div>
              <div className="mt-3 flex flex-wrap items-baseline gap-3">
                <span className="text-[28px] font-semibold tracking-tight text-white">
                  {biggest.label}
                </span>
                <span className="text-[16px] font-medium text-navy-300">
                  {biggest.score}/100
                </span>
              </div>
              <p className="mt-3 max-w-3xl text-[15.5px] leading-relaxed text-white">
                {biggestCopy}
              </p>
            </div>

            {/* Top 3 */}
            <div className="mt-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-8">
              <h3 className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                Wasze Top 3 obszary do poprawy
              </h3>
              <ul className="mt-4 space-y-3">
                {top3.map((c, i) => {
                  const Icon = CATEGORY_ICONS[c.id as TennisPadelCategoryId];
                  return (
                    <li
                      key={c.id}
                      className="flex items-start gap-4 rounded-lg border border-navy-100 bg-navy-50/40 p-4"
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy-800 text-[13px] font-semibold text-white">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="inline-flex items-center gap-2 text-[14.5px] font-semibold tracking-wider text-navy-950">
                            <Icon className="size-3.5 text-navy-700" />
                            {c.label}
                          </span>
                          <span className="text-[13px] text-muted-foreground">
                            {c.score}/100
                          </span>
                        </div>
                        <div className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                          {c.short}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-5 border-t border-navy-100 pt-4 text-[13.5px] leading-relaxed text-muted-foreground">
                Self-Audit pokazuje, <strong className="text-navy-900">gdzie</strong>{" "}
                są luki. Pełna diagnoza, przyczyny i plan działań to zakres
                Growth Audit prowadzonego przez Sport Space Pro.
              </p>
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
                Czas sprawdzić, co o klubie myślą Wasi klienci.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-navy-200">
              Self-Audit pokazuje obraz klubu z perspektywy zarządu. Badanie
              satysfakcji weryfikuje te hipotezy u samych klientów - i pokazuje,
              które z luk realnie kosztują Was przychód.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-white text-navy-950 hover:bg-navy-100">
                <Link href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Umów 30-minutową rozmowę
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-navy-700 bg-transparent text-white hover:border-white hover:text-white hover:bg-navy-900"
              >
                <Link href="/#contact">Napisz do nas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Shared bits
// ──────────────────────────────────────────────────────────────────────────────

function CategoryBar({
  label,
  icon: Icon,
  score,
}: {
  label: string;
  icon: ComponentType<{ className?: string }>;
  score: number;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[13px]">
        <span className="inline-flex items-center gap-2 font-medium tracking-wider text-navy-900">
          <Icon className="size-3.5 text-navy-700" />
          {label}
        </span>
        <span className="text-muted-foreground">{score}/100</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-navy-50">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            score < 40
              ? "bg-red-500"
              : score < 60
              ? "bg-amber-500"
              : score < 80
              ? "bg-blue-600"
              : "bg-emerald-600"
          )}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

const SEG_STYLES = [
  "bg-red-50 border-red-200",
  "bg-amber-50 border-amber-200",
  "bg-orange-50 border-orange-200",
  "bg-blue-50 border-blue-200",
  "bg-emerald-50 border-emerald-200",
];

function MaturityScale({ score }: { score: number }) {
  const idx = C.levels.findIndex(
    (l) => score >= l.range[0] && score <= l.range[1]
  );
  const levelIdx = idx === -1 ? 0 : idx;
  const arrowPct = levelIdx * 20 + 10;

  return (
    <div className="mt-7">
      <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Pozycja na skali dojrzałości
      </div>
      <div className="relative" style={{ paddingTop: "28px" }}>
        <div
          className="absolute top-0 flex flex-col items-center"
          style={{ left: `${arrowPct}%`, transform: "translateX(-50%)" }}
        >
          <span className="text-[12px] font-bold leading-none text-navy-800">
            {score}
          </span>
          <div
            className="mt-1"
            style={{
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "7px solid #1e3a8a",
            }}
          />
        </div>
        <div className="flex overflow-hidden rounded-md">
          {C.levels.map((lvl, i) => (
            <div
              key={lvl.id}
              className={cn(
                "h-8 flex-1 border",
                SEG_STYLES[i],
                i === levelIdx ? "opacity-100" : "opacity-60"
              )}
            />
          ))}
        </div>
      </div>
      <div className="mt-1.5 flex">
        {C.levels.map((lvl, i) => (
          <div key={lvl.id} className="flex-1 text-center">
            <div
              className={cn(
                "text-[9px] font-medium leading-tight",
                i === levelIdx ? "text-navy-900" : "text-muted-foreground"
              )}
            >
              {lvl.name}
            </div>
            <div className="text-[9px] text-muted-foreground/60">
              {lvl.range[0]}-{lvl.range[1]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

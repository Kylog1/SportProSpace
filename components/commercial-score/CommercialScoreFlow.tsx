"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuizBlock } from "@/components/assessment/QuizBlock";
import { ScoreGauge } from "@/components/assessment/ScoreGauge";
import { ContextBlock, type ContextValue } from "./ContextBlock";
import { NumberBlock } from "./NumberBlock";
import {
  CommercialLeadForm,
  type LeadPayload,
} from "./CommercialLeadForm";
import { ScoreDashboard } from "./ScoreDashboard";
import {
  ATHLETE_VIEWS_FIELD,
  scoreSubmission,
  type AudienceValue,
  type CommercialScoreResult,
  type PersonaConfig,
} from "@/lib/commercial-score";

// Step orchestration for both personas. Everything that differs between an
// athlete and an organization arrives through `config`, so this component never
// branches on persona except for copy.

type Step = "intro" | "context" | "quiz" | "audience" | "teaser" | "form" | "results";

export function CommercialScoreFlow({
  config,
}: {
  config: PersonaConfig<string>;
}) {
  const isAthlete = config.id === "athlete";

  const [step, setStep] = useState<Step>("intro");
  const [context, setContext] = useState<ContextValue>({
    discipline: "",
    tier: null,
  });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [audience, setAudience] = useState<Record<string, AudienceValue>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [serverResult, setServerResult] =
    useState<CommercialScoreResult<string> | null>(null);

  // Funnel timings, sent once with the lead. Nothing is stored before consent,
  // so an abandoned run leaves no record - only the anonymous page view Vercel
  // already counts.
  const startedAt = useRef<string | null>(null);

  const quizQuestions = useMemo(
    () =>
      config.questions.map((q) => ({
        id: q.id,
        group: q.category,
        text: q.text,
        hint: q.hint,
        options: q.options.map((o) => ({
          value: o.value,
          label: o.label,
          sub: o.sub ?? "",
        })),
      })),
    [config]
  );

  const groups = useMemo(
    () =>
      config.categories
        .filter((c) => c.kind === "qualitative")
        .map((c) => ({ id: c.id, label: c.label, icon: BarChart3 })),
    [config]
  );

  // Scored on the client for instant feedback; the server recomputes from the
  // same raw inputs on submit and that result is what gets stored and shown.
  const localResult = useMemo(
    () => scoreSubmission(config, { answers, audience, tier: context.tier }),
    [config, answers, audience, context.tier]
  );

  const result = serverResult ?? localResult;
  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / config.questions.length) * 100);

  function scrollTop() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function go(next: Step) {
    setStep(next);
    scrollTop();
  }

  function setAnswer(qid: string, value: number) {
    if (!startedAt.current) startedAt.current = new Date().toISOString();
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }

  function nextQuestion() {
    if (currentQ < config.questions.length - 1) {
      setCurrentQ((i) => i + 1);
    } else {
      go("audience");
    }
  }

  function reset() {
    setContext({ discipline: "", tier: null });
    setAnswers({});
    setAudience({});
    setCurrentQ(0);
    setServerResult(null);
    setSubmittedEmail(null);
    setSubmissionId(null);
    setError(null);
    startedAt.current = null;
    go("intro");
  }

  async function submitLead(lead: LeadPayload) {
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/commercial-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          persona: config.id,
          context,
          answers,
          audience,
          lead,
          funnel: {
            startedAt: startedAt.current,
            completedAt: new Date().toISOString(),
          },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Nie udało się zapisać wyniku. Spróbuj ponownie.");
        setSubmitting(false);
        return;
      }
      if (data.result) setServerResult(data.result);
      if (data.submissionId) setSubmissionId(data.submissionId);
      setSubmittedEmail(lead.email);
      setSubmitting(false);
      go("results");
    } catch {
      setError("Problem z połączeniem. Spróbuj ponownie.");
      setSubmitting(false);
    }
  }

  function onCtaClick(kind: "audit" | "contact") {
    // Fire-and-forget: closes the funnel on the stored record. A failure here
    // must never interfere with the visitor actually reaching the CTA, and a
    // missing id simply means storage was unavailable at submit time.
    if (!submissionId) return;
    void fetch("/api/commercial-score", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submissionId, ctaClicked: kind }),
      keepalive: true,
    }).catch(() => {});
  }

  return (
    <>
      {step === "intro" && (
        <Intro config={config} onStart={() => go("context")} />
      )}

      {step === "context" && (
        <ContextBlock
          persona={config.id}
          value={context}
          onChange={setContext}
          onNext={() => go("quiz")}
          onPrev={() => {
            if (typeof window !== "undefined") {
              window.location.href = "/commercial-score";
            }
          }}
        />
      )}

      {step === "quiz" && (
        <QuizBlock
          questions={quizQuestions}
          groups={groups}
          scale={[]}
          groupNoun="Obszar"
          currentQ={currentQ}
          answers={answers}
          progress={progress}
          onAnswer={setAnswer}
          onNext={nextQuestion}
          onPrev={() => {
            if (currentQ > 0) setCurrentQ((i) => i - 1);
            else go("context");
          }}
        />
      )}

      {step === "audience" && (
        <NumberBlock
          channels={config.channels}
          extraField={isAthlete ? ATHLETE_VIEWS_FIELD : undefined}
          values={audience}
          onChange={(id, v) => setAudience((prev) => ({ ...prev, [id]: v }))}
          onNext={() => go("teaser")}
          onPrev={() => {
            setCurrentQ(config.questions.length - 1);
            go("quiz");
          }}
          title={
            isAthlete
              ? "Twoje zasięgi w liczbach"
              : "Wasze zasięgi i publiczność w liczbach"
          }
          intro={
            isAthlete
              ? "Nie przeliczamy tego wprost na wynik: liczby są normalizowane logarytmicznie i porównywane do poziomu, który wskazałeś. Dzięki temu mniejszy, ale realnie oglądany profil nie przegrywa z dużym i martwym."
              : "Nie przeliczamy tego wprost na wynik: liczby są normalizowane logarytmicznie i porównywane do skali, którą wskazaliście. Dzięki temu klub lokalny i ogólnopolski da się zestawić na jednej skali."
          }
        />
      )}

      {step === "teaser" && (
        <Teaser
          config={config}
          score={result.total}
          levelName={result.level.name}
          onContinue={() => go("form")}
          onBack={() => go("audience")}
        />
      )}

      {step === "form" && (
        <CommercialLeadForm
          persona={config.id}
          chipScore={`${result.total} / 100`}
          chipLevel={result.level.name}
          submitting={submitting}
          error={error}
          onBack={() => go("teaser")}
          onSubmit={submitLead}
        />
      )}

      {step === "results" && (
        <ScoreDashboard
          config={config}
          result={result}
          submittedEmail={submittedEmail}
          onReset={reset}
          onCtaClick={onCtaClick}
        />
      )}
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────────

function Intro({
  config,
  onStart,
}: {
  config: PersonaConfig<string>;
  onStart: () => void;
}) {
  const isAthlete = config.id === "athlete";

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
            {config.scoreLabel}
          </Badge>

          <h1 className="text-balance text-[36px] font-semibold leading-[1.05] tracking-tightest text-navy-950 sm:text-[44px] lg:text-[52px]">
            {isAthlete ? (
              <>
                Sprawdź swój{" "}
                <span className="text-navy-800">potencjał komercyjny.</span>
              </>
            ) : (
              <>
                Sprawdźcie swój{" "}
                <span className="text-navy-800">potencjał sponsorski.</span>
              </>
            )}
          </h1>

          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
            {isAthlete
              ? "15 pytań o to, co realnie masz, plus Twoje zasięgi. W kilka minut zobaczysz, jak wygląda Twoja gotowość do współpracy z markami i który obszar najbardziej Cię hamuje."
              : "15 pytań o Wasze aktywa, ofertę i proces sprzedaży, plus zasięgi i frekwencja. W kilka minut zobaczycie, gdzie leży niewykorzystany potencjał sponsorski."}
          </p>

          <div className="mt-7">
            <Button size="lg" onClick={onStart}>
              {isAthlete ? "Policz swój Athlete Score" : "Policz swój Sponsorship Score"}
              <ArrowRight />
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-navy-800" />
              15 pytań, ok. 4 minuty
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-navy-800" />
              Wynik 0-100 i rozbicie na {config.categories.length} obszarów
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-navy-800" />
              Bezpłatnie
            </span>
          </div>

          <div className="mt-12 border-t border-navy-100 pt-8">
            <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-navy-700">
              Co badamy
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {config.categories.map((cat) => (
                <div
                  key={cat.id}
                  className="rounded-xl border border-navy-100 bg-white p-4"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[13px] font-semibold tracking-wider text-navy-950">
                      {cat.label}
                    </span>
                    <span className="text-[12px] tabular-nums text-muted-foreground">
                      {Math.round(cat.weight * 100)}%
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    {cat.short}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Teaser({
  config,
  score,
  levelName,
  onContinue,
  onBack,
}: {
  config: PersonaConfig<string>;
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
              Wynik policzony
            </Badge>
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft />
              Popraw dane
            </Button>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-8">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                {config.scoreLabel}
              </div>
              <ScoreGauge value={score} max={100} pct={score} caption={null} />
              <div className="mt-4 text-center text-[16px] font-semibold text-navy-800">
                {levelName}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-8">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                Wynik według kategorii
              </div>
              <div
                className="pointer-events-none mt-4 select-none space-y-4"
                style={{ filter: "blur(5px)" }}
                aria-hidden
              >
                {config.categories.map((cat, i) => (
                  <div key={cat.id}>
                    <div className="mb-1.5 flex items-center justify-between text-[13px]">
                      <span className="font-medium tracking-wider text-navy-900">
                        {cat.label}
                      </span>
                      <span className="text-muted-foreground">
                        {[76, 61, 48, 70, 55, 66][i] ?? 60}/100
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-navy-50">
                      <div
                        className="h-full rounded-full bg-navy-800"
                        style={{ width: `${[76, 61, 48, 70, 55, 66][i] ?? 60}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="mx-6 rounded-xl border border-navy-100 bg-white/95 px-6 py-5 text-center shadow-lg">
                  <div className="text-[14px] font-semibold text-navy-950">
                    Rozbicie na {config.categories.length} obszarów czeka
                  </div>
                  <div className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                    Podaj adres email, żeby zobaczyć wynik każdej kategorii,
                    największą szansę i trzy obszary do poprawy.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <Button size="lg" onClick={onContinue}>
              Odblokuj pełny wynik
              <ArrowRight />
            </Button>
            <p className="text-[13px] text-muted-foreground">
              Podsumowanie wyślemy też na maila.{" "}
              <Link
                href="/polityka-prywatnosci"
                className="underline underline-offset-2 hover:text-navy-800"
              >
                Polityka prywatności
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

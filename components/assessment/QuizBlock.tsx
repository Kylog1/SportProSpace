"use client";

import { useEffect, useState, type ComponentType } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Shared question UI for every Self-Audit discipline. The markup here was moved
// verbatim out of components/SelfAssessment.tsx so Football renders exactly as
// before; only the data now arrives through props.

export type QuizGroup = {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

export type QuizQuestion = {
  id: string;
  /** id of the group (Football: section, Fitness: category) this belongs to */
  group: string;
  text: string;
  hint?: string;
  /**
   * Per-question answer options. When omitted the shared `scale` prop is used,
   * so every existing discipline renders exactly as before. Commercial Score
   * sets this because a generic agreement scale invites self-flattery, while
   * options naming what actually exists do not.
   */
  options?: QuizScaleOption[];
};

export type QuizScaleOption = {
  value: number;
  label: string;
  sub: string;
};

export function QuizBlock({
  questions,
  groups,
  scale,
  groupNoun = "Sekcja",
  currentQ,
  answers,
  progress,
  onAnswer,
  onNext,
  onPrev,
}: {
  questions: QuizQuestion[];
  groups: QuizGroup[];
  scale: QuizScaleOption[];
  /** Noun shown before the group counter, e.g. "Sekcja" / "Kategoria". */
  groupNoun?: string;
  currentQ: number;
  answers: Record<string, number>;
  progress: number;
  onAnswer: (qid: string, v: number) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const q = questions[currentQ];
  const group = groups.find((s) => s.id === q.group)!;
  const GroupIcon = group.icon;
  const value = answers[q.id];

  // Prevent double-clicks from queueing two auto-advances, which would
  // skip the next question without recording an answer.
  const [locked, setLocked] = useState(false);
  useEffect(() => {
    setLocked(false);
  }, [currentQ]);

  return (
    <section className="border-b border-navy-100 bg-navy-50/40">
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Progress + group pill */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-3 py-1.5">
              <GroupIcon className="size-3.5 text-navy-800" />
              <span className="text-[12px] font-medium text-navy-900">
                {groupNoun} {groups.findIndex((s) => s.id === q.group) + 1}/
                {groups.length} · {group.label}
              </span>
            </div>
            <div className="text-[12px] font-medium text-muted-foreground">
              Pytanie {currentQ + 1} z {questions.length}
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
              {(q.options ?? scale).map((opt) => {
                const active = value === opt.value;
                return (
                  <button
                    key={opt.value}
                    disabled={locked}
                    onClick={() => {
                      if (locked) return;
                      setLocked(true);
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

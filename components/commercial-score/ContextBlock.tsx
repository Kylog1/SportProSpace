"use client";

import { ArrowLeft, ArrowRight, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LEVEL_TIERS, type LevelTier, type PersonaId } from "@/lib/commercial-score";

// Step 2: the two facts that decide which benchmark the audience numbers are
// scored against.
//
// This comes before the questions rather than after, because the declared level
// is the strongest lever in the whole model - the same club scores 43 on local
// anchors and 21 on national ones. Three easy fields also build commitment more
// cheaply than opening with a diagnostic question.

const DISCIPLINES = [
  "Piłka nożna",
  "Siatkówka",
  "Koszykówka",
  "Piłka ręczna",
  "Tenis",
  "Padel",
  "Lekkoatletyka",
  "Pływanie",
  "Sporty walki",
  "Kolarstwo",
  "Żużel",
  "Esport",
];

export type ContextValue = {
  discipline: string;
  tier: LevelTier | null;
};

export function ContextBlock({
  persona,
  askTier,
  value,
  onChange,
  onNext,
  onPrev,
}: {
  persona: PersonaId;
  /** False when the config derives the tier from an answer instead. */
  askTier: boolean;
  value: ContextValue;
  onChange: (v: ContextValue) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const isAthlete = persona === "athlete";
  const ready =
    value.discipline.trim().length > 1 && (!askTier || value.tier !== null);

  return (
    <section className="border-b border-navy-100 bg-navy-50/40">
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center justify-between">
            <Badge variant="soft" className="gap-1.5 px-3 py-1">
              <Target className="size-3.5" />
              Krok 1 z 3
            </Badge>
            <Button variant="ghost" size="sm" onClick={onPrev}>
              <ArrowLeft />
              Zmień typ
            </Button>
          </div>

          <h2 className="text-balance text-[28px] font-semibold leading-[1.1] tracking-tightest text-navy-950 sm:text-[34px]">
            {isAthlete ? "Zacznijmy od dyscypliny" : "Zacznijmy od kontekstu"}
          </h2>
          <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-muted-foreground">
            {!askTier
              ? "Zaczynamy od dyscypliny. Poziom, do którego Cię porównamy, wynika z Twoich odpowiedzi - nie musisz go deklarować osobno."
              : "Te dwie informacje decydują, do kogo Was porównujemy. 5 000 obserwujących to bardzo dobry wynik dla klubu lokalnego i słaby dla ogólnopolskiego - dlatego pytamy o skalę, zanim policzymy zasięg."}
          </p>

          <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-7">
            <label
              htmlFor="cs-discipline"
              className="text-[14.5px] font-medium text-navy-950"
            >
              Dyscyplina
            </label>
            <input
              id="cs-discipline"
              list="cs-disciplines"
              value={value.discipline}
              onChange={(e) => onChange({ ...value, discipline: e.target.value })}
              placeholder={isAthlete ? "np. Siatkówka" : "np. Piłka nożna"}
              autoComplete="off"
              className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-3.5 py-2.5 text-[16px] text-navy-950 outline-none transition-colors placeholder:text-navy-300 focus:border-navy-800 focus:ring-2 focus:ring-navy-800/20"
            />
            <datalist id="cs-disciplines">
              {DISCIPLINES.map((d) => (
                <option key={d} value={d} />
              ))}
            </datalist>

            {askTier && (
            <div className="mt-7">
              <div className="text-[14.5px] font-medium text-navy-950">
                {isAthlete
                  ? "Na jakim poziomie działasz?"
                  : "W jakiej skali działa Wasza organizacja?"}
              </div>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {LEVEL_TIERS.map((tier) => {
                  const active = value.tier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => onChange({ ...value, tier: tier.id })}
                      className={cn(
                        "rounded-lg border px-4 py-3 text-left transition-all",
                        active
                          ? "border-navy-800 bg-navy-50/60 shadow-[0_2px_8px_-4px_rgba(30,58,138,0.3)]"
                          : "border-navy-100 bg-white hover:border-navy-300 hover:bg-navy-50/30"
                      )}
                    >
                      <div className="text-[15px] font-medium text-navy-950">
                        {tier.label}
                      </div>
                      <div className="mt-0.5 text-[12.5px] leading-snug text-muted-foreground">
                        {tier.hint}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-end">
            <Button size="lg" onClick={onNext} disabled={!ready}>
              Przejdź do pytań
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

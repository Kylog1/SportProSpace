"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScoreGauge } from "@/components/assessment/ScoreGauge";
import {
  LEVEL_TIERS,
  SCORE_LEVELS,
  type CommercialScoreResult,
  type PersonaConfig,
} from "@/lib/commercial-score";

const CALENDLY_URL = "https://calendly.com/grzyb-krzysiek/new-meeting";

const CTA_COPY = {
  athlete: {
    heading: "Zamień swój potencjał na realne współprace z markami.",
    body: "Wynik pokazuje, gdzie jesteś dziś. Athlete Commercial Audit pokazuje, które marki mają sens w Twoim przypadku, ile możesz za to realnie policzyć i jak poprowadzić rozmowę.",
    primary: "Porozmawiaj ze Sport Space Pro",
    secondary: "Napisz do nas",
  },
  organization: {
    heading: "Podnieście swój Sponsorship Score.",
    body: "Sponsorship Audit to pogłębiona analiza Waszych aktywów komercyjnych, potencjału sponsorskiego i możliwości przychodowych - z wyceną pakietów i listą firm, do których warto uderzyć.",
    primary: "Umów Sponsorship Audit",
    secondary: "Napisz do nas",
  },
} as const;

export function ScoreDashboard({
  config,
  result,
  submittedEmail,
  onReset,
  onCtaClick,
}: {
  config: PersonaConfig<string>;
  result: CommercialScoreResult<string>;
  submittedEmail: string | null;
  onReset: () => void;
  onCtaClick: (kind: "audit" | "contact") => void;
}) {
  const cta = CTA_COPY[config.id];
  const totalGain = result.improvements.reduce((a, i) => a + i.gain, 0);
  const tierLabel =
    LEVEL_TIERS.find((t) => t.id === result.tier)?.label ?? null;

  return (
    <>
      {submittedEmail && (
        <section className="border-b border-emerald-200 bg-emerald-50">
          <div className="container py-4">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 text-[14px] text-emerald-900">
              <CheckCircle2 className="size-5 shrink-0 text-emerald-700" />
              <span>
                Podsumowanie wysłane na <strong>{submittedEmail}</strong>.
                Sprawdź skrzynkę, a na wszelki wypadek również spam.
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Score header */}
      <section className="border-b border-navy-100 bg-white">
        <div className="container py-12 md:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Badge variant="soft" className="gap-1.5 px-3 py-1">
                <Sparkles className="size-3.5" />
                {config.scoreLabel}
              </Badge>
              <Button variant="ghost" size="sm" onClick={onReset}>
                <RefreshCw />
                Wypełnij ponownie
              </Button>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3 lg:items-center">
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)]">
                <ScoreGauge
                  value={result.total}
                  max={100}
                  pct={result.total}
                  caption={null}
                />
                <div className="mt-4 text-center text-[16px] font-semibold text-navy-800">
                  {result.level.name}
                </div>
              </div>

              <div className="lg:col-span-2">
                <h1 className="text-balance text-[32px] font-semibold leading-[1.08] tracking-tightest text-navy-950 sm:text-[40px]">
                  {result.level.name}
                </h1>
                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
                  {result.level.description}
                </p>
                <LevelScale score={result.total} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breakdown */}
      <section className="border-b border-navy-100 bg-navy-50/40">
        <div className="container py-12 md:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Wynik według kategorii
                </h2>
                <span className="text-[12px] text-muted-foreground">
                  Waga kategorii w wyniku końcowym w nawiasie
                </span>
              </div>
              {tierLabel && (
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
                  Zasięg porównaliśmy do skali:{" "}
                  <strong className="font-medium text-navy-900">
                    {tierLabel.toLowerCase()}
                  </strong>
                  . Ten sam zasięg wypada inaczej przy innej skali - jeśli to
                  nie jest Wasz poziom, wypełnijcie ponownie.
                </p>
              )}
              <div className="mt-5 space-y-4">
                {result.categories.map((c) => (
                  <CategoryBar
                    key={c.id}
                    label={c.label}
                    short={c.short}
                    score={c.score}
                    weight={c.weight}
                  />
                ))}
              </div>
            </div>

            {/* Biggest opportunity */}
            <div className="mt-5 rounded-2xl border border-navy-900 bg-navy-950 p-6 text-white sm:p-8">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-navy-300">
                Największa szansa
              </div>
              <p className="mt-3 max-w-3xl text-[18px] font-medium leading-relaxed text-white sm:text-[20px]">
                {result.headline}
              </p>
              {result.audience.multiplierLabel && (
                <p className="mt-4 border-t border-navy-800 pt-4 text-[13.5px] text-navy-300">
                  Jakość zasięgu:{" "}
                  <span className="text-white">
                    {result.audience.multiplierLabel}
                  </span>{" "}
                  - liczone z relacji wyświetleń do liczby obserwujących.
                </p>
              )}
            </div>

            {/* Top 3 */}
            <div className="mt-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Trzy obszary o największym potencjale
                </h2>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-navy-800">
                  <TrendingUp className="size-3.5" />
                  razem do zyskania: +{Math.round(totalGain)} pkt
                </span>
              </div>

              <ul className="mt-5 space-y-3">
                {result.improvements.map((item, i) => (
                  <li
                    key={item.categoryId}
                    className="flex items-start gap-4 rounded-lg border border-navy-100 bg-navy-50/40 p-4"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy-800 text-[13px] font-semibold text-white">
                      {i + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-[14.5px] font-semibold tracking-wider text-navy-950">
                          {item.categoryLabel}
                        </span>
                        <span className="text-[13px] font-medium text-navy-700">
                          +{item.gain} pkt
                        </span>
                      </div>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-navy-900">
                        {item.recommendation}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-t border-navy-100 pt-4 text-[13.5px] leading-relaxed text-muted-foreground">
                Commercial Score jest narzędziem diagnostycznym, nie wyceną.
                Pokazuje, <strong className="text-navy-900">gdzie</strong> leży
                niewykorzystany potencjał - pełna analiza aktywów, wycena i plan
                działań to zakres audytu prowadzonego przez Sport Space Pro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950">
        <div className="container py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-[30px] font-semibold leading-tight tracking-tight text-white sm:text-[38px]">
              {cta.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-navy-200">
              {cta.body}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-white text-navy-950 hover:bg-navy-100"
              >
                <Link
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onCtaClick("audit")}
                >
                  {cta.primary}
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-navy-700 bg-transparent text-white hover:border-white hover:bg-navy-900 hover:text-white"
              >
                <Link href="/#contact" onClick={() => onCtaClick("contact")}>
                  {cta.secondary}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function barTone(score: number): string {
  if (score < 40) return "bg-red-500";
  if (score < 60) return "bg-amber-500";
  if (score < 80) return "bg-blue-600";
  return "bg-emerald-600";
}

function CategoryBar({
  label,
  short,
  score,
  weight,
}: {
  label: string;
  short: string;
  score: number;
  weight: number;
}) {
  return (
    <div>
      <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
        <span className="text-[13.5px] font-semibold tracking-wider text-navy-900">
          {label}
          <span className="ml-2 font-normal tracking-normal text-muted-foreground">
            ({Math.round(weight * 100)}%)
          </span>
        </span>
        <span className="text-[13px] tabular-nums text-muted-foreground">
          {score}/100
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-navy-50">
        <div
          className={cn("h-full rounded-full transition-all", barTone(score))}
          style={{ width: `${Math.max(score, 1)}%` }}
        />
      </div>
      <p className="mt-1 text-[12.5px] text-muted-foreground">{short}</p>
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

function LevelScale({ score }: { score: number }) {
  const idx = SCORE_LEVELS.findIndex(
    (l) => score >= l.range[0] && score <= l.range[1]
  );
  const levelIdx = idx === -1 ? 0 : idx;

  return (
    <div className="mt-7">
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Skala Commercial Score
      </div>
      <div className="flex overflow-hidden rounded-md">
        {SCORE_LEVELS.map((lvl, i) => (
          <div
            key={lvl.id}
            className={cn(
              "h-7 flex-1 border",
              SEG_STYLES[i],
              i === levelIdx ? "opacity-100" : "opacity-50"
            )}
          />
        ))}
      </div>
      <div className="mt-1.5 flex">
        {SCORE_LEVELS.map((lvl, i) => (
          <div key={lvl.id} className="flex-1 px-0.5 text-center">
            <div
              className={cn(
                "text-[9px] font-medium leading-tight",
                i === levelIdx ? "text-navy-900" : "text-muted-foreground/70"
              )}
            >
              {lvl.name}
            </div>
            <div className="text-[9px] tabular-nums text-muted-foreground/60">
              {lvl.range[0]}-{lvl.range[1]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

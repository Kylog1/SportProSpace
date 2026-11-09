import type { ReactNode } from "react";

import {
  HERO_SAMPLE,
  formatNps,
  heroNps,
  heroRetention,
} from "./hero-sample-data";

type Tone = "promoter" | "cyan" | "coral";

/* Tailwind needs the full class names to be present in the source, so they are
   listed here and not built from strings. */
const TONE: Record<Tone, { value: string; top: string }> = {
  promoter: { value: "text-space-promoter", top: "border-t-space-promoter" },
  cyan: { value: "text-space-cyan", top: "border-t-space-cyan" },
  coral: { value: "text-space-coral", top: "border-t-space-coral" },
};

interface CellProps {
  label: ReactNode;
  value: string;
  unit?: string;
  tone: Tone;
  note: string;
  barLabel: string;
  bar: ReactNode;
}

function Cell({ label, value, unit, tone, note, barLabel, bar }: CellProps) {
  return (
    <div
      className={`border-t-[3px] ${TONE[tone].top} px-3.5 py-3 lg:border-l lg:border-l-space-ink-2/20 lg:first:border-l-0`}
    >
      <dt className="whitespace-nowrap font-hud text-xs uppercase tracking-[0.1em] text-space-ink-2">
        {label}
      </dt>
      <dd className="m-0">
        <span
          className={`block font-hero text-[32px] font-extrabold leading-[1.1] tracking-[-0.03em] [font-stretch:118%] lg:text-[40px] ${TONE[tone].value}`}
        >
          {value}
          {unit ? (
            <span className="ml-1 text-lg tracking-normal text-space-ink-2">
              {unit}
            </span>
          ) : null}
        </span>
        <span
          role="img"
          aria-label={barLabel}
          className="my-2 flex h-[5px] bg-space-ink-2/20"
        >
          {bar}
        </span>
        <span className="block whitespace-nowrap font-hud text-xs text-space-ink-2">
          {note}
        </span>
      </dd>
    </div>
  );
}

/**
 * The scoreboard: NPS, Commercial Score and Churn. The numbers come from
 * HERO_SAMPLE and agree with each other. Three rows below 1024px, three
 * columns from 1024px.
 */
export function HeroKpiBoard({ className = "" }: { className?: string }) {
  const { promoters, passives, detractors, commercialScore, churn } =
    HERO_SAMPLE;
  return (
    <div className={className}>
      <dl className="m-0 grid grid-cols-1 border border-space-ink-2/35 bg-space-bg/95 lg:grid-cols-3">
        <Cell
          label={
            <>
              <abbr
                title="Net Promoter Score"
                aria-hidden="true"
                className="no-underline"
              >
                NPS
              </abbr>
              <span className="sr-only">Net Promoter Score (NPS)</span>
            </>
          }
          value={formatNps(heroNps)}
          tone="promoter"
          note={`${promoters}% / ${passives}% / ${detractors}%`}
          barLabel={`Promotorzy ${promoters}%, neutralni ${passives}%, krytycy ${detractors}%`}
          bar={
            <>
              <span
                className="block h-full bg-space-promoter"
                style={{ width: `${promoters}%` }}
              />
              <span
                className="block h-full bg-space-passive"
                style={{ width: `${passives}%` }}
              />
              <span
                className="block h-full bg-space-coral"
                style={{ width: `${detractors}%` }}
              />
            </>
          }
        />
        <Cell
          label="Commercial Score"
          value={String(commercialScore)}
          unit="/100"
          tone="cyan"
          // The scoring model for organizations has six areas (see
          // lib/commercial-score/organization.ts). The mockup said four.
          note="z 6 obszarów oceny"
          barLabel={`Commercial Score ${commercialScore} na 100`}
          bar={
            <span
              className="block h-full bg-space-cyan"
              style={{ width: `${commercialScore}%` }}
            />
          }
        />
        <Cell
          label="Churn"
          value={`${churn}%`}
          tone="coral"
          note={`retencja ${heroRetention}%`}
          barLabel={`Churn ${churn}%`}
          bar={
            <span
              className="block h-full bg-space-coral"
              style={{ width: `${churn}%` }}
            />
          }
        />
      </dl>
    </div>
  );
}

function Dot({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`mr-2 inline-block size-[9px] rounded-full ${className}`}
    />
  );
}

/**
 * Legend of the stands plus the "illustrative data" notice. Keep the notice
 * visible: 12px, contrast above 4.5:1, never shortened to an asterisk.
 */
export function HeroSampleLegend({ className = "" }: { className?: string }) {
  const { promoters, passives, detractors } = HERO_SAMPLE;
  return (
    <ul
      className={`m-0 flex list-none flex-wrap items-center gap-x-5 gap-y-1 bg-space-bg/90 p-0 font-hud text-xs text-space-ink-2 lg:w-max lg:flex-nowrap lg:px-3 lg:py-1 ${className}`}
    >
      <li>
        <Dot className="bg-space-promoter" />
        promotorzy {promoters}%
      </li>
      <li>
        <Dot className="bg-space-passive" />
        neutralni {passives}%
      </li>
      <li>
        <Dot className="bg-space-coral" />
        krytycy {detractors}%
      </li>
      {/* Wraps below 1024px so the notice is never cut off on a phone. */}
      <li className="w-full lg:w-auto lg:whitespace-nowrap">
        Każdy punkt to jeden głos klienta · dane przykładowe
      </li>
    </ul>
  );
}

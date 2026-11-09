import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CALENDLY_URL } from "@/lib/links";
import { HeroKpiBoard, HeroSampleLegend } from "./hero/hero-kpi-board";
import { HeroStadiumCanvas } from "./hero/hero-stadium-canvas";
import { TrackedBookingLink } from "./hero/hero-tracked-link";
import {
  spaceButton,
  spaceButtonGhost,
  spaceButtonPrimary,
} from "./hero/space-button";

// Hero "Trybuny": a stadium made of dots (one dot = one customer voice), a
// football pitch with a padel/tennis court on its halfway line, and a
// scoreboard (NPS, Commercial Score, Churn) that explains the picture.
//
// Server Component. The only browser code in the hero is the decorative canvas
// and the click handler that reports the booking link. The headline, the
// sentence and the buttons are plain HTML, so LCP never waits for the canvas.
// All the numbers are illustrative and say so (hero/hero-sample-data.ts).
//
// The hero has its own visual language, narrower than the rest of the site:
// see DESIGN.md, "Hero and header".

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-glow relative isolate overflow-hidden border-b border-space-blue-hi/30 text-space-ink"
    >
      {/* Copy. On desktop the hero is a fixed-height band and the copy is
          centred in the space above the scoreboard. */}
      <div className="relative z-10 px-gutter pb-12 pt-10 lg:flex lg:min-h-[clamp(700px,88svh,860px)] lg:items-center lg:pb-44 lg:pt-12">
        <div className="flex max-w-[820px] flex-col items-start gap-7">
          {/* On phones the headline always takes five lines in Archivo, but the
              fallback font fits it in four, so the block reserves five lines.
              Without that, a slow font load pushes everything below it down
              (CLS). Wider screens keep each sentence on one line. */}
          <h1
            id="hero-heading"
            className="font-hero text-[clamp(1.75rem,1.1rem+2.3vw,3.25rem)] font-extrabold leading-[1.04] tracking-[-0.03em] [font-stretch:118%] max-[480px]:min-h-[5.2em]"
          >
            <span className="block lg:whitespace-nowrap">
              Lepsze doświadczenia.
            </span>{" "}
            <span className="block lg:whitespace-nowrap">
              Większe zaangażowanie.
            </span>{" "}
            <span className="block text-space-blue-hi lg:whitespace-nowrap">
              Realny wzrost.
            </span>
          </h1>

          <p className="max-w-[34rem] font-hero-body text-[clamp(1.0625rem,1rem+0.3vw,1.125rem)] leading-relaxed text-space-ink-2">
            Pomagamy klubom i organizacjom sportowym zrozumieć, co naprawdę
            wpływa na doświadczenia ich klientów i wskazujemy jak przełożyć tę
            wiedzę na rezultaty biznesowe.
          </p>

          <div className="flex w-full flex-wrap items-center gap-4 sm:w-auto">
            <Link
              href="/self-assessment"
              className={`${spaceButton} ${spaceButtonPrimary} w-full sm:w-auto`}
            >
              Zrób darmowy Self-Audit
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5"
                strokeWidth={2.2}
              />
            </Link>
            <TrackedBookingLink
              href={CALENDLY_URL}
              source="hero"
              className={`${spaceButton} ${spaceButtonGhost} w-full sm:w-auto`}
            >
              Umów rozmowę
            </TrackedBookingLink>
          </div>
        </div>
      </div>

      {/* Desktop only (from 1024px): the stadium, the scoreboard and the legend
          are hidden on phones and tablets, where the hero is just the copy.
          A hidden stage is never drawn: the canvas skips zero-size containers. */}
      <HeroStadiumCanvas className="hidden lg:absolute lg:inset-0 lg:z-0 lg:block" />
      <div
        aria-hidden="true"
        className="hero-scrim pointer-events-none absolute inset-x-0 top-0 z-[1] hidden lg:block"
      />

      <p className="sr-only max-lg:hidden">
        Przykładowa wizualizacja: stadion, na którym każdy punkt na trybunach to
        głos jednego klienta. Jasnoniebieskie punkty to promotorzy, przygaszone
        niebieskie to neutralni, koralowe to krytycy. W środku boisko do piłki
        nożnej z kortem padel lub tenis, wokół bandy reklamowe, które pokazują
        Commercial Score, a z trybun wychodzą klienci, którzy odeszli, czyli
        churn. Wszystkie liczby są przykładowe.
      </p>

      {/* Scoreboard and legend (with the "dane przykładowe" notice). `contents`
          keeps both positioned against the section on desktop. */}
      <div className="hidden lg:contents">
        <HeroKpiBoard className="absolute bottom-12 right-gutter z-10 w-[576px]" />
        <HeroSampleLegend className="absolute bottom-2.5 right-gutter z-10" />
      </div>
    </section>
  );
}

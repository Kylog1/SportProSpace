import Link from "next/link";
import { ArrowUpRight, ClipboardCheck, BarChart3, Compass, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function HowWeHelp() {
  return (
    <section id="how-we-help" className="border-b border-navy-100 bg-white">
      <div className="container py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700">
              Usługi
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl">
              Trzy obszary, w których wnosimy mierzalną wartość.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Pracujemy modułowo — możesz wybrać jeden obszar lub przejść pełną
            ścieżkę: od diagnozy, przez badania, po wdrożenie.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {/* ─── KARTA 1 — Self Assessment Audit (dark, interactive) ─── */}
          <div className="group relative flex flex-col overflow-hidden rounded-xl bg-navy-900 p-7 transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.40)]">
            {/* subtle grid overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white">
                <ClipboardCheck className="size-5" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                01 — Diagnoza
              </span>
            </div>

            <div className="relative mt-6 flex items-start justify-between gap-2">
              <h3 className="text-xl font-semibold tracking-tight text-white">
                Self Assessment Audit
              </h3>
              <Badge className="shrink-0 border-none bg-white/15 text-[10px] font-semibold text-white/90 backdrop-blur-sm">
                Dostępne online
              </Badge>
            </div>

            <p className="relative mt-2 text-[14.5px] leading-relaxed text-white/65">
              Szybka, darmowa diagnoza Twojej organizacji sportowej — procesy,
              komunikacja, doświadczenie odbiorców.
            </p>

            <ul className="relative mt-6 space-y-2.5 border-t border-white/10 pt-5">
              {[
                "Audyt 6 obszarów funkcjonowania klubu",
                "Mapa luk vs. dobre praktyki rynkowe",
                "Lista priorytetów do wdrożenia",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[13.5px] text-white/80">
                  <span className="mt-[7px] size-1 rounded-full bg-white/60" />
                  {b}
                </li>
              ))}
            </ul>

            <Link
              href="#contact"
              className="relative mt-7 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-[13.5px] font-semibold text-white transition-all hover:bg-white/20"
            >
              <ArrowRight className="size-4" />
              Wypełnij ankietę
            </Link>
          </div>

          {/* ─── KARTA 2 — Experience Research ─── */}
          <Card className="group relative flex flex-col p-7 transition-all hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.18)]">
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-800 transition-colors group-hover:bg-navy-800 group-hover:text-white">
                <BarChart3 className="size-5" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                02 — Badania
              </span>
            </div>

            <h3 className="mt-6 text-xl font-semibold tracking-tight text-navy-950">
              Experience Research
            </h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
              Anonimowe badania zawodników, rodziców i członków Twojego klubu prowadzone
              w niezależnym środowisku z gwarancją poufności.
            </p>

            <ul className="mt-6 space-y-2.5 border-t border-navy-100 pt-5">
              {[
                "Ankiety segmentowe + wywiady pogłębione",
                "Analiza ilościowa i jakościowa",
                "Net Promoter Score dla całej organizacji",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[13.5px] text-navy-800">
                  <span className="mt-[7px] size-1 rounded-full bg-navy-800" />
                  {b}
                </li>
              ))}
            </ul>

            <Link
              href="#contact"
              className="mt-7 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-navy-800 transition-colors hover:text-navy-950"
            >
              Dowiedz się więcej
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Card>

          {/* ─── KARTA 3 — Brand & Experience Development ─── */}
          <Card className="group relative flex flex-col p-7 transition-all hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.18)]">
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-800 transition-colors group-hover:bg-navy-800 group-hover:text-white">
                <Compass className="size-5" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                03 — Wdrożenie
              </span>
            </div>

            <h3 className="mt-6 text-xl font-semibold tracking-tight text-navy-950">
              Brand & Experience Development
            </h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
              Przekład danych na strategię, komunikację i marketing klubu — od
              pozycjonowania po komunikację z rodzicami.
            </p>

            <ul className="mt-6 space-y-2.5 border-t border-navy-100 pt-5">
              {[
                "Strategia doświadczenia (CX) klubu",
                "System komunikacji z segmentami",
                "Plan działań marketingowych 12 mies.",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[13.5px] text-navy-800">
                  <span className="mt-[7px] size-1 rounded-full bg-navy-800" />
                  {b}
                </li>
              ))}
            </ul>

            <Link
              href="#contact"
              className="mt-7 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-navy-800 transition-colors hover:text-navy-950"
            >
              Dowiedz się więcej
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}

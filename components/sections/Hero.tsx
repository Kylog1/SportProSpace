"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  CircleDot,
  Dumbbell,
  Target,
  Flag,
  Waves,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trackMeetingBooked } from "@/lib/analytics";

const CALENDLY_URL = "https://calendly.com/grzyb-krzysiek/new-meeting";

const DISCIPLINES = [
  { icon: Dumbbell, label: "Fitness" },
  { icon: Target, label: "Tenis i padel" },
  { icon: Flag, label: "Golf" },
  { icon: Waves, label: "Pływanie" },
  { icon: CircleDot, label: "Piłka nożna" },
  { icon: Users, label: "Kluby wielosekcyjne" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-navy-100 bg-white">
      {/* grid bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-bg mask-fade-bottom opacity-60"
      />
      {/* top-right glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[300px] w-[300px] rounded-full bg-navy-100/50 blur-3xl md:h-[500px] md:w-[500px]"
      />

      <div className="container relative py-20 md:py-24 lg:py-28">
        {/* 2-column layout: text left, dashboard right */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* LEFT — copy */}
          <div className="flex flex-col items-start">
            <Badge variant="soft" className="mb-6 gap-1.5 px-3 py-1">
              <ShieldCheck className="size-3.5" />
              Niezależna platforma badań i analizy
            </Badge>

            <h1 className="text-balance text-4xl font-semibold leading-[1.06] tracking-tightest text-navy-950 sm:text-5xl lg:text-[52px] xl:text-[58px]">
              Lepsze doświadczenia.
              <span className="text-navy-800"> Większe zaangażowanie.</span>{" "}
              Realny wzrost.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[17px]">
              Pomagamy klubom i organizacjom sportowym zrozumieć doświadczenia
              członków, zawodników i klientów — i znaleźć obszary, które
              ograniczają wzrost.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/self-assessment">
                  Zrób darmowy Self-Audit
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackMeetingBooked("hero")}
                >
                  Umów rozmowę
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-navy-800" />
                100% anonimowe ankiety
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-navy-800" />
                Niezależna metodologia
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-navy-800" />
                Raport + rekomendacje
              </span>
            </div>
          </div>

          {/* RIGHT — dashboard mockup */}
          <div className="relative w-full">
            <div className="rounded-2xl border border-navy-100 bg-white p-2 shadow-[0_24px_64px_-20px_rgba(15,23,42,0.18)]">
              <div className="rounded-xl border border-navy-100 bg-gradient-to-b from-white to-navy-50/40 p-5 sm:p-6">
                {/* top bar */}
                <div className="flex items-center justify-between border-b border-navy-100 pb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full bg-navy-200" />
                    <div className="size-2 rounded-full bg-navy-200" />
                    <div className="size-2 rounded-full bg-navy-200" />
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground">
                    Experience Report — Q2 2026
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    412 respondentów
                  </span>
                </div>

                {/* stats row */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <Stat label="Net Promoter Score" value="+62" delta="+9 vs Q1" />
                  <Stat label="Retencja członków" value="87%" delta="+4.2 pp" />
                  <Stat label="Satysfakcja klientów" value="4.5/5" delta="+0.3" />
                </div>

                {/* charts row */}
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <Panel title="Powody odejść">
                    <Bar label="Brak feedbacku" value={68} />
                    <Bar label="Komunikacja z trenerami" value={54} />
                    <Bar label="Organizacja zajęć" value={37} />
                    <Bar label="Atmosfera" value={22} />
                  </Panel>
                  <Panel title="NPS wg segmentu">
                    <Bar label="Członkowie" value={82} accent />
                    <Bar label="Nowi klienci" value={71} accent />
                    <Bar label="Rodzice" value={66} accent />
                    <Bar label="Trenerzy" value={59} accent />
                  </Panel>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* discipline strip — signals breadth beyond a single sport */}
        <div className="mt-14 border-t border-navy-100 pt-8 md:mt-16 md:pt-10">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-navy-700">
              Pracujemy z
            </span>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {DISCIPLINES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 text-[13.5px] font-medium text-navy-800"
                >
                  <Icon className="size-4 text-navy-700" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-lg border border-navy-100 bg-white p-3">
      <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground leading-tight">
        {label}
      </div>
      <div className="mt-1.5 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-1.5">
        <span className="text-xl font-semibold tracking-tight text-navy-950">{value}</span>
        <span className="text-[10px] font-medium text-navy-700">{delta}</span>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-navy-100 bg-white p-4">
      <div className="mb-3 text-[12px] font-semibold tracking-tight text-navy-950">{title}</div>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function Bar({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="text-navy-800">{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-navy-50">
        <div
          className={accent ? "h-full rounded-full bg-navy-800" : "h-full rounded-full bg-navy-300"}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

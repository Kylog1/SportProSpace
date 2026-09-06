"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackMeetingBooked } from "@/lib/analytics";

const CALENDLY_URL = "https://calendly.com/grzyb-krzysiek/new-meeting";

// Punkty pola odpowiedzi. Jeden z nich (wyroznik: true) dostaje pierscienie -
// to wzorzec, ktory badanie wylapuje z szumu.
const points = [
  { x: 96, y: 228, o: 0.3 },
  { x: 146, y: 272, o: 0.22 },
  { x: 128, y: 176, o: 0.26 },
  { x: 196, y: 212, o: 0.34 },
  { x: 212, y: 126, o: 0.28 },
  { x: 252, y: 252, o: 0.2 },
  { x: 286, y: 164, o: 0.38, wyroznik: true },
  { x: 264, y: 88, o: 0.24 },
  { x: 330, y: 232, o: 0.22 },
  { x: 352, y: 132, o: 0.3 },
  { x: 386, y: 196, o: 0.18 },
  { x: 176, y: 76, o: 0.2 },
  { x: 318, y: 52, o: 0.16 },
  { x: 82, y: 122, o: 0.18 },
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
        {/* 2-column layout: text left, abstract field right */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* LEFT - copy */}
          <div className="flex flex-col items-start">
            <h1 className="text-balance text-4xl font-semibold leading-[1.06] tracking-tightest text-navy-950 sm:text-5xl lg:text-[52px] xl:text-[58px]">
              Lepsze doświadczenia.
              <span className="text-navy-800"> Większe zaangażowanie.</span>{" "}
              Realny wzrost.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[17px]">
              Pomagamy klubom i organizacjom sportowym zrozumieć, co naprawdę
              wpływa na doświadczenia ich klientów i wskazujemy jak przełożyć
              tę wiedzę na rezultaty biznesowe.
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
          </div>

          {/* RIGHT - pole odpowiedzi.
              Poprzednio stal tu makiet dashboardu z wymyslonymi wynikami
              (NPS +62, 412 respondentow). Pokazywal produkt, ktorego nie ma
              w ofercie, i podawal NPS jako procent - blad skali na stronie
              firmy badawczej. Zostal abstrakcyjny akcent: zero liczb do
              obrony, ta sama siatka co ciemna karta Self-Audit nizej. */}
          <div className="relative w-full">
            <div className="overflow-hidden rounded-2xl shadow-[0_24px_64px_-28px_rgba(11,23,54,0.45)]">
              <svg
                aria-hidden
                viewBox="0 0 440 340"
                className="block w-full"
              >
                <rect width="440" height="340" fill="#172554" />

                {/* siatka */}
                <g stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1">
                  <path d="M70 0V340M120 0V340M170 0V340M220 0V340M270 0V340M320 0V340M370 0V340" />
                  <path d="M0 70H440M0 120H440M0 170H440M0 220H440M0 270H440" />
                </g>

                {/* luki pomiaru */}
                <g fill="none" stroke="#ffffff" strokeWidth="1">
                  <circle cx="40" cy="300" r="110" strokeOpacity="0.16" />
                  <circle cx="40" cy="300" r="180" strokeOpacity="0.13" />
                  <circle cx="40" cy="300" r="250" strokeOpacity="0.1" />
                  <circle cx="40" cy="300" r="320" strokeOpacity="0.07" />
                </g>

                {/* odpowiedzi */}
                <g fill="#ffffff">
                  {points.map((p) => (
                    <circle key={`${p.x}-${p.y}`} cx={p.x} cy={p.y} r="3" opacity={p.o} />
                  ))}
                </g>

                {/* wyroznik */}
                <circle cx="286" cy="164" r="15" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="1" />
                <circle cx="286" cy="164" r="28" fill="none" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1" />
                <circle cx="286" cy="164" r="5" fill="#ffffff" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackMeetingBooked } from "@/lib/analytics";

const CALENDLY_URL = "https://calendly.com/grzyb-krzysiek/new-meeting";

// Chmura powodow odejscia. Kolejnosc jest ustawiona recznie, zeby dominanta
// ("brak feedbacku") wypadla na srodku bloku. Wielkosc i nasycenie niosa te
// sama informacje - jedna rampa navy, zero czerwieni i zieleni.
const powodyOdejsc = [
  { slowo: "dojazd", klasa: "text-[11px] text-navy-200" },
  { slowo: "grafik zajęć", klasa: "text-[14px] text-navy-400" },
  { slowo: "cena karnetu", klasa: "text-[12px] text-navy-300" },
  { slowo: "brak feedbacku", klasa: "text-[24px] font-semibold tracking-tight text-navy-950" },
  { slowo: "atmosfera", klasa: "text-[13px] text-navy-400" },
  { slowo: "komunikacja", klasa: "text-[18px] font-medium text-navy-800" },
  { slowo: "rotacja trenerów", klasa: "text-[11px] text-navy-200" },
  { slowo: "organizacja zajęć", klasa: "text-[15px] text-navy-700" },
  { slowo: "kontuzje", klasa: "text-[12px] text-navy-300" },
  { slowo: "brak postępów", klasa: "text-[13px] text-navy-400" },
  { slowo: "zmiana klubu", klasa: "text-[11px] text-navy-200" },
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
        {/* 2-column layout: text left, wskazniki right */}
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

          {/* RIGHT - trzy wskazniki i chmura powodow.
              NPS stoi na wlasnej skali (-100..+100) zamiast na pasku
              procentowym, dwa kafelki zamiast trzech nie scisnie sie na
              telefonie, a powody odejsc czyta sie jednym spojrzeniem
              zamiast osmiu paskow. Liczby sa przykladowe i tak podpisane. */}
          <div className="relative w-full">
            <div className="rounded-2xl border border-navy-100 bg-white p-2 shadow-[0_24px_64px_-20px_rgba(15,23,42,0.18)]">
              <div className="flex flex-col gap-2 rounded-xl border border-navy-100 bg-gradient-to-b from-white to-navy-50/40 p-4">

                {/* NPS */}
                <div className="rounded-lg border border-navy-100 bg-white px-3 pb-2 pt-3">
                  <svg
                    viewBox="0 0 220 132"
                    role="img"
                    aria-label="Wskaźnik NPS plus 62 na skali od minus 100 do plus 100"
                    className="mx-auto block w-full max-w-[188px]"
                  >
                    <path
                      d="M32 108A78 78 0 0 1 188 108"
                      fill="none"
                      stroke="#dbe5f1"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />
                    <path
                      d="M32 108A78 78 0 0 1 188 108"
                      fill="none"
                      stroke="#1e3a8a"
                      strokeWidth="14"
                      strokeLinecap="round"
                      strokeDasharray="198 260"
                    />
                    <circle cx="182.5" cy="64.1" r="7" fill="#0b1736" stroke="#ffffff" strokeWidth="3" />
                    <text x="26" y="126" fontSize="9" fill="#8aa6cd">−100</text>
                    <text x="176" y="126" fontSize="9" fill="#8aa6cd">+100</text>
                    <text
                      x="110"
                      y="100"
                      textAnchor="middle"
                      fontSize="36"
                      fontWeight="600"
                      letterSpacing="-1.6"
                      fill="#0b1736"
                    >
                      +62
                    </text>
                    <text x="110" y="122" textAnchor="middle" fontSize="10" letterSpacing="1.4" fill="#64748b">
                      NPS
                    </text>
                  </svg>
                </div>

                {/* Retencja i Commercial Score */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-navy-100 bg-white p-3.5">
                    <div className="text-[26px] font-semibold tracking-tightest tabular-nums text-navy-950">
                      87%
                    </div>
                    <div className="mt-0.5 text-[10.5px] text-muted-foreground">
                      Retencja członków
                    </div>
                  </div>
                  <div className="rounded-lg border border-navy-100 bg-white p-3.5">
                    <div className="text-[26px] font-semibold tracking-tightest tabular-nums text-navy-950">
                      72<span className="text-[14px] font-medium text-navy-300">/100</span>
                    </div>
                    <div className="mt-0.5 text-[10.5px] text-muted-foreground">
                      Commercial Score
                    </div>
                  </div>
                </div>

                {/* Powody odejsc */}
                <div className="rounded-lg border border-navy-100 bg-white p-3.5">
                  <div className="text-[10.5px] text-muted-foreground">Powody odejść</div>
                  <div className="mt-3 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1.5 pb-1 leading-tight">
                    {powodyOdejsc.map((p) => (
                      <span key={p.slowo} className={p.klasa}>
                        {p.slowo}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pr-0.5 text-right text-[10px] text-navy-300">
                  Dane przykładowe
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

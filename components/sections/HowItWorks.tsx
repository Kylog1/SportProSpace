import { ArrowRight } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Analiza organizacji",
    desc: "Sesja warsztatowa z zarządem klubu, mapowanie procesów i punktów styku z odbiorcami.",
  },
  {
    n: "02",
    title: "Badanie doświadczenia",
    desc: "Anonimowe ankiety zawodników, rodziców, członków Twojego klubu oraz wywiady pogłębione z kluczowymi segmentami.",
  },
  {
    n: "03",
    title: "Analiza danych",
    desc: "Analiza ilościowa i jakościowa zebranego materiału — segmentacja, korelacje, główne sygnały.",
  },
  {
    n: "04",
    title: "Raport + rekomendacje",
    desc: "Raport zarządczy, mapa priorytetów i konkretny plan działań na najbliższe 12 miesięcy.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-navy-100 bg-navy-50/40">
      <div className="container py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700">
            Proces
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl">
            Jak pracujemy — cztery etapy, jeden wynik.
          </h2>
          <p className="mt-4 text-balance text-[16px] leading-relaxed text-muted-foreground">
            Od pierwszej rozmowy do wdrożenia — przejrzysty, mierzalny proces
            zaprojektowany dla organizacji sportowych.
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-6xl">
          {/* desktop connector line */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[44px] hidden h-px bg-gradient-to-r from-transparent via-navy-200 to-transparent md:block"
          />

          <ol className="grid gap-5 md:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.n}
                className="relative rounded-xl border border-navy-100 bg-white p-4 md:p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-md bg-navy-800 text-[12px] font-semibold tracking-wider text-white">
                    {s.n}
                  </div>
                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden size-4 text-navy-300 md:block" />
                  )}
                </div>
                <h3 className="mt-5 text-[16px] font-semibold tracking-tight text-navy-950">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}

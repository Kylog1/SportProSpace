import { ArrowRight } from "lucide-react";

// The process, and only the process. "Co badamy" used to sit below this as a
// second section; it is gone rather than merged.
//
// What survives from that merge is the positioning fix, which was the point of
// it: the first step used to read "Badamy doświadczenia…", so every engagement
// appeared to begin with a study and the site read as a research shop. It is
// now "Diagnozujemy", and the intro names both tracks explicitly.

const steps = [
  {
    n: "01",
    title: "Diagnozujemy",
    desc: "Badanie doświadczenia, audyt aktywów komercyjnych albo jedno i drugie.",
  },
  {
    n: "02",
    title: "Znajdujemy problemy",
    desc: "Analizujemy doświadczenie, zachowania i procesy w Waszej organizacji.",
  },
  {
    n: "03",
    title: "Wskazujemy możliwości",
    desc: "Pokazujemy, gdzie możecie zwiększyć zaangażowanie, retencję, upsell, cross-sell i przychody.",
  },
  {
    n: "04",
    title: "Wdrażamy i mierzymy",
    desc: "Przekładamy wyniki na konkretne działania i mierzymy efekty.",
  },
];

export function JakDzialamy() {
  return (
    <section id="jak-dzialamy" className="border-b border-navy-100 bg-navy-50/40">
      <div className="container py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700">
            Jak działamy
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl">
            Od diagnozy do wdrożenia.
          </h2>
          <p className="mt-4 text-balance text-[16px] leading-relaxed text-muted-foreground">
            Pracujemy na dwóch frontach: doświadczenie i retencja klientów oraz
            potencjał komercyjny organizacji. Wejściem może być badanie, audyt
            komercyjny albo bezpłatny wynik z naszych narzędzi.
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-6xl">
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

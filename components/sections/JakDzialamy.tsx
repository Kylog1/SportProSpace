import { ArrowRight } from "lucide-react";

// Process and scope in one section. These used to be two - "Jak działamy" and
// "Co badamy" - which cost a full section header and set of padding for one
// continuous thought, and left the site sounding like a research shop: the old
// first step was "Badamy doświadczenia…", so every engagement appeared to start
// with a study. The commercial track had no place on the homepage at all.

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

// Two tracks, not one. The experience column is the old five-stage funnel; the
// commercial column mirrors the categories Commercial Score actually measures,
// so neither is a claim invented for this page.
const tracks: { label: string; items: { name: string; desc: string }[] }[] = [
  {
    label: "Doświadczenie i retencja",
    items: [
      { name: "Attract", desc: "Czy klub przyciąga właściwych klientów" },
      { name: "Activate", desc: "Czy nowi szybko zaczynają korzystać" },
      { name: "Retain", desc: "Czy relacja sprawia, że zostają" },
      { name: "Expand", desc: "Czy wykorzystujecie upsell i cross-sell" },
      { name: "Refer", desc: "Czy zadowoleni przyciągają kolejnych" },
    ],
  },
  {
    label: "Potencjał komercyjny",
    items: [
      { name: "Aktywa", desc: "Co realnie macie do sprzedania markom" },
      { name: "Oferta", desc: "Czy potraficie uzasadnić wartość współpracy" },
      { name: "Sprzedaż", desc: "Kto i jak prowadzi rozmowy z firmami" },
      { name: "Aktywacje", desc: "Co sponsor dostaje i co mu raportujecie" },
    ],
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

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {tracks.map((track) => (
            <div
              key={track.label}
              className="rounded-xl border border-navy-100 bg-white p-6"
            >
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-navy-700">
                {track.label}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {track.items.map((item) => (
                  <li key={item.name} className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[14px] font-semibold tracking-tight text-navy-950">
                      {item.name}
                    </span>
                    <span className="text-[13.5px] leading-relaxed text-muted-foreground">
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

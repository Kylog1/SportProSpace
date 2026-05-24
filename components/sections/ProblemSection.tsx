import { TrendingDown, MessageSquareOff, Database } from "lucide-react";

const problems = [
  {
    icon: MessageSquareOff,
    title: "Odejścia bez feedbacku",
    desc: "Zawodnicy i rodzice rezygnują bez wyjaśnienia. Klub traci wiedzę, której potrzebuje, by reagować.",
  },
  {
    icon: Database,
    title: "Brak danych w klubach",
    desc: "Decyzje zarządu opierają się na pojedynczych głosach, nie na ustrukturyzowanych danych z całej organizacji.",
  },
  {
    icon: TrendingDown,
    title: "Decyzje na intuicji",
    desc: "Strategia rozwoju, komunikacja i marketing planowane bez mierzalnego obrazu doświadczenia odbiorców.",
  },
];

const stats = [
  { value: "41%", label: "młodych zawodników rezygnuje przed 13. rokiem życia" },
  { value: "3×", label: "wyższa retencja w klubach z formalnym feedbackiem" },
  { value: "67%", label: "rodziców nie zgłasza zastrzeżeń wprost klubowi" },
];

export function ProblemSection() {
  return (
    <section className="border-b border-navy-100 bg-navy-50/40">
      <div className="container py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700">
            Problem
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl">
            Większość klubów nie wie, dlaczego ludzie odchodzą.
          </h2>
          <p className="mt-4 text-balance text-[16px] leading-relaxed text-muted-foreground">
            Doświadczenie zawodnika, rodzica i trenera decyduje o retencji,
            reputacji i przychodach. W praktyce nikt go systematycznie nie mierzy.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
          {problems.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl border border-navy-100 bg-white p-4 sm:p-6"
            >
              <div className="flex size-10 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-800">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 text-[16px] font-semibold tracking-tight text-navy-950">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-px overflow-hidden rounded-xl border border-navy-100 bg-navy-100 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-white p-6 sm:p-8">
              <div className="text-3xl font-semibold tracking-tight text-navy-900 md:text-4xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-3 max-w-5xl text-[11px] text-muted-foreground">
          Źródło: Sport Space Pro, opracowanie własne na podstawie badań rynku sportu 2024–2026.
        </p>
      </div>
    </section>
  );
}

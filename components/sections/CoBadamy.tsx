import { Magnet, Zap, Anchor, TrendingUp, Share2, type LucideIcon } from "lucide-react";

const stages: { icon: LucideIcon; label: string; question: string }[] = [
  {
    icon: Magnet,
    label: "Attract",
    question: "Czy klub skutecznie przyciąga właściwych klientów?",
  },
  {
    icon: Zap,
    label: "Activate",
    question: "Czy nowi klienci szybko zaczynają korzystać i angażować się?",
  },
  {
    icon: Anchor,
    label: "Retain",
    question: "Czy klub buduje relację, która sprawia, że klient zostaje?",
  },
  {
    icon: TrendingUp,
    label: "Expand",
    question: "Czy klub wykorzystuje potencjał upsell i cross-sell?",
  },
  {
    icon: Share2,
    label: "Refer",
    question: "Czy zadowoleni klienci przyciągają kolejnych?",
  },
];

export function CoBadamy() {
  return (
    <section id="co-badamy" className="border-b border-navy-100 bg-white">
      <div className="container py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700">
            Co badamy
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl">
            Pięć obszarów, jeden pełny obraz.
          </h2>
          <p className="mt-4 text-balance text-[16px] leading-relaxed text-muted-foreground">
            Nie patrzymy na pojedynczy moment. Analizujemy całą ścieżkę
            klienta — od pierwszego kontaktu po polecenie.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-2xl">
          <ol className="relative">
            {stages.map((s, i) => (
              <li key={s.label} className="relative flex gap-5 pb-10 last:pb-0">
                {i < stages.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute left-[21px] top-11 h-[calc(100%-28px)] w-px bg-navy-200"
                  />
                )}
                <div className="relative flex size-11 shrink-0 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-800">
                  <s.icon className="size-5" />
                </div>
                <div className="pt-1.5">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-navy-700">
                    {s.label}
                  </div>
                  <p className="mt-1.5 text-[16px] font-medium leading-snug text-navy-950">
                    {s.question}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

import { LineChart, Users, Trophy, FileSearch } from "lucide-react";

const pillars = [
  {
    icon: LineChart,
    title: "Badania rynku i CX",
    desc: "Wieloletnie doświadczenie w projektach Customer Experience, brand tracking i NPS dla marek konsumenckich i B2B.",
  },
  {
    icon: Trophy,
    title: "Świat sportu od środka",
    desc: "Praca z klubami, akademiami i organizacjami sportowymi różnych dyscyplin. Rozumiemy specyfikę środowiska i jego interesariuszy.",
  },
  {
    icon: FileSearch,
    title: "Metodologia naukowa",
    desc: "Łączymy badania ilościowe i jakościowe: ankiety segmentowe, IDI, analiza statystyczna, walidacja wewnętrzna.",
  },
  {
    icon: Users,
    title: "Niezależność",
    desc: "Działamy poza strukturami klubów. Anonimowość respondentów to fundament wiarygodności i jakości danych.",
  },
];


export function About() {
  return (
    <section id="about" className="border-b border-navy-100 bg-white">
      <div className="container py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-2 md:gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="md:col-span-1 lg:col-span-5">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700">
              O nas
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl">
              Łączymy badania rynku ze światem klubów i organizacji sportowych.
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-muted-foreground">
              Sport Space Pro powstał na styku dwóch dyscyplin: badań
              doświadczenia klienta i pracy operacyjnej w sporcie.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
              Wiemy, jak projektować badania, których wyniki są używane,
              a nie odkładane na półkę. Nasze raporty trafiają do zarządów
              i menadżerów, a rekomendacje przekładają się na decyzje
              operacyjne i strategiczne.
            </p>

          </div>

          <div className="md:col-span-1 lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {pillars.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-xl border border-navy-100 bg-white p-4 sm:p-6"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-800">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-[15.5px] font-semibold tracking-tight text-navy-950">
                    {title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                    {desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

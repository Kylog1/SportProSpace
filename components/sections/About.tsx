import { LineChart, ShieldCheck, Trophy, Workflow } from "lucide-react";

// Three equal areas of competence (research and CX, sport business intelligence,
// AI and automation) plus the independence that backs the data. The copy is
// deliberately plain: it is read by club presidents and academy directors.
const pillars = [
  {
    icon: LineChart,
    title: "Badania i Customer Experience",
    desc: "Projektujemy badania, analizujemy doświadczenia klientów i identyfikujemy czynniki wpływające na ich zaangażowanie, lojalność i decyzje o pozostaniu w klubie.",
  },
  {
    icon: Trophy,
    title: "Sport Business Intelligence",
    desc: "Pracujemy z klubami, akademiami i organizacjami sportowymi. Analizujemy ich potencjał, wyzwania operacyjne i możliwości rozwoju komercyjnego.",
  },
  {
    icon: ShieldCheck,
    title: "Niezależność i wiarygodność",
    desc: "Prowadzimy niezależne badania, dbamy o anonimowość respondentów i dostarczamy obiektywnych danych wspierających decyzje zarządcze.",
  },
  {
    icon: Workflow,
    title: "AI i automatyzacja",
    desc: "Projektujemy rozwiązania wykorzystujące AI, agentów i automatyzację procesów. Usprawniamy komunikację, marketing, sprzedaż, analizę danych i codzienną pracę organizacji sportowych.",
  },
];


export function About() {
  return (
    <section id="about" className="border-b border-navy-100 bg-white">
      <div className="container py-20 md:py-28">
        {/* Two columns from 1024px (text left, four tiles right). Below that
            the text sits above the tiles, which are two across from 640px. */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="max-w-2xl lg:col-span-5 lg:max-w-none">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700">
              O nas
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl">
              Łączymy dane, doświadczenie i technologię, aby rozwijać sport.
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-muted-foreground">
              Sport Space Pro powstał na styku trzech obszarów: badań Customer
              Experience, praktycznej znajomości branży sportowej i nowoczesnych
              technologii.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
              Pomagamy klubom, akademiom i organizacjom sportowym lepiej
              rozumieć swoich klientów, rozwijać potencjał biznesowy oraz
              usprawniać codzienne procesy.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
              Łączymy niezależne badania i analizę danych z doradztwem
              biznesowym, rozwiązaniami AI i automatyzacją. Nie kończymy na
              diagnozie. Pomagamy przekładać wiedzę na konkretne decyzje
              i działania.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
              Naszym celem jest jedno: wspierać organizacje sportowe w rozwoju,
              budowaniu lepszych doświadczeń klientów i tworzeniu bardziej
              efektywnych modeli działania.
            </p>
          </div>

          <div className="lg:col-span-7">
            {/* Each tile is a subgrid over three rows (icon, title, text), so a
                title that wraps does not push its text out of line with the
                neighbouring tile. */}
            <div className="grid gap-4 sm:grid-cols-2">
              {pillars.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-xl border border-navy-100 bg-white p-4 sm:row-span-3 sm:grid sm:grid-rows-subgrid sm:gap-y-0 sm:p-6"
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

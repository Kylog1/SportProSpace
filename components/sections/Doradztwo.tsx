import Link from "next/link";
import {
  ArrowRight,
  Handshake,
  Building2,
  LineChart,
  type LucideIcon,
} from "lucide-react";

const offers: {
  icon: LucideIcon;
  name: string;
  value: string;
  services: string[];
  /**
   * Optional free entry point into a paid service. Only Sponsoring has one, so
   * the link is rendered per card rather than under the grid - someone reading
   * this card is already the right person for it, and a shared bar under three
   * cards would not say which service it belongs to.
   */
  cta?: { href: string; label: string; note: string };
}[] = [
  {
    icon: Handshake,
    name: "Sponsoring",
    value:
      "Pomagamy klubom przełożyć dane o kibicach i zasięgu na profesjonalne, sprzedawalne pakiety sponsoringowe.",
    services: [
      "Pakiety wartości sponsoringowej oparte na danych",
      "Profil i segmentacja kibiców oraz społeczności klubu",
      "Wycena ekwiwalentu medialnego i zasięgu",
      "Wsparcie w identyfikacji i pozyskiwaniu sponsorów",
      "Materiały i strategia komunikacji ze sponsorami",
    ],
    cta: {
      href: "/commercial-score/organizacja",
      label: "Policz swój Sponsorship Score",
      note: "Nie wiecie, od czego zacząć? Sprawdźcie bezpłatnie, jak wygląda Wasz potencjał sponsorski.",
    },
  },
  {
    icon: Building2,
    name: "Dla Klubów i Operatorów",
    value:
      "Podnosimy retencję członków i efektywność operacyjną klubów oraz obiektów sportowych dzięki badaniom customer experience.",
    services: [
      "Audyt i strategia customer experience (Attract-Retain-Refer)",
      "Strategia retencji członków i redukcji rezygnacji",
      "Pełne wsparcie marketingowe i strategia wzrostu przychodów",
      "Wdrożenie rekomendacji operacyjnych",
      "Benchmarking względem konkurencji w branży",
    ],
  },
  {
    icon: LineChart,
    name: "Dla Inwestorów",
    value:
      "Wspieramy ocenę i due diligence aktywów sportowych na bazie realnych danych operacyjnych, nie deklaracji zarządu.",
    services: [
      "Due diligence oparte na danych o klubie, członkach i kibicach",
      "Analiza rynku i benchmarking konkurencyjny",
      "Ocena potencjału wzrostu przychodów (retencja, sponsoring)",
      "Wsparcie analityczne przy wycenie aktywów sportowych",
    ],
  },
];

export function Doradztwo() {
  return (
    <section id="doradztwo" className="border-b border-navy-100 bg-navy-50/40">
      <div className="container py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700">
            Doradztwo
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl">
            Decyzje na podstawie liczb, nie przeczucia.
          </h2>
          <p className="mt-4 text-balance text-[16px] leading-relaxed text-muted-foreground">
            Sport Space Pro łączy badania customer experience z twardymi danymi,
            żeby kluby, operatorzy i inwestorzy podejmowali decyzje na podstawie
            liczb, a nie przeczucia.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
          {offers.map(({ icon: Icon, name, value, services, cta }) => (
            <div
              key={name}
              className="flex flex-col rounded-xl border border-navy-100 bg-white p-6"
            >
              <div className="flex size-10 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-800">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 text-[15.5px] font-semibold tracking-tight text-navy-950">
                {name}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                {value}
              </p>
              <ul className="mt-5 space-y-2.5 border-t border-navy-100 pt-5">
                {services.map((service) => (
                  <li key={service} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className="mt-[7px] size-1.5 shrink-0 rounded-full bg-navy-800"
                    />
                    <span className="text-[13px] leading-relaxed text-navy-800">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
              {cta && (
                <div className="mt-auto pt-5">
                  <div className="rounded-lg border border-navy-100 bg-navy-50/60 p-4">
                    <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                      {cta.note}
                    </p>
                    <Link
                      href={cta.href}
                      className="group mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy-800 hover:text-navy-950"
                    >
                      {cta.label}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

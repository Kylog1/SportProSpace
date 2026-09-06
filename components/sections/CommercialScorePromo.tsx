import Link from "next/link";
import { ArrowRight, Building2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sits directly under SelfAuditPromo, so it deliberately does not repeat that
// section's dark centred panel - two identical slabs in a row read as one long
// advert. A light two-column split also does a second job the dark panel
// cannot: it routes athletes and organizations apart before the click.
//
// The copy leads on the distinction between the two tools, because a visitor
// who has just read about the Self-Audit will otherwise assume this is the
// same thing under another name.

const CARDS = [
  {
    href: "/commercial-score/zawodnik",
    icon: Trophy,
    title: "Zawodnik",
    body: "Zasięg, wartość sportowa, content i gotowość do współpracy z markami.",
  },
  {
    href: "/commercial-score/organizacja",
    icon: Building2,
    title: "Organizacja sportowa",
    body: "Aktywa komercyjne, oferta sponsorska, sprzedaż i mierzenie efektów.",
  },
];

export function CommercialScorePromo() {
  return (
    <section className="border-b border-navy-100 bg-navy-50/40">
      <div className="container py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-navy-700">
              Nowe narzędzie
            </div>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.025em] text-navy-950 md:text-[40px] md:leading-[1.1]">
              Ile jesteś wart dla marek?
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">
              Self-Audit pokazuje, gdzie tracicie klientów. Commercial Score
              odpowiada na inne pytanie: jak dobrze Wasz sportowy potencjał jest
              przygotowany do współpracy z markami. Wynik 0-100, rozbicie na
              obszary i trzy rzeczy, które warto poprawić najpierw.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group flex items-start gap-4 rounded-xl border border-navy-100 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-[0_12px_32px_-18px_rgba(15,23,42,0.28)] sm:p-6"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-800">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[20px] font-semibold tracking-[-0.025em] text-navy-950">
                      {card.title}
                    </div>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                      {card.body}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-navy-800">
                      Policz wynik
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] text-muted-foreground">
            <span>15 pytań, ok. 4 minuty</span>
            <span className="hidden h-3 w-px bg-navy-200 sm:block" />
            <span>Bezpłatnie</span>
            <span className="hidden h-3 w-px bg-navy-200 sm:block" />
            <span>Porównanie do skali Twojej organizacji, nie do samych followersów</span>
          </div>

          <div className="mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/commercial-score">
                Zobacz, jak liczymy wynik
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

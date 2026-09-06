"use client";

import Link from "next/link";
import { ArrowRight, Building2, Trophy, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ATHLETE_CONFIG, ORGANIZATION_CONFIG } from "@/lib/commercial-score";

// Landing step. No form on this screen on purpose: the visitor picks who they
// are first, and only then meets a question. Two large targets beat a dropdown
// on mobile, which is where most of this traffic lands.

const CARDS = [
  {
    config: ATHLETE_CONFIG,
    icon: Trophy,
    title: "Indywidualny zawodnik",
    body: "Sprawdź swój potencjał komercyjny jako sportowiec: zasięg, wartość sportową, content i gotowość do współpracy z markami.",
    cta: "Policz swój Athlete Score",
  },
  {
    config: ORGANIZATION_CONFIG,
    icon: Building2,
    title: "Organizacja sportowa",
    body: "Klub, akademia, federacja albo organizator wydarzeń. Sprawdź potencjał sponsorski: aktywa, ofertę, sprzedaż i mierzenie efektów.",
    cta: "Policz swój Sponsorship Score",
  },
];

export function ScoreChooser() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-navy-100 bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-bg mask-fade-bottom opacity-60"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-navy-100/50 blur-3xl"
        />

        <div className="container relative py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="soft" className="mb-5 gap-1.5 px-3 py-1">
              <ShieldCheck className="size-3.5" />
              Bezpłatne narzędzie Sport Space Pro
            </Badge>

            <h1 className="text-balance text-[36px] font-semibold leading-[1.05] tracking-tightest text-navy-950 sm:text-[44px] lg:text-[52px]">
              Jaki jest Twój{" "}
              <span className="text-navy-800">Commercial Score?</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
              Sprawdź, jak dobrze Twój sportowy potencjał jest przygotowany do
              współpracy z markami. Wynik 0-100, rozbicie na obszary i trzy
              rzeczy, które warto poprawić.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
            {CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.config.id}
                  href={`/commercial-score/${card.config.slug}`}
                  className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] transition-all hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-[0_12px_32px_-18px_rgba(15,23,42,0.28)] sm:p-8"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl border border-navy-100 bg-navy-50 text-navy-800">
                    <Icon className="size-5" />
                  </div>

                  <h2 className="mt-5 text-[20px] font-semibold tracking-[-0.025em] text-navy-950">
                    {card.title}
                  </h2>
                  <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>

                  <div className="mt-5 border-t border-navy-100 pt-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Badane obszary
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {card.config.categories.map((cat) => (
                        <span
                          key={cat.id}
                          className="rounded-md border border-navy-100 bg-navy-50/60 px-2 py-0.5 text-[11px] font-medium tracking-wide text-navy-700"
                        >
                          {cat.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Styled to match the primary Button, but rendered as a
                      span: the whole card is already the link, and nesting an
                      anchor or button inside one is invalid and breaks keyboard
                      navigation. Hover is driven by the card's group. */}
                  <span className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-navy-800 px-5 text-sm font-medium text-white shadow-sm transition-colors group-hover:bg-navy-900">
                    {card.cta}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-navy-100 bg-navy-50/40">
        <div className="container py-14 md:py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-navy-700">
              Jak liczymy wynik
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <Explainer
                title="O wyniku decyduje głównie proces"
                body="Zasięg to jedna z kategorii i odpowiada za 25% wyniku organizacji oraz 32% zawodnika. Resztę stanowią aktywa, oferta, sprzedaż i mierzenie efektów. Dwa kluby o identycznym zasięgu potrafią różnić się przychodem sponsorskim dziesięciokrotnie i decyduje o tym proces, nie followersi."
              />
              <Explainer
                title="Zasięg porównujemy do właściwej skali"
                body="5 000 obserwujących to dobry wynik dla klubu lokalnego i słaby dla ogólnopolskiego, więc każdy profil zestawiamy z jego własnym punktem odniesienia. Liczby przeliczamy logarytmicznie, dzięki czemu żaden pojedynczy kanał nie zdominuje wyniku."
              />
              <Explainer
                title="To diagnoza, nie wycena"
                body="Commercial Score pokazuje gotowość do współpracy z markami i miejsca, w których leży niewykorzystany potencjał. Nie jest wyceną zawodnika ani gwarancją wartości sponsorskiej."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Explainer({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-navy-100 bg-white p-5">
      <h3 className="text-[15px] font-semibold leading-snug text-navy-950">
        {title}
      </h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}

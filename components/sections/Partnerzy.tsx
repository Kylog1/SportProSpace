import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Footprints,
  HeartPulse,
  ClipboardCheck,
  Target,
  Languages,
  Wallet,
  User,
  Users,
  Building,
  ListChecks,
  Timer,
  Route,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FOOTLOG_URL = "https://footlog.pl/";
const FOOTLOG_AUDIT_URL = "https://footlog.pl/pro-audyt/";

const audience: { icon: LucideIcon; label: string; note: string }[] = [
  {
    icon: User,
    label: "Zawodnik",
    note: "Buduje nawyki i śledzi swój rozwój",
  },
  {
    icon: Users,
    label: "Trener",
    note: "Zarządza drużyną w oparciu o dane, nie przeczucia",
  },
  {
    icon: Building,
    label: "Prezes",
    note: "Wyróżnia akademię jakością i profesjonalizmem",
  },
];

const features: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Footprints,
    title: "Treningi",
    desc: "Monitoring systematyczności. Autorski system punktacji analizuje rytm treningowy zawodnika.",
  },
  {
    icon: HeartPulse,
    title: "Regeneracja",
    desc: "Sen i samopoczucie pod kontrolą, z bezpośrednim kanałem komunikacji kryzysowej „Fast-Track” do sztabu.",
  },
  {
    icon: ClipboardCheck,
    title: "Raporty",
    desc: "Analityczny profil zawodnika, dane z treningów przełożone na konkretne cele rozwojowe.",
  },
  {
    icon: Target,
    title: "Cele półroczne",
    desc: "Zarządzanie kamieniami milowymi kariery metodą małych kroków.",
  },
  {
    icon: Languages,
    title: "Football English",
    desc: "Nauka angielskiego piłkarskiego w formie gry, 60 lekcji w 10 ligach, ze streakami i odznakami.",
  },
  {
    icon: Wallet,
    title: "Koszty",
    desc: "Kalkulator wydatków piłkarskiej kariery w 8 kategoriach, od składki po obozy i fizjoterapię.",
  },
];

const auditTrust: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: ListChecks, value: "9 pytań", label: "diagnostycznych" },
  { icon: Timer, value: "45 sekund", label: "czas ukończenia" },
  { icon: Route, value: "Roadmapa", label: "wdrożenia na 30 dni" },
];

const auditDimensions = [
  "Load Management",
  "Wellness",
  "Injury Intelligence",
  "Pro Standards",
];

export function Partnerzy() {
  return (
    <>
      {/* HERO */}
      <section className="bg-white">
        <div className="container py-14 md:py-20">
          <div className="mx-auto max-w-3xl">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-[13px] text-muted-foreground"
            >
              <Link href="/" className="hover:text-navy-950">
                Sport Space Pro
              </Link>
              <span>/</span>
              <span className="text-navy-950">Partnerzy</span>
            </nav>

            <span className="mt-6 inline-block text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700">
              Partnerzy
            </span>
            <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-[38px]">
              Ludzie i narzędzia, którym ufamy.
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
              Klubom i akademiom polecamy sprawdzonych partnerów, którzy
              pomagają działać na co dzień, nie tylko diagnozować. To
              zarówno technologie, jak i eksperci: fizjoterapia,
              psychologia sportu czy współpraca ze związkami sportowymi.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTLOG OVERVIEW */}
      <section className="border-y border-navy-100 bg-navy-50/40">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700">
              Partner dla akademii piłkarskich
            </span>
            <h2 className="mt-3 text-balance text-2xl font-semibold leading-tight tracking-tight text-navy-950 md:text-3xl">
              FootLog to aplikacja dla młodych piłkarzy, rodziców i trenerów
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-navy-800">
              FootLog to aplikacja do śledzenia piłkarskiej formy. Zawodnik
              loguje trening, sen i samopoczucie, a autorski wskaźnik{" "}
              <strong className="font-semibold text-navy-950">
                Pro Index (0–100)
              </strong>{" "}
              pokazuje trenerowi, na czyich danych może polegać, nagradza
              systematyczność i szczerość raportowania, a nie ciężar
              treningu.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              {audience.map(({ icon: Icon, label, note }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-md border border-navy-100 bg-white text-navy-800">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-navy-950">
                      {label}
                    </div>
                    <div className="text-[12px] text-muted-foreground">
                      {note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 md:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col rounded-xl border border-navy-100 bg-white p-6"
              >
                <div className="flex size-10 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-800">
                  <Icon className="size-5" />
                </div>
                <div className="mt-5 text-[15px] font-semibold tracking-tight text-navy-950">
                  {title}
                </div>
                <div className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                  {desc}
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center gap-4">
            <Button asChild>
              <Link href={FOOTLOG_URL} target="_blank" rel="noopener noreferrer">
                Odwiedź FootLog.pl
                <ExternalLink />
              </Link>
            </Button>
            <a
              href="mailto:kontakt@footlog.pl"
              className="text-[13.5px] font-medium text-navy-700 hover:text-navy-950"
            >
              kontakt@footlog.pl
            </a>
          </div>
        </div>
      </section>

      {/* PRO AUDYT CTA */}
      <section className="bg-white">
        <div className="container py-20 md:py-28">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-navy-200 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 px-8 py-14 text-white md:px-16 md:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/5 blur-3xl"
            />

            <div className="relative mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-100">
                Bezpłatne narzędzie FootLog
              </span>

              <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-[40px] md:leading-[1.1]">
                Pro Audyt Akademii Piłkarskiej
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[15.5px] leading-relaxed text-navy-100/80">
                9 pytań diagnostycznych w 4 obszarach dojrzałości
                operacyjnej. W ok. 45 sekund otrzymujesz wynik 0–100 oraz
                pełny raport PDF z roadmapą wdrożenia na 30 dni.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-[12.5px] text-navy-100/70">
                {auditTrust.map(({ value, label }, i) => (
                  <span key={value} className="flex items-center gap-1.5">
                    {i > 0 && (
                      <span className="hidden h-3 w-px bg-white/20 sm:block" />
                    )}
                    <span>
                      {value} {label}
                    </span>
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {auditDimensions.map((dim) => (
                  <span
                    key={dim}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11.5px] text-navy-100/80"
                  >
                    {dim}
                  </span>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                className="mt-8 bg-white text-navy-950 hover:bg-navy-100"
              >
                <Link
                  href={FOOTLOG_AUDIT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zrób Pro Audyt na FootLog.pl
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-[13px] leading-relaxed text-muted-foreground">
            To niezależne narzędzie FootLog, skoncentrowane na obciążeniach
            treningowych i prewencji kontuzji, dobre uzupełnienie{" "}
            <Link
              href="/self-assessment/football"
              className="font-medium text-navy-800 underline underline-offset-2 hover:text-navy-950"
            >
              Self-Audit Sport Space Pro
            </Link>
            , który mierzy doświadczenie i retencję w Twoim klubie.
          </p>
        </div>
      </section>
    </>
  );
}

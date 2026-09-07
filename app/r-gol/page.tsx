import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Trophy,
  Building2,
  Users,
  Handshake,
  CalendarDays,
  LineChart,
  Radio,
  Database,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import { ProposalNav } from "@/components/r-gol/ProposalNav";

// Private proposal page. Not linked from anywhere on the site and excluded from
// robots + sitemap on purpose: the recipient forwards the URL internally, and
// nobody else - competitors or the clubs named in the conversation - should be
// able to find it.
export const metadata: Metadata = {
  title: "R-GOL × Sport Space Pro - propozycja współpracy",
  description:
    "Materiał przygotowany dla R-GOL.com | Unisport: metoda oceny potencjału komercyjnego zawodników i klubów w Polsce.",
  robots: { index: false, follow: false, nocache: true },
};

const SECTION = "border-b border-navy-100";
const EYEBROW =
  "text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700";
const H2 =
  "mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl";

/* ---------------------------------------------------------------- 1. Hero */

function Hero() {
  return (
    <section className={`relative overflow-hidden bg-white ${SECTION}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-bg mask-fade-bottom opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-navy-100/50 blur-3xl"
      />

      <div className="container relative py-16 md:py-24">
        <div className="max-w-3xl">
          <Badge variant="soft" className="mb-5 px-3 py-1">
            Materiał przygotowany dla R-GOL.com | Unisport A/S
          </Badge>

          <h1 className="text-balance text-[36px] font-semibold leading-[1.05] tracking-tightest text-navy-950 sm:text-[44px] lg:text-[52px]">
            Wy macie zasięg i markę.{" "}
            <span className="text-navy-800">
              My metodę, żeby wiedzieć, na kogo postawić.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
            Sport Space Pro punktuje potencjał komercyjny zawodników i
            organizacji sportowych w Polsce - w skali 0-100, na powtarzalnym
            modelu. Ten materiał pokazuje, jak takie wyniki mogą zasilić decyzje
            R-GOL o kontraktach z zawodnikami, klubami i akademiami.
          </p>

          <div className="mt-8">
            <a
              href="#dane"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-navy-800 px-5 text-[14px] font-medium text-white transition-colors hover:bg-navy-900"
            >
              Zobacz, jak to działa
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- 2. Punkt wyjścia */

const GAPS: { title: string; body: string }[] = [
  {
    title: "Brak punktu odniesienia dla zawodnika",
    body: "Poza wąską czołówką Ekstraklasy nie ma czym zważyć, ile realnie wnosi piłkarz 1. czy 2. ligi. Wycena powstaje w negocjacji, a nie przed nią.",
  },
  {
    title: "Kluby opisują się deklaracjami",
    body: "Dane o zasięgu, frekwencji i społeczności marka dostaje od strony, która chce sprzedać. Nikt ich niezależnie nie weryfikuje ani nie porównuje między klubami.",
  },
  {
    title: "Efekt rzadko wraca w liczbach",
    body: "Po sezonie trudno powiedzieć, co dało konkretne partnerstwo, więc kolejna decyzja zapada tak samo jak poprzednia - na relacji i przeczuciu.",
  },
];

function PunktWyjscia() {
  return (
    <section id="punkt-wyjscia" className={`bg-navy-50/40 ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Punkt wyjścia</span>
          <h2 className={H2}>
            W Polsce decyzje o tym, kogo ubrać, zapadają bez danych.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            To obserwacja z pracy z klubami i akademiami, nie zarzut wobec
            kogokolwiek - tak wygląda cały ten rynek. Trzy rzeczy, które wracają
            w każdej rozmowie:
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {GAPS.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-navy-100 bg-white p-6"
            >
              <h3 className="text-[15.5px] font-semibold tracking-tight text-navy-950">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-3xl rounded-xl border border-navy-100 bg-white p-7">
          <p className="text-[16px] leading-relaxed text-navy-900">
            Wy macie w Polsce zasięg, markę i dystrybucję, których nikt w tej
            branży szybko nie zbuduje. Czego przy tej skali nie da się kupić
            razem z zasięgiem, to uporządkowanej odpowiedzi na pytanie{" "}
            <strong className="font-semibold text-navy-950">
              którzy polscy zawodnicy i które kluby są realnie warte kontraktu
            </strong>{" "}
            - i dlaczego akurat ci, a nie inni.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Ja mam odwrotnie: nie mam zasięgu, mam metodę. Commercial Score
            rozkłada wartość komercyjną zawodnika na pięć składowych i przelicza
            je na jedną liczbę, porównywalną między poziomami rozgrywek i
            dyscyplinami. Stąd ta rozmowa.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------- 3. Dane / Commercial Score */

const TRACKS: {
  icon: LucideIcon;
  kicker: string;
  title: string;
  body: string;
  dims: string[];
  href: string;
  cta: string;
}[] = [
  {
    icon: Trophy,
    kicker: "Athlete Score",
    title: "Zawodnicy - Ekstraklasa, 1. i 2. liga",
    body: "Ocena potencjału komercyjnego piłkarza: co realnie wnosi do marki poza nazwiskiem i minutami na boisku.",
    dims: [
      "Audience Power - realny zasięg i jakość zaangażowania społeczności",
      "Sport Value - pozycja sportowa, poziom rozgrywek, trajektoria kariery",
      "Content Power - zdolność do tworzenia materiałów, które ktoś ogląda",
      "Commercial Readiness - gotowość operacyjna do współpracy z marką",
      "Brand Fit - dopasowanie wizerunkowe do konkretnego partnera",
    ],
    href: "/commercial-score/zawodnik",
    cta: "Zobacz model dla zawodnika",
  },
  {
    icon: Building2,
    kicker: "Sponsorship Score",
    title: "Kluby, akademie, federacje",
    body: "Ocena potencjału sponsorskiego organizacji: nie deklaracje zarządu, tylko aktywa, sprzedaż i mierzenie efektów.",
    dims: [
      "Audience Power - frekwencja, baza CRM, zasięgi własne",
      "Commercial Assets - co organizacja ma realnie do sprzedania",
      "Positioning & Offer - jakość i sprzedawalność oferty partnerskiej",
      "Sales Capability - czy jest kto i czym sprzedawać",
      "Activation & Measurement - czy ktokolwiek mierzy efekt partnerstwa",
      "B2B & Hospitality - potencjał relacji biznesowych wokół klubu",
    ],
    href: "/commercial-score/organizacja",
    cta: "Zobacz model dla organizacji",
  },
];

function Dane() {
  return (
    <section id="dane" className={`bg-white ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Commercial Score</span>
          <h2 className={H2}>
            Dwa modele, jedna skala 0-100, powtarzalna metodologia.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            Commercial Score to działające narzędzie Sport Space Pro, dostępne
            publicznie i bezpłatnie. Oba modele możecie przetestować w kilka
            minut na dowolnym zawodniku lub klubie, zanim cokolwiek ustalimy.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {TRACKS.map(({ icon: Icon, kicker, title, body, dims, href, cta }) => (
            <div
              key={kicker}
              className="flex flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-800">
                  <Icon className="size-5" />
                </div>
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-navy-700">
                  {kicker}
                </span>
              </div>

              <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.025em] text-navy-950">
                {title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                {body}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-navy-100 pt-6">
                {dims.map((dim) => (
                  <li key={dim} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className="mt-[7px] size-1.5 shrink-0 rounded-full bg-navy-800"
                    />
                    <span className="text-[13.5px] leading-relaxed text-navy-800">
                      {dim}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <Link
                  href={href}
                  className="group inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-navy-800 hover:text-navy-950"
                >
                  {cta}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-navy-900 p-8 md:p-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-300">
            Co to daje R-GOL
          </p>
          <p className="mt-4 max-w-3xl text-balance text-[20px] font-semibold leading-snug tracking-tight text-white md:text-[24px]">
            Ten sam model można przestawić na kryteria R-GOL i dostać ranking
            zamiast listy.
          </p>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-navy-200">
            Wagi kategorii są konfigurowalne. Jeśli dla Was liczy się realny
            zasięg wśród grających nastolatków, cykl wymiany sprzętu w klubie
            albo decyzyjność po stronie akademii - te wymiary dostają wyższą
            wagę i wynik przestaje być ogólną oceną potencjału, a staje się
            oceną dopasowania do R-GOL. Efekt: uszeregowana lista zawodników i
            klubów z uzasadnieniem, którą da się obronić przed zarządem.
          </p>

          <div className="mt-8 border-t border-navy-800 pt-8">
            <p className="max-w-3xl text-[16px] leading-relaxed text-white">
              Najprostszy sposób, żeby to sprawdzić: dajcie mi listę dwudziestu
              zawodników albo klubów, z którymi już współpracujecie lub których
              rozważacie. Przepuszczę ją przez model i oddam ranking z
              uzasadnieniem dla każdej pozycji.
            </p>
            <p className="mt-3 max-w-3xl text-[14.5px] leading-relaxed text-navy-200">
              Zobaczycie metodę na własnym portfelu, a nie na moich przykładach
              - i od razu będzie wiadomo, czy wynik mówi Wam coś, czego jeszcze
              nie wiecie.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ 4. Obszary */

const AREAS: { icon: LucideIcon; no: string; title: string; body: string }[] = [
  {
    icon: Trophy,
    no: "01",
    title: "Zawodnicy zawodowi",
    body: "Kwalifikacja piłkarzy Ekstraklasy oraz 1. i 2. ligi pod kątem współpracy z R-GOL. Zamiast reagować na to, kto sam się zgłosi albo kogo akurat znamy - wybór oparty na wyniku i dopasowaniu do marki.",
  },
  {
    icon: Building2,
    no: "02",
    title: "Kluby i akademie",
    body: "Ten sam mechanizm po stronie organizacji: które kluby i akademie mają realny potencjał komercyjny, jaką mają skalę, kto tam decyduje i co da się z nimi zrobić poza dostarczeniem sprzętu.",
  },
  {
    icon: Radio,
    no: "03",
    title: "Aktywacje i formaty",
    body: "Projekty, w których R-GOL jest uczestnikiem środowiska, a nie logo na banerze: wydarzenia, programy zawodnicze, formaty łączące sprzęt z rozwojem gracza. Wy macie dystrybucję, ja mam dostęp i koncepcje.",
  },
  {
    icon: Handshake,
    no: "04",
    title: "B2B i partnerstwa",
    body: "Projekty R-GOL poza samym środowiskiem klubowym - z firmami z branży IT i technologii sportowej, z którymi pracuję. Obszar do zbadania po tym, jak zadziałają pierwsze trzy.",
  },
];

function Obszary() {
  return (
    <section id="obszary" className={`bg-navy-50/40 ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Obszary</span>
          <h2 className={H2}>Cztery miejsca, w których to się przekłada na R-GOL.</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            Kolejność nie jest przypadkowa - to również kolejność, w jakiej
            proponuję je testować.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {AREAS.map(({ icon: Icon, no, title, body }) => (
            <div
              key={no}
              className="rounded-xl border border-navy-100 bg-white p-7"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-800">
                  <Icon className="size-5" />
                </div>
                <span className="text-[13px] font-semibold tabular-nums text-navy-200">
                  {no}
                </span>
              </div>
              <h3 className="mt-5 text-[16.5px] font-semibold tracking-tight text-navy-950">
                {title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- 5. Koncepty */

const CONCEPTS: {
  icon: LucideIcon;
  tag: string;
  title: string;
  lead: string;
  blocks: { head: string; items: string[] }[];
  note: string;
}[] = [
  {
    icon: Trophy,
    tag: "Koncept 01",
    title: "R-GOL Player Program",
    lead: "Program współpracy z zawodnikami Ekstraklasy oraz 1. i 2. ligi, budowany na wyniku, a nie na tym, kto ma najgłośniejszego agenta.",
    blocks: [
      {
        head: "Jak wybieramy",
        items: [
          "Scoring 40-60 zawodników pod kryteria R-GOL",
          "Podział na poziomy współpracy zamiast jednego formatu dla wszystkich",
          "Osobna ścieżka dla zawodników rosnących, jeszcze niedrogich",
        ],
      },
      {
        head: "Co zawodnik dostaje",
        items: [
          "Sprzęt i warunki zależne od poziomu w programie",
          "Raport Athlete Score - własny potencjał komercyjny na piśmie",
          "Wsparcie w budowaniu wartości dla kolejnych marek",
        ],
      },
      {
        head: "Co dostaje R-GOL",
        items: [
          "Portfel zawodników wybranych na danych, nie na przeczuciu",
          "Uzasadnienie każdego kontraktu w tej samej skali",
          "Powtarzalny proces zamiast negocjacji od zera przy każdym nazwisku",
        ],
      },
    ],
    note: "Zawodnik, który dostaje raport o własnej wartości rynkowej od marki, która go ubiera, ma powód, żeby zostać przy tej marce dłużej niż trwa kontrakt.",
  },
  {
    icon: CalendarDays,
    tag: "Koncept 02",
    title: "R-GOL Academy Day",
    lead: "Zamknięte wydarzenie dla wyselekcjonowanych akademii - jeden dzień, cztery równoległe ścieżki, jedna marka jako gospodarz.",
    blocks: [
      {
        head: "Dla właścicieli i zarządzających",
        items: [
          "Komercjalizacja akademii i budowa oferty dla partnerów",
          "Sprzęt i technologia w modelu operacyjnym klubu",
          "Wymiana doświadczeń między akademiami",
        ],
      },
      {
        head: "Dla trenerów i zawodników",
        items: [
          "Metodyka, monitoring rozwoju, testy",
          "Sprzęt w praktyce treningowej",
          "Wyzwania i formaty angażujące młodych graczy",
        ],
      },
      {
        head: "Dla rodziców",
        items: [
          "Ścieżka rozwoju młodego zawodnika",
          "Czego realnie wymaga profesjonalna piłka",
          "Rodzic jako osoba, która podejmuje decyzje zakupowe",
        ],
      },
    ],
    note: "Akademie zapraszane są na podstawie Sponsorship Score, więc na sali siedzą organizacje, z którymi warto rozmawiać dalej - a nie te, które pierwsze się zapisały.",
  },
];

function Koncepty() {
  return (
    <section id="koncepty" className={`bg-white ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Koncepty</span>
          <h2 className={H2}>Dwa konkrety, żeby nie rozmawiać w abstrakcji.</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            Oba są prototypami do wspólnego doprecyzowania, nie gotowymi
            produktami. Zakładam, że po spotkaniu któryś z nich będzie wyglądał
            inaczej - albo wypadnie na rzecz Waszego pomysłu.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {CONCEPTS.map(({ icon: Icon, tag, title, lead, blocks, note }) => (
            <div
              key={tag}
              className="rounded-2xl border border-navy-100 bg-white p-7 md:p-9"
            >
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-800">
                  <Icon className="size-5" />
                </div>
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-navy-700">
                  {tag}
                </span>
              </div>

              <h3 className="mt-5 text-[22px] font-semibold tracking-tight text-navy-950">
                {title}
              </h3>
              <p className="mt-2.5 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
                {lead}
              </p>

              <div className="mt-8 grid gap-6 border-t border-navy-100 pt-8 md:grid-cols-3">
                {blocks.map((block) => (
                  <div key={block.head}>
                    <h4 className="text-[13px] font-semibold tracking-tight text-navy-950">
                      {block.head}
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <span
                            aria-hidden
                            className="mt-[7px] size-1.5 shrink-0 rounded-full bg-navy-200"
                          />
                          <span className="text-[13px] leading-relaxed text-navy-800">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="mt-8 border-l-2 border-navy-800 pl-4 text-[14px] leading-relaxed text-navy-900">
                {note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ 6. Pilotaż */

const STEPS: { no: string; title: string; body: string }[] = [
  {
    no: "01",
    title: "Ustalenie kryteriów",
    body: "Jedno spotkanie robocze. Przestawiamy wagi modelu na priorytety R-GOL i definiujemy, co dla Was znaczy dobry zawodnik i dobry klub.",
  },
  {
    no: "02",
    title: "Scoring",
    body: "40-60 zawodników Ekstraklasy oraz 1. i 2. ligi plus 15-20 akademii i klubów. Wynik: uszeregowana lista z uzasadnieniem dla każdej pozycji.",
  },
  {
    no: "03",
    title: "Jeden format w praktyce",
    body: "Wybieramy jeden koncept i realizujemy go na wąskiej próbie - kilku zawodnikach albo jednym wydarzeniu dla wybranych akademii.",
  },
  {
    no: "04",
    title: "Pomiar i decyzja",
    body: "Zamknięcie po 90 dniach: co zadziałało, ile kosztowało, co da się skalować. Decyzja o kontynuacji zapada na liczbach, nie na wrażeniach.",
  },
];

const METRICS = [
  "Liczba zakwalifikowanych zawodników i klubów",
  "Koszt pozyskania jednego kontraktu",
  "Zasięg i zaangażowanie aktywacji",
  "Leady sprzedażowe B2B z klubów i akademii",
  "Wartość koszyka i powtarzalność zakupów",
  "Gotowość partnerów do przedłużenia współpracy",
];

function Pilotaz() {
  return (
    <section id="pilotaz" className={`bg-navy-50/40 ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Pilotaż</span>
          <h2 className={H2}>90 dni, wąski zakres, twarde zamknięcie.</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            Nie proponuję rocznego kontraktu na współpracę strategiczną.
            Proponuję jeden ograniczony projekt, po którym będzie wiadomo, czy
            to ma sens - i który da się zamknąć bez konsekwencji, jeśli nie ma.
          </p>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <li
              key={step.no}
              className="rounded-xl border border-navy-100 bg-white p-6"
            >
              <span className="text-[12px] font-semibold tabular-nums tracking-[0.16em] text-navy-300">
                {step.no}
              </span>
              <h3 className="mt-3 text-[15.5px] font-semibold tracking-tight text-navy-950">
                {step.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-navy-100 bg-white p-7 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <LineChart className="size-4 text-navy-800" />
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-700">
                Co mierzymy
              </h3>
            </div>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {METRICS.map((metric) => (
                <li key={metric} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-[7px] size-1.5 shrink-0 rounded-full bg-navy-800"
                  />
                  <span className="text-[13.5px] leading-relaxed text-navy-800">
                    {metric}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-navy-100 bg-white p-7">
            <div className="flex items-center gap-2.5">
              <Target className="size-4 text-navy-800" />
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-700">
                Podział ról
              </h3>
            </div>
            <dl className="mt-5 space-y-4">
              <div>
                <dt className="text-[13px] font-semibold text-navy-950">
                  Sport Space Pro
                </dt>
                <dd className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
                  Model, scoring, dostęp i relacje, koncepcja formatu,
                  prowadzenie projektu, raport zamykający.
                </dd>
              </div>
              <div>
                <dt className="text-[13px] font-semibold text-navy-950">
                  R-GOL / Unisport
                </dt>
                <dd className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
                  Kryteria biznesowe, sprzęt, dystrybucja i zasięg, osoba
                  decyzyjna po Waszej stronie.
                </dd>
              </div>
              <div>
                <dt className="text-[13px] font-semibold text-navy-950">
                  Rozliczenie
                </dt>
                <dd className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
                  Stała kwota za pilotaż plus część uzależniona od efektu.
                  Konkretne warunki po wyborze obszaru - wycena bez znajomości
                  zakresu byłaby zgadywaniem.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- 7. Kto */

const CREDENTIALS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Database,
    title: "Commercial Score",
    body: "Autorski model oceny potencjału komercyjnego zawodników i organizacji. Działa publicznie, możecie go sprawdzić przed spotkaniem.",
  },
  {
    icon: Users,
    title: "Dostęp do klubów i akademii",
    body: "Relacje z akademiami warszawskimi, klubami 1. i 2. ligi oraz organizacjami, z którymi prowadzę rozmowy o komercjalizacji i retencji.",
  },
  {
    icon: LineChart,
    title: "Badania i doradztwo",
    body: "Customer experience, retencja członków, wycena potencjału sponsorskiego, due diligence aktywów sportowych.",
  },
  {
    icon: Radio,
    title: "Technologia",
    body: "FootLog.pl oraz współpraca z firmami z branży IT i technologii sportowej, które mogą wejść w projekty razem z R-GOL.",
  },
];

function Kto() {
  return (
    <section id="kto" className={`bg-white ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Kto za tym stoi</span>
          <h2 className={H2}>Sport Space Pro</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            Growth &amp; Experience Intelligence dla sportu. Pracuję z klubami,
            akademiami i inwestorami nad komercjalizacją, retencją i decyzjami
            opartymi na danych.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {CREDENTIALS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex gap-4 rounded-xl border border-navy-100 bg-white p-6"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-800">
                <Icon className="size-5" />
              </div>
              <div>
                <h3 className="text-[15.5px] font-semibold tracking-tight text-navy-950">
                  {title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-2 text-[14px] leading-relaxed text-muted-foreground">
          <p>
            Zakres doradztwa:{" "}
            <Link
              href="/#doradztwo"
              className="font-semibold text-navy-800 underline-offset-4 hover:underline"
            >
              sportspacepro.pl
            </Link>
          </p>
          <p>
            Jak patrzę na ten rynek:{" "}
            <Link
              href="/artykuly/sponsoring-pilkarski-ekstraklasa-1-liga-ekwiwalent"
              className="font-semibold text-navy-800 underline-offset-4 hover:underline"
            >
              Sponsoring piłkarski w Polsce - co realnie kupuje marka, wchodząc
              w Ekstraklasę albo 1. Ligę
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- 8. Spotkanie */

function Spotkanie() {
  return (
    <section id="spotkanie" className="bg-navy-950">
      <div className="container py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-300">
            Propozycja
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
            45 minut, żeby wybrać jeden obszar do przetestowania.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-navy-200">
            Celem spotkania nie jest podjęcie decyzji o współpracy, tylko
            skonfrontowanie tych kierunków z Waszymi priorytetami na najbliższe
            miesiące i wskazanie jednego, który warto sprawdzić jako pierwszy.
          </p>

          <div className="mt-10 max-w-sm rounded-xl border border-navy-800 bg-navy-900 p-6">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-300">
              Kontakt
            </h3>
            <div className="mt-4 space-y-2.5 text-[14px] leading-relaxed text-navy-100">
              <p className="font-semibold text-white">Krzysztof Grzyb</p>
              <p>Sport Space Pro</p>
              <p>
                <a
                  className="underline-offset-4 hover:underline"
                  href="mailto:krzysztof.grzyb@sportspacepro.pl"
                >
                  krzysztof.grzyb@sportspacepro.pl
                </a>
              </p>
              <p>
                <a
                  className="underline-offset-4 hover:underline"
                  href="tel:+48532413777"
                >
                  +48 532 413 777
                </a>
              </p>
            </div>
          </div>

          <a
            href="mailto:krzysztof.grzyb@sportspacepro.pl?subject=R-GOL%20%C3%97%20Sport%20Space%20Pro%20-%20spotkanie"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-white px-7 text-[15px] font-medium text-navy-950 transition-colors hover:bg-navy-100"
          >
            Zaproponuj termin
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function RGolProposalPage() {
  return (
    <>
      <ProposalNav />
      <main>
        <Hero />
        <PunktWyjscia />
        <Dane />
        <Obszary />
        <Koncepty />
        <Pilotaz />
        <Kto />
        <Spotkanie />
      </main>
      <Footer />
    </>
  );
}

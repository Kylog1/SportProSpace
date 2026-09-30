import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Camera,
  Globe,
  Handshake,
  HeartHandshake,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  Trophy,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import { ProposalNav } from "@/components/hillwood/ProposalNav";

// Private proposal page for Hillwood Polska. It goes out as a link in a mail
// that also carries the classic Pogoń partnership deck as an attachment - this
// page is the narrow, pilot-sized variant of the same conversation. Not linked
// from anywhere on the site, excluded from indexing here and in app/robots.ts.
export const metadata: Metadata = {
  title: "Hillwood × Pogoń Grodzisk Mazowiecki - sport jako platforma lokalnych relacji",
  description:
    "Propozycja pilotażu współpracy Hillwood Polska z Pogonią Grodzisk Mazowiecki: lokalna społeczność, relacje biznesowe i employer branding zamiast klasycznej ekspozycji logo.",
  robots: { index: false, follow: false, nocache: true },
};

const SECTION = "border-b border-navy-100";
const EYEBROW =
  "text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700";
const H2 =
  "mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl";
const BULLET =
  "mt-[7px] size-1.5 shrink-0 rounded-full bg-navy-800";

// Single source of truth for the pilot price. The scope is set together with
// Hillwood, so this stays a placeholder until there is something to put here.
const HILLWOOD_OFFER_PRICE = "Do ustalenia";

const MAIL_HREF =
  "mailto:krzysztof.grzyb@sportspacepro.pl?subject=Hillwood%20%C3%97%20Pogo%C5%84%20Grodzisk%20-%20pilota%C5%BC";

/* ---------------------------------------------------------------- 1. Hero */

const HERO_FACTS = [
  "Pilotaż, nie cały sezon",
  "Trzy kierunki do wyboru",
  "Jeden cel na start",
];

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
            Hillwood × Pogoń Grodzisk Mazowiecki
          </Badge>

          <h1 className="text-balance text-[36px] font-semibold leading-[1.05] tracking-tightest text-navy-950 sm:text-[44px] lg:text-[52px]">
            Sport jako platforma lokalnych relacji.
          </h1>

          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-navy-900">
            Jak wykorzystać lokalny sport do budowania relacji z mieszkańcami,
            pracownikami, najemcami i partnerami biznesowymi.
          </p>

          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
            Hillwood jest już obecny w lokalnym środowisku poprzez sport i
            działania społeczne. Nie proponujemy więc kolejnego standardowego
            sponsoringu. Chcemy pokazać, jak Pogoń może stać się dodatkowym
            narzędziem do budowania relacji Hillwood z lokalną społecznością,
            pracownikami, najemcami i partnerami biznesowymi.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {HERO_FACTS.map((fact, index) => (
              <div key={fact} className="flex items-center gap-6">
                {index > 0 && (
                  <span aria-hidden className="hidden h-4 w-px bg-navy-100 sm:block" />
                )}
                <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-navy-700">
                  {fact}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#punkt-wyjscia"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-navy-800 px-5 text-[14px] font-medium text-white transition-colors hover:bg-navy-900"
            >
              Zobacz propozycję
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#kontakt"
              className="text-[14px] font-medium text-navy-800 underline-offset-4 hover:underline"
            >
              Porozmawiajmy o pilocie
            </a>
          </div>

          <p className="mt-10 text-[13px] leading-relaxed text-muted-foreground">
            Przygotowane dla{" "}
            <strong className="font-semibold text-navy-900">
              Joanny Zabadały
            </strong>
            , Marketing Director, Hillwood Polska.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- 2. Punkt wyjścia */

const HILLWOOD_CONTEXT: { title: string; body: string }[] = [
  {
    title: "Sport jest już w portfolio",
    body: "Hillwood Polska angażował się w sponsoring sportowy, m.in. jako sponsor Polskiego Związku SUP.",
  },
  {
    title: "Wsparcie lokalnych inicjatyw",
    body: "Hillwood wspiera lokalne inicjatywy w regionach, w których prowadzi inwestycje.",
  },
  {
    title: "Obecność w Grodzisku Mazowieckim",
    body: "Hillwood był sponsorem lokalnych wydarzeń w Grodzisku Mazowieckim, m.in. Festiwalu Kultur Świata.",
  },
  {
    title: "Chlebnia jako duży projekt",
    body: "Hillwood Grodzisk Mazowiecki znajduje się w Chlebni i jest dużym projektem logistycznym, który jest rozwijany i rozbudowywany.",
  },
  {
    title: "ESG i CSR w komunikacji",
    body: "Hillwood komunikuje ESG, CSR i wartość dla lokalnych społeczności.",
  },
];

function PunktWyjscia() {
  return (
    <section id="punkt-wyjscia" className={`bg-navy-50/40 ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Punkt wyjścia</span>
          <h2 className={H2}>
            Hillwood już działa lokalnie. Pytanie brzmi: jak wykorzystać sport
            szerzej?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            Zaczynamy od tego, co Hillwood już robi - nie od tego, co mamy do
            sprzedania. To zmienia charakter rozmowy.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HILLWOOD_CONTEXT.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-navy-100 bg-white p-6"
            >
              <h3 className="text-[15px] font-semibold tracking-tight text-navy-950">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-3xl rounded-xl border border-navy-100 bg-white p-7">
          <p className="text-[17px] font-semibold leading-snug tracking-tight text-navy-950">
            Wiemy, że Hillwood jest już zaangażowany w lokalny sport. Dlatego
            Pogoń nie powinna być kolejnym zakupem ekspozycji. Powinna być
            dodatkowym narzędziem do realizacji konkretnych celów.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- 3. Dlaczego Pogoń */

const WHY_POGON: { icon: LucideIcon; no: string; title: string; body: string }[] = [
  {
    icon: MapPin,
    no: "01",
    title: "Lokalna społeczność",
    body: "Grodzisk Mazowiecki, Pruszków i okolice - ten sam obszar, w którym Hillwood inwestuje i zatrudnia.",
  },
  {
    icon: Trophy,
    no: "02",
    title: "Sport",
    body: "Regularne mecze, zawodnicy, akademia, kibice i powstający wokół tego content.",
  },
  {
    icon: Handshake,
    no: "03",
    title: "Biznes",
    body: "Możliwość zapraszania klientów, partnerów, najemców i potencjalnych partnerów w naturalnym, nieformalnym kontekście.",
  },
  {
    icon: Users,
    no: "04",
    title: "Ludzie",
    body: "Employer branding, lokalna społeczność pracowników i działania, w które można ich włączyć.",
  },
];

function DlaczegoPogon() {
  return (
    <section id="dlaczego-pogon" className={`bg-white ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Dlaczego Pogoń</span>
          <h2 className={H2}>
            Pogoń daje Hillwood coś więcej niż powierzchnię reklamową
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_POGON.map(({ icon: Icon, no, title, body }) => (
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

        <div className="mt-6 max-w-3xl rounded-xl border border-navy-100 bg-navy-50/40 p-7">
          <p className="text-[15px] leading-relaxed text-navy-900">
            Pogoń Grodzisk Mazowiecki rozgrywa obecnie swoje mecze w Pruszkowie,
            dzięki czemu klub funkcjonuje również w bezpośrednim otoczeniu
            lokalnego rynku biznesowego Hillwood.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------- 4. Trzy kierunki */

const DIRECTIONS: {
  icon: LucideIcon;
  no: string;
  name: string;
  goal: string;
  idea: string;
  actions: string[];
  themes?: string;
  key: string;
}[] = [
  {
    icon: HeartHandshake,
    no: "01",
    name: "Hillwood. Dobry sąsiad.",
    goal: "Lokalna społeczność, ESG, reputacja.",
    idea: "Hillwood wykorzystuje mecze i kanały Pogoni, żeby pokazać swoją obecność w regionie tam, gdzie mieszkańcy już są - a nie tylko we własnych materiałach.",
    actions: [
      "Lokalne aktywacje przy meczach",
      "Działania dla rodzin i mieszkańców",
      "Wspólne inicjatywy sportowe",
      "Komunikacja działań Hillwood na rzecz regionu",
      "Aktywacja związana z lokalną inwestycją w Chlebni",
      "Wybrane działania CSR",
    ],
    key: "Nie „Hillwood sponsoruje klub”, tylko „Hillwood jest aktywnym uczestnikiem lokalnego życia”.",
  },
  {
    icon: Building2,
    no: "02",
    name: "Hillwood Business Matchday",
    goal: "Relacje biznesowe i B2B.",
    idea: "Mecz Pogoni jako powód do spotkania: najemcy Hillwood, klienci, partnerzy, potencjalni klienci i lokalni przedsiębiorcy w jednym miejscu, bez formatu konferencji.",
    actions: [
      "VIP / hospitality",
      "Kameralne spotkanie biznesowe przed meczem",
      "Networking w trakcie dnia meczowego",
      "Wspólne zaproszenia dla najemców",
      "Dedykowana komunikacja dla zaproszonych gości",
      "Możliwość cyklu kilku spotkań w sezonie",
    ],
    key: "Nie kupujemy loży. Tworzymy okazję do spotkania.",
  },
  {
    icon: UsersRound,
    no: "03",
    name: "Hillwood People",
    goal: "Employer branding, ludzie, lokalny rynek pracy.",
    idea: "Seria krótkich materiałów o ludziach stojących za biznesem Hillwood i o ludziach sportu. Te same tematy, dwa różne konteksty - magazyn i boisko.",
    actions: [
      "Krótkie video",
      "Zdjęcia",
      "LinkedIn Hillwood",
      "Kanały social media Pogoni",
      "Materiały rekrutacyjne Hillwood",
    ],
    themes:
      "Praca zespołowa, odpowiedzialność, rozwój, różne role w jednym zespole, osiąganie celu, ludzie stojący za wynikiem.",
    key: "To employer branding, a nie kampania rekrutacyjna - nie obiecujemy liczby aplikacji.",
  },
];

function Kierunki() {
  return (
    <section id="kierunki" className={`bg-navy-950 ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-300">
            Kierunki współpracy
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
            Trzy kierunki. Każdy odpowiada na inny cel Hillwood.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-navy-200">
            Nie trzeba wybierać wszystkich trzech. Pilotaż ma sens wtedy, gdy
            sprawdzamy jeden kierunek na serio, a nie trzy po trochu.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DIRECTIONS.map(({ icon: Icon, no, name, goal, idea, actions, themes, key }) => (
            <div
              key={no}
              className="flex flex-col rounded-2xl border border-navy-800 bg-navy-900 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg border border-navy-800 bg-navy-950 text-navy-200">
                  <Icon className="size-5" />
                </div>
                <span className="text-[13px] font-semibold tabular-nums text-navy-300">
                  {no}
                </span>
              </div>

              <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-white">
                {name}
              </h3>

              <p className="mt-3 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-navy-300">
                Cel
              </p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-navy-100">
                {goal}
              </p>

              <p className="mt-4 text-[13.5px] leading-relaxed text-navy-200">
                {idea}
              </p>

              <p className="mt-5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-navy-300">
                Możliwe działania
              </p>
              <ul className="mt-2.5 space-y-2">
                {actions.map((action) => (
                  <li key={action} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className="mt-[7px] size-1.5 shrink-0 rounded-full bg-navy-400"
                    />
                    <span className="text-[13.5px] leading-relaxed text-navy-100">
                      {action}
                    </span>
                  </li>
                ))}
              </ul>

              {themes && (
                <p className="mt-4 text-[13px] leading-relaxed text-navy-300">
                  <span className="font-semibold text-navy-200">Tematy: </span>
                  {themes}
                </p>
              )}

              <p className="mt-auto border-t border-navy-800 pt-5 text-[14px] font-medium leading-snug text-white">
                {key}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-[13px] leading-relaxed text-navy-300">
          Zakres każdego kierunku ustalamy wspólnie z Klubem. Część działań to
          możliwości, a nie świadczenia gwarantowane - potwierdzamy je przed
          startem, zamiast obiecywać je na tym etapie.
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- 5. Pilotaż */

const PILOT_SCOPE = [
  "1 wybrany mecz jako Hillwood Business Matchday",
  "1 lokalna aktywacja lub działanie dla społeczności",
  "1 format employer brandingowy",
  "Obecność marki Hillwood w komunikacji Klubu",
  "Możliwość zaproszenia klientów, najemców i partnerów",
  "Podsumowanie wyników po zakończeniu pilotażu",
];

function Pilotaz() {
  return (
    <section id="pilotaz" className={`bg-white ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Koncepcja pilotażu</span>
          <h2 className={H2}>Nie proponujemy od razu całego sezonu.</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            Najpierw sprawdźmy jeden konkretny model współpracy.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div className="rounded-2xl border border-navy-100 bg-navy-50/40 p-7">
            <span className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-700">
              Rekomendacja
            </span>
            <p className="mt-4 text-[40px] font-semibold leading-none tracking-tight text-navy-950">
              60 dni
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
              Do wyboru jest wariant 30- lub 60-dniowy. Rekomendujemy 60 dni,
              bo w tym czasie da się zmieścić dzień meczowy z gośćmi, jedno
              działanie lokalne i materiał o ludziach - a potem jeszcze zdążyć
              to podsumować.
            </p>
            <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">
              Hillwood już działa lokalnie, więc nie sprawdzamy, czy warto
              inwestować w region. Sprawdzamy węższą rzecz: czy Pogoń jest
              wartościowym dodatkowym kanałem do tego, co Hillwood już robi.
            </p>
          </div>

          <div className="rounded-2xl border border-navy-100 bg-white p-7">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-700">
              Co zawiera pilotaż
            </h3>
            <ul className="mt-5 space-y-2.5">
              {PILOT_SCOPE.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden className={BULLET} />
                  <span className="text-[14.5px] leading-relaxed text-navy-800">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-navy-100 pt-5 text-[13.5px] leading-relaxed text-muted-foreground">
              Pilotaż ma dostarczyć dane, a nie je z góry obiecać. Wyników,
              których dziś nie znamy, nie deklarujemy w ofercie.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------- 6. Zakres dla Hillwood */

const DELIVERABLES: { icon: LucideIcon; tag: string; items: string[] }[] = [
  {
    icon: MapPin,
    tag: "Local",
    items: [
      "Obecność marki przy aktywacji",
      "Komunikacja lokalna",
      "Możliwość działań dla mieszkańców",
    ],
  },
  {
    icon: Handshake,
    tag: "Business",
    items: [
      "Hospitality podczas wybranego meczu",
      "Zaproszenia dla klientów i partnerów",
      "Networking w formacie dnia meczowego",
    ],
  },
  {
    icon: UsersRound,
    tag: "People",
    items: [
      "Content employer brandingowy",
      "Wykorzystanie kanałów Pogoni",
      "Materiały do wykorzystania w komunikacji Hillwood",
    ],
  },
  {
    icon: Camera,
    tag: "Content",
    items: [
      "Materiały foto i video",
      "Publikacje w social media",
      "Możliwość wykorzystania materiałów przez Hillwood",
    ],
  },
];

const MEASUREMENT_ITEMS = [
  "Liczba uczestników",
  "Zasięg komunikacji",
  "Wyświetlenia",
  "Zaangażowanie",
  "Liczba gości B2B",
  "Liczba aktywacji",
  "Jakościowe informacje zwrotne",
];

function Zakres() {
  return (
    <section id="zakres" className={`bg-navy-50/40 ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Zakres</span>
          <h2 className={H2}>Co dokładnie otrzymuje Hillwood</h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DELIVERABLES.map(({ icon: Icon, tag, items }) => (
            <div
              key={tag}
              className="flex flex-col rounded-xl border border-navy-100 bg-white p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-800">
                  <Icon className="size-5" />
                </div>
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-navy-700">
                  {tag}
                </span>
              </div>
              <ul className="mt-5 space-y-2.5">
                {items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden className={BULLET} />
                    <span className="text-[13.5px] leading-relaxed text-navy-800">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-navy-100 bg-white p-7">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-800">
              <BarChart3 className="size-5" />
            </div>
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-navy-700">
              Measurement
            </span>
          </div>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {MEASUREMENT_ITEMS.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span aria-hidden className={BULLET} />
                <span className="text-[13.5px] leading-relaxed text-navy-800">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
          Ostateczna lista świadczeń jest domykana z Klubem przy wyborze
          kierunku. To, co wymaga zgody Klubu lub osób trzecich, oznaczamy jako
          możliwość, a nie gwarancję.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- 7. Pomiar */

const MEASUREMENT_LEVELS: {
  icon: LucideIcon;
  tag: string;
  title: string;
  items: string[];
}[] = [
  {
    icon: Megaphone,
    tag: "Reach",
    title: "Ile osób to zobaczyło",
    items: ["Zasięg", "Wyświetlenia", "Liczba odbiorców"],
  },
  {
    icon: Users,
    tag: "Engagement",
    title: "Ile osób zareagowało",
    items: [
      "Interakcje",
      "Udział w aktywacjach",
      "Uczestnicy wydarzeń",
    ],
  },
  {
    icon: Handshake,
    tag: "Business / Relationships",
    title: "Co z tego zostało w relacjach",
    items: [
      "Liczba zaproszonych klientów i partnerów",
      "Liczba uczestników Business Matchday",
      "Liczba nowych kontaktów",
      "Feedback uczestników",
    ],
  },
];

function Pomiar() {
  return (
    <section id="pomiar" className={`bg-white ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Pomiar</span>
          <h2 className={H2}>
            Nie chcemy tylko pokazać logo. Chcemy wiedzieć, czy współpraca
            działa.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {MEASUREMENT_LEVELS.map(({ icon: Icon, tag, title, items }) => (
            <div
              key={tag}
              className="rounded-xl border border-navy-100 bg-white p-7"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-800">
                  <Icon className="size-5" />
                </div>
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-navy-700">
                  {tag}
                </span>
              </div>
              <h3 className="mt-5 text-[16.5px] font-semibold tracking-tight text-navy-950">
                {title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden className={BULLET} />
                    <span className="text-[13.5px] leading-relaxed text-navy-800">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 max-w-3xl rounded-xl border border-navy-100 bg-navy-50/40 p-7">
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-700">
            Wartości docelowe
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-navy-900">
            Nie wpisujemy tu liczb, których dziś nie znamy. Punkt odniesienia i
            wartości, które uznamy za sukces, ustalamy razem przed startem - a
            zasięgi kanałów Klubu potwierdzamy u niego, zamiast podawać je z
            pamięci.
          </p>
          <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
            Po zakończeniu pilotażu Hillwood dostaje jedno podsumowanie: co
            zostało zrobione, co wyszło, czego nie udało się zmierzyć i co z
            tego wynika dla decyzji o dalszej współpracy.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------- 8. Dlaczego teraz */

const NOW_ARGUMENTS: { title: string; body: string }[] = [
  {
    title: "Inwestycja w Grodzisku rośnie",
    body: "Hillwood Grodzisk Mazowiecki jest rozwijającą się inwestycją, a projekt jest dalej rozbudowywany.",
  },
  {
    title: "Baza najemców się buduje",
    body: "Hillwood rozwija bazę najemców - a najemcy to gotowa lista gości na Business Matchday.",
  },
  {
    title: "Relacje lokalne są w komunikacji",
    body: "Firma komunikuje znaczenie relacji z lokalnymi społecznościami, więc nie trzeba tego uzasadniać wewnętrznie od zera.",
  },
  {
    title: "Klub jest obecny w regionie",
    body: "Pogoń jest obecna sportowo w regionie i rozgrywa mecze w Pruszkowie, blisko lokalnego rynku biznesowego Hillwood.",
  },
];

function DlaczegoTeraz() {
  return (
    <section id="dlaczego-teraz" className={`bg-navy-50/40 ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Dlaczego teraz</span>
          <h2 className={H2}>To dobry moment, żeby sprawdzić ten model.</h2>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="flex flex-col rounded-2xl border border-navy-100 bg-navy-900 p-8">
            <p className="text-[40px] font-semibold leading-none tracking-tight text-white">
              ok. 87 800 m²
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-navy-200">
              docelowa powierzchnia parku Hillwood Grodzisk Mazowiecki w
              Chlebni.
            </p>
            <p className="mt-6 text-[14px] leading-relaxed text-navy-200">
              Im większy park i im więcej najemców, tym więcej osób w
              bezpośrednim otoczeniu inwestycji - i tym więcej powodów, żeby
              być tam obecnym inaczej niż billboardem.
            </p>
            <p className="mt-auto border-t border-navy-800 pt-5 text-[12.5px] leading-relaxed text-navy-300">
              Źródło: materiały i komunikacja Hillwood Polska.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {NOW_ARGUMENTS.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-navy-100 bg-white p-6"
              >
                <h3 className="text-[15px] font-semibold tracking-tight text-navy-950">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- 9. Inwestycja */

const PRICE_DRIVERS = [
  "Wybrany kierunek i cel pilotażu",
  "Czas trwania: 30 albo 60 dni",
  "Liczba i skala aktywacji",
  "Zakres dnia meczowego i liczba zaproszonych gości",
  "Zakres produkcji materiałów foto i video",
];

function Inwestycja() {
  return (
    <section id="inwestycja" className={`bg-white ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Inwestycja</span>
          <h2 className={H2}>Wariant pilotażowy</h2>
        </div>

        <div className="mt-10 max-w-3xl rounded-2xl border border-navy-100 bg-navy-900 p-8 md:p-10">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-[40px] font-semibold tracking-tight text-white">
              {HILLWOOD_OFFER_PRICE}
            </span>
          </div>
          <p className="mt-2 text-[14px] font-medium uppercase tracking-[0.16em] text-navy-300">
            Pilotaż 60 dni, jeden wybrany kierunek
          </p>

          <p className="mt-8 border-t border-navy-800 pt-8 text-[15px] leading-relaxed text-navy-100">
            Zakres i wartość pilotażu możemy dopasować do wybranego celu i
            liczby aktywacji. Dlatego nie wpisujemy tu kwoty, której nie da się
            jeszcze uczciwie podać - wyliczymy ją do wybranego wariantu.
          </p>

          <p className="mt-8 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-navy-300">
            Co wpływa na wycenę
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {PRICE_DRIVERS.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span
                  aria-hidden
                  className="mt-[7px] size-1.5 shrink-0 rounded-full bg-navy-400"
                />
                <span className="text-[13.5px] leading-relaxed text-navy-100">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 max-w-3xl rounded-xl border border-navy-100 bg-navy-50/40 p-7">
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-700">
            Dwa warianty do porównania
          </h3>
          <p className="mt-3 text-[14.5px] leading-relaxed text-navy-900">
            Ta strona opisuje węższy, pilotażowy model współpracy. W mailu
            znajduje się również klasyczna oferta partnerska Pogoni Grodzisk
            Mazowiecki w załączniku - pełny zakres świadczeń Klubu, do
            porównania z pilotażem.
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- 10. Co dalej */

const NEXT_STEPS: { no: string; title: string; body: string }[] = [
  {
    no: "01",
    title: "Wybór celu",
    body: "Społeczność, relacje biznesowe czy employer branding.",
  },
  {
    no: "02",
    title: "Wybór aktywacji",
    body: "Konkretny mecz, konkretne działanie, konkretny format.",
  },
  {
    no: "03",
    title: "Pilot 60 dni",
    body: "Realizacja ustalonego zakresu.",
  },
  {
    no: "04",
    title: "Pomiar",
    body: "Reach, engagement, relacje biznesowe i feedback.",
  },
  {
    no: "05",
    title: "Decyzja",
    body: "Rozszerzenie współpracy albo zamknięcie tematu na danych.",
  },
];

function CoDalej() {
  return (
    <section id="co-dalej" className={`bg-navy-50/40 ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Co dalej</span>
          <h2 className={H2}>Najpierw pilot. Potem decyzja.</h2>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {NEXT_STEPS.map((step) => (
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

        <div className="mt-8">
          <a
            href="#kontakt"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-navy-800 px-5 text-[14px] font-medium text-white transition-colors hover:bg-navy-900"
          >
            Porozmawiajmy o pilocie
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- 11. Kontakt */

function Kontakt() {
  return (
    <section id="kontakt" className="bg-navy-950">
      <div className="container py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-300">
            Kontakt
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
            Nie kolejny sponsor. Kolejna możliwość wykorzystania sportu.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-navy-200">
            Lokalna społeczność, relacje biznesowe, employer branding, content i
            ESG - w jednym miejscu, na jednym lokalnym rynku. Proponujemy
            sprawdzić to na jednym kierunku i jednym pilotażu, zanim ktokolwiek
            podpisze się pod całym sezonem.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-navy-800 bg-navy-900 p-6">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-300">
                Sport Space Pro
              </h3>
              <div className="mt-4 space-y-2.5 text-[14px] leading-relaxed text-navy-100">
                <p className="font-semibold text-white">Krzysztof Grzyb</p>
                <p className="flex items-center gap-2.5">
                  <Mail aria-hidden className="size-4 shrink-0 text-navy-300" />
                  <a
                    className="underline-offset-4 hover:underline"
                    href="mailto:krzysztof.grzyb@sportspacepro.pl"
                  >
                    krzysztof.grzyb@sportspacepro.pl
                  </a>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone aria-hidden className="size-4 shrink-0 text-navy-300" />
                  <a
                    className="underline-offset-4 hover:underline"
                    href="tel:+48532413777"
                  >
                    +48 532 413 777
                  </a>
                </p>
                <p className="flex items-center gap-2.5">
                  <Globe aria-hidden className="size-4 shrink-0 text-navy-300" />
                  <a
                    className="underline-offset-4 hover:underline"
                    href="https://sportspacepro.pl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    sportspacepro.pl
                  </a>
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-navy-800 bg-navy-900 p-6">
              <div>
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-300">
                  Propozycja dla
                </h3>
                <div className="mt-4 space-y-1 text-[14px] leading-relaxed text-navy-100">
                  <p className="font-semibold text-white">Joanna Zabadała</p>
                  <p>Marketing Director</p>
                  <p>Hillwood Polska</p>
                </div>
              </div>
              <a
                href={MAIL_HREF}
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-5 text-[14px] font-medium text-navy-950 transition-colors hover:bg-navy-100"
              >
                Napisz do nas
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HillwoodProposalPage() {
  return (
    <>
      <ProposalNav />
      <main>
        <Hero />
        <PunktWyjscia />
        <DlaczegoPogon />
        <Kierunki />
        <Pilotaz />
        <Zakres />
        <Pomiar />
        <DlaczegoTeraz />
        <Inwestycja />
        <CoDalej />
        <Kontakt />
      </main>
      <Footer />
    </>
  );
}

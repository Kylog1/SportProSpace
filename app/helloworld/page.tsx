import type { Metadata } from "next";
import {
  ArrowRight,
  Mail,
  MessageSquare,
  Share2,
  Users,
  Baby,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import { ProposalNav } from "@/components/helloworld/ProposalNav";

// Private proposal page for HelloWorld. Not linked from anywhere on the site
// and excluded from indexing on purpose - the recipient forwards the URL
// internally, and this is not meant to appear in search results.
export const metadata: Metadata = {
  title: "HelloWorld × Pogoń Grodzisk Mazowiecki - propozycja pilotażu",
  description:
    "30-dniowy pilotaż współpracy partnerskiej między HelloWorld a Pogonią Grodzisk Mazowiecki.",
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
            HelloWorld × Pogoń Grodzisk Mazowiecki
          </Badge>

          <h1 className="text-balance text-[36px] font-semibold leading-[1.05] tracking-tightest text-navy-950 sm:text-[44px] lg:text-[52px]">
            Sprawdźmy, jak skutecznie możemy połączyć markę HelloWorld ze
            społecznością Pogoni.
          </h1>

          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
            30-dniowy pilotaż współpracy, który łączy obecność marki przy
            Klubie z bezpośrednim dotarciem do kibiców i mierzeniem
            zainteresowania ofertą HelloWorld.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="flex items-baseline gap-2">
              <span className="text-[32px] font-semibold tracking-tight text-navy-950">
                30 dni
              </span>
            </div>
            <div className="h-8 w-px bg-navy-100" />
            <div className="flex items-baseline gap-2">
              <span className="text-[32px] font-semibold tracking-tight text-navy-950">
                10 000 zł
              </span>
              <span className="text-[14px] text-muted-foreground">netto</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#oferta"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-navy-800 px-5 text-[14px] font-medium text-white transition-colors hover:bg-navy-900"
            >
              Zobacz zakres pilotażu
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- 2. Punkt wyjścia */

const GOALS = [
  "czy oferta HelloWorld zainteresuje społeczność Pogoni",
  "które kanały działają najlepiej",
  "ile ruchu i zapytań możemy wygenerować",
  "czy warto rozwijać współpracę w modelu całorocznym",
];

function PunktWyjscia() {
  return (
    <section id="punkt-wyjscia" className={`bg-navy-50/40 ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Punkt wyjścia</span>
          <h2 className={H2}>Najpierw sprawdźmy kanał. Potem go skalujmy.</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            Produkty turystyczne o wartości kilku lub kilkunastu tysięcy
            złotych nie zawsze są kupowane impulsywnie. Dlatego nie chcemy
            oceniać współpracy wyłącznie przez pryzmat liczby rezerwacji
            dokonanych w ciągu 30 dni. Celem pilotażu jest sprawdzenie:
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {GOALS.map((goal) => (
            <div
              key={goal}
              className="flex gap-3 rounded-xl border border-navy-100 bg-white p-5"
            >
              <span
                aria-hidden
                className="mt-[7px] size-1.5 shrink-0 rounded-full bg-navy-800"
              />
              <span className="text-[14.5px] leading-relaxed text-navy-900">
                {goal}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-3xl rounded-xl border border-navy-100 bg-white p-7">
          <p className="text-[17px] font-semibold leading-snug tracking-tight text-navy-950">
            30 dni ma dać odpowiedź, czy warto inwestować kolejne 12 miesięcy.
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------- 3. Standard Partnera */

const STANDARD = [
  "Logotyp Partnera na stronie internetowej Klubu",
  "Informacja o współpracy w social mediach Klubu",
  "Konkurs partnerski z Klubem na voucher",
  "Prawo do wykorzystania wizerunku Klubu i herbu, zgodnie z zasadami Klubu",
  "5 biletów VIP na wybrany mecz",
];

function Standard() {
  return (
    <section id="oferta" className={`bg-white ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Co otrzymuje HelloWorld</span>
          <h2 className={H2}>
            Standard Partnera Klubu + dedykowane działania sprzedażowe
          </h2>
        </div>

        <div className="mt-10 max-w-3xl rounded-xl border border-navy-100 bg-navy-50/40 p-7">
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-700">
            Standardowe świadczenia
          </h3>
          <ul className="mt-5 space-y-2.5">
            {STANDARD.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span
                  aria-hidden
                  className="mt-[7px] size-1.5 shrink-0 rounded-full bg-navy-800"
                />
                <span className="text-[14.5px] leading-relaxed text-navy-800">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ 4. Opcje dedykowane */

const DEDICATED: {
  icon: LucideIcon;
  tag: string;
  title: string;
  body: string;
  note?: string;
}[] = [
  {
    icon: Mail,
    tag: "Newsletter",
    title: "Dedykowany newsletter",
    body: "1 dedykowana komunikacja mailingowa do grupy odbiorców, do której Klub może dotrzeć poprzez komunikację mailową, zgodnie z obowiązującymi zgodami i zasadami Klubu. W treści rekomendacja HelloWorld przez Klub oraz przejście do oferty.",
    note: "4600 osób w bazie, do której może wyjść newsletter.",
  },
  {
    icon: MessageSquare,
    tag: "PUSH / SMS",
    title: "PUSH lub SMS",
    body: "1 dodatkowa komunikacja PUSH lub SMS z bezpośrednim CTA.",
  },
  {
    icon: Share2,
    tag: "Social media",
    title: "Publikacje w social media",
    body: "1-2 publikacje w kanałach social media Pogoni.",
  },
  {
    icon: Users,
    tag: "Dzień meczowy",
    title: "Obecność podczas meczu",
    body: "Możliwość obecności marki podczas wybranego meczu poprzez roll-up, materiały promocyjne, ulotki i aktywację dla kibiców.",
  },
  {
    icon: Baby,
    tag: "Akademia",
    title: "Akademia Pogoni",
    body: "Przy ofercie rodzinnej możliwość dodatkowego dotarcia do rodziców zawodników Akademii - w zależności od możliwości Klubu poprzez ProTrainUp, zamknięte grupy WhatsApp lub zamknięte grupy Facebook dla rodziców.",
    note: "To możliwość komunikacji. Wykorzystanie danego kanału wymaga potwierdzenia przez Klub.",
  },
];

function Dedykowane() {
  return (
    <section id="dedykowane" className={`bg-navy-950 ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-300">
            Core oferty
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
            Nie chcemy tylko pokazać marki. Chcemy sprawdzić, czy możemy
            wygenerować zainteresowanie ofertą.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DEDICATED.map(({ icon: Icon, tag, title, body, note }) => (
            <div
              key={tag}
              className="flex flex-col rounded-2xl border border-navy-800 bg-navy-900 p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg border border-navy-800 bg-navy-950 text-navy-200">
                  <Icon className="size-5" />
                </div>
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-navy-300">
                  {tag}
                </span>
              </div>

              <h3 className="mt-5 text-[17px] font-semibold tracking-tight text-white">
                {title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-navy-200">
                {body}
              </p>

              {note && (
                <p className="mt-4 border-t border-navy-800 pt-4 text-[13px] leading-relaxed text-navy-300">
                  {note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------- 5. Do kogo docieramy */

const AUDIENCE: { icon: LucideIcon; no: string; title: string; body: string }[] = [
  {
    icon: Mail,
    no: "01",
    title: "Ok. 4 600 osób",
    body: "Odbiorcy, do których Klub może docierać poprzez komunikację mailową, zgodnie z obowiązującymi zgodami.",
  },
  {
    icon: Users,
    no: "02",
    title: "Kibice i społeczność lokalna",
    body: "Osoby docierające do Klubu poprzez social media, mecze i inne kanały komunikacji.",
  },
  {
    icon: Baby,
    no: "03",
    title: "Rodzice Akademii",
    body: "Rodzice młodych zawodników, do których w określonych przypadkach można dotrzeć poprzez ProTrainUp oraz zamknięte grupy WhatsApp / Facebook.",
  },
];

function Zasieg() {
  return (
    <section id="zasieg" className={`bg-navy-50/40 ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Do kogo docieramy</span>
          <h2 className={H2}>
            Społeczność, która zna Klub. Teraz sprawdzamy, czy zainteresuje ją
            także HelloWorld.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {AUDIENCE.map(({ icon: Icon, no, title, body }) => (
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

        <div className="mt-6 max-w-3xl rounded-xl border border-navy-100 bg-white p-7">
          <p className="text-[15px] leading-relaxed text-navy-900">
            Dopasowanie ofert do odbiorców jest naturalne:{" "}
            <strong className="font-semibold text-navy-950">
              ferie we Włoszech
            </strong>{" "}
            trafiają w rodziny z dziećmi, a{" "}
            <strong className="font-semibold text-navy-950">Tajlandia</strong>{" "}
            w osoby zainteresowane bardziej egzotycznym wyjazdem.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- 6. Jak mierzymy */

function Pomiar() {
  return (
    <section id="pomiar" className={`bg-white ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Jak mierzymy efekt</span>
          <h2 className={H2}>
            Nie obiecujemy sprzedaży. Budujemy możliwość jej zmierzenia.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-navy-100 bg-white p-7">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-700">
              Po stronie Pogoni
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
              Klub zapewnia komunikację oraz możliwość wykorzystania
              mechanizmu pozwalającego identyfikować źródło ruchu.
            </p>
          </div>
          <div className="rounded-xl border border-navy-100 bg-white p-7">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-700">
              Po stronie HelloWorld
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
              HelloWorld podpina własne narzędzia analityczne i mierzy ruch,
              zapytania, leady oraz rezerwacje po swojej stronie.
            </p>
          </div>
        </div>

        <div className="mt-6 max-w-3xl rounded-xl border border-navy-100 bg-navy-50/40 p-7">
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-700">
            Rekomendowany model
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-navy-900">
            Pogoń i HelloWorld mogą przygotować dedykowany landing page
            prezentujący ofertę HelloWorld - z ofertą, formularzem zapytania,
            CTA, korzyścią dla kibiców i trackingiem. Alternatywą jest
            dedykowany kod polecenia, np. HELLOPOGON.
          </p>
          <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
            To nie jest świadczenie gwarantowane przez Pogoń - mechanizm musi
            zostać przygotowany i wdrożony przez HelloWorld, wspólnie z Klubem,
            przed startem kampanii. Jako partner marketingowy mogę taki
            landing page zbudować.
          </p>
        </div>

        <div className="mt-10 max-w-2xl">
          <span className={EYEBROW}>KPI</span>
          <h3 className="mt-3 text-[20px] font-semibold tracking-tight text-navy-950">
            Po 30 dniach chcemy wiedzieć więcej niż pierwszego dnia.
          </h3>
        </div>

        <div className="mt-6 rounded-xl border border-navy-100 bg-white p-7">
          <div className="flex items-center gap-2.5">
            <BarChart3 className="size-4 text-navy-800" />
            <span className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-700">
              Co obserwujemy
            </span>
          </div>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {[
              "Liczba wejść na ofertę",
              "Liczba zapytań",
              "Liczba leadów",
              "Zainteresowanie poszczególnymi ofertami",
              "Wykorzystanie kodu, jeśli zostanie zastosowany",
              "Liczba rezerwacji przypisanych do działań Klubu",
              "Skuteczność poszczególnych kanałów",
            ].map((metric) => (
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
      </div>
    </section>
  );
}

/* -------------------------------------------------------- 7. Inwestycja */

const PACKAGE_ITEMS = [
  "Status Partnera Klubu",
  "Logotyp na stronie Klubu",
  "Informacja o współpracy w social mediach",
  "Konkurs partnerski z voucherem",
  "Prawo do wykorzystania wizerunku Klubu i herbu",
  "5 biletów VIP na wybrany mecz",
  "Dedykowany newsletter",
  "PUSH lub SMS",
  "1-2 publikacje w social mediach",
  "Możliwość aktywacji podczas dnia meczowego",
  "Możliwość komunikacji do rodziców Akademii",
  "Możliwość wspólnego przygotowania mechanizmu trackingu",
];

function Inwestycja() {
  return (
    <section id="inwestycja" className={`bg-navy-50/40 ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Inwestycja</span>
          <h2 className={H2}>30 dni. 10 000 zł netto.</h2>
        </div>

        <div className="mt-10 max-w-3xl rounded-2xl border border-navy-100 bg-navy-900 p-8 md:p-10">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-[44px] font-semibold tracking-tight text-white">
              10 000 zł
            </span>
            <span className="text-[15px] text-navy-300">netto</span>
          </div>
          <p className="mt-2 text-[14px] font-medium uppercase tracking-[0.16em] text-navy-300">
            30-dniowy pilotaż Partnera Klubu
          </p>

          <ul className="mt-8 grid gap-2.5 border-t border-navy-800 pt-8 sm:grid-cols-2">
            {PACKAGE_ITEMS.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-[3px] text-[13px] font-semibold text-navy-300">
                  ✓
                </span>
                <span className="text-[13.5px] leading-relaxed text-navy-100">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- 8. Co dalej */

const NEXT_STEPS: { no: string; title: string; body: string }[] = [
  {
    no: "01",
    title: "Pilotaż",
    body: "30 dni i konkretne działania.",
  },
  {
    no: "02",
    title: "Pomiar",
    body: "Ruch, zainteresowanie, leady, rezerwacje.",
  },
  {
    no: "03",
    title: "Wnioski",
    body: "Które kanały i formaty działają najlepiej.",
  },
  {
    no: "04",
    title: "Skalowanie",
    body: "Możliwość przejścia do współpracy całorocznej.",
  },
];

const SCALE_ITEMS = [
  "Większą liczbę komunikacji",
  "Większą obecność marki",
  "Kolejne aktywacje",
  "Oferty dedykowane kibicom",
  "Działania skierowane do rodzin i Akademii",
  "Rozszerzony pakiet sponsorski",
];

function CoDalej() {
  return (
    <section id="co-dalej" className={`bg-white ${SECTION}`}>
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <span className={EYEBROW}>Co dalej</span>
          <h2 className={H2}>Jeżeli działa, skalujemy.</h2>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

        <div className="mt-4 max-w-3xl rounded-xl border border-navy-100 bg-navy-50/40 p-7">
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-700">
            Współpraca całoroczna może obejmować
          </h3>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {SCALE_ITEMS.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span
                  aria-hidden
                  className="mt-[7px] size-1.5 shrink-0 rounded-full bg-navy-800"
                />
                <span className="text-[13.5px] leading-relaxed text-navy-800">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- 9. Zamknięcie */

function Zamkniecie() {
  return (
    <section id="zamkniecie" className="bg-navy-950">
      <div className="container py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-300">
            Propozycja
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
            Nie proponujemy rocznej umowy w ciemno.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-navy-200">
            Proponujemy 30 dni, w których możemy wspólnie sprawdzić, czy
            społeczność Pogoni jest wartościowym kanałem dla HelloWorld.
            Jeżeli dane pokażą potencjał, mamy podstawę, aby zwiększyć skalę.
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
        </div>
      </div>
    </section>
  );
}

export default function HelloWorldProposalPage() {
  return (
    <>
      <ProposalNav />
      <main>
        <Hero />
        <PunktWyjscia />
        <Standard />
        <Dedykowane />
        <Zasieg />
        <Pomiar />
        <Inwestycja />
        <CoDalej />
        <Zamkniecie />
      </main>
      <Footer />
    </>
  );
}

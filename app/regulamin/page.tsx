import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Regulamin - Sport Space Pro",
  description:
    "Regulamin korzystania z serwisu sportspacepro.pl, w tym z formularza kontaktowego i narzędzia Self-Audit.",
  alternates: {
    canonical: "https://sportspacepro.pl/regulamin",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const LAST_UPDATED = "18 sierpnia 2026";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <div className="container py-10 md:py-14">
          <div className="mx-auto max-w-3xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-muted-foreground">
              <Link href="/" className="hover:text-navy-950">
                Sport Space Pro
              </Link>
              <span>/</span>
              <span className="text-navy-950">Regulamin</span>
            </nav>

            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-[38px]">
              Regulamin serwisu
            </h1>
            <p className="mt-3 text-[14px] text-muted-foreground">
              Ostatnia aktualizacja: {LAST_UPDATED}
            </p>

            <div className="mt-8 border-t border-navy-100" />

            <div
              className="prose prose-navy mt-8 max-w-none text-[16px] leading-[1.8] text-navy-900
                [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-[22px] [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-navy-950
                [&_h2:first-child]:mt-0
                [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:text-navy-950
                [&_p]:mb-4 [&_p]:text-[15.5px] [&_p]:leading-relaxed [&_p]:text-navy-800
                [&_strong]:font-semibold [&_strong]:text-navy-950
                [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5
                [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5
                [&_li]:text-[15.5px] [&_li]:leading-relaxed [&_li]:text-navy-800
                [&_a]:font-medium [&_a]:text-navy-800 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-navy-950"
            >
              <h2>1. Postanowienia ogólne</h2>
              <p>
                Niniejszy Regulamin określa zasady korzystania z serwisu
                internetowego dostępnego pod adresem sportspacepro.pl
                (dalej: „Serwis"), prowadzonego pod marką Sport Space Pro
                przez podmiot dostępny pod adresem e-mail{" "}
                <a href="mailto:hello@sportspacepro.pl">
                  hello@sportspacepro.pl
                </a>{" "}
                (dalej: „Usługodawca").
              </p>
              <p>
                Korzystanie z Serwisu, w tym z formularza kontaktowego oraz
                narzędzia Self-Audit, oznacza akceptację niniejszego
                Regulaminu.
              </p>

              <h2>2. Definicje</h2>
              <ul>
                <li>
                  <strong>Serwis</strong> to strona internetowa
                  sportspacepro.pl wraz z jej podstronami.
                </li>
                <li>
                  <strong>Użytkownik</strong> to każda osoba korzystająca z
                  Serwisu.
                </li>
                <li>
                  <strong>Self-Audit</strong> to dostępny w Serwisie
                  kwestionariusz służący do orientacyjnej oceny wybranych
                  obszarów działania klubu lub organizacji sportowej, na
                  podstawie którego generowany jest raport w formacie PDF.
                </li>
              </ul>

              <h2>3. Zakres usług</h2>
              <p>Za pośrednictwem Serwisu Usługodawca udostępnia nieodpłatnie:</p>
              <ul>
                <li>
                  treści informacyjne dotyczące usług Sport Space Pro
                  (badania, analiza danych, doświadczenie klienta w
                  organizacjach sportowych);
                </li>
                <li>
                  formularz kontaktowy, umożliwiający przesłanie zapytania
                  do Usługodawcy;
                </li>
                <li>
                  narzędzie Self-Audit, pozwalające na wypełnienie
                  kwestionariusza dotyczącego wybranej dyscypliny sportu i
                  otrzymanie na wskazany adres e-mail raportu w formacie
                  PDF;
                </li>
                <li>
                  formularz zapisu na powiadomienie o dostępności Self-Audit
                  dla kolejnych dyscyplin.
                </li>
              </ul>

              <h2>4. Warunki korzystania z Serwisu</h2>
              <p>
                Do korzystania z Serwisu niezbędne jest urządzenie z
                dostępem do internetu oraz aktualna wersja przeglądarki
                internetowej.
              </p>
              <p>Użytkownika obowiązuje zakaz:</p>
              <ul>
                <li>
                  podawania w formularzach danych nieprawdziwych lub danych
                  osób trzecich bez ich zgody;
                </li>
                <li>
                  podejmowania działań mogących zakłócić prawidłowe
                  działanie Serwisu (np. automatyczne przeszukiwanie,
                  nadmierne obciążanie serwera, próby obejścia
                  zabezpieczeń);
                </li>
                <li>
                  wykorzystywania formularzy Serwisu do rozsyłania
                  niezamówionych treści (spamu).
                </li>
              </ul>
              <p>
                Naruszenie powyższych zasad może skutkować odmową
                świadczenia usługi w zakresie formularzy oraz
                zablokowaniem dostępu z danego adresu IP.
              </p>

              <h2>5. Self-Audit i charakter raportów</h2>
              <p>
                Wynik Self-Audit oraz generowany na jego podstawie raport
                PDF mają charakter orientacyjny i poglądowy. Opierają się
                wyłącznie na odpowiedziach udzielonych samodzielnie przez
                Użytkownika i nie stanowią porady prawnej, finansowej,
                doradczej ani wiążącej oceny działalności klubu lub
                organizacji. Decyzje biznesowe podjęte na podstawie wyniku
                Self-Audit Użytkownik podejmuje na własną odpowiedzialność.
              </p>
              <p>
                Wysłanie formularza Self-Audit wymaga zaznaczenia zgody na
                otrzymanie raportu PDF oraz kontakt w sprawie badania
                satysfakcji, zgodnie z opisem przy formularzu. Zgoda ta
                może być wycofana w każdym momencie poprzez kontakt na
                adres{" "}
                <a href="mailto:hello@sportspacepro.pl">
                  hello@sportspacepro.pl
                </a>
                .
              </p>

              <h2>6. Własność intelektualna</h2>
              <p>
                Wszelkie treści dostępne w Serwisie (w tym teksty,
                grafiki, układ strony, kwestionariusze Self-Audit oraz
                struktura generowanych raportów PDF) stanowią własność
                Usługodawcy lub podmiotów, z którymi Usługodawca zawarł
                odpowiednie umowy, i są chronione przepisami prawa
                autorskiego. Kopiowanie, rozpowszechnianie lub wykorzystanie
                tych treści w celach komercyjnych bez zgody Usługodawcy
                jest zabronione.
              </p>

              <h2>7. Ochrona danych osobowych</h2>
              <p>
                Zasady przetwarzania danych osobowych Użytkowników opisane
                są w{" "}
                <Link href="/polityka-prywatnosci">
                  Polityce Prywatności
                </Link>
                , stanowiącej integralne uzupełnienie niniejszego
                Regulaminu.
              </p>

              <h2>8. Odpowiedzialność</h2>
              <p>
                Usługodawca dokłada starań, aby Serwis działał poprawnie i
                był dostępny w sposób nieprzerwany, jednak nie gwarantuje
                braku przerw technicznych wynikających z konserwacji,
                aktualizacji lub przyczyn niezależnych od Usługodawcy (np.
                awarii po stronie dostawców hostingu czy poczty
                elektronicznej). Usługodawca nie odpowiada za szkody
                wynikające z korzystania z Serwisu w sposób niezgodny z
                Regulaminem lub obowiązującym prawem.
              </p>

              <h2>9. Reklamacje</h2>
              <p>
                Reklamacje dotyczące działania Serwisu, formularza
                kontaktowego lub Self-Audit można składać na adres e-mail{" "}
                <a href="mailto:hello@sportspacepro.pl">
                  hello@sportspacepro.pl
                </a>
                . Usługodawca rozpatruje reklamacje w terminie 14 dni od
                dnia ich otrzymania i informuje o rozstrzygnięciu na adres
                e-mail, z którego reklamacja została przesłana.
              </p>

              <h2>10. Zmiany Regulaminu</h2>
              <p>
                Usługodawca zastrzega sobie prawo do wprowadzania zmian w
                niniejszym Regulaminie, w szczególności w związku ze zmianą
                zakresu funkcjonalności Serwisu lub obowiązujących
                przepisów prawa. Aktualna wersja Regulaminu jest zawsze
                dostępna na tej podstronie.
              </p>

              <h2>11. Postanowienia końcowe</h2>
              <p>
                W sprawach nieuregulowanych niniejszym Regulaminem
                zastosowanie mają przepisy prawa polskiego, w tym Kodeksu
                cywilnego oraz ustawy o świadczeniu usług drogą
                elektroniczną. Wszelkie spory będą rozstrzygane przez sąd
                właściwy według obowiązujących przepisów.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

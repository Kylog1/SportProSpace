import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Polityka prywatności - Sport Space Pro",
  description:
    "Zasady przetwarzania danych osobowych i wykorzystywania plików cookies w serwisie sportspacepro.pl.",
  alternates: {
    canonical: "https://sportspacepro.pl/polityka-prywatnosci",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const LAST_UPDATED = "18 sierpnia 2026";

export default function PrivacyPolicyPage() {
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
              <span className="text-navy-950">Polityka prywatności</span>
            </nav>

            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-[38px]">
              Polityka prywatności
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
                [&_li]:text-[15.5px] [&_li]:leading-relaxed [&_li]:text-navy-800
                [&_a]:font-medium [&_a]:text-navy-800 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-navy-950"
            >
              <h2>1. Administrator danych</h2>
              <p>
                Administratorem danych osobowych przetwarzanych w związku z
                korzystaniem z serwisu internetowego sportspacepro.pl
                (dalej: „Serwis") jest podmiot prowadzący Serwis pod marką
                Sport Space Pro (dalej: „Administrator"). Kontakt w sprawach
                dotyczących ochrony danych osobowych jest możliwy pod
                adresem e-mail:{" "}
                <a href="mailto:hello@sportspacepro.pl">
                  hello@sportspacepro.pl
                </a>
                .
              </p>

              <h2>2. Jakie dane zbieramy i w jakim celu</h2>
              <p>
                Dane osobowe są przetwarzane wyłącznie w zakresie, w jakim
                Użytkownik samodzielnie je przekazuje, korzystając z
                formularzy dostępnych w Serwisie:
              </p>
              <ul>
                <li>
                  <strong>Formularz kontaktowy</strong>: imię i nazwisko,
                  adres e-mail, nazwa klubu / organizacji, numer telefonu
                  (opcjonalnie) oraz treść wiadomości. Dane te służą do
                  odpowiedzi na przesłane zapytanie.
                </li>
                <li>
                  <strong>Self-Audit</strong>: imię i nazwisko, adres
                  e-mail, nazwa klubu / organizacji, numer telefonu
                  (opcjonalnie) oraz odpowiedzi udzielone w kwestionariuszu.
                  Dane te służą do wygenerowania i przesłania raportu PDF na
                  wskazany adres e-mail oraz (wyłącznie po wyrażeniu
                  odrębnej zgody) do kontaktu w sprawie badania satysfakcji
                  i doświadczeń klientów.
                </li>
                <li>
                  <strong>Zapis na powiadomienie o nowej dyscyplinie</strong>:
                  adres e-mail oraz wskazana dyscyplina sportu, w celu
                  poinformowania o dostępności Self-Audit dla danej
                  dyscypliny.
                </li>
              </ul>
              <p>
                W ramach ochrony Serwisu przed nadużyciami (np. botami)
                automatycznie zapisywany jest adres IP Użytkownika. Jest on
                wykorzystywany jedynie do technicznego ograniczenia liczby
                zgłoszeń z jednego źródła w krótkim czasie i nie jest łączony
                z pozostałymi danymi ani wykorzystywany do profilowania.
              </p>

              <h2>3. Podstawa prawna przetwarzania</h2>
              <p>Dane osobowe przetwarzane są na podstawie:</p>
              <ul>
                <li>
                  art. 6 ust. 1 lit. b) RODO: w celu podjęcia działań przed
                  zawarciem umowy lub udzielenia odpowiedzi na zapytanie, na
                  żądanie osoby, której dane dotyczą;
                </li>
                <li>
                  art. 6 ust. 1 lit. a) RODO: w celu przesłania raportu
                  Self-Audit oraz ewentualnego kontaktu w sprawie badania, na
                  podstawie zgody wyrażonej w formularzu;
                </li>
                <li>
                  art. 6 ust. 1 lit. f) RODO: w celu zapewnienia
                  bezpieczeństwa Serwisu i przeciwdziałania nadużyciom
                  (prawnie uzasadniony interes Administratora).
                </li>
              </ul>

              <h2>4. Okres przechowywania danych</h2>
              <p>
                Dane przekazane w formularzu kontaktowym oraz w ramach
                Self-Audit przechowywane są przez czas niezbędny do
                obsłużenia zapytania oraz (jeśli doszło do dalszej
                współpracy) przez czas jej trwania, a następnie przez okres
                wymagany przepisami prawa (np. podatkowymi) lub do momentu
                wycofania zgody. Adresy IP zapisywane w celach
                antyspamowych są usuwane automatycznie po maksymalnie 30
                dniach.
              </p>

              <h2>5. Odbiorcy danych</h2>
              <p>
                Dane osobowe mogą być przekazywane podmiotom wspierającym
                działanie Serwisu, wyłącznie w zakresie niezbędnym do
                realizacji ich funkcji:
              </p>
              <ul>
                <li>
                  dostawcy usługi wysyłki wiadomości e-mail (Resend),
                  wykorzystywanej do przesyłania odpowiedzi na zapytania
                  oraz raportów Self-Audit;
                </li>
                <li>
                  dostawcy usługi hostingu i infrastruktury (Vercel), na
                  którym działa Serwis.
                </li>
              </ul>
              <p>
                Wskazani dostawcy mogą przetwarzać dane na serwerach
                znajdujących się poza Europejskim Obszarem Gospodarczym (np.
                w USA). W takich przypadkach przekazanie danych odbywa się z
                zapewnieniem odpowiedniego poziomu ochrony, w oparciu o
                standardowe klauzule umowne zatwierdzone przez Komisję
                Europejską.
              </p>

              <h2>6. Prawa osoby, której dane dotyczą</h2>
              <p>Każdej osobie, której dane są przetwarzane, przysługuje prawo do:</p>
              <ul>
                <li>dostępu do swoich danych oraz otrzymania ich kopii,</li>
                <li>sprostowania (poprawiania) danych,</li>
                <li>usunięcia danych,</li>
                <li>ograniczenia przetwarzania,</li>
                <li>przenoszenia danych,</li>
                <li>
                  wniesienia sprzeciwu wobec przetwarzania danych opartego na
                  prawnie uzasadnionym interesie Administratora,
                </li>
                <li>
                  wycofania zgody w każdym momencie, bez wpływu na zgodność
                  z prawem przetwarzania dokonanego przed jej wycofaniem,
                </li>
                <li>
                  wniesienia skargi do Prezesa Urzędu Ochrony Danych
                  Osobowych (UODO), jeśli uzna, że przetwarzanie jej danych
                  narusza obowiązujące przepisy.
                </li>
              </ul>
              <p>
                W celu realizacji powyższych praw prosimy o kontakt na adres{" "}
                <a href="mailto:hello@sportspacepro.pl">
                  hello@sportspacepro.pl
                </a>
                .
              </p>

              <h2>7. Pliki cookies i technologie śledzące</h2>
              <p>
                Serwis nie wykorzystuje plików cookies do celów
                marketingowych ani do śledzenia Użytkowników między
                stronami. Statystyki odwiedzin zbierane są za pomocą
                narzędzia Vercel Analytics, które działa bez plików cookies
                i nie przypisuje danych do konkretnej, zidentyfikowanej
                osoby. Zbierane informacje mają charakter zagregowany
                (np. liczba odwiedzin, kliknięcia w wybrane elementy
                Serwisu).
              </p>

              <h2>8. Bezpieczeństwo danych</h2>
              <p>
                Serwis działa w oparciu o połączenie szyfrowane (HTTPS) oraz
                stosuje mechanizmy zabezpieczające przed nieautoryzowanym
                dostępem, w tym ograniczenie liczby zgłoszeń z jednego
                adresu IP oraz zabezpieczenia przed botami w formularzach.
              </p>

              <h2>9. Zmiany Polityki Prywatności</h2>
              <p>
                Administrator zastrzega sobie prawo do wprowadzania zmian w
                niniejszej Polityce Prywatności, w szczególności w związku
                ze zmianą przepisów prawa lub zakresu funkcjonalności
                Serwisu. Aktualna wersja jest zawsze dostępna na tej
                podstronie.
              </p>

              <h2>10. Kontakt</h2>
              <p>
                Wszelkie pytania dotyczące niniejszej Polityki Prywatności
                oraz przetwarzania danych osobowych można kierować na adres
                e-mail:{" "}
                <a href="mailto:hello@sportspacepro.pl">
                  hello@sportspacepro.pl
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

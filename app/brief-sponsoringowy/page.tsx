import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { BriefDownloadForm } from "@/components/brief/BriefDownloadForm";

export const metadata: Metadata = {
  title: "Brief sponsoringowy marki - bezpłatny wzór .docx | Sport Space Pro",
  description:
    "Edytowalny wzór briefu sponsoringowego dla marek: 8 sekcji, cele i KPI, kryteria wyboru partnera sportowego oraz karta oceny propozycji. Pobierz za darmo.",
  alternates: {
    canonical: "https://sportspacepro.pl/brief-sponsoringowy",
  },
  openGraph: {
    title: "Brief sponsoringowy marki - bezpłatny wzór",
    description:
      "Wzór, który marka wypełnia, zanim poprosi klub, akademię lub zawodnika o ofertę. Plik Word z polami do wpisania.",
    type: "website",
  },
};

const SECTIONS = [
  ["Punkt wyjścia", "Problem biznesowy, który ma rozwiązać sponsoring"],
  ["Cel i miara sukcesu", "Jeden cel główny i tabela wskaźników"],
  ["Odbiorca", "Kogo chcecie poruszyć i gdzie"],
  ["Jakiego partnera szukamy", "Typ, skala, dyscypliny, czerwone flagi"],
  ["Co wnosimy", "Budżet na świadczenia i aktywację, własne zasoby"],
  ["Czego oczekujemy", "Świadczenia: musi być, mile widziane, niepotrzebne"],
  ["Granice i komunikacja", "Regulacje, ton marki, akceptacja treści"],
  ["Decyzja i harmonogram", "Terminy, decydenci, czego oczekujecie w odpowiedzi"],
] as const;

const STEPS = [
  {
    title: "Wypełnijcie go wspólnie",
    body: "Marketing, sprzedaż i osoba, która podpisze umowę, przy jednym stole. Rozbieżności wychodzą przed rozmową z partnerem, a nie po niej.",
  },
  {
    title: "Wyślijcie tę samą wersję do kilku partnerów",
    body: "Każdy odpowiada na te same pytania, więc propozycje da się uczciwie porównać.",
  },
  {
    title: "Oceńcie propozycje przed ceną",
    body: "Karta oceny z wagami na ostatniej stronie pomaga wybrać partnera, a nie najtańszy pakiet.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  name: "Brief sponsoringowy marki",
  url: "https://sportspacepro.pl/brief-sponsoringowy",
  inLanguage: "pl-PL",
  encodingFormat:
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  description:
    "Edytowalny wzór briefu sponsoringowego dla marek szukających partnera sportowego.",
  isAccessibleForFree: true,
  publisher: {
    "@type": "Organization",
    name: "Sport Space Pro",
    url: "https://sportspacepro.pl",
  },
};

export default function BriefPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
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
                <FileText className="size-3.5" />
                Bezpłatny wzór dla marek · Word (.docx)
              </Badge>

              <h1 className="text-balance text-[36px] font-semibold leading-[1.05] tracking-tightest text-navy-950 sm:text-[44px] lg:text-[52px]">
                Brief sponsoringowy <span className="text-navy-800">marki</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
                Dokument, który marka wypełnia, zanim poprosi klub, akademię,
                wydarzenie lub zawodnika o ofertę. Każdy potencjalny partner
                odpowiada wtedy na Wasz problem biznesowy, a nie przysyła
                cennika pakietów.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 lg:grid-cols-[1fr_1.15fr]">
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Co jest w środku
                </div>
                <ol className="mt-4 space-y-3">
                  {SECTIONS.map(([title, note], i) => (
                    <li key={title} className="flex gap-3">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-navy-50 text-[12px] font-semibold text-navy-800">
                        {i + 1}
                      </span>
                      <div>
                        <div className="text-[14.5px] font-medium text-navy-950">{title}</div>
                        <div className="text-[13px] text-muted-foreground">{note}</div>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 border-t border-navy-100 pt-4 text-[13.5px] leading-relaxed text-navy-800">
                  <span className="font-semibold text-navy-950">+ Karta oceny propozycji:</span>{" "}
                  sześć obszarów z wagami, żeby porównać partnerów, zanim
                  spojrzycie na cenę.
                </div>
              </div>

              <BriefDownloadForm className="mt-0" />
            </div>
          </div>
        </section>

        <section className="border-b border-navy-100 bg-navy-50/40">
          <div className="container py-14 md:py-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-navy-700">
                Jak z niego korzystać
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {STEPS.map((step, i) => (
                  <div key={step.title} className="rounded-xl border border-navy-100 bg-white p-5">
                    <div className="text-[12px] font-semibold text-navy-800">Krok {i + 1}</div>
                    <h3 className="mt-2 text-[15.5px] font-semibold tracking-tight text-navy-950">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/artykuly/brief-sponsoringowy-dla-marki-wzor"
                  className="group flex items-center justify-between gap-4 rounded-xl border border-navy-100 bg-white p-5 transition-all hover:border-navy-300"
                >
                  <div>
                    <div className="text-[14.5px] font-semibold text-navy-950">
                      Przeczytaj omówienie wszystkich sekcji
                    </div>
                    <div className="text-[13px] text-muted-foreground">
                      Co wpisać w każdą część briefu i dlaczego
                    </div>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-navy-800 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/commercial-score"
                  className="group flex items-center justify-between gap-4 rounded-xl border border-navy-100 bg-white p-5 transition-all hover:border-navy-300"
                >
                  <div>
                    <div className="text-[14.5px] font-semibold text-navy-950">
                      Commercial Score dla partnerów
                    </div>
                    <div className="text-[13px] text-muted-foreground">
                      Poproście kluby i zawodników o wynik 0-100
                    </div>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-navy-800 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

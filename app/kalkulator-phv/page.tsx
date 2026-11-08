import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PhvCalculator } from "@/components/phv/PhvCalculator";

export const metadata: Metadata = {
  title: "Kalkulator PHV dla rodziców i zawodników | Sport Space Pro",
  description:
    "Sprawdź, w którym momencie dojrzewania jest młody piłkarz lub piłkarka, i otrzymaj plan ćwiczeń, rollowania i żywienia dopasowany do fazy wzrostu. Dane nie opuszczają przeglądarki.",
  alternates: {
    canonical: "https://sportspacepro.pl/kalkulator-phv",
  },
};

export default function KalkulatorPhvPage() {
  return (
    <>
      <div className="print:hidden">
        <Navbar />
      </div>
      <main className="bg-white">
        <section className="mx-auto max-w-4xl px-4 pb-20 pt-16 sm:px-6">
          <div className="mb-8 flex flex-col gap-3 print:hidden">
            <span className="text-sm font-medium uppercase tracking-wider text-navy-800">
              Rodzic / Zawodnik
            </span>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-navy-950 sm:text-5xl">
              Kalkulator PHV
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Sprawdź, w którym momencie dojrzewania jest zawodnik lub zawodniczka, i otrzymaj dokument z planem ćwiczeń, rollowania i żywienia dopasowanym do tej fazy.
            </p>
          </div>
          <PhvCalculator />
        </section>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}

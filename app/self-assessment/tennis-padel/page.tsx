import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TennisPadelAssessment } from "@/components/TennisPadelAssessment";

export const metadata: Metadata = {
  title: "Self-Audit dla klubów tenisowych i padlowych - Sport Space Pro",
  description:
    "Policz, ile godzin na kortach stoi pustych poza szczytem i ile to kosztuje, a potem sprawdź w 16 pytaniach o procesy, gdzie Wasz klub traci potencjał wzrostu. Wynik 0-100, Top 3 obszary do poprawy i agenci AI na start.",
  alternates: {
    canonical: "https://sportspacepro.pl/self-assessment/tennis-padel",
  },
  openGraph: {
    title: "Self-Audit dla klubów tenisowych i padlowych",
    description:
      "Tennis & Padel Growth Score 0-100 w 6 obszarach: Attract, Activate, Engage, Retain, Expand, Insight.",
    type: "website",
  },
};

export default function TennisPadelSelfAuditPage() {
  return (
    <>
      <Navbar />
      <main>
        <TennisPadelAssessment />
      </main>
      <Footer />
    </>
  );
}

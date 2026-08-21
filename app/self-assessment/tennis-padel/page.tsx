import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TennisPadelAssessment } from "@/components/TennisPadelAssessment";

export const metadata: Metadata = {
  title: "Self-Audit dla klubów tenisowych i padlowych - Sport Space Pro",
  description:
    "18 pytań o procesy, nie o opinie. Sprawdź w kilka minut, gdzie Wasz klub tenisowy lub padlowy traci potencjał wzrostu, od pierwszej rezerwacji po rezygnację. Wynik 0-100 i Top 3 obszary do poprawy.",
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

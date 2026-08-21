import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FitnessAssessment } from "@/components/FitnessAssessment";

export const metadata: Metadata = {
  title: "Self-Audit dla klubów fitness i siłowni - Sport Space Pro",
  description:
    "18 pytań o procesy, nie o opinie. Sprawdź w kilka minut, gdzie Wasz klub fitness traci potencjał wzrostu, od pozyskania członka po jego rezygnację. Wynik 0-100 i Top 3 obszary do poprawy.",
  alternates: {
    canonical: "https://sportspacepro.pl/self-assessment/fitness",
  },
  openGraph: {
    title: "Self-Audit dla klubów fitness i siłowni",
    description:
      "Fitness Growth Score 0-100 w 6 obszarach: Attract, Activate, Engage, Retain, Expand, Insight.",
    type: "website",
  },
};

export default function FitnessSelfAuditPage() {
  return (
    <>
      <Navbar />
      <main>
        <FitnessAssessment />
      </main>
      <Footer />
    </>
  );
}

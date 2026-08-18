import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SelfAssessmentHub } from "@/components/SelfAssessmentHub";

export const metadata: Metadata = {
  title: "Self-Audit dla klubów i organizacji sportowych — Sport Space Pro",
  description:
    "Sprawdź potencjał swojego klubu. Self-Audit dopasowany do dyscypliny — piłka nożna, fitness, tenis i padel, golf, pływanie i inne organizacje sportowe.",
  alternates: {
    canonical: "https://sportspacepro.pl/self-assessment",
  },
  openGraph: {
    title: "Self-Audit dla klubów i organizacji sportowych",
    description:
      "Wybierz swoją dyscyplinę i sprawdź w kilka minut, gdzie Twoja organizacja jest mocna, a gdzie traci potencjał.",
    type: "website",
  },
};

export default function SelfAssessmentHubPage() {
  return (
    <>
      <Navbar />
      <main>
        <SelfAssessmentHub />
      </main>
      <Footer />
    </>
  );
}

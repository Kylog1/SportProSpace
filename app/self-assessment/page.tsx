import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SelfAssessment } from "@/components/SelfAssessment";

export const metadata: Metadata = {
  title:
    "Self Assessment dla klubów i akademii sportowych — Sport Space Pro",
  description:
    "12 pytań o procesy, nie o opinie. W 5 minut sprawdź, gdzie Twój klub realnie traci zawodników, rodziców i pieniądze. Z kalkulatorem strat z odejść.",
  openGraph: {
    title: "Self Assessment dla klubów i akademii sportowych",
    description:
      "Sprawdź, ilu zawodników stracicie w tym sezonie — zanim odejdą. 12 pytań, 4 poziomy dojrzałości organizacji, kalkulator strat.",
    type: "website",
  },
};

export default function SelfAssessmentPage() {
  return (
    <>
      <Navbar />
      <main>
        <SelfAssessment />
      </main>
      <Footer />
    </>
  );
}

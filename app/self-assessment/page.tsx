import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SelfAssessmentHub } from "@/components/SelfAssessmentHub";
import { FaqSection, type FaqItem } from "@/components/Faq";

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Ile trwa Self-Audit?",
    answer:
      "Kilka minut. To kilkanaście pytań o konkretne procesy w Twoim klubie - nie opinie ani deklaracje zarządu.",
  },
  {
    question: "Czy Self-Audit jest płatny?",
    answer: "Nie. To bezpłatne narzędzie diagnostyczne Sport Space Pro.",
  },
  {
    question: "Co dostanę na końcu?",
    answer:
      "Wynik 0-100, rozbicie na kluczowe obszary działania klubu i najważniejsze rzeczy do poprawy. Pełny raport wysyłamy na podany adres email.",
  },
  {
    question: "Dla jakich dyscyplin jest dostępny Self-Audit?",
    answer:
      "Obecnie dla piłki nożnej, fitness i siłowni oraz tenisa i padla. Golf, pływanie i kluby wielosekcyjne są w przygotowaniu - możesz zostać powiadomiony, gdy będą gotowe.",
  },
  {
    question: "Czym różni się Self-Audit od Commercial Score?",
    answer:
      "Self-Audit sprawdza procesy w Twoim klubie, które decydują o tym, czy zawodnicy i klienci zostają czy odchodzą. Commercial Score sprawdza, jak Wasz sportowy potencjał wygląda z perspektywy marki rozważającej sponsoring. To dwa różne pytania o tę samą organizację.",
  },
];

export const metadata: Metadata = {
  title: "Self-Audit dla klubów i organizacji sportowych - Sport Space Pro",
  description:
    "Sprawdź potencjał swojego klubu. Self-Audit dopasowany do dyscypliny: piłka nożna, fitness, tenis i padel, golf, pływanie i inne organizacje sportowe.",
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
        <FaqSection items={FAQ_ITEMS} />
      </main>
      <Footer />
    </>
  );
}

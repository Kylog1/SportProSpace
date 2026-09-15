import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScoreChooser } from "@/components/commercial-score/ScoreChooser";
import { FaqSection, type FaqItem } from "@/components/Faq";

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Ile trwa Commercial Score?",
    answer:
      "Kilka minut. To kilkanaście pytań, niezależnie od tego, czy liczysz wynik jako zawodnik, czy jako organizacja.",
  },
  {
    question: "Czy Commercial Score jest płatny?",
    answer: "Nie. To bezpłatne narzędzie Sport Space Pro.",
  },
  {
    question: "Co dostanę na końcu?",
    answer:
      "Wynik 0-100 i rozbicie na wszystkie badane kategorie. Zawodnik zobaczy zasięg, wartość sportową, content i gotowość do współpracy z markami. Organizacja: aktywa, ofertę, sprzedaż i mierzenie efektów. Wynik zobaczysz po podaniu adresu email.",
  },
  {
    question: "Czym różni się wynik dla zawodnika od wyniku dla organizacji?",
    answer:
      "Zawodnik dostaje Athlete Score, oceniający jego indywidualny potencjał komercyjny. Organizacja - klub, akademia, federacja albo organizator wydarzeń - dostaje Sponsorship Score, oceniający potencjał sponsorski całej organizacji.",
  },
];

export const metadata: Metadata = {
  title: "Commercial Score - sprawdź swój potencjał komercyjny | Sport Space Pro",
  description:
    "Bezpłatne narzędzie dla zawodników i organizacji sportowych. Sprawdź w kilka minut swój potencjał sponsorski i gotowość do współpracy z markami. Wynik 0-100 z rozbiciem na obszary.",
  alternates: {
    canonical: "https://sportspacepro.pl/commercial-score",
  },
  openGraph: {
    title: "Commercial Score - jaki jest Twój potencjał komercyjny?",
    description:
      "Sprawdź, jak dobrze Twój sportowy potencjał jest przygotowany do współpracy z markami. Osobne modele dla zawodnika i organizacji sportowej.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Sport Space Pro Commercial Score",
  url: "https://sportspacepro.pl/commercial-score",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "pl-PL",
  description:
    "Narzędzie diagnostyczne oceniające potencjał komercyjny zawodników i organizacji sportowych w skali 0-100.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "PLN",
  },
  provider: {
    "@type": "Organization",
    name: "Sport Space Pro",
    url: "https://sportspacepro.pl",
  },
};

export default function CommercialScorePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <ScoreChooser />
        <FaqSection items={FAQ_ITEMS} />
      </main>
      <Footer />
    </>
  );
}

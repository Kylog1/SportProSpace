import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sport Pro Space — Diagnoza i rozwój doświadczenia w sporcie",
  description:
    "Niezależne badania i analiza danych dla akademii sportowych i klubów profesjonalnych. Zrozum, dlaczego zawodnicy i kibice odchodzą — i co z tym zrobić.",
  metadataBase: new URL("https://sportspacepro.pl"),
  openGraph: {
    title: "Sport Pro Space",
    description:
      "Diagnoza i rozwój doświadczenia w sporcie. Badania zawodników, rodziców, członków Twojego klubu.",
    type: "website",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sport Pro Space",
  url: "https://sportspacepro.pl",
  logo: "https://sportspacepro.pl/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@sportprospace.eu",
    contactType: "customer support",
    availableLanguage: "Polish",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

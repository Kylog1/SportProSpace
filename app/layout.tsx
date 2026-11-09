import type { Metadata } from "next";
import {
  Archivo,
  Inter,
  Instrument_Sans,
  Martian_Mono,
} from "next/font/google";
// The /next entry point (not /react) groups page views by route pattern, so
// article pages report as /artykuly/[slug] instead of one row per slug.
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

// Hero + header only (see DESIGN.md, "Hero and header"). Inter stays the font
// of the rest of the site. Archivo is used on its width axis (font-stretch) for
// the headline and the big numbers, Martian Mono for labels, buttons and chips,
// Instrument Sans for the sentence under the headline.
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const martianMono = Martian_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-martian",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sport Space Pro - Growth & Experience Intelligence dla sportu",
  description:
    "Pomagamy klubom i organizacjom sportowym (fitness, tenis i padel, piłka nożna) zrozumieć doświadczenie klientów i wykorzystać potencjał wzrostu. Badania, analiza danych, Self-Audit i automatyzacje AI.",
  metadataBase: new URL("https://sportspacepro.pl"),
  verification: {
    google: "NEbz7XGlE1Uz6qw7iAjD_JceHCQjkbRssrfN_5YIMN4",
  },
  openGraph: {
    title: "Sport Space Pro - Growth & Experience Intelligence dla sportu",
    description:
      "Lepsze doświadczenia. Większe zaangażowanie. Realny wzrost. Badania, Self-Audit i automatyzacje AI dla klubów i organizacji sportowych różnych dyscyplin.",
    type: "website",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sport Space Pro",
  url: "https://sportspacepro.pl",
  logo: "https://sportspacepro.pl/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@sportspacepro.pl",
    contactType: "customer support",
    availableLanguage: "Polish",
  },
  sameAs: [
    "https://www.linkedin.com/company/sport-space-pro",
    "https://www.instagram.com/sport_space_pro/",
    "https://www.facebook.com/profile.php?id=61593570542780",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${archivo.variable} ${martianMono.variable} ${instrumentSans.variable}`}
    >
      <body className="min-h-screen bg-background font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

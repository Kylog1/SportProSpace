import type { Metadata } from "next";
import { Inter } from "next/font/google";
// The /next entry point (not /react) groups page views by route pattern, so
// article pages report as /artykuly/[slug] instead of one row per slug.
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sport Space Pro - Growth & Experience Intelligence dla sportu",
  description:
    "Pomagamy klubom i organizacjom sportowym (fitness, tenis i padel, golf, pływanie, piłka nożna) zrozumieć doświadczenie klientów i wykorzystać potencjał wzrostu. Self-Audit, badania i analiza danych.",
  metadataBase: new URL("https://sportspacepro.pl"),
  verification: {
    google: "NEbz7XGlE1Uz6qw7iAjD_JceHCQjkbRssrfN_5YIMN4",
  },
  openGraph: {
    title: "Sport Space Pro - Growth & Experience Intelligence dla sportu",
    description:
      "Lepsze doświadczenia. Większe zaangażowanie. Realny wzrost. Badania i Self-Audit dla klubów i organizacji sportowych różnych dyscyplin.",
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
        <Analytics />
      </body>
    </html>
  );
}

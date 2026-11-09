import type { Metadata } from "next";

// /artykuly is a client page (search and filters), so it cannot export metadata
// itself. Without this file the list inherited the home page's title and
// description. Article pages (/artykuly/[slug]) set their own metadata.
export const metadata: Metadata = {
  title: "Artykuły i raporty o doświadczeniu klientów w sporcie | Sport Space Pro",
  description:
    "Artykuły, raporty i materiały Sport Space Pro o retencji członków, NPS, sponsoringu sportowym i doświadczeniu klientów w klubach i akademiach sportowych.",
  alternates: {
    canonical: "https://sportspacepro.pl/artykuly",
  },
};

export default function ArtykulyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

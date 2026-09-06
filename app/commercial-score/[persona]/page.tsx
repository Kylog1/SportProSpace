import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommercialScoreFlow } from "@/components/commercial-score/CommercialScoreFlow";
import { PERSONA_LIST, personaBySlug } from "@/lib/commercial-score";

// Both personas share one route: they differ only by the config passed to the
// flow. A third persona later means one new config file and nothing here.

export function generateStaticParams() {
  return PERSONA_LIST.map((p) => ({ persona: p.slug }));
}

export const dynamicParams = false;

const META: Record<string, { title: string; description: string; og: string }> = {
  zawodnik: {
    title:
      "Athlete Commercial Score - potencjał komercyjny sportowca | Sport Space Pro",
    description:
      "Bezpłatny test dla sportowców. 15 pytań i Twoje zasięgi pokażą, jak wygląda Twoja gotowość do współpracy z markami i co ogranicza Twój potencjał komercyjny.",
    og: "Sprawdź swój potencjał komercyjny jako sportowiec. Wynik 0-100, rozbicie na 5 obszarów i trzy rzeczy do poprawy.",
  },
  organizacja: {
    title:
      "Sponsorship Commercial Score - potencjał sponsorski klubu | Sport Space Pro",
    description:
      "Bezpłatny test dla klubów, akademii, federacji i organizatorów wydarzeń. Sprawdźcie, gdzie leży niewykorzystany potencjał sponsorski Waszej organizacji.",
    og: "Sprawdźcie potencjał sponsorski swojej organizacji. Aktywa, oferta, sprzedaż i mierzenie efektów w jednym wyniku 0-100.",
  },
};

export function generateMetadata({
  params,
}: {
  params: { persona: string };
}): Metadata {
  const meta = META[params.persona];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://sportspacepro.pl/commercial-score/${params.persona}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.og,
      type: "website",
    },
  };
}

export default function PersonaPage({
  params,
}: {
  params: { persona: string };
}) {
  const config = personaBySlug(params.persona);
  if (!config) notFound();

  return (
    <>
      <Navbar />
      <main>
        <CommercialScoreFlow config={config} />
      </main>
      <Footer />
    </>
  );
}

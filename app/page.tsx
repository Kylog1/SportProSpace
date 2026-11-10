import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { JakDzialamy } from "@/components/sections/JakDzialamy";
import { SelfAuditPromo } from "@/components/sections/SelfAuditPromo";
import { About } from "@/components/sections/About";
import { Doradztwo } from "@/components/sections/Doradztwo";
import AgentsPitch from "@/components/sections/AgentsPitch";
import { CTASection } from "@/components/sections/CTASection";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Title and description come from the root layout; only the canonical URL is
// set here, so the home page has one.
export const metadata: Metadata = {
  alternates: { canonical: "https://sportspacepro.pl" },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        {/* Sections follow the header menu: Narzędzia (the free tools), Oferta
            (with the AI team, which is part of it), O nas, Jak działamy, then
            Kontakt. Artykuły and Partnerzy are separate pages. */}
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary>
          <SelfAuditPromo />
        </ErrorBoundary>
        {/* The "Nowe narzędzie" section (CommercialScorePromo) is hidden on
            request. To bring it back, import it from
            "@/components/sections/CommercialScorePromo" and render it here,
            between SelfAuditPromo and Doradztwo (it is a second tool). */}
        <ErrorBoundary>
          <Doradztwo />
        </ErrorBoundary>
        <ErrorBoundary>
          <AgentsPitch
            ctaHref="https://calendly.com/grzyb-krzysiek/new-meeting"
            auditHref="/self-assessment"
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <About />
        </ErrorBoundary>
        <ErrorBoundary>
          <JakDzialamy />
        </ErrorBoundary>
        <ErrorBoundary>
          <CTASection />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}

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

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary>
          <JakDzialamy />
        </ErrorBoundary>
        <ErrorBoundary>
          <SelfAuditPromo />
        </ErrorBoundary>
        {/* The "Nowe narzędzie" section (CommercialScorePromo) is hidden on
            request. To bring it back, import it from
            "@/components/sections/CommercialScorePromo" and render it here,
            between SelfAuditPromo and About. */}
        <ErrorBoundary>
          <About />
        </ErrorBoundary>
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
          <CTASection />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}

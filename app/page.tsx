import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { JakDzialamy } from "@/components/sections/JakDzialamy";
import { SelfAuditPromo } from "@/components/sections/SelfAuditPromo";
import { CommercialScorePromo } from "@/components/sections/CommercialScorePromo";
import { About } from "@/components/sections/About";
import { Doradztwo } from "@/components/sections/Doradztwo";
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
        <ErrorBoundary>
          <CommercialScorePromo />
        </ErrorBoundary>
        <ErrorBoundary>
          <About />
        </ErrorBoundary>
        <ErrorBoundary>
          <Doradztwo />
        </ErrorBoundary>
        <ErrorBoundary>
          <CTASection />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}

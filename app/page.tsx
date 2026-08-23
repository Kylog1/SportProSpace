import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { DlaKogo } from "@/components/sections/DlaKogo";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { JakDzialamy } from "@/components/sections/JakDzialamy";
import { CoBadamy } from "@/components/sections/CoBadamy";
import { SelfAuditPromo } from "@/components/sections/SelfAuditPromo";
import { Articles } from "@/components/sections/Articles";
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
          <DlaKogo />
        </ErrorBoundary>
        <ErrorBoundary>
          <ProblemSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <JakDzialamy />
        </ErrorBoundary>
        <ErrorBoundary>
          <CoBadamy />
        </ErrorBoundary>
        <ErrorBoundary>
          <SelfAuditPromo />
        </ErrorBoundary>
        <ErrorBoundary>
          <Articles />
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

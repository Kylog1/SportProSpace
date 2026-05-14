import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { About } from "@/components/sections/About";
import { HowWeHelp } from "@/components/sections/HowWeHelp";
import { Certification } from "@/components/sections/Certification";
import { SportTypes } from "@/components/sections/SportTypes";
import { CTASection } from "@/components/sections/CTASection";
import { Articles } from "@/components/sections/Articles";
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
          <ProblemSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <About />
        </ErrorBoundary>
        <ErrorBoundary>
          <HowWeHelp />
        </ErrorBoundary>
        <ErrorBoundary>
          <Certification />
        </ErrorBoundary>
        <ErrorBoundary>
          <SportTypes />
        </ErrorBoundary>
        <ErrorBoundary>
          <Articles />
        </ErrorBoundary>
        <ErrorBoundary>
          <CTASection />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}

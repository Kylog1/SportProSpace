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

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <About />
        <HowWeHelp />
        <Certification />
        <SportTypes />
        <Articles />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

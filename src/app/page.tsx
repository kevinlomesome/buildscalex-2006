import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { WhyUsSection } from "@/components/sections/why-us";
import { ProcessSection } from "@/components/sections/process";
import { IndustriesSection } from "@/components/sections/industries";
import { AiAutomationSection } from "@/components/sections/ai-automation";
import { ResultsSection } from "@/components/sections/results";
import { FaqSection } from "@/components/sections/faq";
import { CtaSection } from "@/components/sections/cta";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <ProcessSection />
      <IndustriesSection />
      <AiAutomationSection />
      <ResultsSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}

"use client";

import React, { useMemo } from "react";
import { useCMS } from "@/context/cms-context";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { WhyUsSection } from "@/components/sections/why-us";
import { ProcessSection } from "@/components/sections/process";
import { IndustriesSection } from "@/components/sections/industries";
import { AiAutomationSection } from "@/components/sections/ai-automation";
import { ResultsSection } from "@/components/sections/results";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq";
import { CtaSection } from "@/components/sections/cta";
import { defaultHomepageSections } from "@/lib/default-content";
import { HomepageSectionItem } from "@/lib/cms-types";

const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  hero: HeroSection,
  services: ServicesSection,
  "why-us": WhyUsSection,
  process: ProcessSection,
  industries: IndustriesSection,
  "ai-automation": AiAutomationSection,
  results: ResultsSection,
  testimonials: TestimonialsSection,
  faq: FaqSection,
  cta: CtaSection,
};

export function HomepageSectionsRenderer() {
  const { homepageSections } = useCMS();

  const sectionsToRender = useMemo(() => {
    const list: HomepageSectionItem[] =
      homepageSections && homepageSections.length > 0
        ? homepageSections
        : defaultHomepageSections;

    return [...list]
      .filter((s) => s.enabled !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [homepageSections]);

  return (
    <main className="flex flex-col w-full min-h-screen">
      {sectionsToRender.map((section) => {
        const Component = SECTION_COMPONENTS[section.id];
        if (!Component) return null;
        return <Component key={section.id} />;
      })}
    </main>
  );
}

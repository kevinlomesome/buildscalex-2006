import { ServicesSection } from "@/components/sections/services";
import { AiAutomationSection } from "@/components/sections/ai-automation";
import { CtaSection } from "@/components/sections/cta";
import { Shield, Sparkles, Zap } from "lucide-react";

export const metadata = {
  title: "Services & Solutions | Build Scale X",
  description: "Explore our premium growth services including custom web development, high-converting sales funnels, performance marketing, AI automation, and CRM integrations.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Services Hero Header */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Growth Infrastructure</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
            Engineered For{" "}
            <span className="text-primary">
              High Conversion
            </span>{" "}
            &amp; Scale.
          </h1>

          <p className="text-silver text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            We don't sell generic templates. We build bespoke digital systems that generate qualified pipeline, automate business friction, and compound revenue.
          </p>

          {/* Quick Pillars Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="glass p-3.5 rounded-xl border border-white/[0.08] flex items-center justify-center gap-2.5">
              <Zap className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs font-semibold text-foreground">8 Core Systems</span>
            </div>
            <div className="glass p-3.5 rounded-xl border border-white/[0.08] flex items-center justify-center gap-2.5">
              <Shield className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs font-semibold text-foreground">100% Handcrafted Code</span>
            </div>
            <div className="glass p-3.5 rounded-xl border border-white/[0.08] flex items-center justify-center gap-2.5">
              <Sparkles className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs font-semibold text-foreground">Lighthouse 95+ Standard</span>
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />
      <AiAutomationSection />
      <CtaSection />
    </div>
  );
}

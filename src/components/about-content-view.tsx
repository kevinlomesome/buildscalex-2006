"use client";

import { useCMS } from "@/context/cms-context";
import { WhyUsSection } from "@/components/sections/why-us";
import { CtaSection } from "@/components/sections/cta";
import { motion } from "framer-motion";
import { Sparkles, Target, Compass } from "lucide-react";

export function AboutContentView() {
  const { about } = useCMS();

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Header */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Growth Systems Engineering</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-foreground"
          >
            {about?.headline || "About Build Scale X"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-silver max-w-3xl mx-auto leading-relaxed"
          >
            {about?.subheadline ||
              "We are a premium growth systems agency dedicated to helping ambitious businesses scale through intelligent automation, modern design, and conversion-optimized architecture."}
          </motion.p>

          {/* Mission & Vision Cards if available */}
          {(about?.mission || about?.vision) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left"
            >
              {about.mission && (
                <div className="glass p-6 md:p-8 rounded-2xl border border-border/80">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">Our Mission</h3>
                  <p className="text-silver text-sm leading-relaxed">{about.mission}</p>
                </div>
              )}

              {about.vision && (
                <div className="glass p-6 md:p-8 rounded-2xl border border-border/80">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary mb-4">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">Our Vision</h3>
                  <p className="text-silver text-sm leading-relaxed">{about.vision}</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <WhyUsSection />
      <CtaSection />
    </div>
  );
}

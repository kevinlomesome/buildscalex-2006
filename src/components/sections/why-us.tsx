"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ShieldCheck, ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import { getWhatsAppLink } from "@/lib/constants";
import { useCMS } from "@/context/cms-context";

const conventionalFlaws = [
  "Bloated page-builder templates (Elementor/WordPress) that suffer sluggish load times",
  "Disconnected freelance subcontractors with no long-term technical accountability",
  "Manual lead handling creating 12-to-24 hour response decay and lost sales",
  "Isolated marketing campaigns running with zero CRM or backend telemetry integration",
  "Vendor lock-in with closed systems where you don't truly own your underlying code",
  "Opaque agency retainers charged without concrete architectural deliverables"
];

const buildscalexStandards = [
  "100% handcrafted Next.js 16 & React 19 architecture achieving sub-second loads",
  "Direct collaboration with senior full-stack architects and systems engineers",
  "Automated AI agent qualification and WhatsApp routing engaging leads in < 60 seconds",
  "End-to-end data synchronization across advertising, landing funnels, and CRM pipelines",
  "Complete intellectual property transfer with full GitHub repository source ownership",
  "Transparent, milestone-governed roadmaps with verified production acceptance tests"
];

export function WhyUsSection() {
  const { about } = useCMS();

  const flaws = about?.traditionalFlaws && about.traditionalFlaws.length > 0
    ? about.traditionalFlaws
    : conventionalFlaws;

  const standards = about?.bsxAdvantages && about.bsxAdvantages.length > 0
    ? about.bsxAdvantages
    : buildscalexStandards;

  return (
    <section className="py-20 md:py-28 relative bg-[#070910] border-y border-white/[0.06]">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-silver uppercase tracking-wider mb-5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>Methodology & Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            How BuildScaleX Operates Differently.
          </h2>
          <p className="text-silver text-base sm:text-lg leading-relaxed">
            Most businesses lose revenue not from lack of marketing, but from broken, slow, and fragmented digital systems. Here is how our engineering methodology compares.
          </p>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Conventional Model */}
          <div className="bg-[#0A0D15] border border-white/[0.06] p-8 md:p-10 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.06]">
                <div>
                  <span className="font-mono text-xs text-silver/60 uppercase tracking-wider block mb-1">
                    Industry Default
                  </span>
                  <h3 className="text-xl font-bold text-foreground/80">
                    Conventional Agency Approach
                  </h3>
                </div>
              </div>

              <ul className="space-y-4">
                {flaws.map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm text-silver/80 leading-relaxed gap-3">
                    <XCircle className="w-4 h-4 mt-0.5 text-destructive/80 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] text-xs text-silver/50 font-mono">
              Outcome: Fragile systems, high churn, and compounding technical debt.
            </div>
          </div>

          {/* BuildScaleX Engineering Standard */}
          <div className="bg-[#0E121E] border border-primary/30 p-8 md:p-10 rounded-2xl flex flex-col justify-between relative shadow-sm">
            <div className="absolute top-4 right-4">
              <span className="bg-primary/10 text-primary text-[11px] font-mono font-semibold px-3 py-1 rounded-full border border-primary/20">
                ENGINEERING STANDARD
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08]">
                <div>
                  <span className="font-mono text-xs text-primary uppercase tracking-wider block mb-1">
                    Architectural Excellence
                  </span>
                  <h3 className="text-xl font-bold text-foreground">
                    The BuildScaleX Standard
                  </h3>
                </div>
              </div>

              <ul className="space-y-4">
                {standards.map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm text-foreground font-medium leading-relaxed gap-3">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between gap-4">
              <span className="text-xs text-silver font-mono">
                Outcome: Predictable acquisition, sub-second speed, zero technical debt.
              </span>
              <Link
                href={getWhatsAppLink("Hi BuildScaleX, I would like to review our digital architecture.")}
                target="_blank"
                className="shrink-0 inline-flex items-center gap-1.5 text-xs text-primary hover:text-blue-400 font-semibold transition-colors"
              >
                <span>Consult</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

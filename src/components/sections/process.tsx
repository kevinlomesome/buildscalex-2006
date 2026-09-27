"use client";

import { motion } from "framer-motion";
import { Terminal, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getWhatsAppLink } from "@/lib/constants";
import { useCMS } from "@/context/cms-context";

const engineeringRoadmap = [
  {
    num: "01",
    title: "Technical Audit & Strategy Blueprint",
    desc: "We perform a comprehensive audit of your current digital touchpoints, lead capture bottlenecks, and technical infrastructure. We deliver a clear architectural blueprint defining tech stack, conversion flows, and automation integration points.",
    deliverable: "Strategic Growth Architecture Blueprint"
  },
  {
    num: "02",
    title: "Systems Architecture & UX Wireframing",
    desc: "Before writing production code, we design high-converting user journeys, data flow models, and interactive prototypes. Every page and funnel step is structured specifically for decision-maker clarity and conversion friction elimination.",
    deliverable: "Component Design System & Data Schema"
  },
  {
    num: "03",
    title: "Custom Engineering & Integration",
    desc: "We handcraft your production application using Next.js 16 App Router, React 19, and TypeScript. In parallel, we engineer AI agent models, WhatsApp Business API endpoints, and two-way CRM synchronization bridges.",
    deliverable: "Production Next.js Codebase & API Connectors"
  },
  {
    num: "04",
    title: "Rigorous QA, Speed & Conversion Verification",
    desc: "Every system undergoes strict quality assurance: Core Web Vitals profiling, end-to-end form submission testing, role-based security rules auditing, and responsive testing across all device viewports.",
    deliverable: "Lighthouse 95+ Score & Automated QA Certification"
  },
  {
    num: "05",
    title: "Cloud Infrastructure & Telemetry Launch",
    desc: "We deploy your system to production cloud infrastructure with edge CDN caching, automated SSL certification, DNS configuration, and server-side conversion tracking calibration (Meta CAPI & GA4).",
    deliverable: "Live Cloud Deployment & Telemetry Dashboard"
  },
  {
    num: "06",
    title: "Continuous Telemetry & Systematic Scaling",
    desc: "Following launch, we monitor real-time lead velocity, server response metrics, and conversion drop-offs. We iterate on high-impact bottlenecks to compound return on investment and maintain peak performance.",
    deliverable: "Ongoing Telemetry Reports & Codebase Maintenance"
  }
];

export function ProcessSection() {
  const { process: cmsProcess } = useCMS();
  
  const displaySteps = cmsProcess && cmsProcess.length > 0
    ? cmsProcess
        .filter((p: any) => p.active !== false)
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
        .map((p: any, idx: number) => ({
          num: String(idx + 1).padStart(2, "0"),
          title: p.title,
          desc: p.desc || p.description,
          deliverable: p.deliverable || "Verified Architectural Milestone"
        }))
    : engineeringRoadmap;

  return (
    <section id="process" className="py-20 md:py-28 relative bg-[#080A11] border-y border-white/[0.06]">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-silver uppercase tracking-wider mb-5">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span>Structured Execution Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            A Rigorous, Repeatable Engineering Process.
          </h2>
          <p className="text-silver text-base sm:text-lg leading-relaxed">
            From initial technical scoping to live telemetry and scaling, every project follows a disciplined engineering workflow with clear milestone sign-offs.
          </p>
        </div>

        {/* 6 Step Structured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displaySteps.map((step: any, index: number) => (
            <div
              key={index}
              className="bg-[#0C0F1A] border border-white/[0.06] hover:border-white/15 p-7 rounded-2xl flex flex-col justify-between transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
                  <span className="font-mono text-sm font-bold text-primary">
                    STAGE {step.num}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-silver/60 font-mono">
                    Milestone {index + 1}/6
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-silver leading-relaxed mb-6">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-foreground/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="line-clamp-1">{step.deliverable}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action Note */}
        <div className="mt-14 p-6 rounded-2xl bg-[#0C0F1A] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-semibold text-foreground">
              Ready to review your technical architecture?
            </h4>
            <p className="text-xs text-silver mt-0.5">
              Book a direct strategy consultation to map out your custom growth system roadmap.
            </p>
          </div>
          <Link
            href={getWhatsAppLink("Hi BuildScaleX, I would like to schedule a strategy roadmap call.")}
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-blue-600 text-white text-xs font-semibold transition-all active:scale-[0.99] shrink-0"
          >
            <span>Schedule Strategy Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}

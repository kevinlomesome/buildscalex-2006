"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  Server, 
  Database, 
  Lock,
  CheckCircle2,
  Layers,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { getWhatsAppLink } from "@/lib/constants";

const techStack = [
  { name: "Next.js 16 App Router", category: "Core Framework", desc: "Server Components & edge rendering for instant page transitions." },
  { name: "React 19", category: "UI Architecture", desc: "Concurrent rendering and optimized client-side state transitions." },
  { name: "TypeScript Strict Mode", category: "Type Safety", desc: "100% type-checked codebase eliminating unexpected runtime bugs." },
  { name: "Google Cloud Run & Edge", category: "Cloud Infrastructure", desc: "Auto-scaling serverless containers with global low-latency CDN." },
  { name: "Firebase Firestore", category: "Database Layer", desc: "Real-time NoSQL document store with strict role-based access rules." },
  { name: "Meta Conversions API", category: "Attribution Telemetry", desc: "Server-side tracking immune to browser ad-blockers and cookie decay." }
];

const engineeringPrinciples = [
  {
    icon: <Lock className="w-5 h-5 text-primary" />,
    title: "100% Intellectual Property Ownership",
    description: "Every line of source code, configuration file, database schema, and cloud deployment asset is transferred directly to your organization. Zero proprietary lock-in."
  },
  {
    icon: <Zap className="w-5 h-5 text-primary" />,
    title: "Rigorous Core Web Vitals Standards",
    description: "We optimize Largest Contentful Paint (LCP < 1.2s), Interaction to Next Paint (INP < 100ms), and Cumulative Layout Shift (CLS < 0.05) to ensure search engine dominance."
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    title: "Automated QA & Security Gatekeeping",
    description: "Before any deployment touches production, automated test suites verify route status, form input sanitization, database security rules, and responsive layouts."
  },
  {
    icon: <Terminal className="w-5 h-5 text-primary" />,
    title: "Direct Engineering Communication",
    description: "You work directly with senior systems architects and full-stack engineers via dedicated communication channels. No game of telephone through account managers."
  }
];

export function ResultsSection() {
  return (
    <section className="py-20 md:py-28 relative bg-[#06080F] border-y border-white/[0.06]">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-silver uppercase tracking-wider mb-5">
            <Cpu className="w-3.5 h-3.5 text-primary" />
            <span>Engineering Rigor & Technology Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Built on Enterprise Technical Standards.
          </h2>
          <p className="text-silver text-base sm:text-lg leading-relaxed">
            We don't invent fake reviews or vanity metrics. Our credibility is grounded in transparent engineering practices, verified technologies, and measurable technical deliverables.
          </p>
        </div>

        {/* 4 Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {engineeringPrinciples.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0B0E18] border border-white/[0.06] hover:border-white/15 p-8 rounded-2xl flex flex-col justify-between transition-all duration-200"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-silver leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Tech Stack Specification Strip */}
        <div className="p-8 rounded-2xl bg-[#090C16] border border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/[0.06]">
            <div>
              <span className="font-mono text-xs text-primary font-semibold uppercase tracking-wider block mb-1">
                Infrastructure Blueprint
              </span>
              <h3 className="text-xl font-bold text-foreground">
                Production Technology Stack
              </h3>
            </div>
            <span className="text-xs font-mono text-silver/60">
              Modern • Serverless • Edge Scalable
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-mono text-primary mb-1">
                    {tech.category}
                  </div>
                  <h4 className="text-sm font-bold text-foreground mb-1">
                    {tech.name}
                  </h4>
                  <p className="text-xs text-silver leading-relaxed">
                    {tech.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-silver">
            <span>Verified 100% clean code • Zero third-party page-builder dependencies</span>
            <Link
              href={getWhatsAppLink("Hi BuildScaleX, I would like to review our tech stack compatibility.")}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-primary hover:text-blue-400 font-semibold transition-colors"
            >
              <span>Consult an Engineer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

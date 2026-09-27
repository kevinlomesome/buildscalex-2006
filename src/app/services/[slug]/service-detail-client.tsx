"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Bot,
  Workflow,
  Target,
  Database,
  Cpu,
  Megaphone,
  TrendingUp,
  Layers,
  Code2,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Terminal,
  MessageSquare
} from "lucide-react";
import { ServiceItem } from "@/lib/cms-types";
import { useCMS } from "@/context/cms-context";
import { getWhatsAppLink } from "@/lib/constants";
import { CtaSection } from "@/components/sections/cta";

function resolveIcon(iconName?: string) {
  switch (iconName?.toLowerCase()) {
    case "globe":
    case "building":
    case "building2":
      return <Globe className="w-5 h-5 text-primary" />;
    case "bot":
      return <Bot className="w-5 h-5 text-primary" />;
    case "workflow":
      return <Workflow className="w-5 h-5 text-primary" />;
    case "target":
      return <Target className="w-5 h-5 text-primary" />;
    case "database":
      return <Database className="w-5 h-5 text-primary" />;
    case "cpu":
      return <Cpu className="w-5 h-5 text-primary" />;
    case "megaphone":
      return <Megaphone className="w-5 h-5 text-primary" />;
    case "trendingup":
    case "filter":
      return <TrendingUp className="w-5 h-5 text-primary" />;
    default:
      return <Layers className="w-5 h-5 text-primary" />;
  }
}

export function ServiceDetailClient({
  initialService,
  slug,
}: {
  initialService: ServiceItem;
  slug: string;
}) {
  const { services } = useCMS();

  // Real-time synchronization with CMS
  const service = useMemo(() => {
    if (!services || services.length === 0) return initialService;
    const normalizedSlug = slug.toLowerCase().replace(/^0\d+-/, "");
    const found = services.find(
      (s) =>
        s.id === slug ||
        s.id.toLowerCase().replace(/^0\d+-/, "") === normalizedSlug ||
        s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === normalizedSlug
    );
    return found || initialService;
  }, [services, slug, initialService]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Header */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden bg-[#06080E] border-b border-white/[0.06]">
        {/* Subtle grid and ambient illumination */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-silver mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-silver/40" />
            <Link href="/services" className="hover:text-foreground transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-silver/40" />
            <span className="text-primary font-semibold">{service.title}</span>
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-silver uppercase tracking-wider mb-6">
              <span className="font-mono text-primary font-bold">
                SYSTEM {service.number || "01"}
              </span>
              <span className="text-silver/40">•</span>
              <span>{service.subtitle || "Enterprise Growth Infrastructure"}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-silver leading-relaxed mb-10 max-w-3xl">
              {service.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href={getWhatsAppLink(
                  `Hi BuildScaleX, I would like to schedule a strategy consultation regarding ${service.title}.`
                )}
                target="_blank"
                className="w-full sm:w-auto bg-primary hover:bg-blue-600 text-white font-semibold rounded-xl px-8 py-4 text-sm sm:text-base transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer border border-primary/30"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Book Strategy Consultation</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>

              <Link
                href="#capabilities"
                className="w-full sm:w-auto bg-white/[0.04] hover:bg-white/[0.08] text-foreground border border-white/10 hover:border-white/20 font-medium rounded-xl px-7 py-4 text-sm sm:text-base transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-silver" />
                <span>Explore Capabilities</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities & Sub-Modules Section */}
      <section id="capabilities" className="py-20 md:py-28 relative bg-[#080A11] border-b border-white/[0.06]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-14 md:mb-16">
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-silver uppercase tracking-wider mb-5">
              <Code2 className="w-3.5 h-3.5 text-primary" />
              <span>Specialized Modules & Deliverables</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Engineered Capabilities & Solutions.
            </h2>
            <p className="text-silver text-base sm:text-lg leading-relaxed">
              Every system is customized for your operational requirements. Below are the core architectural modules and capabilities included in our {service.title} infrastructure.
            </p>
          </div>

          {service.categories && service.categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.categories.map((cat, idx) => (
                <div
                  key={cat.id || idx}
                  className="bg-[#0C0F1A] border border-white/[0.06] hover:border-white/15 p-6 md:p-7 rounded-2xl flex flex-col justify-between transition-all duration-200"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5">
                      {resolveIcon(cat.iconName)}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-silver leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-silver/60">Module {idx + 1}</span>
                    <span className="text-[11px] font-mono text-primary flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-primary" /> Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0C0F1A] border border-white/[0.06] p-8 rounded-2xl">
                <h3 className="text-lg font-bold text-foreground mb-3">Custom Enterprise Architecture</h3>
                <p className="text-sm text-silver leading-relaxed">
                  Tailored codebase engineered with Next.js 16, TypeScript, and edge cloud runtimes. Built from first principles to solve your specific commercial bottleneck.
                </p>
              </div>
              <div className="bg-[#0C0F1A] border border-white/[0.06] p-8 rounded-2xl">
                <h3 className="text-lg font-bold text-foreground mb-3">Complete Systems Integration</h3>
                <p className="text-sm text-silver leading-relaxed">
                  Direct connectivity to your CRM, payment gateways, analytics telemetry, and automated lead capture workflows with zero third-party platform lock-in.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Engineering Standards */}
      <section className="py-20 md:py-24 relative bg-[#06080E] border-b border-white/[0.06]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-2xl bg-[#0A0D18] border border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                Our Non-Negotiable Engineering Standards
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-silver">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>100% intellectual property transfer with full source code ownership</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Lighthouse 95+ Core Web Vitals optimization</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Real-time webhook telemetry & automated CRM synchronization</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Direct collaboration with senior software architects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Consultation CTA */}
      <CtaSection />
    </div>
  );
}

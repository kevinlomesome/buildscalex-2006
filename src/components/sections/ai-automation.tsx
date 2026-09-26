"use client";

import { motion } from "framer-motion";
import { MessageSquare, Workflow, Database, ArrowRight, CheckCircle2, ShieldCheck, Zap, GitBranch, Layers } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/constants";

const features = [
  {
    icon: <MessageSquare className="w-6 h-6 text-secondary" />,
    title: "Instant WhatsApp & Lead Automation",
    description: "Automated qualification sequences that engage prospects under 60 seconds, filter high-ticket clients, and schedule strategy calls without manual intervention."
  },
  {
    icon: <Workflow className="w-6 h-6 text-primary" />,
    title: "End-to-End Growth Funnel Architecture",
    description: "High-converting landing pages coupled with dynamic nurturing sequences that maximize customer lifetime value and eliminate drop-offs."
  },
  {
    icon: <Database className="w-6 h-6 text-accent" />,
    title: "Enterprise CRM & Data Synchronization",
    description: "Unify your marketing, ad spend, customer records, and lead routing into one automated dashboard. Zero duplicate entries, 100% data fidelity."
  }
];

export function AiAutomationSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-black/5 dark:bg-[#040711] border-y border-border">
      {/* Subtle Ambient Backlight */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <Zap className="w-3.5 h-3.5" />
              <span>Engineered For Speed & Conversion</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-foreground">
              Automated Systems That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500">
                Scale Your Revenue.
              </span>
            </h2>

            <p className="text-silver text-base md:text-lg mb-8 leading-relaxed">
              Manual lead handling creates costly friction and lost sales. We architect high-performance automation workflows and intelligent digital infrastructure that capture, qualify, and convert prospects around the clock.
            </p>
            
            <div className="space-y-6 mb-10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="p-3 glass rounded-2xl shrink-0 group-hover:border-primary/50 transition-colors shadow-sm">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1.5 text-foreground">{feature.title}</h3>
                    <p className="text-silver text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={getWhatsAppLink("Hi Build Scale X, I want to discuss automating my business workflows.")}
              target="_blank"
              className={buttonVariants({
                size: "lg",
                className: "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium px-8 py-6 rounded-2xl text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              })}
            >
              Automate My Business Growth
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>

          {/* Right Luxury Enterprise Pipeline Visualizer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="glass rounded-2xl md:rounded-3xl border border-border/80 p-6 md:p-8 shadow-xl relative overflow-hidden bg-card/60">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="text-xs font-mono text-silver ml-2">growth_pipeline.sys</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-primary font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span>STATUS: OPTIMAL</span>
                </div>
              </div>

              {/* Pipeline Flow Stages */}
              <div className="space-y-4">
                
                {/* Stage 1 */}
                <div className="p-4 rounded-xl md:rounded-2xl bg-black/5 dark:bg-white/[0.03] border border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xs font-mono">
                      01
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Targeted Traffic & Ad Ingestion</div>
                      <div className="text-[10px] text-silver">Meta Ads • SEO Search • Funnels</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-foreground bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-md">
                    100% INGESTED
                  </div>
                </div>

                {/* Flow Connector Line */}
                <div className="w-0.5 h-4 bg-gradient-to-b from-blue-500 to-cyan-400 mx-auto"></div>

                {/* Stage 2 */}
                <div className="p-4 rounded-xl md:rounded-2xl bg-black/5 dark:bg-white/[0.03] border border-cyan-500/30 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold text-xs font-mono">
                      02
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Instant Lead Qualification & Routing</div>
                      <div className="text-[10px] text-silver">Automated Criteria Filter • Under 60s</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-300 bg-cyan-500/15 px-2.5 py-1 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Flow Connector Line */}
                <div className="w-0.5 h-4 bg-gradient-to-b from-cyan-400 to-green-500 mx-auto"></div>

                {/* Stage 3 */}
                <div className="p-4 rounded-xl md:rounded-2xl bg-black/5 dark:bg-white/[0.03] border border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center font-bold text-xs font-mono">
                      03
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">WhatsApp Dispatch & CRM Synchronization</div>
                      <div className="text-[10px] text-silver">Calendar Scheduled • High-Ticket Alert</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-green-600 dark:text-green-300 bg-green-500/15 px-2.5 py-1 rounded-md">
                    AUTOMATED
                  </div>
                </div>

              </div>

              {/* Performance Metrics Bar */}
              <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-border/60 text-center">
                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/[0.02]">
                  <div className="text-base font-extrabold text-foreground font-heading">&lt; 60s</div>
                  <div className="text-[9px] uppercase tracking-wider text-silver">Response Speed</div>
                </div>
                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/[0.02]">
                  <div className="text-base font-extrabold text-primary font-heading">+240%</div>
                  <div className="text-[9px] uppercase tracking-wider text-silver">Lead Retention</div>
                </div>
                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/[0.02]">
                  <div className="text-base font-extrabold text-foreground font-heading">24/7/365</div>
                  <div className="text-[9px] uppercase tracking-wider text-silver">Zero Downtime</div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { MessageSquare, Workflow, Database, ArrowRight, CheckCircle2, ShieldCheck, Zap, Bot, Terminal, Calendar } from "lucide-react";
import Link from "next/link";
import { getWhatsAppLink } from "@/lib/constants";

const automationPillars = [
  {
    icon: <Bot className="w-5 h-5 text-primary" />,
    title: "Instant 24/7 AI Qualification",
    description: "Domain-trained conversational agents engage incoming prospects within 60 seconds, assess project scope against your criteria, and answer technical FAQs without human delay."
  },
  {
    icon: <Calendar className="w-5 h-5 text-primary" />,
    title: "Direct Calendar Booking Integration",
    description: "Once a prospect meets your qualification threshold, they are guided directly to your executive calendar. Unqualified inquiries are respectfully redirected, preserving your time."
  },
  {
    icon: <Database className="w-5 h-5 text-primary" />,
    title: "Two-Way CRM & Telemetry Synchronization",
    description: "All conversation records, lead responses, budget data, and attribution tags sync instantly to your CRM database. Zero manual data entry, 100% record accuracy."
  }
];

export function AiAutomationSection() {
  return (
    <section className="py-20 md:py-28 relative bg-[#06080F] border-y border-white/[0.06] overflow-hidden">
      
      {/* Soft atmospheric ambient light */}
      <div className="absolute top-1/2 right-1/4 w-[480px] h-[360px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-silver uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span>Operational Velocity & Lead Routing</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
              Eliminate Manual Lead Decay With Automated Inbound Pipelines.
            </h2>

            <p className="text-silver text-base md:text-lg leading-relaxed">
              Every hour a prospect waits for a response reduces conversion probability. We architect automated qualification systems that capture, assess, and schedule high-value clients instantaneously.
            </p>

            <div className="space-y-4 pt-2">
              {automationPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-4 hover:border-white/15 transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-silver leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href={getWhatsAppLink("Hi BuildScaleX, I want to discuss automating our inbound lead triage.")}
                target="_blank"
                className="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white font-semibold rounded-xl px-7 py-4 text-sm transition-all shadow-sm active:scale-[0.99]"
              >
                <span>Automate Lead Acquisition</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Architecture Simulation Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#0B0E18] rounded-2xl border border-white/[0.08] p-6 md:p-8 space-y-6 shadow-sm">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-white/10" />
                  <span className="w-3 h-3 rounded-full bg-white/10" />
                  <span className="w-3 h-3 rounded-full bg-white/10" />
                  <span className="text-xs font-mono text-silver ml-2">pipeline_telemetry.sys</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  LIVE 24/7
                </span>
              </div>

              {/* Step 1: Inbound Lead Capture */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-mono font-bold text-[11px]">
                    01
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block">Inbound Lead Captured</span>
                    <span className="text-silver text-[11px] font-mono">Channel: Web Form / WhatsApp API</span>
                  </div>
                </div>
                <span className="text-emerald-400 font-mono text-[11px]">&lt; 0.4s</span>
              </div>

              {/* Step 2: AI Triage & Verification */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-mono font-bold text-[11px]">
                    02
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block">AI Intent & Budget Triage</span>
                    <span className="text-silver text-[11px] font-mono">Status: Verified Enterprise Decision-Maker</span>
                  </div>
                </div>
                <span className="text-emerald-400 font-mono text-[11px]">&lt; 1.2s</span>
              </div>

              {/* Step 3: Calendar Booking Dispatch */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-mono font-bold text-[11px]">
                    03
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block">Direct Strategy Slot Booked</span>
                    <span className="text-silver text-[11px] font-mono">Action: Google Calendar & WhatsApp Confirmation</span>
                  </div>
                </div>
                <span className="text-emerald-400 font-mono text-[11px]">Confirmed</span>
              </div>

              {/* Step 4: CRM Synchronization */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-mono font-bold text-[11px]">
                    04
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block">CRM Database Sync</span>
                    <span className="text-silver text-[11px] font-mono">Target: Deal Pipeline & Attribution Analytics</span>
                  </div>
                </div>
                <span className="text-emerald-400 font-mono text-[11px]">Synchronized</span>
              </div>

              {/* Terminal Summary */}
              <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.05] font-mono text-[11px] text-silver space-y-1">
                <div className="text-emerald-400">✔ Autonomous Workflow Verified</div>
                <div>Avg Prospect Triage Latency: 22s</div>
                <div>Data Integrity: 100% (No Duplication / No Loss)</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Smartphone,
  Laptop,
  CheckCircle,
  IndianRupee,
  Layers,
  ArrowUpRight,
  Filter
} from "lucide-react";
import { subscribeToLeads } from "@/lib/firebase/services";
import { LeadRecord } from "@/lib/cms-types";

export default function AnalyticsPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToLeads((data) => {
      setLeads(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Compute metrics
  const totalLeads = leads.length;
  const whatsappLeads = leads.filter(
    (l) => l.source === "whatsapp_click" || l.source === "floating_whatsapp"
  ).length;
  const formLeads = leads.filter(
    (l) => l.source === "contact_form" || l.source === "header_cta"
  ).length;
  const wonLeads = leads.filter((l) => l.status === "won").length;
  const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : "0";

  // Top services tally
  const serviceCounts: Record<string, number> = {};
  leads.forEach((l) => {
    (l.services || []).forEach((s) => {
      serviceCounts[s] = (serviceCounts[s] || 0) + 1;
    });
  });

  const sortedServices = Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Status breakdown
  const statusCounts = {
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
    proposal_sent: leads.filter((l) => l.status === "proposal_sent").length,
    won: leads.filter((l) => l.status === "won").length,
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Growth & Pipeline Analytics
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-normal">
                  Real-time
                </span>
              </h1>
              <p className="text-sm text-silver">
                Performance breakdown of inbound deal velocity, qualification channels, and pipeline conversion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#090d1f]/90 border border-border/50 space-y-2">
          <div className="flex items-center justify-between text-xs text-silver font-mono">
            <span>Total Inbound Leads</span>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <p className="text-3xl font-extrabold text-white">{totalLeads}</p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active Pipeline Volume</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#090d1f]/90 border border-border/50 space-y-2">
          <div className="flex items-center justify-between text-xs text-silver font-mono">
            <span>WhatsApp Triggers</span>
            <MessageSquare className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-300">{whatsappLeads}</p>
          <div className="text-xs text-silver font-mono">
            {totalLeads > 0 ? ((whatsappLeads / totalLeads) * 100).toFixed(0) : 0}% of all inquiries
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#090d1f]/90 border border-border/50 space-y-2">
          <div className="flex items-center justify-between text-xs text-silver font-mono">
            <span>Form Submissions</span>
            <Layers className="w-4 h-4 text-accent-blue" />
          </div>
          <p className="text-3xl font-extrabold text-accent-blue">{formLeads}</p>
          <div className="text-xs text-silver font-mono">
            Direct detailed briefs
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#090d1f]/90 border border-border/50 space-y-2">
          <div className="flex items-center justify-between text-xs text-silver font-mono">
            <span>Won Deals / Clients</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{wonLeads}</p>
          <div className="flex items-center gap-1 text-xs text-emerald-400 font-mono">
            <span>{conversionRate}% Close Rate</span>
          </div>
        </div>
      </div>

      {/* Breakdown Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Stage Funnel */}
        <div className="p-6 rounded-2xl bg-[#090d1f]/80 border border-border/50 space-y-5">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" />
            <span>CRM Pipeline Funnel Breakdown</span>
          </h3>

          <div className="space-y-3">
            {[
              { label: "New Leads", count: statusCounts.new, color: "bg-primary" },
              { label: "Contacted", count: statusCounts.contacted, color: "bg-accent-blue" },
              { label: "Qualified", count: statusCounts.qualified, color: "bg-amber-400" },
              { label: "Proposal Sent", count: statusCounts.proposal_sent, color: "bg-purple-400" },
              { label: "Won Clients", count: statusCounts.won, color: "bg-emerald-400" },
            ].map((stage) => {
              const pct = totalLeads > 0 ? (stage.count / totalLeads) * 100 : 0;
              return (
                <div key={stage.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-white">{stage.label}</span>
                    <span className="font-mono text-silver">
                      {stage.count} ({pct.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#030612] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${stage.color} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Most Requested Services */}
        <div className="p-6 rounded-2xl bg-[#090d1f]/80 border border-border/50 space-y-5">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent-blue" />
            <span>Highest Demand Services</span>
          </h3>

          {sortedServices.length === 0 ? (
            <p className="text-xs text-silver py-8 text-center font-mono">
              Inbound lead submissions will automatically populate demand distribution.
            </p>
          ) : (
            <div className="space-y-3">
              {sortedServices.map(([svc, count]) => (
                <div
                  key={svc}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#030612] border border-border/40 text-xs"
                >
                  <span className="text-white font-medium">{svc}</span>
                  <span className="font-mono text-accent-blue font-bold px-2.5 py-0.5 rounded-full bg-accent-blue/10 border border-accent-blue/20">
                    {count} inquiries
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

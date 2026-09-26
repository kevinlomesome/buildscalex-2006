"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  TrendingUp,
  Clock,
  ArrowRight,
  Shield,
  Layers,
  Globe,
  Database,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { subscribeToLeads, seedDefaultDatabase } from "@/lib/firebase/services";
import { LeadRecord } from "@/lib/cms-types";
import { useAdminAuth } from "@/context/admin-auth-context";

export default function AdminDashboardPage() {
  const { user } = useAdminAuth();
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedNotice, setSeedNotice] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToLeads((fetchedLeads) => {
      setLeads(fetchedLeads);
    });
    return () => unsub();
  }, []);

  // Compute live metrics
  const now = Date.now();
  const oneDayAgo = now - 24 * 3600 * 1000;
  const oneWeekAgo = now - 7 * 24 * 3600 * 1000;
  const oneMonthAgo = now - 30 * 24 * 3600 * 1000;

  const totalLeads = leads.length;
  const todaysLeads = leads.filter((l) => (l.timestamp || 0) > oneDayAgo).length;
  const weeklyLeads = leads.filter((l) => (l.timestamp || 0) > oneWeekAgo).length;
  const monthlyLeads = leads.filter((l) => (l.timestamp || 0) > oneMonthAgo).length;
  const whatsappLeads = leads.filter((l) => l.source?.includes("whatsapp")).length;
  const contactFormLeads = leads.filter((l) => l.source === "contact_form" || !l.source).length;
  const qualifiedLeads = leads.filter((l) => l.status === "qualified" || l.status === "won").length;
  const conversionRate = totalLeads > 0 ? ((qualifiedLeads / totalLeads) * 100).toFixed(1) : "0.0";

  const handleSeed = async () => {
    setIsSeeding(true);
    setSeedNotice(null);
    try {
      const res = await seedDefaultDatabase();
      setSeedNotice(res.message);
    } catch (e: any) {
      setSeedNotice(e.message || "Seeding failed");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Executive Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl border border-border/80 bg-gradient-to-r from-blue-600/10 via-primary/5 to-cyan-500/10 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-heading">
              Welcome back, {user?.displayName || "Admin"}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-[#38BDF8] text-[10px] font-mono font-bold uppercase border border-primary/30">
              {user?.role}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-silver">
            Build Scale X Enterprise Super Admin Panel. Manage your CMS, CRM leads, and growth pipelines in realtime.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleSeed}
            disabled={isSeeding}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 text-[#38BDF8] text-xs font-semibold transition cursor-pointer disabled:opacity-50"
            title="Populate all 88 service categories, industries, and settings to Firebase"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? "animate-spin" : ""}`} />
            <span>{isSeeding ? "Seeding Data..." : "Seed Default CMS Data"}</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            <span>Live Website</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </div>

      {seedNotice && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-green-500/15 border border-green-500/30 text-green-300 text-xs font-medium flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
            <span>{seedNotice}</span>
          </div>
          <button onClick={() => setSeedNotice(null)} className="text-silver hover:text-white text-xs">
            Dismiss
          </button>
        </motion.div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <div className="p-5 rounded-2xl border border-border/80 bg-card/60 glass flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-silver font-medium">Total Inbound Leads</span>
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Users size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">
            {totalLeads}
          </div>
          <div className="text-[11px] text-silver mt-2 flex items-center gap-1 font-mono">
            <span className="text-[#38BDF8] font-bold">+{todaysLeads}</span>
            <span>new today</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-border/80 bg-card/60 glass flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-silver font-medium">WhatsApp Leads</span>
            <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
              <MessageSquare size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">
            {whatsappLeads}
          </div>
          <div className="text-[11px] text-silver mt-2 flex items-center gap-1 font-mono">
            <span className="text-green-400 font-bold">{totalLeads > 0 ? ((whatsappLeads / totalLeads) * 100).toFixed(0) : 0}%</span>
            <span>of total pipeline</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-border/80 bg-card/60 glass flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-silver font-medium">Form Submissions</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">
            {contactFormLeads}
          </div>
          <div className="text-[11px] text-silver mt-2 flex items-center gap-1 font-mono">
            <span>High-intent project forms</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-border/80 bg-card/60 glass flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-silver font-medium">Qualification Rate</span>
            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
              <Sparkles size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">
            {conversionRate}%
          </div>
          <div className="text-[11px] text-silver mt-2 flex items-center gap-1 font-mono">
            <span className="text-yellow-400 font-bold">{qualifiedLeads}</span>
            <span>qualified / closed</span>
          </div>
        </div>
      </div>

      {/* Main Row: Recent Leads Table & Quick CMS Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Leads CRM Feed */}
        <div className="lg:col-span-8 rounded-3xl border border-border/80 bg-card/60 glass p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading font-bold text-lg text-foreground">Recent Inbound Leads</h2>
              <p className="text-xs text-silver">Live inquiries from contact form and WhatsApp redirects</p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-[#38BDF8] hover:underline flex items-center gap-1"
            >
              <span>View Full CRM</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {leads.length === 0 ? (
            <div className="py-12 text-center text-silver text-sm">
              No leads recorded yet. Submissions from the contact form or WhatsApp buttons will appear here in realtime.
            </div>
          ) : (
            <div className="space-y-3">
              {leads.slice(0, 5).map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 rounded-2xl border border-border/60 bg-black/5 dark:bg-white/[0.02] hover:bg-black/10 dark:hover:bg-white/[0.04] transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-[#38BDF8] flex items-center justify-center font-bold text-xs shrink-0">
                      {lead.fullName?.charAt(0) || "L"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">{lead.fullName}</span>
                        {lead.company && (
                          <span className="text-xs text-silver">({lead.company})</span>
                        )}
                        <span
                          className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                            lead.status === "new"
                              ? "bg-primary/20 text-[#38BDF8]"
                              : lead.status === "qualified"
                              ? "bg-green-500/20 text-green-300"
                              : "bg-white/10 text-silver"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </div>
                      <div className="text-xs text-silver mt-0.5 flex flex-wrap gap-2">
                        <span>{lead.email}</span>
                        {lead.phone && <span>• {lead.phone}</span>}
                        {lead.budget && <span className="text-primary font-semibold">• {lead.budget}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <div className="text-[11px] text-silver/80 font-mono">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </div>
                    <span className="text-[10px] text-silver/60">
                      via {lead.source === "contact_form" ? "Form" : "WhatsApp"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Quick CMS Management Portals */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl border border-border/80 bg-card/60 glass p-6 shadow-xl">
            <h2 className="font-heading font-bold text-lg text-foreground mb-1">CMS Quick Actions</h2>
            <p className="text-xs text-silver mb-5">Instant access to dynamic section managers</p>

            <div className="space-y-2.5">
              <Link
                href="/admin/cms/services"
                className="flex items-center justify-between p-3.5 rounded-2xl border border-border/60 bg-black/5 dark:bg-white/[0.02] hover:border-primary/40 hover:bg-black/10 dark:hover:bg-white/[0.04] transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10 text-[#38BDF8]">
                    <Layers size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground group-hover:text-primary transition">
                      Services CMS
                    </div>
                    <div className="text-[10px] text-silver">7 Systems • 88 Categories</div>
                  </div>
                </div>
                <ArrowRight size={14} className="text-silver group-hover:text-primary group-hover:translate-x-0.5 transition" />
              </Link>

              <Link
                href="/admin/cms/contact"
                className="flex items-center justify-between p-3.5 rounded-2xl border border-border/60 bg-black/5 dark:bg-white/[0.02] hover:border-primary/40 hover:bg-black/10 dark:hover:bg-white/[0.04] transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Database size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground group-hover:text-cyan-400 transition">
                      Dynamic Form Builder
                    </div>
                    <div className="text-[10px] text-silver">Configure fields & pills</div>
                  </div>
                </div>
                <ArrowRight size={14} className="text-silver group-hover:text-cyan-400 group-hover:translate-x-0.5 transition" />
              </Link>

              <Link
                href="/admin/cms/homepage"
                className="flex items-center justify-between p-3.5 rounded-2xl border border-border/60 bg-black/5 dark:bg-white/[0.02] hover:border-primary/40 hover:bg-black/10 dark:hover:bg-white/[0.04] transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                    <Globe size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground group-hover:text-blue-400 transition">
                      Homepage CMS
                    </div>
                    <div className="text-[10px] text-silver">Hero, badges, statistics</div>
                  </div>
                </div>
                <ArrowRight size={14} className="text-silver group-hover:text-blue-400 group-hover:translate-x-0.5 transition" />
              </Link>

              <Link
                href="/admin/users"
                className="flex items-center justify-between p-3.5 rounded-2xl border border-border/60 bg-black/5 dark:bg-white/[0.02] hover:border-primary/40 hover:bg-black/10 dark:hover:bg-white/[0.04] transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <Shield size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground group-hover:text-amber-400 transition">
                      Role Permissions
                    </div>
                    <div className="text-[10px] text-silver">Super Admin access</div>
                  </div>
                </div>
                <ArrowRight size={14} className="text-silver group-hover:text-amber-400 group-hover:translate-x-0.5 transition" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

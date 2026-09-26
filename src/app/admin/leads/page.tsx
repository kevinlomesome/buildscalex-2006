"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  Download,
  Trash2,
  ExternalLink,
  MessageCircle,
  Mail,
  Building,
  Calendar,
  CheckCircle2,
  X,
  Phone,
  FileSpreadsheet
} from "lucide-react";
import { subscribeToLeads, updateLeadStatus, deleteLead } from "@/lib/firebase/services";
import { LeadRecord, LeadStatus } from "@/lib/cms-types";
import { useAdminAuth } from "@/context/admin-auth-context";
import { getWhatsAppLink } from "@/lib/constants";

const statusColors: Record<LeadStatus, string> = {
  new: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  contacted: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  qualified: "bg-green-500/15 text-green-400 border-green-500/30",
  proposal_sent: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  won: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold",
  lost: "bg-red-500/15 text-red-400 border-red-500/30",
  spam: "bg-gray-500/15 text-gray-400 border-gray-500/30",
};

export default function LeadsCrmPage() {
  const { canDelete } = useAdminAuth();
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [editingNotes, setEditingNotes] = useState("");
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);

  useEffect(() => {
    const unsub = subscribeToLeads((fetchedLeads) => {
      setLeads(fetchedLeads);
    });
    return () => unsub();
  }, []);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      (lead.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.phone || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleSelectLead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedLeadIds.length === filteredLeads.length) {
      setSelectedLeadIds([]);
    } else {
      setSelectedLeadIds(filteredLeads.map((l) => l.id));
    }
  };

  const handleBulkStatusChange = async (newStatus: LeadStatus) => {
    for (const id of selectedLeadIds) {
      await updateLeadStatus(id, newStatus);
    }
    setSelectedLeadIds([]);
  };

  const handleBulkDelete = async () => {
    if (confirm(`Are you sure you want to delete ${selectedLeadIds.length} leads?`)) {
      for (const id of selectedLeadIds) {
        await deleteLead(id);
      }
      setSelectedLeadIds([]);
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    await updateLeadStatus(leadId, newStatus);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    await updateLeadStatus(selectedLead.id, selectedLead.status, editingNotes);
    setSelectedLead({ ...selectedLead, notes: editingNotes });
  };

  const handleDelete = async (leadId: string) => {
    if (confirm("Are you sure you want to delete this lead record? This action is irreversible.")) {
      await deleteLead(leadId);
      if (selectedLead?.id === leadId) setSelectedLead(null);
    }
  };

  const exportToCSV = () => {
    if (filteredLeads.length === 0) {
      alert("No leads available to export.");
      return;
    }

    const headers = ["Lead ID", "Full Name", "Email", "Phone", "Company", "Services", "Budget", "Timeline", "Status", "Source", "Date", "Notes"];
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${l.fullName || ""}"`,
      `"${l.email || ""}"`,
      `"${l.phone || ""}"`,
      `"${l.company || ""}"`,
      `"${(l.services || []).join(", ")}"`,
      `"${l.budget || ""}"`,
      `"${l.timeline || ""}"`,
      l.status,
      l.source,
      new Date(l.createdAt).toLocaleDateString(),
      `"${(l.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `buildscalex_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-heading">
            Lead Management CRM
          </h1>
          <p className="text-xs sm:text-sm text-silver">
            Realtime lead capture database with automatic WhatsApp tracking and status pipeline.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/80 bg-card hover:bg-black/10 dark:hover:bg-white/5 text-foreground text-xs font-semibold shadow-sm transition cursor-pointer"
        >
          <FileSpreadsheet size={15} className="text-green-400" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between p-4 rounded-2xl border border-border/80 bg-card/60 glass">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-silver" />
          <input
            type="text"
            placeholder="Search by name, company, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/5 dark:bg-white/[0.03] border border-border rounded-xl py-2 pl-10 pr-4 text-xs text-foreground placeholder:text-silver focus:outline-none focus:border-primary transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["all", "new", "contacted", "qualified", "proposal_sent", "won", "lost"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize shrink-0 transition cursor-pointer ${
                statusFilter === st
                  ? "bg-primary text-white font-bold shadow-sm"
                  : "bg-black/5 dark:bg-white/[0.02] border border-border text-silver hover:text-foreground"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Action Toolbar */}
      <AnimatePresence>
        {selectedLeadIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-primary/10 border border-primary/30 shadow-lg text-xs"
          >
            <div className="flex items-center gap-2 text-white font-mono">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                {selectedLeadIds.length}
              </span>
              <span>Leads Selected</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-silver text-[11px] font-mono">Mark Status:</span>
              {(["contacted", "qualified", "proposal_sent", "won", "spam"] as LeadStatus[]).map((st) => (
                <button
                  key={st}
                  onClick={() => handleBulkStatusChange(st)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[10px] font-mono capitalize transition"
                >
                  {st.replace("_", " ")}
                </button>
              ))}

              <button
                onClick={handleBulkDelete}
                className="px-3 py-1 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:bg-rose-500/30 text-[10px] font-mono font-bold transition ml-2"
              >
                Delete Selected
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Leads Table */}
      <div className="rounded-3xl border border-border/80 bg-card/60 glass overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/70 bg-black/10 dark:bg-white/[0.02] text-silver font-mono uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-4 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedLeadIds.length === filteredLeads.length && filteredLeads.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded text-primary focus:ring-0 bg-transparent border-border cursor-pointer"
                  />
                </th>
                <th className="py-4 px-5">Lead / Contact</th>
                <th className="py-4 px-5">Company & Services</th>
                <th className="py-4 px-5">Budget & Timeline</th>
                <th className="py-4 px-5">Source</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-silver text-sm">
                    No leads matching your current criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => {
                      setSelectedLead(lead);
                      setEditingNotes(lead.notes || "");
                    }}
                    className={`hover:bg-black/5 dark:hover:bg-white/[0.02] transition cursor-pointer group ${
                      selectedLeadIds.includes(lead.id) ? "bg-primary/5" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedLeadIds.includes(lead.id)}
                        onChange={(e) => toggleSelectLead(lead.id, e as any)}
                        className="w-4 h-4 rounded text-primary focus:ring-0 bg-transparent border-border cursor-pointer"
                      />
                    </td>

                    {/* Lead Contact Info */}
                    <td className="py-4 px-5">
                      <div className="font-bold text-foreground group-hover:text-primary transition">
                        {lead.fullName}
                      </div>
                      <div className="text-silver text-[11px]">{lead.email}</div>
                      {lead.phone && <div className="text-silver/80 text-[10px] font-mono">{lead.phone}</div>}
                    </td>

                    {/* Company & Services */}
                    <td className="py-4 px-5 max-w-[200px]">
                      <div className="font-semibold text-foreground truncate">{lead.company || "N/A"}</div>
                      <div className="text-[11px] text-silver truncate">
                        {(lead.services || []).join(", ") || "General Inquiry"}
                      </div>
                    </td>

                    {/* Budget & Timeline */}
                    <td className="py-4 px-5">
                      <div className="font-semibold text-[#38BDF8]">{lead.budget || "Not Specified"}</div>
                      <div className="text-[10px] text-silver">{lead.timeline || "Flexible"}</div>
                    </td>

                    {/* Source */}
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1 text-[11px] text-silver font-mono">
                        {lead.source?.includes("whatsapp") ? (
                          <>
                            <MessageCircle size={12} className="text-green-400" />
                            <span>WhatsApp</span>
                          </>
                        ) : (
                          <>
                            <Mail size={12} className="text-cyan-400" />
                            <span>Form</span>
                          </>
                        )}
                      </span>
                      <div className="text-[10px] text-silver/60">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-5" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className={`text-[10px] font-mono font-bold uppercase rounded-lg px-2.5 py-1 border transition cursor-pointer ${
                          statusColors[lead.status] || "bg-white/10 text-white"
                        }`}
                      >
                        <option value="new" className="bg-[#050816] text-white">New</option>
                        <option value="contacted" className="bg-[#050816] text-white">Contacted</option>
                        <option value="qualified" className="bg-[#050816] text-white">Qualified</option>
                        <option value="proposal_sent" className="bg-[#050816] text-white">Proposal Sent</option>
                        <option value="won" className="bg-[#050816] text-white">Won</option>
                        <option value="lost" className="bg-[#050816] text-white">Lost</option>
                        <option value="spam" className="bg-[#050816] text-white">Spam</option>
                      </select>
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        {lead.phone && (
                          <a
                            href={getWhatsAppLink(`Hi ${lead.fullName}, thank you for contacting Build Scale X regarding your project.`)}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg border border-border text-green-400 hover:bg-green-500/10 transition"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle size={14} />
                          </a>
                        )}
                        {canDelete && (
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="p-1.5 rounded-lg border border-border text-silver hover:text-destructive hover:border-destructive/40 hover:bg-destructive/10 transition"
                            title="Delete Lead"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal Sheet */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#050816] border border-border/90 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedLead(null)}
                className="absolute top-5 right-5 p-1.5 rounded-xl border border-border text-silver hover:text-foreground"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase text-[#38BDF8] font-bold">
                  Lead Details • {selectedLead.id}
                </span>
                <h2 className="text-xl font-bold text-foreground mt-0.5">{selectedLead.fullName}</h2>
                <div className="text-xs text-silver mt-1">{selectedLead.company || "Individual Client"}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-black/20 border border-border/60 text-xs mb-6">
                <div>
                  <span className="text-[10px] text-silver block">Email</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-foreground hover:underline font-medium">
                    {selectedLead.email}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-silver block">Phone</span>
                  <span className="text-foreground font-medium">{selectedLead.phone || "N/A"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-silver block">Estimated Budget</span>
                  <span className="text-[#38BDF8] font-bold">{selectedLead.budget || "Not Specified"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-silver block">Timeline</span>
                  <span className="text-foreground font-medium">{selectedLead.timeline || "Flexible"}</span>
                </div>
              </div>

              {/* Services Selected */}
              {selectedLead.services && selectedLead.services.length > 0 && (
                <div className="mb-6">
                  <span className="text-xs font-semibold text-silver block mb-2">Services Requested</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLead.services.map((svc) => (
                      <span key={svc} className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[#38BDF8] font-medium">
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Description */}
              <div className="mb-6">
                <span className="text-xs font-semibold text-silver block mb-2">Project Vision & Message</span>
                <div className="p-4 rounded-xl bg-black/30 border border-border/70 text-xs text-silver leading-relaxed">
                  {selectedLead.description || "No message provided."}
                </div>
              </div>

              {/* Admin Internal Notes */}
              <div className="mb-6">
                <span className="text-xs font-semibold text-silver block mb-2">Internal CRM Notes</span>
                <textarea
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Add notes about call discussion, proposal status, or next follow-up..."
                  className="w-full bg-black/30 border border-border rounded-xl p-3 text-xs text-foreground focus:outline-none focus:border-primary min-h-[90px]"
                />
                <button
                  onClick={handleSaveNotes}
                  className="mt-2 px-3 py-1.5 rounded-lg bg-primary hover:bg-blue-600 text-white text-xs font-semibold cursor-pointer"
                >
                  Save Notes
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border/70">
                <div className="flex items-center gap-2">
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                    className="text-xs font-bold rounded-lg px-3 py-2 bg-black/40 border border-border text-foreground"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal_sent">Proposal Sent</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                    <option value="spam">Spam</option>
                  </select>
                </div>

                {selectedLead.phone && (
                  <a
                    href={getWhatsAppLink(`Hi ${selectedLead.fullName}, following up from Build Scale X regarding your inquiry.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md transition"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp Client</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  History,
  Shield,
  User,
  Clock,
  Search,
  Filter,
  Layers,
  Database
} from "lucide-react";
import { ActivityLog } from "@/lib/cms-types";
import { subscribeToActivityLogs } from "@/lib/firebase/services";

const DEFAULT_LOGS: ActivityLog[] = [
  {
    id: "act-1",
    userEmail: "admin@buildscalex.com",
    userName: "Super Admin",
    action: "Database Seed",
    target: "7 Services & 88 Categories",
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
    ipAddress: "127.0.0.1",
  },
  {
    id: "act-2",
    userEmail: "admin@buildscalex.com",
    userName: "Super Admin",
    action: "Updated CMS",
    target: "Contact Settings & Dynamic Form",
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    ipAddress: "127.0.0.1",
  },
  {
    id: "act-3",
    userEmail: "leadmanager@buildscalex.com",
    userName: "Lead Manager",
    action: "Status Changed",
    target: "Lead: Aarav Mehta -> Qualified",
    timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
    ipAddress: "192.168.1.10",
  },
  {
    id: "act-4",
    userEmail: "admin@buildscalex.com",
    userName: "Super Admin",
    action: "Successful Login",
    target: "Admin Session Established",
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    ipAddress: "127.0.0.1",
  },
];

export default function ActivityLogPage() {
  const [logs, setLogs] = useState<ActivityLog[]>(DEFAULT_LOGS);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsub = subscribeToActivityLogs((data) => {
      if (data && data.length > 0) setLogs(data);
    });
    return () => unsub();
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Audit Trail & Activity History
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-normal">
                  Immutable
                </span>
              </h1>
              <p className="text-sm text-silver">
                Chronological log of administrative operations, CMS edits, status updates, and session logins.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-silver" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter activity by action, target, or user..."
          className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#090d1f] border border-border/60 text-white text-xs placeholder-silver/50 focus:outline-none focus:border-primary"
        />
      </div>

      {/* Logs Table */}
      <div className="rounded-2xl bg-[#090d1f]/90 border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#030612] border-b border-border/40 text-silver font-mono">
              <tr>
                <th className="py-3.5 px-4 font-normal">Timestamp</th>
                <th className="py-3.5 px-4 font-normal">Admin User</th>
                <th className="py-3.5 px-4 font-normal">Action</th>
                <th className="py-3.5 px-4 font-normal">Target / Resource</th>
                <th className="py-3.5 px-4 font-normal">Device & Browser</th>
                <th className="py-3.5 px-4 font-normal text-right">Payload Snapshot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20 text-silver font-mono">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 text-silver/70 text-[11px] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">
                        {log.userName?.charAt(0) || "A"}
                      </div>
                      <span className="text-white text-xs font-sans truncate max-w-[160px]">{log.userEmail}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-white whitespace-nowrap">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-accent-blue text-xs font-sans font-medium">
                    <div>{log.target}</div>
                    {log.collectionName && (
                      <div className="text-[10px] text-silver/60 font-mono">
                        {log.collectionName}/{log.docId || "doc"}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-sans text-silver/80 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-mono text-silver">
                      {log.device || "Desktop"} • {log.browser || "Chrome"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-silver/60 text-[11px]">
                    {log.newValue ? (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                        {typeof log.newValue === "object" ? "JSON Object" : String(log.newValue).slice(0, 24)}
                      </span>
                    ) : (
                      <span className="text-[10px] text-silver/40 font-mono">synced</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

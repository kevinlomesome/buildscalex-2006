"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CheckCircle,
  MessageSquare,
  Users,
  Database,
  Layers,
  ArrowRight,
  Trash2,
  CheckCheck,
  Filter
} from "lucide-react";
import Link from "next/link";
import { AdminNotification } from "@/lib/cms-types";
import {
  subscribeToNotifications,
  markNotificationAsRead,
  clearAllNotifications
} from "@/lib/firebase/services";

export default function NotificationCenterPage() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    const unsub = subscribeToNotifications((notifs) => {
      setNotifications(notifs);
    });
    return () => unsub();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    if (filterType === "all") return true;
    if (filterType === "unread") return !n.read;
    return n.type === filterType;
  });

  const getIcon = (type: AdminNotification["type"]) => {
    switch (type) {
      case "lead":
        return <Users className="w-4 h-4 text-primary" />;
      case "contact":
        return <MessageSquare className="w-4 h-4 text-emerald-400" />;
      case "content_updated":
        return <Layers className="w-4 h-4 text-accent-blue" />;
      case "backup":
        return <Database className="w-4 h-4 text-purple-400" />;
      default:
        return <Bell className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-primary absolute top-2 right-2 animate-pulse" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Notification Center
                {unreadCount > 0 && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono font-bold">
                    {unreadCount} Unread
                  </span>
                )}
              </h1>
              <p className="text-sm text-silver">
                Real-time alerts for incoming leads, WhatsApp conversions, content updates, and cloud backups.
              </p>
            </div>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={() => clearAllNotifications()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-mono font-semibold transition-colors"
          >
            <CheckCheck className="w-4 h-4 text-emerald-400" />
            <span>Mark All As Read</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: "all", label: "All Alerts" },
          { id: "unread", label: `Unread (${unreadCount})` },
          { id: "lead", label: "Leads" },
          { id: "contact", label: "WhatsApp" },
          { id: "content_updated", label: "CMS Updates" },
          { id: "backup", label: "Backups" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-colors ${
              filterType === f.id
                ? "bg-primary text-white font-bold shadow-md shadow-primary/20"
                : "bg-white/5 text-silver hover:text-white border border-white/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              !item.read
                ? "bg-primary/5 border-primary/30 shadow-sm"
                : "bg-[#090d1f]/80 border-border/40 opacity-75"
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                  <span className="text-[10px] font-mono text-silver/60">
                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-silver leading-relaxed">{item.message}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              {item.link && (
                <Link
                  href={item.link}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-white font-medium transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary" />
                </Link>
              )}

              {!item.read && (
                <button
                  onClick={() => markNotificationAsRead(item.id)}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-emerald-500/10 text-silver hover:text-emerald-400 transition-colors"
                  title="Mark as read"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-[#090d1f]/40 border border-border/30">
            <p className="text-sm text-silver font-mono">No notifications found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

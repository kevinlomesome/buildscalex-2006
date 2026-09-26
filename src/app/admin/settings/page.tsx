"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Save,
  Check,
  Building,
  Database,
  AlertTriangle,
  RefreshCw,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Sparkles,
  ShieldCheck,
  Download,
  Upload,
  FileJson,
  Archive
} from "lucide-react";
import { defaultWebsiteSettings } from "@/lib/default-content";
import { WebsiteSettings } from "@/lib/cms-types";
import { saveDocData, seedDefaultDatabase, exportEntireDatabase, restoreEntireDatabase } from "@/lib/firebase/services";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { useCMS } from "@/context/cms-context";

export default function SettingsPage() {
  const { settings: initialSettings } = useCMS();
  const [settings, setSettings] = useState<WebsiteSettings>(initialSettings || defaultWebsiteSettings);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  // Seeding state
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);

  const handleSaveToFirestore = async () => {
    setSaving(true);
    setSavedSuccess(false);
    try {
      await saveDocData("settings", "general", settings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      alert("Failed to save website settings to Firebase");
    } finally {
      setSaving(false);
    }
  };

  const handleSeedDatabase = async () => {
    if (
      !confirm(
        "Are you sure you want to seed the database? This will populate all Firestore collections (Services with 88 categories, Industries, Process, FAQs, Contact Settings, SEO) with default production content."
      )
    ) {
      return;
    }

    setSeeding(true);
    setSeedSuccess(false);
    try {
      await seedDefaultDatabase();
      setSeedSuccess(true);
      setTimeout(() => setSeedSuccess(false), 4000);
    } catch (e) {
      alert("Database seed encountered an error. Check console.");
    } finally {
      setSeeding(false);
    }
  };

  const updateAddressLine = (index: number, val: string) => {
    setSettings((prev) => {
      const copy = [...prev.addressLines];
      copy[index] = val;
      return { ...prev, addressLines: copy };
    });
  };

  // Backup & Restore states
  const [exporting, setExporting] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [backupMessage, setBackupMessage] = useState<string | null>(null);

  const handleExportBackup = async () => {
    setExporting(true);
    setBackupMessage(null);
    try {
      const backup = await exportEntireDatabase();
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `buildscalex-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setBackupMessage("Database backup exported successfully!");
      setTimeout(() => setBackupMessage(null), 4000);
    } catch (e: any) {
      alert("Failed to export database backup: " + (e?.message || e));
    } finally {
      setExporting(false);
    }
  };

  const handleRestoreBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm(`Restore database from "${file.name}"? This will overwrite existing CMS documents with the backup contents.`)) {
      e.target.value = "";
      return;
    }

    setRestoring(true);
    setBackupMessage(null);
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      const res = await restoreEntireDatabase(json);
      if (res.success) {
        setBackupMessage(res.message);
        setTimeout(() => setBackupMessage(null), 5000);
      } else {
        alert("Restore failed: " + res.message);
      }
    } catch (err: any) {
      alert("Invalid backup file: " + (err?.message || err));
    } finally {
      setRestoring(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Website Settings & System Diagnostics
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-normal">
                  Live Synced
                </span>
              </h1>
              <p className="text-sm text-silver">
                Configure brand metadata, official agency contact channels, and initialize Cloud Firestore database collections.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveToFirestore}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent-blue text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {saving ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : savedSuccess ? (
              <Check className="w-4 h-4 text-emerald-300" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{savedSuccess ? "Saved to Cloud!" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Cloud Status Diagnostic Card */}
      <div className="p-6 rounded-2xl bg-[#090d1f] border border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              isFirebaseConfigured
                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
            }`}
          >
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">
                Firebase Firestore Status:
              </h3>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold ${
                  isFirebaseConfigured
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}
              >
                {isFirebaseConfigured
                  ? "Connected to Production"
                  : "Local Resilient Mode (Auto-Fallback)"}
              </span>
            </div>
            <p className="text-xs text-silver mt-1 max-w-xl">
              {isFirebaseConfigured
                ? "Active Firebase project credentials detected in .env.local. All changes sync in realtime to cloud collections."
                : "Using resilient local cache. To connect live cloud database, provide NEXT_PUBLIC_FIREBASE_API_KEY in .env.local. Seed database works in both modes."}
            </p>
          </div>
        </div>

        <button
          onClick={handleSeedDatabase}
          disabled={seeding}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-mono font-semibold transition-all shrink-0 active:scale-[0.98] disabled:opacity-50"
        >
          {seeding ? (
            <RefreshCw className="w-4 h-4 text-primary animate-spin" />
          ) : seedSuccess ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Sparkles className="w-4 h-4 text-accent-blue" />
          )}
          <span>
            {seeding
              ? "Seeding Collections..."
              : seedSuccess
              ? "All Collections Seeded!"
              : "1-Click Seed Full Database"}
          </span>
        </button>
      </div>

      {/* Enterprise Disaster Recovery & 1-Click Backup */}
      <div className="p-6 rounded-2xl bg-[#090d1f] border border-border/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue">
              <Archive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Enterprise Database Backup & Rollback
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20 font-mono">
                  JSON Snapshot
                </span>
              </h3>
              <p className="text-xs text-silver mt-0.5">
                Export all CMS collections, pages, leads, and settings to a portable JSON backup. Restore anytime with 1 click.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportBackup}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono font-semibold transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {exporting ? (
                <RefreshCw className="w-4 h-4 animate-spin text-accent-blue" />
              ) : (
                <Download className="w-4 h-4 text-accent-blue" />
              )}
              <span>{exporting ? "Generating..." : "Download Full JSON Backup"}</span>
            </button>

            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-xs font-mono font-semibold cursor-pointer transition-all active:scale-[0.98]">
              {restoring ? (
                <RefreshCw className="w-4 h-4 animate-spin text-primary" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              <span>{restoring ? "Restoring..." : "Restore From Backup"}</span>
              <input
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={handleRestoreBackup}
                disabled={restoring}
              />
            </label>
          </div>
        </div>

        {backupMessage && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{backupMessage}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Information */}
        <div className="p-6 rounded-2xl bg-[#090d1f]/80 border border-border/50 space-y-5">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Building className="w-4 h-4 text-primary" />
            <span>Brand Identity & Tagline</span>
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-silver mb-1.5">
                Company Name
              </label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) =>
                  setSettings({ ...settings, businessName: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-silver mb-1.5">
                Official Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) =>
                  setSettings({ ...settings, tagline: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-silver mb-1.5">
              Logo Emblem URL
            </label>
            <input
              type="text"
              value={settings.logoUrl}
              onChange={(e) =>
                setSettings({ ...settings, logoUrl: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm font-mono focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-silver mb-1.5">
              Copyright Footer Notice
            </label>
            <input
              type="text"
              value={settings.copyrightText}
              onChange={(e) =>
                setSettings({ ...settings, copyrightText: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Agency Communication Channels & Address */}
        <div className="p-6 rounded-2xl bg-[#090d1f]/80 border border-border/50 space-y-5">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Communication & Registered Location</span>
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-silver mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span>Agency Email</span>
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm font-mono focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-silver mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Routing Digits</span>
              </label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) =>
                  setSettings({ ...settings, whatsappNumber: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm font-mono focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-silver mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Physical Address Lines</span>
            </label>
            <div className="space-y-2">
              {settings.addressLines.map((line, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={line}
                  onChange={(e) => updateAddressLine(idx, e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#030612] border border-border/50 text-xs text-silver focus:text-white focus:outline-none focus:border-primary"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RotateCcw,
  History,
  Check,
  AlertCircle,
  FileCode,
  Clock,
  User,
  ArrowRight,
  Eye,
  Download,
  Layers,
  Globe,
  Info,
  HelpCircle,
  Mail,
  ShieldCheck
} from "lucide-react";
import { ContentVersion } from "@/lib/cms-types";
import { subscribeToVersions, restoreContentVersion, getDocData } from "@/lib/firebase/services";

interface TargetDoc {
  collection: string;
  docId: string;
  label: string;
  icon: any;
}

const AVAILABLE_TARGETS: TargetDoc[] = [
  { collection: "homepage", docId: "hero", label: "Homepage Hero", icon: Globe },
  { collection: "services", docId: "list", label: "Services & Categories", icon: Layers },
  { collection: "about", docId: "content", label: "About Agency", icon: Info },
  { collection: "faq", docId: "list", label: "FAQ Knowledgebase", icon: HelpCircle },
  { collection: "contact", docId: "config", label: "Contact & Forms", icon: Mail },
];

export default function VersionHistoryPage() {
  const [selectedTarget, setSelectedTarget] = useState<TargetDoc>(AVAILABLE_TARGETS[0]);
  const [versions, setVersions] = useState<ContentVersion[]>([]);
  const [activeVersion, setActiveVersion] = useState<ContentVersion | null>(null);
  const [liveDoc, setLiveDoc] = useState<any>(null);
  const [restoring, setRestoring] = useState(false);
  const [restoreStatus, setRestoreStatus] = useState<string | null>(null);

  // Subscribe to versions for selected target
  useEffect(() => {
    setActiveVersion(null);
    setRestoreStatus(null);
    
    // Fetch live data for comparison
    getDocData(selectedTarget.collection, selectedTarget.docId, null).then((data) => {
      setLiveDoc(data);
    });

    const unsub = subscribeToVersions(
      selectedTarget.collection,
      selectedTarget.docId,
      (cloudVersions) => {
        setVersions(cloudVersions);
        if (cloudVersions.length > 0 && !activeVersion) {
          setActiveVersion(cloudVersions[0]);
        }
      }
    );

    return () => unsub();
  }, [selectedTarget]);

  const handleRollback = async (version: ContentVersion) => {
    if (
      !confirm(
        `Are you sure you want to restore ${selectedTarget.label} to version from ${new Date(
          version.timestamp
        ).toLocaleString()}? This will publish this version immediately to the live website.`
      )
    ) {
      return;
    }

    setRestoring(true);
    setRestoreStatus(null);
    try {
      const ok = await restoreContentVersion(version);
      if (ok) {
        setRestoreStatus("Version restored and published live successfully!");
        setLiveDoc(version.data);
        setTimeout(() => setRestoreStatus(null), 4000);
      } else {
        alert("Rollback failed. Please try again.");
      }
    } catch (e: any) {
      alert("Error restoring version: " + (e?.message || e));
    } finally {
      setRestoring(false);
    }
  };

  const handleDownloadVersion = (version: ContentVersion) => {
    const blob = new Blob([JSON.stringify(version, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `version-${version.collectionName}-${version.docId}-${version.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Version History & 1-Click Rollback
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue font-mono font-normal">
                  Point-In-Time Recovery
                </span>
              </h1>
              <p className="text-sm text-silver">
                Every edit to homepage, services, about, and FAQ creates an immutable historical version snapshot.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Target Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/30 pb-4">
        {AVAILABLE_TARGETS.map((target) => {
          const Icon = target.icon;
          const isSelected =
            selectedTarget.collection === target.collection &&
            selectedTarget.docId === target.docId;
          return (
            <button
              key={`${target.collection}_${target.docId}`}
              onClick={() => setSelectedTarget(target)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                isSelected
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-[#090d1f] border border-border/60 text-silver hover:text-white hover:border-border"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{target.label}</span>
            </button>
          );
        })}
      </div>

      {restoreStatus && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{restoreStatus}</span>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Versions Timeline */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-silver flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>Recorded Versions ({versions.length})</span>
          </h3>

          {versions.length === 0 ? (
            <div className="p-6 rounded-2xl bg-[#090d1f] border border-border/50 text-center space-y-2">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto opacity-70" />
              <p className="text-xs text-white font-medium">Currently on Baseline Version</p>
              <p className="text-[11px] text-silver">
                Edits made in the CMS automatically capture point-in-time snapshots here before changes are applied.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {versions.map((ver, idx) => {
                const isSelected = activeVersion?.id === ver.id;
                return (
                  <div
                    key={ver.id}
                    onClick={() => setActiveVersion(ver)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? "bg-primary/10 border-primary shadow-sm"
                        : "bg-[#090d1f] border-border/60 hover:border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-mono text-primary font-bold">
                        Version #{versions.length - idx}
                      </span>
                      <span className="text-[10px] text-silver/60 font-mono">
                        {new Date(ver.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>

                    <p className="text-xs text-white font-sans font-medium line-clamp-1 mb-2">
                      {ver.changeSummary || "Content update"}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-silver/70 font-mono">
                      <span className="flex items-center gap-1 truncate max-w-[130px]">
                        <User className="w-3 h-3 text-silver/50" />
                        {ver.authorEmail}
                      </span>
                      <span>{new Date(ver.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Version Inspector & Diff */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider text-silver flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-accent-blue" />
              <span>Snapshot Payload & Comparison</span>
            </h3>

            {activeVersion && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadVersion(activeVersion)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download JSON</span>
                </button>

                <button
                  onClick={() => handleRollback(activeVersion)}
                  disabled={restoring}
                  className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold font-mono flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{restoring ? "Restoring..." : "Restore This Version"}</span>
                </button>
              </div>
            )}
          </div>

          <div className="p-5 rounded-2xl bg-[#030612] border border-border/60">
            {activeVersion ? (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div>
                    <span className="text-silver/60">Snapshot ID: </span>
                    <span className="text-white font-bold">{activeVersion.id}</span>
                  </div>
                  <div>
                    <span className="text-silver/60">Author: </span>
                    <span className="text-accent-blue">{activeVersion.authorEmail}</span>
                  </div>
                  <div>
                    <span className="text-silver/60">Created: </span>
                    <span className="text-white">{new Date(activeVersion.timestamp).toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-silver mb-2 flex items-center justify-between">
                    <span>Stored Document Payload</span>
                    <span className="text-[10px] text-silver/50">JSON Format</span>
                  </div>
                  <pre className="p-4 rounded-xl bg-[#090d1f] border border-border/50 text-emerald-400 text-xs font-mono overflow-x-auto max-h-[460px] leading-relaxed">
                    {JSON.stringify(activeVersion.data, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-silver/60 font-mono text-xs">
                Select a version from the timeline on the left to inspect its payload, compare with current live state, or trigger a 1-click rollback.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

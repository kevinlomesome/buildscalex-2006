"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Info,
  Save,
  Check,
  Plus,
  Trash2,
  Users,
  Target,
  Sparkles,
  ShieldCheck,
  XCircle,
  CheckCircle2,
  Sliders
} from "lucide-react";
import { saveDocData } from "@/lib/firebase/services";
import { useCMS } from "@/context/cms-context";
import { AboutContent } from "@/lib/cms-types";
import { defaultAboutContent } from "@/lib/default-content";

export default function AboutCmsPage() {
  const { about: initialAbout } = useCMS();
  const [data, setData] = useState<AboutContent>(initialAbout || defaultAboutContent);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (initialAbout && initialAbout.headline) {
      setData(initialAbout);
    }
  }, [initialAbout]);

  const [newFlaw, setNewFlaw] = useState("");
  const [newAdvantage, setNewAdvantage] = useState("");

  const handleSaveToFirestore = async () => {
    setSaving(true);
    setSavedSuccess(false);
    try {
      await saveDocData("about", "content", data);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      alert("Failed to save About CMS to Firebase");
    } finally {
      setSaving(false);
    }
  };

  const addFlaw = () => {
    if (!newFlaw.trim()) return;
    setData((prev) => ({
      ...prev,
      traditionalFlaws: [...prev.traditionalFlaws, newFlaw.trim()],
    }));
    setNewFlaw("");
  };

  const removeFlaw = (index: number) => {
    setData((prev) => ({
      ...prev,
      traditionalFlaws: prev.traditionalFlaws.filter((_, i) => i !== index),
    }));
  };

  const addAdvantage = () => {
    if (!newAdvantage.trim()) return;
    setData((prev) => ({
      ...prev,
      bsxAdvantages: [...prev.bsxAdvantages, newAdvantage.trim()],
    }));
    setNewAdvantage("");
  };

  const removeAdvantage = (index: number) => {
    setData((prev) => ({
      ...prev,
      bsxAdvantages: prev.bsxAdvantages.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                About & Why Us CMS
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-normal">
                  Live Synced
                </span>
              </h1>
              <p className="text-sm text-silver">
                Manage company mission, narrative, and comparative value propositions.
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

      {/* Main Copy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#090d1f]/80 border border-border/50 space-y-4">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <span>Headline & Narrative</span>
          </h3>

          <div>
            <label className="block text-xs font-mono text-silver mb-1.5">Page Title</label>
            <input
              type="text"
              value={data.headline}
              onChange={(e) => setData({ ...data, headline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-silver mb-1.5">Subheadline</label>
            <textarea
              rows={4}
              value={data.subheadline}
              onChange={(e) => setData({ ...data, subheadline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary resize-none leading-relaxed"
            />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#090d1f]/80 border border-border/50 space-y-4">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-blue" />
            <span>Mission & Vision</span>
          </h3>

          <div>
            <label className="block text-xs font-mono text-silver mb-1.5">Core Mission</label>
            <textarea
              rows={3}
              value={data.mission}
              onChange={(e) => setData({ ...data, mission: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-silver mb-1.5">Long-Term Vision</label>
            <textarea
              rows={3}
              value={data.vision}
              onChange={(e) => setData({ ...data, vision: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary resize-none"
            />
          </div>
        </div>
      </div>

      {/* Comparative Matrix: Traditional Agency vs Build Scale X */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traditional Agency Flaws */}
        <div className="p-6 rounded-2xl bg-[#090d1f]/80 border border-border/50 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-rose-400 flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              <span>Traditional Agency Pitfalls</span>
            </h3>
            <span className="text-xs font-mono text-silver">
              {data.traditionalFlaws.length} items
            </span>
          </div>

          <div className="space-y-2">
            {data.traditionalFlaws.map((flaw, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-[#030612] border border-border/50 text-xs text-silver"
              >
                <div className="flex items-center gap-2.5">
                  <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{flaw}</span>
                </div>
                <button
                  onClick={() => removeFlaw(idx)}
                  className="text-silver/50 hover:text-rose-400 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={newFlaw}
              onChange={(e) => setNewFlaw(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addFlaw();
                }
              }}
              placeholder="Add traditional flaw (e.g. Hidden hosting fees)..."
              className="flex-1 px-3 py-2 rounded-xl bg-[#030612] border border-border/60 text-xs text-white placeholder-silver/40 focus:outline-none focus:border-rose-400"
            />
            <button
              onClick={addFlaw}
              className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 font-medium hover:bg-rose-500/20 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Build Scale X Advantages */}
        <div className="p-6 rounded-2xl bg-[#090d1f]/80 border border-border/50 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Build Scale X Advantages</span>
            </h3>
            <span className="text-xs font-mono text-silver">
              {data.bsxAdvantages.length} items
            </span>
          </div>

          <div className="space-y-2">
            {data.bsxAdvantages.map((adv, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-[#030612] border border-border/50 text-xs text-white"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{adv}</span>
                </div>
                <button
                  onClick={() => removeAdvantage(idx)}
                  className="text-silver/50 hover:text-rose-400 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={newAdvantage}
              onChange={(e) => setNewAdvantage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addAdvantage();
                }
              }}
              placeholder="Add Build Scale X advantage..."
              className="flex-1 px-3 py-2 rounded-xl bg-[#030612] border border-border/60 text-xs text-white placeholder-silver/40 focus:outline-none focus:border-emerald-400"
            />
            <button
              onClick={addAdvantage}
              className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium hover:bg-emerald-500/20 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

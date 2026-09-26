"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Sparkles,
  Save,
  Check,
  Plus,
  Trash2,
  TrendingUp,
  Eye,
  Sliders,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { useCMS } from "@/context/cms-context";
import { HeroContent } from "@/lib/cms-types";
import { saveDocData } from "@/lib/firebase/services";

export default function HomepageCmsPage() {
  const { hero: initialHero } = useCMS();
  const [hero, setHero] = useState<HeroContent>(initialHero);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [newBadgeText, setNewBadgeText] = useState("");

  useEffect(() => {
    if (initialHero && initialHero.headlineLine1) {
      setHero(initialHero);
    }
  }, [initialHero]);

  const handleSaveToFirestore = async () => {
    setSaving(true);
    setSavedSuccess(false);
    try {
      await saveDocData("homepage", "hero", hero);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      alert("Failed to save hero content to Firebase");
    } finally {
      setSaving(false);
    }
  };

  const addTrustBadge = () => {
    if (!newBadgeText.trim()) return;
    if (hero.trustBadges.includes(newBadgeText.trim())) return;
    setHero((prev) => ({
      ...prev,
      trustBadges: [...prev.trustBadges, newBadgeText.trim()],
    }));
    setNewBadgeText("");
  };

  const removeTrustBadge = (badge: string) => {
    setHero((prev) => ({
      ...prev,
      trustBadges: prev.trustBadges.filter((b) => b !== badge),
    }));
  };

  const updateMetric = (
    index: number,
    field: "label" | "value" | "subtext",
    val: string
  ) => {
    setHero((prev) => {
      const updated = [...prev.metrics];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, metrics: updated };
    });
  };

  const addMetric = () => {
    setHero((prev) => ({
      ...prev,
      metrics: [
        ...prev.metrics,
        { label: "New Metric", value: "99%", subtext: "Average Result" },
      ],
    }));
  };

  const removeMetric = (index: number) => {
    setHero((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((_, idx) => idx !== index),
    }));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Homepage & Hero CMS
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-normal">
                  Live Synced
                </span>
              </h1>
              <p className="text-sm text-silver">
                Manage hero headline typography, value proposition copy, CTA labels, trust badges, and performance metric counters.
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

      {/* Live Hero Preview Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-b from-[#090e24] via-[#050816] to-[#030612] border border-border/60 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-silver uppercase tracking-wider">
            <Eye className="w-3.5 h-3.5 text-primary" />
            <span>Live Hero Headline Preview</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-silver">
            Realtime CSS Render
          </span>
        </div>

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {hero.badgeText || "Badge Placeholder"}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {hero.headlineLine1}{" "}
            <span className="bg-gradient-to-r from-blue-400 via-primary to-accent-blue bg-clip-text text-transparent">
              {hero.headlineGradient}
            </span>{" "}
            {hero.headlineLine2}
          </h2>

          <p className="text-sm md:text-base text-silver leading-relaxed max-w-2xl">
            {hero.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 flex items-center gap-2">
              <span>{hero.ctaPrimaryText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <div className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold">
              {hero.ctaSecondaryText}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Headlines & Copy (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Headline Configuration */}
          <div className="p-6 rounded-2xl bg-[#090d1f]/80 border border-border/50 space-y-5">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-primary" />
              <span>Headline & Typography Architecture</span>
            </h3>

            <div>
              <label className="block text-xs font-mono text-silver mb-1.5">
                Top Pill Badge Text
              </label>
              <input
                type="text"
                value={hero.badgeText}
                onChange={(e) => setHero({ ...hero, badgeText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary font-mono"
              />
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-silver mb-1.5">
                  Headline Part 1 (Before Gradient)
                </label>
                <input
                  type="text"
                  value={hero.headlineLine1}
                  onChange={(e) => setHero({ ...hero, headlineLine1: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-primary mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Gradient Highlight Word(s)</span>
                </label>
                <input
                  type="text"
                  value={hero.headlineGradient}
                  onChange={(e) => setHero({ ...hero, headlineGradient: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-primary/50 text-accent-blue text-sm font-semibold focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-silver mb-1.5">
                  Headline Part 2 (After Gradient)
                </label>
                <input
                  type="text"
                  value={hero.headlineLine2}
                  onChange={(e) => setHero({ ...hero, headlineLine2: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-silver mb-1.5">
                Subheadline Description
              </label>
              <textarea
                rows={4}
                value={hero.description}
                onChange={(e) => setHero({ ...hero, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary leading-relaxed resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono text-silver mb-1.5">
                  Primary CTA Label
                </label>
                <input
                  type="text"
                  value={hero.ctaPrimaryText}
                  onChange={(e) => setHero({ ...hero, ctaPrimaryText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-silver mb-1.5">
                  Secondary CTA Label
                </label>
                <input
                  type="text"
                  value={hero.ctaSecondaryText}
                  onChange={(e) => setHero({ ...hero, ctaSecondaryText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Trust Badges & Metrics */}
        <div className="space-y-6">
          {/* Trust Badges */}
          <div className="p-6 rounded-2xl bg-[#090d1f]/80 border border-border/50 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Trust Proof Badges</span>
            </h3>
            <p className="text-xs text-silver">
              Pill highlights displayed under the CTA buttons to build instant trust.
            </p>

            <div className="flex flex-wrap gap-2">
              {hero.trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white"
                >
                  {badge}
                  <button
                    onClick={() => removeTrustBadge(badge)}
                    className="text-silver hover:text-rose-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newBadgeText}
                onChange={(e) => setNewBadgeText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTrustBadge();
                  }
                }}
                placeholder="Add trust badge..."
                className="flex-1 px-3 py-2 rounded-xl bg-[#030612] border border-border/60 text-xs text-white placeholder-silver/40 focus:outline-none focus:border-primary"
              />
              <button
                onClick={addTrustBadge}
                className="px-3 py-2 rounded-xl bg-primary/20 border border-primary/30 text-xs text-primary font-medium hover:bg-primary/30 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Key Metrics Counters */}
          <div className="p-6 rounded-2xl bg-[#090d1f]/80 border border-border/50 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent-blue" />
                <span>Impact Metric Counters</span>
              </h3>
              <button
                onClick={addMetric}
                className="p-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-silver hover:text-white transition-colors"
                title="Add Metric"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {hero.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#030612] border border-border/60 space-y-2 relative group"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) => updateMetric(idx, "value", e.target.value)}
                      placeholder="Value (+240%)"
                      className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-accent-blue focus:outline-none focus:border-primary font-mono"
                    />
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) => updateMetric(idx, "label", e.target.value)}
                      placeholder="Label"
                      className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-primary font-mono"
                    />
                  </div>
                  <input
                    type="text"
                    value={metric.subtext}
                    onChange={(e) => updateMetric(idx, "subtext", e.target.value)}
                    placeholder="Subtext"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-silver focus:outline-none focus:border-primary"
                  />
                  {hero.metrics.length > 1 && (
                    <button
                      onClick={() => removeMetric(idx)}
                      className="absolute top-2 right-2 text-silver/40 hover:text-rose-400 transition-colors p-1"
                      title="Delete metric"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

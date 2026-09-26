"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Save,
  Check,
  Globe,
  Sliders,
  Eye,
  BarChart2,
  Share2,
  FileCode,
  ShieldCheck
} from "lucide-react";
import { defaultSeoSettings } from "@/lib/default-content";
import { SeoSettings } from "@/lib/cms-types";
import { saveDocData } from "@/lib/firebase/services";
import { useCMS } from "@/context/cms-context";

export default function SeoSettingsPage() {
  const { seo: initialSeo } = useCMS();
  const [seo, setSeo] = useState<SeoSettings>(initialSeo || defaultSeoSettings);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (initialSeo) {
      setSeo(initialSeo);
    }
  }, [initialSeo]);

  const handleSaveToFirestore = async () => {
    setSaving(true);
    setSavedSuccess(false);
    try {
      await Promise.all([
        saveDocData("seo", "global", seo),
        saveDocData("settings", "seo", seo)
      ]);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      alert("Failed to save SEO settings to Firebase");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Global SEO & Growth Tracking
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-normal">
                  Live Synced
                </span>
              </h1>
              <p className="text-sm text-silver">
                Configure meta tags, OpenGraph previews, Google Analytics 4, Meta Pixel, and search engine indexing.
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

      {/* Google SERP Live Simulation */}
      <div className="p-6 rounded-2xl bg-[#090d1f] border border-border/60 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono text-silver uppercase flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-primary" />
            <span>Google Search Result Snippet Simulation</span>
          </h3>
          <span className="text-[10px] font-mono text-emerald-400">Desktop Index Preview</span>
        </div>

        <div className="p-4 rounded-xl bg-[#030612] border border-border/40 max-w-2xl space-y-1 font-sans">
          <div className="flex items-center gap-2 text-xs text-silver/70 font-mono">
            <span>https://buildscalex.com</span>
            <span>›</span>
          </div>
          <h4 className="text-lg text-blue-400 hover:underline cursor-pointer font-medium leading-snug">
            {seo.metaTitle || "Build Scale X | Growth Systems Agency"}
          </h4>
          <p className="text-xs text-silver/80 leading-relaxed">
            {seo.metaDescription ||
              "Helping businesses build powerful digital systems that generate more leads, increase conversions, automate operations, and scale revenue."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meta Tags */}
        <div className="p-6 rounded-2xl bg-[#090d1f]/80 border border-border/50 space-y-5">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            <span>Meta Tags & Search Visibility</span>
          </h3>

          <div>
            <label className="block text-xs font-mono text-silver mb-1.5">
              Meta Title (Recommended: 50-60 characters)
            </label>
            <input
              type="text"
              value={seo.metaTitle}
              onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
            />
            <span className="text-[10px] font-mono text-silver/60 mt-1 block">
              Length: {seo.metaTitle.length} chars
            </span>
          </div>

          <div>
            <label className="block text-xs font-mono text-silver mb-1.5">
              Meta Description (Recommended: 140-160 characters)
            </label>
            <textarea
              rows={3}
              value={seo.metaDescription}
              onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary resize-none leading-relaxed"
            />
            <span className="text-[10px] font-mono text-silver/60 mt-1 block">
              Length: {seo.metaDescription.length} chars
            </span>
          </div>

          <div>
            <label className="block text-xs font-mono text-silver mb-1.5">
              Meta Keywords (Comma separated)
            </label>
            <input
              type="text"
              value={seo.keywords}
              onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm font-mono focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-silver mb-1.5">
              Canonical URL
            </label>
            <input
              type="url"
              value={seo.canonicalUrl}
              onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm font-mono focus:outline-none focus:border-primary"
              placeholder="https://buildscalex.com"
            />
          </div>
        </div>

        {/* Analytics & Social Tracking */}
        <div className="p-6 rounded-2xl bg-[#090d1f]/80 border border-border/50 space-y-5">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-accent-blue" />
            <span>Tracking Scripts & OpenGraph</span>
          </h3>

          <div>
            <label className="block text-xs font-mono text-silver mb-1.5">
              OpenGraph Image URL (Social Share Preview)
            </label>
            <input
              type="text"
              value={seo.ogImage}
              onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm font-mono focus:outline-none focus:border-primary"
              placeholder="/logo-emblem.png"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-silver mb-1.5">
              Google Analytics 4 Measurement ID
            </label>
            <input
              type="text"
              value={seo.googleAnalyticsId}
              onChange={(e) => setSeo({ ...seo, googleAnalyticsId: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm font-mono focus:outline-none focus:border-primary"
              placeholder="G-XXXXXXXXXX"
            />
            <span className="text-[10px] text-silver/60 mt-1 block">
              Leave blank if not connected yet. Automatically injects gtag.js once saved.
            </span>
          </div>

          <div>
            <label className="block text-xs font-mono text-silver mb-1.5">
              Meta Pixel ID (Facebook Ads)
            </label>
            <input
              type="text"
              value={seo.facebookPixelId}
              onChange={(e) => setSeo({ ...seo, facebookPixelId: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm font-mono focus:outline-none focus:border-primary"
              placeholder="123456789012345"
            />
            <span className="text-[10px] text-silver/60 mt-1 block">
              Fires Lead and Contact conversion events on form submission.
            </span>
          </div>

          <div className="pt-2 border-t border-border/30">
            <div className="flex items-center justify-between text-xs text-silver">
              <span className="font-mono">sitemap.xml & robots.txt</span>
              <span className="text-emerald-400 font-mono">Generated dynamically</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

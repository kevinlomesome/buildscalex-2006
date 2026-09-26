"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCode2,
  Plus,
  Trash2,
  Edit2,
  Save,
  Check,
  Eye,
  EyeOff,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Layers,
  Sparkles,
  ArrowRight,
  X,
  Sliders,
  FileText,
  Search,
  CheckCircle2,
  Copy,
  Globe,
  Menu
} from "lucide-react";
import Link from "next/link";
import { PageItem, PageSection, PageSectionType } from "@/lib/cms-types";
import { subscribeToPages, savePage, deletePage } from "@/lib/firebase/services";

export default function DynamicPageBuilderAdmin() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPage, setSelectedPage] = useState<PageItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New Page Modal
  const [newPageModalOpen, setNewPageModalOpen] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [newPageSlug, setNewPageSlug] = useState("");
  const [newPageDesc, setNewPageDesc] = useState("");

  // Section Edit Modal
  const [editingSection, setEditingSection] = useState<{
    section: PageSection;
    index: number;
  } | null>(null);

  useEffect(() => {
    const unsub = subscribeToPages((data) => {
      setPages(data);
      if (!selectedPage && data.length > 0) {
        setSelectedPage(data[0]);
      } else if (selectedPage) {
        const found = data.find((p) => p.id === selectedPage.id);
        if (found) setSelectedPage(found);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleCreatePage = async () => {
    if (!newPageTitle.trim() || !newPageSlug.trim()) return;
    const newPage: PageItem = {
      id: `page-${Date.now()}`,
      title: newPageTitle.trim(),
      slug: newPageSlug.trim(),
      metaDescription: newPageDesc.trim() || `Explore ${newPageTitle} from Build Scale X.`,
      published: true,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString(),
      sections: [
        {
          id: `sec-hero-${Date.now()}`,
          type: "hero",
          badge: "Bespoke Growth System",
          title: newPageTitle.trim(),
          subtitle: "We engineer high-performance systems designed to scale revenue and generate qualified clients.",
          buttonText: "Schedule Strategy Call",
          buttonLink: "/contact",
          active: true,
          order: 1,
        },
        {
          id: `sec-cta-${Date.now()}`,
          type: "cta",
          title: "Ready To Dominate Your Market?",
          subtitle: "Get a customized growth audit and architecture blueprint today.",
          buttonText: "Book Free Consultation",
          buttonLink: "/contact",
          active: true,
          order: 2,
        },
      ],
    };

    await savePage(newPage);
    setSelectedPage(newPage);
    setNewPageTitle("");
    setNewPageSlug("");
    setNewPageDesc("");
    setNewPageModalOpen(false);
  };

  const handleSaveCurrentPage = async () => {
    if (!selectedPage) return;
    setSaving(true);
    setSavedSuccess(false);
    try {
      await savePage(selectedPage);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      alert("Failed to save page");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCurrentPage = async () => {
    if (!selectedPage) return;
    if (confirm(`Are you sure you want to delete page "/p/${selectedPage.slug}"?`)) {
      await deletePage(selectedPage.id);
      const remaining = pages.filter((p) => p.id !== selectedPage.id);
      setSelectedPage(remaining.length > 0 ? remaining[0] : null);
    }
  };

  const handleDuplicatePage = async (pageToDup: PageItem) => {
    const dupPage: PageItem = {
      ...pageToDup,
      id: `page-${Date.now()}`,
      title: `${pageToDup.title} (Copy)`,
      slug: `${pageToDup.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      published: false,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString(),
    };
    await savePage(dupPage);
    setSelectedPage(dupPage);
  };

  const addSectionToSelectedPage = (type: PageSectionType) => {
    if (!selectedPage) return;
    const newSection: PageSection = {
      id: `sec-${Date.now()}`,
      type,
      title:
        type === "hero"
          ? "New Hero Headline"
          : type === "features"
          ? "Key Growth Capabilities"
          : type === "services"
          ? "Our Core Service Modules"
          : type === "faq"
          ? "Frequently Asked Questions"
          : type === "testimonials"
          ? "Enterprise Client Feedback"
          : type === "cta"
          ? "Ready To Scale?"
          : type === "rich_text"
          ? "Detailed Architecture Overview"
          : type === "contact_form"
          ? "Direct Strategy Consultation"
          : type === "gallery"
          ? "Visual Portfolio & Showcase"
          : type === "pricing"
          ? "Enterprise Growth Tiers"
          : type === "timeline"
          ? "Execution Roadmap & Milestones"
          : type === "stats"
          ? "Key Performance Indicators"
          : type === "image"
          ? "Featured Architectural Visual"
          : type === "video"
          ? "Video Breakdown & Walkthrough"
          : type === "custom_html"
          ? "Custom Third-Party Embed"
          : "Custom Section",
      subtitle: "Engineered for maximum conversion and client acquisition.",
      content:
        type === "rich_text"
          ? "Provide comprehensive documentation, strategic breakdowns, and enterprise methodologies here."
          : undefined,
      htmlContent:
        type === "custom_html"
          ? "<div class=\"p-6 rounded-2xl bg-primary/10 border border-primary/20 text-center font-mono text-xs text-white\">Custom Embedded Component</div>"
          : undefined,
      mediaUrl:
        type === "image"
          ? "/logo.png"
          : type === "video"
          ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          : undefined,
      buttonText: type === "hero" || type === "cta" || type === "pricing" ? "Get Started" : undefined,
      buttonLink: "/contact",
      active: true,
      order: selectedPage.sections.length + 1,
      items:
        type === "features"
          ? [
              {
                id: "f-1",
                title: "Automated Lead Qualification",
                description: "Filter high-intent buyers in under 60 seconds.",
              },
              {
                id: "f-2",
                title: "Sub-second Page Speeds",
                description: "Bespoke Next.js edge architecture with zero bloat.",
              },
            ]
          : type === "pricing"
          ? [
              { id: "p-1", title: "Launch Blueprint", price: "₹49,999", period: "one-time", description: "Complete custom landing page & WhatsApp CRM", features: ["1 Custom Next.js Page", "WhatsApp Lead Routing", "Basic Analytics"] },
              { id: "p-2", title: "Scale Engine", price: "₹99,999", period: "one-time", description: "End-to-end B2B funnel with ads & automations", features: ["Full Web Architecture", "Automated Triage", "CRM Integrations", "Meta Ads Setup"] },
              { id: "p-3", title: "Dominance Suite", price: "₹1,99,999", period: "quarterly", description: "Dedicated growth engineering & full management", features: ["Unlimited Pages", "Custom AI Workflows", "Dedicated Developer", "Weekly Strategy Calls"] },
            ]
          : type === "timeline"
          ? [
              { id: "t-1", title: "Phase 1: Architecture Blueprint", description: "Audit current funnel bottlenecks and design custom system map." },
              { id: "t-2", title: "Phase 2: Code & Automation Setup", description: "Build custom Next.js modules and configure WhatsApp automations." },
              { id: "t-3", title: "Phase 3: Launch & Performance Scale", description: "Push live to edge CDN, run conversion audits, and scale traffic." },
            ]
          : type === "stats"
          ? [
              { id: "s-1", title: "10x", label: "Pipeline Velocity", description: "Accelerate sales cycles" },
              { id: "s-2", title: "< 1s", label: "Page Load Speed", description: "Edge cached globally" },
              { id: "s-3", title: "99.9%", label: "System Uptime", description: "Enterprise infrastructure" },
              { id: "s-4", title: "₹10Cr+", label: "Client Revenue Scaled", description: "Proven B2B track record" },
            ]
          : type === "gallery"
          ? [
              { id: "g-1", title: "Real Estate Portal", description: "Luxury developer high-ticket acquisition system", value: "/logo.png" },
              { id: "g-2", title: "HealthTech Platform", description: "Automated patient booking & triage funnel", value: "/logo.png" },
              { id: "g-3", title: "FinTech Dashboard", description: "B2B client onboarding and payment automation", value: "/logo.png" },
            ]
          : undefined,
    };

    setSelectedPage({
      ...selectedPage,
      sections: [...selectedPage.sections, newSection],
    });
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    if (!selectedPage) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= selectedPage.sections.length) return;

    const sections = [...selectedPage.sections];
    const temp = sections[index];
    sections[index] = sections[targetIdx];
    sections[targetIdx] = temp;

    const reordered = sections.map((s, idx) => ({ ...s, order: idx + 1 }));
    setSelectedPage({ ...selectedPage, sections: reordered });
  };

  const duplicateSection = (index: number) => {
    if (!selectedPage) return;
    const target = selectedPage.sections[index];
    const duplicated: PageSection = {
      ...target,
      id: `sec-${Date.now()}`,
      title: target.title ? `${target.title} (Copy)` : undefined,
      order: index + 2,
    };
    const updated = [...selectedPage.sections];
    updated.splice(index + 1, 0, duplicated);
    const reordered = updated.map((s, idx) => ({ ...s, order: idx + 1 }));
    setSelectedPage({ ...selectedPage, sections: reordered });
  };

  const toggleSectionActive = (sectionId: string) => {
    if (!selectedPage) return;
    setSelectedPage({
      ...selectedPage,
      sections: selectedPage.sections.map((s) =>
        s.id === sectionId ? { ...s, active: !s.active } : s
      ),
    });
  };

  const deleteSection = (sectionId: string) => {
    if (!selectedPage) return;
    setSelectedPage({
      ...selectedPage,
      sections: selectedPage.sections.filter((s) => s.id !== sectionId),
    });
  };

  const handleUpdateSection = () => {
    if (!selectedPage || !editingSection) return;
    const updatedSections = selectedPage.sections.map((s) =>
      s.id === editingSection.section.id ? editingSection.section : s
    );
    setSelectedPage({ ...selectedPage, sections: updatedSections });
    setEditingSection(null);
  };

  const filteredPages = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Dynamic Page Builder
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-normal">
                  Live Synced
                </span>
              </h1>
              <p className="text-sm text-silver">
                Create custom landing pages, marketing funnels, and standalone campaigns with drag-and-drop sections.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setNewPageModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4 text-primary" />
            <span>Create New Page</span>
          </button>

          {selectedPage && (
            <button
              onClick={handleSaveCurrentPage}
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
              <span>{savedSuccess ? "Saved to Cloud!" : "Save Page"}</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Pages List (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-silver">
            <span>CUSTOM PAGES ({pages.length})</span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-silver" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pages..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#090d1f] border border-border/50 text-xs text-white placeholder-silver/50 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            {filteredPages.map((p) => {
              const isSelected = selectedPage?.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPage(p)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? "bg-primary/10 border-primary/40 text-white shadow-sm"
                      : "bg-[#090d1f]/70 border-border/40 text-silver hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-xs font-bold truncate">{p.title}</h4>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md ${
                        p.published
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {p.published ? "Live" : "Draft"}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-silver/60 flex items-center justify-between">
                    <span>/p/{p.slug}</span>
                    <span>{p.sections.length} sec</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Page Section Builder (3 cols) */}
        {selectedPage ? (
          <div className="lg:col-span-3 space-y-6">
            {/* Page Metadata Bar */}
            <div className="p-5 rounded-2xl bg-[#090d1f]/90 border border-border/50 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/30 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs font-mono">
                    PAGE
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {selectedPage.title}
                    </h3>
                    <p className="text-xs font-mono text-accent-blue flex items-center gap-1">
                      <span>URL:</span>
                      <a
                        href={`/p/${selectedPage.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        /p/{selectedPage.slug}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setSelectedPage({
                        ...selectedPage,
                        published: !selectedPage.published,
                      })
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                      selectedPage.published
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                    }`}
                  >
                    {selectedPage.published ? "Published (Live)" : "Draft Mode"}
                  </button>

                  <button
                    onClick={() => handleDuplicatePage(selectedPage)}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-silver hover:text-white transition-colors"
                    title="Duplicate Page"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleDeleteCurrentPage}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-rose-500/10 text-silver hover:text-rose-400 transition-colors"
                    title="Delete Page"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-silver mb-1">
                    Page Headline Title
                  </label>
                  <input
                    type="text"
                    value={selectedPage.title}
                    onChange={(e) =>
                      setSelectedPage({ ...selectedPage, title: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-border/50 text-white text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-silver mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={selectedPage.slug}
                    onChange={(e) =>
                      setSelectedPage({ ...selectedPage, slug: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-border/50 text-white text-xs font-mono focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Navigation & Menu Visibility Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border/30">
                <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-[#030612]/60 border border-border/40 hover:border-primary/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedPage.showInNavbar ?? false}
                    onChange={(e) =>
                      setSelectedPage({
                        ...selectedPage,
                        showInNavbar: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-primary focus:ring-primary bg-black/40 border-border/60"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Menu className="w-3.5 h-3.5 text-primary" />
                      Show in Navbar
                    </span>
                    <span className="text-[10px] text-silver">Desktop & Mobile</span>
                  </div>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-[#030612]/60 border border-border/40 hover:border-primary/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedPage.showInFooter ?? false}
                    onChange={(e) =>
                      setSelectedPage({
                        ...selectedPage,
                        showInFooter: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-primary focus:ring-primary bg-black/40 border-border/60"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-accent-blue" />
                      Show in Footer
                    </span>
                    <span className="text-[10px] text-silver">Quick Links</span>
                  </div>
                </label>

                <div>
                  <label className="block text-[10px] font-mono text-silver mb-1">
                    Display Order / Position
                  </label>
                  <input
                    type="number"
                    value={selectedPage.order ?? 10}
                    onChange={(e) =>
                      setSelectedPage({
                        ...selectedPage,
                        order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-xl bg-[#030612] border border-border/50 text-white text-xs font-mono focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Sections List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  <span>Sections Stack ({selectedPage.sections.length})</span>
                </h3>

                {/* Add Section Dropdown Bar */}
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      "hero",
                      "features",
                      "services",
                      "faq",
                      "cta",
                      "rich_text",
                      "testimonials",
                      "contact_form",
                      "gallery",
                      "pricing",
                      "timeline",
                      "stats",
                      "image",
                      "video",
                      "custom_html"
                    ] as PageSectionType[]
                  ).map((type) => (
                    <button
                      key={type}
                      onClick={() => addSectionToSelectedPage(type)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/40 text-[10px] text-silver hover:text-white font-mono uppercase transition-colors"
                    >
                      + {type.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {selectedPage.sections.map((section, idx) => (
                <div
                  key={section.id}
                  className={`p-4 rounded-2xl bg-[#090d1f]/90 border transition-all space-y-3 ${
                    section.active
                      ? "border-border/50 hover:border-primary/30"
                      : "border-border/20 opacity-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-white/5 border border-white/10 text-silver font-mono text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            {section.title || "Untitled Section"}
                          </span>
                          <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            {section.type}
                          </span>
                        </div>
                        {section.subtitle && (
                          <p className="text-[11px] text-silver truncate max-w-md mt-0.5">
                            {section.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => moveSection(idx, "up")}
                        disabled={idx === 0}
                        className="p-1 rounded text-silver hover:text-white disabled:opacity-20"
                        title="Move Up"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveSection(idx, "down")}
                        disabled={idx === selectedPage.sections.length - 1}
                        className="p-1 rounded text-silver hover:text-white disabled:opacity-20"
                        title="Move Down"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleSectionActive(section.id)}
                        className={`px-2 py-1 rounded text-[10px] font-mono border ${
                          section.active
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "bg-white/5 border-white/10 text-silver"
                        }`}
                      >
                        {section.active ? "Active" : "Hidden"}
                      </button>
                      <button
                        onClick={() => setEditingSection({ section, index: idx })}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-silver hover:text-white"
                        title="Edit Section"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => duplicateSection(idx)}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-silver hover:text-white"
                        title="Duplicate Section"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteSection(section.id)}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-rose-500/10 text-silver hover:text-rose-400"
                        title="Delete Section"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="lg:col-span-3 p-12 text-center rounded-2xl bg-[#090d1f]/40 border border-border/30">
            <p className="text-sm text-silver">Select or create a page to open the section builder.</p>
          </div>
        )}
      </div>

      {/* New Page Modal */}
      <AnimatePresence>
        {newPageModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl bg-[#090d1f] border border-border/60 p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-primary" />
                  <span>Create Dynamic Landing Page</span>
                </h3>
                <button
                  onClick={() => setNewPageModalOpen(false)}
                  className="p-1 rounded-lg text-silver hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Page Title
                  </label>
                  <input
                    type="text"
                    value={newPageTitle}
                    onChange={(e) => {
                      setNewPageTitle(e.target.value);
                      if (!newPageSlug) setNewPageSlug(generateSlug(e.target.value));
                    }}
                    placeholder="e.g. Real Estate Growth Engine"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    URL Slug (/p/...)
                  </label>
                  <input
                    type="text"
                    value={newPageSlug}
                    onChange={(e) => setNewPageSlug(e.target.value)}
                    placeholder="real-estate-growth"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm font-mono focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Meta Description (SEO)
                  </label>
                  <textarea
                    rows={3}
                    value={newPageDesc}
                    onChange={(e) => setNewPageDesc(e.target.value)}
                    placeholder="Brief description for search engines..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
                <button
                  onClick={() => setNewPageModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-silver hover:text-white text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePage}
                  className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:brightness-110"
                >
                  Create Page
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Section Modal */}
      <AnimatePresence>
        {editingSection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-[#090d1f] border border-border/60 p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-primary" />
                  <span>Edit {editingSection.section.type.toUpperCase()} Section</span>
                </h3>
                <button
                  onClick={() => setEditingSection(null)}
                  className="p-1 rounded-lg text-silver hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {editingSection.section.type === "hero" && (
                  <div>
                    <label className="block text-xs font-mono text-silver mb-1.5">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={editingSection.section.badge || ""}
                      onChange={(e) =>
                        setEditingSection({
                          ...editingSection,
                          section: { ...editingSection.section, badge: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={editingSection.section.title || ""}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        section: { ...editingSection.section, title: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Subtitle / Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={editingSection.section.subtitle || ""}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        section: { ...editingSection.section, subtitle: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-xs focus:outline-none focus:border-primary resize-none leading-relaxed"
                  />
                </div>

                {editingSection.section.type === "rich_text" && (
                  <div>
                    <label className="block text-xs font-mono text-silver mb-1.5">
                      Rich Content / Body Text
                    </label>
                    <textarea
                      rows={6}
                      value={editingSection.section.content || ""}
                      onChange={(e) =>
                        setEditingSection({
                          ...editingSection,
                          section: { ...editingSection.section, content: e.target.value },
                        })
                      }
                      placeholder="Enter detailed paragraph content, case study analysis, or system breakdown..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-xs focus:outline-none focus:border-primary resize-y font-mono leading-relaxed"
                    />
                  </div>
                )}

                {(editingSection.section.type === "hero" || editingSection.section.type === "cta") && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-silver mb-1.5">
                        Button Label
                      </label>
                      <input
                        type="text"
                        value={editingSection.section.buttonText || ""}
                        onChange={(e) =>
                          setEditingSection({
                            ...editingSection,
                            section: { ...editingSection.section, buttonText: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-xl bg-[#030612] border border-border/60 text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-silver mb-1.5">
                        Button Link
                      </label>
                      <input
                        type="text"
                        value={editingSection.section.buttonLink || ""}
                        onChange={(e) =>
                          setEditingSection({
                            ...editingSection,
                            section: { ...editingSection.section, buttonLink: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-xl bg-[#030612] border border-border/60 text-white text-xs font-mono focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                )}

                {(editingSection.section.type === "image" || editingSection.section.type === "video") && (
                  <div>
                    <label className="block text-xs font-mono text-silver mb-1.5">
                      Media / Video URL
                    </label>
                    <input
                      type="text"
                      value={editingSection.section.mediaUrl || ""}
                      onChange={(e) =>
                        setEditingSection({
                          ...editingSection,
                          section: { ...editingSection.section, mediaUrl: e.target.value },
                        })
                      }
                      placeholder="https://... (image url or YouTube link)"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-xs font-mono focus:outline-none focus:border-primary"
                    />
                  </div>
                )}

                {editingSection.section.type === "custom_html" && (
                  <div>
                    <label className="block text-xs font-mono text-silver mb-1.5">
                      Custom HTML / Embed Code
                    </label>
                    <textarea
                      rows={6}
                      value={editingSection.section.htmlContent || ""}
                      onChange={(e) =>
                        setEditingSection({
                          ...editingSection,
                          section: { ...editingSection.section, htmlContent: e.target.value },
                        })
                      }
                      placeholder="<div>Your custom HTML embed</div>"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-xs font-mono focus:outline-none focus:border-primary resize-y leading-relaxed"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
                <button
                  onClick={() => setEditingSection(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-silver hover:text-white text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateSection}
                  className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:brightness-110"
                >
                  Update Section
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

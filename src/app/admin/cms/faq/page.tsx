"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Save,
  Check,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  X,
  Tag,
  Search,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useCMS } from "@/context/cms-context";
import { FaqItem } from "@/lib/cms-types";
import { saveDocData } from "@/lib/firebase/services";

const categories = ["All", "General", "Timeline", "Technology", "Automation", "SEO"];

export default function FaqCmsPage() {
  const { faqs: initialFaqs } = useCMS();
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (initialFaqs && Array.isArray(initialFaqs)) {
      setFaqs(initialFaqs);
    }
  }, [initialFaqs]);

  // Edit/Create Modal
  const [editingItem, setEditingItem] = useState<{
    faq: FaqItem;
    isNew?: boolean;
  } | null>(null);

  const handleSaveToFirestore = async (customFaqs?: FaqItem[]) => {
    const listToSave = customFaqs || faqs;
    setSaving(true);
    setSavedSuccess(false);
    try {
      await saveDocData("faq", "list", { items: listToSave });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      alert("Failed to save FAQs to Firebase");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (id: string) => {
    const updated = faqs.map((item) => (item.id === id ? { ...item, active: !item.active } : item));
    setFaqs(updated);
    await handleSaveToFirestore(updated);
  };

  const deleteFaq = async (id: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      const updated = faqs.filter((item) => item.id !== id);
      setFaqs(updated);
      await handleSaveToFirestore(updated);
    }
  };

  const handleSaveModal = () => {
    if (!editingItem) return;
    const { faq, isNew } = editingItem;

    setFaqs((prev) => {
      if (isNew) {
        return [...prev, faq];
      }
      return prev.map((item) => (item.id === faq.id ? faq : item));
    });

    setEditingItem(null);
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat =
      selectedCategory === "All" || faq.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                FAQ Knowledgebase CMS
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-normal">
                  Live Synced
                </span>
              </h1>
              <p className="text-sm text-silver">
                Manage frequently asked questions, answers, categories, and customer objection handling.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setEditingItem({
                isNew: true,
                faq: {
                  id: `faq-${Date.now()}`,
                  question: "",
                  answer: "",
                  category: "General",
                  order: faqs.length + 1,
                  active: true,
                },
              })
            }
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4 text-primary" />
            <span>Add FAQ</span>
          </button>

          <button
            onClick={() => handleSaveToFirestore()}
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

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white/5 text-silver border border-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-silver" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#090d1f] border border-border/60 text-white text-xs placeholder-silver/50 focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => (
          <div
            key={faq.id}
            className={`p-5 rounded-2xl bg-[#090d1f]/90 border transition-all space-y-3 ${
              faq.active
                ? "border-border/50 hover:border-primary/40"
                : "border-border/20 opacity-60"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
                    {faq.category}
                  </span>
                  {!faq.active && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400">
                      Hidden
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {faq.question}
                </h3>

                <p className="text-xs text-silver leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-start">
                <button
                  onClick={() => toggleActive(faq.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                    faq.active
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                      : "bg-white/5 border-white/10 text-silver"
                  }`}
                >
                  {faq.active ? "Active" : "Disabled"}
                </button>

                <button
                  onClick={() => setEditingItem({ faq, isNew: false })}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-silver hover:text-white transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => deleteFaq(faq.id)}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-rose-500/10 hover:border-rose-500/30 text-silver hover:text-rose-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredFaqs.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-[#090d1f]/40 border border-border/30">
            <p className="text-sm text-silver">No FAQ entries match the filter.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl rounded-2xl bg-[#090d1f] border border-border/60 p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-primary" />
                  <span>{editingItem.isNew ? "Add FAQ Entry" : "Edit FAQ Entry"}</span>
                </h3>
                <button
                  onClick={() => setEditingItem(null)}
                  className="p-1 rounded-lg text-silver hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Category Tag
                  </label>
                  <select
                    value={editingItem.faq.category}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        faq: { ...editingItem.faq, category: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="General">General</option>
                    <option value="Timeline">Timeline</option>
                    <option value="Technology">Technology</option>
                    <option value="Automation">Automation</option>
                    <option value="SEO">SEO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Question
                  </label>
                  <input
                    type="text"
                    value={editingItem.faq.question}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        faq: { ...editingItem.faq, question: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                    placeholder="e.g. Why should we choose Build Scale X?"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Comprehensive Answer
                  </label>
                  <textarea
                    rows={5}
                    value={editingItem.faq.answer}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        faq: { ...editingItem.faq, answer: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary resize-none leading-relaxed"
                    placeholder="Provide a transparent, value-driven answer..."
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.faq.active}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          faq: { ...editingItem.faq, active: e.target.checked },
                        })
                      }
                      className="w-4 h-4 rounded text-emerald-400 focus:ring-0 bg-[#030612] border-border/60"
                    />
                    <span className="text-xs font-mono text-white">Active (Visible on public site)</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
                <button
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-silver hover:text-white text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveModal}
                  className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:brightness-110 transition-colors"
                >
                  Save FAQ
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

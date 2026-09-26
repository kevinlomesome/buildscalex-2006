"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Save,
  Check,
  Plus,
  Trash2,
  Edit2,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  X,
  Layers,
  Sparkles
} from "lucide-react";
import { useCMS } from "@/context/cms-context";
import { IndustryItem } from "@/lib/cms-types";
import { saveDocData } from "@/lib/firebase/services";

export default function IndustriesCmsPage() {
  const { industries: initialIndustries } = useCMS();
  const [industries, setIndustries] = useState<IndustryItem[]>(initialIndustries);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (initialIndustries && Array.isArray(initialIndustries)) {
      setIndustries(initialIndustries);
    }
  }, [initialIndustries]);

  // Edit/Create Modal
  const [editingItem, setEditingItem] = useState<{
    industry: IndustryItem;
    isNew?: boolean;
  } | null>(null);

  const handleSaveToFirestore = async (customIndustries?: IndustryItem[]) => {
    const listToSave = customIndustries || industries;
    setSaving(true);
    setSavedSuccess(false);
    try {
      await saveDocData("industries", "list", { items: listToSave });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      alert("Failed to save industries to Firebase");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (id: string) => {
    const updated = industries.map((item) => (item.id === id ? { ...item, active: !item.active } : item));
    setIndustries(updated);
    await handleSaveToFirestore(updated);
  };

  const deleteIndustry = async (id: string) => {
    if (confirm("Are you sure you want to delete this industry?")) {
      const updated = industries.filter((item) => item.id !== id);
      setIndustries(updated);
      await handleSaveToFirestore(updated);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setIndustries((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy.map((item, idx) => ({ ...item, order: idx + 1 }));
    });
  };

  const moveDown = (index: number) => {
    if (index === industries.length - 1) return;
    setIndustries((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy.map((item, idx) => ({ ...item, order: idx + 1 }));
    });
  };

  const handleSaveModal = () => {
    if (!editingItem) return;
    const { industry, isNew } = editingItem;

    setIndustries((prev) => {
      if (isNew) {
        return [...prev, industry];
      }
      return prev.map((item) => (item.id === industry.id ? industry : item));
    });

    setEditingItem(null);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Industries CMS
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-normal">
                  Live Synced
                </span>
              </h1>
              <p className="text-sm text-silver">
                Manage industry verticals displayed on the homepage and services grid.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setEditingItem({
                isNew: true,
                industry: {
                  id: `ind-${Date.now()}`,
                  name: "",
                  iconName: "Briefcase",
                  active: true,
                  order: industries.length + 1,
                },
              })
            }
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4 text-primary" />
            <span>Add Industry</span>
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

      {/* Grid of Industries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {industries.map((ind, index) => (
          <div
            key={ind.id}
            className={`p-5 rounded-2xl bg-[#090d1f]/90 border transition-all space-y-4 ${
              ind.active
                ? "border-border/50 hover:border-primary/40"
                : "border-border/20 opacity-60"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono text-xs font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{ind.name}</h3>
                  <span className="text-[11px] font-mono text-silver">
                    Icon: {ind.iconName}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="p-1 rounded-md text-silver hover:text-white disabled:opacity-30"
                  title="Move Up"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === industries.length - 1}
                  className="p-1 rounded-md text-silver hover:text-white disabled:opacity-30"
                  title="Move Down"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/30">
              <button
                onClick={() => toggleActive(ind.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono border transition-colors ${
                  ind.active
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                    : "bg-white/5 border-white/10 text-silver"
                }`}
              >
                {ind.active ? (
                  <>
                    <Eye className="w-3 h-3" />
                    <span>Active</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3 h-3" />
                    <span>Hidden</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingItem({ industry: ind, isNew: false })}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-silver hover:text-white transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteIndustry(ind.id)}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-rose-500/10 hover:border-rose-500/30 text-silver hover:text-rose-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl bg-[#090d1f] border border-border/60 p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span>{editingItem.isNew ? "Add Industry" : "Edit Industry"}</span>
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
                    Industry Name
                  </label>
                  <input
                    type="text"
                    value={editingItem.industry.name}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        industry: { ...editingItem.industry, name: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                    placeholder="e.g. Healthcare & Clinics"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Lucide Icon Name
                  </label>
                  <input
                    type="text"
                    value={editingItem.industry.iconName}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        industry: { ...editingItem.industry, iconName: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm font-mono focus:outline-none focus:border-primary"
                    placeholder="Stethoscope, Building, ShoppingBag, etc."
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.industry.active}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          industry: { ...editingItem.industry, active: e.target.checked },
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
                  Save Industry
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

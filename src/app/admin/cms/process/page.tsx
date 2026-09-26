"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitBranch,
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
  Layers
} from "lucide-react";
import { useCMS } from "@/context/cms-context";
import { ProcessStep } from "@/lib/cms-types";
import { saveDocData } from "@/lib/firebase/services";

export default function ProcessCmsPage() {
  const { process: initialSteps } = useCMS();
  const [steps, setSteps] = useState<ProcessStep[]>(initialSteps);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (initialSteps && Array.isArray(initialSteps)) {
      setSteps(initialSteps);
    }
  }, [initialSteps]);

  // Edit/Create Modal
  const [editingItem, setEditingItem] = useState<{
    step: ProcessStep;
    isNew?: boolean;
  } | null>(null);

  const handleSaveToFirestore = async (customSteps?: ProcessStep[]) => {
    const listToSave = customSteps || steps;
    setSaving(true);
    setSavedSuccess(false);
    try {
      await saveDocData("process", "list", { items: listToSave });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      alert("Failed to save process steps to Firebase");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (id: string) => {
    const updated = steps.map((item) => (item.id === id ? { ...item, active: !item.active } : item));
    setSteps(updated);
    await handleSaveToFirestore(updated);
  };

  const deleteStep = async (id: string) => {
    if (confirm("Are you sure you want to delete this process step?")) {
      const updated = steps.filter((item) => item.id !== id);
      setSteps(updated);
      await handleSaveToFirestore(updated);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setSteps((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy.map((item, idx) => ({
        ...item,
        order: idx + 1,
        num: String(idx + 1).padStart(2, "0"),
      }));
    });
  };

  const moveDown = (index: number) => {
    if (index === steps.length - 1) return;
    setSteps((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy.map((item, idx) => ({
        ...item,
        order: idx + 1,
        num: String(idx + 1).padStart(2, "0"),
      }));
    });
  };

  const handleSaveModal = () => {
    if (!editingItem) return;
    const { step, isNew } = editingItem;

    setSteps((prev) => {
      if (isNew) {
        return [...prev, step];
      }
      return prev.map((item) => (item.id === step.id ? step : item));
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
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Process Engine CMS
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-normal">
                  Live Synced
                </span>
              </h1>
              <p className="text-sm text-silver">
                Manage the sequential delivery process steps and execution phases.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setEditingItem({
                isNew: true,
                step: {
                  id: `ps-${Date.now()}`,
                  num: String(steps.length + 1).padStart(2, "0"),
                  title: "",
                  desc: "",
                  active: true,
                  order: steps.length + 1,
                },
              })
            }
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4 text-primary" />
            <span>Add Step</span>
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

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`p-5 rounded-2xl bg-[#090d1f]/90 border transition-all space-y-3 ${
              step.active
                ? "border-border/50 hover:border-primary/40"
                : "border-border/20 opacity-60"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent-blue/10 border border-primary/30 flex items-center justify-center text-primary font-mono text-base font-bold shadow-md shadow-primary/10">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    {step.title}
                    {!step.active && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400">
                        Hidden
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-silver mt-1 max-w-2xl leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <div className="flex items-center gap-1 border-r border-border/40 pr-2">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg text-silver hover:text-white disabled:opacity-30 hover:bg-white/5"
                    title="Move Up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === steps.length - 1}
                    className="p-1.5 rounded-lg text-silver hover:text-white disabled:opacity-30 hover:bg-white/5"
                    title="Move Down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => toggleActive(step.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                    step.active
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                      : "bg-white/5 border-white/10 text-silver"
                  }`}
                >
                  {step.active ? "Active" : "Disabled"}
                </button>

                <button
                  onClick={() => setEditingItem({ step, isNew: false })}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-silver hover:text-white transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => deleteStep(step.id)}
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
              className="w-full max-w-lg rounded-2xl bg-[#090d1f] border border-border/60 p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-primary" />
                  <span>{editingItem.isNew ? "Add Process Step" : "Edit Process Step"}</span>
                </h3>
                <button
                  onClick={() => setEditingItem(null)}
                  className="p-1 rounded-lg text-silver hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-silver mb-1.5">
                      Number (2 digits)
                    </label>
                    <input
                      type="text"
                      value={editingItem.step.num}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          step: { ...editingItem.step, num: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm font-mono focus:outline-none focus:border-primary text-center"
                      placeholder="01"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-mono text-silver mb-1.5">
                      Step Title
                    </label>
                    <input
                      type="text"
                      value={editingItem.step.title}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          step: { ...editingItem.step, title: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                      placeholder="e.g. Discovery & Blueprint"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Description & Objectives
                  </label>
                  <textarea
                    rows={4}
                    value={editingItem.step.desc}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        step: { ...editingItem.step, desc: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary resize-none leading-relaxed"
                    placeholder="Briefly describe what occurs during this milestone..."
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.step.active}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          step: { ...editingItem.step, active: e.target.checked },
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
                  Save Step
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

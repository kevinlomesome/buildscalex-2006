"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCheck,
  Save,
  Check,
  Plus,
  Trash2,
  Edit2,
  Star,
  Eye,
  EyeOff,
  X,
  Building,
  Quote
} from "lucide-react";
import { TestimonialItem } from "@/lib/cms-types";
import { saveDocData } from "@/lib/firebase/services";
import { useCMS } from "@/context/cms-context";
import { defaultTestimonials } from "@/lib/default-content";

export default function TestimonialsCmsPage() {
  const { testimonials: initialTestimonials } = useCMS();
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials || defaultTestimonials);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (initialTestimonials && Array.isArray(initialTestimonials)) {
      setTestimonials(initialTestimonials);
    }
  }, [initialTestimonials]);

  // Edit Modal
  const [editingItem, setEditingItem] = useState<{
    testimonial: TestimonialItem;
    isNew?: boolean;
  } | null>(null);

  const handleSaveToFirestore = async (customTestimonials?: TestimonialItem[]) => {
    const listToSave = customTestimonials || testimonials;
    setSaving(true);
    setSavedSuccess(false);
    try {
      await saveDocData("testimonials", "list", { items: listToSave });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      alert("Failed to save testimonials to Firebase");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (id: string) => {
    const updated = testimonials.map((item) => (item.id === id ? { ...item, active: !item.active } : item));
    setTestimonials(updated);
    await handleSaveToFirestore(updated);
  };

  const deleteTestimonial = async (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      const updated = testimonials.filter((item) => item.id !== id);
      setTestimonials(updated);
      await handleSaveToFirestore(updated);
    }
  };

  const handleSaveModal = () => {
    if (!editingItem) return;
    const { testimonial, isNew } = editingItem;

    setTestimonials((prev) => {
      if (isNew) {
        return [...prev, testimonial];
      }
      return prev.map((item) => (item.id === testimonial.id ? testimonial : item));
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
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Testimonials & Client Proof CMS
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-normal">
                  Live Synced
                </span>
              </h1>
              <p className="text-sm text-silver">
                Manage client testimonials, star ratings, case study quotes, and authority proof.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setEditingItem({
                isNew: true,
                testimonial: {
                  id: `test-${Date.now()}`,
                  name: "",
                  company: "",
                  role: "Founder & CEO",
                  content: "",
                  rating: 5,
                  active: true,
                },
              })
            }
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4 text-primary" />
            <span>Add Testimonial</span>
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

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-2xl bg-[#090d1f]/90 border transition-all flex flex-col justify-between space-y-4 ${
              item.active
                ? "border-border/50 hover:border-primary/40"
                : "border-border/20 opacity-60"
            }`}
          >
            <div className="space-y-3">
              {/* Rating stars */}
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-4 h-4 ${
                      idx < item.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-white/20"
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote className="w-6 h-6 text-primary/20 absolute -top-2 -left-1 pointer-events-none" />
                <p className="text-xs text-silver leading-relaxed pl-5 italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>
            </div>

            {/* Author & Actions */}
            <div className="pt-4 border-t border-border/30 space-y-3">
              <div>
                <h4 className="text-sm font-bold text-white">{item.name}</h4>
                <p className="text-xs text-silver font-mono">
                  {item.role} • <span className="text-accent-blue">{item.company}</span>
                </p>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleActive(item.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors ${
                    item.active
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                      : "bg-white/5 border-white/10 text-silver"
                  }`}
                >
                  {item.active ? "Active" : "Hidden"}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEditingItem({ testimonial: item, isNew: false })}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-silver hover:text-white"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteTestimonial(item.id)}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-rose-500/10 text-silver hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
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
                  <UserCheck className="w-4 h-4 text-primary" />
                  <span>
                    {editingItem.isNew ? "Add Client Testimonial" : "Edit Testimonial"}
                  </span>
                </h3>
                <button
                  onClick={() => setEditingItem(null)}
                  className="p-1 rounded-lg text-silver hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-silver mb-1.5">
                      Client Full Name
                    </label>
                    <input
                      type="text"
                      value={editingItem.testimonial.name}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          testimonial: {
                            ...editingItem.testimonial,
                            name: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                      placeholder="Vikram Malhotra"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-silver mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={editingItem.testimonial.company}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          testimonial: {
                            ...editingItem.testimonial,
                            company: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                      placeholder="Apex Logistics"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-silver mb-1.5">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      value={editingItem.testimonial.role}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          testimonial: {
                            ...editingItem.testimonial,
                            role: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                      placeholder="Founder & CEO"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-silver mb-1.5">
                      Rating (1 to 5 Stars)
                    </label>
                    <select
                      value={editingItem.testimonial.rating}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          testimonial: {
                            ...editingItem.testimonial,
                            rating: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                    >
                      <option value={5}>5 Stars (★★★★★)</option>
                      <option value={4}>4 Stars (★★★★☆)</option>
                      <option value={3}>3 Stars (★★★☆☆)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Testimonial Quote / Review
                  </label>
                  <textarea
                    rows={4}
                    value={editingItem.testimonial.content}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        testimonial: {
                          ...editingItem.testimonial,
                          content: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary resize-none leading-relaxed"
                    placeholder="Enter the client's words and quantifiable outcomes..."
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.testimonial.active}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          testimonial: {
                            ...editingItem.testimonial,
                            active: e.target.checked,
                          },
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
                  Save Testimonial
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Plus,
  Trash2,
  Edit2,
  Check,
  Save,
  Globe,
  Filter,
  TrendingUp,
  Bot,
  Database,
  LineChart,
  Palette,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  X
} from "lucide-react";
import { useCMS } from "@/context/cms-context";
import { ServiceItem, ServiceCategory } from "@/lib/cms-types";
import { saveDocData } from "@/lib/firebase/services";

export default function ServicesCmsPage() {
  const { services: initialServices } = useCMS();
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>("01-website-development");
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (initialServices && Array.isArray(initialServices)) {
      setServices(initialServices);
    }
  }, [initialServices]);

  // Category Edit Modal
  const [editingCategory, setEditingCategory] = useState<{
    serviceId: string;
    category: ServiceCategory;
    isNew?: boolean;
  } | null>(null);

  // Service Edit Modal
  const [editingService, setEditingService] = useState<{
    service: ServiceItem;
    isNew?: boolean;
  } | null>(null);

  const handleSaveToFirestore = async (customServices?: ServiceItem[]) => {
    const listToSave = customServices || services;
    setSaving(true);
    setSavedSuccess(false);
    try {
      await saveDocData("services", "list", { items: listToSave });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      alert("Failed to save services to Firebase");
    } finally {
      setSaving(false);
    }
  };

  const toggleServiceActive = async (serviceId: string) => {
    const updated = services.map((s) => (s.id === serviceId ? { ...s, active: !s.active } : s));
    setServices(updated);
    await handleSaveToFirestore(updated);
  };

  const deleteService = async (serviceId: string) => {
    if (confirm("Are you sure you want to delete this service and all its categories?")) {
      const updated = services.filter((s) => s.id !== serviceId);
      setServices(updated);
      await handleSaveToFirestore(updated);
    }
  };

  const deleteCategory = async (serviceId: string, categoryId: string) => {
    const updated = services.map((s) => {
      if (s.id !== serviceId) return s;
      return {
        ...s,
        categories: s.categories.filter((c) => c.id !== categoryId),
      };
    });
    setServices(updated);
    await handleSaveToFirestore(updated);
  };

  const handleSaveCategory = () => {
    if (!editingCategory) return;
    const { serviceId, category, isNew } = editingCategory;

    setServices((prev) =>
      prev.map((s) => {
        if (s.id !== serviceId) return s;
        let updatedCats = [...s.categories];
        if (isNew) {
          updatedCats.push(category);
        } else {
          updatedCats = updatedCats.map((c) => (c.id === category.id ? category : c));
        }
        return { ...s, categories: updatedCats };
      })
    );
    setEditingCategory(null);
  };

  const handleSaveService = () => {
    if (!editingService) return;
    const { service, isNew } = editingService;

    if (isNew) {
      setServices((prev) => [...prev, service]);
    } else {
      setServices((prev) => prev.map((s) => (s.id === service.id ? service : s)));
    }
    setEditingService(null);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl border border-border/80 bg-card/60 glass">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-heading">
              Services &amp; Categories CMS
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[#38BDF8] text-[10px] font-mono font-bold uppercase">
              {services.reduce((acc, s) => acc + s.categories.length, 0)} Total Solutions
            </span>
          </div>
          <p className="text-xs sm:text-sm text-silver">
            Manage your 7 core service systems and all specialized deliverables without touching code.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() =>
              setEditingService({
                service: {
                  id: `srv-${Date.now()}`,
                  number: `0${services.length + 1}`,
                  title: "New Service System",
                  subtitle: "Enterprise Deliverables",
                  description: "Comprehensive deliverables tailored for business scale.",
                  iconName: "Globe",
                  active: true,
                  order: services.length + 1,
                  categories: [],
                },
                isNew: true,
              })
            }
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/80 bg-black/5 dark:bg-white/[0.03] hover:bg-black/10 text-foreground text-xs font-semibold transition cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Service</span>
          </button>

          <button
            onClick={() => handleSaveToFirestore()}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <span>Saving to Firebase...</span>
            ) : savedSuccess ? (
              <>
                <Check size={14} />
                <span>Changes Saved!</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>Publish to Live Website</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service, sIndex) => {
          const isExpanded = expandedServiceId === service.id;

          return (
            <div
              key={service.id}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? "border-primary/50 bg-card/80 shadow-xl"
                  : "border-border/80 bg-card/50 hover:border-border"
              }`}
            >
              {/* Service Header Row */}
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div
                  onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                  className="flex items-center gap-4 flex-1 cursor-pointer select-none"
                >
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-[#38BDF8] shrink-0">
                    {service.number}
                  </span>

                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-heading font-bold text-base sm:text-lg text-foreground">
                        {service.title}
                      </h3>
                      {!service.active && (
                        <span className="px-2 py-0.5 rounded-md bg-red-500/15 text-red-400 text-[10px] font-mono uppercase font-bold">
                          Hidden
                        </span>
                      )}
                      <span className="text-[11px] text-silver font-mono">
                        ({service.categories.length} categories)
                      </span>
                    </div>
                    <p className="text-xs text-silver mt-0.5 line-clamp-1">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() =>
                      setEditingCategory({
                        serviceId: service.id,
                        category: {
                          id: `cat-${Date.now()}`,
                          title: "New Deliverable",
                          description: "Description of the specialized offering.",
                          iconName: "Sparkles",
                          active: true,
                        },
                        isNew: true,
                      })
                    }
                    className="p-2 rounded-xl border border-border text-silver hover:text-foreground hover:bg-black/5 text-xs flex items-center gap-1 font-medium transition cursor-pointer"
                    title="Add Category"
                  >
                    <Plus size={14} />
                    <span className="hidden sm:inline">Add Category</span>
                  </button>

                  <button
                    onClick={() => setEditingService({ service, isNew: false })}
                    className="p-2 rounded-xl border border-border text-silver hover:text-foreground hover:bg-black/5 transition"
                    title="Edit Service Info"
                  >
                    <Edit2 size={14} />
                  </button>

                  <button
                    onClick={() => toggleServiceActive(service.id)}
                    className="p-2 rounded-xl border border-border text-silver hover:text-foreground hover:bg-black/5 transition"
                    title={service.active ? "Hide Service" : "Publish Service"}
                  >
                    {service.active ? <Eye size={14} /> : <EyeOff size={14} className="text-red-400" />}
                  </button>

                  <button
                    onClick={() => deleteService(service.id)}
                    className="p-2 rounded-xl border border-border text-silver hover:text-destructive hover:bg-destructive/10 transition"
                    title="Delete Service"
                  >
                    <Trash2 size={14} />
                  </button>

                  <button
                    onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                    className="p-2 rounded-xl border border-border text-silver hover:text-foreground hover:bg-black/5 transition"
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Collapsible Categories Grid */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border/70 p-5 sm:p-6 bg-black/20"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-silver font-semibold">
                        Specialized Categories &amp; Deliverables ({service.categories.length})
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {service.categories.map((cat) => (
                        <div
                          key={cat.id}
                          className="p-3.5 rounded-2xl border border-border/60 bg-card/60 glass hover:border-primary/40 transition flex flex-col justify-between group"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <h4 className="font-heading font-bold text-xs text-foreground group-hover:text-primary transition">
                                {cat.title}
                              </h4>
                              <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition">
                                <button
                                  onClick={() =>
                                    setEditingCategory({
                                      serviceId: service.id,
                                      category: cat,
                                      isNew: false,
                                    })
                                  }
                                  className="p-1 hover:text-primary"
                                  title="Edit Category"
                                >
                                  <Edit2 size={12} />
                                </button>
                                <button
                                  onClick={() => deleteCategory(service.id, cat.id)}
                                  className="p-1 hover:text-destructive"
                                  title="Delete Category"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                            <p className="text-[11px] text-silver leading-relaxed line-clamp-2">
                              {cat.description}
                            </p>
                          </div>

                          <div className="mt-2.5 pt-2 border-t border-border/40 text-[10px] text-silver/60 font-mono">
                            Icon: {cat.iconName || "Sparkles"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Edit Category Modal */}
      <AnimatePresence>
        {editingCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#050816] border border-border rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setEditingCategory(null)}
                className="absolute top-5 right-5 p-1.5 rounded-xl border border-border text-silver hover:text-foreground"
              >
                <X size={16} />
              </button>

              <h2 className="text-lg font-bold text-foreground mb-4">
                {editingCategory.isNew ? "Add Service Category" : "Edit Service Category"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-silver block mb-1">Title</label>
                  <input
                    type="text"
                    value={editingCategory.category.title}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        category: { ...editingCategory.category, title: e.target.value },
                      })
                    }
                    className="w-full bg-black/40 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs text-silver block mb-1">Description</label>
                  <textarea
                    value={editingCategory.category.description}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        category: { ...editingCategory.category, description: e.target.value },
                      })
                    }
                    className="w-full bg-black/40 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary min-h-[80px]"
                  />
                </div>

                <div>
                  <label className="text-xs text-silver block mb-1">Icon Name (Lucide)</label>
                  <input
                    type="text"
                    value={editingCategory.category.iconName || "Sparkles"}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        category: { ...editingCategory.category, iconName: e.target.value },
                      })
                    }
                    placeholder="Globe, Layers, Cpu, Database..."
                    className="w-full bg-black/40 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary font-mono"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="px-4 py-2 rounded-xl border border-border text-xs text-silver hover:text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveCategory}
                    className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold cursor-pointer"
                  >
                    Save Category
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Service Modal */}
      <AnimatePresence>
        {editingService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#050816] border border-border rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button
                onClick={() => setEditingService(null)}
                className="absolute top-5 right-5 p-1.5 rounded-xl border border-border text-silver hover:text-foreground"
              >
                <X size={16} />
              </button>

              <h2 className="text-lg font-bold text-foreground mb-4">
                {editingService.isNew ? "Add Service System" : "Edit Service System"}
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-3">
                  <div className="col-span-1">
                    <label className="text-xs text-silver block mb-1">Number</label>
                    <input
                      type="text"
                      value={editingService.service.number}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          service: { ...editingService.service, number: e.target.value },
                        })
                      }
                      className="w-full bg-black/40 border border-border rounded-xl px-3 py-2 text-xs text-foreground font-mono"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="text-xs text-silver block mb-1">Title</label>
                    <input
                      type="text"
                      value={editingService.service.title}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          service: { ...editingService.service, title: e.target.value },
                        })
                      }
                      className="w-full bg-black/40 border border-border rounded-xl px-3 py-2 text-xs text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-silver block mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={editingService.service.subtitle}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        service: { ...editingService.service, subtitle: e.target.value },
                      })
                    }
                    className="w-full bg-black/40 border border-border rounded-xl px-3 py-2 text-xs text-foreground"
                  />
                </div>

                <div>
                  <label className="text-xs text-silver block mb-1">Description</label>
                  <textarea
                    value={editingService.service.description}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        service: { ...editingService.service, description: e.target.value },
                      })
                    }
                    className="w-full bg-black/40 border border-border rounded-xl px-3 py-2 text-xs text-foreground min-h-[80px]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 rounded-xl border border-border text-xs text-silver hover:text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveService}
                    className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold cursor-pointer"
                  >
                    Save Service
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

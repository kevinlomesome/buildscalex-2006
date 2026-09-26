"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Save,
  Check,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Eye,
  EyeOff,
  X,
  Layers,
  Sparkles,
  Globe
} from "lucide-react";
import { ProjectItem } from "@/lib/cms-types";
import { saveDocData } from "@/lib/firebase/services";
import { useCMS } from "@/context/cms-context";
import { defaultProjects } from "@/lib/default-content";

export default function ProjectsCmsPage() {
  const { projects: initialProjects } = useCMS();
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects || defaultProjects);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (initialProjects && Array.isArray(initialProjects)) {
      setProjects(initialProjects);
    }
  }, [initialProjects]);

  // Edit/Create Modal
  const [editingItem, setEditingItem] = useState<{
    project: ProjectItem;
    isNew?: boolean;
  } | null>(null);

  const [newServiceTag, setNewServiceTag] = useState("");

  const handleSaveToFirestore = async (customProjects?: ProjectItem[]) => {
    const listToSave = customProjects || projects;
    setSaving(true);
    setSavedSuccess(false);
    try {
      await saveDocData("projects", "list", { items: listToSave });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      alert("Failed to save projects to Firebase");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (id: string) => {
    const updated = projects.map((item) => (item.id === id ? { ...item, active: !item.active } : item));
    setProjects(updated);
    await handleSaveToFirestore(updated);
  };

  const deleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this case study project?")) {
      const updated = projects.filter((item) => item.id !== id);
      setProjects(updated);
      await handleSaveToFirestore(updated);
    }
  };

  const handleSaveModal = () => {
    if (!editingItem) return;
    const { project, isNew } = editingItem;

    setProjects((prev) => {
      if (isNew) {
        return [...prev, project];
      }
      return prev.map((item) => (item.id === project.id ? project : item));
    });

    setEditingItem(null);
  };

  const addServiceTag = () => {
    if (!newServiceTag.trim() || !editingItem) return;
    if (editingItem.project.servicesUsed.includes(newServiceTag.trim())) return;
    setEditingItem({
      ...editingItem,
      project: {
        ...editingItem.project,
        servicesUsed: [...editingItem.project.servicesUsed, newServiceTag.trim()],
      },
    });
    setNewServiceTag("");
  };

  const removeServiceTag = (tag: string) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      project: {
        ...editingItem.project,
        servicesUsed: editingItem.project.servicesUsed.filter((t) => t !== tag),
      },
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Projects & Case Studies CMS
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-normal">
                  Live Synced
                </span>
              </h1>
              <p className="text-sm text-silver">
                Showcase client outcomes, deployed web applications, and ROI statistics.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setEditingItem({
                isNew: true,
                project: {
                  id: `proj-${Date.now()}`,
                  title: "",
                  client: "",
                  category: "Website Development",
                  servicesUsed: ["Website Development"],
                  description: "",
                  link: "",
                  active: true,
                },
              })
            }
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4 text-primary" />
            <span>Add Project</span>
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

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className={`p-6 rounded-2xl bg-[#090d1f]/90 border transition-all flex flex-col justify-between space-y-4 ${
              proj.active
                ? "border-border/50 hover:border-primary/40"
                : "border-border/20 opacity-60"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
                  {proj.category}
                </span>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-silver hover:text-white transition-colors"
                    title="Visit project"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-white leading-snug">
                  {proj.title}
                </h3>
                <p className="text-xs text-accent-blue font-mono mt-0.5">
                  Client: {proj.client}
                </p>
              </div>

              <p className="text-xs text-silver leading-relaxed line-clamp-3">
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {proj.servicesUsed.map((svc) => (
                  <span
                    key={svc}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-silver font-mono"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border/30 flex items-center justify-between">
              <button
                onClick={() => toggleActive(proj.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors ${
                  proj.active
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                    : "bg-white/5 border-white/10 text-silver"
                }`}
              >
                {proj.active ? "Active" : "Hidden"}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingItem({ project: proj, isNew: false })}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-silver hover:text-white"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteProject(proj.id)}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-rose-500/10 text-silver hover:text-rose-400"
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
              className="w-full max-w-xl rounded-2xl bg-[#090d1f] border border-border/60 p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Palette className="w-4 h-4 text-primary" />
                  <span>{editingItem.isNew ? "Add Case Study Project" : "Edit Case Study"}</span>
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
                    Case Study Title
                  </label>
                  <input
                    type="text"
                    value={editingItem.project.title}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        project: { ...editingItem.project, title: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                    placeholder="e.g. Apex Logistics B2B Client Engine"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-silver mb-1.5">
                      Client Name / Brand
                    </label>
                    <input
                      type="text"
                      value={editingItem.project.client}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          project: { ...editingItem.project, client: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                      placeholder="Apex Freight Corp"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-silver mb-1.5">
                      Industry / Category
                    </label>
                    <input
                      type="text"
                      value={editingItem.project.category}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          project: { ...editingItem.project, category: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                      placeholder="Full Growth System"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Live Demo / Website URL
                  </label>
                  <input
                    type="url"
                    value={editingItem.project.link || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        project: { ...editingItem.project, link: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm font-mono focus:outline-none focus:border-primary"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Case Study Description & Outcomes
                  </label>
                  <textarea
                    rows={4}
                    value={editingItem.project.description}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        project: { ...editingItem.project, description: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary resize-none leading-relaxed"
                  />
                </div>

                {/* Services Used Tags */}
                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Services Utilized
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {editingItem.project.servicesUsed.map((svc) => (
                      <span
                        key={svc}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white"
                      >
                        {svc}
                        <button
                          onClick={() => removeServiceTag(svc)}
                          className="text-silver hover:text-rose-400"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newServiceTag}
                      onChange={(e) => setNewServiceTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addServiceTag();
                        }
                      }}
                      placeholder="Add service tag (e.g. Sales Funnels)..."
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#030612] border border-border/50 text-xs text-white placeholder-silver/40 focus:outline-none focus:border-primary"
                    />
                    <button
                      onClick={addServiceTag}
                      className="px-3 py-1.5 rounded-lg bg-primary/20 border border-primary/30 text-xs text-primary font-medium hover:bg-primary/30"
                    >
                      Add Tag
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.project.active}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          project: {
                            ...editingItem.project,
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
                  Save Project
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

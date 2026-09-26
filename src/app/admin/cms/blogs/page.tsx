"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Save,
  Check,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  X,
  Tag,
  Calendar,
  User,
  Search
} from "lucide-react";
import { BlogPost } from "@/lib/cms-types";
import { saveDocData } from "@/lib/firebase/services";
import { useCMS } from "@/context/cms-context";
import { defaultBlogs } from "@/lib/default-content";

export default function BlogsCmsPage() {
  const { blogs: initialBlogs } = useCMS();
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs || defaultBlogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (initialBlogs && Array.isArray(initialBlogs)) {
      setBlogs(initialBlogs);
    }
  }, [initialBlogs]);

  // Edit/Create Modal
  const [editingItem, setEditingItem] = useState<{
    blog: BlogPost;
    isNew?: boolean;
  } | null>(null);

  const [newTag, setNewTag] = useState("");

  const handleSaveToFirestore = async (customBlogs?: BlogPost[]) => {
    const listToSave = customBlogs || blogs;
    setSaving(true);
    setSavedSuccess(false);
    try {
      await saveDocData("blogs", "list", { items: listToSave });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      alert("Failed to save blogs to Firebase");
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (id: string) => {
    const updated = blogs.map((item) =>
      item.id === id ? { ...item, published: !item.published } : item
    );
    setBlogs(updated);
    await handleSaveToFirestore(updated);
  };

  const deleteBlog = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const updated = blogs.filter((item) => item.id !== id);
      setBlogs(updated);
      await handleSaveToFirestore(updated);
    }
  };

  const handleSaveModal = () => {
    if (!editingItem) return;
    const { blog, isNew } = editingItem;

    setBlogs((prev) => {
      if (isNew) {
        return [...prev, blog];
      }
      return prev.map((item) => (item.id === blog.id ? blog : item));
    });

    setEditingItem(null);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const addTag = () => {
    if (!newTag.trim() || !editingItem) return;
    if (editingItem.blog.tags.includes(newTag.trim())) return;
    setEditingItem({
      ...editingItem,
      blog: {
        ...editingItem.blog,
        tags: [...editingItem.blog.tags, newTag.trim()],
      },
    });
    setNewTag("");
  };

  const removeTag = (tag: string) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      blog: {
        ...editingItem.blog,
        tags: editingItem.blog.tags.filter((t) => t !== tag),
      },
    });
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Articles & Growth Blog CMS
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-normal">
                  Live Synced
                </span>
              </h1>
              <p className="text-sm text-silver">
                Publish high-authority industry articles, SEO guides, and case breakdown teardowns.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setEditingItem({
                isNew: true,
                blog: {
                  id: `blog-${Date.now()}`,
                  title: "",
                  slug: "",
                  excerpt: "",
                  content: "",
                  category: "Architecture",
                  tags: ["Next.js", "Growth"],
                  published: true,
                  createdAt: new Date().toISOString().split("T")[0],
                  author: "Build Scale X Editorial",
                },
              })
            }
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4 text-primary" />
            <span>Write Article</span>
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

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-silver" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search articles by title, excerpt, or category..."
          className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#090d1f] border border-border/60 text-white text-xs placeholder-silver/50 focus:outline-none focus:border-primary"
        />
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {filteredBlogs.map((b) => (
          <div
            key={b.id}
            className={`p-6 rounded-2xl bg-[#090d1f]/90 border transition-all space-y-4 ${
              b.published
                ? "border-border/50 hover:border-primary/40"
                : "border-border/20 opacity-60"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
                    {b.category}
                  </span>
                  <span className="text-xs text-silver font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-silver/60" />
                    {b.createdAt}
                  </span>
                  <span className="text-xs text-silver font-mono flex items-center gap-1">
                    <User className="w-3 h-3 text-silver/60" />
                    {b.author}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {b.title}
                </h3>

                <p className="text-xs text-silver leading-relaxed line-clamp-2">
                  {b.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {b.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-silver font-mono"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-start">
                <button
                  onClick={() => togglePublished(b.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                    b.published
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                      : "bg-white/5 border-white/10 text-silver"
                  }`}
                >
                  {b.published ? "Published" : "Draft"}
                </button>

                <button
                  onClick={() => setEditingItem({ blog: b, isNew: false })}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-silver hover:text-white transition-colors"
                  title="Edit article"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => deleteBlog(b.id)}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-rose-500/10 text-silver hover:text-rose-400 transition-colors"
                  title="Delete article"
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
              className="w-full max-w-2xl rounded-2xl bg-[#090d1f] border border-border/60 p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>{editingItem.isNew ? "Create New Article" : "Edit Article"}</span>
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
                    Article Title
                  </label>
                  <input
                    type="text"
                    value={editingItem.blog.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setEditingItem({
                        ...editingItem,
                        blog: {
                          ...editingItem.blog,
                          title: newTitle,
                          slug: editingItem.isNew
                            ? generateSlug(newTitle)
                            : editingItem.blog.slug,
                        },
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                    placeholder="e.g. Why Custom Next.js Beats Legacy CMS"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-silver mb-1.5">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={editingItem.blog.slug}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          blog: { ...editingItem.blog, slug: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm font-mono focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-silver mb-1.5">
                      Category
                    </label>
                    <input
                      type="text"
                      value={editingItem.blog.category}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          blog: { ...editingItem.blog, category: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Article Excerpt (SEO Meta Preview)
                  </label>
                  <textarea
                    rows={2}
                    value={editingItem.blog.excerpt}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        blog: { ...editingItem.blog, excerpt: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Full Content (Markdown / Text)
                  </label>
                  <textarea
                    rows={8}
                    value={editingItem.blog.content}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        blog: { ...editingItem.blog, content: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm font-mono focus:outline-none focus:border-primary resize-none leading-relaxed"
                    placeholder="Write article content..."
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {editingItem.blog.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white"
                      >
                        #{t}
                        <button
                          onClick={() => removeTag(t)}
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
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      placeholder="Add tag..."
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#030612] border border-border/50 text-xs text-white placeholder-silver/40 focus:outline-none focus:border-primary"
                    />
                    <button
                      onClick={addTag}
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
                      checked={editingItem.blog.published}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          blog: {
                            ...editingItem.blog,
                            published: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 rounded text-emerald-400 focus:ring-0 bg-[#030612] border-border/60"
                    />
                    <span className="text-xs font-mono text-white">Publish Immediately</span>
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
                  Save Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

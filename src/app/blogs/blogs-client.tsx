"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Search,
  Tag,
  Clock,
  User,
  ArrowRight,
  Sparkles,
  BookOpen
} from "lucide-react";
import { useCMS } from "@/context/cms-context";
import { BlogPost } from "@/lib/cms-types";
import { defaultBlogs } from "@/lib/default-content";

function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
}

export function BlogsClient() {
  const { blogs: cmsBlogs } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Use CMS blogs if available, otherwise default
  const allBlogs: BlogPost[] = useMemo(() => {
    if (cmsBlogs && cmsBlogs.length > 0) {
      return cmsBlogs;
    }
    return defaultBlogs;
  }, [cmsBlogs]);

  // Filter for published posts only
  const publishedBlogs = useMemo(() => {
    return allBlogs.filter((b) => b.published !== false);
  }, [allBlogs]);

  // Unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    publishedBlogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return ["All", ...Array.from(set)];
  }, [publishedBlogs]);

  // Filtered by category and search
  const filteredBlogs = useMemo(() => {
    return publishedBlogs.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags &&
          post.tags.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          ));
      return matchesCategory && matchesSearch;
    });
  }, [publishedBlogs, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden bg-[#06080E] border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-silver uppercase tracking-wider mb-6">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span>Technical Insights & Engineering Articles</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            Architectural Insights &amp; Growth Strategies.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-silver leading-relaxed max-w-2xl mx-auto mb-10">
            Real-world case studies, architectural blueprints, and tactical guides on how we engineer sub-second web platforms, automated lead acquisition, and autonomous AI pipelines.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <Search className="w-4 h-4 text-silver/60 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles by title, topic, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#0B0E18] border border-white/10 focus:border-primary/60 text-sm text-foreground placeholder:text-silver/50 focus:outline-none transition-all shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-20 relative bg-[#080A11] flex-1">
        <div className="container mx-auto px-4 md:px-6">
          {/* Category Tabs */}
          {categories.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                    selectedCategory === cat
                      ? "bg-primary text-white border-primary/50 shadow-sm"
                      : "bg-[#0C0F1A] text-silver border-white/[0.06] hover:text-foreground hover:border-white/15"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Articles Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((post) => {
                const readTime = getReadingTime(post.content || post.excerpt || "");
                return (
                  <article
                    key={post.id}
                    className="bg-[#0C0F1A] border border-white/[0.06] hover:border-white/15 rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 group"
                  >
                    <div>
                      {/* Meta top */}
                      <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.05] text-[11px] font-mono text-silver/70">
                        <span className="px-2.5 py-1 rounded-md bg-white/[0.04] text-primary font-semibold">
                          {post.category || "Architecture"}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-silver/50" />
                          <span>{readTime}</span>
                        </div>
                      </div>

                      <Link href={`/blogs/${post.slug}`}>
                        <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                          {post.title}
                        </h2>
                      </Link>

                      <p className="text-sm text-silver line-clamp-3 leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                    </div>

                    <div>
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {post.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-silver/60 border border-white/[0.05]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-silver/70">
                          <User className="w-3.5 h-3.5 text-silver/40" />
                          <span>{post.author || "BuildScaleX Team"}</span>
                        </div>

                        <Link
                          href={`/blogs/${post.slug}`}
                          className="font-mono text-primary font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                        >
                          <span>Read Full Post</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24 bg-[#0C0F1A] rounded-2xl border border-white/[0.06] max-w-2xl mx-auto p-8">
              <FileText className="w-12 h-12 text-silver/40 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">No Articles Found</h3>
              <p className="text-sm text-silver">
                {searchQuery
                  ? `No published articles matched your search "${searchQuery}". Try different keywords.`
                  : "New strategic architectural articles are currently being drafted. Check back soon!"}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

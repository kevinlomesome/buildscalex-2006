"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  User,
  Calendar,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Share2,
  Tag,
  MessageSquare
} from "lucide-react";
import { BlogPost } from "@/lib/cms-types";
import { useCMS } from "@/context/cms-context";
import { getWhatsAppLink } from "@/lib/constants";
import { CtaSection } from "@/components/sections/cta";

function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
}

export function BlogDetailClient({
  initialPost,
  slug,
}: {
  initialPost: BlogPost;
  slug: string;
}) {
  const { blogs } = useCMS();

  // Real-time synchronization with CMS
  const post = useMemo(() => {
    if (!blogs || blogs.length === 0) return initialPost;
    const found = blogs.find((b) => b.slug === slug || b.id === slug);
    return found || initialPost;
  }, [blogs, slug, initialPost]);

  // Related posts (same category, different id)
  const relatedPosts = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];
    return blogs
      .filter((b) => b.published && b.id !== post.id && b.category === post.category)
      .slice(0, 2);
  }, [blogs, post]);

  const readTime = getReadingTime(post.content || post.excerpt || "");

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Article Header */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 relative overflow-hidden bg-[#06080E] border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-silver mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-silver/40" />
            <Link href="/blogs" className="hover:text-foreground transition-colors">
              Insights
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-silver/40" />
            <span className="text-primary font-semibold line-clamp-1">{post.title}</span>
          </div>

          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-primary uppercase tracking-wider mb-6">
            <span>{post.category || "Architecture"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-silver leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Meta Info Bar */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/[0.08] text-xs font-mono text-silver/80">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <span>{post.author || "BuildScaleX Engineering"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{post.createdAt || "March 2026"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cover Image if exists */}
      {post.coverImage && (
        <section className="py-8 bg-[#080A11]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Body Content */}
      <section className="py-14 md:py-20 relative bg-[#080A11]">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="prose prose-invert max-w-none text-silver leading-relaxed space-y-6 text-base sm:text-lg">
            {post.content.split("\n\n").map((block, idx) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={idx} className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                    {trimmed.replace(/^###\s+/, "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={idx} className="text-2xl sm:text-3xl font-extrabold text-foreground mt-10 mb-4 pb-2 border-b border-white/[0.08]">
                    {trimmed.replace(/^##\s+/, "")}
                  </h2>
                );
              }
              if (trimmed.startsWith("# ")) {
                return (
                  <h1 key={idx} className="text-3xl sm:text-4xl font-extrabold text-foreground mt-12 mb-4">
                    {trimmed.replace(/^#\s+/, "")}
                  </h1>
                );
              }
              if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                const items = trimmed.split("\n").map((line) => line.replace(/^[-*]\s+/, ""));
                return (
                  <ul key={idx} className="list-disc pl-6 space-y-2 my-4 text-silver">
                    {items.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={idx} className="leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/[0.08]">
              <h4 className="text-xs font-mono uppercase text-silver/60 mb-3 tracking-wider flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-primary" />
                <span>Article Topics</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-[#0C0F1A] border border-white/[0.08] text-silver"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* WhatsApp Direct Author Consultation */}
          <div className="mt-12 p-8 rounded-2xl bg-[#0C0F1A] border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold text-foreground mb-1">
                Have questions regarding this system?
              </h4>
              <p className="text-sm text-silver">
                Discuss implementation timelines and custom engineering with our lead architects.
              </p>
            </div>
            <Link
              href={getWhatsAppLink(
                `Hi BuildScaleX, I just read your article "${post.title}" and would like to discuss implementing this system.`
              )}
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-blue-600 text-white text-xs font-semibold shrink-0 transition-all shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss via WhatsApp</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-[#06080E] border-t border-white/[0.06]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h3 className="text-xl font-bold text-foreground mb-6">
              Related Engineering Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blogs/${rel.slug}`}
                  className="p-6 rounded-2xl bg-[#0C0F1A] border border-white/[0.06] hover:border-white/15 transition-all group"
                >
                  <span className="text-[10px] font-mono uppercase text-primary font-semibold mb-2 block">
                    {rel.category}
                  </span>
                  <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-silver line-clamp-2 leading-relaxed">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Conversion CTA */}
      <CtaSection />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Sparkles,
  Star
} from "lucide-react";
import Link from "next/link";
import { PageItem } from "@/lib/cms-types";
import { useCMS } from "@/context/cms-context";
import { ServicesSection } from "@/components/sections/services";
import { FaqSection } from "@/components/sections/faq";
import { CtaSection } from "@/components/sections/cta";

export function DynamicPageClient({
  initialPage,
  slug,
}: {
  initialPage: PageItem;
  slug: string;
}) {
  const { pages } = useCMS();
  // Keep synced in realtime if CMS updates
  const page = pages?.find((p) => p.slug === slug) || initialPage;

  return (
    <div className="min-h-screen bg-[#050816] text-foreground antialiased selection:bg-primary/20">
      {/* Dynamic Sections rendering */}
      {page.sections
        .filter((s) => s.active)
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((sec) => {
          // 1. HERO SECTION
          if (sec.type === "hero") {
            return (
              <section key={sec.id} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/15 blur-[120px] rounded-full pointer-events-none" />
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
                  {sec.badge && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary mb-6"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{sec.badge}</span>
                    </motion.div>
                  )}

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight"
                  >
                    {sec.title}
                  </motion.h1>

                  {sec.subtitle && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-base sm:text-lg text-silver mt-6 max-w-2xl mx-auto leading-relaxed"
                    >
                      {sec.subtitle}
                    </motion.p>
                  )}

                  {sec.buttonText && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-8 flex justify-center"
                    >
                      <Link
                        href={sec.buttonLink || "/contact"}
                        className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent-blue text-white text-sm font-bold shadow-xl shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all"
                      >
                        <span>{sec.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  )}
                </div>
              </section>
            );
          }

          // 2. FEATURES SECTION
          if (sec.type === "features") {
            return (
              <section key={sec.id} className="py-20 border-t border-border/40 relative">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                  <div className="text-center max-w-2xl mx-auto mb-14">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                      {sec.title}
                    </h2>
                    {sec.subtitle && (
                      <p className="text-sm text-silver leading-relaxed">{sec.subtitle}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(sec.items || []).map((item, idx) => (
                      <div
                        key={item.id || idx}
                        className="p-6 rounded-2xl bg-[#090d1f]/90 border border-border/50 hover:border-primary/40 transition-all space-y-3"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          <Zap className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold text-white">{item.title}</h3>
                        <p className="text-xs text-silver leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          // 3. RICH TEXT SECTION
          if (sec.type === "rich_text") {
            return (
              <section key={sec.id} className="py-16 border-t border-border/40">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                  {sec.title && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                      {sec.title}
                    </h2>
                  )}
                  {sec.content && (
                    <div className="prose prose-invert max-w-none text-silver leading-relaxed whitespace-pre-line text-sm md:text-base">
                      {sec.content}
                    </div>
                  )}
                </div>
              </section>
            );
          }

          // 4. TESTIMONIALS SECTION
          if (sec.type === "testimonials") {
            return (
              <section key={sec.id} className="py-20 border-t border-border/40">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                    {sec.title || "Client Success Stories"}
                  </h2>
                  {sec.subtitle && (
                    <p className="text-sm text-silver max-w-xl mx-auto mb-12">
                      {sec.subtitle}
                    </p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    {(sec.items || []).map((t, idx) => (
                      <div key={t.id || idx} className="glass p-6 md:p-8 rounded-2xl border border-border/70 space-y-4">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-sm text-silver leading-relaxed italic">
                          &ldquo;{t.description}&rdquo;
                        </p>
                        <div className="font-heading font-bold text-sm text-white">
                          {t.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          // 5. SERVICES REUSABLE BLOCK
          if (sec.type === "services") {
            return <ServicesSection key={sec.id} />;
          }

          // 6. FAQ REUSABLE BLOCK
          if (sec.type === "faq") {
            return <FaqSection key={sec.id} />;
          }

          // 7. CTA SECTION
          if (sec.type === "cta") {
            return (
              <section key={sec.id} className="py-20 border-t border-border/40 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
                  <div className="p-10 rounded-3xl bg-gradient-to-b from-[#090e24] to-[#050816] border border-primary/30 shadow-2xl relative space-y-5">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                      {sec.title}
                    </h2>
                    {sec.subtitle && (
                      <p className="text-sm text-silver max-w-xl mx-auto leading-relaxed">
                        {sec.subtitle}
                      </p>
                    )}
                    {sec.buttonText && (
                      <div className="pt-2">
                        <Link
                          href={sec.buttonLink || "/contact"}
                          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all"
                        >
                          <span>{sec.buttonText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          }

          // 8. CONTACT FORM REUSABLE BLOCK
          if (sec.type === "contact_form") {
            return <CtaSection key={sec.id} />;
          }

          // 9. GALLERY SECTION
          if (sec.type === "gallery") {
            return (
              <section key={sec.id} className="py-20 border-t border-border/40">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                  <div className="text-center max-w-2xl mx-auto mb-14">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                      {sec.title || "Visual Gallery & Case Studies"}
                    </h2>
                    {sec.subtitle && (
                      <p className="text-sm text-silver leading-relaxed">{sec.subtitle}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(sec.items || []).map((item, idx) => (
                      <div
                        key={item.id || idx}
                        className="group relative rounded-2xl overflow-hidden bg-[#090d1f] border border-border/50 hover:border-primary/40 transition-all aspect-video flex flex-col justify-end p-6"
                      >
                        {item.value ? (
                          <img
                            src={item.value}
                            alt={item.title || "Gallery Item"}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-[#090d1f] to-accent-blue/10" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="relative z-10">
                          <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
                          <p className="text-xs text-silver line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          // 10. PRICING SECTION
          if (sec.type === "pricing") {
            return (
              <section key={sec.id} className="py-20 border-t border-border/40">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                  <div className="text-center max-w-2xl mx-auto mb-14">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                      {sec.title || "Transparent Enterprise Pricing"}
                    </h2>
                    {sec.subtitle && (
                      <p className="text-sm text-silver leading-relaxed">{sec.subtitle}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {(sec.items || []).map((tier, idx) => (
                      <div
                        key={tier.id || idx}
                        className="p-8 rounded-2xl bg-[#090d1f]/90 border border-border/50 hover:border-primary/40 transition-all flex flex-col justify-between space-y-6"
                      >
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">{tier.title}</h3>
                          <div className="flex items-baseline gap-1 my-4">
                            <span className="text-3xl font-extrabold text-white font-mono">{tier.price || tier.value || "Custom"}</span>
                            {tier.period && <span className="text-xs text-silver font-mono">/{tier.period}</span>}
                          </div>
                          <p className="text-xs text-silver leading-relaxed mb-6">{tier.description}</p>
                          {tier.features && (
                            <ul className="space-y-2.5 text-xs text-silver">
                              {tier.features.map((feat, fIdx) => (
                                <li key={fIdx} className="flex items-center gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <Link
                          href={sec.buttonLink || "/contact"}
                          className="w-full py-3 rounded-xl bg-white/5 hover:bg-primary border border-white/10 hover:border-primary text-white text-xs font-bold text-center transition-all active:scale-[0.98]"
                        >
                          {sec.buttonText || "Choose Plan"}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          // 11. TIMELINE ROADMAP SECTION
          if (sec.type === "timeline") {
            return (
              <section key={sec.id} className="py-20 border-t border-border/40">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                  <div className="text-center max-w-2xl mx-auto mb-14">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                      {sec.title || "Execution Roadmap"}
                    </h2>
                    {sec.subtitle && (
                      <p className="text-sm text-silver leading-relaxed">{sec.subtitle}</p>
                    )}
                  </div>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-border/60">
                    {(sec.items || []).map((step, idx) => (
                      <div key={step.id || idx} className="relative flex items-start gap-6 pl-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary text-primary flex items-center justify-center font-bold text-xs shrink-0 z-10">
                          {idx + 1}
                        </div>
                        <div className="flex-1 p-6 rounded-2xl bg-[#090d1f] border border-border/50">
                          <h4 className="text-base font-bold text-white mb-1">{step.title}</h4>
                          <p className="text-xs text-silver leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          // 12. STATS & METRICS SECTION
          if (sec.type === "stats") {
            return (
              <section key={sec.id} className="py-16 border-t border-border/40 bg-white/[0.01]">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {(sec.items || []).map((stat, idx) => (
                      <div key={stat.id || idx} className="p-6 rounded-2xl bg-[#090d1f]/80 border border-border/50 text-center space-y-2">
                        <div className="text-3xl sm:text-4xl font-extrabold text-primary font-mono">{stat.value || stat.title}</div>
                        <div className="text-xs font-semibold text-white">{stat.label || stat.title}</div>
                        {stat.description && <p className="text-[11px] text-silver">{stat.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          // 13. IMAGE SECTION
          if (sec.type === "image") {
            return (
              <section key={sec.id} className="py-16 border-t border-border/40">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center">
                  {sec.title && <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{sec.title}</h2>}
                  {sec.subtitle && <p className="text-sm text-silver mb-8 max-w-xl mx-auto">{sec.subtitle}</p>}
                  <div className="rounded-3xl overflow-hidden border border-border/60 shadow-2xl relative aspect-video bg-[#090d1f]">
                    {sec.mediaUrl ? (
                      <img src={sec.mediaUrl} alt={sec.title || "Section Media"} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-silver/40 font-mono text-xs">
                        No image source specified
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          }

          // 14. VIDEO SECTION
          if (sec.type === "video") {
            return (
              <section key={sec.id} className="py-16 border-t border-border/40">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center">
                  {sec.title && <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{sec.title}</h2>}
                  {sec.subtitle && <p className="text-sm text-silver mb-8 max-w-xl mx-auto">{sec.subtitle}</p>}
                  <div className="rounded-3xl overflow-hidden border border-border/60 shadow-2xl relative aspect-video bg-[#030612]">
                    {sec.mediaUrl && sec.mediaUrl.includes("youtube.com") ? (
                      <iframe
                        src={sec.mediaUrl.replace("watch?v=", "embed/")}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : sec.mediaUrl ? (
                      <video src={sec.mediaUrl} controls className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-silver/40 font-mono text-xs">
                        No video stream configured
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          }

          // 15. CUSTOM HTML SECTION
          if (sec.type === "custom_html") {
            return (
              <section key={sec.id} className="py-16 border-t border-border/40">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                  {sec.title && <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">{sec.title}</h2>}
                  <div
                    className="p-6 rounded-2xl bg-[#090d1f] border border-border/50 text-white"
                    dangerouslySetInnerHTML={{ __html: sec.htmlContent || sec.content || "" }}
                  />
                </div>
              </section>
            );
          }

          return null;
        })}
    </div>
  );
}

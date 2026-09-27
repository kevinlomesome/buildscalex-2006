"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Briefcase,
  Search,
  ExternalLink,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { useCMS } from "@/context/cms-context";
import { ProjectItem } from "@/lib/cms-types";
import { defaultProjects } from "@/lib/default-content";
import { getWhatsAppLink } from "@/lib/constants";
import { CtaSection } from "@/components/sections/cta";

export function ProjectsClient() {
  const { projects: cmsProjects } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const allProjects: ProjectItem[] = useMemo(() => {
    if (cmsProjects && cmsProjects.length > 0) {
      return cmsProjects;
    }
    return defaultProjects;
  }, [cmsProjects]);

  const activeProjects = useMemo(() => {
    return allProjects.filter((p) => p.active !== false);
  }, [allProjects]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    activeProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [activeProjects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return activeProjects;
    return activeProjects.filter((p) => p.category === selectedCategory);
  }, [activeProjects, selectedCategory]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Header */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden bg-[#06080E] border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-silver uppercase tracking-wider mb-6">
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            <span>Verified Case Studies & Systems</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            Case Studies &amp; Architectural Engagements.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-silver leading-relaxed max-w-2xl mx-auto mb-8">
            Explore production architectures engineered for serious businesses. Every engagement features 100% custom code, sub-second performance, and verified business outcomes.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-20 relative bg-[#080A11]">
        <div className="container mx-auto px-4 md:px-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-[#0C0F1A] border border-white/[0.06] hover:border-white/15 p-8 rounded-2xl flex flex-col justify-between transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.05] text-[11px] font-mono text-silver/70">
                    <span className="text-primary font-semibold">{proj.client}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] text-silver/60">
                      {proj.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-sm text-silver leading-relaxed mb-6">
                    {proj.description}
                  </p>
                </div>

                <div>
                  {proj.servicesUsed && proj.servicesUsed.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.05] mb-6">
                      {proj.servicesUsed.map((svc, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-silver/70 border border-white/[0.05]"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.05] text-xs">
                    <span className="text-silver/60 font-mono text-[11px]">Production Verified</span>
                    {proj.link ? (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-primary font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link
                        href={getWhatsAppLink(`Hi BuildScaleX, I saw the "${proj.title}" case study and would like to build a similar system.`)}
                        target="_blank"
                        className="font-mono text-primary font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>Inquire System</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}

"use client";

import { useCMS } from "@/context/cms-context";
import { DynamicPageClient } from "@/app/[slug]/dynamic-page-client";

interface LegalPageViewProps {
  type: "privacy" | "terms";
  defaultTitle: string;
  defaultContent: React.ReactNode;
}

export function LegalPageView({ type, defaultTitle, defaultContent }: LegalPageViewProps) {
  const { pages, settings } = useCMS();

  // Check if a custom page was created in the Page Builder with slug 'privacy' or 'terms'
  const customPage = pages?.find(
    (p) => p.slug === type && p.published && !p.archived
  );

  if (customPage) {
    return <DynamicPageClient initialPage={customPage} slug={type} />;
  }

  return (
    <div className="flex flex-col w-full min-h-screen pt-28 pb-24 bg-[#080A11]">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground mb-4">
          {defaultTitle}
        </h1>
        <p className="mb-10 text-xs font-mono text-silver/60">
          Last updated: March 2026 • {settings?.businessName || "BuildScaleX"}
        </p>
        
        <div className="space-y-8 text-silver leading-relaxed text-sm sm:text-base">
          {defaultContent}
        </div>
      </div>
    </div>
  );
}

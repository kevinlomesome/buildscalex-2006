"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Stethoscope, 
  Building2, 
  ShoppingBag, 
  GraduationCap, 
  Cpu, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { getWhatsAppLink } from "@/lib/constants";
import { useCMS } from "@/context/cms-context";

interface IndustryDetail {
  icon: React.ReactNode;
  name: string;
  focus: string;
  solution: string;
}

function resolveIndustryIcon(iconName?: string) {
  switch (iconName?.toLowerCase()) {
    case "briefcase": return <Briefcase className="w-5 h-5 text-primary" />;
    case "stethoscope": return <Stethoscope className="w-5 h-5 text-primary" />;
    case "building":
    case "building2": return <Building2 className="w-5 h-5 text-primary" />;
    case "shoppingbag": return <ShoppingBag className="w-5 h-5 text-primary" />;
    case "graduationcap": return <GraduationCap className="w-5 h-5 text-primary" />;
    case "cpu": return <Cpu className="w-5 h-5 text-primary" />;
    default: return <Sparkles className="w-5 h-5 text-primary" />;
  }
}

const defaultIndustrySectors: IndustryDetail[] = [
  {
    icon: <Briefcase className="w-5 h-5 text-primary" />,
    name: "High-Ticket B2B & Consulting",
    focus: "Law firms, advisory practices, wealth managers, and agencies",
    solution: "Multi-step qualification assessments that filter decision-makers, direct calendar booking, and CRM pipeline tracking."
  },
  {
    icon: <Stethoscope className="w-5 h-5 text-primary" />,
    name: "Healthcare & Specialized Clinics",
    focus: "Dental clinics, aesthetic practices, private hospitals, and wellness centers",
    solution: "Instant 24/7 WhatsApp triage, practitioner appointment scheduling, and patient intake automation."
  },
  {
    icon: <Building2 className="w-5 h-5 text-primary" />,
    name: "Real Estate & Architecture",
    focus: "Property developers, commercial contractors, and interior architecture studios",
    solution: "Ultra-fast digital project catalogs, specification estimators, and verified buyer inquiry capture."
  },
  {
    icon: <ShoppingBag className="w-5 h-5 text-primary" />,
    name: "Modern Commerce & D2C Brands",
    focus: "High-growth consumer brands, bespoke lifestyle labels, and specialty manufacturers",
    solution: "Custom Next.js edge storefronts, rapid checkout flows, WhatsApp order notifications, and retention funnels."
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-primary" />,
    name: "Education, EdTech & Training",
    focus: "Professional institutes, vocational academies, and international test prep firms",
    solution: "Course syllabus intake portals, student eligibility quizzes, and automated admission counselor routing."
  },
  {
    icon: <Cpu className="w-5 h-5 text-primary" />,
    name: "Technology Startups & SaaS",
    focus: "Early-stage founders, B2B software vendors, and digital product studios",
    solution: "Sub-second product landing architecture, interactive interactive demo booking, and custom API telemetry."
  }
];

export function IndustriesSection() {
  const { industries: cmsIndustries } = useCMS();

  const displayIndustries = useMemo(() => {
    if (cmsIndustries && cmsIndustries.length > 0) {
      return cmsIndustries
        .filter((i) => i.active !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((i) => {
          const curated = defaultIndustrySectors.find(
            (d) => d.name.toLowerCase() === i.name.toLowerCase()
          );
          return {
            name: i.name,
            icon: resolveIndustryIcon(i.iconName) || curated?.icon || <Sparkles className="w-5 h-5 text-primary" />,
            focus: curated?.focus || "Specialized commercial sector & enterprise operations",
            solution: curated?.solution || "Custom conversion architecture, automated pipeline qualification, and telemetry tracking."
          };
        });
    }
    return defaultIndustrySectors;
  }, [cmsIndustries]);

  return (
    <section id="industries" className="py-20 md:py-28 relative bg-[#070910] border-y border-white/[0.06]">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-silver uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Domain-Specific Architectures</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Tailored Systems by Industry Sector.
          </h2>
          <p className="text-silver text-base sm:text-lg leading-relaxed">
            Different industries face distinct conversion challenges. We engineer custom client acquisition flows and automation protocols tailored directly to your operating model.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayIndustries.map((sector, idx) => (
            <div
              key={idx}
              className="bg-[#0B0E18] border border-white/[0.06] hover:border-white/15 p-7 rounded-2xl flex flex-col justify-between transition-all duration-200"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5">
                  {sector.icon}
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">
                  {sector.name}
                </h3>
                
                <p className="text-xs text-silver/60 font-mono mb-4">
                  {sector.focus}
                </p>

                <p className="text-sm text-silver leading-relaxed">
                  {sector.solution}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <Link
                  href={getWhatsAppLink(`Hi BuildScaleX, I am in ${sector.name} and would like to discuss tailored systems.`)}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-blue-400 font-semibold transition-colors"
                >
                  <span>Explore Sector Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

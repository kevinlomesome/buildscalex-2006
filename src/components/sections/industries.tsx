"use client";

import { motion } from "framer-motion";
import { Utensils, Building2, Stethoscope, HardHat, Sofa, Activity, GraduationCap, Dumbbell, Calculator, Briefcase, Sparkles } from "lucide-react";
import { useCMS } from "@/context/cms-context";

const industries = [
  { icon: <Utensils />, name: "Restaurants" },
  { icon: <Building2 />, name: "Real Estate" },
  { icon: <Stethoscope />, name: "Doctors" },
  { icon: <HardHat />, name: "Construction" },
  { icon: <Sofa />, name: "Furniture" },
  { icon: <Activity />, name: "Healthcare" },
  { icon: <GraduationCap />, name: "Education" },
  { icon: <Dumbbell />, name: "Gyms" },
  { icon: <Calculator />, name: "CA Firms" },
  { icon: <Briefcase />, name: "Professional Services" }
];

export function IndustriesSection() {
  const { industries: cmsIndustries } = useCMS();
  const activeIndustries = (cmsIndustries !== undefined ? cmsIndustries : industries)
    .filter((i) => (i as any).active !== false)
    .sort((a, b) => ((a as any).order || 0) - ((b as any).order || 0));

  return (
    <section id="industries" className="py-24 relative bg-black/5 dark:bg-black/30 border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">Industries We Dominate</h2>
          <p className="text-silver max-w-2xl mx-auto">
            Tailored digital systems and marketing strategies for specific business sectors.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-5 max-w-6xl mx-auto">
          {activeIndustries.map((industry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="glass px-6 py-4 rounded-2xl border border-border/80 flex items-center gap-3 hover:border-primary/50 hover:bg-black/5 dark:hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
            >
              <div className="text-primary group-hover:text-secondary group-hover:scale-110 transition-all">
                {(industry as any).icon || <Sparkles className="w-5 h-5 text-primary" />}
              </div>
              <span className="font-semibold text-sm text-foreground/90 group-hover:text-foreground transition-colors">
                {industry.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

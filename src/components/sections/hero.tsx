"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageSquare, Terminal } from "lucide-react";
import { getWhatsAppLink } from "@/lib/constants";
import { useOpening } from "@/components/opening-provider";
import { useCMS } from "@/context/cms-context";

export function HeroSection() {
  const { isLoaded } = useOpening();
  const { hero } = useCMS();

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-16 md:py-24 overflow-hidden">
      {/* Subtle Micro-Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Controlled, Soft Atmospheric Illumination */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] md:w-[840px] h-[360px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Engineering Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 py-1.5 px-4 rounded-full bg-white/[0.04] border border-white/10 shadow-sm mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs font-medium text-foreground tracking-wide">
              {hero?.badgeText || "Growth Systems & Technical Architecture"}
            </span>
          </motion.div>

          {/* Central Architectural Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-8"
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-[#090C15] p-2.5 flex items-center justify-center">
              <Image
                src="/logo-emblem.png"
                alt="BuildScaleX Emblem"
                width={96}
                height={96}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </motion.div>

          {/* High-Converting Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.65, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.12]"
          >
            {hero?.headlineLine1 ? (
              <>
                {hero.headlineLine1}{" "}
                <span className="text-primary font-bold">
                  {hero.headlineGradient || "Qualified Leads"}
                </span>{" "}
                {hero.headlineLine2}
              </>
            ) : (
              <>
                We Build AI-Powered Client Acquisition Systems That Generate More{" "}
                <span className="text-primary font-bold">
                  Qualified Leads.
                </span>
              </>
            )}
          </motion.h1>

          {/* Concise, Benefit-Driven Human Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-silver mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {hero?.description || "BuildScaleX engineers custom high-performance websites, automated lead generation systems, CRM integrations, and intelligent AI agents for ambitious businesses."}
          </motion.p>

          {/* Tactile Primary & Secondary Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.55, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14"
          >
            <Link
              href={getWhatsAppLink("Hi BuildScaleX, I would like to discuss building a growth system for our business.")}
              target="_blank"
              className="w-full sm:w-auto bg-primary hover:bg-blue-600 text-white font-semibold rounded-xl px-8 py-4 text-sm sm:text-base transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer border border-primary/30"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>{hero?.ctaPrimaryText || "Book Strategy Consultation"}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>

            <Link
              href="#services"
              className="w-full sm:w-auto bg-white/[0.04] hover:bg-white/[0.08] text-foreground border border-white/10 hover:border-white/20 font-medium rounded-xl px-7 py-4 text-sm sm:text-base transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-silver" />
              <span>{hero?.ctaSecondaryText || "Explore Capabilities"}</span>
            </Link>
          </motion.div>

          {/* Truthful Engineering Deliverables */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-8 pt-8 border-t border-white/[0.08] w-full max-w-3xl"
          >
            {(hero?.trustBadges && hero.trustBadges.length > 0
              ? hero.trustBadges
              : [
                  "100% Handcrafted Code",
                  "Sub-Second Performance",
                  "Direct Engineering Access",
                  "Zero Template Lock-In"
                ]
            ).map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center gap-2 text-xs md:text-sm text-silver"
              >
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

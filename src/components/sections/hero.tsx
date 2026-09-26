"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Sparkles, Zap, Shield, TrendingUp } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/constants";
import { useOpening } from "@/components/opening-provider";
import { useCMS } from "@/context/cms-context";

export function HeroSection() {
  const { isLoaded } = useOpening();
  const { hero } = useCMS();

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-12 md:py-16 overflow-hidden">
      {/* Background Cyber Grid & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
      {/* Dynamic Ambient Spotlights inspired by logo theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[750px] h-[350px] md:h-[450px] bg-gradient-to-tr from-primary/20 via-secondary/15 to-transparent rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Floating SaaS Cards (Left & Right) for Luxury SaaS Depth */}
      <motion.div
        initial={{ opacity: 0, x: -40, y: 15 }}
        animate={isLoaded ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -40, y: 15 }}
        transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex absolute left-8 xl:left-20 top-1/3 glass p-4 rounded-2xl border border-border/80 items-center gap-3.5 shadow-xl backdrop-blur-md z-20 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <div className="text-left">
          <div className="text-[11px] text-silver font-medium">Conversion Architecture</div>
          <div className="text-sm font-bold text-foreground font-heading">+240% Lead Growth</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40, y: 15 }}
        animate={isLoaded ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 40, y: 15 }}
        transition={{ duration: 0.8, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex absolute right-8 xl:right-20 top-1/3 glass p-4 rounded-2xl border border-border/80 items-center gap-3.5 shadow-xl backdrop-blur-md z-20 hover:border-secondary/50 hover:-translate-y-1 transition-all duration-300"
      >
        <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
          <Zap className="w-5 h-5 text-secondary" />
        </div>
        <div className="text-left">
          <div className="text-[11px] text-silver font-medium">Automated Pipeline</div>
          <div className="text-sm font-bold text-foreground font-heading">&lt; 60s Lead Response</div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Logo Badge & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 py-1.5 px-4 rounded-full glass border border-border/80 shadow-sm mb-8 backdrop-blur-md"
          >
            <div className="relative w-5 h-5 rounded-md overflow-hidden border border-border bg-[#030612] p-0.5">
              <Image
                src="/logo-emblem.png"
                alt="BSX Emblem"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
              {hero?.badgeText || "Growth Systems & AI Automation Agency"}
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
          </motion.div>

          {/* Central Logo Emblem Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-6 group cursor-pointer"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-primary to-cyan-400 opacity-20 group-hover:opacity-40 blur-xl transition duration-500"></div>
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-border shadow-2xl bg-[#030612] p-2 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo-emblem.png"
                alt="Build Scale X Official Logo"
                width={112}
                height={112}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </motion.div>

          {/* High-Converting Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-foreground"
          >
            {hero?.headlineLine1 || "Build Digital Systems That Generate"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500">
              {hero?.headlineGradient || "Qualified Leads"}
            </span>{" "}
            {hero?.headlineLine2 || "& Predictable Revenue."}
          </motion.h1>

          {/* Converting Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-silver mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {hero?.description || "We help ambitious businesses build high-converting websites, 24/7 AI automation workflows, CRM systems, and data-backed Meta Ads. Zero generic templates. 100% custom growth architecture."}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.6, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10"
          >
            <Link 
              href={getWhatsAppLink("Hi Build Scale X, I want to book a free 1-on-1 strategy call for my business.")} 
              target="_blank"
              className={buttonVariants({ 
                size: "lg", 
                className: "w-full sm:w-auto bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold rounded-2xl px-8 py-6 text-base sm:text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer" 
              })}
            >
              <MessageCircle className="w-5 h-5 text-white" />
              Book Free Strategy Call
              <ArrowRight className="w-5 h-5 text-white" />
            </Link>
            
            <Link 
              href="#contact"
              className={buttonVariants({ 
                size: "lg", 
                variant: "outline", 
                className: "w-full sm:w-auto glass hover:bg-black/5 dark:hover:bg-white/10 text-foreground border-border/80 hover:border-primary/40 font-medium rounded-2xl px-8 py-6 text-base sm:text-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer" 
              })}
            >
              Get Free Growth Audit
            </Link>
          </motion.div>

          {/* Trust and Conversion Badges Strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.7, delay: 0.64, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-border/80 w-full max-w-3xl"
          >
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-silver font-medium">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <span>100% Custom Code</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-silver font-medium">
              <Zap className="w-4 h-4 text-secondary shrink-0" />
              <span>&lt; 15m WhatsApp Reply</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-silver font-medium">
              <Sparkles className="w-4 h-4 text-primary shrink-0" />
              <span>AI & Funnel Ready</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-silver font-medium">
              <Shield className="w-4 h-4 text-secondary shrink-0" />
              <span>Zero Lock-in Contract</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getWhatsAppLink } from "@/lib/constants";

import { useCMS } from "@/context/cms-context";

const defaultTraditional = [
  "Slow delivery times (months)",
  "Generic templates",
  "No focus on conversions",
  "Hidden fees",
  "Outdated technology",
  "Poor communication",
  "No automation integrated",
];

const defaultBsx = [
  "Fast Delivery",
  "Premium Custom Design",
  "Revenue Driven & Growth Focused",
  "Transparent Pricing",
  "Modern Technology Stack",
  "Dedicated Support",
  "AI Powered Automation",
  "Long-term Partnership"
];

export function WhyUsSection() {
  const { about } = useCMS();

  const traditional = (about?.traditionalFlaws !== undefined)
    ? about.traditionalFlaws
    : defaultTraditional;

  const bsx = (about?.bsxAdvantages !== undefined)
    ? about.bsxAdvantages
    : defaultBsx;

  return (
    <section className="py-24 relative bg-black/5 dark:bg-black/30 border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">Why Build Scale X</h2>
          <p className="text-silver max-w-2xl mx-auto">
            We don't just build websites. We build powerful digital systems designed to generate leads and scale revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Traditional Agency */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass border border-border p-8 rounded-2xl md:rounded-3xl opacity-80"
          >
            <h3 className="text-2xl font-bold mb-6 text-foreground/80">Traditional Agency</h3>
            <ul className="space-y-4">
              {traditional.map((item, idx) => (
                <li key={idx} className="flex items-center text-silver">
                  <XCircle className="w-5 h-5 mr-3 text-destructive shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Build Scale X */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass border border-primary/50 p-8 rounded-2xl md:rounded-3xl relative overflow-hidden shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/30">
                RECOMMENDED
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"></div>
            
            <h3 className="text-2xl font-bold mb-6 text-foreground relative z-10">Build Scale X</h3>
            <ul className="space-y-4 relative z-10 mb-8">
              {bsx.map((item, idx) => (
                <li key={idx} className="flex items-center text-foreground font-medium">
                  <CheckCircle2 className="w-5 h-5 mr-3 text-secondary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <Link 
              href={getWhatsAppLink("Hi Build Scale X, I want to upgrade my business with your premium services.")} 
              target="_blank"
              className={buttonVariants({ variant: "default", className: "w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium rounded-xl py-3 shadow-md hover:shadow-lg transition-all relative z-10 cursor-pointer" })}
            >
              Upgrade Your Business
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

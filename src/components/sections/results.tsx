"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Search, Maximize, Brain, Rocket, Smartphone, LineChart } from "lucide-react";

const highlights = [
  { icon: <Search className="w-6 h-6 text-primary" />, title: "SEO Ready" },
  { icon: <Zap className="w-6 h-6 text-secondary" />, title: "Fast Performance" },
  { icon: <Smartphone className="w-6 h-6 text-accent" />, title: "Responsive" },
  { icon: <Maximize className="w-6 h-6 text-primary" />, title: "Premium UI" },
  { icon: <ShieldCheck className="w-6 h-6 text-secondary" />, title: "Secure" },
  { icon: <Brain className="w-6 h-6 text-accent" />, title: "AI Powered" },
  { icon: <Rocket className="w-6 h-6 text-primary" />, title: "Scalable" },
  { icon: <LineChart className="w-6 h-6 text-secondary" />, title: "Conversion Optimized" }
];

export function ResultsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">Built For Performance</h2>
          <p className="text-silver max-w-2xl mx-auto">
            We don't use fake metrics. Our results speak through the quality, speed, and architecture of every system we build.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass p-6 md:p-7 rounded-2xl md:rounded-3xl border border-border/80 flex flex-col items-center justify-center text-center gap-4 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md group cursor-pointer"
            >
              <div className="p-3.5 bg-black/5 dark:bg-white/5 border border-border rounded-2xl group-hover:scale-110 group-hover:border-primary/40 transition-all">
                {item.icon}
              </div>
              <h3 className="font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

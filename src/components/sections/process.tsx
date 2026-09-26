"use client";

import { motion } from "framer-motion";
import { useCMS } from "@/context/cms-context";

const steps = [
  { num: "01", title: "Discovery", desc: "Understanding your business goals and current digital presence." },
  { num: "02", title: "Research", desc: "Analyzing competitors, market trends, and target audience." },
  { num: "03", title: "Strategy", desc: "Crafting a tailored blueprint for digital growth and conversions." },
  { num: "04", title: "UI/UX", desc: "Designing premium, futuristic, and intuitive user experiences." },
  { num: "05", title: "Development", desc: "Building scalable, high-performance systems with modern tech." },
  { num: "06", title: "Testing", desc: "Rigorous quality assurance for flawless functionality." },
  { num: "07", title: "Launch", desc: "Deploying your new digital growth engine to the world." },
  { num: "08", title: "Optimization", desc: "Continuous monitoring, A/B testing, and scaling." }
];

export function ProcessSection() {
  const { process: cmsProcess } = useCMS();
  const activeSteps = (cmsProcess !== undefined ? cmsProcess : steps)
    .filter((p) => (p as any).active !== false)
    .sort((a, b) => ((a as any).order || 0) - ((b as any).order || 0));

  return (
    <section id="process" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">Our Proven Process</h2>
          <p className="text-silver max-w-2xl mx-auto">
            A systematic approach to building powerful digital growth engines.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block"></div>
          
          <div className="space-y-12">
            {activeSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`w-full md:w-1/2 p-4 md:p-6 ${isEven ? "md:pl-16 text-left" : "md:pr-16 md:text-right"}`}>
                    <div className="glass p-7 md:p-8 rounded-2xl md:rounded-3xl border border-border/80 hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 relative group">
                      <div className={`absolute top-1/2 -translate-y-1/2 w-8 h-[1px] bg-primary/40 hidden md:block ${
                        isEven ? "-left-8" : "-right-8"
                      }`}></div>
                      <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-2 block font-mono">
                        {step.num}
                      </span>
                      <h3 className="text-2xl font-bold mb-2 text-foreground">{step.title}</h3>
                      <p className="text-silver text-sm md:text-base leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-md hidden md:block border-4 border-background z-10"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

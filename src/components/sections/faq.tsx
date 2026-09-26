"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCMS } from "@/context/cms-context";

const faqs = [
  {
    question: "Why should we choose Build Scale X over a traditional agency?",
    answer: "Unlike traditional agencies that use generic templates and take months to deliver, Build Scale X focuses on modern, premium design and revenue-driven growth systems. We integrate AI automation, CRM, and high-converting funnels directly into your website."
  },
  {
    question: "How long does it take to build a premium website?",
    answer: "Our streamlined process allows us to deliver high-quality, production-ready websites much faster than industry standards. Most projects are completed within 2 to 4 weeks depending on the complexity."
  },
  {
    question: "Do you use templates or custom designs?",
    answer: "Everything we build is 100% custom-designed to match your brand's unique identity. We use modern technologies like React, Next.js, and Tailwind CSS to ensure your site is fast, secure, and visually stunning."
  },
  {
    question: "Can you help automate my business operations?",
    answer: "Yes! We specialize in integrating AI Chatbots, WhatsApp Automation, and CRM systems to qualify leads, book appointments, and reduce your manual workload so you can focus on scaling."
  },
  {
    question: "Will my website be optimized for SEO and mobile devices?",
    answer: "Absolutely. Every digital system we build is fully responsive across all devices and optimized for Core Web Vitals and SEO best practices to ensure you rank high on search engines."
  }
];

export function FaqSection() {
  const { faqs: cmsFaqs } = useCMS();
  const activeFaqs = (cmsFaqs !== undefined ? cmsFaqs : faqs)
    .filter((f) => (f as any).active !== false)
    .sort((a, b) => ((a as any).order || 0) - ((b as any).order || 0));

  return (
    <section className="py-24 relative bg-black/5 dark:bg-black/30 border-y border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">Frequently Asked Questions</h2>
          <p className="text-silver text-base">
            Everything you need to know about working with Build Scale X.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass p-6 md:p-10 rounded-2xl md:rounded-3xl border border-border/80 shadow-md"
        >
          <Accordion className="w-full">
            {activeFaqs.map((faq, index) => (
              <AccordionItem key={index} className="border-b border-border/70 last:border-0">
                <AccordionTrigger className="text-left text-base md:text-lg font-bold text-foreground hover:text-primary transition-colors py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-silver leading-relaxed text-sm md:text-base pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

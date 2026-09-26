"use client";

import { useEffect, useState } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getWhatsAppLink } from "@/lib/constants";

export function StickyMobileCta() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling down past hero, hide near contact section
      const scrollPos = window.scrollY;
      const isPastHero = scrollPos > 350;
      
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const contactTop = contactSection.getBoundingClientRect().top;
        const isNearContact = contactTop < window.innerHeight;
        setShow(isPastHero && !isNearContact);
      } else {
        setShow(isPastHero);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin") || !show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#050816]/95 backdrop-blur-xl border-t border-white/10 md:hidden animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white tracking-tight">Ready to Scale?</span>
          <span className="text-[10px] text-silver/70">&lt; 15m WhatsApp Response</span>
        </div>
        <Link
          href={getWhatsAppLink("Hi Build Scale X, I want to discuss scaling my business.")}
          target="_blank"
          className="bg-gradient-to-r from-primary via-blue-600 to-secondary text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center gap-1.5 shrink-0"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat on WhatsApp</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

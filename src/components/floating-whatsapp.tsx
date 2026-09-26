"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { getWhatsAppLink } from "@/lib/constants";

export function FloatingWhatsApp() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link href={getWhatsAppLink()} target="_blank" rel="noreferrer">
        <div className="relative group">
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:opacity-60 transition-opacity"></div>
          {/* Button */}
          <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 hover:scale-110 transition-transform duration-300">
            <MessageCircle size={28} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

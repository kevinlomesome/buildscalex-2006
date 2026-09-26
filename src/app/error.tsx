"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home, MessageSquare } from "lucide-react";
import Link from "next/link";
import { getWhatsAppLink } from "@/lib/constants";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for observability
    console.warn("Application runtime notice:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full glass p-8 rounded-3xl border border-border/80 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/10">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-foreground tracking-tight font-heading">
            Unexpected System Hiccup
          </h2>
          <p className="text-sm text-silver leading-relaxed">
            Our systems encountered a momentary synchronization glitch. Your data is safe. Click retry or contact our support team.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-border text-foreground text-xs font-semibold hover:bg-black/10 dark:hover:bg-white/10 transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-border/40 text-[11px] text-silver/60">
          <span>Need immediate assistance? </span>
          <a
            href={getWhatsAppLink("Hi Build Scale X, I encountered an issue on your website.")}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline font-medium inline-flex items-center gap-1"
          >
            <MessageSquare className="w-3 h-3" />
            <span>WhatsApp Priority Support</span>
          </a>
        </div>
      </div>
    </div>
  );
}

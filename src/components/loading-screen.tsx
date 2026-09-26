"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Smooth progress counter from 0 to 100% over ~1.5s with organic SaaS easing
    const startTime = Date.now();
    const duration = 1500; // 1.5 seconds

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      // Premium cubic ease out curve (fast start, smooth deceleration, decisive finish)
      const easedRatio = 1 - Math.pow(1 - progressRatio, 2.2);
      const currentPercent = Math.min(Math.floor(easedRatio * 100), 100);
      
      setProgress(currentPercent);

      if (elapsed >= duration) {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 150);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="bsx-loading-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.02,
            filter: "blur(4px)",
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050816] select-none pointer-events-auto"
        >
          {/* Subtle Ambient Radial Backlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] md:w-[500px] h-[380px] md:h-[500px] bg-gradient-to-tr from-primary/20 via-secondary/15 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            
            {/* Metallic BSX Emblem with breathing aura */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-24 h-24 md:w-28 md:h-28 mb-6"
            >
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-primary/30 to-secondary/30 blur-xl opacity-60 animate-pulse"></div>
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#030612] p-2 flex items-center justify-center">
                <Image
                  src="/logo-emblem.png"
                  alt="Build Scale X Emblem"
                  width={112}
                  height={112}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center mb-8"
            >
              <h1 className="font-heading font-extrabold text-2xl md:text-3xl tracking-[0.25em] text-white">
                BUILDSCALEX
              </h1>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-silver/70 font-semibold mt-1">
                Build • Scale • Dominate
              </p>
            </motion.div>

            {/* Progress Bar Container */}
            <motion.div
              initial={{ opacity: 0, width: "60%" }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-56 md:w-64 flex flex-col items-center gap-3"
            >
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-blue-500 to-secondary rounded-full shadow-[0_0_10px_rgba(0,212,255,0.7)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

              {/* Progress Percentage Display */}
              <div className="flex justify-between w-full text-[10px] tracking-wider text-silver/50 font-mono">
                <span className="uppercase">Initializing</span>
                <span>{progress}%</span>
              </div>
            </motion.div>

          </div>

          {/* Footer Quality Note */}
          <div className="absolute bottom-8 text-[11px] text-silver/40 tracking-widest uppercase">
            Growth Systems Agency
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

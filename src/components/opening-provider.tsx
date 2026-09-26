"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { MouseGlow } from "@/components/mouse-glow";
import { ScrollToTop } from "@/components/scroll-to-top";
import { StickyMobileCta } from "@/components/sticky-mobile-cta";

interface OpeningContextType {
  isLoaded: boolean;
}

const OpeningContext = createContext<OpeningContextType>({ isLoaded: false });

export const useOpening = () => useContext(OpeningContext);

export function OpeningProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const handleComplete = () => {
    setIsLoaded(true);
    // Allow the 0.7s exit dissolve of LoadingScreen to finish smoothly before unmounting
    setTimeout(() => {
      setShowLoading(false);
    }, 700);
  };

  return (
    <OpeningContext.Provider value={{ isLoaded }}>
      {showLoading && <LoadingScreen onComplete={handleComplete} />}
      <MouseGlow />
      {children}
      <ScrollToTop />
      <StickyMobileCta />
    </OpeningContext.Provider>
  );
}

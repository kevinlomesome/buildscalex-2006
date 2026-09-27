"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/constants";
import Image from "next/image";
import { useOpening } from "@/components/opening-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCMS } from "@/context/cms-context";

const baseNavLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Industries", href: "/industries" },
  { name: "Process", href: "/process" },
  { name: "Case Studies", href: "/projects" },
  { name: "Insights", href: "/blogs" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isLoaded } = useOpening();
  const { pages } = useCMS();

  const customPagesLinks = (pages || [])
    .filter((p) => p.published && !p.archived && p.showInNavbar !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((p) => ({
      name: p.title,
      href: `/${p.slug}`,
    }));

  const navLinks = [...baseNavLinks, ...customPagesLinks];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={isLoaded ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass border-b border-border/80 py-3 shadow-lg"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-border shadow-[0_0_15px_rgba(37,99,235,0.2)] group-hover:border-primary transition-all bg-[#030612] p-1 flex items-center justify-center">
            <Image
              src="/logo-emblem.png"
              alt="Build Scale X Logo"
              width={36}
              height={36}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">
              BUILDSCALEX
            </span>
            <span className="text-[9px] tracking-widest text-muted-foreground uppercase font-semibold -mt-1 hidden sm:block">
              Build • Scale • Dominate
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full glass border border-border/60 px-3 shadow-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all group ${
                  isActive
                    ? "text-primary dark:text-white bg-primary/10 dark:bg-white/10 shadow-sm border border-primary/20 dark:border-white/10 font-semibold"
                    : "text-foreground/75 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {link.name}
                {!isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-primary rounded-full transition-all duration-300 group-hover:w-1/2" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          <Link
            href={getWhatsAppLink("Hi BuildScaleX, I would like to book a strategy consultation.")}
            target="_blank"
            className="bg-primary hover:bg-blue-600 text-white font-medium rounded-xl px-4 py-2 text-xs transition-all active:scale-[0.99] border border-primary/30"
          >
            Book Strategy Call
          </Link>
        </div>

        {/* Mobile Header Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            className="p-2 rounded-xl border border-border bg-black/5 dark:bg-white/5 text-foreground hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 glass border-b border-border py-4 px-6 flex flex-col gap-2 md:hidden shadow-xl"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-primary font-bold bg-primary/10"
                      : "text-foreground/80 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-border mt-2">
              <Link
                href={getWhatsAppLink("Hi BuildScaleX, I would like to book a strategy consultation.")}
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center bg-primary hover:bg-blue-600 text-white font-medium rounded-xl py-2.5 text-xs transition-all active:scale-[0.99]"
              >
                Book Strategy Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

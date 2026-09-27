"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getWhatsAppLink, socialLinks } from "@/lib/constants";

import { useCMS } from "@/context/cms-context";

export function Footer() {
  const pathname = usePathname();
  const { settings, pages } = useCMS();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const footerCustomPages = (pages || [])
    .filter((p) => p.published && !p.archived && p.showInFooter !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <footer className="border-t border-border dark:border-white/[0.06] bg-slate-100/70 dark:bg-[#070910] pt-16 pb-8 transition-colors">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-border shadow-[0_0_15px_rgba(37,99,235,0.2)] bg-[#030612] p-1.5 flex items-center justify-center group-hover:border-primary transition-all">
                <Image
                  src={settings?.logoUrl || "/logo-emblem.png"}
                  alt="Build Scale X Logo"
                  width={44}
                  height={44}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-foreground block">
                  {settings?.businessName || "BUILDSCALEX"}
                </span>
                <span className="text-[10px] tracking-widest text-silver uppercase font-semibold">
                  Growth Systems Agency
                </span>
              </div>
            </Link>
            <p className="text-silver text-sm mb-6 leading-relaxed">
              Helping businesses build powerful digital systems that generate more leads, increase conversions, automate operations, and scale revenue.
            </p>
            <p className="font-mono text-xs text-primary font-semibold tracking-wider">
              {settings?.tagline || "BUILD. SCALE. DOMINATE."}
            </p>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="font-heading font-semibold text-base text-foreground mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-silver">
              <li>
                <a href={`tel:${settings?.phone?.replace(/\s+/g, "") || "+917990359221"}`} className="hover:text-foreground transition-colors">
                  {settings?.phone || "+91 79903 59221"}
                </a>
              </li>
              <li>
                <a href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                  WhatsApp Us
                </a>
              </li>
              <li className="leading-relaxed">
                {settings?.addressLines && settings.addressLines.length > 0 ? (
                  settings.addressLines.map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))
                ) : (
                  <>
                    C/56, Shivanand Bungalows,<br />
                    Near M.B. Patel Farm House,<br />
                    Behind Pushkar Hills,<br />
                    Jashoda Nagar,<br />
                    Ahmedabad, Gujarat, India.
                  </>
                )}
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-heading font-semibold text-base text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-silver">
              <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-foreground transition-colors">Services</Link></li>
              <li><Link href="/industries" className="hover:text-foreground transition-colors">Industries</Link></li>
              <li><Link href="/process" className="hover:text-foreground transition-colors">Our Process</Link></li>
              <li><Link href="/projects" className="hover:text-foreground transition-colors">Case Studies</Link></li>
              <li><Link href="/blogs" className="hover:text-foreground transition-colors">Insights</Link></li>
              <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              {footerCustomPages.map((page) => (
                <li key={page.id}>
                  <Link href={`/${page.slug}`} className="hover:text-foreground transition-colors">
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Socials */}
          <div className="col-span-1">
            <h3 className="font-heading font-semibold text-base text-foreground mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-silver mb-8">
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms & Conditions</Link></li>
            </ul>
            
            <h3 className="font-heading font-semibold text-base text-foreground mb-4">Socials</h3>
            <ul className="flex gap-4 text-sm text-silver">
              <li>
                <a
                  href={settings?.socialLinks?.instagram || socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={settings?.socialLinks?.facebook || socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={settings?.socialLinks?.linkedin || socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-silver">
          <p>{settings?.copyrightText || "© 2026 Build Scale X. All rights reserved."}</p>
          <p>Designed for Growth.</p>
        </div>
      </div>
    </footer>
  );
}

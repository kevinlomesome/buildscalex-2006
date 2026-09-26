import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";

import { OpeningProvider } from "@/components/opening-provider";
import { CMSProvider } from "@/context/cms-context";
import { AdminAuthProvider } from "@/context/admin-auth-context";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Build Scale X | Growth Systems Agency",
  description: "Helping businesses build powerful digital systems that generate more leads, increase conversions, automate operations, and scale revenue.",
  icons: {
    icon: "/logo-emblem.png",
    shortcut: "/logo-emblem.png",
    apple: "/logo-emblem.png",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://buildscalex.in";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "Build Scale X",
      "url": siteUrl,
      "logo": `${siteUrl}/logo-emblem.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-79903-59221",
        "contactType": "Customer Strategy Consultation",
        "areaServed": ["IN", "US", "AE", "GB"],
        "availableLanguage": ["English", "Hindi", "Gujarati"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ahmedabad",
        "addressRegion": "Gujarat",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "Build Scale X",
      "publisher": {
        "@id": `${siteUrl}/#organization`
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body 
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-200`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          id="bsx-theme-init"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('bsx_theme');if(t==='light'){document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <AdminAuthProvider>
          <CMSProvider>
            <OpeningProvider>
              <Navigation />
              {children}
              <Footer />
              <FloatingWhatsApp />
            </OpeningProvider>
          </CMSProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}

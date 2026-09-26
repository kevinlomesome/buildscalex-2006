"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  HeroContent,
  ServiceItem,
  IndustryItem,
  ProcessStep,
  FaqItem,
  ContactSettings,
  WebsiteSettings,
  SeoSettings,
  AboutContent,
  TestimonialItem,
  ProjectItem,
  BlogPost,
  PageItem
} from "@/lib/cms-types";
import {
  defaultHeroContent,
  defaultServices,
  defaultIndustries,
  defaultProcessSteps,
  defaultFaqs,
  defaultContactSettings,
  defaultWebsiteSettings,
  defaultSeoSettings,
  defaultAboutContent,
  defaultTestimonials,
  defaultProjects,
  defaultBlogs
} from "@/lib/default-content";
import { subscribeToDoc, subscribeToPages } from "@/lib/firebase/services";

interface CMSContextType {
  hero: HeroContent;
  about: AboutContent;
  services: ServiceItem[];
  industries: IndustryItem[];
  process: ProcessStep[];
  faqs: FaqItem[];
  contact: ContactSettings;
  settings: WebsiteSettings;
  seo: SeoSettings;
  pages: PageItem[];
  testimonials: TestimonialItem[];
  projects: ProjectItem[];
  blogs: BlogPost[];
  loading: boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [hero, setHero] = useState<HeroContent>(defaultHeroContent);
  const [about, setAbout] = useState<AboutContent>(defaultAboutContent);
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [industries, setIndustries] = useState<IndustryItem[]>(defaultIndustries);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(defaultProcessSteps);
  const [faqs, setFaqs] = useState<FaqItem[]>(defaultFaqs);
  const [contact, setContact] = useState<ContactSettings>(defaultContactSettings);
  const [settings, setSettings] = useState<WebsiteSettings>(defaultWebsiteSettings);
  const [seo, setSeo] = useState<SeoSettings>(defaultSeoSettings);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(defaultTestimonials);
  const [projects, setProjects] = useState<ProjectItem[]>(defaultProjects);
  const [blogs, setBlogs] = useState<BlogPost[]>(defaultBlogs);
  const [loading] = useState<boolean>(false);

  useEffect(() => {
    // 1. Subscribe to Hero Content
    const unsubHero = subscribeToDoc<HeroContent>("homepage", "hero", defaultHeroContent, (data) => {
      if (data && data.headlineLine1) setHero(data);
    });

    // 2. Subscribe to About Content
    const unsubAbout = subscribeToDoc<AboutContent>("about", "content", defaultAboutContent, (data) => {
      if (data && data.headline) setAbout(data);
    });

    // 3. Subscribe to Services List (NO length > 0 condition so deletions are preserved)
    const unsubServices = subscribeToDoc<{ items: ServiceItem[] }>("services", "list", { items: defaultServices }, (data) => {
      if (data && Array.isArray(data.items)) {
        setServices(data.items);
      }
    });

    // 4. Subscribe to Industries List
    const unsubIndustries = subscribeToDoc<{ items: IndustryItem[] }>("industries", "list", { items: defaultIndustries }, (data) => {
      if (data && Array.isArray(data.items)) {
        setIndustries(data.items);
      }
    });

    // 5. Subscribe to Process Steps
    const unsubProcess = subscribeToDoc<{ items: ProcessStep[] }>("process", "list", { items: defaultProcessSteps }, (data) => {
      if (data && Array.isArray(data.items)) {
        setProcessSteps(data.items);
      }
    });

    // 6. Subscribe to FAQ
    const unsubFaq = subscribeToDoc<{ items: FaqItem[] }>("faq", "list", { items: defaultFaqs }, (data) => {
      if (data && Array.isArray(data.items)) {
        setFaqs(data.items);
      }
    });

    // 7. Subscribe to Contact Settings & Form Builder
    const unsubContact = subscribeToDoc<ContactSettings>("contact", "config", defaultContactSettings, (data) => {
      if (data && data.email) setContact(data);
    });

    // 8. Subscribe to General Website Settings
    const unsubSettings = subscribeToDoc<WebsiteSettings>("settings", "general", defaultWebsiteSettings, (data) => {
      if (data && data.businessName) setSettings(data);
    });

    // 9. Subscribe to SEO Settings
    const unsubSeo = subscribeToDoc<SeoSettings>("seo", "global", defaultSeoSettings, (data) => {
      if (data && data.metaTitle) setSeo(data);
    });

    // 10. Subscribe to Dynamic Pages in Realtime
    const unsubPages = subscribeToPages((pagesList) => {
      if (Array.isArray(pagesList)) {
        setPages(pagesList);
      }
    });

    // 11. Subscribe to Testimonials
    const unsubTestimonials = subscribeToDoc<{ items: TestimonialItem[] }>("testimonials", "list", { items: defaultTestimonials }, (data) => {
      if (data && Array.isArray(data.items)) {
        setTestimonials(data.items);
      }
    });

    // 12. Subscribe to Projects
    const unsubProjects = subscribeToDoc<{ items: ProjectItem[] }>("projects", "list", { items: defaultProjects }, (data) => {
      if (data && Array.isArray(data.items)) {
        setProjects(data.items);
      }
    });

    // 13. Subscribe to Blogs
    const unsubBlogs = subscribeToDoc<{ items: BlogPost[] }>("blogs", "list", { items: defaultBlogs }, (data) => {
      if (data && Array.isArray(data.items)) {
        setBlogs(data.items);
      }
    });

    return () => {
      unsubHero();
      unsubAbout();
      unsubServices();
      unsubIndustries();
      unsubProcess();
      unsubFaq();
      unsubContact();
      unsubSettings();
      unsubSeo();
      unsubPages();
      unsubTestimonials();
      unsubProjects();
      unsubBlogs();
    };
  }, []);

  return (
    <CMSContext.Provider
      value={{
        hero,
        about,
        services,
        industries,
        process: processSteps,
        faqs,
        contact,
        settings,
        seo,
        pages,
        testimonials,
        projects,
        blogs,
        loading,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}

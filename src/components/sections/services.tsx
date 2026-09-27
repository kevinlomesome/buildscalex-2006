"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Bot, 
  Workflow, 
  Target, 
  Database, 
  Cpu, 
  Megaphone, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight,
  Code2,
  Users,
  Layers,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { getWhatsAppLink } from "@/lib/constants";
import { useCMS } from "@/context/cms-context";
import { ServiceItem } from "@/lib/cms-types";

interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  icon: React.ReactNode;
  whatItIs: string;
  whoItIsFor: string;
  howItWorks: string;
  businessOutcomes: string;
  deliverables: string[];
}

function resolveServiceIcon(iconName?: string) {
  switch (iconName?.toLowerCase()) {
    case "globe": return <Globe className="w-5 h-5 text-primary" />;
    case "bot": return <Bot className="w-5 h-5 text-primary" />;
    case "workflow": return <Workflow className="w-5 h-5 text-primary" />;
    case "target": return <Target className="w-5 h-5 text-primary" />;
    case "database": return <Database className="w-5 h-5 text-primary" />;
    case "cpu": return <Cpu className="w-5 h-5 text-primary" />;
    case "megaphone": return <Megaphone className="w-5 h-5 text-primary" />;
    case "trendingup":
    case "filter": return <TrendingUp className="w-5 h-5 text-primary" />;
    case "code":
    case "code2": return <Code2 className="w-5 h-5 text-primary" />;
    case "users": return <Users className="w-5 h-5 text-primary" />;
    default: return <Layers className="w-5 h-5 text-primary" />;
  }
}

const servicesData: ServiceDetail[] = [
  {
    id: "website-development",
    number: "01",
    title: "Website Development",
    shortDescription: "High-performance, bespoke web platforms engineered with Next.js 16, React 19, and edge architecture for maximum conversion.",
    icon: <Globe className="w-5 h-5 text-primary" />,
    whatItIs: "High-performance, bespoke digital platforms built with Next.js 16 App Router, React 19, and edge infrastructure. Clean handcrafted code engineered to establish technical authority and maximize conversion rates without bloated third-party templates.",
    whoItIsFor: "Business owners, funded startups, SMEs, and high-ticket service companies requiring a credible, lightning-fast digital flagship.",
    howItWorks: "We conduct UX architecture wireframing, craft custom UI layouts, develop type-safe Next.js codebases, optimize Core Web Vitals for sub-second page loads, and integrate headless CMS controls.",
    businessOutcomes: "Sub-second load times that cut bounce rates, instant technical credibility, semantic search engine dominance, and frictionless prospect capture.",
    deliverables: [
      "Custom Next.js 16 & React 19 production codebase",
      "Full intellectual property & source code ownership",
      "Headless CMS management panel",
      "Lighthouse 95+ Core Web Vitals optimization",
      "Mobile, tablet, and desktop responsive layouts"
    ]
  },
  {
    id: "ai-automation",
    number: "02",
    title: "AI Automation",
    shortDescription: "Intelligent background automation workflows that eliminate manual friction, sync data, and accelerate operational velocity.",
    icon: <Workflow className="w-5 h-5 text-primary" />,
    whatItIs: "Intelligent event-driven automation pipelines connecting your marketing touchpoints, communication channels, database layers, and internal operations into one seamless flow.",
    whoItIsFor: "SMEs, service businesses, and high-ticket companies spending excessive human hours manually copying lead data, forwarding emails, and triaging customer inquiries.",
    howItWorks: "We map your operational bottlenecks, build secure webhooks and API bridges, connect event triggers to intelligent processing logic, and route data directly to stakeholders in real-time.",
    businessOutcomes: "Zero lost leads, sub-60-second response latency across customer channels, and hundreds of manual operational hours reclaimed every month.",
    deliverables: [
      "Custom API & webhook orchestration architecture",
      "Automated lead qualification & instant notification routing",
      "Two-way cross-platform data synchronization",
      "Automated error monitoring & failover recovery",
      "Operational workflow blueprint & documentation"
    ]
  },
  {
    id: "ai-agents",
    number: "03",
    title: "AI Agents",
    shortDescription: "Domain-trained conversational and task-oriented agents that qualify prospects, answer technical inquiries, and book calls 24/7.",
    icon: <Bot className="w-5 h-5 text-primary" />,
    whatItIs: "Autonomous, domain-trained conversational agents embedded across your website, WhatsApp, and internal systems that intelligently converse with prospects, answer domain questions, and book qualified meetings around the clock.",
    whoItIsFor: "Service businesses, agencies, and international firms operating across multiple time zones needing continuous qualification without hiring night-shift teams.",
    howItWorks: "We ground specialized AI models strictly on your verified service catalog, pricing parameters, and qualification logic using Retrieval-Augmented Generation (RAG) with built-in human handoff protocols.",
    businessOutcomes: "24/7 continuous prospect capture, elimination of cold lead decay, instant meeting scheduling on sales calendars, and reduced customer service overhead.",
    deliverables: [
      "Domain-trained conversational AI agent",
      "WhatsApp Business API & web chat interface integration",
      "Knowledge base vector embeddings & custom system instructions",
      "Calendar booking & appointment synchronization",
      "Instant executive escalation & human-in-the-loop fallback"
    ]
  },
  {
    id: "lead-generation-systems",
    number: "04",
    title: "Lead Generation Systems",
    shortDescription: "Multi-step, conversion-engineered acquisition funnels designed to filter, verify, and deliver high-intent prospects.",
    icon: <Target className="w-5 h-5 text-primary" />,
    whatItIs: "Multi-step conversion funnels and interactive intake architectures engineered specifically to capture, verify, and filter high-ticket clients while discouraging tire-kickers.",
    whoItIsFor: "High-ticket service firms, B2B agencies, and consultants who need a consistent influx of pre-qualified decision-makers rather than low-quality contacts.",
    howItWorks: "We construct high-intent landing experiences with step-by-step qualification assessments, dynamic budget triage, verified phone/WhatsApp capture, and calendar booking integration.",
    businessOutcomes: "Higher sales closing rates, elimination of unqualified sales conversations, lower cost per closed deal, and predictable customer acquisition volume.",
    deliverables: [
      "Direct-response, high-converting landing page",
      "Multi-step interactive qualification intake form",
      "Real-time lead validation & phone verification",
      "Automated WhatsApp triage & calendar booking link",
      "End-to-end funnel conversion event tracking"
    ]
  },
  {
    id: "crm-integration",
    number: "05",
    title: "CRM Integration",
    shortDescription: "Centralized client management infrastructure unifying lead records, sales pipelines, and customer communication.",
    icon: <Database className="w-5 h-5 text-primary" />,
    whatItIs: "Unified customer relationship management architecture connecting your frontend forms, advertising accounts, communication channels, and sales stages into a single source of truth.",
    whoItIsFor: "Companies experiencing lost deals, fragmented client notes across WhatsApp/email, and lack of visibility into pipeline conversion stages.",
    howItWorks: "We configure custom CRM data models, establish authenticated two-way API pipelines with HubSpot, Zoho, Salesforce, or custom Firestore databases, and automate deal stage progressions.",
    businessOutcomes: "Complete pipeline clarity, zero duplicate records, rapid sales representative follow-up times, and accurate client lifetime revenue tracking.",
    deliverables: [
      "Custom pipeline stages & deal property schema",
      "Two-way automated lead ingestion from web & ad forms",
      "Automated status change alerts & task assignments",
      "Executive pipeline analytics & deal velocity dashboard",
      "Sales team onboarding walkthrough & documentation"
    ]
  },
  {
    id: "business-process-automation",
    number: "06",
    title: "Business Process Automation",
    shortDescription: "Custom internal operational workflows, automated documentation, and custom admin portals that eliminate scaling bottlenecks.",
    icon: <Cpu className="w-5 h-5 text-primary" />,
    whatItIs: "Bespoke internal systems and automated operational pipelines that handle client onboarding, contract generation, automated invoicing, and real-time status reporting.",
    whoItIsFor: "Growing businesses, professional agencies, and SMEs hitting operational bottlenecks where manual back-office tasks slow down growth.",
    howItWorks: "We dissect your core fulfillment steps, automate repetitive document creation via dynamic templates, configure automated approval triggers, and build bespoke administrative dashboards.",
    businessOutcomes: "Drastically reduced back-office overhead, zero human typographical errors, rapid client onboarding times, and an operation built to scale seamlessly.",
    deliverables: [
      "Custom operational admin management panel",
      "Automated contract & PDF proposal generation",
      "Payment trigger & invoice dispatch workflows",
      "Internal notification & task dispatch pipelines",
      "Standard Operating Procedure (SOP) documentation"
    ]
  },
  {
    id: "performance-marketing",
    number: "07",
    title: "Performance Marketing",
    shortDescription: "Data-backed paid advertising campaigns across Meta Ads with server-side tracking, high-intent creative, and continuous ROAS optimization.",
    icon: <Megaphone className="w-5 h-5 text-primary" />,
    whatItIs: "Scientific paid acquisition architecture focused on Meta Ads (Facebook & Instagram) engineered with server-side Conversions API (CAPI) for precise targeting and high-return scaling.",
    whoItIsFor: "Established brands and service companies with validated offers seeking a predictable, scalable channel to acquire qualified clients profitably.",
    howItWorks: "We conduct deep customer avatar research, develop direct-response hooks and creative angles, configure server-side conversion tracking, and deploy systematic testing matrices.",
    businessOutcomes: "Consistent flow of qualified buyer inquiries, transparent cost-per-lead attribution, and a scalable advertising asset that compounds revenue.",
    deliverables: [
      "Meta Ads campaign architecture & structure",
      "Server-side Meta Conversions API (CAPI) setup",
      "High-intent copy & direct-response creative frameworks",
      "Dynamic retargeting sequences for warm prospects",
      "Real-time ROAS & lead acquisition tracking telemetry"
    ]
  },
  {
    id: "growth-systems",
    number: "08",
    title: "Growth Systems",
    shortDescription: "The complete, unified infrastructure connecting bespoke web platforms, paid traffic, AI agent triage, and automated CRM pipelines.",
    icon: <TrendingUp className="w-5 h-5 text-primary" />,
    whatItIs: "Our flagship holistic engagement: a fully synchronized revenue engine where your bespoke website, paid acquisition, AI agent qualification, CRM routing, and automated onboarding function as one cohesive machine.",
    whoItIsFor: "Ambitious founders, SMEs, and enterprise operators seeking a dedicated technical growth partner to engineer an end-to-end commercial acquisition engine.",
    howItWorks: "We engineer and interconnect all 7 disciplines: Traffic Acquisition -> Edge Website -> Multi-Step Funnel -> AI Agent Triage -> CRM Routing -> Automated Onboarding -> Executive Analytics.",
    businessOutcomes: "A market-dominating digital asset that functions autonomously, drives predictable enterprise revenue, and scales without operational friction.",
    deliverables: [
      "End-to-end Growth Architecture blueprint",
      "Full-stack Next.js website & conversion funnels",
      "Integrated AI conversational agents & WhatsApp workflows",
      "Complete CRM pipeline & automation infrastructure",
      "Ongoing architectural maintenance & quarterly optimization"
    ]
  }
];

export function ServicesSection() {
  const { services: cmsServices } = useCMS();

  // Dynamically map from CMS services if available, else fallback to servicesData
  const displayServices: ServiceDetail[] = cmsServices && cmsServices.length > 0
    ? cmsServices
        .filter((s: ServiceItem) => s.active !== false)
        .sort((a: ServiceItem, b: ServiceItem) => (a.order || 0) - (b.order || 0))
        .map((s: ServiceItem, idx: number) => {
          const curated = servicesData.find(
            (sd) => sd.id === s.id || sd.title.toLowerCase() === s.title.toLowerCase()
          );
          const deliverables =
            s.categories && s.categories.length > 0
              ? s.categories.map((c) => c.title)
              : curated?.deliverables || [
                  `${s.title} production architecture`,
                  "Lighthouse 95+ Core Web Vitals optimization",
                  "Full source code and GitHub repository ownership",
                  "Automated lead capture & CRM synchronization",
                  "Dedicated engineering support & SLA"
                ];

          return {
            id: s.id,
            number: s.number || String(idx + 1).padStart(2, "0"),
            title: s.title,
            shortDescription: s.subtitle || s.description || curated?.shortDescription || "",
            icon: resolveServiceIcon(s.iconName),
            whatItIs: s.description || curated?.whatItIs || "High-performance digital systems engineered for authority and conversion.",
            whoItIsFor: s.subtitle || curated?.whoItIsFor || "Businesses and founders requiring modern, bespoke digital infrastructure.",
            howItWorks: curated?.howItWorks || "We engineer custom type-safe architectures, conduct rigorous performance profiling, and integrate automated client acquisition pipelines.",
            businessOutcomes: curated?.businessOutcomes || "Sub-second responsiveness, zero lost leads, and scalable technical authority.",
            deliverables
          };
        })
    : servicesData;

  const [activeId, setActiveId] = useState<string>(
    displayServices[0]?.id || "01-website-development"
  );
  
  // Guard if activeId gets deleted
  const activeService =
    displayServices.find((s) => s.id === activeId) || displayServices[0] || servicesData[0];

  return (
    <section id="services" className="py-20 md:py-28 relative bg-[#06080E] border-y border-white/[0.06]">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-silver uppercase tracking-wider mb-5">
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span>Technical Capabilities & Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Engineered For Measurable Business Outcomes.
          </h2>
          <p className="text-silver text-base sm:text-lg leading-relaxed">
            We do not sell generic templates or cosmetic designs. We engineer custom digital systems, intelligent automation pipelines, and acquisition architecture tailored for serious business growth.
          </p>
        </div>

        {/* Services Interactive Grid & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Services Navigation List */}
          <div className="lg:col-span-5 space-y-2.5">
            {displayServices.map((service) => {
              const isSelected = service.id === activeService.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveId(service.id)}
                  className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? "bg-white/[0.06] border-primary/50 shadow-sm"
                      : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-semibold text-silver/60 group-hover:text-primary transition-colors">
                      {service.number}
                    </span>
                    <div>
                      <h3 className={`text-base font-semibold transition-colors ${
                        isSelected ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
                      }`}>
                        {service.title}
                      </h3>
                      <p className="text-xs text-silver/70 line-clamp-1 mt-0.5">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${
                    isSelected ? "text-primary translate-x-1" : "text-silver/40 group-hover:text-silver group-hover:translate-x-0.5"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Architecture Specification Inspector */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-[#0C0F19] rounded-2xl border border-white/[0.08] p-6 md:p-8 space-y-8"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      {activeService.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-primary font-bold">
                          PILLAR {activeService.number}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {activeService.title}
                      </h3>
                    </div>
                  </div>

                  <Link
                    href={getWhatsAppLink(`Hi BuildScaleX, I would like to consult on ${activeService.title}.`)}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-blue-600 text-white text-xs font-semibold transition-all active:scale-[0.99] self-start sm:self-auto shrink-0"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Structured Breakdown: What / Who / How / Outcomes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-mono font-semibold uppercase text-silver/70 mb-2 tracking-wider">
                      What It Is
                    </h4>
                    <p className="text-sm text-silver leading-relaxed">
                      {activeService.whatItIs}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-semibold uppercase text-silver/70 mb-2 tracking-wider">
                      Who It Is For
                    </h4>
                    <p className="text-sm text-silver leading-relaxed">
                      {activeService.whoItIsFor}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-semibold uppercase text-silver/70 mb-2 tracking-wider">
                      How It Works
                    </h4>
                    <p className="text-sm text-silver leading-relaxed">
                      {activeService.howItWorks}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-semibold uppercase text-silver/70 mb-2 tracking-wider">
                      Measurable Business Outcomes
                    </h4>
                    <p className="text-sm text-silver leading-relaxed">
                      {activeService.businessOutcomes}
                    </p>
                  </div>
                </div>

                {/* Concrete Deliverables Checklist */}
                <div className="pt-6 border-t border-white/[0.08]">
                  <h4 className="text-xs font-mono font-semibold uppercase text-foreground mb-4 tracking-wider flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-primary" />
                    <span>Concrete Deliverables & Assets Provided</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeService.deliverables.map((deliv, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs text-silver"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                    <Link
                      href={`/services/${activeService.id}`}
                      className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-primary hover:text-blue-400 transition-colors group cursor-pointer"
                    >
                      <span>Explore Dedicated {activeService.title} Architecture &amp; Solutions</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

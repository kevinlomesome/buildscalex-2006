"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, Layout, Briefcase, Utensils, Dumbbell, Stethoscope, FolderGit2,
  HardHat, Armchair, GraduationCap, ShoppingBag, BarChart3, Layers, Network,
  Code2, Wrench, Server, Globe, CreditCard, Gauge, LineChart,
  Target, Filter, TrendingUp, CalendarCheck, HelpCircle, MessageSquare, Mail,
  Split, Zap, BarChart2, Megaphone, Share2, Camera, RefreshCw, Users,
  Sliders, Eye, Compass, PieChart, Bot, Cpu, MessageCircle, Calendar,
  CheckCircle2, GitPullRequest, Code, Workflow, ShieldCheck, Database,
  Grid, Kanban, SlidersHorizontal, BarChart, Search, FileText, MapPin,
  Map, Key, FileSearch, PenTool, Palette, BookOpen, LayoutTemplate,
  MousePointerClick, Image as ImageIcon, ChevronDown, ArrowRight, Sparkles
} from "lucide-react";
import Link from "next/link";
import { getWhatsAppLink } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { useCMS } from "@/context/cms-context";

interface ServiceCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ServiceSystem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  icon: React.ReactNode;
  categories: ServiceCategory[];
}

const serviceSystems: ServiceSystem[] = [
  {
    id: "web-dev",
    number: "01",
    title: "Website Development",
    shortDescription: "High-performance, conversion-engineered digital platforms and custom web systems tailored for serious businesses.",
    icon: <Globe className="w-6 h-6 text-primary" />,
    categories: [
      { title: "Business Websites", description: "Authoritative digital presence establishing trust and market authority.", icon: <Building2 className="w-5 h-5 text-primary" /> },
      { title: "Landing Pages", description: "Friction-free, single-focus landing pages designed for maximum lead capture.", icon: <Layout className="w-5 h-5 text-secondary" /> },
      { title: "Corporate Websites", description: "Multi-department enterprise portals with scalable modular architecture.", icon: <Briefcase className="w-5 h-5 text-primary" /> },
      { title: "Restaurant Websites", description: "Interactive digital menus, table reservation engines, and local SEO integrations.", icon: <Utensils className="w-5 h-5 text-secondary" /> },
      { title: "Gym Websites", description: "Membership acquisition funnels, class timetables, and free trial bookings.", icon: <Dumbbell className="w-5 h-5 text-primary" /> },
      { title: "Clinic Websites", description: "HIPAA-conscious appointment scheduling and medical practitioner profiles.", icon: <Stethoscope className="w-5 h-5 text-secondary" /> },
      { title: "Portfolio Websites", description: "High-impact visual case study hubs designed for agencies, architects, and creators.", icon: <FolderGit2 className="w-5 h-5 text-primary" /> },
      { title: "Construction Websites", description: "Project bidding estimators, tender showcases, and commercial contractor portfolios.", icon: <HardHat className="w-5 h-5 text-secondary" /> },
      { title: "Furniture Websites", description: "High-resolution architectural catalog showcases with instant WhatsApp quote engines.", icon: <Armchair className="w-5 h-5 text-primary" /> },
      { title: "Educational Websites", description: "Course catalog portals, student admission funnels, and LMS integration.", icon: <GraduationCap className="w-5 h-5 text-secondary" /> },
      { title: "Ecommerce Websites", description: "High-velocity storefronts with rapid checkout flows and cart abandonment recovery.", icon: <ShoppingBag className="w-5 h-5 text-primary" /> },
      { title: "Custom Dashboards", description: "Bespoke internal portals, real-time client analytics, and telemetry hubs.", icon: <BarChart3 className="w-5 h-5 text-secondary" /> },
      { title: "Admin Panels", description: "Secure, role-based operational command centers for enterprise teams.", icon: <Layers className="w-5 h-5 text-primary" /> },
      { title: "API Integration", description: "Seamless two-way data connectivity across billing, logistics, and CRM databases.", icon: <Network className="w-5 h-5 text-secondary" /> },
      { title: "CMS Development", description: "Custom headless and visual content publishing systems with zero bloat.", icon: <Code2 className="w-5 h-5 text-primary" /> },
      { title: "Website Maintenance", description: "Proactive uptime monitoring, security patching, SSL checks, and rapid bug resolution.", icon: <Wrench className="w-5 h-5 text-secondary" /> },
      { title: "Hosting Setup", description: "High-speed edge cloud deployment with automated backups and DDoS hardening.", icon: <Server className="w-5 h-5 text-primary" /> },
      { title: "Domain Configuration", description: "Professional DNS records, email routing, and DKIM/SPF deliverability security.", icon: <Globe className="w-5 h-5 text-secondary" /> },
      { title: "Payment Gateway", description: "Frictionless checkout integrations with Razorpay, Stripe, and automated recurring billing.", icon: <CreditCard className="w-5 h-5 text-primary" /> },
      { title: "Performance Optimization", description: "Core Web Vitals tuning achieving sub-second loads and Google speed dominance.", icon: <Gauge className="w-5 h-5 text-secondary" /> },
      { title: "Analytics Setup", description: "Server-side GA4, Google Tag Manager, and custom conversion event tracking.", icon: <LineChart className="w-5 h-5 text-primary" /> },
    ],
  },
  {
    id: "sales-funnels",
    number: "02",
    title: "Sales Funnels",
    shortDescription: "Revenue-maximizing customer journeys engineered to convert cold ad traffic into paying, qualified clients.",
    icon: <Filter className="w-6 h-6 text-secondary" />,
    categories: [
      { title: "Landing Funnels", description: "Direct-response entry points structured for immediate prospect action.", icon: <Target className="w-5 h-5 text-secondary" /> },
      { title: "Lead Funnels", description: "Multi-step qualification sequences filtering high-ticket buyers automatically.", icon: <Filter className="w-5 h-5 text-primary" /> },
      { title: "Sales Funnels", description: "End-to-end direct offer checkout and upsell architectures.", icon: <TrendingUp className="w-5 h-5 text-secondary" /> },
      { title: "Booking Funnels", description: "Calendar appointment booking with automated SMS and WhatsApp confirmation.", icon: <CalendarCheck className="w-5 h-5 text-primary" /> },
      { title: "Quiz Funnels", description: "Interactive segmentation assessments that recommend personalized solutions.", icon: <HelpCircle className="w-5 h-5 text-secondary" /> },
      { title: "WhatsApp Funnels", description: "One-click WhatsApp click-to-chat funnels with instant bot qualification.", icon: <MessageSquare className="w-5 h-5 text-primary" /> },
      { title: "CRM Funnels", description: "Direct lead routing that pushes verified prospect data straight to your closers.", icon: <Database className="w-5 h-5 text-secondary" /> },
      { title: "Email Funnels", description: "Dynamic behavior-triggered email nurturing sequences built for long-term retention.", icon: <Mail className="w-5 h-5 text-primary" /> },
      { title: "A/B Testing", description: "Scientific multivariate testing across headlines, hooks, and checkout layouts.", icon: <Split className="w-5 h-5 text-secondary" /> },
      { title: "Conversion Optimization", description: "Heatmap auditing and micro-copy tuning eliminating conversion friction.", icon: <Zap className="w-5 h-5 text-primary" /> },
      { title: "Checkout Pages", description: "High-trust checkout experiences with 1-click order bumps and post-purchase upsells.", icon: <CreditCard className="w-5 h-5 text-secondary" /> },
      { title: "Analytics Tracking", description: "Comprehensive ROAS and customer acquisition cost telemetry across every stage.", icon: <BarChart2 className="w-5 h-5 text-primary" /> },
    ],
  },
  {
    id: "performance-marketing",
    number: "03",
    title: "Performance Marketing",
    shortDescription: "Data-backed paid acquisition campaigns designed to generate predictable return on ad spend at scale.",
    icon: <Megaphone className="w-6 h-6 text-primary" />,
    categories: [
      { title: "Meta Ads", description: "Enterprise-grade Facebook and Instagram paid ad campaign architecture.", icon: <Megaphone className="w-5 h-5 text-primary" /> },
      { title: "Facebook Ads", description: "Feed, video, and collection ads built for high-intent audience engagement.", icon: <Share2 className="w-5 h-5 text-secondary" /> },
      { title: "Instagram Ads", description: "Reel and Story visual campaigns tailored for modern lifestyle and service brands.", icon: <Camera className="w-5 h-5 text-primary" /> },
      { title: "Remarketing", description: "Dynamic retargeting sequences recovering dropped leads and window shoppers.", icon: <RefreshCw className="w-5 h-5 text-secondary" /> },
      { title: "Lead Generation", description: "High-volume verified prospect acquisition campaigns via native Meta forms.", icon: <Users className="w-5 h-5 text-primary" /> },
      { title: "Pixel Setup", description: "Conversions API (CAPI) server-side tracking resilient against browser ad blockers.", icon: <Sliders className="w-5 h-5 text-secondary" /> },
      { title: "Campaign Optimization", description: "Daily bid management, algorithmic scaling, and budget pacing for peak ROAS.", icon: <TrendingUp className="w-5 h-5 text-primary" /> },
      { title: "Creative Testing", description: "Rapid testing sprints evaluating hooks, angles, and formats to identify winners.", icon: <Eye className="w-5 h-5 text-secondary" /> },
      { title: "Audience Research", description: "Granular competitor breakdown, buyer persona profiling, and custom lookalike sets.", icon: <Compass className="w-5 h-5 text-primary" /> },
      { title: "Conversion Tracking", description: "Transparent multi-touch attribution connecting ad spend directly to closed revenue.", icon: <PieChart className="w-5 h-5 text-secondary" /> },
    ],
  },
  {
    id: "ai-automation",
    number: "04",
    title: "AI Automation",
    shortDescription: "Intelligent autonomous agents and automated workflows that eliminate manual work and operate 24/7.",
    icon: <Bot className="w-6 h-6 text-secondary" />,
    categories: [
      { title: "AI Chatbots", description: "Context-aware conversational agents trained on your proprietary company data.", icon: <Bot className="w-5 h-5 text-secondary" /> },
      { title: "AI Agents", description: "Autonomous multi-step agents that execute business operations without supervision.", icon: <Cpu className="w-5 h-5 text-primary" /> },
      { title: "CRM Automation", description: "Automated contact enrichment, deal pipeline transitions, and task generation.", icon: <Database className="w-5 h-5 text-secondary" /> },
      { title: "WhatsApp Automation", description: "Instant under-60-second client response, interactive menu bots, and broadcast lists.", icon: <MessageCircle className="w-5 h-5 text-primary" /> },
      { title: "Appointment Automation", description: "Intelligent auto-booking, rescheduling, and reminder notifications over WhatsApp.", icon: <Calendar className="w-5 h-5 text-secondary" /> },
      { title: "Lead Qualification", description: "AI scoring logic validating prospect budget and intent before passing to human sales.", icon: <CheckCircle2 className="w-5 h-5 text-primary" /> },
      { title: "Workflow Automation", description: "Zapier, Make, and webhook connections synchronizing your toolstack effortlessly.", icon: <GitPullRequest className="w-5 h-5 text-secondary" /> },
      { title: "OpenAI Integration", description: "Custom GPT and LLM endpoints embedded directly into your operational software.", icon: <Sparkles className="w-5 h-5 text-primary" /> },
      { title: "API Automation", description: "Custom serverless micro-services syncing databases and external APIs in real time.", icon: <Code className="w-5 h-5 text-secondary" /> },
      { title: "Business Automation", description: "Full operational streamlining from lead capture and invoicing to customer onboarding.", icon: <Workflow className="w-5 h-5 text-primary" /> },
      { title: "Custom AI Solutions", description: "Bespoke private artificial intelligence pipelines engineered for unique company workflows.", icon: <ShieldCheck className="w-5 h-5 text-secondary" /> },
    ],
  },
  {
    id: "crm-integration",
    number: "05",
    title: "CRM Integration",
    shortDescription: "Unified customer data infrastructure giving executive leadership complete pipeline visibility and zero lost leads.",
    icon: <Database className="w-6 h-6 text-primary" />,
    categories: [
      { title: "HubSpot", description: "Enterprise Marketing, Sales, and Service Hub customization and pipeline architecture.", icon: <Database className="w-5 h-5 text-primary" /> },
      { title: "GoHighLevel", description: "Complete sub-account setup, automated snapshot workflows, and client portals.", icon: <Layers className="w-5 h-5 text-secondary" /> },
      { title: "Zoho", description: "Zoho CRM customization, blueprint workflow rules, and Zoho ecosystem integration.", icon: <Grid className="w-5 h-5 text-primary" /> },
      { title: "Pipedrive", description: "Visual deal staging, activity automation, and sales rep pipeline velocity tracking.", icon: <Kanban className="w-5 h-5 text-secondary" /> },
      { title: "Custom CRM", description: "Proprietary database solutions designed for non-standard operational business models.", icon: <Server className="w-5 h-5 text-primary" /> },
      { title: "Lead Tracking", description: "First-touch to closed-won journey tracking with full campaign source fidelity.", icon: <Search className="w-5 h-5 text-secondary" /> },
      { title: "Automation", description: "Instant notification triggers alerting your closers the second a VIP prospect submits.", icon: <Zap className="w-5 h-5 text-primary" /> },
      { title: "Pipeline Setup", description: "Standardized deal stages, probability weighting, and automated SLA reminders.", icon: <SlidersHorizontal className="w-5 h-5 text-secondary" /> },
      { title: "Reporting", description: "Executive revenue dashboards measuring team closing ratios and lead response speed.", icon: <BarChart className="w-5 h-5 text-primary" /> },
    ],
  },
  {
    id: "seo-growth",
    number: "06",
    title: "SEO & Growth",
    shortDescription: "Organic search dominance and local authority that drives compounding, high-intent buyer traffic month over month.",
    icon: <Search className="w-6 h-6 text-secondary" />,
    categories: [
      { title: "Technical SEO", description: "Complete crawlability, indexation, XML sitemaps, robots.txt, and schema markup.", icon: <Wrench className="w-5 h-5 text-secondary" /> },
      { title: "On-page SEO", description: "Keyword density tuning, semantic heading hierarchy, internal linking, and meta tags.", icon: <FileText className="w-5 h-5 text-primary" /> },
      { title: "Local SEO", description: "City and region-specific dominance capturing nearby buyers searching for your services.", icon: <MapPin className="w-5 h-5 text-secondary" /> },
      { title: "Google Business Profile", description: "GMB optimization, review growth systems, and local map-pack top ranking.", icon: <Map className="w-5 h-5 text-primary" /> },
      { title: "Keyword Research", description: "High-intent commercial search queries mapped against competitor ranking gaps.", icon: <Key className="w-5 h-5 text-secondary" /> },
      { title: "Performance Optimization", description: "Page speed enhancement that satisfies Google search core ranking algorithms.", icon: <Gauge className="w-5 h-5 text-primary" /> },
      { title: "Website Audit", description: "Exhaustive 80-point inspection identifying crawl errors, toxic links, and UX dead-ends.", icon: <FileSearch className="w-5 h-5 text-secondary" /> },
      { title: "Monthly Reports", description: "Transparent keyword movement, organic traffic growth, and lead attribution reports.", icon: <TrendingUp className="w-5 h-5 text-primary" /> },
    ],
  },
  {
    id: "branding",
    number: "07",
    title: "Branding",
    shortDescription: "Luxury visual identity and premium market positioning that builds instant trust and commands premium pricing.",
    icon: <PenTool className="w-6 h-6 text-primary" />,
    categories: [
      { title: "Logo Design", description: "Timeless, versatile emblems and geometric marks engineered for digital scale.", icon: <PenTool className="w-5 h-5 text-primary" /> },
      { title: "Visual Identity", description: "Curated typography systems, color palettes, and strict aesthetic rules.", icon: <Palette className="w-5 h-5 text-secondary" /> },
      { title: "Brand Guidelines", description: "Comprehensive brand book specifying web, mobile, and print application standards.", icon: <BookOpen className="w-5 h-5 text-primary" /> },
      { title: "UI Design", description: "Figma design systems, pixel-perfect component libraries, and interactive prototypes.", icon: <LayoutTemplate className="w-5 h-5 text-secondary" /> },
      { title: "UX Design", description: "User journey mapping, wireframing, and psychological friction elimination.", icon: <MousePointerClick className="w-5 h-5 text-primary" /> },
      { title: "Creative Assets", description: "High-impact social kits, investor pitch deck templates, and branded marketing collateral.", icon: <ImageIcon className="w-5 h-5 text-secondary" /> },
      { title: "Social Media Branding", description: "Cohesive profile headers, post templates, and brand story highlights across networks.", icon: <Share2 className="w-5 h-5 text-primary" /> },
    ],
  },
];

export function ServicesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { services: cmsServices } = useCMS();
  const activeServices = (cmsServices !== undefined ? cmsServices : serviceSystems)
    .filter((s: any) => s.active !== false)
    .sort((a, b) => ((a as any).order || 0) - ((b as any).order || 0));

  const toggleService = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="services" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Growth Systems & Digital Architecture</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
            Our Premium{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Service Systems
            </span>
          </h2>

          <p className="text-silver text-base md:text-lg leading-relaxed">
            Select any system below to explore our comprehensive service capabilities, specialized deliverables, and automated growth architectures.
          </p>
        </div>

        {/* Expandable Services Accordion List */}
        <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
          {activeServices.map((service, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={service.id}
                className="glass rounded-2xl md:rounded-3xl border border-border/80 overflow-hidden transition-all duration-300 hover:border-primary/40 shadow-sm"
              >
                {/* Collapsed Header / Accordion Trigger */}
                <button
                  onClick={() => toggleService(index)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                >
                  <div className="flex items-start md:items-center gap-4 md:gap-6 flex-1">
                    {/* Number Badge */}
                    <span className="font-mono text-xs md:text-sm font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg shrink-0 mt-1 md:mt-0">
                      {service.number}
                    </span>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
                        <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-border text-silver">
                          {service.categories.filter((c: any) => c.active !== false).length} Capabilities
                        </span>
                      </div>
                      <p className="text-silver text-xs md:text-sm max-w-2xl leading-relaxed">
                        {(service as any).shortDescription || (service as any).description}
                      </p>
                    </div>
                  </div>

                  {/* Expand Chevron Icon */}
                  <div className="w-10 h-10 rounded-xl border border-border bg-black/5 dark:bg-white/5 flex items-center justify-center text-foreground shrink-0 group-hover:border-primary/40 group-hover:text-primary transition-all">
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>
                </button>

                {/* Expanded Content: Smooth Accordion */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 md:p-8 pt-0 border-t border-border/60 mt-2">
                        
                        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-6 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          <span>Specialized Deliverables & Solutions ({service.categories.filter((c: any) => c.active !== false).length})</span>
                        </div>

                        {/* Service Category Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-4 mb-8">
                          {service.categories.filter((c: any) => c.active !== false).map((cat, catIdx) => (
                            <motion.div
                              key={cat.title}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: Math.min(catIdx * 0.02, 0.3) }}
                              className="group/card p-4 rounded-xl md:rounded-2xl border border-border/70 bg-card/60 hover:bg-card hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between"
                            >
                              <div>
                                <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-border w-fit mb-3 group-hover/card:border-primary/40 group-hover/card:scale-105 transition-all">
                                  {(cat as any).icon || <Sparkles className="w-5 h-5 text-primary" />}
                                </div>
                                <h4 className="font-heading text-sm md:text-base font-bold text-foreground mb-1 group-hover/card:text-primary transition-colors">
                                  {cat.title}
                                </h4>
                                <p className="text-silver text-xs leading-relaxed">
                                  {cat.description}
                                </p>
                              </div>

                              {/* WhatsApp Instant Quick Inquire */}
                              <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                                <Link
                                  href={getWhatsAppLink(`Hi Build Scale X, I want to inquire about "${cat.title}" under ${service.title}.`)}
                                  target="_blank"
                                  className="text-[11px] font-semibold text-primary hover:text-secondary flex items-center gap-1 transition-colors"
                                >
                                  <span>Inquire on WhatsApp</span>
                                  <ArrowRight className="w-3 h-3 group-hover/card:translate-x-0.5 transition-transform" />
                                </Link>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Accordion Bottom Action Bar */}
                        <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 via-primary/5 to-transparent border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div>
                            <div className="font-heading font-bold text-sm md:text-base text-foreground">
                              Ready to deploy {service.title} for your company?
                            </div>
                            <div className="text-xs text-silver mt-0.5">
                              Our senior growth engineers will architect a custom roadmap within 24 hours.
                            </div>
                          </div>

                          <Link
                            href={getWhatsAppLink(`Hi Build Scale X, I want to discuss a custom ${service.title} system for my company.`)}
                            target="_blank"
                            className={buttonVariants({
                              variant: "default",
                              size: "sm",
                              className: "w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-full px-5 py-2 text-xs shadow-md shrink-0 cursor-pointer",
                            })}
                          >
                            <span>Consult With Growth Engineer</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Link>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

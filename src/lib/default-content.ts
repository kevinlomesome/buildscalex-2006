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
  HomepageSectionItem
} from "./cms-types";

export const defaultHeroContent: HeroContent = {
  badgeText: "Growth Systems & Technical Architecture",
  headlineLine1: "We Build AI-Powered Client Acquisition Systems That Generate More",
  headlineGradient: "Qualified Leads.",
  headlineLine2: "",
  description: "BuildScaleX engineers custom high-performance websites, automated lead generation systems, CRM integrations, and intelligent AI agents for ambitious businesses.",
  ctaPrimaryText: "Book Strategy Consultation",
  ctaSecondaryText: "Explore Capabilities",
  trustBadges: [
    "100% Handcrafted Code",
    "Sub-Second Performance",
    "Direct Engineering Access",
    "Zero Template Lock-In"
  ],
  metrics: []
};

export const defaultServices: ServiceItem[] = [
  {
    id: "01-website-development",
    number: "01",
    title: "Website Development",
    subtitle: "High-Performance Digital Architecture",
    description: "Lightning-fast, bespoke websites engineered to establish authority and convert visitors into qualified buyers.",
    iconName: "Globe",
    active: true,
    order: 1,
    categories: [
      { id: "wd-1", title: "Business Websites", description: "Modern web foundations built to establish industry authority.", iconName: "Building2" },
      { id: "wd-2", title: "Landing Pages", description: "Hyper-focused conversion pages designed for ad traffic ROI.", iconName: "Layers" },
      { id: "wd-3", title: "Corporate Websites", description: "Enterprise-grade digital infrastructure with robust security.", iconName: "Building" },
      { id: "wd-4", title: "Restaurant Websites", description: "Interactive menus, table reservations, and location showcase.", iconName: "UtensilsCrossed" },
      { id: "wd-5", title: "Gym Websites", description: "Membership portals, class schedules, and trainer profiles.", iconName: "Dumbbell" },
      { id: "wd-6", title: "Clinic Websites", description: "Patient booking, doctor profiles, and HIPAA-compliant forms.", iconName: "Stethoscope" },
      { id: "wd-7", title: "Portfolio Websites", description: "Cinematic presentation of creative work and case studies.", iconName: "Briefcase" },
      { id: "wd-8", title: "Construction Websites", description: "Project timelines, bid requests, and contractor showcases.", iconName: "HardHat" },
      { id: "wd-9", title: "Furniture Websites", description: "High-res 3D product galleries and catalog distribution.", iconName: "Armchair" },
      { id: "wd-10", title: "Educational Websites", description: "Course catalogs, student enrollment, and lecture schedules.", iconName: "GraduationCap" },
      { id: "wd-11", title: "Ecommerce Websites", description: "Fast checkout experiences that maximize average order value.", iconName: "ShoppingBag" },
      { id: "wd-12", title: "Custom Dashboards", description: "Tailored business intelligence and real-time operational views.", iconName: "LayoutDashboard" },
      { id: "wd-13", title: "Admin Panels", description: "Granular role-based backends for streamlined operations.", iconName: "Sliders" },
      { id: "wd-14", title: "API Integration", description: "Seamless data exchange across payment gateways and ERPs.", iconName: "Cpu" },
      { id: "wd-15", title: "CMS Development", description: "Intuitive headless CMS setups that make content publishing effortless.", iconName: "FileEdit" },
      { id: "wd-16", title: "Website Maintenance", description: "Proactive security patching, uptime audits, and optimization.", iconName: "Wrench" },
      { id: "wd-17", title: "Hosting Setup", description: "Global edge CDN configuration with 99.99% uptime guarantee.", iconName: "Server" },
      { id: "wd-18", title: "Domain Configuration", description: "DNS routing, SSL encryption, and email deliverability setup.", iconName: "ShieldCheck" },
      { id: "wd-19", title: "Payment Gateway", description: "Frictionless multi-currency checkouts via Razorpay, Stripe & UPI.", iconName: "CreditCard" },
      { id: "wd-20", title: "Performance Optimization", description: "Sub-second load times engineered for perfect Core Web Vitals.", iconName: "Zap" },
      { id: "wd-21", title: "Analytics Setup", description: "Full GA4 event tracking, GTM triggers, and conversion audits.", iconName: "LineChart" },
    ]
  },
  {
    id: "02-sales-funnels",
    number: "02",
    title: "Sales Funnels",
    subtitle: "Engineered Lead Generation Pathways",
    description: "Psychology-backed funnels that systematically guide prospects from discovery to closed deal.",
    iconName: "Filter",
    active: true,
    order: 2,
    categories: [
      { id: "sf-1", title: "Landing Funnels", description: "Clean entry points engineered for paid traffic campaign conversion.", iconName: "Maximize2" },
      { id: "sf-2", title: "Lead Funnels", description: "High-value lead magnet exchanges that capture qualified contact info.", iconName: "Target" },
      { id: "sf-3", title: "Sales Funnels", description: "Multi-step purchase paths with order bumps and upsell sequences.", iconName: "TrendingUp" },
      { id: "sf-4", title: "Booking Funnels", description: "Automated qualification and discovery call booking workflows.", iconName: "Calendar" },
      { id: "sf-5", title: "Quiz Funnels", description: "Interactive assessment journeys that segment leads by intent.", iconName: "HelpCircle" },
      { id: "sf-6", title: "WhatsApp Funnels", description: "Direct conversational sales flows with instant follow-up triggers.", iconName: "MessageSquare" },
      { id: "sf-7", title: "CRM Funnels", description: "Dynamic pipeline stages synced directly to client relationship tools.", iconName: "Database" },
      { id: "sf-8", title: "Email Funnels", description: "Behavior-triggered email nurturing sequences that warm prospects.", iconName: "Mail" },
      { id: "sf-9", title: "A/B Testing", description: "Data-backed split testing of hooks, copy, layouts, and CTAs.", iconName: "Split" },
      { id: "sf-10", title: "Conversion Optimization", description: "Friction reduction audits to maximize conversion rate on every step.", iconName: "CheckCircle2" },
      { id: "sf-11", title: "Checkout Pages", description: "Zero-distraction checkout flows optimized for mobile buyers.", iconName: "ShoppingCart" },
      { id: "sf-12", title: "Analytics Tracking", description: "Granular funnel drop-off analytics and heatmap behavior tracking.", iconName: "PieChart" },
    ]
  },
  {
    id: "03-performance-marketing",
    number: "03",
    title: "Performance Marketing",
    subtitle: "High-ROI Paid Acquisition Campaigns",
    description: "Precision-targeted paid advertising that delivers predictable customer acquisition at scale.",
    iconName: "TrendingUp",
    active: true,
    order: 3,
    categories: [
      { id: "pm-1", title: "Meta Ads", description: "End-to-end campaign architecture across the Meta ecosystem.", iconName: "Megaphone" },
      { id: "pm-2", title: "Facebook Ads", description: "Audience-targeted storytelling campaigns tailored for high ROAS.", iconName: "Share2" },
      { id: "pm-3", title: "Instagram Ads", description: "Visual hook creative, Reels placement, and direct message ads.", iconName: "Camera" },
      { id: "pm-4", title: "Remarketing", description: "Omnipresent retargeting campaigns converting warm site visitors.", iconName: "RefreshCw" },
      { id: "pm-5", title: "Lead Generation", description: "High-intent form campaigns delivering direct phone and email leads.", iconName: "Users" },
      { id: "pm-6", title: "Pixel Setup", description: "Server-side Conversions API (CAPI) implementation for accurate attribution.", iconName: "Code" },
      { id: "pm-7", title: "Campaign Optimization", description: "Daily budget scaling, audience bid adjustments, and fatigue prevention.", iconName: "SlidersHorizontal" },
      { id: "pm-8", title: "Creative Testing", description: "Systematic multi-variant creative testing to find winning hooks.", iconName: "Sparkles" },
      { id: "pm-9", title: "Audience Research", description: "Deep demographic and psychographic targeting analysis.", iconName: "Search" },
      { id: "pm-10", title: "Conversion Tracking", description: "End-to-end attribution modeling across the entire customer journey.", iconName: "BarChart3" },
    ]
  },
  {
    id: "04-ai-automation",
    number: "04",
    title: "AI Automation",
    subtitle: "Intelligent Workflows & Automated Pipelines",
    description: "Automate repetitive operational tasks, qualify incoming leads 24/7, and eliminate human friction.",
    iconName: "Bot",
    active: true,
    order: 4,
    categories: [
      { id: "ai-1", title: "AI Chatbots", description: "Context-aware conversational bots trained on your company data.", iconName: "Bot" },
      { id: "ai-2", title: "AI Agents", description: "Autonomous workflow agents that execute multi-step business logic.", iconName: "Cpu" },
      { id: "ai-3", title: "CRM Automation", description: "Automated deal movement, task assignment, and lead enrichment.", iconName: "Database" },
      { id: "ai-4", title: "WhatsApp Automation", description: "Instant automated WhatsApp qualification and follow-up sequences.", iconName: "MessageCircle" },
      { id: "ai-5", title: "Appointment Automation", description: "Smart scheduling triggers eliminating back-and-forth emails.", iconName: "Clock" },
      { id: "ai-6", title: "Lead Qualification", description: "Automated scoring of incoming leads based on budget and urgency.", iconName: "ShieldCheck" },
      { id: "ai-7", title: "Workflow Automation", description: "Seamless multi-app integrations connecting your entire tech stack.", iconName: "GitMerge" },
      { id: "ai-8", title: "OpenAI Integration", description: "Custom GPT-4 API implementations tailored to your workflow.", iconName: "Brain" },
      { id: "ai-9", title: "API Automation", description: "Custom webhook and endpoint integrations syncing real-time data.", iconName: "Radio" },
      { id: "ai-10", title: "Business Automation", description: "End-to-end elimination of manual data entry and invoice tasks.", iconName: "Briefcase" },
      { id: "ai-11", title: "Custom AI Solutions", description: "Bespoke machine learning architectures for unique business needs.", iconName: "Sparkles" },
    ]
  },
  {
    id: "05-crm-integration",
    number: "05",
    title: "CRM Integration",
    subtitle: "Unified Pipeline & Customer Data",
    description: "Connect your marketing channels, lead flows, and sales pipelines into a single source of truth.",
    iconName: "Database",
    active: true,
    order: 5,
    categories: [
      { id: "crm-1", title: "HubSpot", description: "Custom HubSpot setup, deal stage pipelines, and tracking.", iconName: "Layers" },
      { id: "crm-2", title: "GoHighLevel", description: "Full GHL sub-account provisioning, snapshot setup, and workflows.", iconName: "Box" },
      { id: "crm-3", title: "Zoho", description: "Zoho CRM customization, blueprint workflows, and reporting.", iconName: "Briefcase" },
      { id: "crm-4", title: "Pipedrive", description: "Activity-based sales pipelines configured for closing velocity.", iconName: "Trello" },
      { id: "crm-5", title: "Custom CRM", description: "Proprietary database solutions tailored to complex business models.", iconName: "Sliders" },
      { id: "crm-6", title: "Lead Tracking", description: "Real-time visibility into lead source, behavior, and status.", iconName: "Eye" },
      { id: "crm-7", title: "Automation", description: "Automated handoffs between marketing channels and sales reps.", iconName: "Zap" },
      { id: "crm-8", title: "Pipeline Setup", description: "Defined buyer stages that maintain visibility across all deals.", iconName: "Kanban" },
      { id: "crm-9", title: "Reporting", description: "Executive revenue dashboards showcasing team performance.", iconName: "FileSpreadsheet" },
    ]
  },
  {
    id: "06-seo-growth",
    number: "06",
    title: "SEO & Growth",
    subtitle: "Organic Authority & Search Dominance",
    description: "Strategic search engine optimization that positions your brand at the top of high-intent search queries.",
    iconName: "LineChart",
    active: true,
    order: 6,
    categories: [
      { id: "seo-1", title: "Technical SEO", description: "Crawlability, semantic HTML, schema markup, and speed audits.", iconName: "Code2" },
      { id: "seo-2", title: "On-page SEO", description: "Metadata optimization, keyword placement, and internal linking.", iconName: "FileText" },
      { id: "seo-3", title: "Local SEO", description: "Dominating local search rankings and 'near me' customer queries.", iconName: "MapPin" },
      { id: "seo-4", title: "Google Business Profile", description: "Full GBP optimization, review frameworks, and local map pack ranking.", iconName: "Store" },
      { id: "seo-5", title: "Keyword Research", description: "Uncovering high-intent commercial keywords competitors missed.", iconName: "Search" },
      { id: "seo-6", title: "Performance Optimization", description: "Core Web Vitals tuning to guarantee maximum Google ranking credit.", iconName: "Gauge" },
      { id: "seo-7", title: "Website Audit", description: "Comprehensive structural analysis identifying revenue leakage.", iconName: "ClipboardCheck" },
      { id: "seo-8", title: "Monthly Reports", description: "Clear ranking, traffic, and organic conversion progress summaries.", iconName: "BarChart" },
    ]
  },
  {
    id: "07-branding",
    number: "07",
    title: "Branding",
    subtitle: "Premium Identity & Visual Positioning",
    description: "Craft a distinct visual identity that communicates luxury, technical competence, and trustworthiness.",
    iconName: "Palette",
    active: true,
    order: 7,
    categories: [
      { id: "br-1", title: "Logo Design", description: "Bespoke, timeless logo emblems engineered for digital scale.", iconName: "Feather" },
      { id: "br-2", title: "Visual Identity", description: "Comprehensive color systems, typography pairings, and design motifs.", iconName: "Eye" },
      { id: "br-3", title: "Brand Guidelines", description: "Exhaustive brand manuals ensuring consistent brand expression.", iconName: "BookOpen" },
      { id: "br-4", title: "UI Design", description: "Handcrafted user interfaces inspired by Linear, Stripe, and Vercel.", iconName: "Layout" },
      { id: "br-5", title: "UX Design", description: "Intuitive interaction design that eliminates friction and drop-offs.", iconName: "MousePointerClick" },
      { id: "br-6", title: "Creative Assets", description: "High-resolution graphic assets tailored for marketing campaigns.", iconName: "Image" },
      { id: "br-7", title: "Social Media Branding", description: "Cohesive social banners, profile kits, and post templates.", iconName: "Share" },
    ]
  }
];

export const defaultIndustries: IndustryItem[] = [
  { id: "ind-1", name: "Restaurants", iconName: "Utensils", active: true, order: 1 },
  { id: "ind-2", name: "Real Estate", iconName: "Building2", active: true, order: 2 },
  { id: "ind-3", name: "Doctors", iconName: "Stethoscope", active: true, order: 3 },
  { id: "ind-4", name: "Construction", iconName: "HardHat", active: true, order: 4 },
  { id: "ind-5", name: "Furniture", iconName: "Sofa", active: true, order: 5 },
  { id: "ind-6", name: "Healthcare", iconName: "Activity", active: true, order: 6 },
  { id: "ind-7", name: "Education", iconName: "GraduationCap", active: true, order: 7 },
  { id: "ind-8", name: "Gyms", iconName: "Dumbbell", active: true, order: 8 },
  { id: "ind-9", name: "CA Firms", iconName: "Calculator", active: true, order: 9 },
  { id: "ind-10", name: "Professional Services", iconName: "Briefcase", active: true, order: 10 }
];

export const defaultProcessSteps: ProcessStep[] = [
  { id: "ps-1", num: "01", title: "Discovery", desc: "Understanding your business goals, target audience, and current digital bottlenecks.", order: 1, active: true },
  { id: "ps-2", num: "02", title: "Research", desc: "Deep market research, competitor landscape analysis, and conversion vector planning.", order: 2, active: true },
  { id: "ps-3", num: "03", title: "Strategy", desc: "Crafting a bespoke architectural blueprint for maximum lead capture and conversion.", order: 3, active: true },
  { id: "ps-4", num: "04", title: "UI/UX", desc: "Handcrafting clean, minimal, luxury interfaces without AI-generated fluff.", order: 4, active: true },
  { id: "ps-5", num: "05", title: "Development", desc: "Writing clean, type-safe Next.js code optimized for sub-second page performance.", order: 5, active: true },
  { id: "ps-6", num: "06", title: "Testing", desc: "Rigorous responsive QA, cross-browser validation, and lead workflow checks.", order: 6, active: true },
  { id: "ps-7", num: "07", title: "Launch", desc: "Zero-downtime deployment to production edge network with live monitoring.", order: 7, active: true },
  { id: "ps-8", num: "08", title: "Optimization", desc: "Continuous performance audits, conversion tracking, and scaling support.", order: 8, active: true }
];

export const defaultFaqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "Why should we choose Build Scale X over a traditional agency?",
    answer: "Unlike traditional agencies that rely on slow bloated WordPress templates, Build Scale X engineers handcrafted software systems using Next.js, modern design, and integrated AI automation. We focus obsessively on pipeline generation and revenue compounding.",
    category: "General",
    order: 1,
    active: true
  },
  {
    id: "faq-2",
    question: "How long does it take to build a complete growth system?",
    answer: "Our streamlined architecture allows us to deliver high-quality, production-ready systems in 2 to 4 weeks depending on the complexity of your custom requirements.",
    category: "Timeline",
    order: 2,
    active: true
  },
  {
    id: "faq-3",
    question: "Do you use templates or custom code?",
    answer: "Everything we build is 100% custom-coded. We do not use generic WordPress themes or bloated visual page builders. Your platform is built to perform, scale, and rank.",
    category: "Technology",
    order: 3,
    active: true
  },
  {
    id: "faq-4",
    question: "Can you automate our WhatsApp and lead qualification?",
    answer: "Yes! We specialize in connecting WhatsApp API, intelligent qualification logic, and CRM synchronization so incoming leads receive instant engagement within 60 seconds.",
    category: "Automation",
    order: 4,
    active: true
  },
  {
    id: "faq-5",
    question: "Will our website be optimized for mobile and SEO?",
    answer: "Every single page is designed mobile-first and tuned for Core Web Vitals, achieving near-perfect Lighthouse scores and semantic search engine indexing.",
    category: "SEO",
    order: 5,
    active: true
  }
];

export const defaultContactSettings: ContactSettings = {
  heading: "Let's",
  highlightText: "Talk.",
  description: "Got a project in mind? We'd love to hear about it. Send us a message and we'll respond within 24 hours.",
  email: "buildscalex@gmail.com",
  phone: "+91 79903 59221",
  whatsappNumber: "917990359221",
  location: "Remote {Gujarat, India}",
  averageResponseTime: "< 15 minutes",
  fields: [
    { id: "f-name", name: "fullName", label: "Full Name", type: "text", placeholder: "Rahul Sharma", required: true, order: 1, active: true },
    { id: "f-email", name: "email", label: "Email Address", type: "email", placeholder: "rahul@startup.in", required: true, order: 2, active: true },
    { id: "f-phone", name: "phone", label: "Phone (Optional)", type: "phone", placeholder: "+91 98765 43210", required: false, order: 3, active: true },
    { id: "f-company", name: "company", label: "Company / Brand", type: "text", placeholder: "TechIndia Pvt Ltd", required: false, order: 4, active: true },
    { 
      id: "f-services", 
      name: "services", 
      label: "Services Required", 
      type: "pills", 
      required: true, 
      options: [
        "Website Development",
        "Sales Funnels",
        "Performance Marketing (Meta Ads)",
        "AI & WhatsApp Automation",
        "CRM & Lead Management",
        "SEO & Organic Ranking",
        "UI/UX & Branding",
        "Full Growth System",
        "Other"
      ], 
      order: 5, 
      active: true 
    },
    { 
      id: "f-budget", 
      name: "budget", 
      label: "Estimated Budget (INR)", 
      type: "pills", 
      required: true, 
      options: [
        "₹25,000 - ₹50,000",
        "₹50,000 - ₹1,00,000",
        "₹1,00,000 - ₹2,50,000",
        "₹2,50,000+"
      ], 
      order: 6, 
      active: true 
    },
    { 
      id: "f-timeline", 
      name: "timeline", 
      label: "Expected Timeline", 
      type: "pills", 
      required: true, 
      options: [
        "Immediate (< 2 Weeks)",
        "2 - 4 Weeks",
        "1 - 2 Months",
        "Flexible"
      ], 
      order: 7, 
      active: true 
    },
    { id: "f-desc", name: "description", label: "Project Details", type: "textarea", placeholder: "Tell us about your goals, current challenges, and project vision...", required: true, order: 8, active: true }
  ]
};

export const defaultWebsiteSettings: WebsiteSettings = {
  businessName: "Build Scale X",
  tagline: "BUILD. SCALE. DOMINATE.",
  logoUrl: "/logo-emblem.png",
  phone: "+91 79903 59221",
  whatsappNumber: "917990359221",
  email: "buildscalex@gmail.com",
  addressLines: [
    "C/56, Shivanand Bungalows,",
    "Near M.B. Patel Farm House,",
    "Behind Pushkar Hills,",
    "Jashoda Nagar,",
    "Ahmedabad, Gujarat, India."
  ],
  copyrightText: "© 2026 Build Scale X. All rights reserved.",
  primaryColor: "#2563EB",
  socialLinks: {
    linkedin: "https://linkedin.com/company/buildscalex",
    instagram: "https://instagram.com/buildscalex",
    facebook: "https://facebook.com/buildscalex",
  },
};

export const defaultSeoSettings: SeoSettings = {
  metaTitle: "Build Scale X | Growth Systems Agency",
  metaDescription: "Helping businesses build powerful digital systems that generate more leads, increase conversions, automate operations, and scale revenue.",
  keywords: "web development, sales funnels, AI automation, meta ads, growth agency, custom software, CRM integration",
  ogImage: "/logo-emblem.png",
  googleAnalyticsId: "",
  facebookPixelId: "",
  canonicalUrl: "https://buildscalex.com"
};

export const defaultAboutContent: AboutContent = {
  headline: "About Build Scale X",
  subheadline:
    "We are a premium growth systems agency dedicated to helping ambitious businesses scale through intelligent automation, modern design, and conversion-optimized architecture.",
  mission:
    "To eliminate slow, bloated digital systems and engineer high-performance growth infrastructure that turns traffic into predictable revenue.",
  vision:
    "To become the gold standard in growth systems engineering for high-growth enterprises worldwide.",
  traditionalFlaws: [
    "Slow delivery times (months)",
    "Generic templates",
    "No focus on conversions",
    "Hidden fees",
    "Outdated technology",
    "Poor communication",
    "No automation integrated",
  ],
  bsxAdvantages: [
    "Fast Delivery",
    "Premium Custom Design",
    "Revenue Driven & Growth Focused",
    "Transparent Pricing",
    "Modern Technology Stack",
    "Dedicated Support",
    "AI Powered Automation",
    "Long-term Partnership",
  ],
  teamMembers: [
    {
      id: "team-1",
      name: "Core Systems Team",
      role: "Architecture & Growth Engineering",
      bio: "Engineers specialized in Next.js, Firebase, React 19, high-ticket funnels, and enterprise automation."
    }
  ]
};

export const defaultTestimonials: TestimonialItem[] = [];

export const defaultProjects: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Enterprise Client Acquisition Platform",
    client: "B2B Logistics & Advisory Practice",
    category: "Web Development & Funnels",
    servicesUsed: ["Website Development", "Lead Generation Systems", "CRM Integration"],
    description: "Sub-second Next.js edge platform with automated specification calculation and real-time CRM deal routing.",
    active: true,
  },
  {
    id: "proj-2",
    title: "Autonomous Patient Triage & Booking Engine",
    client: "Specialized Clinical Group",
    category: "AI & WhatsApp Automation",
    servicesUsed: ["AI Agents", "AI Automation", "CRM Integration"],
    description: "24/7 conversational AI triage system qualifying inquiries and dispatching calendar slots with zero staff latency.",
    active: true,
  },
  {
    id: "proj-3",
    title: "High-Performance Commerce & Retention Engine",
    client: "Direct-to-Consumer Brand",
    category: "Growth Systems",
    servicesUsed: ["Website Development", "Performance Marketing", "Business Process Automation"],
    description: "Bespoke digital catalog architecture coupled with server-side Meta CAPI tracking and automated dispatch workflows.",
    active: true,
  }
];

export const defaultBlogs: BlogPost[] = [
  {
    id: "blog-1",
    title: "How We Scaled B2B Pipeline by 300% Using Custom Next.js Funnels",
    slug: "scale-b2b-pipeline-custom-funnels",
    excerpt: "Why WordPress templates kill conversions and how custom edge-rendered architecture turns traffic into revenue.",
    content: "Full architectural breakdown of modern revenue systems...",
    category: "Growth Systems",
    tags: ["Funnels", "Conversion Rate", "Next.js"],
    published: true,
    createdAt: "2026-03-20",
    author: "Build Scale X Team",
  },
  {
    id: "blog-2",
    title: "The 60-Second WhatsApp Rule for High-Ticket Lead Closing",
    slug: "60-second-whatsapp-lead-closing",
    excerpt: "Every minute a lead waits decreases closing probability by 10%. Here's how to automate qualification without feeling robotic.",
    content: "Guide to automating WhatsApp responses and CRM intake...",
    category: "Automation",
    tags: ["WhatsApp", "Automation", "CRM"],
    published: true,
    createdAt: "2026-03-22",
    author: "Build Scale X Team",
  }
];

export const defaultHomepageSections: HomepageSectionItem[] = [
  { id: "hero", name: "Hero Section", enabled: true, order: 1 },
  { id: "services", name: "Technical Capabilities & Solutions", enabled: true, order: 2 },
  { id: "why-us", name: "Methodology & Standards", enabled: true, order: 3 },
  { id: "process", name: "Structured Execution Roadmap", enabled: true, order: 4 },
  { id: "industries", name: "Domain-Specific Architectures", enabled: true, order: 5 },
  { id: "ai-automation", name: "AI & WhatsApp Infrastructure", enabled: true, order: 6 },
  { id: "results", name: "Verified Case Studies & Standards", enabled: true, order: 7 },
  { id: "testimonials", name: "Verified Client Endorsements", enabled: true, order: 8 },
  { id: "faq", name: "Frequently Asked Questions", enabled: true, order: 9 },
  { id: "cta", name: "Strategy Consultation & Intake", enabled: true, order: 10 },
];


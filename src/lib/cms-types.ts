export type UserRole = "super_admin" | "admin" | "editor" | "viewer";

export interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
  active: boolean;
}

export interface HeroContent {
  badgeText: string;
  headlineLine1: string;
  headlineGradient: string;
  headlineLine2: string;
  description: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  trustBadges: string[];
  metrics: {
    label: string;
    value: string;
    subtext: string;
  }[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  active?: boolean;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  active: boolean;
  order: number;
  categories: ServiceCategory[];
}

export interface IndustryItem {
  id: string;
  name: string;
  iconName: string;
  active: boolean;
  order: number;
}

export interface ProcessStep {
  id: string;
  num: string;
  title: string;
  desc: string;
  order: number;
  active: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  active: boolean;
}

export type FormFieldType = 
  | "text" 
  | "email" 
  | "phone" 
  | "tel"
  | "textarea" 
  | "pills" 
  | "pill_multi_select"
  | "pill_single_select"
  | "dropdown" 
  | "select"
  | "radio" 
  | "checkbox" 
  | "number";

export interface FormFieldConfig {
  id: string;
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required: boolean;
  options?: string[]; // for pills, dropdown, radio
  order: number;
  active: boolean;
}

export interface ContactSettings {
  heading: string;
  highlightText: string;
  description: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  location: string;
  averageResponseTime: string;
  fields: FormFieldConfig[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatarUrl?: string;
  active: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  servicesUsed: string[];
  description: string;
  link?: string;
  imageUrl?: string;
  active: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage?: string;
  published: boolean;
  createdAt: string;
  author: string;
}

export type LeadStatus = 
  | "new" 
  | "contacted" 
  | "qualified" 
  | "proposal_sent" 
  | "won" 
  | "lost" 
  | "spam";

export interface LeadRecord {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  services?: string[];
  budget?: string;
  timeline?: string;
  description?: string;
  source: string; // 'contact_form' | 'whatsapp_click' | 'header_cta'
  status: LeadStatus;
  notes?: string;
  assignedTo?: string;
  ipAddress?: string;
  browser?: string;
  device?: string;
  createdAt: string;
  timestamp?: number;
}

export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  googleAnalyticsId: string;
  facebookPixelId: string;
  canonicalUrl: string;
}

export interface WebsiteSettings {
  businessName: string;
  tagline: string;
  logoUrl: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  addressLines: string[];
  copyrightText: string;
  primaryColor: string;
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    github?: string;
  };
}

export type PageSectionType = 
  | "hero" 
  | "features" 
  | "services" 
  | "faq" 
  | "cta" 
  | "rich_text" 
  | "testimonials" 
  | "contact_form"
  | "gallery"
  | "pricing"
  | "timeline"
  | "stats"
  | "image"
  | "video"
  | "custom_html";

export interface PageSection {
  id: string;
  type: PageSectionType;
  title?: string;
  subtitle?: string;
  badge?: string;
  content?: string;
  buttonText?: string;
  buttonLink?: string;
  mediaUrl?: string;
  htmlContent?: string;
  active: boolean;
  order: number;
  items?: {
    id: string;
    title: string;
    description: string;
    iconName?: string;
    value?: string;
    label?: string;
    price?: string;
    period?: string;
    features?: string[];
  }[];
}

export interface AboutContent {
  headline: string;
  subheadline: string;
  mission: string;
  vision: string;
  traditionalFlaws: string[];
  bsxAdvantages: string[];
  teamMembers?: {
    id: string;
    name: string;
    role: string;
    bio: string;
  }[];
}

export interface PageItem {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  published: boolean;
  sections: PageSection[];
  createdAt: string;
  updatedAt: string;
  showInNavbar?: boolean;
  showInFooter?: boolean;
  navigationPosition?: "header" | "footer" | "both" | "none";
  order?: number;
  category?: string;
  author?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  featuredImage?: string;
  passwordProtected?: boolean;
  password?: string;
  parentPageId?: string;
  archived?: boolean;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: "lead" | "contact" | "login_failed" | "content_updated" | "backup";
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface ActivityLog {
  id: string;
  userEmail: string;
  userName: string;
  action: string;
  target: string;
  collectionName?: string;
  docId?: string;
  previousValue?: any;
  newValue?: any;
  browser?: string;
  device?: string;
  ipAddress?: string;
  timestamp: string;
}

export interface ContentVersion {
  id: string;
  collectionName: string;
  docId: string;
  data: any;
  authorEmail: string;
  authorName: string;
  versionNumber: number;
  timestamp: string;
  changeSummary?: string;
}

export interface HomepageSectionItem {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
}



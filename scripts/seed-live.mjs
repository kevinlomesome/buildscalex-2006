// scripts/seed-live.mjs
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBU_ni49rsCgpqQxbpXOT7mmC7xSNR6N74",
  authDomain: "buildscalex-cd101.firebaseapp.com",
  projectId: "buildscalex-cd101",
  storageBucket: "buildscalex-cd101.firebasestorage.app",
  messagingSenderId: "223278299574",
  appId: "1:223278299574:web:99e746b13fe4402de1e917",
  measurementId: "G-1S8ZFK9N0N"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const defaultAboutContent = {
  headline: "About Build Scale X",
  subheadline: "We are a premium growth systems agency dedicated to helping ambitious businesses scale through intelligent automation, modern design, and conversion-optimized architecture.",
  mission: "To eliminate slow, bloated digital systems and engineer high-performance growth infrastructure that turns traffic into predictable revenue.",
  vision: "To become the gold standard in growth systems engineering for high-growth enterprises worldwide.",
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

const defaultTestimonials = [
  {
    id: "test-1",
    name: "Vikram Malhotra",
    company: "Apex Logistics & Supply",
    role: "Managing Director",
    content: "Build Scale X completely restructured our client acquisition. Their custom landing system and automated WhatsApp qualification boosted our qualified pipeline by 320% in the first 45 days. Worth every single rupee.",
    rating: 5,
    active: true,
  },
  {
    id: "test-2",
    name: "Dr. Ananya Roy",
    company: "Roy Aesthetic & Dental Clinics",
    role: "Founder & Chief Surgeon",
    content: "Before BSX, our clinic was losing leads due to slow WhatsApp replies. Now, inquiries receive automated triage within 30 seconds and book appointments directly on our doctors' calendars. Exceptional engineering.",
    rating: 5,
    active: true,
  },
  {
    id: "test-3",
    name: "Rohan Patel",
    company: "UrbanNest Interiors & Furniture",
    role: "Co-Founder",
    content: "Unlike previous agencies who gave us slow WordPress templates, Build Scale X built a custom Next.js catalogue with Meta ads funnel. Our cost per closed client dropped by 48%. Truly world-class team.",
    rating: 5,
    active: true,
  },
];

const defaultProjects = [
  {
    id: "proj-1",
    title: "Apex Logistics Enterprise Platform",
    client: "Apex Global",
    category: "Web Development & Funnels",
    servicesUsed: ["Website Development", "Sales Funnels", "WhatsApp Automation"],
    description: "Custom digital platform with real-time quote generation and CRM pipeline routing.",
    active: true,
  },
  {
    id: "proj-2",
    title: "MediFit Appointment Booking & Triage",
    client: "MediFit Clinics",
    category: "AI & WhatsApp Automation",
    servicesUsed: ["AI & WhatsApp Automation", "CRM & Lead Management"],
    description: "Automated patient triage and appointment management system with zero staff overhead.",
    active: true,
  },
  {
    id: "proj-3",
    title: "UrbanNest Architectural Showcase",
    client: "UrbanNest Furnishings",
    category: "Full Growth System",
    servicesUsed: ["Website Development", "Performance Marketing (Meta Ads)", "Branding"],
    description: "High-ticket luxury furniture acquisition engine with sub-second catalog speeds.",
    active: true,
  }
];

const defaultBlogs = [
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

async function seed() {
  console.log("Seeding about, testimonials, projects, and blogs into Firestore...");
  await setDoc(doc(db, "about", "content"), defaultAboutContent);
  console.log("✔ Seeded about/content");
  await setDoc(doc(db, "testimonials", "list"), { items: defaultTestimonials });
  console.log("✔ Seeded testimonials/list");
  await setDoc(doc(db, "projects", "list"), { items: defaultProjects });
  console.log("✔ Seeded projects/list");
  await setDoc(doc(db, "blogs", "list"), { items: defaultBlogs });
  console.log("✔ Seeded blogs/list");
  console.log("All missing collections successfully seeded into buildscalex-cd101!");
  process.exit(0);
}

seed();

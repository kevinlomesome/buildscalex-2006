import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  addDoc,
  getDocs
} from "firebase/firestore";
import { db, isFirestoreReady } from "./config";
import {
  LeadRecord,
  AdminNotification,
  PageItem,
  ActivityLog,
  ContentVersion
} from "../cms-types";
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
} from "../default-content";

// Helper for local mock storage when Firebase is not configured or in local demo
const LOCAL_STORAGE_PREFIX = "bsx_cms_";

const getLocalData = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setLocalData = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch (e) {}
};

// ==========================================
// 1. LEAD MANAGEMENT & CRM SERVICES
// ==========================================

export async function submitContactLead(leadData: Omit<LeadRecord, "id" | "createdAt" | "status">): Promise<string> {
  const newLead: LeadRecord = {
    ...leadData,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    status: "new",
    createdAt: new Date().toISOString(),
    timestamp: Date.now(),
  };

  if (isFirestoreReady()) {
    try {
      const docRef = await addDoc(collection(db, "leads"), {
        ...newLead,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.warn("Firestore lead submission fallback:", error);
    }
  }

  // Local fallback persistence
  const existingLeads = getLocalData<LeadRecord[]>("leads", []);
  const updatedLeads = [newLead, ...existingLeads];
  setLocalData("leads", updatedLeads);

  // Dispatch storage event so admin listens in real-time
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("bsx_leads_updated"));
  }

  // Create real-time admin notification
  addNotification({
    title: "New Inbound Lead",
    message: `${newLead.fullName || "New prospect"} submitted an inquiry${newLead.services?.length ? ` for ${newLead.services.join(", ")}` : ""}.`,
    type: "lead",
    link: "/admin/leads",
  });

  return newLead.id;
}

export async function trackWhatsAppLead(source: string = "direct_click"): Promise<void> {
  await submitContactLead({
    fullName: "WhatsApp Prospect",
    email: "whatsapp.inquiry@buildscalex.com",
    source: `whatsapp_${source}`,
    description: "User initiated conversation via WhatsApp click button.",
  });
}

export function subscribeToLeads(callback: (leads: LeadRecord[]) => void): () => void {
  if (isFirestoreReady()) {
    try {
      const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
      return onSnapshot(q, (snapshot) => {
        const leads: LeadRecord[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<LeadRecord, "id">),
          createdAt: docSnap.data().createdAt?.toDate ? docSnap.data().createdAt.toDate().toISOString() : new Date().toISOString(),
        }));
        setLocalData("leads", leads);
        callback(leads);
      }, (err) => {
        console.warn("Firestore snapshot error, falling back to local storage:", err);
        callback(getLocalData<LeadRecord[]>("leads", []));
      });
    } catch (e) {
      console.warn("Firestore leads subscribe error:", e);
    }
  }

  // Fallback local subscription
  const updateFromLocal = () => {
    callback(getLocalData<LeadRecord[]>("leads", []));
  };

  updateFromLocal();
  if (typeof window !== "undefined") {
    window.addEventListener("bsx_leads_updated", updateFromLocal);
    window.addEventListener("storage", updateFromLocal);
    return () => {
      window.removeEventListener("bsx_leads_updated", updateFromLocal);
      window.removeEventListener("storage", updateFromLocal);
    };
  }

  return () => {};
}

export async function updateLeadStatus(leadId: string, status: LeadRecord["status"], notes?: string): Promise<void> {
  if (isFirestoreReady()) {
    try {
      const leadRef = doc(db, "leads", leadId);
      await updateDoc(leadRef, {
        status,
        ...(notes !== undefined ? { notes } : {}),
      });
    } catch (e) {
      console.warn("Firestore update lead error:", e);
    }
  }

  const existingLeads = getLocalData<LeadRecord[]>("leads", []);
  const updated = existingLeads.map((l) => (l.id === leadId ? { ...l, status, ...(notes ? { notes } : {}) } : l));
  setLocalData("leads", updated);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("bsx_leads_updated"));
  }
}

export async function deleteLead(leadId: string): Promise<void> {
  if (isFirestoreReady()) {
    try {
      await deleteDoc(doc(db, "leads", leadId));
    } catch (e) {
      console.warn("Firestore delete lead error:", e);
    }
  }

  const existingLeads = getLocalData<LeadRecord[]>("leads", []);
  const updated = existingLeads.filter((l) => l.id !== leadId);
  setLocalData("leads", updated);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("bsx_leads_updated"));
  }
}

// ==========================================
// 2. CMS CONTENT READ & WRITE SERVICES
// ==========================================

export function subscribeToDoc<T>(collectionName: string, docId: string, fallback: T, callback: (data: T) => void): () => void {
  if (isFirestoreReady()) {
    try {
      const docRef = doc(db, collectionName, docId);
      return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const cloudData = docSnap.data() as T;
          setLocalData(`${collectionName}_${docId}`, cloudData);
          callback(cloudData);
        } else {
          callback(getLocalData<T>(`${collectionName}_${docId}`, fallback));
        }
      }, (err) => {
        console.warn(`Firestore subscribe error for ${collectionName}/${docId}:`, err);
        callback(getLocalData<T>(`${collectionName}_${docId}`, fallback));
      });
    } catch (e) {
      console.warn(`Firestore subscribe error:`, e);
    }
  }

  const update = () => {
    callback(getLocalData<T>(`${collectionName}_${docId}`, fallback));
  };
  update();

  if (typeof window !== "undefined") {
    const handler = () => update();
    window.addEventListener(`bsx_cms_${collectionName}_${docId}_updated`, handler);
    return () => window.removeEventListener(`bsx_cms_${collectionName}_${docId}_updated`, handler);
  }

  return () => {};
}

export async function getDocData<T>(collectionName: string, docId: string, fallback: T): Promise<T> {
  if (isFirestoreReady()) {
    try {
      const docRef = doc(db, collectionName, docId);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return snapshot.data() as T;
      }
    } catch (e) {
      console.warn(`Firestore get error on ${collectionName}/${docId}:`, e);
    }
  }
  return getLocalData<T>(`${collectionName}_${docId}`, fallback);
}

export async function saveDocData<T>(
  collectionName: string, 
  docId: string, 
  data: T,
  authorEmail: string = "admin@buildscalex.com",
  changeSummary?: string
): Promise<void> {
  const prev = getLocalData<any>(`${collectionName}_${docId}`, null);

  if (isFirestoreReady()) {
    try {
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, data as any);
    } catch (e) {
      console.warn(`Firestore save error on ${collectionName}/${docId}:`, e);
    }
  }

  // Always update local cache for instant UI feedback
  setLocalData(`${collectionName}_${docId}`, data);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(`bsx_cms_${collectionName}_${docId}_updated`));
    window.dispatchEvent(new Event("bsx_cms_global_update"));
  }

  // Auto-log audit record with client metadata
  try {
    const isBrowser = typeof window !== "undefined";
    const userAgent = isBrowser ? navigator.userAgent : "Server Node.js";
    const isMobile = isBrowser ? /Mobi|Android/i.test(userAgent) : false;
    const isTablet = isBrowser ? /Tablet|iPad/i.test(userAgent) : false;
    const device = isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop";
    const browser = isBrowser 
      ? userAgent.includes("Chrome") ? "Chrome" : userAgent.includes("Safari") ? "Safari" : userAgent.includes("Firefox") ? "Firefox" : "Browser"
      : "Server";

    await logActivity({
      action: `Saved ${collectionName.charAt(0).toUpperCase() + collectionName.slice(1)}`,
      target: `${collectionName}/${docId}`,
      collectionName,
      docId,
      userEmail: authorEmail,
      userName: authorEmail.split("@")[0],
      browser,
      device,
      previousValue: prev ? (typeof prev === "object" ? Object.keys(prev) : prev) : null,
      newValue: data ? (typeof data === "object" ? Object.keys(data) : data) : null,
    });

    // Auto-save version history snapshot when content meaningfully changes
    if (prev && JSON.stringify(prev) !== JSON.stringify(data)) {
      await saveContentVersion({
        collectionName,
        docId,
        data: prev,
        authorEmail,
        authorName: authorEmail.split("@")[0],
        versionNumber: Date.now(),
        changeSummary: changeSummary || `Snapshot before updating ${collectionName}/${docId}`,
      });
    }
  } catch (err) {
    // Non-blocking
  }
}

// ==========================================
// 3. 1-CLICK DATABASE SEEDING
// ==========================================

export async function seedDefaultDatabase(): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Homepage
    await saveDocData("homepage", "hero", defaultHeroContent);

    // 2. Services
    await saveDocData("services", "list", { items: defaultServices });

    // 3. Industries
    await saveDocData("industries", "list", { items: defaultIndustries });

    // 4. Process
    await saveDocData("process", "list", { items: defaultProcessSteps });

    // 5. FAQ
    await saveDocData("faq", "list", { items: defaultFaqs });

    // 6. Contact & Dynamic Form Builder
    await saveDocData("contact", "config", defaultContactSettings);

    // 7. Settings
    await saveDocData("settings", "general", defaultWebsiteSettings);

    // 8. SEO
    await saveDocData("seo", "global", defaultSeoSettings);

    // 9. About Page Content
    await saveDocData("about", "content", defaultAboutContent);

    // 10. Testimonials
    await saveDocData("testimonials", "list", { items: defaultTestimonials });

    // 11. Projects
    await saveDocData("projects", "list", { items: defaultProjects });

    // 12. Blogs
    await saveDocData("blogs", "list", { items: defaultBlogs });

    // 13. Initial Sample Leads if empty
    const currentLeads = getLocalData<LeadRecord[]>("leads", []);
    if (currentLeads.length === 0) {
      const initialLeads: LeadRecord[] = [
        {
          id: "lead_sample_1",
          fullName: "Aarav Mehta",
          email: "aarav@zenithscale.in",
          phone: "+91 98250 12345",
          company: "Zenith Real Estate",
          services: ["Website Development", "Sales Funnels"],
          budget: "₹1,00,000 - ₹2,50,000",
          timeline: "2 - 4 Weeks",
          description: "Need an enterprise property portal with virtual tour bookings and WhatsApp lead capture.",
          source: "contact_form",
          status: "qualified",
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          timestamp: Date.now() - 3600000 * 4
        },
        {
          id: "lead_sample_2",
          fullName: "Priya Sharma",
          email: "priya@medifithealth.com",
          phone: "+91 99090 98765",
          company: "MediFit Clinics",
          services: ["AI & WhatsApp Automation", "CRM & Lead Management"],
          budget: "₹50,000 - ₹1,00,000",
          timeline: "Immediate (< 2 Weeks)",
          description: "Looking to automate patient appointment bookings and follow-up reminders via WhatsApp.",
          source: "contact_form",
          status: "new",
          createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
          timestamp: Date.now() - 3600000 * 12
        },
        {
          id: "lead_sample_3",
          fullName: "Vikram Singhania",
          email: "vikram@craftwood.in",
          phone: "+91 97240 54321",
          company: "Craftwood Furnishings",
          services: ["Performance Marketing (Meta Ads)", "Sales Funnels"],
          budget: "₹2,50,000+",
          timeline: "1 - 2 Months",
          description: "Scaling luxury architectural furniture sales nationally via Meta Ads funnel.",
          source: "whatsapp_click",
          status: "contacted",
          createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
          timestamp: Date.now() - 3600000 * 28
        }
      ];
      setLocalData("leads", initialLeads);
    }

    return {
      success: true,
      message: "Database seeded successfully with all 7 services, 88 categories, industries, and system settings!"
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to seed database"
    };
  }
}

// ==========================================
// 4. NOTIFICATION CENTER SERVICES
// ==========================================

const DEFAULT_NOTIFICATIONS: AdminNotification[] = [
  {
    id: "notif-1",
    title: "New Inbound Lead",
    message: "Aarav Mehta submitted a project brief for Website Development.",
    type: "lead",
    read: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    link: "/admin/leads",
  },
  {
    id: "notif-2",
    title: "WhatsApp Triage Lead",
    message: "Vikram Singhania clicked to chat via WhatsApp ad campaign.",
    type: "contact",
    read: false,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    link: "/admin/leads?source=whatsapp",
  },
  {
    id: "notif-3",
    title: "Content Updated",
    message: "Services CMS categories were updated and saved.",
    type: "content_updated",
    read: true,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    link: "/admin/cms/services",
  },
  {
    id: "notif-4",
    title: "Cloud Backup Complete",
    message: "Firestore automated state sync completed successfully.",
    type: "backup",
    read: true,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    link: "/admin/settings",
  }
];

export function subscribeToNotifications(callback: (notifications: AdminNotification[]) => void): () => void {
  if (isFirestoreReady()) {
    try {
      const q = query(collection(db, "notifications"), orderBy("createdAt", "desc"), limit(20));
      return onSnapshot(q, (snapshot) => {
        const notifs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as AdminNotification));
        callback(notifs.length > 0 ? notifs : getLocalData<AdminNotification[]>("notifications", DEFAULT_NOTIFICATIONS));
      }, () => {
        callback(getLocalData<AdminNotification[]>("notifications", DEFAULT_NOTIFICATIONS));
      });
    } catch (e) {
      console.warn("Firestore notifs subscribe error:", e);
    }
  }

  const update = () => {
    callback(getLocalData<AdminNotification[]>("notifications", DEFAULT_NOTIFICATIONS));
  };
  update();

  if (typeof window !== "undefined") {
    window.addEventListener("bsx_notifications_updated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("bsx_notifications_updated", update);
      window.removeEventListener("storage", update);
    };
  }

  return () => {};
}

export async function addNotification(notif: Omit<AdminNotification, "id" | "createdAt" | "read">): Promise<void> {
  const newNotif: AdminNotification = {
    ...notif,
    id: `notif_${Date.now()}`,
    read: false,
    createdAt: new Date().toISOString(),
  };

  if (isFirestoreReady()) {
    try {
      await addDoc(collection(db, "notifications"), {
        ...newNotif,
        createdAt: serverTimestamp(),
      });
    } catch (e) {}
  }

  const current = getLocalData<AdminNotification[]>("notifications", DEFAULT_NOTIFICATIONS);
  setLocalData("notifications", [newNotif, ...current]);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("bsx_notifications_updated"));
  }
}

export async function markNotificationAsRead(id: string): Promise<void> {
  if (isFirestoreReady()) {
    try {
      await updateDoc(doc(db, "notifications", id), { read: true });
    } catch (e) {}
  }

  const current = getLocalData<AdminNotification[]>("notifications", DEFAULT_NOTIFICATIONS);
  const updated = current.map((n) => (n.id === id ? { ...n, read: true } : n));
  setLocalData("notifications", updated);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("bsx_notifications_updated"));
  }
}

export async function clearAllNotifications(): Promise<void> {
  const current = getLocalData<AdminNotification[]>("notifications", DEFAULT_NOTIFICATIONS);
  const updated = current.map((n) => ({ ...n, read: true }));
  setLocalData("notifications", updated);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("bsx_notifications_updated"));
  }
}

// ==========================================
// 5. DYNAMIC PAGE BUILDER SERVICES
// ==========================================

const DEFAULT_PAGES: PageItem[] = [
  {
    id: "page-growth-funnel",
    slug: "b2b-growth-funnel",
    title: "B2B Growth Systems & High-Ticket Funnels",
    metaDescription: "Learn how Build Scale X engineers end-to-end B2B acquisition engines that deliver qualified enterprise clients.",
    published: true,
    createdAt: "2026-03-20",
    updatedAt: "2026-03-24",
    sections: [
      {
        id: "sec-1",
        type: "hero",
        badge: "Enterprise Growth Blueprint",
        title: "Scale High-Ticket Revenue With Custom Digital Architecture",
        subtitle: "Eliminate low-converting websites and bloated agency retainers. We build custom sales funnels that close qualified deals predictably.",
        buttonText: "Schedule Strategy Call",
        buttonLink: "/contact",
        active: true,
        order: 1,
      },
      {
        id: "sec-2",
        type: "features",
        title: "Why Traditional Funnels Fail & Why BSX Wins",
        subtitle: "Engineered specifically for high-ticket service firms, doctors, CA firms, and real estate developers.",
        active: true,
        order: 2,
        items: [
          { id: "f-1", title: "Sub-Second Load Speed", description: "Every 100ms delay costs 7% in conversions. We engineer custom Next.js apps with edge caching.", iconName: "Zap" },
          { id: "f-2", title: "WhatsApp Qualification", description: "Automated triage messages qualify incoming prospects in under 60 seconds.", iconName: "MessageSquare" },
          { id: "f-3", title: "CRM Syncing", description: "Leads automatically flow directly into your CRM with detailed UTM and device attribution.", iconName: "Database" },
        ],
      },
      {
        id: "sec-3",
        type: "cta",
        title: "Ready To Build Your Revenue Engine?",
        subtitle: "Get a bespoke growth audit and system roadmap for your company in 24 hours.",
        buttonText: "Claim Free Growth Audit",
        buttonLink: "/contact",
        active: true,
        order: 3,
      }
    ]
  }
];

export function subscribeToPages(callback: (pages: PageItem[]) => void): () => void {
  if (isFirestoreReady()) {
    try {
      const q = query(collection(db, "pages"), orderBy("updatedAt", "desc"));
      return onSnapshot(q, (snapshot) => {
        const pages = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as PageItem));
        setLocalData("pages", pages);
        callback(pages);
      }, (err) => {
        console.warn("Firestore pages subscribe error:", err);
        callback(getLocalData<PageItem[]>("pages", DEFAULT_PAGES));
      });
    } catch (e) {
      console.warn("Firestore pages subscribe error:", e);
    }
  }

  const update = () => {
    callback(getLocalData<PageItem[]>("pages", DEFAULT_PAGES));
  };
  update();

  if (typeof window !== "undefined") {
    window.addEventListener("bsx_pages_updated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("bsx_pages_updated", update);
      window.removeEventListener("storage", update);
    };
  }

  return () => {};
}

export async function getPages(): Promise<PageItem[]> {
  if (isFirestoreReady()) {
    try {
      const q = query(collection(db, "pages"), orderBy("updatedAt", "desc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as PageItem));
      }
    } catch (e) {
      console.warn("Firestore getPages error:", e);
    }
  }
  return getLocalData<PageItem[]>("pages", DEFAULT_PAGES);
}

export async function savePage(page: PageItem): Promise<void> {
  const updatedPage = {
    ...page,
    updatedAt: new Date().toISOString(),
  };

  if (isFirestoreReady()) {
    try {
      await setDoc(doc(db, "pages", page.id), updatedPage);
    } catch (e) {
      console.warn("Firestore save page error:", e);
    }
  }

  const current = getLocalData<PageItem[]>("pages", DEFAULT_PAGES);
  const exists = current.some((p) => p.id === page.id);
  const updated = exists ? current.map((p) => (p.id === page.id ? updatedPage : p)) : [updatedPage, ...current];
  setLocalData("pages", updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("bsx_pages_updated"));
  }
}

export async function deletePage(id: string): Promise<void> {
  if (isFirestoreReady()) {
    try {
      await deleteDoc(doc(db, "pages", id));
    } catch (e) {
      console.warn("Firestore delete page error:", e);
    }
  }

  const current = getLocalData<PageItem[]>("pages", DEFAULT_PAGES);
  const updated = current.filter((p) => p.id !== id);
  setLocalData("pages", updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("bsx_pages_updated"));
  }
}

// ==========================================
// 6. ENTERPRISE ACTIVITY AUDIT LOGGING
// ==========================================

export async function logActivity(
  actionOrLog: string | Partial<ActivityLog>,
  target?: string,
  userEmail: string = "admin@buildscalex.com"
): Promise<void> {
  const isBrowser = typeof window !== "undefined";
  const userAgent = isBrowser ? navigator.userAgent : "Server Node.js";
  const isMobile = isBrowser ? /Mobi|Android/i.test(userAgent) : false;
  const isTablet = isBrowser ? /Tablet|iPad/i.test(userAgent) : false;
  const device = isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop";
  const browser = isBrowser 
    ? userAgent.includes("Chrome") ? "Chrome" : userAgent.includes("Safari") ? "Safari" : userAgent.includes("Firefox") ? "Firefox" : "Browser"
    : "Server";

  let newLog: ActivityLog;

  if (typeof actionOrLog === "string") {
    newLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      userEmail,
      userName: userEmail.split("@")[0],
      action: actionOrLog,
      target: target || "System",
      browser,
      device,
      timestamp: new Date().toISOString(),
    };
  } else {
    newLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      userEmail: actionOrLog.userEmail || userEmail,
      userName: actionOrLog.userName || (actionOrLog.userEmail || userEmail).split("@")[0],
      action: actionOrLog.action || "CMS Action",
      target: actionOrLog.target || target || "System",
      collectionName: actionOrLog.collectionName,
      docId: actionOrLog.docId,
      previousValue: actionOrLog.previousValue,
      newValue: actionOrLog.newValue,
      browser: actionOrLog.browser || browser,
      device: actionOrLog.device || device,
      ipAddress: actionOrLog.ipAddress,
      timestamp: new Date().toISOString(),
    };
  }

  if (isFirestoreReady()) {
    try {
      await addDoc(collection(db, "activity"), newLog);
    } catch (e) {}
  }

  const current = getLocalData<ActivityLog[]>("activity", []);
  setLocalData("activity", [newLog, ...current].slice(0, 100));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("bsx_activity_updated"));
  }
}

export function subscribeToActivityLogs(callback: (logs: ActivityLog[]) => void): () => void {
  const update = () => {
    callback(getLocalData<ActivityLog[]>("activity", []));
  };
  update();

  if (isFirestoreReady()) {
    try {
      const q = query(collection(db, "activity"), orderBy("timestamp", "desc"), limit(50));
      return onSnapshot(q, (snapshot) => {
        const cloudLogs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ActivityLog));
        if (cloudLogs.length > 0) {
          setLocalData("activity", cloudLogs);
          callback(cloudLogs);
        } else {
          update();
        }
      }, () => update());
    } catch (e) {
      console.warn("Firestore activity subscribe error:", e);
    }
  }

  if (typeof window !== "undefined") {
    window.addEventListener("bsx_activity_updated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("bsx_activity_updated", update);
      window.removeEventListener("storage", update);
    };
  }

  return () => {};
}

// ==========================================
// 7. CONTENT VERSION HISTORY SERVICES
// ==========================================

export async function saveContentVersion(version: Omit<ContentVersion, "id" | "timestamp">): Promise<string> {
  const versionId = `ver_${version.collectionName}_${version.docId}_${Date.now()}`;
  const newVersion: ContentVersion = {
    ...version,
    id: versionId,
    timestamp: new Date().toISOString(),
  };

  if (isFirestoreReady()) {
    try {
      await setDoc(doc(db, "versions", versionId), newVersion);
    } catch (e) {
      console.warn("Firestore saveContentVersion error:", e);
    }
  }

  const storageKey = `versions_${version.collectionName}_${version.docId}`;
  const existing = getLocalData<ContentVersion[]>(storageKey, []);
  setLocalData(storageKey, [newVersion, ...existing].slice(0, 25));

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(`bsx_${storageKey}_updated`));
  }

  return versionId;
}

export function subscribeToVersions(
  collectionName: string,
  docId: string,
  callback: (versions: ContentVersion[]) => void
): () => void {
  const storageKey = `versions_${collectionName}_${docId}`;
  const update = () => {
    callback(getLocalData<ContentVersion[]>(storageKey, []));
  };
  update();

  if (isFirestoreReady()) {
    try {
      const q = query(
        collection(db, "versions"),
        orderBy("timestamp", "desc"),
        limit(20)
      );
      return onSnapshot(q, (snapshot) => {
        const cloudVersions = snapshot.docs
          .map((d) => d.data() as ContentVersion)
          .filter((v) => v.collectionName === collectionName && v.docId === docId);
        if (cloudVersions.length > 0) {
          setLocalData(storageKey, cloudVersions);
          callback(cloudVersions);
        } else {
          update();
        }
      }, () => update());
    } catch (e) {
      console.warn("Firestore subscribeToVersions error:", e);
    }
  }

  if (typeof window !== "undefined") {
    const handler = () => update();
    window.addEventListener(`bsx_${storageKey}_updated`, handler);
    return () => window.removeEventListener(`bsx_${storageKey}_updated`, handler);
  }

  return () => {};
}

export async function restoreContentVersion(version: ContentVersion): Promise<boolean> {
  try {
    await saveDocData(
      version.collectionName,
      version.docId,
      version.data,
      "admin@buildscalex.com",
      `Restored version snapshot ${version.id}`
    );
    await logActivity({
      action: `Restored Version for ${version.collectionName}`,
      target: `${version.collectionName}/${version.docId}`,
      collectionName: version.collectionName,
      docId: version.docId,
      newValue: `Restored version created on ${version.timestamp}`,
    });
    return true;
  } catch (e) {
    console.error("Failed to restore version:", e);
    return false;
  }
}

// ==========================================
// 8. ENTERPRISE BACKUP & DISASTER RECOVERY
// ==========================================

export interface DatabaseBackup {
  metadata: {
    exportDate: string;
    version: string;
    platform: string;
    environment: string;
  };
  collections: {
    homepage: any;
    about: any;
    services: any;
    industries: any;
    process: any;
    faq: any;
    contact: any;
    settings: any;
    seo: any;
    pages: PageItem[];
    leads: LeadRecord[];
    notifications: AdminNotification[];
    activity: ActivityLog[];
  };
}

export async function exportEntireDatabase(): Promise<DatabaseBackup> {
  const [
    homepage,
    about,
    services,
    industries,
    processDoc,
    faq,
    contact,
    settings,
    seo
  ] = await Promise.all([
    getDocData("homepage", "hero", defaultHeroContent),
    getDocData("about", "content", null),
    getDocData("services", "list", { items: defaultServices }),
    getDocData("industries", "list", { items: defaultIndustries }),
    getDocData("process", "list", { items: defaultProcessSteps }),
    getDocData("faq", "list", { items: defaultFaqs }),
    getDocData("contact", "config", defaultContactSettings),
    getDocData("settings", "general", defaultWebsiteSettings),
    getDocData("seo", "global", defaultSeoSettings)
  ]);

  const pages = getLocalData<PageItem[]>("pages", DEFAULT_PAGES);
  const leads = getLocalData<LeadRecord[]>("leads", []);
  const notifications = getLocalData<AdminNotification[]>("notifications", DEFAULT_NOTIFICATIONS);
  const activity = getLocalData<ActivityLog[]>("activity", []);

  const backup: DatabaseBackup = {
    metadata: {
      exportDate: new Date().toISOString(),
      version: "2.0.0-enterprise",
      platform: "Build Scale X SaaS CMS",
      environment: process.env.NODE_ENV || "production"
    },
    collections: {
      homepage,
      about,
      services,
      industries,
      process: processDoc,
      faq,
      contact,
      settings,
      seo,
      pages,
      leads,
      notifications,
      activity
    }
  };

  await logActivity({
    action: "Exported Database Backup",
    target: "System Backup",
    newValue: `Full JSON snapshot with ${Object.keys(backup.collections).length} collections`
  });

  return backup;
}

export async function restoreEntireDatabase(backup: DatabaseBackup): Promise<{ success: boolean; message: string; count: number }> {
  try {
    if (!backup?.collections) {
      throw new Error("Invalid backup file: missing 'collections' payload");
    }

    let count = 0;
    const { collections: c } = backup;

    if (c.homepage) { await saveDocData("homepage", "hero", c.homepage); count++; }
    if (c.about) { await saveDocData("about", "content", c.about); count++; }
    if (c.services) { await saveDocData("services", "list", c.services); count++; }
    if (c.industries) { await saveDocData("industries", "list", c.industries); count++; }
    if (c.process) { await saveDocData("process", "list", c.process); count++; }
    if (c.faq) { await saveDocData("faq", "list", c.faq); count++; }
    if (c.contact) { await saveDocData("contact", "config", c.contact); count++; }
    if (c.settings) { await saveDocData("settings", "general", c.settings); count++; }
    if (c.seo) { await saveDocData("seo", "global", c.seo); count++; }

    if (Array.isArray(c.pages)) {
      setLocalData("pages", c.pages);
      for (const p of c.pages) {
        if (p.id) {
          await savePage(p);
          count++;
        }
      }
    }

    if (Array.isArray(c.leads)) {
      setLocalData("leads", c.leads);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("bsx_leads_updated"));
      }
    }

    await logActivity({
      action: "Restored Database from Backup",
      target: "System Restore",
      newValue: `Restored ${count} records from backup dated ${backup.metadata?.exportDate || 'unknown'}`
    });

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("bsx_cms_global_update"));
    }

    return {
      success: true,
      message: `Database restored successfully! ${count} records recovered from ${backup.metadata?.exportDate || 'backup'}.`,
      count
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Restore failed",
      count: 0
    };
  }
}


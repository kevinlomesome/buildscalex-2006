// tests/deep-system-diagnostic.mjs
import { initializeApp, getApps } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  onSnapshot,
  getDocs,
  query,
  limit
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const BASE_URL = "http://localhost:3000";

const firebaseConfig = {
  apiKey: "AIzaSyBU_ni49rsCgpqQxbpXOT7mmC7xSNR6N74",
  authDomain: "buildscalex-cd101.firebaseapp.com",
  projectId: "buildscalex-cd101",
  storageBucket: "buildscalex-cd101.firebasestorage.app",
  messagingSenderId: "223278299574",
  appId: "1:223278299574:web:99e746b13fe4402de1e917",
  measurementId: "G-1S8ZFK9N0N"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

const issuesFound = [];
const successes = [];

function recordSuccess(testName, details = "") {
  console.log(`\x1b[32m✔ [SUCCESS]\x1b[0m ${testName} ${details ? `(${details})` : ""}`);
  successes.push({ testName, details });
}

function recordIssue(testName, error, severity = "HIGH") {
  console.error(`\x1b[31m✖ [ISSUE - ${severity}]\x1b[0m ${testName}: ${error}`);
  issuesFound.push({ testName, error, severity });
}

async function runDeepDiagnostic() {
  console.log("\n=======================================================");
  console.log("   BUILD SCALE X - DEEP END-TO-END SYSTEM DIAGNOSTIC   ");
  console.log("=======================================================\n");

  // ==========================================
  // 1. PUBLIC ROUTES & ERROR BOUNDARIES
  // ==========================================
  console.log("--- 1. Testing Public Routes, Headers & 404 Boundary ---");
  const publicRoutes = [
    "/",
    "/about",
    "/services",
    "/industries",
    "/process",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
    "/p/b2b-growth-funnel",
    "/robots.txt",
    "/sitemap.xml"
  ];

  for (const r of publicRoutes) {
    try {
      const res = await fetch(`${BASE_URL}${r}`);
      if (res.status === 200) {
        recordSuccess(`Public Route: ${r}`, `HTTP 200 OK`);
      } else {
        recordIssue(`Public Route: ${r}`, `Returned status ${res.status}`, "HIGH");
      }
    } catch (e) {
      recordIssue(`Public Route: ${r}`, e.message, "CRITICAL");
    }
  }

  // Test 404 Route handling
  try {
    const notFoundRes = await fetch(`${BASE_URL}/non-existent-test-page-404`);
    const notFoundHtml = await notFoundRes.text();
    if (notFoundRes.status === 404 || notFoundHtml.includes("Page Not Found") || notFoundHtml.includes("404")) {
      recordSuccess("404 Error Boundary", "Correctly rendered 404 Not Found boundary for unknown route");
    } else {
      recordIssue("404 Error Boundary", `Expected 404 or Page Not Found text, received status ${notFoundRes.status}`, "MEDIUM");
    }
  } catch (e) {
    recordIssue("404 Error Boundary", e.message, "MEDIUM");
  }

  // ==========================================
  // 2. ADMIN CMS ROUTES
  // ==========================================
  console.log("\n--- 2. Testing All Admin CMS Routes ---");
  const adminRoutes = [
    "/admin",
    "/admin/login",
    "/admin/leads",
    "/admin/cms/homepage",
    "/admin/cms/services",
    "/admin/cms/about",
    "/admin/cms/faq",
    "/admin/cms/contact",
    "/admin/cms/industries",
    "/admin/cms/process",
    "/admin/cms/projects",
    "/admin/cms/blogs",
    "/admin/cms/testimonials",
    "/admin/pages",
    "/admin/seo",
    "/admin/settings",
    "/admin/users",
    "/admin/versions",
    "/admin/activity",
    "/admin/notifications",
    "/admin/media",
    "/admin/analytics"
  ];

  for (const ar of adminRoutes) {
    try {
      const res = await fetch(`${BASE_URL}${ar}`);
      if (res.status === 200) {
        recordSuccess(`Admin Route: ${ar}`, `HTTP 200 OK`);
      } else {
        recordIssue(`Admin Route: ${ar}`, `Returned status ${res.status}`, "HIGH");
      }
    } catch (e) {
      recordIssue(`Admin Route: ${ar}`, e.message, "CRITICAL");
    }
  }

  // ==========================================
  // 3. FIRESTORE READS ACROSS ALL COLLECTIONS
  // ==========================================
  console.log("\n--- 3. Testing Firestore Live Reads Across All Core Collections ---");
  const collectionsToCheck = [
    { col: "homepage", docId: "hero" },
    { col: "about", docId: "content" },
    { col: "services", docId: "list" },
    { col: "industries", docId: "list" },
    { col: "process", docId: "list" },
    { col: "faq", docId: "list" },
    { col: "contact", docId: "config" },
    { col: "settings", docId: "general" },
    { col: "seo", docId: "global" },
    { col: "testimonials", docId: "list" },
    { col: "projects", docId: "list" },
    { col: "blogs", docId: "list" }
  ];

  for (const c of collectionsToCheck) {
    try {
      const snap = await getDoc(doc(db, c.col, c.docId));
      if (snap.exists()) {
        recordSuccess(`Firestore Collection '${c.col}/${c.docId}'`, "Document exists & readable");
      } else {
        recordIssue(`Firestore Collection '${c.col}/${c.docId}'`, "Document is missing in live Firestore. Requires initial seeding.", "MEDIUM");
      }
    } catch (err) {
      recordIssue(`Firestore Collection '${c.col}/${c.docId}'`, `${err.code}: ${err.message}`, "HIGH");
    }
  }

  // ==========================================
  // 4. REALTIME SYNC: WRITE, LISTEN, DELETE TEST
  // ==========================================
  console.log("\n--- 4. Testing Realtime Listener & Mutation Cycle ---");
  const testProbeId = `probe_${Date.now()}`;
  let listenerTriggered = false;

  try {
    const unsub = onSnapshot(doc(db, "leads", testProbeId), (snapshot) => {
      if (snapshot.exists()) {
        listenerTriggered = true;
      }
    });

    // Write probe lead
    await setDoc(doc(db, "leads", testProbeId), {
      id: testProbeId,
      fullName: "Automated Probe Lead",
      email: "probe@buildscalex.com",
      phone: "+91 79903 59221",
      message: "Testing Firestore realtime synchronization",
      source: "diagnostic_test",
      createdAt: new Date().toISOString()
    });

    // Wait 1.5s for WebSocket update
    await new Promise((resolve) => setTimeout(resolve, 1500));
    unsub();

    if (listenerTriggered) {
      recordSuccess("Firestore onSnapshot Realtime Synchronization", "Listener fired immediately on document write");
    } else {
      recordIssue("Firestore onSnapshot Realtime Synchronization", "Listener did not trigger within 1500ms timeout", "HIGH");
    }

    // Clean up probe
    await deleteDoc(doc(db, "leads", testProbeId));
    recordSuccess("Firestore Document Delete & Cleanup", `Deleted probe document 'leads/${testProbeId}'`);
  } catch (err) {
    recordIssue("Realtime Mutation & Listener Cycle", `${err.code}: ${err.message}`, "HIGH");
  }

  // ==========================================
  // 5. FIREBASE AUTH CONFIGURATION CHECK
  // ==========================================
  console.log("\n--- 5. Checking Firebase Authentication Status ---");
  try {
    await signInWithEmailAndPassword(auth, "buildscalex@gmail.com", "buildscalex123");
    recordSuccess("Firebase Auth Native Sign-in", "Authenticated successfully via Firebase Auth service");
  } catch (err) {
    if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found") {
      recordIssue(
        "Firebase Auth Console User",
        `Firebase returned '${err.code}'. The user 'buildscalex@gmail.com' has not been created with password in the Firebase Console yet (or password differs). The application is currently using the internal fallback credentials.`,
        "LOW"
      );
    } else {
      recordIssue("Firebase Auth Native Sign-in", `${err.code}: ${err.message}`, "MEDIUM");
    }
  }

  // ==========================================
  // 6. WHATSAPP CONVERSION TARGET & PHONE
  // ==========================================
  console.log("\n--- 6. Verifying WhatsApp Conversion Link & Integration ---");
  try {
    const homeHtml = await (await fetch(`${BASE_URL}/`)).text();
    const contactHtml = await (await fetch(`${BASE_URL}/contact`)).text();
    const hasWhatsAppNumber = homeHtml.includes("7990359221") || contactHtml.includes("7990359221");

    if (hasWhatsAppNumber) {
      recordSuccess("WhatsApp Conversion Flow", "Confirmed phone number +91 79903 59221 is wired into CTAs");
    } else {
      recordIssue("WhatsApp Conversion Flow", "Target phone number +91 79903 59221 not detected in rendered HTML", "HIGH");
    }
  } catch (e) {
    recordIssue("WhatsApp Conversion Flow Check", e.message, "MEDIUM");
  }

  // ==========================================
  // 7. SUMMARY & ACTIONABLE REPORT
  // ==========================================
  console.log("\n=======================================================");
  console.log(`   DIAGNOSTIC SUMMARY: ${successes.length} PASSES, ${issuesFound.length} POTENTIAL ISSUES`);
  console.log("=======================================================\n");

  if (issuesFound.length === 0) {
    console.log("\x1b[32m✔ FULL SYSTEM AUDIT COMPLETED: ZERO CRITICAL ISSUES DETECTED.\x1b[0m\n");
  } else {
    console.log("DISCOVERED ISSUES / CONFIGURATION NOTICES:");
    issuesFound.forEach((iss, idx) => {
      console.log(`  ${idx + 1}. [${iss.severity}] ${iss.testName}: ${iss.error}`);
    });
    console.log("");
  }
}

runDeepDiagnostic();

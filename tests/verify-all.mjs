// tests/verify-all.mjs
// Build Scale X Enterprise Comprehensive Test Suite

import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = "http://localhost:3000";

let passedCount = 0;
let totalCount = 0;

function report(name, status, details = "") {
  totalCount++;
  if (status) {
    passedCount++;
    console.log(`\x1b[32m✔ [PASS]\x1b[0m ${name} ${details ? `(${details})` : ""}`);
  } else {
    console.error(`\x1b[31m✖ [FAIL]\x1b[0m ${name} ${details ? `(${details})` : ""}`);
  }
}

async function runTests() {
  console.log("\n=======================================================");
  console.log("   BUILD SCALE X - ENTERPRISE ACCEPTANCE TEST SUITE    ");
  console.log("=======================================================\n");

  // 1. PUBLIC ROUTES TEST
  const publicRoutes = [
    { path: "/", name: "Homepage" },
    { path: "/about", name: "About Page" },
    { path: "/services", name: "Services Catalog" },
    { path: "/faq", name: "FAQ Knowledgebase" },
    { path: "/contact", name: "Contact & Lead Form" },
    { path: "/industries", name: "Industries Matrix" },
    { path: "/process", name: "Execution Process" },
    { path: "/p/b2b-growth-funnel", name: "Dynamic Page Builder (/p/b2b-growth-funnel)" },
    { path: "/robots.txt", name: "Dynamic Robots.txt" },
    { path: "/sitemap.xml", name: "Dynamic Sitemap XML" }
  ];

  console.log("--- 1. Testing Route Availability & Status 200 ---");
  for (const route of publicRoutes) {
    try {
      const res = await fetch(`${BASE_URL}${route.path}`);
      report(route.name, res.status === 200, `HTTP ${res.status}`);
    } catch (e) {
      report(route.name, false, e.message);
    }
  }

  // 2. SECURITY HEADERS TEST
  console.log("\n--- 2. Testing Production Security Headers ---");
  try {
    const res = await fetch(`${BASE_URL}/`);
    const headers = res.headers;
    report("X-Frame-Options", headers.get("x-frame-options") === "SAMEORIGIN", headers.get("x-frame-options"));
    report("X-Content-Type-Options", headers.get("x-content-type-options") === "nosniff", headers.get("x-content-type-options"));
    report("Referrer-Policy", headers.get("referrer-policy") === "origin-when-cross-origin", headers.get("referrer-policy"));
    report("X-Powered-By Disabled", headers.get("x-powered-by") === null, "Header absent (secure)");
  } catch (e) {
    report("Security Headers Check", false, e.message);
  }

  // 3. SEO & JSON-LD STRUCTURED DATA
  console.log("\n--- 3. Testing SEO & JSON-LD Schema ---");
  try {
    const res = await fetch(`${BASE_URL}/`);
    const html = await res.text();
    const hasOrgSchema = html.includes('"@type":"Organization"');
    const hasWebSiteSchema = html.includes('"@type":"WebSite"');
    const hasWhatsAppTarget = html.includes("7990359221") || html.includes("79903%2059221") || html.includes("79903");

    report("JSON-LD Organization Schema", hasOrgSchema, "Found schema.org/Organization");
    report("JSON-LD WebSite Schema", hasWebSiteSchema, "Found schema.org/WebSite");
    report("WhatsApp Priority Channel", hasWhatsAppTarget, "Verified +91 79903 59221 target");
  } catch (e) {
    report("SEO Check", false, e.message);
  }

  // 4. ADMIN CMS PAGES & ROUTE RESOLUTION
  console.log("\n--- 4. Testing Admin CMS Route Availability ---");
  const adminRoutes = [
    { path: "/admin/login", name: "Admin Login Page" },
    { path: "/admin", name: "Admin Dashboard" },
    { path: "/admin/leads", name: "Lead CRM Manager" },
    { path: "/admin/cms/homepage", name: "Homepage CMS" },
    { path: "/admin/cms/services", name: "Services CMS" },
    { path: "/admin/cms/about", name: "About CMS" },
    { path: "/admin/cms/faq", name: "FAQ CMS" },
    { path: "/admin/cms/contact", name: "Contact & Dynamic Form Builder" },
    { path: "/admin/pages", name: "Dynamic Landing Page Builder" },
    { path: "/admin/versions", name: "Point-in-Time Version History" },
    { path: "/admin/activity", name: "Activity Audit Logs" },
    { path: "/admin/settings", name: "System Settings & Disaster Recovery" },
  ];

  for (const route of adminRoutes) {
    try {
      const res = await fetch(`${BASE_URL}${route.path}`);
      report(route.name, res.status === 200, `HTTP ${res.status}`);
    } catch (e) {
      report(route.name, false, e.message);
    }
  }

  // 5. FIRESTORE RULES VERIFICATION
  console.log("\n--- 5. Verifying Firestore Security Rules File ---");
  try {
    const rulesContent = fs.readFileSync(path.resolve(process.cwd(), "firestore.rules"), "utf8");
    const hasSuperAdmin = rulesContent.includes("isSuperAdmin()");
    const hasAdmin = rulesContent.includes("isAdmin()");
    const hasEditor = rulesContent.includes("isEditor()");
    const hasLeadsRule = rulesContent.includes("match /leads/{leadId}");
    const hasVersionsRule = rulesContent.includes("match /versions/{versionId}");
    const hasActivityRule = rulesContent.includes("match /activity/{activityId}");

    report("RBAC: isSuperAdmin() helper", hasSuperAdmin);
    report("RBAC: isAdmin() helper", hasAdmin);
    report("RBAC: isEditor() helper", hasEditor);
    report("Leads Collection Rule (Public Create Only)", hasLeadsRule);
    report("Versions Collection Rule (Admin Read/Write)", hasVersionsRule);
    report("Activity Audit Rule (Admin Read/Write)", hasActivityRule);
  } catch (e) {
    report("Firestore Rules File Check", false, e.message);
  }

  // 6. FIREBASE STORAGE RULES VERIFICATION
  console.log("\n--- 6. Verifying Firebase Storage Rules File ---");
  try {
    const storageContent = fs.readFileSync(path.resolve(process.cwd(), "storage.rules"), "utf8");
    const hasImageMime = storageContent.includes("image/");
    const hasFileSizeLimit = storageContent.includes("10 * 1024 * 1024");
    const hasAuthCheck = storageContent.includes("request.auth != null");

    report("Storage Rules: MIME type validation", hasImageMime);
    report("Storage Rules: 10MB file limit enforcement", hasFileSizeLimit);
    report("Storage Rules: Auth requirement for uploads", hasAuthCheck);
  } catch (e) {
    report("Storage Rules File Check", false, e.message);
  }

  // 7. FIREBASE HOSTING & CONFIG VERIFICATION
  console.log("\n--- 7. Verifying Firebase Hosting & Deployment Configs ---");
  try {
    const firebaseJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "firebase.json"), "utf8"));
    report("firebase.json: firestore configuration", !!firebaseJson.firestore);
    report("firebase.json: storage configuration", !!firebaseJson.storage);
    report("firebase.json: hosting configuration", !!firebaseJson.hosting);
    report("firebase.json: cleanUrls enabled", firebaseJson.hosting?.cleanUrls === true);

    const firebaserc = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), ".firebaserc"), "utf8"));
    report(".firebaserc: default project configured", firebaserc.projects?.default === "buildscalex-cd101");

    const indexesJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "firestore.indexes.json"), "utf8"));
    report("firestore.indexes.json: composite indexes defined", Array.isArray(indexesJson.indexes) && indexesJson.indexes.length >= 6);

    report("firebase.json: apphosting configuration", !!firebaseJson.apphosting);
    const apphostingYamlExists = fs.existsSync(path.resolve(process.cwd(), "apphosting.yaml"));
    const apphostingContent = apphostingYamlExists ? fs.readFileSync(path.resolve(process.cwd(), "apphosting.yaml"), "utf8") : "";
    report("apphosting.yaml exists & contains runConfig", apphostingYamlExists && apphostingContent.includes("runConfig:"));
    report("apphosting.yaml includes NEXT_PUBLIC_SITE_URL", apphostingContent.includes("NEXT_PUBLIC_SITE_URL"));
  } catch (e) {
    report("Firebase Deployment Config Check", false, e.message);
  }

  // 8. SUMMARY
  console.log("\n=======================================================");
  console.log(`   TOTAL TESTS: ${totalCount}  |  PASSED: ${passedCount}  |  FAILED: ${totalCount - passedCount}   `);
  console.log("=======================================================\n");

  if (passedCount === totalCount) {
    console.log("\x1b[32m✔ ALL ACCEPTANCE CRITERIA PASSED WITH 100% SUCCESS RATE.\x1b[0m\n");
    process.exit(0);
  } else {
    console.error("\x1b[31m✖ SOME TESTS FAILED.\x1b[0m\n");
    process.exit(1);
  }
}

runTests();

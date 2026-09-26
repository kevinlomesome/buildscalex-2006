// scripts/seed-firestore-live.mjs
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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

// Check and seed collections
async function verifyAndSeed() {
  console.log("Checking live Firestore documents in buildscalex-cd101...");

  const checks = [
    { col: "homepage", id: "hero" },
    { col: "about", id: "content" },
    { col: "services", id: "list" },
    { col: "industries", id: "list" },
    { col: "process", id: "list" },
    { col: "faq", id: "list" },
    { col: "contact", id: "config" },
    { col: "settings", id: "general" },
    { col: "seo", id: "global" },
    { col: "testimonials", id: "list" },
    { col: "projects", id: "list" },
    { col: "blogs", id: "list" }
  ];

  for (const c of checks) {
    try {
      const snap = await getDoc(doc(db, c.col, c.id));
      if (snap.exists()) {
        console.log(`✔ [EXISTS] ${c.col}/${c.id}`);
      } else {
        console.log(`✖ [MISSING] ${c.col}/${c.id}`);
      }
    } catch (e) {
      console.error(`Error checking ${c.col}/${c.id}:`, e.message);
    }
  }

  process.exit(0);
}

verifyAndSeed();

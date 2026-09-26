// tests/test-live-firebase.mjs
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
const auth = getAuth(app);

async function runCheck() {
  console.log("=== Testing Live Firebase Connection (buildscalex-cd101) ===");

  // 1. Try reading public doc: homepage/hero
  try {
    console.log("1. Attempting to read 'homepage/hero' from Firestore...");
    const snap = await getDoc(doc(db, "homepage", "hero"));
    if (snap.exists()) {
      console.log("✔ SUCCESS: 'homepage/hero' document exists:", snap.data());
    } else {
      console.log("ℹ NOTICE: 'homepage/hero' does not exist in Firestore yet (document empty).");
    }
  } catch (err) {
    console.error("✖ ERROR reading 'homepage/hero':", err.code, err.message);
  }

  // 2. Try writing a test lead
  try {
    console.log("\n2. Attempting to write a test lead to 'leads/test_probe'...");
    const testLead = {
      fullName: "Test Verification",
      email: "test@buildscalex.com",
      phone: "+91 9999999999",
      message: "Automated test probe",
      source: "verification_script",
      createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, "leads", "test_probe"), testLead);
    console.log("✔ SUCCESS: Lead written successfully to Firestore!");
  } catch (err) {
    console.error("✖ ERROR writing lead to Firestore:", err.code, err.message);
  }

  // 3. Try Firebase Auth sign-in with buildscalex@gmail.com
  try {
    console.log("\n3. Attempting Firebase Auth sign-in for buildscalex@gmail.com...");
    await signInWithEmailAndPassword(auth, "buildscalex@gmail.com", "buildscalex123");
    console.log("✔ SUCCESS: Firebase Auth sign-in succeeded!");
  } catch (err) {
    console.error("✖ Firebase Auth result:", err.code, err.message);
  }

  process.exit(0);
}

runCheck();

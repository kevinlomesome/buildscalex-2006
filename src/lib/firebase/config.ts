import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDemoKeyForBuildScaleXAgencyPlatform",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "buildscalex-agency.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "buildscalex-agency",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "buildscalex-agency.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "109876543210",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:109876543210:web:abcdef1234567890",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-1S8ZFK9N0N",
};

export const isFirebaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "AIzaSyDemoKeyForBuildScaleXAgencyPlatform"
);

export const isFirestoreReady = (): boolean => {
  return Boolean(
    isFirebaseConfigured &&
    db &&
    typeof db === "object" &&
    "app" in db &&
    Boolean((db as any).app?.name !== undefined)
  );
};

// Initialize Firebase App gracefully (singleton)
let app: FirebaseApp;
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (error) {
    console.warn("Firebase initialization notice:", error);
    app = {} as FirebaseApp;
  }
} else {
  app = getApp();
}

let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let analytics: any = null;

try {
  auth = getAuth(app);
} catch {
  auth = {} as Auth;
}

try {
  db = getFirestore(app);
} catch {
  db = {} as Firestore;
}

try {
  storage = getStorage(app);
} catch {
  storage = {} as FirebaseStorage;
}

// Safely initialize analytics in browser only in production (avoids ad-blocker dev errors)
if (typeof window !== "undefined" && isFirebaseConfigured && process.env.NODE_ENV === "production") {
  import("firebase/analytics").then(({ getAnalytics, isSupported }) => {
    isSupported().then((supported) => {
      if (supported) {
        try {
          analytics = getAnalytics(app);
        } catch {
          // Analytics initialization fallback
        }
      }
    }).catch(() => {});
  }).catch(() => {});
}

export { app, auth, db, storage, analytics, firebaseConfig };


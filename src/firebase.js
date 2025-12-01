// firebase.js (FULL CORRECT SETUP)

import { initializeApp } from "firebase/app";
import { 
  getAuth,
  setPersistence,
  browserLocalPersistence 
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

// --------------------------------------
// 🔥 YOUR FIREBASE CONFIG (REPLACE THIS)
// --------------------------------------
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
const auth = getAuth(app);

// 👉 Login Refresh Persistence (MUST HAVE)
setPersistence(auth, browserLocalPersistence);

// Firestore
const db = getFirestore(app);

// Cloud Functions
const functions = getFunctions(app);

// Storage
const storage = getStorage(app);

// --------------------------------------
// EXPORTS
// --------------------------------------
export { app, auth, db, functions, storage };

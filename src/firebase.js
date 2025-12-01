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
  apiKey: "AIzaSyCtkta6uF2P2NGYMoTENrWLITMTs3d-RxE",
  authDomain: "react-6bfb8.firebaseapp.com",
  projectId: "react-6bfb8",
  storageBucket: "react-6bfb8.firebasestorage.app",
  messagingSenderId: "319557973594",
  appId: "1:319557973594:web:95862872f4b978e2b44a63",
  measurementId: "G-78G97WB9YC"
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

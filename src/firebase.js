// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

// Firestore
export const db = getFirestore(app);

export const ts = serverTimestamp;   // ← ⭐ ADD THIS LINE ⭐

// Add Timestamp Export (VERY IMPORTANT)
// export const ts = serverTimestamp;

// Auth
export const auth = getAuth(app);

export default app;

// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";       // <--- ADDED THIS
import { getFirestore } from "firebase/firestore"; // <--- ADDED THIS

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtmZ-3YRN-bxw6K4f__5X7NX08oFXzI-0",
  authDomain: "jobpilot-internship.firebaseapp.com",
  projectId: "jobpilot-internship",
  storageBucket: "jobpilot-internship.firebasestorage.app",
  messagingSenderId: "858683853388",
  appId: "1:858683853388:web:78a26d74c1a321f92942e9",
  measurementId: "G-KLNVDBVYPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Database so the app can use them
export const auth = getAuth(app);       // <--- CRITICAL EXPORT
export const db = getFirestore(app);    // <--- CRITICAL EXPORT
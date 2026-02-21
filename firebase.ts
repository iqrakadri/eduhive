import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Needed for ID uploads

const firebaseConfig = {
  apiKey: "AIzaSyC3YHYBcJD531Qk0tMQtFYi9ijjykBCcrU",
  authDomain: "eduhive-53742.firebaseapp.com",
  projectId: "eduhive-53742",
  storageBucket: "eduhive-53742.firebasestorage.app",
  messagingSenderId: "376556600862",
  appId: "1:376556600862:web:4dd9fd67dc55612c0bf80f",
  measurementId: "G-EF1XH837H0",
};

// Initialize Firebase (Check if already initialized to prevent errors)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize & Export Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Added this for your forms

// Initialize & Export Providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
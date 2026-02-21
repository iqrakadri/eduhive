// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3YHYBcJD531Qk0tMQtFYi9ijjykBCcrU",
  authDomain: "eduhive-53742.firebaseapp.com",
  projectId: "eduhive-53742",
  storageBucket: "eduhive-53742.firebasestorage.app",
  messagingSenderId: "376556600862",
  appId: "1:376556600862:web:4dd9fd67dc55612c0bf80f",
  measurementId: "G-EF1XH837H0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider(); // ✅ Added GitHub
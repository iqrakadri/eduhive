"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase";
import toast from "react-hot-toast"; // Removed local Toaster, using global from layout
import FloatingBlobs from "@/components/FloatingBlobs";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);

    // 1. CONFIGURATION: Define where the user goes after resetting
    // Replace 'http://localhost:3000' with your actual domain when you deploy (e.g., https://eduhive.vercel.app)
    const actionCodeSettings = {
      url: `${window.location.origin}/login`, 
      handleCodeInApp: true,
    };

    try {
      // 2. EXECUTION: Pass the settings to the reset function
      await sendPasswordResetEmail(auth, cleanEmail, actionCodeSettings);
      
      toast.success("Reset link sent! Please check your Inbox and Spam folder.", {
        duration: 6000,
      });
      setEmail(""); 
    } catch (error: any) {
      console.error("Error code:", error.code);
      
      // Handle specific Firebase errors
      switch (error.code) {
        case 'auth/user-not-found':
          toast.error("No account found with this email.");
          break;
        case 'auth/invalid-email':
          toast.error("Please enter a valid email address.");
          break;
        case 'auth/too-many-requests':
          toast.error("Too many attempts. Please try again later.");
          break;
        default:
          toast.error("Failed to send reset email. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center p-6 relative overflow-hidden text-black">
      <FloatingBlobs />
      {/* Note: <Toaster /> removed here because it's already in layout.tsx */}
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-md sharp-card z-10"
      >
        <Link href="/login" className="text-[10px] text-gray-400 font-black uppercase tracking-widest hover:text-black transition-colors">
          ← Back to Login
        </Link>
        
        <h2 className="text-4xl font-black mt-4 tracking-tight">Reset Password 🔐</h2>
        <p className="text-gray-400 text-sm mt-2 font-medium leading-relaxed">
          Enter your email address below. We will send a secure link to your inbox to reset your password.
        </p>

        <form onSubmit={handleReset} className="mt-8 space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Account Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="input-style w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`primary-btn w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-2 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : "Send Reset Link →"}
          </button>
        </form>

        <p className="text-center text-sm mt-10 text-gray-400 font-medium">
          Remembered? <Link href="/login" className="text-purple-600 font-bold hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
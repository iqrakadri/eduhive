"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase";
import toast from "react-hot-toast";
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

try {
  await sendPasswordResetEmail(auth, cleanEmail);
  
  // This is the toast you requested
  toast.success("Reset link sent! Please check your email.");
  
  setEmail(""); 
} catch (error: any) {
  console.error("Error:", error.code);
  if (error.code === 'auth/user-not-found') {
    toast.error("No account found with this email.");
  } else {
    toast.error("Error: " + error.code.replace('auth/', ''));
  }
} finally {
  setIsLoading(false);
}
};

return (
<div className="min-h-screen bg-[#faf7f2] flex items-center justify-center p-6 relative overflow-hidden text-black">
<FloatingBlobs />
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="w-full max-w-md sharp-card z-10"
>
<Link href="/login" className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
← Back to Login
</Link>
<h2 className="text-4xl font-black mt-4">Reset Password 🔐</h2>
<form onSubmit={handleReset} className="mt-8 space-y-6">
<input
type="email"
placeholder="name@example.com"
className="input-style w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-purple-400 outline-none"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
<button
type="submit"
disabled={isLoading}
className="primary-btn w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest"
>
{isLoading ? "Sending..." : "Send Reset Link →"}
</button>
</form>
</motion.div>
</div>
);
}
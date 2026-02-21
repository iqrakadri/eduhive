"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaArrowLeft, FaShieldAlt, FaUserPlus, FaSpinner, FaMagic } from "react-icons/fa";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleResetPassword = async () => {
    if (!email) return toast.error("Please enter your email address first.");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      toast.success("Magic link sent! Check your inbox.");
      setIsForgotPassword(false);
    } catch (error: any) {
      toast.error("Could not send reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Credentials required.");
      return;
    }
    
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // 1. Fetch core role from 'users' collection
      const userBaseDoc = await getDoc(doc(db, "users", user.uid));
      
      if (!userBaseDoc.exists()) {
        toast.error("User record not found. Please sign up.");
        await auth.signOut();
        setLoading(false);
        return;
      }

      const role = userBaseDoc.data().role; // 'student' or 'mentor'

      // 2. Check if profile form is already filled
      const profileDoc = await getDoc(doc(db, role === "mentor" ? "mentors" : "students", user.uid));

      if (profileDoc.exists()) {
        toast.success(`Welcome back, ${role === 'mentor' ? 'Mentor' : 'Scholar'}!`);
        
        // --- THE FIX: Hard Redirect with tiny delay for Session Sync ---
        setTimeout(() => {
          window.location.assign(`/dashboard/${role}`);
        }, 800);
        
      } else {
        toast.loading("Redirecting to profile setup...");
        setTimeout(() => {
          window.location.assign(`/register/${role}?uid=${user.uid}&email=${user.email}`);
        }, 800);
      }

    } catch (error: any) {
      setLoading(false);
      if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password.");
      } else {
        toast.error("Authentication failed.");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#faf7f2] overflow-hidden text-black font-sans flex items-center justify-center p-4">
      <Toaster position="top-right" />

      <motion.div 
        className="pointer-events-none fixed inset-0 z-0 opacity-30"
        animate={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 166, 35, 0.15), transparent 80%)`
        }}
      />

      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 bg-white/60 backdrop-blur-3xl rounded-[3rem] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.1)] border border-white overflow-hidden">
        
        {/* LEFT SIDE: FORM */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-all mb-8">
              <FaArrowLeft /> Back to Home
            </Link>

            <h2 className="text-5xl font-black tracking-tighter leading-tight mb-2">
              {isForgotPassword ? "Reset Core" : "User Login"}
              <span className="text-orange-500 ml-2">.</span>
            </h2>
            <p className="text-gray-400 font-medium mb-10">
              {isForgotPassword ? "Provide your email for a recovery link." : "Welcome back! Enter your details to log in."}
            </p>

            <div className="space-y-5">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-6 py-5 rounded-2xl bg-white/80 border border-gray-100 outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-medium shadow-sm text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {!isForgotPassword && (
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full px-6 py-5 rounded-2xl bg-white/80 border border-gray-100 outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-medium shadow-sm text-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 text-gray-300 hover:text-orange-500 transition-colors">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              )}
              
              {!isForgotPassword && (
                <div className="flex justify-end">
                  <button type="button" onClick={() => setIsForgotPassword(true)} className="text-[10px] font-black uppercase text-orange-600 hover:text-purple-600 transition-all tracking-widest">
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>

            <button 
              disabled={loading}
              onClick={isForgotPassword ? handleResetPassword : handleLogin}
              className="w-full py-5 rounded-2xl bg-[#1A0A2E] text-white font-black text-xs uppercase tracking-[0.2em] mt-8 hover:bg-black hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-purple-900/20 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <FaSpinner className="animate-spin" /> : isForgotPassword ? <><FaMagic /> Send Magic Link</> : "Log In Now →"}
            </button>

            {isForgotPassword && (
              <button type="button" onClick={() => setIsForgotPassword(false)} className="w-full mt-4 text-[10px] font-black uppercase text-gray-400 hover:text-black tracking-widest">
                Return to Login
              </button>
            )}

            {!isForgotPassword && (
              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center">
                <p className="text-sm text-gray-400 font-medium mb-4">Don't have an account yet?</p>
                <Link href="/signup">
                  <button className="flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-[#1A0A2E] text-[#1A0A2E] font-black text-xs uppercase tracking-widest hover:bg-[#1A0A2E] hover:text-white transition-all">
                    <FaUserPlus /> Join the Hive
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* RIGHT SIDE: VISUAL */}
        <div className="hidden md:flex flex-col justify-between p-16 bg-[#1A0A2E] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/20 to-purple-600/20 blur-[120px] rounded-full" />
          <div className="relative z-10 text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">EduHive System v2.0</div>
          <div className="relative z-10">
            <div className="w-20 h-20 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-3xl mb-10 flex items-center justify-center text-white text-4xl shadow-2xl shadow-orange-500/30">
              <FaShieldAlt />
            </div>
            <h3 className="text-6xl font-black text-white tracking-tighter leading-[0.9] mb-6">Access the <br /> <span className="text-orange-400">Knowledge</span> <br /> Core.</h3>
          </div>
          <div className="relative z-10 flex items-center gap-4 text-white/40 text-[10px] font-black uppercase tracking-widest">
            Authentication Secured via Firebase Shield
          </div>
        </div>
      </div>
    </div>
  );
}
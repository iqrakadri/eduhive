"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub, FaArrowLeft, FaShieldAlt, FaUserPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "@/firebase";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter your credentials");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#faf7f2] overflow-hidden text-black font-sans flex items-center justify-center p-4">
      <Toaster position="top-right" />

      {/* INTERACTIVE BACKGROUND GLOW */}
      <motion.div 
        className="pointer-events-none fixed inset-0 z-0 opacity-30"
        animate={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 166, 35, 0.15), transparent 80%)`
        }}
      />

      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 bg-white/60 backdrop-blur-3xl rounded-[3rem] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.1)] border border-white overflow-hidden">
        
        {/* LEFT SIDE: LOGIN FORM */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-all mb-8">
              <FaArrowLeft /> Back to Home
            </Link>

            <h2 className="text-5xl font-black tracking-tighter leading-tight mb-2">
              {isForgotPassword ? "Password Reset" : "User Login"}
              <span className="text-orange-500 ml-2">.</span>
            </h2>
            <p className="text-gray-400 font-medium mb-10">
              {isForgotPassword ? "Provide your email for a recovery link." : "Welcome back! Enter your details to log in."}
            </p>

            <div className="space-y-5">
              {/* EMAIL */}
              <div className="group relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-6 py-5 rounded-2xl bg-white/80 border border-gray-100 outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-medium shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* PASSWORD */}
              {!isForgotPassword && (
                <div className="group relative">
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full px-6 py-5 rounded-2xl bg-white/80 border border-gray-100 outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-medium shadow-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-6 text-gray-300 hover:text-orange-500 transition-colors">
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button onClick={() => setIsForgotPassword(true)} className="text-[10px] font-black uppercase text-orange-600 hover:text-purple-600 transition-all tracking-widest">
                      Forgot Password?
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={isForgotPassword ? () => {} : handleLogin}
              className="w-full py-5 rounded-2xl bg-[#1A0A2E] text-white font-black text-xs uppercase tracking-[0.2em] mt-8 hover:bg-black hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-purple-900/20"
            >
              {isForgotPassword ? "Send Magic Link" : "Log In Now →"}
            </button>

            {/* SOCIAL LOGIN */}
            {!isForgotPassword && (
              <div className="mt-8 grid grid-cols-2 gap-4">
                <button onClick={() => signInWithPopup(auth, googleProvider)} className="flex items-center justify-center gap-3 py-4 rounded-xl border-2 border-gray-50 font-bold text-xs uppercase tracking-widest hover:bg-white transition-all">
                  <FaGoogle className="text-rose-500" /> Google
                </button>
                <button onClick={() => signInWithPopup(auth, githubProvider)} className="flex items-center justify-center gap-3 py-4 rounded-xl border-2 border-gray-50 font-bold text-xs uppercase tracking-widest hover:bg-white transition-all">
                  <FaGithub /> GitHub
                </button>
              </div>
            )}

            {/* CREATE ACCOUNT SECTION */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center">
              <p className="text-sm text-gray-400 font-medium mb-4">Don't have an account yet?</p>
              <Link href="/signup">
                <button className="flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-[#1A0A2E] text-[#1A0A2E] font-black text-xs uppercase tracking-widest hover:bg-[#1A0A2E] hover:text-white transition-all">
                  <FaUserPlus /> Join the Hive
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: PREMIUM VISUAL */}
        <div className="hidden md:flex flex-col justify-between p-16 bg-[#1A0A2E] relative overflow-hidden">
          {/* Animated Gradient Blob */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/20 to-purple-600/20 blur-[120px] rounded-full" />
          
          <div className="relative z-10 text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">
            EduHive System v2.0
          </div>

          <div className="relative z-10">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-20 h-20 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-3xl mb-10 flex items-center justify-center text-white text-4xl shadow-2xl shadow-orange-500/30"
            >
              <FaShieldAlt />
            </motion.div>
            <h3 className="text-6xl font-black text-white tracking-tighter leading-[0.9] mb-6">
              Access the <br /> <span className="text-orange-400">Knowledge</span> <br /> Core.
            </h3>
            <p className="text-white/40 font-medium leading-relaxed max-w-xs">
              Your gateway to the world's most collaborative peer-learning platform.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1,2,3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1A0A2E] bg-gray-800 flex items-center justify-center text-[10px] font-bold text-white">
                  U{i}
                </div>
              ))}
            </div>
            <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">
              +1.2k Scholars Online
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
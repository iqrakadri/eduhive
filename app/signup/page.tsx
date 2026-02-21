"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub, FaCheckCircle, FaTimesCircle, FaArrowLeft, FaUserGraduate, FaChalkboardTeacher, FaRocket } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { auth, db, googleProvider, githubProvider } from "@/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, fetchSignInMethodsForEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "checking" | "taken" | "available">("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const router = useRouter();

  // Password Validation Logic
  const passwordCriteria = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };
  const strengthScore = Object.values(passwordCriteria).filter(Boolean).length;

  // Background Interactive Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Email Availability Check (Only for Manual Email Signup)
  useEffect(() => {
    const checkEmail = async () => {
      if (!email || !email.includes("@")) { setEmailStatus("idle"); return; }
      setEmailStatus("checking");
      try {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        setEmailStatus(methods.length > 0 ? "taken" : "available");
      } catch (error) { setEmailStatus("idle"); }
    };
    const timer = setTimeout(checkEmail, 800);
    return () => clearTimeout(timer);
  }, [email]);

  // MANUAL SIGNUP
  const handleSignup = async () => {
    if (emailStatus === "taken") { toast.error("Email is already registered!"); return; }
    if (strengthScore < 4) { toast.error("Please meet all password requirements."); return; }
    
    setIsLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await setDoc(doc(db, "users", cred.user.uid), { 
        email: email.trim(), 
        role, 
        createdAt: new Date().toISOString() 
      });
      toast.success("Welcome to the Hive!");
      router.push("/login");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  // SOCIAL SIGNUP (Fixed to avoid "Correct Email" errors)
  const handleSocialSignup = async (provider: any) => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        // Direct write to Firestore - bypasses manual email checks
        await setDoc(doc(db, "users", user.uid), { 
          email: user.email, 
          role: role, 
          displayName: user.displayName || "Scholar",
          photoURL: user.photoURL || "",
          createdAt: new Date().toISOString(),
          provider: provider.providerId
        }, { merge: true });

        toast.success("Identity Verified! 🍯");
        router.push("/dashboard"); 
      }
    } catch (error: any) {
      console.error("Auth Error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        toast.error("Signup cancelled.");
      } else {
        toast.error("Social auth failed. Try manual signup.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#faf7f2] overflow-hidden text-black font-sans flex items-center justify-center p-4">
      <Toaster position="top-right" />

      {/* AMBIENT BACKGROUND */}
      <motion.div 
        className="pointer-events-none fixed inset-0 z-0 opacity-30"
        animate={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(192, 132, 252, 0.2), transparent 80%)`
        }}
      />

      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 bg-white/60 backdrop-blur-3xl rounded-[3rem] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.12)] border border-white overflow-hidden">
        
        {/* LEFT: SIGNUP FORM */}
        <div className="p-8 md:p-14 bg-white/40 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-all mb-6">
              <FaArrowLeft /> Exit to Home
            </Link>

            <h2 className="text-5xl font-black tracking-tighter leading-tight mb-2">
              Create Account<span className="text-purple-600">.</span>
            </h2>
            <p className="text-gray-400 font-medium mb-8">Join the elite circle of peer learners.</p>

            {/* Role Toggle */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setRole("student")}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl border-2 transition-all font-black text-xs uppercase tracking-widest ${
                  role === "student" ? "border-purple-600 bg-purple-600 text-white shadow-lg shadow-purple-200" : "border-gray-100 bg-white text-gray-400"
                }`}
              >
                <FaUserGraduate /> Student
              </button>
              <button
                onClick={() => setRole("mentor")}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl border-2 transition-all font-black text-xs uppercase tracking-widest ${
                  role === "mentor" ? "border-purple-600 bg-purple-600 text-white shadow-lg shadow-purple-200" : "border-gray-100 bg-white text-gray-400"
                }`}
              >
                <FaChalkboardTeacher /> Mentor
              </button>
            </div>

            <div className="space-y-4">
              {/* Email Input */}
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-6 py-5 rounded-2xl bg-white/80 border border-gray-100 outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all font-medium shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  {emailStatus === "checking" && <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />}
                  {emailStatus === "available" && <FaCheckCircle className="text-emerald-500" />}
                  {emailStatus === "taken" && <FaTimesCircle className="text-rose-500" />}
                </div>
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create Secure Password"
                    className="w-full px-6 py-5 rounded-2xl bg-white/80 border border-gray-100 outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all font-medium shadow-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-6 text-gray-300 hover:text-purple-600 transition-colors">
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>

                <AnimatePresence>
                  {password.length > 0 && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex gap-1 h-1.5 mb-3">
                        {[1, 2, 3, 4].map((s) => (
                          <div key={s} className={`flex-1 rounded-full transition-all duration-500 ${strengthScore >= s ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries({ "8+ Chars": passwordCriteria.length, "Uppercase": passwordCriteria.upper, "Number": passwordCriteria.number, "Special": passwordCriteria.special }).map(([label, met]) => (
                          <div key={label} className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${met ? "text-emerald-600" : "text-gray-300"}`}>
                            <div className={`w-1 h-1 rounded-full ${met ? "bg-emerald-600" : "bg-gray-300"}`} /> {label}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button 
              onClick={handleSignup}
              disabled={isLoading || strengthScore < 4 || emailStatus === "taken"}
              className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] mt-8 transition-all shadow-xl ${
                isLoading || strengthScore < 4 || emailStatus === "taken" ? "bg-gray-100 text-gray-400" : "bg-[#1A0A2E] text-white hover:bg-black shadow-purple-900/10"
              }`}
            >
              {isLoading ? "Creating..." : "Create Account →"}
            </button>

            {/* Social Connection */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px bg-gray-100 flex-1" />
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Connect With</span>
              <div className="h-px bg-gray-100 flex-1" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialSignup(googleProvider)} className="flex items-center justify-center gap-3 py-4 rounded-xl border-2 border-gray-50 font-bold text-xs uppercase tracking-widest hover:border-purple-200 transition-all">
                <FaGoogle className="text-rose-500" /> Google
              </button>
              <button onClick={() => handleSocialSignup(githubProvider)} className="flex items-center justify-center gap-3 py-4 rounded-xl border-2 border-gray-50 font-bold text-xs uppercase tracking-widest hover:border-purple-200 transition-all">
                <FaGithub /> GitHub
              </button>
            </div>

            <p className="text-center text-xs mt-10 text-gray-400 font-bold uppercase tracking-widest">
              Already have an account? <Link href="/login" className="text-purple-600 hover:underline ml-1">Log in here</Link>
            </p>
          </motion.div>
        </div>

        {/* RIGHT: BRANDING */}
        <div className="hidden md:flex flex-col justify-between p-16 bg-[#1A0A2E] relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/20 to-orange-500/20 blur-[120px] rounded-full" />
          
          <div className="relative z-10 text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">
            EduHive Network // Register
          </div>

          <div className="relative z-10">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-20 h-20 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-3xl mb-10 flex items-center justify-center text-white text-4xl shadow-2xl"
            >
              <FaRocket />
            </motion.div>
            <h3 className="text-7xl font-black tracking-tighter leading-[0.85] mb-6">
              Launch <br /> <span className="text-purple-400">Your</span> <br /> Career.
            </h3>
            <p className="text-white/40 font-medium leading-relaxed max-w-xs">
              Access 100+ micro-courses and a worldwide network of professional mentors.
            </p>
          </div>

          <div className="relative z-10">
             <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
               Nodes Active: <span className="text-emerald-500">Live</span>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
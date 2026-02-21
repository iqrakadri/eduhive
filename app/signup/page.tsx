"use client";

import Link from "next/link";
import { useState } from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaArrowLeft, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const [role, setRole] = useState<"student" | "mentor">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Strict Policy Check [cite: 2026-02-21]
      // We check if the email is already registered to prevent role-overwrite
      const existingMethods = await fetchSignInMethodsForEmail(auth, email.trim());
      if (existingMethods.length > 0) {
        toast.error("This email is already in use. Use a different email for a different role.");
        setIsLoading(false);
        return;
      }

      // 2. Create the Firebase Auth User
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      
      // 3. Save Role to the Database
      // We save to a 'users' collection so the Login page knows where to look first.
      await setDoc(doc(db, "users", cred.user.uid), {
        email: email.trim(),
        role: role, // This field is what your login redirect relies on
        createdAt: new Date().toISOString()
      });

      // Also create the initial record in the specific collection (students or mentors)
      const collectionName = role === "student" ? "students" : "mentors";
      await setDoc(doc(db, collectionName, cred.user.uid), {
        email: email.trim(),
        role: role,
        // Default stats so the dashboard doesn't crash
        xp: 0,
        level: 1,
        onboarded: false 
      });

      toast.success(`Welcome! Registered as a ${role}`);
      
      // 4. Redirect to the detailed onboarding form based on the role
      router.push(`/register/${role}?uid=${cred.user.uid}&email=${email}`);
      
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Account already exists with this email.");
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center p-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white">
        
        {/* LEFT: FORM */}
        <div className="p-8 md:p-14">
          <Link href="/" className="text-[10px] font-black text-gray-400 hover:text-black mb-8 flex items-center gap-2">
            <FaArrowLeft /> EXIT TO HOME
          </Link>
          <h2 className="text-5xl font-black mb-2 leading-tight">Join the Hive<span className="text-purple-600">.</span></h2>
          <p className="text-gray-400 mb-8">Choose your path. One email per identity.</p>

          <form onSubmit={handleSignup} className="space-y-6">
            {/* ROLE SELECTOR */}
            <div className="flex gap-4 p-2 bg-gray-50 rounded-3xl">
              <button 
                type="button"
                onClick={() => setRole("student")}
                className={`flex-1 py-4 rounded-2xl flex flex-col items-center gap-2 transition-all font-bold text-xs uppercase tracking-widest ${role === "student" ? "bg-white shadow-md text-purple-600 border border-purple-100" : "text-gray-400"}`}
              >
                <FaUserGraduate size={20} /> Student
              </button>
              <button 
                type="button"
                onClick={() => setRole("mentor")}
                className={`flex-1 py-4 rounded-2xl flex flex-col items-center gap-2 transition-all font-bold text-xs uppercase tracking-widest ${role === "mentor" ? "bg-white shadow-md text-orange-500 border border-orange-100" : "text-gray-400"}`}
              >
                <FaChalkboardTeacher size={20} /> Mentor
              </button>
            </div>

            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input 
                type="password" 
                placeholder="Create Password" 
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] bg-[#1A0A2E] text-white hover:bg-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : `REGISTER AS ${role.toUpperCase()} →`}
            </button>
          </form>
        </div>

        {/* RIGHT: DECORATION */}
        <div className="hidden md:flex flex-col justify-center p-16 bg-[#1A0A2E] text-white relative">
          <div className="relative z-10">
            <h3 className="text-6xl font-black leading-none mb-6">Explore <br /> New <br /> <span className="text-purple-400">Horizons.</span></h3>
            <p className="text-white/40 font-medium leading-relaxed">
              To be both a Student and a Mentor, use two different email addresses [cite: 2026-02-21].
            </p>
          </div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
      </div>
    </div> 
  );
}
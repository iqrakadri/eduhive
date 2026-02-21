"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaUserGraduate, FaSchool, FaGraduationCap, FaRocket, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function StudentRegistration() {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const email = searchParams.get("email");
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Safety check for UID
    if (!uid) {
      toast.error("Session missing. Please try signing up again.");
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      // 1. Save Student-specific data to the 'students' collection
      // We use setDoc because the document might not exist yet
      await setDoc(doc(db, "students", uid), {
        fullName: formData.get("name"),
        email: email,
        institution: formData.get("school"),
        major: formData.get("major"),
        year: formData.get("year"),
        onboardedAt: new Date().toISOString(),
        onboarded: true, // Crucial for your login logic
        xp: 0,
        level: 1,
        role: "student"
      });

      toast.success("Identity Verified! Entering the Hive...");
      
      // 2. REDIRECT TO DASHBOARD
      // Using window.location.href for a hard redirect ensures the 
      // browser context is fresh for the new dashboard view.
      window.location.href = "/dashboard/student";
      
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error("Failed to save profile. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center p-6 font-sans">
      <Toaster position="top-right" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white p-10 rounded-[3rem] shadow-2xl border border-orange-100"
      >
        <header className="text-center mb-10">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg shadow-orange-200">
            <FaUserGraduate />
          </div>
          <h1 className="text-4xl font-black text-[#1A0A2E] tracking-tighter">
            Scholar Profile<span className="text-orange-500">.</span>
          </h1>
          <p className="text-gray-400 font-medium">Almost there! Let's personalize your learning path.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            {/* Full Name */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-orange-500 transition-all">
              <FaUserGraduate className="text-gray-400" />
              <input 
                name="name" 
                placeholder="Full Name" 
                className="bg-transparent outline-none w-full font-medium" 
                required 
              />
            </div>

            {/* University */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-orange-500 transition-all">
              <FaSchool className="text-gray-400" />
              <input 
                name="school" 
                placeholder="University / School" 
                className="bg-transparent outline-none w-full font-medium" 
                required 
              />
            </div>

            {/* Major and Year */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-orange-500 transition-all">
                <FaGraduationCap className="text-gray-400" />
                <input 
                  name="major" 
                  placeholder="Major/Field" 
                  className="bg-transparent outline-none w-full font-medium" 
                  required 
                />
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-orange-500 transition-all">
                <select name="year" className="bg-transparent outline-none w-full font-medium text-gray-500">
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>
            </div>
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full py-5 bg-[#1A0A2E] text-white rounded-2xl font-black text-xs tracking-[0.2em] uppercase hover:bg-orange-500 transition-all shadow-xl flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> SYNCING DATA...
              </>
            ) : (
              <>
                ENTER THE HIVE <FaRocket />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft, FaShieldAlt, FaGraduationCap, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { db } from "@/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const DOMAINS = ["Web Dev", "AI/ML", "UI/UX Design", "Cyber Security", "Data Science", "Mobile App Dev", "Blockchain"];

export default function EnhancedStudentRegistration() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const email = searchParams.get("email");
  
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleDomain = (domain: string) => {
    setSelectedDomains(prev => 
      prev.includes(domain) ? prev.filter(d => d !== domain) : [...prev, domain]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!uid) return toast.error("Session expired. Please sign up again.");
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      // 1. Check if this user is ALREADY a student
      const studentCheck = await getDoc(doc(db, "students", uid));
      if (studentCheck.exists()) {
        toast.error("You are already registered as a Student!");
        router.push("/dashboard");
        return;
      }

      // 2. Create Student Profile
      await setDoc(doc(db, "students", uid), {
        fullName: formData.get("name"),
        email: email,
        phone: formData.get("phone"),
        academic: {
          college: formData.get("college"),
          department: formData.get("department"),
          year: formData.get("year"),
        },
        language: formData.get("language"),
        address: {
          district: formData.get("district"),
          taluka: formData.get("taluka"),
          state: formData.get("state"),
        },
        domains: selectedDomains,
        onboardedAt: new Date().toISOString(),
      });

      // 3. Update the main 'users' document to track multi-role status
      await updateDoc(doc(db, "users", uid), {
        isStudent: true
      }).catch(async () => {
         // Fallback if users doc doesn't exist yet
         await setDoc(doc(db, "users", uid), { email, isStudent: true }, { merge: true });
      });

      toast.success("Welcome to the Hive, Scholar!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b071e] flex items-center justify-center p-4 lg:p-8 font-sans selection:bg-orange-500 selection:text-white">
      <Toaster position="top-right" />
      
      {/* Background Glows */}
      <div className="fixed top-0 -left-20 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="fixed bottom-0 -right-20 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row rounded-[3rem] shadow-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
      >
        
        {/* FORM SECTION */}
        <div className="w-full md:w-3/5 p-8 md:p-14 lg:p-20 overflow-y-auto max-h-[90vh] bg-white text-slate-900">
          <button onClick={() => router.back()} className="group mb-8 flex items-center gap-2 text-xs font-bold tracking-widest text-slate-400 hover:text-orange-500 transition-colors">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> BACK
          </button>

          <header className="mb-10">
            <h1 className="text-5xl font-black tracking-tighter mb-2">Student Profile<span className="text-orange-500">.</span></h1>
            <p className="text-slate-400 font-medium">Create your learning identity.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            <section>
              <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-orange-500 mb-4"><FaShieldAlt /> Basic Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" placeholder="Full Legal Name" className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-500 outline-none transition-all" required />
                <input value={email || ""} readOnly className="w-full p-4 rounded-2xl bg-slate-100 border border-slate-100 text-slate-400 font-medium" />
              </div>
              <input name="phone" placeholder="Phone Number" className="w-full p-4 mt-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-500 outline-none" required />
            </section>

            <section>
              <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-orange-500 mb-4"><FaGraduationCap /> Education</h3>
              <input name="college" placeholder="College / University Name" className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-500 outline-none mb-4" required />
              <div className="grid grid-cols-2 gap-4">
                <input name="department" placeholder="Department" className="p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-500 outline-none" />
                <select name="year" className="p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-500 outline-none bg-white">
                  <option value="">Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </section>

            <section>
              <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-orange-500 mb-4"><FaMapMarkerAlt /> Location</h3>
              <div className="grid grid-cols-3 gap-3">
                <input name="district" placeholder="District" className="p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-500 outline-none" />
                <input name="taluka" placeholder="Taluka" className="p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-500 outline-none" />
                <input name="state" placeholder="State" className="p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-500 outline-none" />
              </div>
              <div className="mt-4 flex items-center gap-2 p-4 bg-slate-50 rounded-2xl">
                <FaGlobe className="text-slate-300" />
                <input name="language" placeholder="Preferred Language" className="w-full bg-transparent outline-none" />
              </div>
            </section>

            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500 mb-4">Domains</h3>
              <div className="flex flex-wrap gap-2">
                {DOMAINS.map(domain => (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => toggleDomain(domain)}
                    className={`px-5 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${
                      selectedDomains.includes(domain) 
                      ? "bg-orange-500 border-orange-500 text-white" 
                      : "border-slate-100 text-slate-400 hover:border-orange-200"
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            </section>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-[#0b071e] text-white rounded-2xl font-black text-xs tracking-[0.2em] uppercase hover:bg-black transition-all active:scale-[0.98]"
            >
              {loading ? "Registering..." : "Complete Student Profile →"}
            </button>
          </form>
        </div>

        {/* PROMO SIDE */}
        <div className="hidden md:flex md:w-2/5 p-16 flex-col justify-between text-white relative bg-[#0b071e]">
          <div>
            <div className="w-20 h-20 bg-gradient-to-tr from-orange-400 to-orange-600 rounded-[2rem] flex items-center justify-center mb-12 shadow-2xl shadow-orange-500/20">
              <FaGraduationCap size={40} />
            </div>
            <h2 className="text-6xl font-black leading-[0.9] tracking-tighter mb-6">
              Learn <br /> From The <br /> <span className="text-orange-500">Best.</span>
            </h2>
            <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-xs">
              Access peer-to-peer learning and expert mentorship instantly.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
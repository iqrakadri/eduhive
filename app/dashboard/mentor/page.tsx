"use client";

import { motion } from "framer-motion";
import { FaTree, FaRocket, FaSignOutAlt } from "react-icons/fa";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function StudentDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("See you soon, Scholar!");
      router.push("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFBF7] text-[#1A0A2E] font-sans selection:bg-orange-100 overflow-x-hidden">
      <Toaster position="top-right" />
      
      {/* ─── LIVE STATUS TICKER (Top Bar) ─── */}
      <div className="fixed top-0 left-0 right-0 h-9 bg-[#1A0A2E] z-[60] flex items-center overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-white/90"
        >
          <span>🔥 Next Live Session: UI/UX Masterclass in 12m</span>
          <span>•</span>
          <span>🧠 Quiz Alert: "Next.js 15" challenge is now active</span>
          <span>•</span>
          <span>🌳 Reward: @Iqra just grew their digital oak to stage 4</span>
          <span>•</span>
          <span>🍯 1.2k Scholars earning XP right now</span>
          {/* Duplicates for seamless loop */}
          <span>🔥 Next Live Session: UI/UX Masterclass in 12m</span>
          <span>•</span>
          <span>🧠 Quiz Alert: "Next.js 15" challenge is now active</span>
        </motion.div>
      </div>

      {/* ─── NAVIGATION ─── */}
      <nav className="fixed top-9 left-0 right-0 flex justify-between items-center px-12 py-7 bg-white/40 backdrop-blur-xl z-50 border-b border-orange-50/50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <div className="w-8 h-8 bg-orange-500 rounded-lg rotate-12 flex items-center justify-center text-white text-lg shadow-lg">🍯</div>
          <h1 className="text-2xl font-black tracking-tighter">EduHive<span className="text-orange-500">.</span></h1>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.15em] text-gray-400">
            <button onClick={() => router.push('/dashboard/student/mentors')} className="hover:text-orange-500 transition-colors">Mentors</button>
            <button onClick={() => router.push('/quizzes')} className="hover:text-orange-500 transition-colors">Quizzes</button>
            <button onClick={() => router.push('/rewards')} className="hover:text-orange-500 transition-colors">Rewards</button>
            <button className="text-orange-500 border-b-2 border-orange-500 pb-1">Dashboard</button>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-black text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl active:scale-95 flex items-center gap-2"
          >
            Logout <FaSignOutAlt className="text-[8px]" />
          </button>
        </div>
      </nav>

      {/* ─── HERO CONTENT ─── */}
      <section className="relative pt-56 pb-32 px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Text Content */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.1em] text-orange-600">Learn. Quiz. Earn Rewards.</span>
          </div>

          <h1 className="text-[100px] md:text-[120px] font-black leading-[0.82] tracking-tighter mb-10 text-[#1A0A2E]">
            Gamified <br />
            <span className="text-orange-500">Learning.</span> <br />
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent italic">Reimagined.</span>
          </h1>

          <p className="text-lg text-gray-500/80 mb-12 max-w-lg leading-relaxed font-medium">
            The world's first peer-learning node where completing quizzes grows 
            your digital forest and unlocks 1-on-1 sessions with top mentors.
          </p>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/quizzes')}
              className="px-10 py-5 bg-[#1A0A2E] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] flex items-center gap-3 shadow-2xl hover:bg-black transition-all hover:scale-105"
            >
              Take a Quiz <FaRocket className="text-[10px]" />
            </button>
            
            <button 
              onClick={() => router.push('/rewards')}
              className="px-10 py-5 bg-white text-[#1A0A2E] rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] border border-gray-100 shadow-sm hover:bg-gray-50 transition-all"
            >
              View My Rewards 🏆
            </button>
          </div>
        </div>

        {/* Right Status Card (Exactly as in image) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-[440px]"
        >
          {/* Subtle Background Glow */}
          <div className="absolute -inset-4 bg-orange-500/5 blur-[80px] rounded-full"></div>
          
          <div className="relative bg-white/80 backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] border border-white/60">
            <div className="flex items-center gap-5 mb-14">
              <div className="w-16 h-16 bg-[#10B981] rounded-[1.2rem] flex items-center justify-center text-white text-3xl shadow-lg shadow-emerald-500/20">
                <FaTree />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Growth Status</p>
                <h3 className="text-2xl font-black text-[#1A0A2E] tracking-tight">Mature Oak Stage</h3>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <p className="text-6xl font-black tracking-tighter text-[#1A0A2E]">2,450</p>
                <p className="text-[10px] font-black uppercase text-gray-300 tracking-[0.2em] mb-3">Total XP Earned</p>
              </div>
              
              <div className="relative h-2.5 w-full bg-gray-100/50 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "65%" }} 
                  transition={{ duration: 2, ease: "circOut" }}
                  className="h-full bg-[#10B981] rounded-full" 
                />
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#10B981] text-center italic">
                Plant 1 more tree to reach master level
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Decorative background elements */}
      <div className="fixed -bottom-20 -left-20 w-96 h-96 bg-orange-100/30 blur-[120px] rounded-full -z-10"></div>
      <div className="fixed top-1/2 right-0 w-64 h-64 bg-pink-100/20 blur-[100px] rounded-full -z-10"></div>
    </main>
  );
}
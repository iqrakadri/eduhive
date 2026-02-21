"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MasonryGrid from "@/components/MasonryGrid";
import FloatingBlobs from "@/components/FloatingBlobs";
import { MouseGlow, Sparkles } from "@/components/LuxuryEffects";
import { auth } from "@/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaRocket, FaFire, FaGlobe, FaUserGraduate, FaChevronRight, FaPlayCircle, FaBrain, FaTrophy } from "react-icons/fa";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <main className="relative min-h-screen bg-[#FFF8F0] text-[#1A0A2E] overflow-hidden font-sans">
      {/* Visual Enhancements */}
      <FloatingBlobs />
      <MouseGlow />
      <Sparkles />

      {/* ─── LIVE STATUS TICKER ─── */}
      <div className="fixed top-0 left-0 right-0 h-9 bg-[#1A0A2E] z-[60] flex items-center overflow-hidden border-b border-white/5">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-white/80"
        >
          <span>🔥 Next Live Session: UI/UX Masterclass in 12m</span>
          <span>•</span>
          <span>🧠 Quiz Alert: "Next.js 15" challenge is now active</span>
          <span>•</span>
          <span>🌳 Reward: @Iqra just grew their Digital Oak to Stage 4</span>
          <span>•</span>
          <span>🍯 1.2k Scholars earning XP right now</span>
          <span>•</span>
          <span>🚀 New Course: "AI-Driven Development" just dropped</span>
          {/* Duplicate for seamless loop */}
          <span>🔥 Next Live Session: UI/UX Masterclass in 12m</span>
          <span>•</span>
          <span>🧠 Quiz Alert: "Next.js 15" challenge is now active</span>
        </motion.div>
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-9 left-0 right-0 flex justify-between items-center px-6 md:px-12 py-5 bg-white/60 backdrop-blur-2xl border-b border-white/20 z-50">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <div className="w-8 h-8 bg-orange-500 rounded-lg rotate-12 flex items-center justify-center text-white text-lg shadow-lg">🍯</div>
          <h1 className="text-2xl font-black tracking-tighter">
            EduHive<span className="text-orange-500">.</span>
          </h1>
        </motion.div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <Link href="/mentors" className="hover:text-orange-500 transition-colors">Mentors</Link>
            <Link href="/quiz" className="hover:text-orange-500 transition-colors">Quizzes</Link>
            <Link href="/rewards" className="hover:text-orange-500 transition-colors">Rewards</Link>
          </div>
          
          <AnimatePresence mode="wait">
            {user ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
                <Link href="/dashboard" className="text-xs font-black uppercase tracking-widest text-orange-500 underline underline-offset-4">Dashboard</Link>
                <button onClick={handleLogout} className="px-5 py-2 rounded-xl bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-500 transition-all">Logout</button>
              </motion.div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-black">Log In</Link>
                <Link href="/signup">
                  <button className="px-6 py-2.5 rounded-xl bg-[#1A0A2E] text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-orange-500/10">
                    Join Free
                  </button>
                </Link>
              </div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-48 pb-20 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-16 z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Learn. Quiz. Earn Rewards.
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter mb-8 text-[#1A0A2E]"
          >
            Gamified <br />
            <span className="text-orange-500">Learning.</span> <br />
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Reimagined.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-lg text-gray-500 mb-12 max-w-lg leading-relaxed font-medium"
          >
            The world's first peer-learning node where completing quizzes grows 
            your digital forest and unlocks 1-on-1 sessions with top mentors.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/quiz">
              <button className="group px-10 py-5 rounded-2xl bg-[#1A0A2E] text-white font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-2xl">
                Take a Quiz <FaBrain className="group-hover:rotate-12 transition-transform" />
              </button>
            </Link>
            <Link href="/rewards">
              <button className="px-10 py-5 rounded-2xl border-2 border-gray-100 bg-white/50 backdrop-blur text-xs font-black uppercase tracking-widest hover:border-orange-200 transition-all flex items-center gap-2">
                View My Rewards <FaTrophy className="text-orange-500" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Dynamic Card Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-md group"
        >
          <div className="absolute -inset-10 bg-gradient-to-tr from-orange-200 to-purple-200 rounded-full blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity" />
          
          <div className="relative bg-white/80 backdrop-blur-3xl p-10 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-white overflow-hidden">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-200">
                🌳
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Growth Status</p>
                <p className="font-black text-lg text-[#1A0A2E]">Mature Oak Stage</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <p className="font-black text-4xl tracking-tighter text-[#1A0A2E]">2,450</p>
                <p className="text-[10px] font-black uppercase text-gray-400">Total XP Earned</p>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "65%" }} 
                  transition={{ duration: 2, delay: 0.5 }} 
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600" 
                />
              </div>
              <p className="text-[9px] font-bold text-center text-emerald-600 uppercase tracking-widest">
                Plant 1 more tree to reach Master Level
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="px-6 md:px-12 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 p-12 bg-white/40 backdrop-blur-md rounded-[4rem] border border-white shadow-sm">
          <StatBox icon={<FaBrain />} label="Quizzes Solved" val="45k+" />
          <StatBox icon={<FaTrophy />} label="Rewards Claimed" val="12k+" />
          <StatBox icon={<FaUserGraduate />} label="Expert Mentors" val="450+" />
          <StatBox icon={<FaFire />} label="Daily Streaks" val="1.8k" />
        </div>
      </section>

      {/* ================= CONTENT MASONRY ================= */}
      <section className="mt-20 px-6 md:px-12 pb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-[10px] font-black uppercase text-orange-500 tracking-[0.3em] mb-4">Resource Directory</div>
            <h2 className="text-5xl font-black tracking-tighter text-[#1A0A2E]">Master the Nodes<span className="text-orange-500">.</span></h2>
          </div>
          <div className="flex gap-4">
            <Link href="/mentors">
               <button className="px-8 py-3 rounded-xl bg-[#1A0A2E] text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">Mentors</button>
            </Link>
            <Link href="/quiz">
               <button className="px-8 py-3 rounded-xl border-2 border-gray-100 text-[10px] font-black uppercase tracking-widest hover:border-orange-500 transition-all">Quizzes</button>
            </Link>
          </div>
        </div>
        <MasonryGrid />
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative py-24 bg-[#1A0A2E] text-white overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16 text-left">
          <div className="col-span-1">
            <h3 className="text-2xl font-black tracking-tighter mb-6">EduHive🍯</h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              The decentralized network for gamified learning. Earn XP, grow trees, 
              and build your career with the help of world-class mentors.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 col-span-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-6">Explore</p>
              <ul className="space-y-4 text-xs font-bold text-white/60">
                <li><Link href="/mentors" className="hover:text-white">Mentor Directory</Link></li>
                <li><Link href="/quiz" className="hover:text-white">Daily Quizzes</Link></li>
                <li><Link href="/rewards" className="hover:text-white">Rewards Shop</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-6">Social</p>
              <ul className="space-y-4 text-xs font-bold text-white/60">
                <li className="hover:text-white cursor-pointer">Twitter / X</li>
                <li className="hover:text-white cursor-pointer">Discord Community</li>
                <li className="hover:text-white cursor-pointer">GitHub</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
          © {new Date().getFullYear()} EduHive • Build by Iqra 🍯
        </div>
      </footer>
    </main>
  );
}

function StatBox({ icon, label, val }: { icon: any, label: string, val: string }) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="text-orange-500 text-2xl mb-4 group-hover:scale-125 transition-transform duration-300">{icon}</div>
      <p className="text-4xl font-black text-[#1A0A2E] tracking-tighter mb-1">{val}</p>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{label}</p>
    </div>
  );
}
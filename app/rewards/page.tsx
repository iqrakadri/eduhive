"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLeaf, FaSeedling, FaTree, FaGem, FaFire, FaCalendarAlt, FaClock } from "react-icons/fa";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

// Growth Stages Logic from rewards.html
const GROWTH_STAGES = [
  { threshold: 0, label: "Seedling", icon: "🌱", color: "text-emerald-400" },
  { threshold: 500, label: "Sprout", icon: "🌿", color: "text-emerald-500" },
  { threshold: 1000, label: "Young Pine", icon: "🌲", color: "text-emerald-600" },
  { threshold: 2500, label: "Mature Oak", icon: "🌳", color: "text-emerald-700" },
  { threshold: 5000, label: "Ancient Grove", icon: "🍀", color: "text-emerald-800" },
];

export default function RewardsPage() {
  const [userXP, setUserXP] = useState(1250); // This should be synced with your global state/Firebase
  const [streak, setStreak] = useState(7);
  const [timeLeft, setTimeLeft] = useState("14:22:05");

  // Determine current stage
  const currentStage = [...GROWTH_STAGES].reverse().find(s => userXP >= s.threshold) || GROWTH_STAGES[0];
  const nextStage = GROWTH_STAGES[GROWTH_STAGES.indexOf(currentStage) + 1] || null;
  
  // Progress towards next stage
  const progress = nextStage 
    ? ((userXP - currentStage.threshold) / (nextStage.threshold - currentStage.threshold)) * 100 
    : 100;

  // Mock Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const reset = new Date();
      reset.setHours(24, 0, 0, 0);
      const diff = reset.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClaim = (item: string, cost: number) => {
    if (userXP >= cost) {
      setUserXP(prev => prev - cost);
      toast.success(`Unlocked ${item}!`, { icon: '🎁' });
    } else {
      toast.error("Insufficient XP in the Hive", { icon: '⚠️' });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#FFF8F0] text-[#1A0A2E] overflow-hidden pt-24 pb-20 px-6 font-sans">
      <Toaster position="top-right" />
      
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-emerald-100/40 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-sky-100/40 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* HEADER STATS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
          <div className="text-center md:text-left">
            <h1 className="text-6xl font-black tracking-tighter mb-2">Digital <span className="text-emerald-600">Forest.</span></h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Level up your knowledge to grow your ecosystem</p>
          </div>
          
          <div className="flex gap-4">
            <StatPill icon={<FaFire className="text-orange-500" />} label="Streak" val={`${streak} Days`} />
            <StatPill icon={<FaClock className="text-sky-500" />} label="Resets" val={timeLeft} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT: THE TREE GROWTH VISUAL */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              className="bg-white/80 backdrop-blur-3xl rounded-[4rem] p-12 border border-white shadow-[0_40px_100px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Stage Badge */}
              <div className="absolute top-10 left-10 bg-emerald-50 text-emerald-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                {currentStage.label}
              </div>

              {/* Main Tree Visual */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentStage.icon}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.2, opacity: 0 }}
                  className="text-[12rem] md:text-[15rem] my-10 drop-shadow-2xl filter brightness-110"
                >
                  {currentStage.icon}
                </motion.div>
              </AnimatePresence>

              {/* XP Bar Component */}
              <div className="w-full max-w-xl space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span>Current: {userXP} XP</span>
                  <span>Next: {nextStage?.threshold || 'MAX'} XP</span>
                </div>
                <div className="h-6 w-full bg-gray-100 rounded-full p-1.5 border border-white shadow-inner">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* STREAK CALENDAR MOCKUP */}
            <div className="bg-white/60 backdrop-blur-xl rounded-[3rem] p-10 border border-white flex flex-wrap justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 text-xl"><FaCalendarAlt /></div>
                <div>
                  <h3 className="font-black text-lg">Weekly Consistency</h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active nodes this week</p>
                </div>
              </div>
              <div className="flex gap-2">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black border ${i < 4 ? 'bg-[#1A0A2E] text-white border-[#1A0A2E]' : 'bg-white text-gray-300 border-gray-100'}`}>
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: SHOP / UNLOCKABLES */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter ml-4">Hive <span className="text-orange-500">Upgrades.</span></h2>
            
            <ShopItem 
              icon={<FaGem className="text-sky-500" />} 
              name="Crystal Water" 
              desc="Instant 20% Growth Boost" 
              cost={300} 
              onClaim={() => handleClaim("Crystal Water", 300)} 
            />
            
            <ShopItem 
              icon={<FaLeaf className="text-yellow-500" />} 
              name="Golden Leaves" 
              desc="Exclusive Profile Aura" 
              cost={800} 
              onClaim={() => handleClaim("Golden Leaves", 800)} 
            />

            <ShopItem 
              icon={<FaTree className="text-purple-500" />} 
              name="Twin Node" 
              desc="Double XP for 24 hours" 
              cost={1500} 
              onClaim={() => handleClaim("Twin Node", 1500)} 
            />

            {/* QUICK LINK TO QUIZ */}
            <Link href="/quiz">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-[#1A0A2E] to-black p-8 rounded-[2.5rem] mt-8 text-white cursor-pointer relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-black mb-1">Earn More XP</h3>
                  <p className="text-white/50 text-[10px] font-black uppercase tracking-widest">Back to Knowledge Sprints</p>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] text-8xl text-white/5 group-hover:rotate-12 transition-transform">🧠</div>
              </motion.div>
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}

function StatPill({ icon, label, val }: { icon: any, label: string, val: string }) {
  return (
    <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-white flex items-center gap-3">
      <div className="text-lg">{icon}</div>
      <div>
        <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.1em]">{label}</p>
        <p className="text-sm font-black">{val}</p>
      </div>
    </div>
  );
}

function ShopItem({ icon, name, desc, cost, onClaim }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white/70 backdrop-blur-md p-6 rounded-[2.5rem] border border-white flex items-center justify-between group transition-all hover:shadow-xl"
    >
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 bg-white rounded-2xl shadow-inner flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <h4 className="font-black text-sm">{name}</h4>
          <p className="text-[10px] text-gray-400 font-bold">{desc}</p>
        </div>
      </div>
      <button 
        onClick={onClaim}
        className="px-4 py-2 bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-orange-500 border border-gray-100 hover:bg-[#1A0A2E] hover:text-white transition-all"
      >
        {cost} XP
      </button>
    </motion.div>
  );
}
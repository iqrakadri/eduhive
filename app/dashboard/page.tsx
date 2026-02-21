"use client";

import { motion } from "framer-motion";
import { FaAward, FaBookOpen, FaFire, FaChartLine, FaHistory, FaTrophy } from "react-icons/fa";
import { MouseGlow, Sparkles } from "@/components/LuxuryEffects";

export default function Dashboard() {
  const stats = [
    { label: "Learning Streak", value: "12 Days", icon: <FaFire className="text-orange-500" />, color: "bg-orange-50" },
    { label: "Resources Read", value: "24", icon: <FaBookOpen className="text-purple-500" />, color: "bg-purple-50" },
    { label: "Quiz Accuracy", value: "88%", icon: <FaChartLine className="text-emerald-500" />, color: "bg-emerald-50" },
    { label: "Global Rank", value: "#142", icon: <FaAward className="text-honey" />, color: "bg-amber-50" },
  ];

  return (
    <main className="relative min-h-screen bg-[#FFF8F0] p-4 md:p-10 font-sans text-deep overflow-hidden">
      <MouseGlow />
      <Sparkles />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl font-black tracking-tighter text-black"
            >
              Your Dashboard <span className="text-honey">📊</span>
            </motion.h1>
            <p className="text-gray-500 font-medium mt-1">Welcome back, Scholar. You're in the top 5% this week!</p>
          </div>
          
          <button className="bg-black text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-transform flex items-center gap-2 w-fit">
            <FaTrophy /> View Leaderboard
          </button>
        </header>

        {/* TOP STATS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
              <span className="text-2xl font-black text-black mt-1">{stat.value}</span>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* PROGRESS CHART SECTION */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <FaChartLine className="text-purple-600" /> Mastery Progress
              </h3>
              
              <div className="space-y-6">
                <ProgressBar label="Web Development" progress={75} color="bg-purple-600" />
                <ProgressBar label="UI/UX Design" progress={40} color="bg-honey" />
                <ProgressBar label="Data Structures" progress={90} color="bg-emerald-500" />
              </div>
              
              <div className="mt-8 p-4 bg-purple-50 rounded-2xl border border-purple-100 flex items-center justify-between">
                <p className="text-sm font-bold text-purple-900">Recommended for you: Advanced Framer Motion</p>
                <button className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg font-black uppercase">Start</button>
              </div>
            </div>

            {/* SAVED RESOURCES MASONRY PREVIEW */}
            <div className="grid md:grid-cols-2 gap-6">
              <ResourceCard title="Next.js 14 Guide" tag="Article" time="12m" color="border-l-honey" />
              <ResourceCard title="Firebase Auth Masterclass" tag="Video" time="45m" color="border-l-emerald-500" />
            </div>
          </div>

          {/* SIDEBAR: ACTIVITY FEED */}
          <div className="bg-[#1A0A2E] text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
             {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full" />
            
            <h3 className="text-xl font-black mb-8 flex items-center gap-2">
              <FaHistory className="text-lavender" /> Recent Activity
            </h3>

            <div className="space-y-8">
              <ActivityItem 
                title="Completed Quiz" 
                desc="React Hooks Fundamentals" 
                score="+45 XP" 
                icon="🔥" 
              />
              <ActivityItem 
                title="Achievement Unlocked" 
                desc="7-Day Streak Master" 
                score="Badge" 
                icon="🏆" 
              />
              <ActivityItem 
                title="Resource Saved" 
                desc="Tailwind Best Practices" 
                score="Saved" 
                icon="🔖" 
              />
            </div>

            <button className="w-full mt-12 py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors font-bold text-sm">
              View All History
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── HELPER COMPONENTS ───

function ProgressBar({ label, progress, color }: { label: string, progress: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-black tracking-tight">
        <span>{label}</span>
        <span className="text-gray-400">{progress}%</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color}`} 
        />
      </div>
    </div>
  );
}

function ResourceCard({ title, tag, time, color }: { title: string, tag: string, time: string, color: string }) {
  return (
    <div className={`p-6 bg-white border border-gray-100 rounded-3xl shadow-sm border-l-8 ${color} hover:shadow-md transition-shadow`}>
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{tag}</span>
      <h4 className="text-lg font-black mt-2 leading-tight">{title}</h4>
      <p className="text-xs text-gray-400 mt-2 font-bold">Estimated: {time}</p>
    </div>
  );
}

function ActivityItem({ title, desc, score, icon }: { title: string, desc: string, score: string, icon: string }) {
  return (
    <div className="flex gap-4 group cursor-default">
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <h5 className="font-black text-sm group-hover:text-lavender transition-colors">{title}</h5>
        <p className="text-xs text-white/40 font-medium">{desc}</p>
      </div>
      <div className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter">{score}</div>
    </div>
  );
}
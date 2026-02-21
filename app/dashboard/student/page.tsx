"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaRocket, FaTerminal, FaCodeBranch, FaBolt, FaUserLock } from "react-icons/fa";
import FloatingBlobs from "@/components/FloatingBlobs";
import { MouseGlow, Sparkles } from "@/components/LuxuryEffects";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#FDFCFB] text-[#1A0A2E] overflow-hidden font-sans">
      <FloatingBlobs />
      <MouseGlow />
      <Sparkles />

      {/* ─── NAVIGATION ─── */}
      <nav className="fixed top-10 left-0 right-0 flex justify-between items-center px-6 md:px-12 z-[70]">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#1A0A2E] rounded-xl flex items-center justify-center text-orange-500 text-xl font-black shadow-[4px_4px_0px_0px_#FF5722]">H</div>
          <span className="text-2xl font-black tracking-tighter uppercase">EduHive<span className="text-orange-500">.</span></span>
        </div>

        {/* PRIMARY LOGIN BUTTON (TOP RIGHT) */}
        <Link href="/login">
          <motion.button 
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-white border-2 border-[#1A0A2E] px-6 md:px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_#1A0A2E] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <FaUserLock className="text-orange-500" /> Access Node
          </motion.button>
        </Link>
      </nav>

      {/* ─── LIVE PROTOCOL TICKER ─── */}
      <div className="fixed top-0 left-0 right-0 h-10 bg-[#1A0A2E] z-[60] flex items-center border-b border-orange-500/30">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap flex gap-16 text-[9px] font-black uppercase tracking-[0.4em] text-orange-400"
        >
          <span>● DECENTRALIZED KNOWLEDGE PROTOCOL ACTIVE</span>
          <span>● 2,400+ NODES SYNCHRONIZED</span>
          <span>● PROOF-OF-LEARNING VALIDATED</span>
          <span>● HARVESTING XP IN REAL-TIME</span>
          <span>● DECENTRALIZED KNOWLEDGE PROTOCOL ACTIVE</span>
        </motion.div>
      </div>

      {/* ─── CENTERED HERO SECTION ─── */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20">
        
        {/* Project Version Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-2xl bg-white border-2 border-[#1A0A2E] text-[#1A0A2E] text-[10px] font-black uppercase tracking-[0.3em] mb-12 shadow-[8px_8px_0px_0px_#FF5722]"
        >
          <FaTerminal className="text-orange-500 animate-pulse" />
          SYSTEM_STATUS: STABLE
        </motion.div>

        {/* THE POWER SLOGAN */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <h1 className="text-[12vw] md:text-[9.5rem] font-[1000] leading-[0.75] tracking-[-0.06em] mb-12 uppercase italic">
            Kill the <br />
            <span className="text-orange-500">Lecture.</span> <br />
            <span className="relative inline-block">
              Grow the <span className="bg-[#1A0A2E] text-white px-4">Hive.</span>
              <div className="absolute -bottom-2 left-0 w-full h-4 bg-orange-500/20 -z-10" />
            </span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-slate-500 mb-16 max-w-3xl mx-auto leading-tight font-black uppercase tracking-tight"
        >
          One Protocol. <span className="text-[#1A0A2E] underline decoration-orange-500 decoration-4">Zero Friction.</span> The only learning network where your XP dictates your impact.
        </motion.p>

        {/* MAIN CTA GROUP */}
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <Link href="/signup">
              <motion.button 
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                className="group px-14 py-8 rounded-[2rem] bg-[#FF5722] text-white font-black text-lg uppercase tracking-widest flex items-center gap-4 shadow-[12px_12px_0px_0px_#1A0A2E] transition-all"
              >
                Initialize Node <FaBolt className="group-hover:text-yellow-300" />
              </motion.button>
            </Link>
            
            <div className="flex gap-8">
               <div className="flex flex-col items-start border-l-4 border-[#1A0A2E] pl-6 text-left">
                  <span className="text-3xl font-black leading-none">$EDU_XP</span>
                  <span className="text-[9px] font-black text-orange-600 uppercase tracking-widest mt-1">Live Rewards</span>
               </div>
               <div className="flex flex-col items-start border-l-4 border-[#1A0A2E] pl-6 text-left">
                  <span className="text-3xl font-black leading-none">∞</span>
                  <span className="text-[9px] font-black text-orange-600 uppercase tracking-widest mt-1">Global Nodes</span>
               </div>
            </div>
          </div>

          {/* SECONDARY LOGIN REDIRECT */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="group"
          >
            <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2">
              Already have an account? <span className="text-[#1A0A2E] group-hover:text-orange-500">Log in here_</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Decorative Technical Info */}
      <div className="absolute bottom-10 left-12 hidden md:block">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Encrypted Connection Active_</p>
      </div>
    </main>
  );
}
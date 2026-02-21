"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaStar, FaFilter, FaCalendarCheck, FaRegHeart, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import FloatingBlobs from "@/components/FloatingBlobs";
import { MouseGlow, Sparkles } from "@/components/LuxuryEffects";
import toast, { Toaster } from "react-hot-toast";

// --- MOCK DATA ---
const MENTORS = [
  { id: 1, name: "Dr. Aris Thorne", role: "AI Research Lead", rating: 4.9, reviews: 124, price: "45", category: "AI & ML", image: "https://i.pravatar.cc/150?u=1", bio: "Ex-Google Scientist specializing in Neural Networks." },
  { id: 2, name: "Lena Sterling", role: "Senior UX Architect", rating: 5.0, reviews: 89, price: "30", category: "Design", image: "https://i.pravatar.cc/150?u=2", bio: "Helping designers master the art of conversion-driven UI." },
  { id: 3, name: "Marcus Chen", role: "Fullstack Developer", rating: 4.8, reviews: 210, price: "40", category: "Development", image: "https://i.pravatar.cc/150?u=3", bio: "Specializing in Next.js 15, Rust, and Scalable Architecture." },
  { id: 4, name: "Sophia Valez", role: "Brand Strategist", rating: 4.9, reviews: 56, price: "50", category: "Business", image: "https://i.pravatar.cc/150?u=4", bio: "Built 3 profitable startups. Mentoring on growth hacking." },
  { id: 5, name: "Jameson King", role: "Cybersecurity Expert", rating: 4.7, reviews: 142, price: "55", category: "Development", image: "https://i.pravatar.cc/150?u=5", bio: "White-hat hacker teaching ethical penetration testing." },
  { id: 6, name: "Elena Rossi", role: "Product Manager", rating: 5.0, reviews: 77, price: "35", category: "Business", image: "https://i.pravatar.cc/150?u=6", bio: "Leading products at high-growth fintech companies." },
];

export default function MentorsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredMentors = MENTORS.filter(m => 
    (activeTab === "All" || m.category === activeTab) &&
    (m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="relative min-h-screen bg-[#FFF8F0] text-[#1A0A2E] overflow-hidden">
      <Toaster position="bottom-center" />
      <FloatingBlobs />
      <MouseGlow />
      <Sparkles />

      {/* --- PREMIUM NAVBAR --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex justify-between items-center ${scrolled ? "bg-white/70 backdrop-blur-xl shadow-sm" : "bg-transparent"}`}>
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#1A0A2E] rounded-lg flex items-center justify-center text-orange-400 group-hover:rotate-12 transition-transform">
             <FaArrowLeft size={14} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Hive</span>
        </Link>
        <div className="text-xl font-black tracking-tighter">Scholars Directory<span className="text-orange-500">.</span></div>
        <div className="w-24"></div> {/* Spacer for balance */}
      </nav>

      {/* --- HERO / SEARCH SECTION --- */}
      <section className="relative pt-40 pb-12 px-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
            Elite <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Mentors.</span>
          </h1>
          <p className="text-gray-400 font-medium max-w-xl mx-auto text-lg leading-relaxed">
            Connect with industry veterans for 1-on-1 private sprints, code reviews, and career strategy.
          </p>
        </motion.div>

        {/* SEARCH BAR */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
          <input 
            type="text" 
            placeholder="Search by name, role, or tech stack..." 
            className="w-full pl-16 pr-8 py-6 rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white outline-none focus:ring-4 focus:ring-orange-500/5 transition-all font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {["All", "AI & ML", "Design", "Development", "Business"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab ? "bg-[#1A0A2E] text-white shadow-xl shadow-purple-900/20" : "bg-white text-gray-400 hover:bg-gray-50 border border-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* --- MENTORS GRID --- */}
      <section className="px-6 pb-32 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredMentors.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 border border-white hover:border-orange-200 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="relative">
                    <img src={mentor.image} alt={mentor.name} className="w-20 h-20 rounded-2xl object-cover" />
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-lg text-[8px]">
                      <FaCheckCircle />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black tracking-tight text-[#1A0A2E]">${mentor.price}<span className="text-[10px] text-gray-400 uppercase">/hr</span></p>
                    <div className="flex items-center justify-end gap-1 text-orange-500 text-xs font-bold">
                      <FaStar /> {mentor.rating} <span className="text-gray-300 font-medium">({mentor.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-black tracking-tight group-hover:text-orange-600 transition-colors">{mentor.name}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-purple-600 mb-3">{mentor.role}</p>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{mentor.bio}</p>
                </div>

                <div className="flex gap-2 mb-8">
                  <span className="px-3 py-1 bg-gray-50 rounded-lg text-[9px] font-black uppercase text-gray-400">{mentor.category}</span>
                  <span className="px-3 py-1 bg-gray-50 rounded-lg text-[9px] font-black uppercase text-gray-400">Top Mentor</span>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => toast.success("Request Sent!")}
                    className="flex-1 bg-[#1A0A2E] text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2"
                  >
                    <FaCalendarCheck /> Book Session
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-100 text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-all">
                    <FaRegHeart />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 font-black uppercase tracking-[0.3em]">No mentors found in this node.</p>
          </div>
        )}
      </section>

      {/* --- FOOTER CTA --- */}
      <footer className="bg-[#1A0A2E] py-20 text-center px-6">
        <h2 className="text-white text-4xl font-black tracking-tighter mb-4">Want to mentor?</h2>
        <p className="text-white/40 mb-10 max-w-sm mx-auto font-medium">Earn rewards and build your reputation by sharing your expertise with the Hive.</p>
        <Link href="/signup">
          <button className="px-10 py-4 bg-orange-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/20">
            Apply as Mentor
          </button>
        </Link>
      </footer>
    </main>
  );
}
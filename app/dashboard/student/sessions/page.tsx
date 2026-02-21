"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FaCalendarPlus, FaGraduationCap } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function StudentSessions() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMentors = async () => {
      const snap = await getDocs(collection(db, "mentors"));
      setMentors(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchMentors();
  }, []);

  const bookSession = async (mentorId: string, mentorName: string) => {
    if (!auth.currentUser) return toast.error("Log in first!");
    
    try {
      // Create a session in the 'sessions' collection
      await addDoc(collection(db, "sessions"), {
        mentorId: mentorId,
        studentId: auth.currentUser.uid,
        studentName: auth.currentUser.displayName || "Anonymous Scholar",
        topic: "Initial Mentorship Query",
        status: "Pending",
        createdAt: serverTimestamp()
      });
      toast.success(`Request sent to ${mentorName}!`);
    } catch (error) {
      toast.error("Booking failed.");
    }
  };

  if (loading) return <div className="p-10 font-black text-orange-500">Searching for Mentors...</div>;

  return (
    <div className="min-h-screen bg-[#FFF8F0] p-8 lg:p-20 font-sans">
      <Toaster />
      <header className="mb-16">
        <h1 className="text-6xl font-black tracking-tighter">Find Your Guide<span className="text-orange-500">.</span></h1>
        <p className="text-gray-500 font-bold mt-2">Book 1-on-1 sessions with top industry nodes.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="bg-white p-8 rounded-[2.5rem] border border-orange-100 shadow-xl shadow-orange-500/5 group hover:border-orange-500 transition-all">
            <div className="w-16 h-16 bg-[#1A0A2E] rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
              <FaGraduationCap />
            </div>
            <h3 className="text-2xl font-black mb-2">{mentor.fullName}</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {mentor.expertise?.map((exp: string, i: number) => (
                <span key={i} className="text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
                  {exp}
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-sm mb-8 line-clamp-2">{mentor.bio}</p>
            <button 
              onClick={() => bookSession(mentor.id, mentor.fullName)}
              className="w-full py-4 bg-[#1A0A2E] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 transition-all flex items-center justify-center gap-2"
            >
              Request Session <FaCalendarPlus />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
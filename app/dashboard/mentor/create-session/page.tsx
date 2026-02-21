"use client";

import { useState } from "react";
import { db, auth } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FaChalkboardTeacher, FaClock, FaVideo, FaUsers, FaSpinner } from "react-icons/fa";

export default function CreateSessionPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 1. Get today's date in YYYY-MM-DD format for the 'min' attribute
  const today = new Date().toISOString().split("T")[0];

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      toast.error("You must be logged in as a mentor to create a session.");
      return;
    }

    // 2. Strict Date Validation Logic
    const selectedDate = new Date(date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

    if (selectedDate < currentDate) {
      toast.error("Past dates are not allowed. Please select a valid date.");
      return;
    }

    setIsLoading(true);
    try {
      await addDoc(collection(db, "sessions"), {
        mentorId: user.uid,
        mentorEmail: user.email,
        title,
        description,
        scheduledDate: date,
        scheduledTime: time,
        duration: parseInt(duration),
        status: "upcoming",
        attendees: [],
        createdAt: serverTimestamp(),
      });

      toast.success("Knowledge Session Broadcasted!");
      
      // Delay redirect slightly so user can see the success toast
      setTimeout(() => {
        router.push("/dashboard/mentor");
      }, 1500);
      
    } catch (error: any) {
      toast.error("Failed to initialize session: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] p-8">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-orange-500/20">
            <FaChalkboardTeacher />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">Create Session<span className="text-orange-500">.</span></h1>
            <p className="text-gray-400 font-medium text-sm">Design your knowledge exchange event.</p>
          </div>
        </div>

        <form onSubmit={handleCreateSession} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-2">Topic Title</label>
            <input 
              required
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-orange-500 outline-none transition-all font-semibold"
              placeholder="e.g., Advanced React Patterns"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-2">
                <FaClock className="inline mr-1"/> Date
              </label>
              <input 
                type="date"
                required
                // 3. This physically prevents selecting past dates in the browser calendar
                min={today} 
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-orange-500 outline-none transition-all font-semibold"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-2">Start Time</label>
              <input 
                type="time"
                required
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-orange-500 outline-none transition-all font-semibold"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-2">Session Description</label>
            <textarea 
              rows={4}
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-orange-500 outline-none transition-all font-medium"
              placeholder="What will the scholars learn?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-5 rounded-2xl bg-[#1A0A2E] text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-black hover:scale-[1.01] active:scale-95 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" /> BROADCASTING...
              </>
            ) : "Launch Session →"}
          </button>
        </form>
      </div>
    </div>
  );
}
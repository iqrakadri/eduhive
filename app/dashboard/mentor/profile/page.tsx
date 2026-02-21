"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaSave, FaUserCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function MentorProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    expertise: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth.currentUser) return;
      const docRef = doc(db, "mentors", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          fullName: data.fullName || "",
          bio: data.bio || "",
          expertise: data.expertise?.join(", ") || ""
        });
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "mentors", auth.currentUser!.uid);
      await updateDoc(docRef, {
        fullName: formData.fullName,
        bio: formData.bio,
        expertise: formData.expertise.split(",").map(i => i.trim())
      });
      toast.success("Identity Updated!");
      router.push("/dashboard/mentor");
    } catch (error) {
      toast.error("Failed to update.");
    }
  };

  if (loading) return <div className="p-10 font-black uppercase tracking-widest text-orange-500">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-[#FDFCFB] p-8 lg:p-20 font-sans">
      <Toaster />
      <button onClick={() => router.back()} className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-black mb-10">
        <FaArrowLeft /> Back to Command Center
      </button>

      <div className="max-w-2xl bg-white p-12 rounded-[3rem] border border-orange-100 shadow-xl shadow-orange-500/5">
        <div className="flex items-center gap-6 mb-10">
          <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center text-orange-500 text-4xl">
            <FaUserCircle />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter">Edit Profile<span className="text-orange-500">.</span></h1>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Update your Mentor ID</p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-orange-500 ml-2">Full Name</label>
            <input value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-orange-500 font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-orange-500 ml-2">Expertise (Comma separated)</label>
            <input value={formData.expertise} onChange={(e) => setFormData({...formData, expertise: e.target.value})} className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-orange-500 font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-orange-500 ml-2">Professional Bio</label>
            <textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} rows={4} className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-orange-500 font-bold" />
          </div>
          <button type="submit" className="w-full py-5 bg-[#1A0A2E] text-white rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-orange-500 transition-all flex items-center justify-center gap-3">
            Save Changes <FaSave />
          </button>
        </form>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaLightbulb, FaArrowLeft } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { db } from "@/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function MentorRegistrationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!uid) return toast.error("Session expired.");
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      // RULE CHECK: Prevent Student from becoming Mentor
      const studentDoc = await getDoc(doc(db, "students", uid));
      if (studentDoc.exists()) {
        setLoading(false);
        return toast.error("This account is already registered as a Student.");
      }

      await setDoc(doc(db, "mentors", uid), {
        fullName: formData.get("name"),
        email: email,
        phone: formData.get("phone"),
        profession: formData.get("profession"),
        domain: formData.get("domain"),
        language: formData.get("language"),
        role: "mentor",
        createdAt: new Date().toISOString(),
      });

      toast.success("Mentor Profile Activated!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-6 font-sans">
      <Toaster position="top-right" />
      <div className="grid lg:grid-cols-2 w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-xl border border-white">
        
        {/* FORM SIDE */}
        <div className="p-12">
          <button onClick={() => router.push("/signup")} className="text-gray-400 text-xs font-bold mb-6 flex items-center gap-2 hover:text-orange-500 transition-colors">
            <FaArrowLeft /> BACK
          </button>
          
          <h2 className="text-4xl font-bold mb-2">Mentor Registration<span className="text-orange-500">.</span></h2>
          <p className="text-gray-500 mb-8">Join EduHive and start guiding the next generation.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <input name="name" placeholder="Full Name" required className="w-full p-4 rounded-xl border border-gray-200 focus:border-orange-500 outline-none" />
              <input value={email || ""} readOnly className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 text-gray-400" />
            </div>

            <input name="phone" placeholder="Phone Number" required className="w-full p-4 rounded-xl border border-gray-200 focus:border-orange-500 outline-none" />

            <select name="profession" required className="w-full p-4 rounded-xl border border-gray-200 focus:border-orange-500 outline-none bg-white">
              <option value="">Select Profession</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Employee">Employee</option>
            </select>

            <input name="domain" placeholder="Domain Expertise (e.g., React, AI)" required className="w-full p-4 rounded-xl border border-gray-200 focus:border-orange-500 outline-none" />
            <input name="language" placeholder="Preferred Language" required className="w-full p-4 rounded-xl border border-gray-200 focus:border-orange-500 outline-none" />

            <button disabled={loading} className="w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg hover:opacity-90 transition-all">
              {loading ? "Activating..." : "REGISTER AS MENTOR"}
            </button>
          </form>
        </div>

        {/* PROMO SIDE */}
        <div className="bg-[#0b0220] text-white p-14 flex flex-col justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-xl mb-10">
            <FaLightbulb size={30} />
          </div>
          <p className="tracking-widest text-sm text-gray-400 mb-10 font-bold uppercase">EDUHIVE SYSTEM V2.0</p>
          <div className="text-6xl leading-tight font-bold">Empower<br/><span className="text-orange-500">future</span><br/>leaders.</div>
        </div>
      </div>
    </div>
  );
}
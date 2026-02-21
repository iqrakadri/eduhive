"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FFF8F0] px-6">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl">
        
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account 🚀
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold hover:scale-105 transition">
            Register
          </button>
        </div>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-pink-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

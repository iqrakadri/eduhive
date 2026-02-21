"use client";

import { motion } from "framer-motion";
import Link from "next/link"; // 1. IMPORT THIS
import { resources } from "@/data/resources"; // 2. IMPORT YOUR DATA

export default function MasonryGrid() {
  return (
    <section className="px-6 md:px-10 py-16">
      <h2 className="text-3xl font-bold mb-10 text-center text-[#1A0A2E]">
        🔥 Trending Resources
      </h2>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        {resources.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            className="mb-6 break-inside-avoid rounded-2xl p-6 bg-white/70 backdrop-blur-lg shadow-lg hover:shadow-2xl transition border border-white/50"
          >
            <h3 className="text-xl font-semibold mb-2 text-[#1A0A2E]">
              {item.title}
            </h3>

            <p className="text-sm text-gray-600">{item.category}</p>

            {/* 3. WRAP THE BUTTON IN A LINK */}
            <Link href={`/resources/${item.id}`}>
              <button className="mt-4 w-full px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white text-sm font-semibold hover:scale-105 transition cursor-pointer">
                View Resource
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
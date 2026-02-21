"use client";

import { motion } from "framer-motion";

export default function FloatingBlobs() {
  return (
    <>
      {/* Blob 1 */}
      <motion.div
        className="pointer-events-none absolute -top-32 -left-32 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Blob 2 */}
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-teal-300/30 rounded-full blur-3xl"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </>
  );
}

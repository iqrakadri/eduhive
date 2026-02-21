"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/* 🌌 Mouse Glow */
export function MouseGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{
        left: smoothX,
        top: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed z-0 w-[280px] h-[280px] rounded-full
                 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-orange-400/20
                 blur-3xl"
    />
  );
}

/* 💎 Tilt Card */
export function TiltCard({ children }: { children: React.ReactNode }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothX = useSpring(rotateX, { stiffness: 120, damping: 15 });
  const smoothY = useSpring(rotateY, { stiffness: 120, damping: 15 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * 12);
    rotateX.set(-(py - 0.5) * 12);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX: smoothX,
        rotateY: smoothY,
        transformPerspective: 1000,
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

/* ✨ Sparkles — fixed for hydration */
export function Sparkles() {
  const [positions, setPositions] = useState<number[]>([]);

  useEffect(() => {
    // Generate 14 random positions only on the client
    const pos = Array.from({ length: 14 }, () => Math.random() * 100);
    setPositions(pos);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {positions.map((left, i) => (
        <motion.span
          key={i}
          className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full blur-[1px]"
          style={{ left: `${left}%`, bottom: "-10px" }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: [0, -50, 0] }}
          transition={{ repeat: Infinity, duration: 2 + Math.random() }}
        />
      ))}
    </div>
  );
}

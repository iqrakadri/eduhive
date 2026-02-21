import type { Metadata, Viewport } from "next"; // Added Viewport
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToasterClient from "./ToasterClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Updated Metadata for PWA and SEO
export const metadata: Metadata = {
  title: "EduHive | Gamified Learning",
  description: "The world's first decentralized network for gamified learning.",
  manifest: "/manifest.json", // Essential for Offline/PWA
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EduHive",
  },
};

// 2. Added Viewport to control how it looks on phones
export const viewport: Viewport = {
  themeColor: "#1A0A2E", // Matches your homepage brand
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon / PWA link fallback */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-orange-500 selection:text-white`}>
        {/* Client-only toast/confetti */}
        <ToasterClient />

        {/* 3. Wrap children in a div to ensure background consistency */}
        <div className="min-h-screen bg-[#FFF8F0]">
          {children}
        </div>
      </body>
    </html>
  );
}
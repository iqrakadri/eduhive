import { resources } from "@/data/resources";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaCheckCircle, FaBookOpen } from "react-icons/fa";

// This tells Next.js to pre-build these pages for offline use
export async function generateStaticParams() {
  return resources.map((res) => ({
    id: res.id.toString(),
  }));
}

export default function ResourcePage({ params }: { params: { id: string } }) {
  const resource = resources.find((r) => r.id === parseInt(params.id));

  if (!resource) notFound();

  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#1A0A2E] font-sans">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 flex items-center px-6 justify-between">
        <Link href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-orange-500 transition-colors">
          <FaArrowLeft /> Back to Hive
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Available Offline</span>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="mb-12">
          <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em]">{resource.category}</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mt-4 mb-6 leading-none">
            {resource.title}
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed font-medium">
            {resource.description}
          </p>
        </header>

        {/* Study Content Body */}
        <article className="bg-white rounded-[3rem] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-white">
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-gray-50">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
              <FaBookOpen />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Study Node Content</p>
          </div>

          {/* This renders the text from your resources.ts */}
          <div className="prose prose-orange max-w-none">
            <div className="whitespace-pre-wrap text-lg leading-relaxed text-gray-700 font-medium">
              {resource.content}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="mt-16 p-8 rounded-[2rem] bg-orange-50 border border-orange-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-black uppercase text-orange-600 tracking-widest mb-1">Finish this node</p>
              <p className="text-xl font-black text-[#1A0A2E]">Claim {resource.xpValue} XP Rewards</p>
            </div>
            <button className="group flex items-center gap-3 px-8 py-4 bg-[#1A0A2E] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-orange-900/10">
              Complete Lesson <FaCheckCircle className="text-emerald-400 group-hover:scale-125 transition-transform" />
            </button>
          </div>
        </article>
      </div>
    </main>
  );
}
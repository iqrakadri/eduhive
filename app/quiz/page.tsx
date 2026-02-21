"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FaBrain, FaBolt, FaTrophy, FaArrowLeft, FaSync } from "react-icons/fa";
import Link from "next/link";

// Categories from your HTML file
const CATEGORIES = [
  { id: "9", name: "General", icon: "🧠" },
  { id: "18", name: "Computers", icon: "💻" },
  { id: "19", name: "Math", icon: "🔢" },
  { id: "22", name: "Geography", icon: "🌍" },
  { id: "23", name: "History", icon: "📜" },
  { id: "21", name: "Sports", icon: "⚽" },
];

export default function QuizPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "loading" | "playing" | "finished">("idle");
  const [difficulty, setDifficulty] = useState("medium");
  const [category, setCategory] = useState("9");
  const [sessionToken, setSessionToken] = useState("");
  const [showCoin, setShowCoin] = useState(false);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);

  // 1. Initialize Session Token (Hackathon Pro Tip: prevents duplicate questions)
  useEffect(() => {
    fetch("https://opentdb.com/api_token.php?command=request")
      .then((res) => res.json())
      .then((data) => setSessionToken(data.token));
  }, []);

  const playCoinSound = () => {
    const audio = new Audio("/coins.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {});
  };

  // 2. Fetch Questions
  const startQuiz = async () => {
    setGameState("loading");
    try {
      const url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple&token=${sessionToken}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.response_code === 0) {
        const formatted = data.results.map((q: any) => ({
          question: q.question,
          correct: q.correct_answer,
          answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        }));
        setQuestions(formatted);
        setGameState("playing");
        setCurrentIdx(0);
        setScore(0);
      } else {
        throw new Error("Token expired or Category empty");
      }
    } catch (err) {
      toast.error("Trivia node offline. Try another category.");
      setGameState("idle");
    }
  };

  // 3. Handle Answer
  const handleAnswer = (answer: string) => {
    if (selectedAns) return; // Prevent double clicking
    setSelectedAns(answer);
    
    const isCorrect = answer === questions[currentIdx].correct;

    if (isCorrect) {
      setScore((s) => s + 100);
      setShowCoin(true);
      playCoinSound();
      toast.success("Correct Node! +100 XP", {
        icon: '🍯',
        style: { borderRadius: '15px', background: '#1A0A2E', color: '#fff' }
      });
      setTimeout(() => setShowCoin(false), 1000);
    } else {
      toast.error(`Faulty Logic. Correct: ${questions[currentIdx].correct}`, {
        style: { borderRadius: '15px' }
      });
    }

    // Move Forward
    setTimeout(() => {
      setSelectedAns(null);
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(currentIdx + 1);
      } else {
        setGameState("finished");
      }
    }, 1500);
  };

  return (
    <main className="relative min-h-screen bg-[#FFF8F0] text-[#1A0A2E] overflow-hidden font-sans pt-24 pb-12">
      <Toaster position="top-center" />
      
      {/* Background UI */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-200/30 blur-[120px] rounded-full" />
      </div>

      <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-all">
            <FaArrowLeft />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Exit Node</span>
        </Link>
        <div className="bg-white/80 backdrop-blur px-6 py-2 rounded-2xl shadow-sm border border-white">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Session XP: </span>
          <span className="text-lg font-black text-orange-500">🍯 {score}</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <AnimatePresence mode="wait">
          {/* IDLE STATE: Selection UI */}
          {gameState === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-12">
                Knowledge <span className="text-orange-500">Sprints.</span>
              </h1>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                {CATEGORIES.map((cat) => (
                  <button 
                    key={cat.id} 
                    onClick={() => setCategory(cat.id)}
                    className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 ${category === cat.id ? 'bg-white border-orange-500 shadow-xl scale-105' : 'bg-white/40 border-transparent hover:border-purple-200'}`}
                  >
                    <span className="text-4xl">{cat.icon}</span>
                    <span className="font-black text-[10px] uppercase tracking-widest">{cat.name}</span>
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {['easy', 'medium', 'hard'].map((d) => (
                  <button 
                    key={d} onClick={() => setDifficulty(d)}
                    className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${difficulty === d ? 'bg-[#1A0A2E] text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <button 
                onClick={startQuiz}
                className="group relative px-12 py-6 bg-[#1A0A2E] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">Initiate Sprint <FaBolt className="text-orange-400" /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>
            </motion.div>
          )}

          {/* LOADING STATE */}
          {gameState === "loading" && (
            <motion.div key="loading" className="flex flex-col items-center justify-center py-40">
              <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-6" />
              <p className="font-black uppercase tracking-[0.3em] text-gray-400 text-xs">Syncing with Knowledge Base...</p>
            </motion.div>
          )}

          {/* PLAYING STATE */}
          {gameState === "playing" && (
            <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <div className="text-[10px] font-black uppercase tracking-widest text-orange-500">
                  Node {currentIdx + 1} / 5
                </div>
                <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${((currentIdx + 1) / 5) * 100}%` }} 
                    className="h-full bg-orange-500" 
                  />
                </div>
              </div>

              <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-white mb-8">
                <h2 className="text-3xl font-black leading-tight text-[#1A0A2E] mb-12" 
                    dangerouslySetInnerHTML={{ __html: questions[currentIdx].question }} />
                
                <div className="grid gap-4">
                  {questions[currentIdx].answers.map((ans: string, i: number) => {
                    const isCorrect = ans === questions[currentIdx].correct;
                    const isSelected = selectedAns === ans;
                    
                    let btnStyle = "bg-gray-50 border-gray-50 text-[#1A0A2E]";
                    if (isSelected) {
                      btnStyle = isCorrect ? "bg-emerald-500 border-emerald-500 text-white" : "bg-rose-500 border-rose-500 text-white";
                    } else if (selectedAns && isCorrect) {
                      btnStyle = "bg-emerald-100 border-emerald-200 text-emerald-700";
                    }

                    return (
                      <button 
                        key={i} 
                        onClick={() => handleAnswer(ans)}
                        disabled={!!selectedAns}
                        className={`w-full text-left p-6 rounded-2xl border-2 font-bold transition-all transform active:scale-[0.98] ${btnStyle}`}
                        dangerouslySetInnerHTML={{ __html: ans }}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* FINISHED STATE */}
          {gameState === "finished" && (
            <motion.div key="finished" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-20">
              <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <FaTrophy className="text-6xl text-orange-500" />
              </div>
              <h2 className="text-5xl font-black mb-4">Sprint Complete</h2>
              <p className="text-gray-400 font-bold uppercase tracking-widest mb-12">Session Reward: {score} XP</p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => setGameState("idle")}
                  className="px-10 py-4 bg-[#1A0A2E] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center gap-3"
                >
                  <FaSync /> New Sprint
                </button>
                <Link href="/rewards">
                  <button className="px-10 py-4 bg-white border border-gray-100 rounded-2xl font-black uppercase tracking-widest shadow-sm">
                    Claim Rewards
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* COIN ANIMATION */}
      <AnimatePresence>
        {showCoin && (
          <motion.div
            initial={{ x: "50vw", y: "50vh", scale: 0, opacity: 1 }}
            animate={{ x: "90vw", y: "5vh", scale: [1, 1.2, 0.2], opacity: [1, 1, 0] }}
            transition={{ duration: 1, ease: "backIn" }}
            className="fixed z-[100] w-12 h-12 bg-orange-400 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white font-black"
          >
            🍯
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
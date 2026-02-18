"use client";

import React from "react";
import Link from "next/link";

type Feature = {
  title: string;
  description: string;
  icon: string;
  path?: string;
};

const features: Feature[] = [
  { 
    title: "Learn by playing", 
    description: "Master English through interactive challenges that make daily practice feel like a rewarding hobby.", 
    icon: "🎮", 
    path: "/game" 
  },
  { 
    title: "Natural Expressions", 
    description: "Move beyond textbook grammar. Master the phrasal verbs and idioms native speakers actually use.", 
    icon: "📖",
    path: "/Levels"
  },
  { 
    title: "Vocabulary in Use", 
    description: "Context is everything. Learn new terms through real-world scenarios designed for immediate use.", 
    icon: "🗣️",
    path: "/Levels"
  },
  { 
    title: "Placement Test", 
    description: "Find your perfect starting point in 3 minutes. Stop guessing and start growing effectively.", 
    icon: "📝",
    path: "/placement-test"
  },
  { 
    title: "Levels that make sense", 
    description: "Follow a professional roadmap from A1 to C1, aligned with global language proficiency standards.", 
    icon: "🧩", 
    path: "/Levels" 
  },
  { 
    title: "Active Pronunciation", 
    description: "Listen, repeat, and refine. Build your speaking confidence with native-like audio for every word.", 
    icon: "🎙️" 
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FFF5F7] overflow-x-hidden">
      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-gradient-text {
          background: linear-gradient(to right, #4f46e5, #9333ea, #db2777, #4f46e5);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientFlow 8s ease infinite;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .glass-card:hover {
          background: white;
          transform: translateY(-10px);
          box-shadow: 0 20px 40px -10px rgba(147, 51, 234, 0.1);
          border-color: rgba(147, 51, 234, 0.2);
        }
        .btn-gradient {
          background: linear-gradient(to right, #9333ea, #db2777);
          transition: all 0.3s ease;
        }
        .btn-gradient:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(147, 51, 234, 0.25);
        }
      `}</style>

      {/* Hero Section */}
      <section className="px-6 pt-28 pb-20 text-center max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-800 mb-6 leading-tight tracking-tight">
          Unlock your fluency <br />
          <span className="animated-gradient-text tracking-tighter">the easy way</span>
        </h1>
        <p className="text-base md:text-xl text-neutral-500/80 mb-10 max-w-2xl mx-auto font-medium">
          ColorWords turns English complexity into a calm, effective journey toward your confidence.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/game" className="btn-gradient px-9 py-4 text-white rounded-2xl font-bold text-base shadow-lg active:scale-95 transition-all">
            Start playing 🎮
          </Link>
          <Link href="/about" className="px-9 py-4 bg-white/80 backdrop-blur-sm text-neutral-600 rounded-2xl font-bold text-base border border-neutral-200/50 hover:bg-white transition-all active:scale-95 shadow-sm">
            Back home
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 pb-32 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="glass-card group p-8 rounded-[35px] flex flex-col"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white to-purple-50 flex items-center justify-center text-2xl mb-6 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-neutral-500 text-base leading-relaxed mb-6 flex-grow">
                {feature.description}
              </p>
              {feature.path && (
                <Link 
                  href={feature.path} 
                  className="group/link text-xs font-bold text-purple-500 flex items-center gap-2 tracking-[0.15em] uppercase transition-all"
                >
                  Explore Now 
                  <span className="group-hover/link:translate-x-1.5 transition-transform">→</span>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Tip */}
        <div className="mt-16 p-7 rounded-[30px] bg-white/40 backdrop-blur-md border border-white/30 text-center max-w-xl mx-auto shadow-sm">
          <p className="text-sm text-purple-600/80 font-medium italic">
            ✨ Pro Tip: Consistency beats intensity. 5 minutes a day is all you need.
          </p>
        </div>
      </section>
    </main>
  );
}
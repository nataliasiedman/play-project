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
    path: "/expression"
    
  },
  { 
    title: "Vocabulary in Use", 
    description: "Context is everything. Learn new terms through real-world scenarios designed for immediate use.", 
    icon: "🗣️",
    path: "/vocabulary"
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
    path: "/vocabulary"

  },
  { 
    title: "Active Pronunciation", 
    description: "Listen, repeat, and refine. Build your speaking confidence with native-like audio for every word.", 
    icon: "🎙️",
    path: "/pronunciation" // Certifique-se que a pasta em 'app' tem este nome
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FFF5F7] overflow-x-hidden">
      {/* Estilos Globais para Animações */}
      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-gradient-text {
          background: linear-gradient(to right, #2563eb, #9333ea, #db2777, #2563eb);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientFlow 6s ease infinite;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .glass-card:hover {
          background: white;
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(147, 51, 234, 0.15);
          border-color: rgba(147, 51, 234, 0.3);
        }
        .btn-gradient {
          background: linear-gradient(to right, #9333ea, #db2777);
          transition: all 0.3s ease;
        }
        .btn-gradient:hover {
          filter: brightness(1.1);
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(147, 51, 234, 0.3);
        }
      `}</style>

      {/* Hero Section */}
      <section className="px-6 pt-24 pb-20 text-center max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-black text-neutral-900 mb-8 leading-[1.05] tracking-tight">
          Unlock your fluency <br />
          <span className="animated-gradient-text">the easy way</span>
        </h1>
 
        
        <div className="flex flex-wrap justify-center gap-5">
          <Link href="/game" className="btn-gradient px-10 py-5 text-white rounded-3xl font-extrabold text-lg shadow-xl active:scale-95">
            Start playing 🎮
          </Link>
        
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="glass-card group p-10 rounded-[40px] flex flex-col"
            >
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center text-3xl mb-8 group-hover:rotate-6 transition-transform shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black text-neutral-900 mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-neutral-600 leading-relaxed text-lg mb-8 flex-grow">
                {feature.description}
              </p>
              {feature.path && (
                <Link 
                  href={feature.path} 
                  className="group/link text-sm font-black text-purple-600 flex items-center gap-2 tracking-widest uppercase transition-all"
                >
                  Explore Now 
                  <span className="group-hover/link:translate-x-2 transition-transform">→</span>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Tip */}
        <div className="mt-16 p-8 rounded-[35px] bg-white/30 backdrop-blur-lg border border-white/20 text-center max-w-2xl mx-auto">
          <p className="text-base text-purple-800 font-semibold italic">
            ✨ Pro Tip: Consistency beats intensity. 5 minutes every day is the secret to real fluency.
          </p>
        </div>
      </section>
    </main>
  );
}
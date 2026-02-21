"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VocabularyPage() {
  const router = useRouter();

  const vocabularyScenarios = [
    {
      title: "The Restaurant",
      icon: "🍽️",
      level: "Intermediate",
      description: "Learn how to order, ask for the bill, and complain about food politely.",
      color: "bg-orange-500"
    },
    {
      title: "Office Talk",
      icon: "💻",
      level: "Advanced",
      description: "Master business terms like 'deadline', 'feedback', and 'workflow'.",
      color: "bg-blue-500"
    },
    {
      title: "Travel & Airport",
      icon: "✈️",
      level: "Beginner",
      description: "Essential phrases for check-in, security, and finding your gate.",
      color: "bg-emerald-500"
    },
    {
      title: "Daily Shopping",
      icon: "🛍️",
      level: "Beginner",
      description: "How to ask for prices, sizes, and different colors at the mall.",
      color: "bg-pink-500"
    }
  ];

  return (
    <main className="min-h-screen bg-[#FFF5F7] pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Botão de Voltar */}
        <button 
          onClick={() => router.back()} 
          className="inline-block mb-8 text-neutral-400 hover:text-purple-600 font-bold transition-colors"
        >
          ← Back Home
        </button>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-800 mb-4">
            Vocabulary <span className="text-purple-600">in Use</span> 🗣️
          </h1>
          <p className="text-lg text-neutral-500 font-medium">
            Don't just learn words, learn how to use them in real life.
          </p>
        </header>

        {/* Grid de Scenarios */}
        <div className="grid md:grid-cols-2 gap-8">
          {vocabularyScenarios.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white p-10 rounded-[40px] shadow-sm border-b-8 border-neutral-100 hover:border-purple-400 transition-all hover:translate-y-[-5px] cursor-pointer group"
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <span className="text-xs font-black text-purple-500 uppercase tracking-[2px]">
                {item.level}
              </span>
              <h2 className="text-2xl font-extrabold text-neutral-800 mt-2 mb-3">
                {item.title}
              </h2>
              <p className="text-neutral-500 mb-8 leading-relaxed">
                {item.description}
              </p>
              <button className="text-sm font-black text-purple-600 group-hover:translate-x-2 transition-transform uppercase tracking-widest">
                Learn Scenario →
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
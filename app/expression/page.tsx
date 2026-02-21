"use client";

import React from "react";
import Link from "next/link";

export default function SelectionPage() {
  return (
    <main className="min-h-screen bg-[#FFF5F7] pt-28 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Agora com o termo mais natural: Back Home */}
        <Link href="/" className="inline-block mb-8 text-neutral-400 hover:text-purple-600 font-bold transition-colors">
          ← Back Home
        </Link>

        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-800 mb-4">
            What do you want to <span className="text-purple-600">learn today?</span>
          </h1>
          <p className="text-lg text-neutral-500 mb-12 font-medium">
            Choose your path to master natural English.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card Phrasal Verbs */}
            <Link href="/expression/phrasal-verb" className="group">
              <div className="bg-white p-10 rounded-[40px] shadow-sm border-2 border-transparent hover:border-purple-200 transition-all hover:translate-y-[-10px]">
                <div className="text-6xl mb-6">🎯</div>
                <h2 className="text-2xl font-bold text-neutral-800 mb-3">Phrasal Verbs</h2>
                <p className="text-neutral-500">Master action-based expressions like "get over" and "break down".</p>
              </div>
            </Link>

            {/* Card Idioms */}
            <Link href="/expression/idioms" className="group">
              <div className="bg-white p-10 rounded-[40px] shadow-sm border-2 border-transparent hover:border-fuchsia-200 transition-all hover:translate-y-[-10px]">
                <div className="text-6xl mb-6">🎨</div>
                <h2 className="text-2xl font-bold text-neutral-800 mb-3">Idioms</h2>
                <p className="text-neutral-500">Learn colorful expressions like "piece of cake" and "cold feet".</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const pronunciationCards = [
  // --- GRUPO 1: OS CLÁSSICOS DIFÍCEIS ---
  { word: "Thorough", phonetic: "/ˈθʌr.ə/", meaning: "Detailed and careful", example: "The police performed a thorough investigation." },
  { word: "Schedule", phonetic: "/ˈskedʒ.uːl/", meaning: "A plan that lists all the work that you have to do", example: "I have a very tight schedule today." },
  { word: "World", phonetic: "/wɜːrld/", meaning: "The earth and all its people", example: "She wants to travel around the world." },
  { word: "Comfortable", phonetic: "/ˈkʌm.fɚ.t̬ə.bəl/", meaning: "Relaxed and cozy", example: "These new shoes are very comfortable." },
  { word: "Queue", phonetic: "/kjuː/", meaning: "A line of people waiting", example: "We had to wait in a long queue for tickets." },
  { word: "Subtle", phonetic: "/ˈsʌt̬.əl/", meaning: "Not obvious; delicate", example: "There is a subtle difference between the two colors." },
  { word: "Architecture", phonetic: "/ˈɑːr.kə.tek.tʃɚ/", meaning: "Design of buildings", example: "He is studying modern architecture." },
  { word: "Wednesday", phonetic: "/ˈwenz.deɪ/", meaning: "The day after Tuesday", example: "The meeting is next Wednesday." },

  // --- GRUPO 2: SONS DE 'TH' E 'R' ---
  { word: "Through", phonetic: "/θruː/", meaning: "From one side to the other", example: "We drove through the tunnel." },
  { word: "Throughout", phonetic: "/θruːˈaʊt/", meaning: "In every part of a place", example: "It rained throughout the day." },
  { word: "Thought", phonetic: "/θɔːt/", meaning: "Past of 'think'", example: "I thought you were at home." },
  { word: "Entrepreneur", phonetic: "/ˌɑːn.trə.prəˈnɝː/", meaning: "Someone who starts a business", example: "She is a successful entrepreneur." },
  { word: "Literature", phonetic: "/ˈlɪt̬.ɚ.ə.tʃɚ/", meaning: "Written works (books, etc)", example: "I love classic English literature." },
  
  // --- GRUPO 3: VOGAIS E TRAVA-LÍNGUAS ---
  { word: "Colonel", phonetic: "/ˈkɝː.nəl/", meaning: "A high military rank", example: "The colonel gave the orders." },
  { word: "Recipe", phonetic: "/ˈres.ə.pi/", meaning: "Instructions for cooking", example: "This is a secret family recipe." },
  { word: "Hierarchy", phonetic: "/ˈhaɪ.rɑːr.ki/", meaning: "System of levels or ranks", example: "There is a clear hierarchy in the office." },
  { word: "Clothes", phonetic: "/kloʊðz/", meaning: "Things you wear", example: "I need to wash my clothes." },
  { word: "Island", phonetic: "/ˈaɪ.lənd/", meaning: "Land surrounded by water", example: "They live on a small island." },
  { word: "Listen", phonetic: "/ˈlɪs.ən/", meaning: "To pay attention to sound", example: "Please listen to me carefully." },

  // --- GRUPO 4: TERMINAÇÕES COMPLEXAS ---
  { word: "Daughter", phonetic: "/ˈdɔː.t̬ɚ/", meaning: "A female child", example: "His daughter is five years old." },
  { word: "Chaos", phonetic: "/ˈkeɪ.ɑːs/", meaning: "Total confusion", example: "The room was in total chaos." },
  { word: "Choir", phonetic: "/kwaɪɚ/", meaning: "A group of singers", example: "She sings in the church choir." },
  { word: "Mischievous", phonetic: "/ˈmɪs.tʃə.vəs/", meaning: "Naughty or playful", example: "The cat is very mischievous." },
  { word: "Specific", phonetic: "/spəˈsɪf.ɪk/", meaning: "Particular or exact", example: "Can you be more specific?" },
  { word: "Vegetable", phonetic: "/ˈvedʒ.tə.bəl/", meaning: "Plant used as food", example: "Fresh vegetables are healthy." },

  // --- GRUPO 5: DESAFIOS FINAIS ---
  { word: "Iron", phonetic: "/ˈaɪ.ɚn/", meaning: "A type of metal", example: "The gate is made of iron." },
  { word: "Successful", phonetic: "/səkˈses.fəl/", meaning: "Achieving results", example: "He is a successful lawyer." },
  { word: "Culture", phonetic: "/ˈkʌl.tʃɚ/", meaning: "Way of life of a group", example: "I want to learn about Japanese culture." },
  { word: "Development", phonetic: "/dɪˈvel.əp.mənt/", meaning: "Process of growing", example: "The company focuses on staff development." },
  { word: "Sixth", phonetic: "/sɪksθ/", meaning: "Number 6 in a sequence", example: "It's his sixth birthday." }
];

export default function PronunciationPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const speak = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % pronunciationCards.length);
    }, 150);
  };

  const currentCard = pronunciationCards[currentIndex];

  return (
    <main className="min-h-screen bg-[#F0F7FF] pt-24 pb-12 px-6 flex flex-col items-center font-sans">
      <div className="w-full max-w-md">
        
        <header className="flex justify-between items-center mb-8">
          <button onClick={() => router.back()} className="text-blue-500 font-bold hover:underline">
            ← Back Home
          </button>
          <div className="bg-white px-4 py-1 rounded-full shadow-sm border border-blue-100 font-bold text-blue-600 text-sm">
            {currentIndex + 1} / {pronunciationCards.length}
          </div>
        </header>

        <div className="relative h-[480px] w-full [perspective:1000px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
          <div className="absolute -inset-2 bg-blue-400/10 rounded-[45px] blur-2xl"></div>
          
          <div className={`relative h-full w-full rounded-[40px] shadow-2xl transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
            
            {/* FRONT (Blue) */}
            <div className="absolute inset-0 h-full w-full rounded-[40px] bg-blue-600 p-5 [backface-visibility:hidden] border-2 border-white/10">
              <div className="h-full w-full border-4 border-white/20 rounded-[30px] flex flex-col items-center justify-center relative text-center">
                <div className="absolute top-8 left-8 text-white opacity-40">🎙️</div>
                
                <h2 className="text-3xl font-black text-white mb-4 px-4 uppercase tracking-tighter">
                  {currentCard.word}
                </h2>

                <div 
                  onClick={(e) => { e.stopPropagation(); speak(currentCard.word); }}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full font-mono text-xl backdrop-blur-md transition-all flex items-center gap-3 border border-white/10"
                >
                  {currentCard.phonetic} 🔊
                </div>

                <div className="absolute bottom-12 text-center w-full">
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-[4px]">Click to reveal meaning</p>
                </div>
              </div>
            </div>

            {/* BACK (White) */}
            <div className="absolute inset-0 h-full w-full rounded-[40px] bg-white p-8 [backface-visibility:hidden] [transform:rotateY(180deg)] border-4 border-blue-100">
              <div className="flex flex-col h-full justify-center text-center">
                <span className="text-[10px] font-black uppercase tracking-[3px] mb-2 text-blue-500">Meaning</span>
                <h3 className="text-xl font-bold text-neutral-800 mb-6">{currentCard.meaning}</h3>
                
                <div className="h-[2px] w-12 bg-blue-100 mx-auto mb-6" />
                
                <span className="text-[10px] font-black uppercase tracking-[3px] mb-2 text-blue-500">Example</span>
                <p className="text-neutral-600 italic text-md leading-relaxed">"{currentCard.example}"</p>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); speak(currentCard.word); }}
                  className="mt-8 text-blue-600 font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                >
                  Listen Again 🔊
                </button>
              </div>
            </div>
          </div>
        </div>

        <button onClick={nextCard} className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[25px] shadow-lg transition-all active:scale-95 uppercase tracking-widest">
          Next Word →
        </button>
      </div>
    </main>
  );
}
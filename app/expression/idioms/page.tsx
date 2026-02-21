"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const idiomCards = [
  { word: "Piece of cake", meaning: "Something that is very easy to do", example: "The exam was a piece of cake; I finished it in 20 minutes." },
  { word: "Break a leg", meaning: "A way to wish someone good luck", example: "I know you can do it! Break a leg at your performance tonight!" },
  { word: "Under the weather", meaning: "Feeling sick or not well", example: "I'm feeling a bit under the weather, so I'll stay home today." },
  { word: "Hit the sack", meaning: "To go to bed in order to sleep", example: "I'm exhausted. It's time for me to hit the sack." },
  { word: "Cost an arm and a leg", meaning: "Something that is very expensive", example: "That new car cost him an arm and a leg." },
  { word: "Once in a blue moon", meaning: "Something that happens very rarely", example: "My sister lives in Alaska, so I only see her once in a blue moon." },
  { word: "The last straw", meaning: "The final problem in a series of problems", example: "When the car broke down, it was the last straw; I decided to sell it." },
  { word: "Bite the bullet", meaning: "To endure a painful or difficult situation", example: "I hate going to the dentist, but I'll just have to bite the bullet." },
  { word: "Spill the beans", meaning: "To reveal a secret", example: "We were planning a surprise, but Sarah spilled the beans." },
  { word: "No pain, no gain", meaning: "You have to work hard for what you want", example: "I'm tired of exercising, but hey, no pain, no gain!" },
  { word: "Call it a day", meaning: "To stop working on something", example: "We've been working for ten hours. Let's call it a day." },
  { word: "Cool as a cucumber", meaning: "To be very calm and relaxed", example: "Even during the crisis, he remained as cool as a cucumber." },
  { word: "Beat around the bush", meaning: "To avoid talking about the main topic", example: "Stop beating around the bush and tell me what you want." },
  { word: "Better late than never", meaning: "It is better to arrive late than not at all", example: "She finally finished the report. Better late than never!" },
  { word: "Cut to the chase", meaning: "To get directly to the point", example: "Stop telling me the details and cut to the chase." },
  { word: "Get out of hand", meaning: "To get out of control", example: "The party got out of hand when too many people arrived." },
  { word: "Hang in there", meaning: "Don't give up", example: "I know work is tough right now, but hang in there." },
  { word: "Let someone off the hook", meaning: "To allow someone to escape punishment", example: "The teacher let him off the hook this time, but warned him." },
  { word: "Pull yourself together", meaning: "To calm down and behave normally", example: "Stop crying and pull yourself together!" },
  { word: "Break the ice", meaning: "To make people feel more comfortable", example: "A joke is a great way to break the ice in a meeting." },
  { word: "A blessing in disguise", meaning: "A misfortune that eventually has good results", example: "Losing that job was a blessing in disguise; I found a better one." },
  { word: "Easy does it", meaning: "To do something slowly and carefully", example: "Easy does it! That glass table is very fragile." },
  { word: "Keep your chin up", meaning: "To remain joyful in a tough situation", example: "Keep your chin up, things will get better soon." },
  { word: "Miss the boat", meaning: "To be too late to take an opportunity", example: "I forgot to apply for the job, and now I've missed the boat." },
  { word: "By the skin of your teeth", meaning: "To just barely succeed in doing something", example: "He passed the test by the skin of his teeth." },
  { word: "Your guess is as good as mine", meaning: "To have no idea about something", example: "What time does the movie start? Your guess is as good as mine." }
];

export default function IdiomsPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % idiomCards.length);
    }, 150); 
  };

  const currentCard = idiomCards[currentIndex];

  return (
    <main className="min-h-screen bg-[#FFF5F7] pt-24 pb-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-md">
        <header className="flex justify-between items-center mb-8">
          <button onClick={() => router.back()} className="text-pink-500 font-bold hover:underline">
            ← Back
          </button>
          <div className="bg-white px-4 py-1 rounded-full shadow-sm border border-pink-100 font-bold text-pink-600 text-sm">
            {currentIndex + 1} / {idiomCards.length}
          </div>
        </header>

        <div className="relative h-[450px] w-full [perspective:1000px] cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
          <div className="absolute -inset-2 bg-pink-400/10 rounded-[45px] blur-2xl group-hover:bg-pink-400/30 transition-all duration-500"></div>
          <div className={`relative h-full w-full rounded-[40px] shadow-2xl transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
            
            <div className="absolute inset-0 h-full w-full rounded-[40px] bg-pink-500 p-5 [backface-visibility:hidden] border-2 border-white/10">
              <div className="h-full w-full border-4 border-white/20 rounded-[30px] flex flex-col items-center justify-center relative">
                <div className="absolute top-6 left-6 text-white font-black text-3xl opacity-40">✦</div>
                <div className="bg-white w-40 h-56 rounded-[100%] rotate-[35deg] flex items-center justify-center shadow-xl border-8 border-pink-50">
                  <span className="-rotate-[35deg] font-black text-2xl text-center px-4 uppercase text-pink-600 leading-tight">
                    {currentCard.word}
                  </span>
                </div>
                <div className="absolute bottom-6 right-6 text-white font-black text-3xl rotate-180 opacity-40">✦</div>
              </div>
            </div>

            <div className="absolute inset-0 h-full w-full rounded-[40px] bg-white p-8 [backface-visibility:hidden] [transform:rotateY(180deg)] border-4 border-pink-100">
              <div className="flex flex-col h-full justify-center text-center">
                <span className="text-xs font-black uppercase tracking-widest mb-2 text-pink-500">Meaning</span>
                <h3 className="text-2xl font-bold text-neutral-800 mb-8">{currentCard.meaning}</h3>
                <div className="h-[2px] w-16 bg-pink-100 mx-auto mb-8" />
                <span className="text-xs font-black uppercase tracking-widest mb-2 text-pink-500">Example</span>
                <p className="text-neutral-600 italic text-lg leading-relaxed">"{currentCard.example}"</p>
              </div>
            </div>

          </div>
        </div>

        <button onClick={nextCard} className="w-full mt-10 bg-pink-500 hover:bg-pink-600 text-white font-black py-5 rounded-[25px] shadow-lg shadow-pink-200/50 transition-all active:scale-95 uppercase tracking-widest">
          Next Card →
        </button>
      </div>
    </main>
  );
}
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const phrasalCards = [
  {
    word: "Get over",
    meaning: "To recover from something",
    example: "It took her a long time to get over the flu.",
  },
  {
    word: "Give up",
    meaning: "To stop trying",
    example: "Don't give up on your dreams!",
  },
  {
    word: "Look for",
    meaning: "To search for something",
    example: "I am looking for my keys. Have you seen them?",
  },
  {
    word: "Run out",
    meaning: "To have no more of something",
    example: "We have run out of milk, I need to buy more.",

  },
 
    { 
      word: "Bring up", 
      meaning: "To mention a topic in a conversation", 
      example: "I didn't want to bring up the budget during the meeting." 
    },
    { 
      word: "Carry on", 
      meaning: "To continue doing something", 
      example: "The students carried on working despite the loud noise." 
    },
    { 
      word: "Call off", 
      meaning: "To cancel something that was planned", 
      example: "They had to call off the football match because of the rain." 
    },
    { 
      word: "Find out", 
      meaning: "To discover a fact or piece of information", 
      example: "I need to find out what time the flight leaves tomorrow." 
    },
    { 
      word: "Get along", 
      meaning: "To have a friendly relationship with someone", 
      example: "I get along very well with my new coworkers." 
    },
    { 
      word: "Go on", 
      meaning: "To continue happening or doing something", 
      example: "Please go on with your story, I am listening." 
    },
    { 
      word: "Grow up", 
      meaning: "To gradually become an adult", 
      example: "He grew up in a small town before moving to the city." 
    },
    { 
      word: "Hold on", 
      meaning: "To wait for a short period of time", 
      example: "Hold on a second, I'll see if the manager is available." 
    },
    { 
      word: "Look after", 
      meaning: "To take care of someone or something", 
      example: "Can you look after my plants while I'm on vacation?" 
    },
    { 
      word: "Pick up", 
      meaning: "To go and get someone or something", 
      example: "I'll pick you up from the airport at 7 PM." 
    },
    { 
      word: "Put off", 
      meaning: "To delay doing something until a later time", 
      example: "We decided to put off the meeting until next week." 
    },
    { 
      word: "Take off", 
      meaning: "To leave the ground (plane) or remove clothing", 
      example: "The plane took off exactly on schedule." 
    },
    { 
      word: "Turn on", 
      meaning: "To start the flow of power to a device", 
      example: "It's getting dark, could you turn on the lights?" 
    },
    { 
      word: "Turn off", 
      meaning: "To stop the flow of power to a device", 
      example: "Don't forget to turn off the computer when you leave." 
    },
    { 
      word: "Wake up", 
      meaning: "To stop sleeping", 
      example: "I usually wake up at 6 AM but stay in bed for a while." 
    },
    { 
      word: "Work out", 
      meaning: "To exercise or to find a solution", 
      example: "I try to work out at the gym at least three times a week." 
    },
    { 
      word: "Break down", 
      meaning: "To stop working because of a mechanical fault", 
      example: "My car broke down on the highway this morning." 
    },
    { 
      word: "Come back", 
      meaning: "To return to a place", 
      example: "When are you coming back from your trip to Italy?" 
    },
    { 
      word: "Check out", 
      meaning: "To look at something to see if you like it", 
      example: "You should check out that new art gallery downtown." 
    },
    { 
      word: "Drop off", 
      meaning: "To take someone to a place and leave them there", 
      example: "I can drop you off at the mall on my way to work." 
    },
    { 
      word: "Fill out", 
      meaning: "To complete a form or document", 
      example: "Please fill out this registration form in capital letters." 
    },
    { 
      word: "Give back", 
      meaning: "To return something to its owner", 
      example: "Has she given back the book you lent her yet?" 
    },
    { 
      word: "Keep on", 
      meaning: "To continue doing something repeatedly", 
      example: "He kept on asking questions even after the class ended." 
    },
    { 
      word: "Look up", 
      meaning: "To search for information in a book or online", 
      example: "If you don't know the word, look it up in the dictionary." 
    },
    { 
      word: "Set up", 
      meaning: "To arrange or organize something", 
      example: "The tech team is setting up the stage for the concert." 
    },
    { 
      word: "Throw away", 
      meaning: "To get rid of something you no longer want", 
      example: "I need to throw away these old magazines to clear some space." 
    }
  ];


export default function PhrasalUnoPage() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % phrasalCards.length);
    }, 150); 
  };

  const currentCard = phrasalCards[currentIndex];

  return (
    <main className="min-h-screen bg-[#F8FAFF] pt-24 pb-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-md">
        <header className="flex justify-between items-center mb-8">
          {/* Substitua o Link por este botão */}
<button 
  onClick={() => router.back()} 
  className="text-indigo-500 font-bold hover:underline transition-all flex items-center gap-1"
>
  ← Back
</button>
          <div className="bg-white px-4 py-1 rounded-full shadow-sm border border-indigo-100 font-bold text-indigo-600 text-sm">
            {currentIndex + 1} / {phrasalCards.length}
          </div>
        </header>

        {/* CARTA ÚNICA INDIGO */}
        <div 
          className="relative h-[450px] w-full [perspective:1000px] cursor-pointer group"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Glow Effect */}
          <div className="absolute -inset-2 bg-indigo-400/10 rounded-[45px] blur-2xl group-hover:bg-indigo-400/30 transition-all duration-500"></div>

          <div className={`relative h-full w-full rounded-[40px] shadow-2xl transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
            
            {/* FRENTE DA CARTA */}
            <div className="absolute inset-0 h-full w-full rounded-[40px] bg-indigo-500 p-5 [backface-visibility:hidden] border-2 border-white/10">
              <div className="h-full w-full border-4 border-white/20 rounded-[30px] flex flex-col items-center justify-center relative">
                
                {/* Ícone sutil no lugar do texto */}
                <div className="absolute top-6 left-6 text-white font-black text-3xl opacity-40">✦</div>
                
                {/* Círculo Central */}
                <div className="bg-white w-40 h-56 rounded-[100%] rotate-[35deg] flex items-center justify-center shadow-xl border-8 border-indigo-50">
                  <span className="-rotate-[35deg] font-black text-2xl text-center px-4 uppercase text-indigo-600 leading-tight">
                    {currentCard.word}
                  </span>
                </div>

                <div className="absolute bottom-6 right-6 text-white font-black text-3xl rotate-180 opacity-40">✦</div>
              </div>
            </div>

            {/* VERSO DA CARTA */}
            <div className="absolute inset-0 h-full w-full rounded-[40px] bg-white p-8 [backface-visibility:hidden] [transform:rotateY(180deg)] border-4 border-indigo-100">
              <div className="flex flex-col h-full justify-center text-center">
                <span className="text-xs font-black uppercase tracking-widest mb-2 text-indigo-500">Meaning</span>
                <h3 className="text-2xl font-bold text-neutral-800 mb-8">{currentCard.meaning}</h3>
                
                <div className="h-[2px] w-16 bg-indigo-100 mx-auto mb-8" />
                
                <span className="text-xs font-black uppercase tracking-widest mb-2 text-indigo-500">Example</span>
                <p className="text-neutral-600 italic text-lg leading-relaxed">"{currentCard.example}"</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTÃO NEXT */}
        <button 
          onClick={nextCard}
          className="w-full mt-10 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-[25px] shadow-lg shadow-indigo-200/50 transition-all active:scale-95 uppercase tracking-widest"
        >
          Next Card →
        </button>

        <p className="text-center mt-6 text-indigo-400 text-sm font-medium">
          Tap the card to reveal. 🌙
        </p>
      </div>
    </main>
  );
}
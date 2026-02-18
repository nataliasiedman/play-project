"use client";
import React, { useState } from "react";
import Link from "next/link";


  
    const questions = [
        // BEGINNER (A1-A2)
        {
          id: 1,
          question: "Which sentence is correct for daily routines?",
          options: ["I goes to work every day", "I go to work every day", "I going to work every day"],
          answer: 1,
          level: "A1"
        },
        {
          id: 2,
          question: "Choose the best word: 'I am ____ than my brother.'",
          options: ["Tall", "Taller", "More tall"],
          answer: 1,
          level: "A2"
        },
        {
          id: 3,
          question: "Where ___ you live?",
          options: ["do", "does", "are"],
          answer: 0,
          level: "A1"
        },
        {
          id: 4,
          question: "I ____ breakfast at 7 AM this morning.",
          options: ["eat", "ate", "eaten"],
          answer: 1,
          level: "A2"
        },
        // INTERMEDIATE (B1-B2)
        {
          id: 5,
          question: "If I _____ more money, I would buy a new car.",
          options: ["Have", "Had", "Will have"],
          answer: 1,
          level: "B1"
        },
        {
          id: 6,
          question: "The project was ____ because of the heavy rain.",
          options: ["Called off", "Called in", "Called out"],
          answer: 0,
          level: "B2"
        },
        {
          id: 7,
          question: "I have been studying English ___ three years.",
          options: ["since", "for", "ago"],
          answer: 1,
          level: "B1"
        },
        {
          id: 8,
          question: "You ____ see a doctor if that cough gets worse.",
          options: ["ought", "should", "would"],
          answer: 1,
          level: "B2"
        },
        // ADVANCED (C1-C2)
        {
          id: 9,
          question: "Which word is a synonym for 'Pivotal'?",
          options: ["Small", "Crucial", "Unnecessary"],
          answer: 1,
          level: "C1"
        },
        {
          id: 10,
          question: "Hardly ____ the office when the phone started ringing.",
          options: ["I had left", "had I left", "I left"],
          answer: 1,
          level: "C1/C2"
        }
      ];


export default function PlacementTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setShowResult(true);
    }
  };

  const getLevel = () => {
    if (score <= 2) return { rank: "A1", title: "Beginner" };
    if (score <= 4) return { rank: "A2", title: "Elementary" };
    if (score <= 6) return { rank: "B1", title: "Intermediate" };
    if (score <= 8) return { rank: "B2", title: "Upper-Intermediate" };
    return { rank: "C1/C2", title: "Advanced / Master" };
  };

  if (showResult) {
    const result = getLevel();
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f7f9] p-6">
        <div className="max-w-md w-full bg-white/70 backdrop-blur-xl border border-white/40 p-10 rounded-[40px] shadow-2xl text-center">
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {result.rank}
          </h1>
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">{result.title}</h2>
          <p className="text-neutral-600 mb-8 leading-relaxed">
            You got {score} out of {questions.length} correct! Start your journey in the {result.title} level.
          </p>
          <Link href="/Levels" className="block w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold shadow-lg shadow-purple-200 transition hover:scale-105 active:scale-95">
            Go to my content →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f7f9] p-6 font-sans">
      {/* Progress Bar */}
      <div className="w-full max-w-lg bg-neutral-200 h-1.5 rounded-full mb-12 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-purple-600 to-pink-600 h-full transition-all duration-500"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="max-w-2xl w-full">
        <span className="text-purple-600 font-bold tracking-widest text-xs uppercase mb-4 block text-center">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <h2 className="text-3xl font-extrabold text-neutral-900 text-center mb-10 leading-tight">
          {questions[currentQuestion].question}
        </h2>

        <div className="grid gap-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="group relative w-full text-left p-6 rounded-3xl bg-white border border-neutral-100 shadow-sm transition-all hover:border-purple-300 hover:shadow-md hover:-translate-y-1 active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-sm font-bold text-neutral-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-lg font-semibold text-neutral-700">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
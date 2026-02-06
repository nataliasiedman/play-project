/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";

type CardColor = "red" | "blue" | "yellow" | "green";

const launchConfetti = () => {
  if (typeof window !== "undefined" && (window as any).confetti) {
    (window as any).confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  }
};

async function fetchRandomWord(level: number): Promise<string> {
  const lengths = { 1: "length=4", 2: "length=7", 3: "length=10", 4: "length=14" };
  const res = await fetch(`https://random-word-api.herokuapp.com/word?${lengths[level as keyof typeof lengths]}`);
  const data = await res.json();
  return data[0];
}

export default function EnglishUnoGame() {
  const [word, setWord] = useState("");
  const [color, setColor] = useState<CardColor | null>(null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(6);
  const [isRoundActive, setIsRoundActive] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [lastLifeLost, setLastLifeLost] = useState<number | null>(null);
  const [hint, setHint] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    script.async = true;
    document.body.appendChild(script);
    const savedHS = localStorage.getItem("colorWords_highScore");
    if (savedHS) setHighScore(parseInt(savedHS));
  }, []);

  const resetGame = () => {
    setScore(0); setLives(6); setGameOver(false); setIsRoundActive(false);
    setWord(""); setSubmittedAnswer(""); setLastLifeLost(null); setHint("");
  };

  const handleLoseLife = () => {
    const currentHeartIndex = lives - 1;
    setLastLifeLost(currentHeartIndex);
    setTimeout(() => {
      setLives((prev) => {
        if (prev <= 1) setGameOver(true);
        return prev - 1;
      });
      setLastLifeLost(null);
    }, 450);
  };

  const fetchHint = async () => {
    if (!word || hint || loading) return;
    setLoading(true);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await res.json();
      if (data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition) {
        setHint(data[0].meanings[0].definitions[0].definition);
        setScore((prev) => prev - 2); // Só desconta se achar a definição
      } else {
        setSubmittedAnswer("No hint available for this word. ⚠️");
      }
    } catch {
      setSubmittedAnswer("Hint service unavailable. ❌");
    } finally {
      setLoading(false);
    }
  };

  async function drawCard() {
    if (gameOver) return;
    if (isRoundActive) setScore((prev) => prev - 1);
    
    setLoading(true); setAnswer(""); setHint(""); setIsShaking(false);
    try {
      const randomWord = await fetchRandomWord(level);
      const colors: CardColor[] = ["red", "blue", "yellow", "green"];
      setWord(randomWord);
      setColor(colors[Math.floor(Math.random() * colors.length)]);
      setIsRoundActive(true);
      setSubmittedAnswer("");
    } catch {
      setSubmittedAnswer("API Error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function submitAnswer() {
    if (!isRoundActive || gameOver || !answer.trim()) return;

    let correct = false;
    const cleanAnswer = answer.trim().toLowerCase();
    const cleanWord = word.toLowerCase();
    const wordsInAnswer = cleanAnswer.split(/\s+/);

    if (color === "red") {
      correct = cleanAnswer.startsWith(cleanWord[0]) && cleanAnswer !== cleanWord;
    } else if (color === "blue") {
      correct = wordsInAnswer.length >= 3 && cleanAnswer.includes(cleanWord);
    } else if (color === "yellow") {
      // Regra extra: Não pode usar a própria palavra na definição
      correct = cleanAnswer.length >= 12 && !cleanAnswer.includes(cleanWord);
    } else if (color === "green") {
      // Regra extra: Rima tem que ser uma palavra diferente
      correct = cleanAnswer.endsWith(cleanWord.slice(-2)) && cleanAnswer !== cleanWord;
    }

    if (correct) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("colorWords_highScore", newScore.toString());
      }
      setSubmittedAnswer("Correct! ✅");
      setIsRoundActive(false);
      launchConfetti();
    } else {
      setIsShaking(true);
      handleLoseLife();
      setSubmittedAnswer(color === "yellow" && cleanAnswer.includes(cleanWord) 
        ? "Don't use the target word! ❌" 
        : "Wrong! -1 Life ❌");
      setTimeout(() => setIsShaking(false), 400);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a14", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "sans-serif", padding: "20px" }}>
      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 50% { transform: translateX(8px); } 75% { transform: translateX(-8px); } }
        @keyframes heartPop { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
        .shake-effect { animation: shake 0.4s ease-in-out; border: 2px solid #ff4444 !important; }
        .heart-animation { animation: heartPop 0.5s forwards; color: white !important; }
      `}</style>

      <div style={{ background: "#161625", padding: 30, borderRadius: 25, width: "100%", maxWidth: 380, boxShadow: "0 20px 50px rgba(0,0,0,0.8)", textAlign: "center", position: "relative" }} className={isShaking ? "shake-effect" : ""}>
        
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
          <button onClick={() => window.confirm("Quit?") && resetGame()} style={{ background: "none", border: "1px solid #444", color: "#888", borderRadius: 5, padding: "4px 8px", fontSize: 10, cursor: "pointer" }}>QUIT</button>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, opacity: 0.6 }}>SCORE</div>
            <div style={{ fontSize: 24, fontWeight: "bold", color: score < 0 ? "#ff4444" : "#00e676" }}>{score}</div>
          </div>
        </div>

        {gameOver && (
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.95)", borderRadius: 25, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h1 style={{ color: "#ff4444", margin: 0 }}>GAME OVER</h1>
            <p>Score: {score}</p>
            <button onClick={resetGame} style={{ marginTop: 20, padding: "12px 24px", borderRadius: 10, border: "none", background: "#00e676", fontWeight: "bold", cursor: "pointer" }}>TRY AGAIN</button>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: 15 }}>
          {[...Array(6)].map((_, i) => (
            <span key={i} className={i === lastLifeLost ? "heart-animation" : ""} style={{ fontSize: 18, display: i >= lives && i !== lastLifeLost ? "none" : "inline-block", color: "#ff4444" }}>❤️</span>
          ))}
        </div>

        {!isRoundActive && (
          <div style={{ display: "flex", gap: "5px", marginBottom: 15 }}>
            {[1, 2, 3, 4].map((lvl) => (
              <button key={lvl} onClick={() => setLevel(lvl)} style={{ flex: 1, padding: "6px", borderRadius: "6px", border: "none", background: level === lvl ? "#2196f3" : "#333", color: "white", fontSize: 11, cursor: "pointer" }}>Lvl {lvl}</button>
            ))}
          </div>
        )}

        <button onClick={drawCard} disabled={loading} style={{ padding: "15px", borderRadius: 12, border: "none", background: "#ffcc00", color: "#000", fontWeight: "bold", cursor: "pointer", width: "100%", marginBottom: 15 }}>
          {loading ? "SEARCHING..." : isRoundActive ? "SKIP (-1 PT)" : "DRAW A CARD"}
        </button>

        {word && (
          <div 
          style={{ 
            backgroundColor: color === "yellow" ? "#f59e0b" : 
                             color === "green" ? "#2e7d32" : 
                             (color ?? "transparent"), // O ?? "transparent" resolve o erro do null
            borderRadius: 20, 
            padding: 20, 
            marginBottom: 15 
          }}
        >
          
            <h1 style={{ margin: "0", fontSize: 26 }}>{word.toUpperCase()}</h1>
            <p style={{ fontSize: 12, marginTop: 10, opacity: 0.9 }}>
              {color === "red" && `Word starting with: ${word[0].toUpperCase()}`}
              {color === "blue" && `Sentence using this word (3+ words)`}
              {color === "yellow" && `Describe the meaning (Don't use the word!)`}
              {color === "green" && `Rhyme ending in: -${word.slice(-2)}`}
            </p>
          </div>
        )}

        {isRoundActive && (
          <>
            {!hint && <button onClick={fetchHint} style={{ background: "none", color: "#aaa", fontSize: 10, marginBottom: 10, cursor: "pointer", textDecoration: "underline", border: "none" }}>Show Hint (-2 Points)</button>}
            {hint && <p style={{ fontSize: 11, color: "#bbb", background: "rgba(0,0,0,0.3)", padding: 10, borderRadius: 8, marginBottom: 10 }}>{hint}</p>}
            <input value={answer} onChange={(e) => setAnswer(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submitAnswer()} placeholder="Your answer..." style={{ width: "100%", padding: "15px", borderRadius: 12, border: "none", marginBottom: 10, background: "#222", color: "white" }} />
            <button onClick={submitAnswer} style={{ width: "100%", padding: "15px", borderRadius: 12, border: "none", background: "#00e676", color: "#000", fontWeight: "bold", cursor: "pointer" }}>SUBMIT</button>
          </>
        )}

        {submittedAnswer && <p style={{ marginTop: 15, fontSize: 14, fontWeight: "bold", color: submittedAnswer.includes("Correct") ? "#00e676" : "#ff4444" }}>{submittedAnswer}</p>}
        <div style={{ marginTop: 20, fontSize: 10, opacity: 0.4 }}>BEST SCORE: {highScore}</div>
      </div>
    </div>
  );
}
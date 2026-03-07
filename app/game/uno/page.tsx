/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";

type CardColor = "red" | "blue" | "yellow" | "green";

const launchConfetti = () => {
  if (typeof window !== "undefined" && (window as any).confetti) {
    (window as any).confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  }
};

export default function EnglishUnoGame() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [showExitScreen, setShowExitScreen] = useState(false);
  const [wordData, setWordData] = useState<Record<number, string[]>>({});
  const [word, setWord] = useState("");
  const [color, setColor] = useState<CardColor | null>(null);
  const [loading, setLoading] = useState(true);
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
  
  // Novos estados para o Timer
  const [timeLeft, setTimeLeft] = useState(0);
  const [maxTime, setMaxTime] = useState(30);

  useEffect(() => {
    const loadWords = async () => {
      try {
        const response = await fetch("/words.json");
        const data = await response.json();
        setWordData(data);
      } catch (error) {
        console.error("Erro ao carregar dicionário local:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWords();

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    script.async = true;
    document.body.appendChild(script);
    
    const savedHS = localStorage.getItem("colorWords_highScore");
    if (savedHS) setHighScore(parseInt(savedHS));
  }, []);

  const handleLoseLife = useCallback(() => {
    const currentHeartIndex = lives - 1;
    setLastLifeLost(currentHeartIndex);
    setIsShaking(true);
    
    setTimeout(() => {
      setLives((prev) => {
        if (prev <= 1) setGameOver(true);
        return prev - 1;
      });
      setLastLifeLost(null);
      setIsShaking(false);
    }, 450);
  }, [lives]);

  // Lógica do Cronômetro
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRoundActive && timeLeft > 0 && !gameOver && !showExitScreen) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRoundActive) {
      setSubmittedAnswer("Time's up! ⏰");
      setIsRoundActive(false);
      handleLoseLife();
    }
    return () => clearInterval(timer);
  }, [isRoundActive, timeLeft, gameOver, showExitScreen, handleLoseLife]);

  const resetGame = () => {
    setScore(0); setLives(6); setGameOver(false); setIsRoundActive(false);
    setWord(""); setSubmittedAnswer(""); setLastLifeLost(null); setHint("");
    setShowInstructions(true); setShowExitScreen(false); setTimeLeft(0);
  };

  const handleQuit = () => {
    if (window.confirm("Are you sure you want to quit?")) {
      setShowExitScreen(true);
      setIsRoundActive(false);
    }
  };

  const fetchHint = async () => {
    if (!word || hint || loading) return;
    setLoading(true);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await res.json();
      if (data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition) {
        setHint(data[0].meanings[0].definitions[0].definition);
        setScore((prev) => prev - 2);
      } else {
        setSubmittedAnswer("No hint available. ⚠️");
      }
    } catch {
      setSubmittedAnswer("Hint service unavailable. ❌");
    } finally {
      setLoading(false);
    }
  };

  function drawCard() {
    if (gameOver || !wordData[level]) return;
    
    setAnswer(""); setHint(""); setIsShaking(false);
    
    const possibleWords = wordData[level];
    const randomWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    const colors: CardColor[] = ["red", "blue", "yellow", "green"];
    
    // Define o tempo baseado no nível
    const difficultyTime = level === 1 ? 30 : level === 2 ? 20 : level === 3 ? 15 : 10;
    setMaxTime(difficultyTime);
    setTimeLeft(difficultyTime);
    
    setWord(randomWord);
    setColor(colors[Math.floor(Math.random() * colors.length)]);
    setIsRoundActive(true);
    setSubmittedAnswer("");
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
      correct = cleanAnswer.length >= 12 && !cleanAnswer.includes(cleanWord);
    } else if (color === "green") {
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
      handleLoseLife();
      setSubmittedAnswer(color === "yellow" && cleanAnswer.includes(cleanWord) 
        ? "Don't use the target word! ❌" 
        : "Wrong! -1 Life ❌");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a14", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "'Inter', sans-serif", padding: "20px" }}>
      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 50% { transform: translateX(8px); } 75% { transform: translateX(-8px); } }
        @keyframes heartPop { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .shake-effect { animation: shake 0.4s ease-in-out; border: 2px solid #ff4444 !important; }
        .heart-animation { animation: heartPop 0.5s forwards; color: white !important; }
        .instruction-highlight { animation: fadeInUp 0.5s ease-out; background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(4px); border: 1px solid rgba(255, 255, 255, 0.25); }
      `}</style>

      <div style={{ background: "#161625", padding: 30, borderRadius: 30, width: "100%", maxWidth: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.8)", textAlign: "center", position: "relative", border: "1px solid #222", overflow: "hidden" }} className={isShaking ? "shake-effect" : ""}>
        
        {/* TELA DE SAÍDA */}
        {showExitScreen && (
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at top, #1e1e30 0%, #0a0a14 100%)", borderRadius: 30, zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 30, animation: "fadeInUp 0.4s ease-out" }}>
            <div style={{ fontSize: 60, marginBottom: 10 }}>✨</div>
            <h1 style={{ color: "#ffcc00", fontSize: 32, fontWeight: "900", marginBottom: 8 }}>See you next time!</h1>
            <p style={{ fontSize: 16, color: "#888", marginBottom: 30 }}>You had a great run! 👋</p>
            <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "25px 50px", borderRadius: 24, marginBottom: 40, border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 5, letterSpacing: "2px" }}>FINAL SCORE</span>
              <span style={{ fontSize: 56, fontWeight: "900", color: "#00e676" }}>{score}</span>
            </div>
            <button onClick={resetGame} style={{ padding: "18px 50px", borderRadius: 18, border: "none", background: "#00e676", color: "#000", fontWeight: "900", cursor: "pointer", fontSize: 16 }}>PLAY AGAIN</button>
          </div>
        )}

        {showInstructions ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 style={{ color: "#ffcc00", margin: 0, fontSize: 28 }}>How to Play 🃏</h2>
            <div style={{ textAlign: "left", fontSize: "14px", color: "#bbb" }}>
                <p>Choose a level and complete the challenges before the <b>timer</b> runs out!</p>
                <ul style={{ padding: "0", listStyleType: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <li><span style={{ color: "#ff4444" }}>● RED:</span> Same first letter.</li>
                    <li><span style={{ color: "#42a5f5" }}>● BLUE:</span> Use in a sentence.</li>
                    <li><span style={{ color: "#f59e0b" }}>● YELLOW:</span> Describe it.</li>
                    <li><span style={{ color: "#66bb6a" }}>● GREEN:</span> Rhyming word.</li>
                </ul>
            </div>
            <button onClick={() => setShowInstructions(false)} style={{ padding: "18px", borderRadius: 15, border: "none", background: "#00e676", color: "#000", fontWeight: "900", cursor: "pointer" }}>START GAME</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <button onClick={handleQuit} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #333", color: "#666", borderRadius: 8, padding: "6px 12px", fontSize: 11, cursor: "pointer" }}>QUIT</button>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, opacity: 0.5 }}>SCORE</div>
                <div style={{ fontSize: 28, fontWeight: "900", color: "#00e676" }}>{score}</div>
              </div>
            </div>

            {/* Barra de Tempo (Timer) */}
            {isRoundActive && (
                <div style={{ width: "100%", height: "6px", background: "#222", borderRadius: "3px", marginBottom: "20px", overflow: "hidden" }}>
                    <div style={{ 
                        width: `${(timeLeft / maxTime) * 100}%`, 
                        height: "100%", 
                        background: timeLeft < 5 ? "#ff4444" : "#ffcc00", 
                        transition: "width 1s linear, background 0.3s ease" 
                    }} />
                </div>
            )}

            {gameOver && (
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(10,10,20,0.98)", borderRadius: 30, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
                <h1 style={{ color: "#ff4444", fontSize: 32 }}>GAME OVER</h1>
                <p style={{ fontSize: 18, margin: "10px 0 20px" }}>Final Score: <b>{score}</b></p>
                <button onClick={resetGame} style={{ padding: "15px 40px", borderRadius: 12, border: "none", background: "#00e676", fontWeight: "bold", cursor: "pointer" }}>TRY AGAIN</button>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: 20 }}>
              {[...Array(6)].map((_, i) => (
                <span key={i} className={i === lastLifeLost ? "heart-animation" : ""} style={{ fontSize: 22, display: i >= lives && i !== lastLifeLost ? "none" : "inline-block", color: "#ff4444" }}>❤️</span>
              ))}
            </div>

            {!isRoundActive && (
              <div style={{ display: "flex", gap: "8px", marginBottom: 20 }}>
                {[1, 2, 3, 4].map((lvl) => (
                  <button key={lvl} onClick={() => setLevel(lvl)} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "none", background: level === lvl ? "#2196f3" : "#222", color: "white", fontSize: 12, cursor: "pointer", fontWeight: "bold" }}>Lvl {lvl}</button>
                ))}
              </div>
            )}

            <button onClick={drawCard} disabled={loading || isRoundActive} style={{ padding: "18px", borderRadius: 15, border: "none", background: isRoundActive ? "#333" : "#ffcc00", color: isRoundActive ? "#888" : "#000", fontWeight: "900", cursor: "pointer", width: "100%", marginBottom: 20 }}>
              {isRoundActive ? `TIME LEFT: ${timeLeft}s` : "DRAW A CARD"}
            </button>

            {word && (
              <div style={{ backgroundColor: color === "yellow" ? "#f59e0b" : color === "green" ? "#2e7d32" : (color ?? "transparent"), borderRadius: 25, padding: "35px 20px", marginBottom: 20, boxShadow: "inset 0 0 30px rgba(0,0,0,0.2)" }}>
                <h1 style={{ margin: "0", fontSize: 36, fontWeight: "900" }}>{word.toUpperCase()}</h1>
                <div className="instruction-highlight" style={{ marginTop: 15, padding: "10px", borderRadius: "10px" }}>
                  <p style={{ fontSize: "13px", margin: 0, fontWeight: "800", textTransform: "uppercase" }}>
                    {color === "red" && `Starts with: ${word[0].toUpperCase()}`}
                    {color === "blue" && `Use in a sentence (3+ words)`}
                    {color === "yellow" && `Describe it (No target word!)`}
                    {color === "green" && `Rhyme with ending: -${word.slice(-2)}`}
                  </p>
                </div>
              </div>
            )}

            {isRoundActive && (
              <>
                {!hint && <button onClick={fetchHint} style={{ background: "none", color: "#888", fontSize: 11, marginBottom: 12, cursor: "pointer", border: "none", textDecoration: "underline" }}>Need a hint? (-2 pts)</button>}
                {hint && <p style={{ fontSize: 12, color: "#ccc", background: "rgba(0,0,0,0.4)", padding: "10px", borderRadius: "10px", marginBottom: 12 }}><b>Def:</b> {hint}</p>}
                <input value={answer} autoFocus onChange={(e) => setAnswer(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submitAnswer()} placeholder="Type fast..." style={{ width: "100%", padding: "18px", borderRadius: 15, border: "2px solid #333", marginBottom: 12, background: "#0a0a14", color: "white" }} />
                <button onClick={submitAnswer} style={{ width: "100%", padding: "18px", borderRadius: 15, border: "none", background: "#00e676", color: "#000", fontWeight: "900", cursor: "pointer" }}>SUBMIT</button>
              </>
            )}

            {submittedAnswer && <p style={{ marginTop: 20, fontSize: 15, fontWeight: "bold", color: submittedAnswer.includes("Correct") ? "#00e676" : "#ff4444" }}>{submittedAnswer}</p>}
          </>
        )}
      </div>
    </div>
  );
}
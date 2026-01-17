"use client";

import { useState } from "react";


type CardColor = "red" | "blue" | "yellow";

const words = ["happy", "love", "dog", "book", "music", "family"];

export default function EnglishUnoGame() {
  const [word, setWord] = useState("");
  const [color, setColor] = useState<CardColor | null>(null);
  const [meaning, setMeaning] = useState("");
  const [loading, setLoading] = useState(false);

  const [answer, setAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [score, setScore] = useState(0);


  function drawCard() {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const colors: CardColor[] = ["red", "blue", "yellow"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setWord(randomWord);
    setColor(randomColor);
    setMeaning("");
    setAnswer("");
    setSubmittedAnswer("");
  }

  async function fetchMeaning() {
    if (!word) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await res.json();
      const definition =
        data[0].meanings[0].definitions[0].definition;
      setMeaning(definition);
    } catch {
      setMeaning("Meaning not found.");
    } finally {
      setLoading(false);
    }
  }
  function submitAnswer() {
    let correct = false;
  
    if (color === "red") {
      correct =
        answer.trim().toLowerCase().startsWith(word[0].toLowerCase());
    }
  
    if (color === "blue") {
      correct =
        answer.toLowerCase().includes(word.toLowerCase());
    }
  
    if (color === "yellow") {
      correct = answer.trim().length > 0;
    }
  
    if (correct) {
      setScore((prev) => prev + 1);
      setSubmittedAnswer("Correct ✅");
    } else {
      setSubmittedAnswer("Wrong ❌");
    }
  }
  
  

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#111",
          padding: 30,
          borderRadius: 20,
          width: 350,
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          textAlign: "center",
        }}
      >
<h1 style={{ fontSize: 48, fontWeight: "bold", textAlign: "center", marginBottom: 30, fontFamily: "'Fredoka One', sans-serif" }}>
  {["C","o","l","o","r","W","o","r","d","s"].map((letter, index) => {
    const colors = ["#f44336","#e91e63","#9c27b0","#3f51b5","#2196f3","#03a9f4","#009688","#4caf50","#ffeb3b","#ff9800"];
    return (
      <span key={index} style={{ color: colors[index % colors.length] }}>
        {letter}
      </span>
    );
  })}
</h1>



  
        <button
          onClick={drawCard}
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            border: "none",
            background: "#ffcc00",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: 20,
          }}
        >
          Draw Card
        </button>
  
        {word && color && (
          <div
            style={{
                backgroundColor:
                color === "yellow" ? "#f59e0b" : color,
              
              borderRadius: 15,
              padding: 20,
              marginBottom: 20,
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.4)",
            }}
          >
            <h2 style={{ margin: 0 }}>WORD</h2>
            <h1 style={{ margin: "10px 0" }}>
              {word.toUpperCase()}
            </h1>
  
            {color === "red" && (
              <p>
                🔴 Start with <strong>{word[0].toUpperCase()}</strong>
              </p>
            )}
            {color === "blue" && (
              <p>🔵 Use the word in a sentence</p>
            )}
            {color === "yellow" && (
              <p>🟡 Write the meaning</p>
            )}
          </div>
        )}
  
        {word && (
          <>
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer..."
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 8,
                border: "none",
                marginBottom: 10,
              }}
            />
  
            <button
              onClick={submitAnswer}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 8,
                border: "none",
                background: "#00e676",
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: 10,
              }}
            >
              Submit
            </button>
          </>
        )}
  
        {submittedAnswer && (
          <p style={{ fontSize: 18 }}>{submittedAnswer}</p>
        )}
  
        {color === "yellow" && (
          <button
            onClick={fetchMeaning}
            style={{
              marginTop: 10,
              background: "#444",
              color: "white",
              border: "none",
              padding: 8,
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Show Correct Meaning
          </button>
        )}
  
        {meaning && (
          <p style={{ fontSize: 14, marginTop: 10 }}>
            <strong>Meaning:</strong> {meaning}
          </p>
        )}
      </div>
    </div>
  );
}  
"use client";
import Link from "next/link";

export default function GamesMenu() {
  const games = [
    { 
      id: "uno", 
      name: "English Uno", 
      description: "Practice your vocabulary with color-coded rules!", 
      path: "/game/uno", 
      color: "#b042b0",
      emoji: "🃏"
    },
    { 
      id: "soon", 
      name: "Next Game", 
      description: "New challenges coming soon...", 
      path: "#", 
      color: "#999",
      emoji: "🔒"
    },
  ];

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "radial-gradient(circle at top, #fdfcfd 0%, #f5f0f5 100%)", // Gradiente suave de fundo
      color: "#333", 
      padding: "80px 20px", 
      fontFamily: "'Inter', sans-serif", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center" 
    }}>
      {/* Estilos CSS para Animações */}
      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .styled-title {
          font-size: 4.5rem;
          font-weight: 900;
          background: linear-gradient(to right, #b042b0, #6a1b9a, #ff4081, #b042b0);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientFlow 6s ease infinite;
          letter-spacing: -2px;
          margin-bottom: 10px;
        }
        .game-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 20px 40px rgba(0,0,0,0.04);
          border-radius: 32px;
          padding: 40px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .game-card:hover {
          transform: translateY(-12px) scale(1.02);
          background: white;
          box-shadow: 0 30px 60px rgba(176, 66, 176, 0.15);
        }
      `}</style>

      <h1 className="styled-title">Game Center</h1>
      
      <p style={{ 
        color: "#888", 
        marginBottom: "60px", 
        fontSize: "1.2rem", 
        fontWeight: "500",
        letterSpacing: "0.5px" 
      }}>
        Pick your challenge and level up your English
      </p>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
        gap: "30px", 
        width: "100%", 
        maxWidth: "1000px" 
      }}>
        {games.map((game) => (
          <Link href={game.path} key={game.id} style={{ textDecoration: "none" }}>
            <div className="game-card">
              <div style={{ 
                fontSize: "50px", 
                marginBottom: "20px",
                filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.1))" 
              }}>
                {game.emoji}
              </div>
              
              <h2 style={{ 
                color: "#1a1a1a", 
                margin: "0 0 15px 0", 
                fontSize: "1.8rem",
                fontWeight: "800" 
              }}>
                {game.name}
              </h2>
              
              <p style={{ 
                color: "#666", 
                fontSize: "16px", 
                lineHeight: "1.6",
                marginBottom: "30px" 
              }}>
                {game.description}
              </p>
              
              {game.id !== 'soon' ? (
                <div style={{ 
                  display: "inline-block",
                  padding: "12px 24px",
                  background: "linear-gradient(135deg, #b042b0 0%, #8e24aa 100%)",
                  color: "white",
                  borderRadius: "16px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  boxShadow: "0 10px 20px rgba(176, 66, 176, 0.2)"
                }}>
                  PLAY NOW
                </div>
              ) : (
                <div style={{ color: "#bbb", fontSize: "14px", fontWeight: "600" }}>
                  COMING SOON
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <Link href="/" style={{ 
        marginTop: "80px", 
        color: "#bbb", 
        fontSize: "14px", 
        textDecoration: "none",
        fontWeight: "600",
        transition: "color 0.3s"
      }}
      onMouseEnter={(e) => e.currentTarget.style.color = "#b042b0"}
      onMouseLeave={(e) => e.currentTarget.style.color = "#bbb"}>
        ← BACK TO HOME
      </Link>
    </div>
  );
}
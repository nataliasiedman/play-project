"use client";
import Link from "next/link";

export default function LevelsPage() {
  const levels = [
    {
      rank: "A1 - A2",
      title: "Beginner",
      description: "Essential grammar and basic vocabulary for daily survival English.",
      path: "/content/beginner",
      color: "#b042b0"
    },
    {
      rank: "B1",
      title: "Intermediate",
      description: "Start expressing opinions and dealing with most travel situations.",
      path: "/content/intermediate",
      color: "#8e24aa"
    },
    {
      rank: "B2",
      title: "Upper-Intermediate",
      description: "Achieve fluency to interact with native speakers with confidence.",
      path: "/content/upper-intermediate",
      color: "#6a1b9a"
    },
    {
      rank: "C1 - C2",
      title: "Advanced / Master",
      description: "Master complex structures and professional/academic language.",
      path: "/content/advanced",
      color: "#4a148c"
    }
  ];

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "radial-gradient(circle at top, #fdfcfd 0%, #f5f0f5 100%)", 
      padding: "80px 20px", 
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      {/* Estilos CSS Avançados */}
      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-title {
          font-size: 4rem;
          font-weight: 900;
          background: linear-gradient(to right, #b042b0, #6a1b9a, #ff4081, #b042b0);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientFlow 6s ease infinite;
          letter-spacing: -2px;
          margin-bottom: 15px;
          text-align: center;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 20px 40px rgba(0,0,0,0.03);
          border-radius: 32px;
          padding: 40px 30px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-align: left;
          height: 100%;
        }
        .glass-card:hover {
          transform: translateY(-12px);
          background: white;
          box-shadow: 0 30px 60px rgba(176, 66, 176, 0.12);
          border-color: rgba(176, 66, 176, 0.3);
        }
      `}</style>

      <h1 className="animated-title">Learning Roadmap</h1>
      
      <p style={{ 
        color: "#666", 
        marginBottom: "40px", 
        fontSize: "1.2rem", 
        maxWidth: "600px", 
        textAlign: "center",
        fontWeight: "500"
      }}>
        Discover your current level and explore curated content to improve your fluency.
      </p>

      <Link href="/placement-test" style={{
        display: "inline-block",
        marginBottom: "60px",
        padding: "18px 45px",
        background: "linear-gradient(135deg, #b042b0 0%, #6a1b9a 100%)",
        color: "white",
        borderRadius: "40px",
        textDecoration: "none",
        fontWeight: "bold",
        fontSize: "1.1rem",
        boxShadow: "0 10px 25px rgba(176, 66, 176, 0.3)",
        transition: "all 0.3s"
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05) translateY(-2px)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1) translateY(0)"}>
        Start Placement Test 📝
      </Link>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
        gap: "30px", 
        maxWidth: "1100px", 
        width: "100%" 
      }}>
        {levels.map((lvl, index) => (
          <Link href={lvl.path} key={index} style={{ textDecoration: "none" }}>
            <div className="glass-card">
              <span style={{ 
                background: `${lvl.color}15`, 
                color: lvl.color, 
                padding: "6px 14px", 
                borderRadius: "12px", 
                fontSize: "13px", 
                fontWeight: "800",
                display: "inline-block",
                marginBottom: "20px",
                letterSpacing: "0.5px"
              }}>
                {lvl.rank}
              </span>
              
              <h2 style={{ 
                margin: "0 0 15px 0", 
                color: "#1a1a1a", 
                fontSize: "1.8rem",
                fontWeight: "800"
              }}>
                {lvl.title}
              </h2>
              
              <p style={{ 
                color: "#777", 
                fontSize: "15px", 
                lineHeight: "1.7", 
                marginBottom: "25px" 
              }}>
                {lvl.description}
              </p>
              
              <div style={{ 
                marginTop: "auto", 
                color: lvl.color, 
                fontWeight: "bold", 
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}>
                EXPLORE CONTENT <span>→</span>
              </div>
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
        letterSpacing: "1px"
      }}
      onMouseEnter={(e) => e.currentTarget.style.color = "#b042b0"}
      onMouseLeave={(e) => e.currentTarget.style.color = "#bbb"}>
        ← BACK TO HOME
      </Link>
    </div>
  );
}
"use client";
import RoadmapForm from "@/components/RoadmapForm";

export default function Home() {
  return (
    <>
      <main className="home">
        <div className="glow blue"></div>
        <div className="glow purple"></div>

        <div className="container">
          <div className="header">
            <h1 className="title">🎓 LearnSphere AI</h1>
            <p className="subtitle">Your Personalized AI Learning Companion</p>
            <p className="desc">
              Generate custom learning roadmaps, get AI explanations, and take interactive quizzes
            </p>
          </div>

          <div className="features">
            <div className="feature-card">
              <h3>🗺 Custom Roadmaps</h3>
              <p>AI builds step-by-step learning paths just for you.</p>
            </div>
            <div className="feature-card">
              <h3>🧠 AI Explanations</h3>
              <p>Understand tough topics with simple explanations.</p>
            </div>
            <div className="feature-card">
              <h3>✅ Smart Quizzes</h3>
              <p>Test your skills with instant feedback.</p>
            </div>
          </div>

          <div className="card">
            <div className="badge">✨ Start Learning Now</div>

            {/* Wrap form to apply dark styles */}
            <div className="form-wrapper">
              <RoadmapForm />
            </div>
          </div>
        </div>
      </main>

      {/* ================= CSS ================= */}
      <style jsx global>{`
        body {
          margin: 0;
          background: #020617;
        }

        .home {
          min-height: 100vh;
          background: radial-gradient(circle at top, #0f172a, #020617);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 40px 16px;
          font-family: system-ui, sans-serif;
        }

        .glow {
          position: absolute;
          width: 300px;
          height: 300px;
          filter: blur(120px);
          border-radius: 50%;
          opacity: 0.35;
        }

        .glow.blue {
          background: #3b82f6;
          top: -100px;
          left: -100px;
        }

        .glow.purple {
          background: #a855f7;
          bottom: -100px;
          right: -100px;
        }

        .container {
          max-width: 1000px;
          width: 100%;
          z-index: 2;
        }

        .header {
          text-align: center;
          margin-bottom: 50px;
        }

        .title {
          font-size: 3.2rem;
          background: linear-gradient(to right, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          color: transparent;
          font-weight: 800;
        }

        .subtitle {
          color: #e5e7eb;
          font-size: 1.2rem;
          margin-top: 10px;
        }

        .desc {
          color: #9ca3af;
          font-size: 0.9rem;
          margin-top: 6px;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
          margin-bottom: 40px;
        }

        .feature-card {
          background: linear-gradient(
            to bottom right,
            rgba(14, 26, 47, 0.8),
            rgba(12, 20, 36, 0.9)
          );
          border: 1px solid rgba(99, 102, 241, 0.25);
          border-radius: 16px;
          padding: 18px;
          color: white;
          transition: 0.3s ease;
          backdrop-filter: blur(12px);
        }

        .feature-card:hover {
          transform: translateY(-6px);
          border-color: rgba(139, 92, 246, 0.7);
          box-shadow: 0 10px 40px rgba(99, 102, 241, 0.25);
        }

        .card {
          position: relative;
          background: linear-gradient(
            to bottom right,
            hsla(216, 36%, 18%, 0.85),
            rgba(28, 34, 52, 0.95)
          );
          border-radius: 24px;
          padding: 45px 30px 35px;
          border: 1px solid rgba(99, 102, 241, 0.35);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(14px);
        }

        .badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(to right, #3b82f6, #a855f7);
          color: white;
          padding: 6px 16px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.6);
        }

        /* ================= FORM FIX ================= */

        .form-wrapper input,
        .form-wrapper select,
        .form-wrapper textarea {
          width: 100%;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(99, 102, 241, 0.35);
          color: #e5e7eb;
          padding: 10px 12px;
          border-radius: 10px;
          outline: none;
          transition: 0.25s ease;
        }

        .form-wrapper input::placeholder {
          color: #9ca3af;
        }

        .form-wrapper input:focus,
        .form-wrapper select:focus,
        .form-wrapper textarea:focus {
          border-color: #8b5cf6;
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.35);
        }

        .form-wrapper label {
          color: #c7d2fe;
          font-size: 0.85rem;
          margin-bottom: 4px;
        }

        /* BUTTON FIX */
        .form-wrapper button {
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 999px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.25s ease;
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
        }

        .form-wrapper button:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 40px rgba(139, 92, 246, 0.55);
        }

        .form-wrapper button:active {
          transform: scale(0.97);
        }

        @media (max-width: 600px) {
          .title {
            font-size: 2.4rem;
          }
        }
      `}</style>
    </>
  );
}

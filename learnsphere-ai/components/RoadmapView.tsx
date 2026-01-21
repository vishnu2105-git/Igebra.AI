"use client";
import { useState } from "react";
import LessonModal from "./LessonModal";

export default function RoadmapView({ roadmap, level }: any) {
  let data;
  try {
    data = JSON.parse(roadmap);
  } catch {
    return <pre style={{ color: "white" }}>{roadmap}</pre>;
  }

  return (
    <>
      <div className="wrap">
        <h1 className="title">{data.title}</h1>

        {data.weeks.map((week: any) => (
          <div key={week.week} className="week">
            <h2>Week {week.week}</h2>

            <div className="grid">
              {week.days.map((d: any) => (
                <DayCard key={d.day} day={d} level={level} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* GLOBAL */}
      <style jsx global>{`
        body {
          margin: 0;
          background: radial-gradient(circle at top, #1e293b, #020617);
          color: white;
          font-family: system-ui, sans-serif;
        }
      `}</style>

      {/* CSS */}
      <style jsx>{`
        .wrap {
          padding: 60px 40px;
          max-width: 1200px;
          margin: auto;
        }

        .title {
          text-align: center;
          font-size: 2.4rem;
          margin-bottom: 50px;
          background: linear-gradient(to right, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          color: transparent;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }

        .card {
          background: rgba(2, 6, 23, 0.9);
          border: 1px solid rgba(99, 102, 241, 0.4);
          border-radius: 18px;
          padding: 18px;
          display: flex;
          flex-direction: column;
        }

        .card ul {
          padding-left: 18px;
          font-size: 0.85rem;
        }

        .btn {
          margin-top: auto;
          padding: 12px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          color: white;
          cursor: pointer;
        }

        /* MODAL */

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999999;
        }

        .modal {
          width: 95%;
          max-width: 900px;
          max-height: 90vh;
          background: #020617;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .header {
          padding: 14px 18px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #333;
        }

        .close {
          background: none;
          border: none;
          color: white;
          font-size: 22px;
          cursor: pointer;
        }

        .hero {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .body {
          padding: 20px;
          overflow-y: auto;
        }

        .markdown * {
          color: white;
        }

        .quiz {
          margin-top: 20px;
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          background: green;
          border: none;
          color: white;
        }
      `}</style>
      <style jsx global>{`
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999999;
  }

  .modal {
    width: 95%;
    max-width: 900px;
    max-height: 90vh;
    background: #020617;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .header {
    padding: 14px 18px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #333;
  }

  .close {
    background: none;
    border: none;
    color: white;
    font-size: 22px;
    cursor: pointer;
  }

  .hero {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .body {
    padding: 20px;
    overflow-y: auto;
  }

  .markdown * {
    color: white;
  }

  .quiz {
    margin-top: 20px;
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    background: green;
    border: none;
    color: white;
  }
`}</style>

    </>
  );
}

/* -------- DAY CARD -------- */

function DayCard({ day, level }: any) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function openModal() {
    console.log("Button clicked"); // DEBUG
    setOpen(true);

    if (text) return;

    try {
      setLoading(true);
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: day.topic, level }),
      });
      const data = await res.json();
      setText(data.explanation || "No explanation received.");
    } catch {
      setText("Failed to load lesson.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="card">
        <h4>Day {day.day}</h4>
        <strong>{day.topic}</strong>

        <ul>
          {day.subtopics.map((s: string, i: number) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <button className="btn" onClick={openModal}>
          🤖 Learn with AI
        </button>
      </div>

      <LessonModal
        open={open}
        onClose={() => setOpen(false)}
        day={day}
        loading={loading}
        text={text}
      />
    </>
  );
}

"use client";
import { createPortal } from "react-dom";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function LessonModal({
  open,
  onClose,
  day,
  loading,
  text,
  level,
}: any) {
  const [quiz, setQuiz] = useState<any[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [quizLoading, setQuizLoading] = useState(false);

  if (!open || typeof window === "undefined") return null;

  async function loadQuiz() {
    setQuizLoading(true);
    setScore(null);
    setFeedback("");

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: day.topic, level }),
      });

      const data = await res.json();

      if (!data.questions || !Array.isArray(data.questions)) {
        throw new Error("Invalid quiz format");
      }

      setQuiz(data.questions);
      setAnswers(new Array(data.questions.length).fill(-1));
    } catch (e) {
      console.error(e);
      alert("Failed to load quiz. Try again.");
    } finally {
      setQuizLoading(false);
    }
  }

  async function submitQuiz() {
    let sc = 0;
    quiz.forEach((q, i) => {
      if (answers[i] === q.correct) sc++;
    });
    setScore(sc);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: day.topic,
          score: sc,
          answers,
        }),
      });

      const data = await res.json();
      setFeedback(data.feedback || "Good attempt. Revise and try again.");
    } catch {
      setFeedback("Good attempt. Revise the lesson and practice more questions.");
    }
  }

  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <h3>{day.topic}</h3>
          <button className="close" onClick={onClose}>✕</button>
        </div>

        <div className="body">
          {loading ? (
            <p>🤖 Preparing your lesson...</p>
          ) : (
            <>
              <h4>What you'll learn</h4>
              <ul>
                {day.subtopics.map((s: string, i: number) => (
                  <li key={i}>✅ {s}</li>
                ))}
              </ul>

              <h4 style={{ marginTop: 20 }}>Lesson Explanation</h4>
              <div className="markdown">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {text}
                </ReactMarkdown>
              </div>

              <hr style={{ margin: "24px 0", opacity: 0.3 }} />

              {quiz.length === 0 ? (
                <button className="quiz" onClick={loadQuiz} disabled={quizLoading}>
                  {quizLoading ? "Generating Quiz..." : "📝 Attempt Quick Quiz"}
                </button>
              ) : (
                <>
                  <h4>Quick Quiz</h4>

                  {quiz.map((q, qi) => (
                    <div key={qi} style={{ marginBottom: 16 }}>
                      <strong>Q{qi + 1}. {q.question}</strong>
                      <div>
                        {q.options.map((op: string, oi: number) => (
                          <label key={oi} style={{ display: "block", cursor: "pointer" }}>
                            <input
                              type="radio"
                              name={`q-${qi}`}
                              checked={answers[qi] === oi}
                              onChange={() => {
                                const a = [...answers];
                                a[qi] = oi;
                                setAnswers(a);
                              }}
                            />{" "}
                            {op}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  {score === null ? (
                    <button className="quiz" onClick={submitQuiz}>
                      ✅ Submit Quiz
                    </button>
                  ) : (
                    <>
                      <p><strong>Score:</strong> {score} / {quiz.length}</p>

                      {feedback && (
                        <div style={{ marginTop: 16 }}>
                          <h4>📊 Feedback & Improvement Plan</h4>
                          <pre
                            style={{
                              whiteSpace: "pre-wrap",
                              background: "#020617",
                              padding: "12px",
                              borderRadius: "8px",
                              border: "1px solid #334155",
                              marginTop: 8,
                            }}
                          >
                            {feedback}
                          </pre>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

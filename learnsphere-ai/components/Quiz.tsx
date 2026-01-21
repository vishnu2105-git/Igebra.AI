"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Quiz({ topic, level }: any) {
  const [quiz, setQuiz] = useState<any[]>([]);
  const [feedback, setFeedback] = useState("");
  const [show, setShow] = useState(false);

  async function load() {
    const res = await fetch("/api/quiz", {
      method: "POST",
      body: JSON.stringify({ topic, level }),
    });
    const data = await res.json();
    setQuiz(JSON.parse(data.quiz));
    setShow(true);
  }

  async function getFeedback() {
    const res = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ answers: quiz }),
    });
    const data = await res.json();
    setFeedback(data.feedback);
  }

  return (
    <div className="mt-4 border-t border-indigo-500/30 pt-4">
      <button
        onClick={load}
        className="text-xs px-4 py-2 rounded-full bg-green-600 hover:bg-green-700 transition text-white"
      >
        📝 Take Quiz
      </button>

      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 mt-4"
        >
          {quiz.map((q, i) => (
            <div
              key={i}
              className="bg-slate-800/70 border border-slate-700 rounded-lg p-3"
            >
              <p className="text-blue-300 font-medium">Q{i + 1}</p>
              <p className="text-gray-300">{q.q}</p>
            </div>
          ))}

          <button
            onClick={getFeedback}
            className="text-xs px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 transition text-white"
          >
            📊 Get Feedback
          </button>

          {feedback && (
            <div className="bg-slate-900/70 border border-indigo-500/30 p-4 rounded-lg text-gray-200 whitespace-pre-wrap">
              <span className="text-indigo-300 font-semibold">
                AI Feedback:
              </span>
              <br />
              {feedback}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Quiz from "./Quiz";

export default function TopicExplainer({ topic, level }: any) {
  const [explain, setExplain] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function load() {
    setLoading(true);
    setOpen(true);
    const res = await fetch("/api/explain", {
      method: "POST",
      body: JSON.stringify({ topic, level }),
    });
    const data = await res.json();
    setExplain(data.explanation);
    setLoading(false);
  }

  return (
    <div className="mt-4">
      <button
        onClick={load}
        className="px-4 py-2 text-xs rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition text-white shadow-md"
      >
        🤖 Learn with AI
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="mt-4 bg-slate-900/70 backdrop-blur rounded-xl border border-indigo-500/30 p-6 shadow-xl space-y-4">

              {loading ? (
                <div className="animate-pulse text-indigo-300">
                  ✨ AI is preparing explanation...
                </div>
              ) : (
                <div className="prose prose-invert max-w-none prose-headings:text-indigo-300 prose-strong:text-blue-300 prose-code:bg-black/40 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-pre:bg-black/60 prose-pre:border prose-pre:border-indigo-500/30">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {explain}
                  </ReactMarkdown>
                </div>
              )}

              {!loading && <Quiz topic={topic} level={level} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

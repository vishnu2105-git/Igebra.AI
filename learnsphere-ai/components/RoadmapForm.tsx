"use client";
import { useState } from "react";
import RoadmapView from "./RoadmapView";

export default function RoadmapForm() {
  const [form, setForm] = useState({
    subject: "",
    level: "Beginner",
    goal: "",
    time: "",
  });
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    const res = await fetch("/api/roadmap", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setRoadmap(data.roadmap);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
          <input
            className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition"
            placeholder="e.g., Java, Python, Mathematics, History"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Level</label>
            <select
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Goal</label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition"
              placeholder="e.g., Exam, Interview"
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Time/Day</label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition"
              placeholder="e.g., 1 hour, 2 hours"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="text-center pt-2">
        <button
          onClick={generate}
          disabled={loading}
          className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:shadow-lg font-semibold text-white"
        >
          {loading ? "✨ Generating Roadmap..." : "✨ Generate Smart Roadmap"}
        </button>
      </div>

      {roadmap && <RoadmapView roadmap={roadmap} level={form.level} />}
    </div>
  );
}

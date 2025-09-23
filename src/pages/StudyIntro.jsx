// src/pages/StudyIntro.jsx
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const UNITS = [
  { id: 1, title: "Introduction", progress: 35 },
  { id: 2, title: "Everyday Basics", progress: 0 },
  { id: 3, title: "Simple Talk", progress: 0 },
  { id: 4, title: "Building Phrases", progress: 0 },
  { id: 5, title: "Express Yourself", progress: 0 },
  { id: 6, title: "Daily Conversations", progress: 0 },
  { id: 7, title: "At the Market", progress: 0 },
  { id: 8, title: "Travel Essentials", progress: 0 },
];

const TITLES = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  upper: "Upper Intermediate",
  advanced: "Advanced",
};

export default function StudyIntro() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState("");

  const level = params.get("level") || "beginner";
  const levelTitle = TITLES[level] ?? "Beginner";

  const filtered = UNITS.filter(u =>
    u.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* header: Study + streak/badge + search */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="uppercase tracking-wide text-sm text-gray-500">Study</span>
          <span className="flex items-center gap-1 text-gray-600">🦅 </span>
          <span className="flex items-center gap-1 text-gray-600">🔥 <strong>5</strong></span>
        </div>
        <input
          className="w-56 px-3 py-2 rounded border"
          placeholder="Search units…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* level title + overall progress */}
      <div className="flex items-center gap-4 mb-6">
        <div className="text-splash font-bold text-lg">{levelTitle}</div>
        <div className="flex-1 h-2 bg-[#D9D9D9] rounded-full overflow-hidden">
          <div className="h-full" style={{ width: "12%", backgroundColor: "#E63946" }} />
        </div>
        <span className="text-sm text-gray-500">12%</span>
      </div>

      {/* unit tiles (teal squares) */}
      <div className="grid grid-cols-2 gap-6">
        {filtered.map((u) => (
          <Link
            key={u.id}
            to={`/study/${u.id}?level=${level}`}
            className="rounded-lg shadow-lg p-5 bg-[#3FB8AF] text-white hover:scale-[1.02] transition-transform"
          >
            <div className="text-base font-semibold mb-3">
              {u.id}. {u.title}
            </div>

            {/* rail always visible (silver); only unit 1 shows red fill */}
            <div className="h-2 w-full bg-[#D9D9D9] rounded-full overflow-hidden">
              {u.id === 1 && (
                <div className="h-full" style={{ width: `${u.progress}%`, backgroundColor: "#E63946" }} />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}



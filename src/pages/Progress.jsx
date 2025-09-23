import { useEffect, useMemo, useState } from "react";

/* ---------- Mock stats  ---------- */
const STATS = { streak: 5, xp: 1720, unitsDone: 8, wordsLearned: 126 };
const UNITS = [
  { id: 1, title: "Introduction",      progress: 100 },
  { id: 2, title: "Everyday Basics",   progress: 75  },
  { id: 3, title: "Simple Talk",       progress: 10  },
  { id: 4, title: "Building Phrases",  progress: 0   },
];
const BADGES = [
  { id: "streak-3",  name: "3-Day Streak", color: "#FFE8A3" },
  { id: "starter",   name: "Starter",      color: "#D9F5F3" },
  { id: "words-100", name: "100 Words",    color: "#FDE2E4" },
];

/* ---------- Small ring component ---------- */
function Ring({ size = 140, stroke = 12, value = 0, color = "#3FB8AF", track = "#E9E9E9" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const dash = (pct / 100) * c;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
      <circle
        cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={`${dash} ${c - dash}`}
        transform={`rotate(-90 ${size/2} ${size/2})`}
      />
    </svg>
  );
}

/* ---------- Tiny modal (inline) ---------- */
function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-xl leading-none px-2">×</button>
        </div>
        <div className="p-5">{children}</div>
        {footer && <div className="px-5 py-4 border-t bg-gray-50 rounded-b-2xl">{footer}</div>}
      </div>
    </div>
  );
}

export default function Progress() {
  /* ---------- Persisted goal + progress ---------- */
  const [weeklyGoalMin, setWeeklyGoalMin] = useState(150);
  const [minutesThisWeek, setMinutesThisWeek] = useState(90);

  useEffect(() => {
    const g = localStorage.getItem("goalMin");
    const m = localStorage.getItem("minutesThisWeek");
    if (g) setWeeklyGoalMin(Number(g));
    if (m) setMinutesThisWeek(Number(m));
  }, []);
  useEffect(() => localStorage.setItem("goalMin", String(weeklyGoalMin)), [weeklyGoalMin]);
  useEffect(() => localStorage.setItem("minutesThisWeek", String(minutesThisWeek)), [minutesThisWeek]);

  const goalPct = useMemo(() => {
    if (weeklyGoalMin <= 0) return 0;
    return Math.min(100, Math.round((minutesThisWeek / weeklyGoalMin) * 100));
  }, [weeklyGoalMin, minutesThisWeek]);

  /* ---------- Modal state ---------- */
  const [openGoal, setOpenGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(weeklyGoalMin);

  function openGoalModal() { setTempGoal(weeklyGoalMin); setOpenGoal(true); }
  function saveGoal()      { setWeeklyGoalMin(Math.max(30, Number(tempGoal) || 30)); setOpenGoal(false); }

  /* ---------- Quick actions ---------- */
  function addPractice(min = 10) { setMinutesThisWeek(m => Math.max(0, m + min)); }
  function resetProgress() {
    setWeeklyGoalMin(150);
    setMinutesThisWeek(0);
    localStorage.removeItem("goalMin");
    localStorage.removeItem("minutesThisWeek");
  }
  async function copySummary() {
    const summary =
      `AlbaniGo — Weekly Progress\n` +
      `Goal: ${weeklyGoalMin} min\n` +
      `Done: ${minutesThisWeek} min (${goalPct}%)\n` +
      `Streak: ${STATS.streak} days | XP: ${STATS.xp}\n` +
      `Units completed: ${STATS.unitsDone} | Words: ${STATS.wordsLearned}`;
    try {
      await navigator.clipboard.writeText(summary);
      alert("Progress summary copied!");
    } catch {
      alert("Could not copy. (Clipboard permissions?)");
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="px-6 pt-6 pb-2 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold" style={{ color: "#3FB8AF" }}>Progress</h1>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Action bar */}
        <div className="flex flex-wrap gap-2 justify-end">
          <button onClick={copySummary} className="px-3 py-1 rounded border hover:bg-gray-50">Copy summary</button>
          <button onClick={resetProgress} className="px-3 py-1 rounded border hover:bg-gray-50">Reset</button>
        </div>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon="🔥" label="Streak" value={`${STATS.streak} days`} />
          <Stat icon="⭐" label="Total XP" value={STATS.xp.toLocaleString()} />
          <Stat icon="✅" label="Units" value={STATS.unitsDone} />
          <Stat icon="📚" label="Words" value={STATS.wordsLearned} />
        </section>

        {/* Goal tracker */}
        <section className="bg-white rounded-2xl shadow-sm border p-5">
          <div className="flex items-start md:items-center justify-between gap-6 flex-col md:flex-row">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Ring value={goalPct} />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Goal</div>
                    <div className="text-2xl font-extrabold">{goalPct}%</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold">Learning Goal Tracker</h2>
                <div className="text-gray-600">Your weekly goal</div>
                <div className="mt-1 font-semibold">{minutesThisWeek} / {weeklyGoalMin} min</div>

                <div className="mt-3 flex items-center gap-2">
                  <button onClick={() => addPractice(10)} className="px-3 py-1 rounded text-white" style={{ background: "#3FB8AF" }}>
                    +10 min
                  </button>
                  <button onClick={() => addPractice(30)} className="px-3 py-1 rounded text-white" style={{ background: "#3FB8AF" }}>
                    +30 min
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={openGoalModal}
              className="px-5 py-2 rounded-full text-white font-semibold hover:opacity-95"
              style={{ background: "#E63946" }}
            >
              Update Goal
            </button>
          </div>
        </section>

        {/* Modules completed */}
        <section className="bg-white rounded-2xl shadow-sm border p-5">
          <h2 className="text-xl font-bold mb-2">Total Modules Completed</h2>
          <p className="text-gray-600 mb-4">Modules Completed: {STATS.unitsDone} of {UNITS.length} in Beginner Level</p>
          <button
            className="px-5 py-2 rounded-full text-white font-semibold hover:opacity-95"
            style={{ background: "#E63946" }}
            onClick={() => (window.location.href = "/study")}
          >
            Continue Module
          </button>
        </section>

        {/* Streaks */}
        <section className="bg-white rounded-2xl shadow-sm border p-5">
          <h2 className="text-xl font-bold mb-2">Current Streaks</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✅ You’ve studied <strong>5 days</strong> in a row! Keep it up.</li>
            <li>✅ Quick Learner: finished <strong>2 modules</strong> this week.</li>
          </ul>
        </section>

        {/* Units */}
        <section className="bg-white rounded-2xl shadow-sm border p-5">
          <h2 className="text-xl font-bold mb-4">Units</h2>
          <div className="space-y-3">
            {UNITS.map((u) => (
              <div key={u.id} className="rounded-xl border p-3 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{u.id}. {u.title}</div>
                  <div className="text-sm text-gray-500">{u.progress}%</div>
                </div>
                <div className="mt-2 h-2 w-full bg-[#D9D9D9] rounded-full overflow-hidden">
                  <div
                    className="h-full"
                    style={{ width: `${u.progress}%`, background: u.progress > 0 ? "#E63946" : "#D9D9D9" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-xl font-bold mb-4">Badges</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {BADGES.map((b) => (
              <div key={b.id} className="rounded-2xl border bg-white shadow-sm p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full grid place-items-center text-xl" style={{ background: b.color }}>🏅</div>
                <div className="font-medium">{b.name}</div>
              </div>
            ))}
            <div className="rounded-2xl border-dashed border-2 border-gray-300 p-5 text-gray-500 grid place-items-center">
              More coming soon…
            </div>
          </div>
        </section>
      </main>

      {/* Goal modal */}
      <Modal
        open={openGoal}
        onClose={() => setOpenGoal(false)}
        title="Update weekly goal"
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setOpenGoal(false)} className="px-4 py-2 rounded border hover:bg-gray-50">Cancel</button>
            <button onClick={saveGoal} className="px-4 py-2 rounded text-white hover:opacity-95" style={{ background: "#3FB8AF" }}>Save</button>
          </div>
        }
      >
        <label className="text-sm text-gray-600">Minutes per week</label>
        <input
          type="number"
          min={30}
          step={10}
          value={tempGoal}
          onChange={(e) => setTempGoal(e.target.value)}
          className="mt-2 w-full rounded border px-3 py-2"
        />
        <p className="mt-2 text-xs text-gray-500">Tip: goals usually work well between 60–300 minutes.</p>
      </Modal>
    </div>
  );
}

/* Reusable small stat card (kept here for brevity) */
function Stat({ icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full grid place-items-center text-xl" style={{ background: "#D9F5F3" }}>
          {icon}
        </div>
        <div>
          <div className="text-gray-500 text-sm">{label}</div>
          <div className="text-xl font-extrabold">{value}</div>
        </div>
      </div>
    </div>
  );
}


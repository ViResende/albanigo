import { useNavigate } from "react-router-dom";

// Images
import AniImg from "../assets/ani.png";
import DuaImg from "../assets/dua.png";
import ArtaImg from "../assets/arta.png";

const TEACHERS = [
  {
    id: "ani",
    name: "Ani",
    img: AniImg,
    city: "Tirana",
    status: "Online now",
    statusKind: "online", // online | new | slow
  },
  {
    id: "dua",
    name: "Dua",
    img: DuaImg,
    city: "Shkodër",
    status: "Usually responds in 1h",
    statusKind: "slow",
  },
  {
    id: "arta",
    name: "Arta",
    img: ArtaImg,
    city: "Prishtina",
    status: "New teacher",
    statusKind: "new",
  },
];

function StatusBadge({ kind, text }) {
  const map = {
    online: "bg-green-50 text-green-700 ring-1 ring-green-200",
    new: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
    slow: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${map[kind] || ""}`}>
      {text}
    </span>
  );
}

export default function Teacher() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Title */}
        <h1
          className="text-center text-4xl font-extrabold tracking-tight"
          style={{ color: "#3FB8AF" }}
        >
          Live Teacher
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Book a session or start a quick chat with a native Albanian teacher.
        </p>

        {/* Cards */}
        <div className="mt-10 space-y-6">
          {TEACHERS.map((t) => (
            <article
              key={t.id}
              className="flex items-center justify-between gap-6 bg-white rounded-2xl shadow-md p-6 hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              {/* Left: avatar + info */}
              <div className="flex items-center gap-5">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-20 h-20 rounded-full object-cover shadow"
                />
                <div>
                  <h3 className="text-xl font-semibold">{t.name}</h3>
                  <p className="text-sm text-gray-600">Native from {t.city}</p>
                  <div className="mt-2">
                    <StatusBadge kind={t.statusKind} text={t.status} />
                  </div>
                </div>
              </div>

              {/* Right: actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(`/teacher/chat/${t.id}`)}
                  className="px-5 py-2.5 rounded-lg bg-splash text-white font-medium hover:opacity-90"
                  title="Join chat"
                >
                  Join chat
                </button>
                <button
                  onClick={() => navigate(`/teacher/book?teacher=${t.id}`)}
                  className="px-5 py-2.5 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
                  title="Book a session"
                >
                  Book
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}



import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportFlag from "../components/ReportFlag.jsx";

/** Mock cards  */
const CARDS = [
  { front: "Mirëmëngjes", back: "Good morning" },
  { front: "Faleminderit", back: "Thank you" },
  { front: "Ju lutem", back: "Please" },
  { front: "Po", back: "Yes" },
  { front: "Jo", back: "No" },
];

export default function Flashcards() {
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const total = CARDS.length;
  const card = CARDS[i];

  const progress = useMemo(() => (i + 1) / total, [i, total]);
  const filledStars = Math.max(1, Math.round(progress * 5));

  function prev() {
    if (i > 0) {
      setI(i - 1);
      setFlipped(false);
    }
  }
  function next() {
    if (i < total - 1) {
      setI(i + 1);
      setFlipped(false);
    }
  }

  // Simple text-to-speech 
  function speak(text, langHint = "sq-AL") {
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      // I need to find an Albanian voice, fallback to default
      const voice = window.speechSynthesis.getVoices().find(v =>
        v.lang?.toLowerCase().startsWith("sq")
      );
      if (voice) u.voice = voice;
      u.lang = voice?.lang || langHint; // fallback
      window.speechSynthesis.speak(u);
    } catch {}
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="text-2xl leading-none px-2 py-1 rounded hover:bg-gray-100"
            title="Close"
            aria-label="Close"
          >
            ×
          </button>

          {/* stars bound to progress */}
          <div className="flex items-center gap-1 text-xl">
            {Array.from({ length: 5 }).map((_, idx) => (
              <span
                key={idx}
                className={idx < filledStars ? "text-yellow-400" : "text-gray-300"}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="text-sm md:text-base text-gray-600">
          <span className="font-semibold">Flashcards</span> — Unit 1
        </div>

        <ReportFlag />
      </div>

      {/* progress bar */}
      <div className="px-6">
        <div className="h-2 w-full bg-[#D9D9D9] rounded-full overflow-hidden">
          <div
            className="h-full"
            style={{ width: `${progress * 100}%`, background: "#3FB8AF" }}
          />
        </div>
        <div className="mt-1 text-right text-xs text-gray-500">
          {i + 1} / {total}
        </div>
      </div>

      {/* Card area */}
      <div className="p-6 flex justify-center">
        {/* NOTE: is-flipped is on the OUTER element */}
        <div
          className={`card3d w-full max-w-4xl h-[220px] md:h-[260px] ${flipped ? "is-flipped" : ""}`}
          onClick={() => setFlipped(f => !f)}
          title="Click to flip"
        >
          <div className="card3d-inner">
            {/* front */}
            <div className="card3d-face bg-white rounded-2xl shadow-lg border select-none">
              {/* sound button (front) */}
              <button
                onClick={(e) => { e.stopPropagation(); speak(card.front, "sq-AL"); }}
                className="absolute right-3 top-3 w-9 h-9 grid place-items-center rounded-full border hover:bg-gray-50"
                title="Play sound"
                aria-label="Play sound"
              >
                🔊
              </button>

              <div className="text-3xl md:text-4xl font-extrabold">{card.front}</div>
              <div className="absolute bottom-4 left-0 right-0 text-sm text-gray-500">
                Click to flip
              </div>
            </div>

            {/* back */}
            <div className="card3d-face back bg-white rounded-2xl shadow-lg border select-none">
              {/* sound button (back) */}
              <button
                onClick={(e) => { e.stopPropagation(); speak(card.back, "en-US"); }}
                className="absolute right-3 top-3 w-9 h-9 grid place-items-center rounded-full border hover:bg-gray-50"
                title="Play sound"
                aria-label="Play sound"
              >
                🔊
              </button>

              <div className="text-2xl md:text-3xl font-semibold text-splash">{card.back}</div>
              <div className="absolute bottom-4 left-0 right-0 text-sm text-gray-500">
                Click to flip
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="pb-10 flex items-center justify-center gap-3">
        <button
          onClick={prev}
          disabled={i === 0}
          className={`px-5 py-2 rounded-full border transition ${
            i === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50 border-gray-300"
          }`}
        >
          Prev
        </button>

        <button
          onClick={next}
          disabled={i === total - 1}
          className={`px-6 py-2 rounded-full text-white transition ${
            i === total - 1 ? "bg-splash/60 cursor-not-allowed" : "hover:opacity-95"
          }`}
          style={{ background: "#E63946" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}



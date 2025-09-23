import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReportFlag from "../components/ReportFlag.jsx"; 

/** Minimal mock content per unit */
const MOCK_LESSONS = (unitId) => [
  { id: 1, prompt: "Complete the sentence learned previously:", audioText: "Mirëmëngjes, si je?", audioSub: "Good morning, how are you?", sentenceGap: "Mirë, _______. Po ti?", options: ["faleminderit", "shumë", "bukë"], answer: "shumë" },
  { id: 2, prompt: "Pick the correct translation:", audioText: "Faleminderit!", audioSub: "Thank you!", sentenceGap: "_______!", options: ["Përshëndetje", "Faleminderit", "Gjumë"], answer: "Faleminderit" },
  { id: 3, prompt: "Choose the missing word:", audioText: "Unë jam mirë.", audioSub: "I am fine.", sentenceGap: "Unë jam ______.", options: ["mirë", "keq", "diell"], answer: "mirë" },
];

export default function StudyLesson() {
  const { unitId } = useParams();
  const navigate = useNavigate();

  const steps = useMemo(() => MOCK_LESSONS(unitId), [unitId]);
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);

  const total = steps.length;
  const step = steps[stepIndex];
  const progressPct = Math.round((stepIndex / total) * 100);
  const isLast = stepIndex === total - 1;

  // NEW: dynamic stars
  const filledStars = Math.max(1, Math.round(((stepIndex + 1) / total) * 5));

  function onContinue() {
    if (!selected) return;
    const isCorrect = selected === step.answer;
    if (isCorrect) setCorrectCount((c) => c + 1);

    if (!isLast) {
      setStepIndex((i) => i + 1);
      setSelected(null);
    } else {
      navigate("/study");
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Top bar */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-2xl leading-none"
            aria-label="Close lesson"
            title="Close"
          >
            ×
          </button>

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

        <div className="flex-1 mx-6">
          <div className="h-2 w-full rounded-full bg-[#D9D9D9] overflow-hidden">
            <div className="h-full" style={{ width: `${progressPct}%`, backgroundColor: "#3FB8AF" }} />
          </div>
        </div>

        <ReportFlag />
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
          <p className="text-center text-gray-700 mb-4">{step.prompt}</p>

          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 mb-4">
            <button className="text-lg px-3 py-2 rounded bg-white border hover:bg-gray-50" title="Play audio (mock)">
              🔊
            </button>
            <div className="flex-1">
              <div className="font-medium">{step.audioText}</div>
              <div className="text-sm text-gray-500">{step.audioSub}</div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-full px-4 py-3 text-center mb-6">
            {step.sentenceGap}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {step.options.map((opt) => {
              const active = selected === opt;
              return (
                <button
                  key={opt}
                  onClick={() => setSelected(opt)}
                  className={
                    "rounded-md px-4 py-3 border text-center transition " +
                    (active ? "bg-splash text-white border-splash" : "bg-white hover:bg-gray-50 border-gray-200")
                  }
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <button
            onClick={onContinue}
            disabled={!selected}
            className={
              "w-full rounded-full py-3 text-lg font-semibold " +
              (selected ? "bg-splash text-white hover:opacity-95" : "bg-splash/50 text-white cursor-not-allowed")
            }
          >
            {isLast ? "Finish" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}



import { Link } from "react-router-dom";
import BeginnerImg from "../assets/level-beginner.png";
import IntermediateImg from "../assets/level-intermediate.png";
import UpperImg from "../assets/level-upper.png";
import AdvancedImg from "../assets/level-advanced.png";

const levels = [
  { id: "beginner", title: "Beginner", blurb: "You know a few words and greetings.", img: BeginnerImg },
  { id: "intermediate", title: "Intermediate", blurb: "You can hold conversations on simple topics.", img: IntermediateImg },
  { id: "upper", title: "Upper-Intermediate", blurb: "You hold conversations and discuss common topics.", img: UpperImg },
  { id: "advanced", title: "Advanced", blurb: "You discuss complex ideas and understand nuances.", img: AdvancedImg },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto p-6 text-center">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-extrabold mb-10" style={{ color: "#3FB8AF" }}>
          Choose your level
        </h1>

        {/* Levels */}
        <div className="space-y-6">
          {levels.map((lv) => (
            <Link
              key={lv.id}
              to={`/study?level=${lv.id}`}
              className="flex items-center gap-6 rounded-xl p-6 shadow hover:shadow-lg transition hover:-translate-y-1 border"
              style={{ backgroundColor: "#D9D9D9" }}
            >
              <div className="w-28 h-28 rounded-lg flex items-center justify-center">
                <img src={lv.img} alt={lv.title} className="w-20 h-20 object-contain" />
              </div>

              <div className="flex-1 text-left">
                <div className="text-xl font-semibold">{lv.title}</div>
                <div className="text-sm text-gray-700">{lv.blurb}</div>
              </div>

              <span className="text-gray-500 text-2xl">›</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

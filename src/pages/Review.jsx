import { Link } from "react-router-dom";

// Images
import FlashImg from "../assets/review-flashcards.png";
import VocabImg from "../assets/review-vocab.png";
import QuizImg from "../assets/review-quiz.png";

export default function Review() {
  return (
    <div className="min-h-screen bg-cream p-8">
      {/* Title */}
      <h1
        className="text-4xl font-extrabold mb-10 text-center"
        style={{ color: "#3FB8AF" }}
      >
        Review
      </h1>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Flashcards */}
        <Link
          to="/review/flashcards"
          className="rounded-2xl p-8 bg-white border hover:-translate-y-2 hover:shadow-lg transition flex items-center gap-6"
        >
          <img
            src={FlashImg}
            alt="Flashcards"
            className="w-20 h-20 rounded-lg object-cover"
          />

          <div>
            <div className="text-2xl font-semibold">Flashcards</div>
            <p className="text-gray-600 text-lg">
              Practice vocabulary with quick flips.
            </p>
          </div>
        </Link>

        {/* Vocabulary */}
        <div className="rounded-2xl p-8 bg-white border flex items-center gap-6 opacity-90">
          <img
            src={VocabImg}
            alt="Vocabulary"
            className="w-20 h-20 rounded-lg object-cover"
          />

          <div>
            <div className="text-2xl font-semibold">Vocabulary</div>
            <p className="text-gray-600 text-lg">
              Browse words you’ve learned. (Coming soon)
            </p>
          </div>
        </div>

        {/* Take a quiz */}
        <div className="rounded-2xl p-8 bg-white border flex items-center gap-6 md:col-span-2 opacity-90">
          <img
            src={QuizImg}
            alt="Quiz"
            className="w-20 h-20 rounded-lg object-cover"
          />

          <div>
            <div className="text-2xl font-semibold">Take a quiz</div>
            <p className="text-gray-600 text-lg">
              Assess your skills with quick quizzes. (Coming soon)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

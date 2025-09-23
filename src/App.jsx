import { Routes, Route } from "react-router-dom";

// Public pages (no sidebar)
import Splash from "./pages/Splash.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Permission from "./pages/Permission.jsx";
import Settings from "./pages/Settings.jsx";
import Logout from "./pages/Logout.jsx";


// App pages (with sidebar)
import Home from "./pages/Home.jsx";
import StudyIntro from "./pages/StudyIntro.jsx";
import StudyLesson from "./pages/StudyLesson.jsx";
import Review from "./pages/Review.jsx";
import Flashcards from "./pages/Flashcards.jsx";
import Teacher from "./pages/Teacher.jsx";
import BookSession from "./pages/BookSession.jsx";
import Progress from "./pages/Progress.jsx";
import User from "./pages/User.jsx";
import TeacherChat from "./pages/TeacherChat.jsx";

// Layouts
import LayoutPublic from "./components/LayoutPublic.jsx";
import LayoutApp from "./components/LayoutApp.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public flow */}
      <Route path="/" element={<LayoutPublic><Splash /></LayoutPublic>} />
      <Route path="/login" element={<LayoutPublic><Login /></LayoutPublic>} />
      <Route path="/signup" element={<LayoutPublic><Signup /></LayoutPublic>} />
      <Route path="/allow-notifications" element={<LayoutPublic><Permission /></LayoutPublic>} />

      {/* App flow (left sidebar) */}
      <Route path="/home" element={<LayoutApp><Home /></LayoutApp>} />
      <Route path="/study" element={<LayoutApp><StudyIntro /></LayoutApp>} />
      <Route path="/study/:unitId" element={<LayoutApp><StudyLesson /></LayoutApp>} />
      <Route path="/review" element={<LayoutApp><Review /></LayoutApp>} />
      <Route path="/review/flashcards" element={<LayoutApp><Flashcards /></LayoutApp>} />
      <Route path="/teacher" element={<LayoutApp><Teacher /></LayoutApp>} />
      <Route path="/teacher/chat/:teacherId" element={<LayoutApp><TeacherChat /></LayoutApp>} />
      <Route path="/teacher/book" element={<LayoutApp><BookSession /></LayoutApp>} />
      <Route path="/progress" element={<LayoutApp><Progress /></LayoutApp>} />
      <Route path="/settings" element={<LayoutApp><Settings /></LayoutApp>} />
      <Route path="/logout" element={<LayoutApp><Logout /></LayoutApp>} />
      <Route path="/user" element={<LayoutApp><User /></LayoutApp>} />
    </Routes>
  );
}

import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

// imported images
import StudyIcon from "../assets/StudyB.png";
import ReviewIcon from "../assets/ReviewB.png";
import TeacherIcon from "../assets/TeacherB.png";
import ProgressIcon from "../assets/ProgressB.png";

const base = "flex items-center gap-2 px-4 py-2 rounded-md";
const idle = "text-gray-700 hover:bg-gray-100";
const active = "bg-splash/10 text-splash font-semibold";

export default function SideNav() {
  const [openMore, setOpenMore] = useState(false);

  return (
    <aside className="w-56 shrink-0 border-r bg-white h-screen sticky top-0">
      <div className="p-4 text-xl font-bold">AlbaniGo</div>

      <nav className="px-3 space-y-1">
        <NavLink to="/home" className={({isActive}) => `${base} ${isActive?active:idle}`}>
          🏠 Home
        </NavLink>

        <NavLink to="/study" className={({isActive}) => `${base} ${isActive?active:idle}`}>
          <img src={StudyIcon} alt="Study" className="w-5 h-5" />
          Study
        </NavLink>

        <NavLink to="/review" className={({isActive}) => `${base} ${isActive?active:idle}`}>
          <img src={ReviewIcon} alt="Review" className="w-5 h-5" />
          Review
        </NavLink>

        <NavLink to="/teacher" className={({isActive}) => `${base} ${isActive?active:idle}`}>
          <img src={TeacherIcon} alt="Teacher" className="w-5 h-5" />
          Teacher
        </NavLink>

        <NavLink to="/progress" className={({isActive}) => `${base} ${isActive?active:idle}`}>
          <img src={ProgressIcon} alt="Progress" className="w-5 h-5" />
          Progress
        </NavLink>

        {/* More collapsible */}
        <button
          onClick={() => setOpenMore((s) => !s)}
          className="w-full flex items-center gap-2 mt-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          {openMore ? "▴" : "▾"} More
        </button>
        {openMore && (
          <div className="ml-4 space-y-1">
            <NavLink to="/user" className={({isActive}) => `${base} ${isActive?active:idle}`}>User</NavLink>
            <NavLink to="/settings" className={({isActive}) => `${base} ${isActive?active:idle}`}>Settings</NavLink>
            <Link to="/logout" className={`${base} ${idle}`}>Log out</Link>
          </div>
        )}
      </nav>
    </aside>
  );
}

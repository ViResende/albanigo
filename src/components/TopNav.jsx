// src/components/TopNav.jsx
import { NavLink } from "react-router-dom";
import logo from "../assets/logoVR.png"; 

export default function TopNav() {
  const link = "text-gray-700 hover:text-progress px-3 py-2 text-sm font-medium";

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow">
      {/* Left side = logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="AlbaniGo logo" className="h-8 w-auto" />
        <span className="font-poppins font-semibold text-xl text-splash">
          AlbaniGo
        </span>
      </div>

      {/* Right side = links */}
      <nav className="flex gap-4">
        <NavLink to="/about" className={link}>About</NavLink>
        <NavLink to="/support" className={link}>Support</NavLink>
        <NavLink to="/terms" className={link}>Terms</NavLink>
        <NavLink to="/privacy" className={link}>Privacy</NavLink>
        <NavLink to="/stories" className={link}>Stories</NavLink>
      </nav>
    </header>
  );
}

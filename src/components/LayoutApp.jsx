// src/components/LayoutApp.jsx
import SideNav from "./SideNav";

export default function LayoutApp({ children }) {
  return (
    <div className="min-h-screen flex bg-cream">
      <SideNav />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}


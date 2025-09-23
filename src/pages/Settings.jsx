import { useEffect, useState } from "react";

/** Reusable switch (green when ON) */
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={
        "relative inline-flex h-7 w-12 items-center rounded-full transition-colors " +
        (checked ? "bg-green-500" : "bg-gray-300")
      }
      aria-pressed={checked}
    >
      <span
        className={
          "inline-block h-5 w-5 transform rounded-full bg-white transition " +
          (checked ? "translate-x-6" : "translate-x-1")
        }
      />
    </button>
  );
}

export default function Settings() {
  // state
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("light"); // "light" | "dark"

  // load
  useEffect(() => {
    const n = localStorage.getItem("settings.notifications");
    const l = localStorage.getItem("settings.language");
    const t = localStorage.getItem("settings.theme");
    if (n != null) setNotifications(n === "1");
    if (l) setLanguage(l);
    if (t) setTheme(t);
  }, []);

  // persist
  useEffect(() => localStorage.setItem("settings.notifications", notifications ? "1" : "0"), [notifications]);
  useEffect(() => localStorage.setItem("settings.language", language), [language]);
  useEffect(() => localStorage.setItem("settings.theme", theme), [theme]);

  return (
    <div className="min-h-screen bg-cream">
      {/* header / hero */}
      <div className="h-32 bg-gradient-to-r from-[#3FB8AF] to-[#3FB8AF]/70" />
      {/* card */}
      <div className="max-w-5xl mx-auto -mt-14 px-6 pb-10">
        <div className="bg-white border rounded-2xl shadow-sm p-6">
          <h1 className="text-2xl font-extrabold mb-1" style={{ color: "#3FB8AF" }}>Settings</h1>
          <p className="text-gray-600 mb-6">Tweak notifications, theme, and interface language.</p>

          {/* 2-column on desktop */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Notifications */}
            <section className="rounded-xl border p-5 hover:shadow-sm transition">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold">Notifications</div>
                  <p className="text-sm text-gray-600">
                    Lesson reminders & progress tips.
                  </p>
                </div>
                <Toggle checked={notifications} onChange={setNotifications} />
              </div>

              <div className="mt-4 text-sm">
                Status:{" "}
                <span className={notifications ? "text-green-600 font-medium" : "text-gray-500"}>
                  {notifications ? "Enabled" : "Disabled"}
                </span>
              </div>
            </section>

            {/* Theme */}
            <section className="rounded-xl border p-5 hover:shadow-sm transition">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Theme</div>
                  <p className="text-sm text-gray-600">Light or Dark (demo)</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme("light")}
                    className={
                      "px-3 py-2 rounded border " +
                      (theme === "light" ? "bg-gray-100 border-gray-300" : "hover:bg-gray-50")
                    }
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={
                      "px-3 py-2 rounded border " +
                      (theme === "dark" ? "bg-gray-900 text-white border-gray-800" : "hover:bg-gray-50")
                    }
                  >
                    Dark
                  </button>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                Current: <span className="font-medium">{theme}</span>
              </div>
            </section>

            {/* Language */}
            <section className="rounded-xl border p-5 hover:shadow-sm transition">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Interface language</div>
                  <p className="text-sm text-gray-600">
                    Labels & UI (not lesson language).
                  </p>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border rounded px-3 py-2"
                >
                  <option value="en">English</option>
                  <option value="sq">Shqip (Albanian)</option>
                </select>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Selected: <span className="font-medium uppercase">{language}</span>
              </div>
            </section>

            {/* Quick actions */}
            <section className="rounded-xl border p-5 hover:shadow-sm transition">
              <div className="font-semibold mb-2">Quick actions</div>
              <div className="flex flex-wrap gap-2">
                <button
                  className="px-4 py-2 rounded-full border hover:bg-gray-50"
                  onClick={() => {
                    setNotifications(true);
                    setLanguage("en");
                    setTheme("light");
                  }}
                >
                  Restore defaults
                </button>
                <button
                  className="px-4 py-2 rounded-full text-white hover:opacity-95"
                  style={{ background: "#E63946" }}
                  onClick={() => alert("Delete account is disabled in demo")}
                >
                  Delete account
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


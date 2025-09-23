export default function User() {
  const user = {
    name: "Alba Learner",
    email: "alba@example.com",
    avatar: "/src/assets/avatar.png", 
    streak: Number(localStorage.getItem("streak") || 5),
    words:  Number(localStorage.getItem("wordsLearned") || 180),
    level: "Beginner",
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* cover */}
      <div className="h-36 bg-gradient-to-r from-[#3FB8AF] to-[#3FB8AF]/70" />

      {/* card */}
      <div className="max-w-4xl mx-auto -mt-16 px-6 pb-10">
        <div className="bg-white border rounded-2xl shadow-sm p-6">
          {/* header row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow -mt-10 md:mt-0 bg-[#D9D9D9]"
              />
              <div>
                <h1 className="text-2xl font-extrabold">{user.name}</h1>
                <div className="text-gray-600">{user.email}</div>
                <div className="mt-1 text-sm">
                  Level: <span className="font-medium">{user.level}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-full border hover:bg-gray-50">Edit profile</button>
              <button
                className="px-4 py-2 rounded-full text-white hover:opacity-95"
                style={{ background: "#3FB8AF" }}
              >
                Change avatar
              </button>
            </div>
          </div>

          {/* stats grid */}
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <div className="rounded-xl border p-4 text-center">
              <div className="text-gray-500 text-sm">Streak</div>
              <div className="text-2xl font-bold">{user.streak} days</div>
            </div>
            <div className="rounded-xl border p-4 text-center">
              <div className="text-gray-500 text-sm">Words learned</div>
              <div className="text-2xl font-bold">{user.words}</div>
            </div>
            <div className="rounded-xl border p-4 text-center">
              <div className="text-gray-500 text-sm">Account</div>
              <div className="text-2xl font-bold">Free</div>
            </div>
          </div>

          {/* about + preferences */}
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border p-4">
              <div className="font-semibold mb-2">About you</div>
              <p className="text-gray-600 text-sm">
                Add a short bio about your Albanian goals. (Portfolio demo—no backend required.)
              </p>
            </div>
            <div className="rounded-xl border p-4">
              <div className="font-semibold mb-2">Preferences</div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Interface language: English</li>
                <li>• Notifications: On</li>
                <li>• Theme: Light</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

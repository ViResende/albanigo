import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-cream p-6 flex items-center justify-center">
      <div className="bg-white border rounded-2xl p-6 shadow-sm max-w-md w-full text-center">
        <h1 className="text-2xl font-extrabold mb-2" style={{ color: "#3FB8AF" }}>Log out</h1>
        <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate(-1)} className="px-5 py-2 rounded-full border hover:bg-gray-50">Cancel</button>
          <button onClick={() => navigate("/")} className="px-5 py-2 rounded-full text-white hover:opacity-95" style={{ background: "#E63946" }}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

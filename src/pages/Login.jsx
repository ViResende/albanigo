import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    // fake auth -> go ask notifications
    nav("/allow-notifications");
  }

  return (
    <div className="min-h-screen grid place-items-center bg-cream">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Log in</h1>

        <label className="block text-sm mb-1">Email</label>
        <input className="w-full mb-3 border rounded px-3 py-2"
               value={email} onChange={e=>setEmail(e.target.value)} />

        <label className="block text-sm mb-1">Password</label>
        <input type="password" className="w-full mb-4 border rounded px-3 py-2"
               value={pass} onChange={e=>setPass(e.target.value)} />

        <button type="submit" className="w-full bg-splash text-white py-2 rounded font-medium">Sign in</button>

        <p className="text-sm mt-4 text-center">
          No account? <Link className="underline" to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

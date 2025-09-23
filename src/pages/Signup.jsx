import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    first: "",
    last: "",
    user: "",
    email: "",
    pass: "",
    confirm: ""
  });

  function onSubmit(e) {
    e.preventDefault();
    // pretend to create user, then ask notifications
    nav("/allow-notifications");
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <form
        onSubmit={onSubmit}
        className="mx-auto w-full max-w-3xl bg-white p-8 md:p-10 rounded-xl shadow"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Sign up</h1>

        {/* 2-column on md+, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* First / Last */}
          <div>
            <label className="block text-sm mb-1">First name</label>
            <input className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Last name</label>
            <input className="w-full border rounded px-3 py-2" />
          </div>

          {/* Username / Email (email spans full width) */}
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input className="w-full border rounded px-3 py-2" />
          </div>
          <div className="md:col-span-1 md:hidden" />{/* keeps grid tidy on mobile */}
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Email</label>
            <input type="email" className="w-full border rounded px-3 py-2" />
          </div>

          {/* Passwords (side-by-side on desktop) */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input type="password" className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Confirm password</label>
            <input type="password" className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center gap-4 md:justify-between flex-col md:flex-row">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-splash text-white rounded font-medium"
          >
            Create account
          </button>

          <p className="text-sm text-center md:text-right">
            Have an account? <Link className="underline" to="/login">Log in</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

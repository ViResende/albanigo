import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TEACHER_NAMES = { ani: "Ani", dua: "Dua", arta: "Arta" };

export default function TeacherChat() {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const name = TEACHER_NAMES[teacherId?.toLowerCase()] || "Teacher";
  const [messages, setMessages] = useState([
    { id: 1, from: "them", text: `Hi! I’m ${name}. How can I help you today?`, at: new Date() },
  ]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);

  function send(text) {
    if (!text.trim()) return;
    const mine = { id: Date.now(), from: "me", text: text.trim(), at: new Date() };
    setMessages((m) => [...m, mine]);
    setDraft("");

    // simulate teacher typing + reply
    setTyping(true);
    setTimeout(() => {
      const reply = { id: Date.now()+1, from: "them", text: "Great question! Let’s practice together. 😊", at: new Date() };
      setMessages((m) => [...m, reply]);
      setTyping(false);
    }, 900);
  }

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-white flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="px-3 py-1 rounded hover:bg-gray-100">←</button>
        <div className="text-lg font-semibold">{name}</div>
        <div className="text-xs text-teal">Online</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4" ref={listRef}>
        {messages.map(m => (
          <div key={m.id} className={`mb-3 flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={
                "max-w-[70%] rounded-2xl px-4 py-2 " +
                (m.from === "me" ? "bg-splash text-white rounded-br-sm" : "bg-white border rounded-bl-sm")
              }
            >
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="mb-3 flex justify-start">
            <div className="bg-white border rounded-2xl rounded-bl-sm px-4 py-2 text-gray-500">typing…</div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); send(draft); }}
        className="p-3 bg-white border-t flex gap-2"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a message…"
          className="flex-1 px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-teal"
        />
        <button
          type="submit"
          className="px-5 py-2 rounded bg-splash text-white font-medium hover:opacity-95"
        >
          Send
        </button>
      </form>
    </div>
  );
}

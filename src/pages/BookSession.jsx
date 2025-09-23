import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


const TEACHERS = {
  ani:  { id: "ani",  name: "Ani",  tagline: "Native from Tirana",   status: "Online now",       avatar: "/src/assets/ani.png" },
  dua:  { id: "dua",  name: "Dua",  tagline: "Native from Shkodër",  status: "Usually responds in 1h", avatar: "/src/assets/dua.png" },
  arta: { id: "arta", name: "Arta", tagline: "Native from Prishtina", status: "New teacher",      avatar: "/src/assets/arta.png" },
};

// small helpers
function startOfMonth(d){ return new Date(d.getFullYear(), d.getMonth(), 1); }
function daysInMonth(d){ return new Date(d.getFullYear(), d.getMonth()+1, 0).getDate(); }
const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function BookSession() {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const teacherId = (search.get("teacher") || "ani").toLowerCase();
  const teacher = TEACHERS[teacherId] || TEACHERS.ani;

  const [monthCursor, setMonthCursor] = useState(new Date()); // current month view
  const [selectedDate, setSelectedDate]   = useState(null);
  const [selectedTime, setSelectedTime]   = useState(null);
  const [confirmMsg, setConfirmMsg]       = useState("");

  const calendar = useMemo(() => {
    const start = startOfMonth(monthCursor);
    const total = daysInMonth(monthCursor);
    const leading = start.getDay(); // empty cells before 1st

    const cells = [];
    // leading blanks
    for (let i=0;i<leading;i++) cells.push({ key:`b${i}`, blank:true });
    // days
    for (let d=1; d<=total; d++) {
      const date = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), d);
      cells.push({ key:`d${d}`, blank:false, date, day:d });
    }
    return cells;
  }, [monthCursor]);

  // Pretend we got available times from backend:
  const AVAILABLE_TIMES = ["8:00 am","10:00 am","2:00 pm","6:00 pm"];

  function nextMonth(){ setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth()+1, 1)); }
  function prevMonth(){ setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth()-1, 1)); }

  function onPick(date){
    setSelectedDate(date);
    setSelectedTime(null);
    setConfirmMsg("");
  }

  function onBook() {
    if (!selectedDate || !selectedTime) return;
    const nice = selectedDate.toLocaleDateString(undefined, { month:"long", day:"numeric", year:"numeric" });
    setConfirmMsg(`Booked ${teacher.name} on ${nice} at ${selectedTime}. 🎉`);
  }

  return (
    <div className="min-h-screen bg-cream p-6">
      {/* Title row */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="px-3 py-1 rounded hover:bg-gray-100">← Back</button>
        <h1 className="text-3xl font-extrabold" style={{ color: "#3FB8AF" }}>Book a Session</h1>
        <div className="w-20" />
      </div>

      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
        {/* Teacher card */}
        <div className="rounded-2xl bg-white border p-5">
          <div className="flex items-center gap-4">
            <img src={teacher.avatar} alt={teacher.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <div className="text-xl font-semibold">{teacher.name}</div>
              <div className="text-sm text-gray-600">{teacher.tagline}</div>
              <div className="text-xs text-teal mt-1">{teacher.status}</div>
            </div>
          </div>
          <p className="mt-4 text-gray-600">
            Pick a day on the calendar, then choose a time that works for you.
          </p>
        </div>

        {/* Calendar */}
        <div className="rounded-2xl bg-white border p-5">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="px-2 py-1 rounded hover:bg-gray-100">←</button>
            <div className="font-semibold">
              {monthCursor.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
            </div>
            <button onClick={nextMonth} className="px-2 py-1 rounded hover:bg-gray-100">→</button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-sm mb-2">
            {WEEKDAYS.map(d => (
              <div key={d} className="text-center text-gray-500">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendar.map(c => c.blank ? (
              <div key={c.key} />
            ) : (
              <button
                key={c.key}
                onClick={() => onPick(c.date)}
                className={
                  "h-10 rounded-md border text-center " +
                  (selectedDate && +c.date === +selectedDate
                    ? "bg-splash text-white border-splash"
                    : "bg-white hover:bg-gray-50 border-gray-200")
                }
              >
                {c.day}
              </button>
            ))}
          </div>
        </div>

        {/* Time slots */}
        <div className="rounded-2xl bg-white border p-5 md:col-span-2">
          <div className="mb-3 font-semibold">Available times</div>
          <div className="flex flex-wrap gap-3">
            {AVAILABLE_TIMES.map(t => (
              <button
                key={t}
                disabled={!selectedDate}
                onClick={() => setSelectedTime(t)}
                className={
                  "px-4 py-2 rounded-full border " +
                  (!selectedDate
                    ? "opacity-50 cursor-not-allowed"
                    : selectedTime === t
                      ? "bg-splash text-white border-splash"
                      : "bg-white hover:bg-gray-50 border-gray-200")
                }
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={onBook}
              disabled={!selectedDate || !selectedTime}
              className={
                "w-full md:w-auto px-6 py-3 rounded-full font-semibold " +
                (!selectedDate || !selectedTime
                  ? "bg-splash/50 text-white cursor-not-allowed"
                  : "bg-splash text-white hover:opacity-95")
              }
            >
              Confirm booking
            </button>
          </div>

          {confirmMsg && (
            <div className="mt-4 p-3 rounded-md bg-teal/10 text-teal">{confirmMsg}</div>
          )}
        </div>
      </div>
    </div>
  );
}

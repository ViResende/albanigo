import { useNavigate } from "react-router-dom";

export default function Permission() {
  const nav = useNavigate();

  function allow(){
    //Notification.requestPermission().finally(() => nav("/home"));
    nav("/home");
  }

  return (
    <div className="min-h-screen grid place-items-center bg-cream">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-lg text-center">
        <div className="text-4xl mb-4">🔔</div>
        <h1 className="text-2xl font-bold mb-2">Don’t miss out!</h1>
        <p className="text-gray-700 mb-6">
          Allow notifications so we can remind you about homework and keep you on track.
        </p>

        <div className="flex gap-3 justify-center">
          <button onClick={()=>nav("/home")} className="px-5 py-2 rounded border">No, thanks</button>
          <button onClick={allow} className="px-5 py-2 rounded bg-splash text-white">Allow</button>
        </div>
      </div>
    </div>
  );
}

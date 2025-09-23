import { useState } from "react";

/**
 * Reusable red-flag button + tiny toast.
 */
export default function ReportFlag({ className = "" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        title="Report error"
        onClick={() => setOpen(true)}
        className={`text-lg px-2 py-1 rounded hover:bg-gray-100 ${className}`}
      >
        🚩
      </button>

      {open && (
        <div className="fixed top-4 right-4 z-50 bg-white border rounded-md shadow-lg p-3 w-64">
          <div className="font-semibold mb-1">Report issue</div>
          <p className="text-gray-600 text-sm">
            Thanks! Your report was recorded for this screen.
          </p>
          <div className="mt-3 text-right">
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-1 text-white rounded"
              style={{ background: "#3FB8AF" }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

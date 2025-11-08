// src/hooks/useBeforeUnload.js
import { useEffect } from "react";
import { useState } from "react";





export default function Scrap() {
  
    const [isTakingTest, setIsTakingTest] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);


    function useBeforeUnload(when = true) {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (when) {
        event.preventDefault();
        event.returnValue = ""; // required for Chrome
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [when]);
}


  // Prevent accidental closing while taking test
  useBeforeUnload(isTakingTest);

  const handleQuitClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmQuit = () => {
    setIsTakingTest(false);
    setShowConfirm(false);
    // navigate to home or results page
    window.location.href = "/";
  };

  const handleCancelQuit = () => {
    setShowConfirm(false);
  };

  return (
    <div className="p-6 min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Online Test</h1>

      {/* Example Question */}
      <div className="w-full max-w-md bg-white p-4 rounded-2xl shadow">
        <p>Question 1: What is React?</p>
        <input className="border p-2 w-full mt-2 rounded" placeholder="Your answer..." />
      </div>

      <button
        onClick={handleQuitClick}
        className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Quit Test
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 shadow-xl text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Exit</h2>
            <p className="mb-6">Are you sure you want to quit? Your progress will be lost.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancelQuit}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmQuit}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Quit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

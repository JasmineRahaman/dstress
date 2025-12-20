import React from 'react'

function Journaling() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-lavender-50 via-white to-calm-blue-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-10">

        <h1 className="text-4xl font-extrabold text-calm-blue-700 mb-6 text-center">
          ✍️ Journaling
        </h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-calm-green-700 mb-3">
            Why Journaling Helps Reduce Stress
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Journaling allows you to express emotions, clarify thoughts, and reduce rumination. 
            Writing down feelings improves emotional awareness, lowers anxiety, and helps you process 
            stressful experiences. Therapists often recommend journaling as a tool for mindfulness 
            and self-reflection.
          </p>
        </div>

        <div className="bg-calm-green-50 border-2 border-calm-green-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-calm-green-700 mb-3">📓 Try This</h3>
          <p className="text-gray-700 mb-4">
            Write down three things you’re grateful for today, or describe your day in detail. 
            Focus on honesty rather than perfection.
          </p>
          {/* <button className="bg-calm-blue-500 hover:bg-calm-blue-600 text-white px-6 py-3 rounded-md font-medium">
            Start Journaling
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default Journaling

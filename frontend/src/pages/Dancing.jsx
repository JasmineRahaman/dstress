import React from 'react'

function Dancing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-calm-blue-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-10">
        
        <h1 className="text-4xl font-extrabold text-calm-blue-700 mb-6 text-center">
          💃 Dancing
        </h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-pink-700 mb-3">
            Why Dancing Helps Reduce Stress
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Dancing is a joyful physical activity that releases endorphins, the body’s natural 
            “feel-good” chemicals. It improves cardiovascular health, boosts energy, and provides 
            emotional release. Moving to music also enhances coordination and helps you express 
            emotions freely, reducing anxiety and tension.
          </p>
        </div>

        <div className="bg-calm-green-50 border-2 border-calm-green-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-calm-green-700 mb-3">🎶 Try This</h3>
          <p className="text-gray-700 mb-4">
            Put on your favorite upbeat song and dance freely for 10 minutes. 
            Focus on enjoying the rhythm rather than perfect moves.
          </p>
          {/* <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-md font-medium">
            Start Dancing
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default Dancing

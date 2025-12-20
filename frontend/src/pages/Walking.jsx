import React from 'react'

function Walking() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-calm-blue-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-10">
        
        <h1 className="text-4xl font-extrabold text-calm-blue-700 mb-6 text-center">
          🚶 Walking
        </h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-yellow-700 mb-3">
            Why Walking Helps Reduce Stress
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Walking is a simple yet powerful activity that improves circulation, lowers blood pressure, 
            and reduces anxiety. The rhythmic movement calms the nervous system, while exposure to fresh 
            air and sunlight boosts mood. Even a short walk can clear your mind and promote relaxation.
          </p>
        </div>

        <div className="bg-calm-green-50 border-2 border-calm-green-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-calm-green-700 mb-3">🌞 Try This</h3>
          <p className="text-gray-700 mb-4">
            Take a 15-minute walk around your neighborhood. Focus on your breathing and notice 
            the sights and sounds around you.
          </p>
          {/* <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md font-medium">
            Start Walking
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default Walking

import React from 'react'

function Swimming() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-blue-50 via-white to-calm-green-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-10">

        <h1 className="text-4xl font-extrabold text-calm-blue-700 mb-6 text-center">
          🏊 Swimming
        </h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-calm-green-700 mb-3">
            Why Swimming Helps Reduce Stress
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Swimming combines physical exercise with the calming effects of water. It reduces cortisol, 
            boosts endorphins, and improves cardiovascular health. Floating or gentle laps can relax 
            muscles and promote mindfulness, making swimming a powerful stress-relief activity.
          </p>
        </div>

        <div className="bg-calm-green-50 border-2 border-calm-green-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-calm-green-700 mb-3">💦 Try This</h3>
          <p className="text-gray-700 mb-4">
            Spend 20 minutes swimming or simply floating in the pool. Focus on your breathing and 
            the soothing sensation of water.
          </p>
          {/* <button className="bg-calm-blue-500 hover:bg-calm-blue-600 text-white px-6 py-3 rounded-md font-medium">
            Start Swimming
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default Swimming

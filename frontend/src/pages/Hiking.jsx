import React from 'react'

function Hiking() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-calm-blue-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-10">
        
        <h1 className="text-4xl font-extrabold text-calm-blue-700 mb-6 text-center">
          🥾 Hiking
        </h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-3">
            Why Hiking Helps Reduce Stress
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Hiking combines physical exercise with exposure to nature. Research shows that spending 
            time outdoors lowers cortisol levels, reduces anxiety, and improves mental clarity. 
            Walking on trails also strengthens muscles, boosts cardiovascular health, and provides 
            a sense of adventure and accomplishment.
          </p>
        </div>

        {/* Sample Hiking Spots */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-calm-blue-700 mb-4">
            Popular Hiking Spots
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg shadow-md p-4">
              <h3 className="text-lg font-bold text-green-700 mb-2">🌄 Sinhagad Fort, Pune</h3>
              <p className="text-gray-700">A historic fort with scenic trails and panoramic views.</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-4">
              <h3 className="text-lg font-bold text-green-700 mb-2">🏞️ Rajmachi Trek, Maharashtra</h3>
              <p className="text-gray-700">A lush trail with waterfalls and ancient forts.</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-4">
              <h3 className="text-lg font-bold text-green-700 mb-2">🌲 Lohagad Fort, Lonavala</h3>
              <p className="text-gray-700">Easy trek with rich greenery and historic ruins.</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-4">
              <h3 className="text-lg font-bold text-green-700 mb-2">⛰️ Harishchandragad, Maharashtra</h3>
              <p className="text-gray-700">Challenging trek with caves and breathtaking views.</p>
            </div>
          </div>
        </div>

        <div className="bg-calm-green-50 border-2 border-calm-green-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-calm-green-700 mb-3">🌿 Try This</h3>
          <p className="text-gray-700 mb-4">
            Plan a short hike this weekend. Carry water, wear comfortable shoes, and enjoy the 
            sights and sounds of nature.
          </p>
          {/* <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium">
            Start Hiking
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default Hiking

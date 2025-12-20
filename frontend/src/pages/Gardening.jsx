import React from 'react'

function Gardening() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-calm-lavender-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-10">

        <h1 className="text-4xl font-extrabold text-calm-blue-700 mb-6 text-center">
          🌱 Gardening
        </h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-3">
            Why Gardening Helps Reduce Stress
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Gardening connects you with nature and provides grounding sensory input. Working with soil 
            and plants lowers cortisol, reduces anxiety, and promotes mindfulness. It also encourages 
            physical activity and nurtures a sense of accomplishment.
          </p>
        </div>

        <div className="bg-calm-green-50 border-2 border-calm-green-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-calm-green-700 mb-3">🌸 Try This</h3>
          <p className="text-gray-700 mb-4">
            Plant herbs in small pots or water your existing plants mindfully. Notice the textures, 
            scents, and colors as you care for them.
          </p>
          {/* <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium">
            Start Gardening
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default Gardening

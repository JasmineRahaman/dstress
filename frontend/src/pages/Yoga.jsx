import React from 'react'

function Yoga() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-blue-50 via-white to-calm-green-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-10">
        
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-calm-blue-700 mb-6 text-center">
          🧘 Yoga
        </h1>
        
        {/* Scientific Explanation */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-calm-green-700 mb-3">
            Why Yoga Helps Reduce Stress
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Yoga combines mindful breathing, physical postures, and meditation. Clinical studies show 
            that yoga lowers cortisol levels, improves flexibility, and enhances emotional regulation. 
            Practicing yoga regularly reduces anxiety, promotes relaxation, and strengthens the mind-body 
            connection, making it one of the most effective stress management techniques.
          </p>
        </div>

        {/* Positive Effects */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-calm-blue-100 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold text-calm-blue-700 mb-2">💪 Physical Benefits</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Improves flexibility and balance</li>
              <li>Strengthens muscles and joints</li>
              <li>Enhances circulation and breathing</li>
            </ul>
          </div>
          <div className="bg-calm-lavender-100 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold text-calm-lavender-700 mb-2">🧠 Mental Benefits</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Reduces anxiety and depression</li>
              <li>Boosts mindfulness and focus</li>
              <li>Encourages emotional balance</li>
            </ul>
          </div>
        </div>

        {/* Sample Beginner Poses */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-calm-blue-700 mb-4">
            Beginner Yoga Poses
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg shadow-md p-4 text-center">
              <img 
                src="https://images.unsplash.com/photo-1599058917212-9d1f3f3f3f3f?auto=format&fit=crop&w=400&q=80" 
                alt="Mountain Pose" 
                className="rounded-md mb-3"
              />
              <p className="text-sm text-gray-700">⛰️ Mountain Pose (Tadasana)</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-4 text-center">
              <img 
                src="https://images.unsplash.com/photo-1605296867304-46d5465a13f3?auto=format&fit=crop&w=400&q=80" 
                alt="Child's Pose" 
                className="rounded-md mb-3"
              />
              <p className="text-sm text-gray-700">🙏 Child’s Pose (Balasana)</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-4 text-center">
              <img 
                src="https://images.unsplash.com/photo-1605296867304-46d5465a13f3?auto=format&fit=crop&w=400&q=80" 
                alt="Downward Dog" 
                className="rounded-md mb-3"
              />
              <p className="text-sm text-gray-700">🐶 Downward Dog (Adho Mukha Svanasana)</p>
            </div>
          </div>
        </div>

        {/* Inspiration Section */}
        <div className="bg-calm-green-50 border-2 border-calm-green-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-calm-green-700 mb-3">
            🌸 Try This
          </h3>
          <p className="text-gray-700 mb-4">
            Begin with 10 minutes of gentle yoga. Focus on your breath and body movements. 
            Don’t worry about perfection — the goal is relaxation and mindfulness.
          </p>
          {/* <button className="bg-calm-blue-500 hover:bg-calm-blue-600 text-white px-6 py-3 rounded-md font-medium">
            Start Yoga Practice
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default Yoga

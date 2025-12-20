import React from 'react'

function Meditation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-lavender-50 via-white to-calm-blue-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-10">
        
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-calm-blue-700 mb-6 text-center">
          🧘 Meditation
        </h1>
        
        {/* Scientific Explanation */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-calm-green-700 mb-3">
            Why Meditation Helps Reduce Stress
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Meditation is a practice of focusing attention and calming the mind. Clinical studies show 
            that meditation reduces cortisol levels, lowers blood pressure, and enhances emotional regulation. 
            It helps quiet racing thoughts, improves concentration, and promotes a deep sense of relaxation. 
            Regular meditation is linked to reduced anxiety and improved overall well-being.
          </p>
        </div>

        {/* Positive Effects */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-calm-blue-100 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold text-calm-blue-700 mb-2">🧠 Mental Benefits</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Reduces anxiety and depression</li>
              <li>Improves focus and clarity</li>
              <li>Encourages mindfulness and emotional balance</li>
            </ul>
          </div>
          <div className="bg-calm-lavender-100 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold text-calm-lavender-700 mb-2">🌿 Physical Benefits</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Lowers blood pressure</li>
              <li>Slows heart rate and breathing</li>
              <li>Improves sleep quality</li>
            </ul>
          </div>
        </div>

        {/* Guided Breathing Steps */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-calm-blue-700 mb-4">
            Simple Guided Breathing
          </h2>
          <ol className="list-decimal pl-5 text-gray-700 space-y-2">
            <li>Sit comfortably with your back straight.</li>
            <li>Close your eyes and relax your shoulders.</li>
            <li>Inhale slowly through your nose for 4 seconds.</li>
            <li>Hold your breath gently for 2 seconds.</li>
            <li>Exhale slowly through your mouth for 6 seconds.</li>
            <li>Repeat this cycle for 5–10 minutes.</li>
          </ol>
        </div>

        {/* Inspiration Section */}
        <div className="bg-calm-green-50 border-2 border-calm-green-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-calm-green-700 mb-3">
            🌸 Try This
          </h3>
          <p className="text-gray-700 mb-4">
            Find a quiet space, close your eyes, and practice mindful breathing. 
            Focus on the present moment and let go of stress.
          </p>
          {/* <button className="bg-calm-blue-500 hover:bg-calm-blue-600 text-white px-6 py-3 rounded-md font-medium">
            Begin Meditation
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default Meditation

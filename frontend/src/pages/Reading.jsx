import React from 'react'

function Reading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-lavender-50 via-white to-calm-blue-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-10">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-calm-blue-700 mb-6 text-center">
          📚 Reading
        </h1>

        {/* Scientific Explanation */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-calm-green-700 mb-3">
            Why Reading Helps Reduce Stress
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Reading provides a mental escape that lowers heart rate and muscle tension, similar to meditation. 
            Immersing yourself in a book reduces cortisol levels, calms the nervous system, and promotes relaxation. 
            It also improves focus, empathy, and emotional regulation, making it a powerful tool for stress relief.
          </p>
        </div>

        {/* Positive Effects */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-calm-blue-100 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold text-calm-blue-700 mb-2">🧠 Mental Benefits</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Improves concentration and focus</li>
              <li>Boosts empathy and imagination</li>
              <li>Encourages mindfulness and relaxation</li>
            </ul>
          </div>
          <div className="bg-calm-lavender-100 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold text-calm-lavender-700 mb-2">💖 Emotional Benefits</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Reduces anxiety and stress</li>
              <li>Provides emotional escape</li>
              <li>Promotes a sense of calm</li>
            </ul>
          </div>
        </div>

        {/* Book Suggestions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-calm-blue-700 mb-4">
            Calming Book Suggestions
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg shadow-md p-4">
              <h3 className="text-lg font-bold text-calm-blue-700 mb-2">🌿 “The Little Book of Hygge” – Meik Wiking</h3>
              <p className="text-gray-700">A cozy guide to Danish happiness and mindful living.</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-4">
              <h3 className="text-lg font-bold text-calm-blue-700 mb-2">🌸 “The Alchemist” – Paulo Coelho</h3>
              <p className="text-gray-700">An inspiring story about following your dreams and finding peace.</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-4">
              <h3 className="text-lg font-bold text-calm-blue-700 mb-2">☀️ “Where the Crawdads Sing” – Delia Owens</h3>
              <p className="text-gray-700">A beautifully written novel that immerses you in nature and emotion.</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-4">
              <h3 className="text-lg font-bold text-calm-blue-700 mb-2">🌙 “The Book of Joy” – Dalai Lama & Desmond Tutu</h3>
              <p className="text-gray-700">Wisdom on cultivating joy and resilience in everyday life.</p>
            </div>
          </div>
        </div>

        {/* Inspiration Section */}
        <div className="bg-calm-green-50 border-2 border-calm-green-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-calm-green-700 mb-3">📖 Try This</h3>
          <p className="text-gray-700 mb-4">
            Set aside 20 minutes before bed to read a calming book. 
            Choose a quiet space, dim the lights, and let yourself unwind.
          </p>
          {/* <button className="bg-calm-blue-500 hover:bg-calm-blue-600 text-white px-6 py-3 rounded-md font-medium">
            Start Reading
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default Reading

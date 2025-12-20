import React from 'react'

function ListeningToMusic() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-blue-50 via-white to-calm-lavender-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-10">
        
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-calm-blue-700 mb-6 text-center">
          🎵 Listening to Music
        </h1>
        
        {/* Scientific Explanation */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-calm-green-700 mb-3">
            Why Music Helps Reduce Stress
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Research shows that listening to music can lower cortisol levels, the hormone responsible 
            for stress. Calming melodies slow down your heart rate and breathing, while upbeat tunes 
            release dopamine — the “feel-good” neurotransmitter. Music therapy is widely recommended 
            by psychologists as it improves mood, reduces anxiety, and enhances relaxation.
          </p>
        </div>

        {/* Positive Effects */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-calm-blue-100 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold text-calm-blue-700 mb-2">🌿 Physiological Benefits</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Lowers blood pressure</li>
              <li>Reduces cortisol (stress hormone)</li>
              <li>Slows heart rate and breathing</li>
            </ul>
          </div>
          <div className="bg-calm-lavender-100 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold text-calm-lavender-700 mb-2">💡 Psychological Benefits</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Boosts dopamine for happiness</li>
              <li>Improves focus and memory</li>
              <li>Encourages mindfulness and relaxation</li>
            </ul>
          </div>
        </div>

        {/* Song Recommendations */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-calm-blue-700 mb-4">
            Recommended Songs for Stress Relief
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-sm">
              <p className="font-medium text-yellow-700">“Weightless” – Marconi Union</p>
              <p className="text-sm text-gray-600">Scientifically proven to reduce anxiety.</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md shadow-sm">
              <p className="font-medium text-green-700">“Clair de Lune” – Debussy</p>
              <p className="text-sm text-gray-600">Gentle piano piece that calms the mind.</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md shadow-sm">
              <p className="font-medium text-blue-700">“Someone Like You” – Adele</p>
              <p className="text-sm text-gray-600">Emotional release through soulful vocals.</p>
            </div>
            <div className="bg-pink-50 border-l-4 border-pink-400 p-4 rounded-md shadow-sm">
              <p className="font-medium text-pink-700">“River Flows in You” – Yiruma</p>
              <p className="text-sm text-gray-600">Soothing piano melody for relaxation.</p>
            </div>
          </div>
        </div>

        {/* Inspiration Section */}
        <div className="bg-calm-green-50 border-2 border-calm-green-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-calm-green-700 mb-3">
            🎧 Try This
          </h3>
          <p className="text-gray-700 mb-4">
            Close your eyes, take a deep breath, and play your favorite calming track. 
            Let the rhythm guide your thoughts away from stress.
          </p>
          {/* <button className="bg-calm-blue-500 hover:bg-calm-blue-600 text-white px-6 py-3 rounded-md font-medium">
            Start Listening
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default ListeningToMusic

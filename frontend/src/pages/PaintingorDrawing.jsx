import React from 'react'

function PaintingorDrawing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-lavender-50 via-white to-calm-blue-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-10">
        
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-calm-blue-700 mb-6 text-center">
          🎨 Painting or Drawing
        </h1>
        
        {/* Scientific Explanation */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-calm-green-700 mb-3">
            Why Art Helps Reduce Stress
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Engaging in painting or drawing activates the brain’s reward pathways, releasing dopamine 
            and reducing cortisol levels. Art therapy is widely recommended by psychologists because 
            it helps externalize emotions, improves focus, and promotes mindfulness. The act of 
            creating art provides a sense of accomplishment and relaxation.
          </p>
        </div>

        {/* Positive Effects */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-calm-blue-100 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold text-calm-blue-700 mb-2">🧠 Mental Benefits</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Encourages mindfulness and focus</li>
              <li>Helps express emotions safely</li>
              <li>Boosts creativity and problem-solving</li>
            </ul>
          </div>
          <div className="bg-calm-lavender-100 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold text-calm-lavender-700 mb-2">💖 Emotional Benefits</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Reduces anxiety and stress</li>
              <li>Provides a sense of accomplishment</li>
              <li>Improves self-esteem</li>
            </ul>
          </div>
        </div>

        {/* Sample Drawing Inspirations */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-calm-blue-700 mb-4">
            Sample Drawing Inspirations
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg shadow-md p-4 text-center">
              <img 
                src="https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=400&q=80" 
                alt="Landscape sketch" 
                className="rounded-md mb-3"
              />
              <p className="text-sm text-gray-700">🌄 Simple Landscape Sketch</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-4 text-center">
              <img 
                src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=400&q=80" 
                alt="Mandala art" 
                className="rounded-md mb-3"
              />
              <p className="text-sm text-gray-700">🌀 Mandala Coloring</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-4 text-center">
              <img 
                src="https://images.unsplash.com/photo-1581090700227-4c4d1a3d6d3a?auto=format&fit=crop&w=400&q=80" 
                alt="Portrait sketch" 
                className="rounded-md mb-3"
              />
              <p className="text-sm text-gray-700">👤 Portrait Sketch</p>
            </div>
          </div>
        </div>

        {/* Inspiration Section */}
        <div className="bg-calm-green-50 border-2 border-calm-green-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-calm-green-700 mb-3">
            ✏️ Try This
          </h3>
          <p className="text-gray-700 mb-4">
            Grab a pencil and paper, and sketch something simple — a tree, a cup, or your window view. 
            Focus on the lines and shapes, not perfection. The process itself is calming.
          </p>
          {/* <button className="bg-calm-blue-500 hover:bg-calm-blue-600 text-white px-6 py-3 rounded-md font-medium">
            Start Drawing
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default PaintingorDrawing

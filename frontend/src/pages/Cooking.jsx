import React from 'react'

function Cooking() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-green-50 via-white to-calm-lavender-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-10">
        
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-calm-blue-700 mb-6 text-center">
          🍳 Cooking
        </h1>
        
        {/* Scientific Explanation */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-calm-green-700 mb-3">
            Why Cooking Helps Reduce Stress
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Cooking engages multiple senses — sight, smell, taste, and touch — which promotes mindfulness 
            and grounds you in the present moment. Studies show that preparing meals lowers cortisol levels, 
            reduces anxiety, and provides a sense of accomplishment. The act of creating nourishing food 
            can also boost dopamine, improving mood and overall well-being.
          </p>
        </div>

        {/* Positive Effects */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-calm-blue-100 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold text-calm-blue-700 mb-2">🌿 Physical Benefits</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Encourages healthier eating habits</li>
              <li>Improves focus and coordination</li>
              <li>Reduces reliance on processed foods</li>
            </ul>
          </div>
          <div className="bg-calm-lavender-100 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold text-calm-lavender-700 mb-2">💡 Emotional Benefits</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Provides a sense of accomplishment</li>
              <li>Reduces anxiety through mindful activity</li>
              <li>Boosts creativity and self-expression</li>
            </ul>
          </div>
        </div>

        {/* Sample Healthy Recipes */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-calm-blue-700 mb-4">
            Sample Healthy Recipes
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg shadow-md p-4 text-center">
              <img 
                src="https://images.unsplash.com/photo-1604908177522-432f3f3f3f3f?auto=format&fit=crop&w=400&q=80" 
                alt="Avocado toast" 
                className="rounded-md mb-3"
              />
              <p className="text-sm text-gray-700">🥑 Avocado Toast</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-4 text-center">
              <img 
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80" 
                alt="Fruit salad" 
                className="rounded-md mb-3"
              />
              <p className="text-sm text-gray-700">🍓 Fresh Fruit Salad</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-4 text-center">
              <img 
                src="https://images.unsplash.com/photo-1617196037303-5b6a3f3f3f3f?auto=format&fit=crop&w=400&q=80" 
                alt="Vegetable stir-fry" 
                className="rounded-md mb-3"
              />
              <p className="text-sm text-gray-700">🥦 Vegetable Stir-Fry</p>
            </div>
          </div>
        </div>

        {/* Inspiration Section */}
        <div className="bg-calm-green-50 border-2 border-calm-green-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-calm-green-700 mb-3">
            🍲 Try This
          </h3>
          <p className="text-gray-700 mb-4">
            Choose a simple recipe, gather fresh ingredients, and cook mindfully. Focus on the colors, 
            textures, and aromas as you prepare your meal. Enjoy the process as much as the result.
          </p>
          {/* <button className="bg-calm-blue-500 hover:bg-calm-blue-600 text-white px-6 py-3 rounded-md font-medium">
            Start Cooking
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default Cooking

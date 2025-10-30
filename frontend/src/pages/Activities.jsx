import React, { useState, useEffect } from 'react'
import { getActivities } from '../services/api'

const allActivities = [
  {
    name: 'Listening to Music',
    description: 'Choose calming music or your favorite tunes to relax your mind',
    category: 'creative',
    stressLevel: 'low'
  },
  {
    name: 'Painting or Drawing',
    description: 'Express yourself through art and let your creativity flow',
    category: 'creative',
    stressLevel: 'moderate'
  },
  {
    name: 'Cooking',
    description: 'Prepare a healthy meal and enjoy the therapeutic process',
    category: 'creative',
    stressLevel: 'moderate'
  },
  {
    name: 'Dancing',
    description: 'Move your body to music and release endorphins',
    category: 'physical',
    stressLevel: 'moderate'
  },
  {
    name: 'Hiking',
    description: 'Connect with nature and enjoy the outdoors',
    category: 'physical',
    stressLevel: 'high'
  },
  {
    name: 'Walking',
    description: 'Take a gentle walk to clear your mind',
    category: 'physical',
    stressLevel: 'low'
  },
  {
    name: 'Yoga',
    description: 'Practice mindful movement and breathing',
    category: 'physical',
    stressLevel: 'moderate'
  },
  {
    name: 'Meditation',
    description: 'Practice mindfulness and mental clarity',
    category: 'mindful',
    stressLevel: 'all'
  },
  {
    name: 'Journaling',
    description: 'Write down your thoughts and feelings',
    category: 'mindful',
    stressLevel: 'moderate'
  },
  {
    name: 'Reading',
    description: 'Escape into a good book',
    category: 'relaxation',
    stressLevel: 'low'
  },
  {
    name: 'Gardening',
    description: 'Work with plants and soil to ground yourself',
    category: 'physical',
    stressLevel: 'moderate'
  },
  {
    name: 'Swimming',
    description: 'Enjoy the calming effects of water',
    category: 'physical',
    stressLevel: 'moderate'
  },
]

function Activities({ user }) {
  const [activities, setActivities] = useState(allActivities)
  const [filter, setFilter] = useState('all')

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.category === filter)

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-calm-blue-700 mb-4">
            Stress-Relief Activities
          </h1>
          <p className="text-xl text-gray-600">
            Discover activities that can help reduce your stress levels
          </p>
        </div>

        <div className="mb-8 flex justify-center space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              filter === 'all'
                ? 'bg-calm-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-calm-blue-50'
            }`}
          >
            All Activities
          </button>
          <button
            onClick={() => setFilter('physical')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              filter === 'physical'
                ? 'bg-calm-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-calm-blue-50'
            }`}
          >
            Physical
          </button>
          <button
            onClick={() => setFilter('creative')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              filter === 'creative'
                ? 'bg-calm-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-calm-blue-50'
            }`}
          >
            Creative
          </button>
          <button
            onClick={() => setFilter('mindful')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              filter === 'mindful'
                ? 'bg-calm-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-calm-blue-50'
            }`}
          >
            Mindful
          </button>
          <button
            onClick={() => setFilter('relaxation')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              filter === 'relaxation'
                ? 'bg-calm-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-calm-blue-50'
            }`}
          >
            Relaxation
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
            >
              <h3 className="text-xl font-semibold text-calm-blue-700 mb-3">
                {activity.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {activity.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 capitalize">
                  {activity.category}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  activity.stressLevel === 'low' ? 'bg-calm-green-100 text-calm-green-700' :
                  activity.stressLevel === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                  activity.stressLevel === 'high' ? 'bg-orange-100 text-orange-700' :
                  'bg-calm-blue-100 text-calm-blue-700'
                }`}>
                  {activity.stressLevel === 'all' ? 'All Levels' : activity.stressLevel}
                </span>
              </div>
            </div>
          ))}
        </div>

        {!user && (
          <div className="mt-12 bg-calm-lavender-50 border-2 border-calm-lavender-200 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-calm-lavender-700 mb-4">
              Get Personalized Activity Recommendations
            </h3>
            <p className="text-gray-700 mb-6">
              Login to receive activity suggestions tailored to your stress assessment results
            </p>
            <button
              onClick={() => window.location.href = '/api/auth/login'}
              className="bg-calm-lavender-500 hover:bg-calm-lavender-600 text-white px-6 py-3 rounded-md font-medium"
            >
              Login to Continue
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Activities

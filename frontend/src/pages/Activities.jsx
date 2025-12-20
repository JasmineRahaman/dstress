import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const allActivities = [
  {
    name: 'Listening to Music',
    description: 'Choose calming music or your favorite tunes to relax your mind',
    category: 'creative',
    stressLevel: 'low',
    scienceNote: 'Music therapy is shown to reduce cortisol and lower blood pressure, improving mood.',
    starterIdeas: ['Create a calming playlist', 'Listen to instrumental tracks', 'Try nature sounds'],
    link: '/activities/listening-to-music'
  },
  {
    name: 'Painting or Drawing',
    description: 'Express yourself through art and let your creativity flow',
    category: 'creative',
    stressLevel: 'moderate',
    scienceNote: 'Art therapy helps externalize emotions and is recommended by psychologists for stress relief.',
    starterIdeas: ['Sketch a simple landscape', 'Color a mandala', 'Draw your favorite memory'],
    link: '/activities/painting-or-drawing'
  }, {
    name: 'Cooking',
    description: 'Prepare a healthy meal and enjoy the therapeutic process',
    category: 'creative',
    stressLevel: 'moderate',
    scienceNote: 'Cooking engages multiple senses, promotes mindfulness, and is linked to reduced anxiety.',
    starterIdeas: ['Avocado toast', 'Fruit salad', 'Vegetable stir-fry'],
    link: '/activities/cooking-for-good'
  },
  {
    name: 'Dancing',
    description: 'Move your body to music and release endorphins',
    category: 'physical',
    stressLevel: 'moderate',
    scienceNote: 'Dance increases endorphin release and improves cardiovascular health, reducing stress.',
    starterIdeas: ['Freestyle to your favorite song', 'Follow a YouTube dance tutorial'],
    link: '/activities/dancing'
  },
  {
    name: 'Hiking',
    description: 'Connect with nature and enjoy the outdoors',
    category: 'physical',
    stressLevel: 'high',
    scienceNote: 'Exposure to nature reduces stress hormones and improves mental clarity.', 
    starterIdeas: ['Start with a short trail', 'Bring a friend for motivation'],
    link: '/activities/hiking'
  },
  {
    name: 'Walking',
    description: 'Take a gentle walk to clear your mind',
    category: 'physical',
    stressLevel: 'low',
    scienceNote: 'Walking improves circulation and reduces anxiety through rhythmic movement.', 
    starterIdeas: ['Walk around your block', 'Try mindful walking'],
    link: '/activities/walking'
  },
  {
    name: 'Yoga',
    description: 'Practice mindful movement and breathing',
    category: 'physical',
    stressLevel: 'moderate',
    scienceNote: 'Yoga lowers cortisol, improves flexibility, and is widely recommended for stress management.',
    starterIdeas: ['Beginner yoga poses', 'Try a 10-minute guided video'],
    link: '/activities/yoga'
  },
  {
    name: 'Meditation',
    description: 'Practice mindfulness and mental clarity',
    category: 'mindful',
    stressLevel: 'all',
    scienceNote: 'Meditation reduces cortisol and enhances emotional regulation, backed by clinical studies.',
    starterIdeas: ['5 minutes of deep breathing', 'Use a guided meditation app'],
    link: '/activities/meditation'
  },
  {
    name: 'Journaling',
    description: 'Write down your thoughts and feelings',
    category: 'mindful',
    stressLevel: 'moderate',
    scienceNote: 'Journaling improves emotional awareness and reduces rumination, recommended by therapists.',
    starterIdeas: ['Write 3 things you’re grateful for', 'Describe your day in detail'],
    link: '/activities/journaling'
  },
  {
    name: 'Reading',
    description: 'Escape into a good book',
    category: 'relaxation',
    stressLevel: 'low',
    scienceNote: 'Reading reduces heart rate and muscle tension, similar to meditation.', 
    starterIdeas: ['Read a short story', 'Pick a calming novel'],
    link: '/activities/reading'
  },
  {
    name: 'Gardening',
    description: 'Work with plants and soil to ground yourself',
    category: 'physical',
    stressLevel: 'moderate',
    scienceNote: 'Gardening lowers cortisol and provides grounding sensory input.',
    starterIdeas: ['Plant herbs in pots', 'Water existing plants mindfully'],
    link: '/activities/gardening'
  },
  {
    name: 'Swimming',
    description: 'Enjoy the calming effects of water',
    category: 'physical',
    stressLevel: 'moderate',
    scienceNote: 'Swimming combines exercise with hydrotherapy, reducing stress and improving mood.',
    starterIdeas: ['Do a few laps', 'Float and breathe deeply'],
    link: '/activities/swimming'
  },
]
function Activities({ user }) {
  const [filter, setFilter] = useState('all')

  const filteredActivities = filter === 'all' 
    ? allActivities 
    : allActivities.filter(activity => activity.category === filter)

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-calm-blue-700 mb-4 text-center">
          Stress-Relief Activities
        </h1>

        {/* Filter buttons */}
        <div className="mb-8 flex justify-center space-x-4">
          {['all','physical','creative','mindful','relaxation'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                filter === cat
                  ? 'bg-calm-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-calm-blue-50'
              }`}
            >
              {cat === 'all' ? 'All Activities' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Activity cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity, index) => (
            <Link
              key={index}
              to={activity.link}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 block"
            >
              <h3 className="text-xl font-semibold text-calm-blue-700 mb-3">
                {activity.name}
              </h3>
              <p className="text-gray-600 mb-4">{activity.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 capitalize">{activity.category}</span>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  activity.stressLevel === 'low' ? 'bg-calm-green-100 text-calm-green-700' :
                  activity.stressLevel === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                  activity.stressLevel === 'high' ? 'bg-orange-100 text-orange-700' :
                  'bg-calm-blue-100 text-calm-blue-700'
                }`}>
                  {activity.stressLevel === 'all' ? 'All Levels' : activity.stressLevel}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Activities

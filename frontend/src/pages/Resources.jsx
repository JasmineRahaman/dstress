import React from 'react'

const resources = [
  {
    category: 'Understanding Stress',
    items: [
      {
        title: 'What is Stress? - World Health Organization',
        description: 'Learn about stress and its impact on your health from WHO',
        link: 'https://www.who.int/news-room/questions-and-answers/item/stress',
        type: 'article'
      },
      {
        title: 'The Science of Stress',
        description: 'Understanding how stress affects your body and mind',
        link: 'https://www.youtube.com/watch?v=v3vwJAKjBE0',
        type: 'video'
      },
    ]
  },
  {
    category: 'Managing Stress',
    items: [
      {
        title: 'Stress Management Techniques - WHO',
        description: 'Evidence-based techniques for managing daily stress',
        link: 'https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response',
        type: 'article'
      },
      {
        title: '5 Tips to Manage Stress',
        description: 'Practical tips from mental health experts',
        link: 'https://www.youtube.com/watch?v=hnpQrMqDoqE',
        type: 'video'
      },
      {
        title: 'Breathing Exercises for Stress Relief',
        description: 'Learn simple breathing techniques to reduce stress instantly',
        link: 'https://www.youtube.com/watch?v=tEmt1Znux58',
        type: 'video'
      },
    ]
  },
  {
    category: 'Building Resilience',
    items: [
      {
        title: 'Building Mental Resilience',
        description: 'How to develop resilience in the face of stress',
        link: 'https://www.youtube.com/watch?v=NWH8N-BvhAw',
        type: 'video'
      },
      {
        title: 'Mindfulness and Meditation',
        description: 'Introduction to mindfulness practices for stress reduction',
        link: 'https://www.youtube.com/watch?v=6p_yaNFSYao',
        type: 'video'
      },
    ]
  },
]

function Resources() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-calm-blue-700 mb-4">
            Stress Management Resources
          </h1>
          <p className="text-xl text-gray-600">
            Evidence-based information and expert guidance to help you understand and manage stress
          </p>
        </div>

        <div className="space-y-8">
          {resources.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-calm-green-700 mb-6">
                {section.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-calm-blue-50 hover:bg-calm-blue-100 rounded-lg p-5 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {item.type === 'video' ? (
                          <svg className="w-8 h-8 text-calm-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                        ) : (
                          <svg className="w-8 h-8 text-calm-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
                        <span className="inline-block mt-2 text-calm-blue-600 text-sm font-medium">
                          {item.type === 'video' ? 'Watch Video →' : 'Read Article →'}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-calm-lavender-50 border-2 border-calm-lavender-200 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-calm-lavender-700 mb-4">
            Need Personalized Support?
          </h3>
          <p className="text-gray-700 mb-6">
            Consider booking a session with one of our mental health professionals for personalized guidance.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Resources

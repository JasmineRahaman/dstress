import React from 'react'
import { Link } from 'react-router-dom'

function Results({ testScore, user }) {
  if (!testScore) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-calm-blue-700 mb-4">No Results Available</h1>
          <p className="text-gray-600 mb-6">Please complete the questionnaire first.</p>
          <Link
            to="/questionnaire"
            className="inline-block bg-calm-blue-500 hover:bg-calm-blue-600 text-white px-6 py-3 rounded-md font-medium"
          >
            Take Assessment
          </Link>
        </div>
      </div>
    )
  }

  const { total_score, category_scores, stress_level, recommendations } = testScore

  const getStressLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'low':
        return 'text-calm-green-600 bg-calm-green-100'
      case 'moderate':
        return 'text-yellow-600 bg-yellow-100'
      case 'high':
        return 'text-orange-600 bg-orange-100'
      case 'severe':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-calm-blue-700 mb-6 text-center">
            Your Stress Assessment Results
          </h1>

          <div className="text-center mb-8">
            <div className="inline-block">
              <p className="text-gray-600 mb-2">Overall Stress Level</p>
              <div className={`text-2xl font-bold px-6 py-3 rounded-lg ${getStressLevelColor(stress_level)}`}>
                {stress_level.toUpperCase()}
              </div>
              <p className="text-gray-500 mt-2">Total Score: {total_score}/60</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Stress by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(category_scores).map(([category, score]) => (
                <div key={category} className="bg-calm-blue-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-800 capitalize">{category}</span>
                    <span className="text-calm-blue-700 font-bold">{score}/15</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-calm-blue-500 h-2 rounded-full"
                      style={{ width: `${(score / 15) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommended Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.slice(0, 4).map((activity, index) => (
                <div key={index} className="bg-calm-green-50 rounded-lg p-4">
                  <p className="font-medium text-gray-800">{activity}</p>
                </div>
              ))}
            </div>
          </div>

          {!user && (
            <div className="bg-calm-lavender-50 border-2 border-calm-lavender-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-calm-lavender-700 mb-3">
                Want to Learn More?
              </h3>
              <p className="text-gray-700 mb-4">
                Login to access personalized activity details, professional consultations,
                stress-relief games, and join our supportive community.
              </p>
              <button
                onClick={() => window.location.href = '/api/auth/login'}
                className="bg-calm-lavender-500 hover:bg-calm-lavender-600 text-white px-6 py-3 rounded-md font-medium"
              >
                Login to Continue
              </button>
            </div>
          )}

          {user && (
            <div className="text-center">
              <Link
                to="/activities"
                className="inline-block bg-calm-green-500 hover:bg-calm-green-600 text-white px-6 py-3 rounded-md font-medium mr-4"
              >
                Explore Activities
              </Link>
              <Link
                to="/resources"
                className="inline-block bg-calm-blue-500 hover:bg-calm-blue-600 text-white px-6 py-3 rounded-md font-medium"
              >
                View Resources
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Results

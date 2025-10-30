import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-calm-blue-600 to-calm-green-600 bg-clip-text text-transparent">
            Welcome to D-Stress
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Your Personal Stress Management Platform
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take control of your stress with our comprehensive assessment, personalized activities,
            expert resources, and supportive community.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-semibold text-calm-blue-700 mb-6">
            How D-Stress Works
          </h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-calm-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-calm-blue-700 font-bold text-xl">1</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Take the Assessment</h3>
                <p className="text-gray-600">
                  Complete our comprehensive stress questionnaire to identify your stress types and levels.
                  No login required to get started!
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-calm-green-100 rounded-full flex items-center justify-center">
                  <span className="text-calm-green-700 font-bold text-xl">2</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Get Personalized Recommendations</h3>
                <p className="text-gray-600">
                  Receive instant results with activity suggestions tailored to your stress profile.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-calm-lavender-100 rounded-full flex items-center justify-center">
                  <span className="text-calm-lavender-700 font-bold text-xl">3</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Access Full Features</h3>
                <p className="text-gray-600">
                  Login to unlock professional consultations, stress-relief games, community support,
                  and save your progress.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/questionnaire"
            className="inline-block bg-gradient-to-r from-calm-blue-500 to-calm-green-500 hover:from-calm-blue-600 hover:to-calm-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Start Your Stress Assessment
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-calm-blue-700 mb-3">
              Evidence-Based Resources
            </h3>
            <p className="text-gray-600">
              Access curated content from trusted sources including WHO articles and expert videos.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-calm-green-700 mb-3">
              Professional Support
            </h3>
            <p className="text-gray-600">
              Book sessions with qualified mental health professionals for personalized guidance.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-calm-lavender-700 mb-3">
              Interactive Games
            </h3>
            <p className="text-gray-600">
              Enjoy stress-relief games and manage your tasks with our integrated to-do list.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-calm-blue-700 mb-3">
              Community Events
            </h3>
            <p className="text-gray-600">
              Join a supportive community and participate in wellness events near you.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

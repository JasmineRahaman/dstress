import React from 'react'

function Profile({ user }) {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-calm-blue-700 mb-8 text-center">
          My Profile
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-calm-blue-400 to-calm-green-400 rounded-full flex items-center justify-center">
              <span className="text-white text-3xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-calm-blue-700 mb-4">Account Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since:</span>
                <span className="text-gray-800 font-medium">
                  {new Date(user.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Authorization Status:</span>
                <span className={`font-medium ${user.is_authorized ? 'text-calm-green-600' : 'text-yellow-600'}`}>
                  {user.is_authorized ? 'Authorized' : 'Pending'}
                </span>
              </div>
              {user.is_admin && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Role:</span>
                  <span className="text-calm-lavender-600 font-medium">Administrator</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-semibold text-calm-blue-700 mb-4">Quick Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-calm-blue-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-calm-blue-700">0</p>
              <p className="text-gray-600">Assessments Taken</p>
            </div>
            <div className="bg-calm-green-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-calm-green-700">0</p>
              <p className="text-gray-600">Sessions Booked</p>
            </div>
            <div className="bg-calm-lavender-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-calm-lavender-700">0</p>
              <p className="text-gray-600">Community Posts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

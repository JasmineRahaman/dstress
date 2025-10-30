import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar({ user, onLogin, onLogout }) {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-calm-blue-600 to-calm-green-600 bg-clip-text text-transparent">
                D-Stress
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/questionnaire"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/questionnaire')
                  ? 'bg-calm-blue-100 text-calm-blue-700'
                  : 'text-gray-700 hover:bg-calm-blue-50'
              }`}
            >
              Assessment
            </Link>
            <Link
              to="/resources"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/resources')
                  ? 'bg-calm-blue-100 text-calm-blue-700'
                  : 'text-gray-700 hover:bg-calm-blue-50'
              }`}
            >
              Resources
            </Link>
            <Link
              to="/activities"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/activities')
                  ? 'bg-calm-blue-100 text-calm-blue-700'
                  : 'text-gray-700 hover:bg-calm-blue-50'
              }`}
            >
              Activities
            </Link>
            {user && (
              <>
                <Link
                  to="/professionals"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/professionals')
                      ? 'bg-calm-blue-100 text-calm-blue-700'
                      : 'text-gray-700 hover:bg-calm-blue-50'
                  }`}
                >
                  Professionals
                </Link>
                <Link
                  to="/games"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/games')
                      ? 'bg-calm-blue-100 text-calm-blue-700'
                      : 'text-gray-700 hover:bg-calm-blue-50'
                  }`}
                >
                  Games
                </Link>
                <Link
                  to="/community"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/community')
                      ? 'bg-calm-blue-100 text-calm-blue-700'
                      : 'text-gray-700 hover:bg-calm-blue-50'
                  }`}
                >
                  Community
                </Link>
                <Link
                  to="/profile"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/profile')
                      ? 'bg-calm-blue-100 text-calm-blue-700'
                      : 'text-gray-700 hover:bg-calm-blue-50'
                  }`}
                >
                  Profile
                </Link>
                {user.is_admin && (
                  <Link
                    to="/admin"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/admin')
                        ? 'bg-calm-lavender-100 text-calm-lavender-700'
                        : 'text-gray-700 hover:bg-calm-lavender-50'
                    }`}
                  >
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Hello, {user.name}</span>
                <button
                  onClick={onLogout}
                  className="bg-calm-blue-500 hover:bg-calm-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="bg-calm-green-500 hover:bg-calm-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

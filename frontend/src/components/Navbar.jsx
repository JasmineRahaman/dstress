import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar({ user, setUser }) {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

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
            <NavLink to="/questionnaire" label="Assessment" isActive={isActive} />
            <NavLink to="/resources" label="Resources" isActive={isActive} />
            <NavLink to="/activities" label="Activities" isActive={isActive} />
            {user && (
              <>
                <NavLink to="/professionals" label="Professionals" isActive={isActive} />
                <NavLink to="/gameshub" label="Games" isActive={isActive} />
                <NavLink to="/community" label="Community" isActive={isActive} />
                <NavLink to="/profile" label="Profile" isActive={isActive} />
                {user?.is_admin && (
                  <NavLink to="/admin" label="Admin" isActive={isActive} admin />
                )}
              </>
            )}
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Hello, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-calm-blue-500 hover:bg-calm-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
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

function NavLink({ to, label, isActive, admin = false }) {
  const base = 'px-3 py-2 rounded-md text-sm font-medium transition-colors'
  const activeClass = admin
    ? 'bg-calm-lavender-100 text-calm-lavender-700'
    : 'bg-calm-blue-100 text-calm-blue-700'
  const hoverClass = admin
    ? 'hover:bg-calm-lavender-50'
    : 'hover:bg-calm-blue-50'

  const inactiveClass = `text-gray-700 ${hoverClass}`
  const finalClass = `${base} ${isActive(to) ? activeClass : inactiveClass}`

  return (
    <Link to={to} className={finalClass}>
      {label}
    </Link>
  )
}

export default Navbar

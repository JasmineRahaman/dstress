import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Questionnaire from './pages/Assesment/Questionnaire';
import Results from './pages/Results'
import Resources from './pages/Resources'
import Activities from './pages/Activities'
import Professionals from './pages/Professionals'
import Games from './pages/Games'
import Community from './pages/Community'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Scrap from './pages/Scrap/Scrap';
import { getUserProfile } from './services/api'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [testScore, setTestScore] = useState(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const profile = await getUserProfile()
      setUser(profile)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = () => {
    window.location.href = '/api/auth/login'
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-calm-blue-50 to-calm-green-50">
        <div className="text-calm-blue-700 text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-calm-blue-50 to-calm-green-50">
        <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questionnaire" element={<Questionnaire setTestScore={setTestScore} />} />
          <Route path="/results" element={<Results testScore={testScore} user={user} />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/activities" element={<Activities user={user} />} />
          <Route path="/professionals" element={user ? <Professionals user={user} /> : <Navigate to="/" />} />
          <Route path="/games" element={user ? <Games user={user} /> : <Navigate to="/" />} />
          <Route path="/community" element={user ? <Community user={user} /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />
          <Route path="/admin" element={user?.is_admin ? <Admin /> : <Navigate to="/" />} />
        
          <Route path="/scrap" element={<Scrap />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

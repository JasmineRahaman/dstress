import React, { useState, useEffect } from 'react'
import { Router, Routes, Route, Navigate } from 'react-router-dom'
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
import Login from './pages/Login'
import Register from './pages/Register'
import MemoryGame from './pages/MemoryGame'
import GamesHub from './pages/GamesHub'
import BreathingGame from './pages/BreathingGame'
import ColorMemoryMaze from './pages/ColorMemoryMaze'

import { getUserProfile } from './services/api'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [testScore, setTestScore] = useState(null)


  useEffect(() => {
    checkAuth()
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
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
    window.location.href = '/login'
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
    // <Router>
      <div className="min-h-screen bg-gradient-to-br from-calm-blue-50 to-calm-green-50">
        <Navbar user={user} setUser={setUser} />
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
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gameshub/memorygame" element={<MemoryGame user={user} />} />
          <Route path="/gameshub" element={<GamesHub user={user} />} />
          <Route path="/gameshub/breathing" element={<BreathingGame user={user}/>}/>
          <Route path="/gameshub/colors" element={<ColorMemoryMaze user={user}/>}/>
        </Routes>
      </div>
    // {/* </Router> */}
  )
}

export default App

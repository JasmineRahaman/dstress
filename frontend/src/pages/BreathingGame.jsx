import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const phases = [
  { label: 'Inhale', duration: 4000 },
  { label: 'Hold', duration: 4000 },
  { label: 'Exhale', duration: 8000 },
  { label: 'Pause', duration: 4000 },
]


export default function BreathingGame({ user }) {
  const [started, setStarted] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showSummary, setShowSummary] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!started) return
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown, started])

  useEffect(() => {
    if (!started || countdown > 0) return
    const { duration } = phases[phaseIndex]
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          if (phaseIndex < phases.length - 1) {
            setTimeout(() => setPhaseIndex((i) => i + 1), 500)
          } else {
            setTimeout(() => {
              setShowSummary(true)
              updateStats()
            }, 1000)
          }
          return 100
        }
        return prev + 2
      })
    }, duration / 50)

    return () => clearInterval(interval)
  }, [phaseIndex, countdown, started])

  const updateStats = () => {
    if (!user || !user.email) return
    const key = `gameStats_${user.email}`
    const stats = JSON.parse(localStorage.getItem(key) || '{}')
    const month = new Date().toISOString().slice(0, 7)
    const current = stats.breathing?.[month] || { timesPlayed: 0 }
    const updated = {
      timesPlayed: current.timesPlayed + 1,
    }
    const newStats = {
      ...stats,
      breathing: {
        ...stats.breathing,
        [month]: updated,
      },
    }
    localStorage.setItem(key, JSON.stringify(newStats))
  }

  const currentPhase = phases[phaseIndex]

  const orbColor =
    currentPhase.label === 'Inhale'
      ? '#60a5fa'
      : currentPhase.label === 'Hold'
      ? '#a78bfa'
      : '#6ee7b7'

  if (showSummary) {
    const month = new Date().toISOString().slice(0, 7)
    const stats = user ? JSON.parse(localStorage.getItem(`gameStats_${user.email}`)) : {}
    const timesPlayed = stats?.breathing?.[month]?.timesPlayed || 1

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#fdfdfd] rounded-lg shadow-xl p-6 max-w-md w-full text-center relative">
          <button
            onClick={() => navigate('/gameshub')}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
            aria-label="Close"
          >
            ✖
          </button>
          <h2 className="text-2xl font-bold text-[#4b5563] mb-4">Game Over</h2>
          <p className="text-gray-700 mb-2">Breathing cycle complete.</p>
          <p className="text-gray-700 mb-2">Times Played: {timesPlayed}</p>
          <p className="mt-4 text-[#6ee7b7] italic">“Inhale calm, exhale stress.”</p>
          <button
            onClick={() => {
              setShowSummary(false)
              setPhaseIndex(0)
              setProgress(0)
              setCountdown(3)
              setStarted(false)
            }}
            className="mt-6 bg-[#93c5fd] hover:bg-[#60a5fa] text-white px-4 py-2 rounded-md"
          >
            Play Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#e0f2fe] text-[#4b5563] px-4">
      {!started ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Breathing Exercise</h1>
          <p className="text-lg text-center mb-4 max-w-md">
            Follow the guided breathing cycle: Inhale → Hold → Exhale. This helps calm your nervous system.
          </p>
          <button
            onClick={() => setStarted(true)}
            className="bg-[#93c5fd] hover:bg-[#60a5fa] text-white px-6 py-2 rounded-md"
          >
            Start
          </button>
        </>
      ) : countdown > 0 ? (
        <h2 className="text-5xl font-bold animate-pulse">{countdown}</h2>
      ) : (
        <>
          <div
            className="w-64 h-64 rounded-full flex items-center justify-center shadow-xl transition-all duration-1000"
            style={{
              backgroundColor: orbColor,
              transform: `scale(${1 + progress / 100})`,
            }}
          >
            <p className="text-xl font-semibold text-white">{currentPhase.label}</p>
          </div>
          <div className="w-64 h-2 bg-gray-300 rounded-full mt-6">
            <div
              className="h-2 bg-[#60a5fa] rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 text-[#6ee7b7] italic">“Inhale calm, exhale stress.”</p>
        </>
      )}
    </div>
  )
}

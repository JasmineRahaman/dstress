import React, { useState, useEffect } from 'react'

const allColors = [
  '#f87171', '#ef4444', '#dc2626', // Reds
  '#60a5fa', '#3b82f6', '#1d4ed8', // Blues
  '#34d399', '#10b981', '#065f46', // Greens
  '#fbbf24', '#facc15', '#ca8a04', // Yellows
  '#a78bfa', '#8b5cf6', '#6d28d9', // Purples
  '#fb7185', '#f472b6', '#be185d', // Pinks
  '#f97316', '#ea580c', '#c2410c', // Oranges
  '#14b8a6', '#06b6d4', '#0ea5e9', // Aquas
]

export default function PatternBuilder() {
  const [pattern, setPattern] = useState([])
  const [userPattern, setUserPattern] = useState([])
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(3)
  const [message, setMessage] = useState('')
  const [availableColors, setAvailableColors] = useState([])

  useEffect(() => {
    // Pool size grows with level
    const poolSize = Math.min(3 + level, allColors.length)
    const pool = allColors
      .sort(() => 0.5 - Math.random())
      .slice(0, poolSize)

    // Pattern length grows with level
    const patternLength = level + 2
    const newPattern = Array.from({ length: patternLength }, () => {
      return pool[Math.floor(Math.random() * pool.length)]
    })

    setPattern(newPattern)
    setAvailableColors(pool)
    setUserPattern([])
    setMessage('')
  }, [level])

  const handleTileClick = (color) => {
    const newUserPattern = [...userPattern, color]
    setUserPattern(newUserPattern)

    const index = newUserPattern.length - 1
    if (newUserPattern[index] !== pattern[index]) {
      setLives((prev) => prev - 1)
      setMessage(`❌ Wrong! Lives left: ${lives - 1}`)
      if (lives - 1 <= 0) {
        setMessage('💀 Game Over! Restarting at Level 1...')
        setTimeout(() => {
          setLevel(1)
          setLives(3)
        }, 1500)
      } else {
        setTimeout(() => setUserPattern([]), 1000)
      }
      return
    }

    if (newUserPattern.length === pattern.length) {
      setMessage('✅ Correct! Moving to next level...')
      setTimeout(() => setLevel(level + 1), 1000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fefce8]">
      <h1 className="text-3xl font-bold mb-4 text-[#4b5563]">Pattern Builder</h1>
      <p className="mb-2 text-[#4b5563]">Level: {level}</p>
      <p className="mb-4 text-[#4b5563]">Lives: {lives}</p>

      {/* Show the pattern to memorize */}
      <div className="flex gap-2 mb-6">
        {pattern.map((color, i) => (
          <div
            key={i}
            style={{ backgroundColor: color }}
            className="w-12 h-12 rounded-md border-2 border-gray-300"
          />
        ))}
      </div>

      {/* Show only the pool of colors for this level */}
      <div className="grid grid-cols-4 gap-4">
        {availableColors.map((color, i) => (
          <button
            key={i}
            onClick={() => handleTileClick(color)}
            style={{ backgroundColor: color }}
            className="w-16 h-16 rounded-md shadow-md hover:scale-105 transition-transform"
          />
        ))}
      </div>

      <p className="mt-6 text-lg font-semibold text-[#4b5563]">{message}</p>
    </div>
  )
}

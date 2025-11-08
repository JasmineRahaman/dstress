import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const allColors = [
  '#f87171', // Red
  '#60a5fa', // Blue
  '#34d399', // Green
  '#fbbf24', // Yellow
  '#a78bfa', // Purple
  '#fb7185', // Rose
  '#facc15', // Amber
  '#4ade80', // Emerald
  '#38bdf8', // Sky
  '#c084fc', // Violet
  '#f472b6', // Pink
  '#22d3ee', // Cyan
  '#818cf8', // Indigo
  '#10b981', // Teal
  '#fde68a', // Light Yellow
  '#fcd34d', // Mustard
]

export default function ColorMemoryMaze({ user }) {
  const [level, setLevel] = useState(1)
  const [tiles, setTiles] = useState([])
  const [sequence, setSequence] = useState([])
  const [revealedIndex, setRevealedIndex] = useState(-1)
  const [selected, setSelected] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    startLevel()
  }, [level])

  const startLevel = () => {
    const shuffledColors = [...allColors].sort(() => 0.5 - Math.random()).slice(0, level)
    const tileSet = shuffledColors.map((color, i) => ({ id: i, color }))
    const revealOrder = [...tileSet].sort(() => 0.5 - Math.random()).map((tile) => tile.id)

    setTiles(tileSet)
    setSequence(revealOrder)
    setSelected([])
    setGameOver(false)
    setRevealedIndex(-1)

    revealSequence(revealOrder)
  }

  const revealSequence = (order) => {
    order.forEach((id, i) => {
      setTimeout(() => setRevealedIndex(id), i * 1000)
      setTimeout(() => setRevealedIndex(-1), i * 1000 + 800)
    })
  }

  const handleClick = (id) => {
    const nextIndex = selected.length
    if (id === sequence[nextIndex]) {
      const newSelected = [...selected, id]
      setSelected(newSelected)
      if (newSelected.length === sequence.length) {
        setTimeout(() => setLevel((l) => l + 1), 1000)
      }
    } else {
      setGameOver(true)
      updateStats(level - 1)
    }
  }

  const updateStats = (rounds) => {
    if (!user || !user.email) return
    const key = `gameStats_${user.email}`
    const stats = JSON.parse(localStorage.getItem(key) || '{}')
    const month = new Date().toISOString().slice(0, 7)
    const current = stats.memoryMaze?.[month] || { timesPlayed: 0, bestRound: 0 }
    const updated = {
      timesPlayed: current.timesPlayed + 1,
      bestRound: Math.max(current.bestRound, rounds),
    }
    const newStats = {
      ...stats,
      memoryMaze: {
        ...stats.memoryMaze,
        [month]: updated,
      },
    }
    localStorage.setItem(key, JSON.stringify(newStats))
  }

  const stats = user
    ? JSON.parse(localStorage.getItem(`gameStats_${user.email}`) || '{}')?.memoryMaze?.[
        new Date().toISOString().slice(0, 7)
      ]
    : null

  return (
    <div className="min-h-screen bg-[#fefce8] flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-4 text-[#4b5563]">Color Memory Maze</h1>
      <p className="text-md text-center text-[#4b5563] max-w-md mb-4">
        Watch the tiles flash their colors one by one. Then tap them in the same order they appeared.
      </p>

      {!gameOver ? (
        <>
          <p className="mb-2 text-lg text-[#4b5563]">Level: {level}</p>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {tiles.map((tile) => (
              <button
                key={tile.id}
                onClick={() => revealedIndex === -1 && handleClick(tile.id)}
                className={`w-16 h-16 rounded-md shadow-md transition transform hover:scale-105`}
                style={{
                  backgroundColor:
                    revealedIndex === tile.id || selected.includes(tile.id)
                      ? tile.color
                      : '#e5e7eb',
                }}
              />
            ))}
          </div>
          <p className="mt-2 text-[#6ee7b7] italic">
            “Focus on the flashes. Tap in order.”
          </p>
        </>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full text-center relative">
            <button
              onClick={() => navigate('/gameshub')}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
              aria-label="Close"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-[#4b5563] mb-4">Game Over</h2>
            <p className="text-gray-700 mb-2">You reached Level {level - 1}</p>
            {stats && (
              <>
                <p className="text-gray-700 mb-2">Times Played: {stats.timesPlayed}</p>
                <p className="text-gray-700 mb-2">Best Round: {stats.bestRound}</p>
              </>
            )}
            <p className="mt-4 text-[#6ee7b7] italic">“Memory is the key to mastery.”</p>
            <button
              onClick={() => {
                setLevel(3)
                startLevel()
              }}
              className="mt-6 bg-[#93c5fd] hover:bg-[#60a5fa] text-white px-4 py-2 rounded-md"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

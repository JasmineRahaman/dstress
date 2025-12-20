import React from 'react'
import { Link } from 'react-router-dom'

export default function GamesHub({ user }) {
  const getStats = (gameKey) => {
    if (!user || !user.email) return null
    const key = `gameStats_${user.email}`
    const stats = JSON.parse(localStorage.getItem(key) || '{}')
    const month = new Date().toISOString().slice(0, 7)
    return stats[gameKey]?.[month] || null
  }

  const games = [
    {
      key: 'memory',
      title: 'Memory Cards',
      description: 'Flip and match cards to sharpen focus and relax.',
      link: './memorygame',
      color: 'blue',
      statField: 'highestScore',
      statLabel: 'Highest Score',
    },
    {
      key: 'breathing',
      title: 'Breathing Exercise',
      description: 'Follow guided breathing to calm your mind.',
      link: './breathing',
      color: 'green',
      statField: 'bestTime',
      statLabel: 'Best Time',
    },
    
    {
      key: 'memoryMaze',
      title: 'Color Memory Maze',
      description: 'Tap tiles in the order they flash to test your memory.',
      link: './colors',
      color: 'lavender',
      statField: 'bestRound',
      statLabel: 'Best Score',
    },
    {
      key: 'brain rot',
      title: 'Brain Rot',
      description: 'Find the real brain rot.',
      link: './brainrot',
      color: 'sage',
      statField: 'highestScore', 
      statLabel: 'Highest Score', 
    },
    {
      key: 'pattern',
      title: 'Pattern Builder',
      description: 'Draw calming patterns in virtual sand.',
      link: './patternbuilder',
      color: 'rose',
      statField: null,
      statLabel: null,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-calm-blue-700 mb-10">
        Stress Relief Games
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {games.map((game) => {
          const stats = getStats(game.key)
          return (
            <GameCard
              key={game.key}
              title={game.title}
              description={game.description}
              stats={stats}
              statField={game.statField}
              statLabel={game.statLabel}
              link={game.link}
              color={game.color}
            />
          )
        })}
      </div>
    </div>
  )
}

function GameCard({ title, description, stats, statField, statLabel, link, color }) {
  const colorMap = {
    blue: '#6081faff',
    green: '#6ee77eff',
    lavender: '#a78bfaff',
    rose: '#fb7185',
    sage: '#e76e78ff',
  }

  const bgColor = colorMap[color] || '#bfdbfe'

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-2" style={{ color: bgColor }}>
        {title}
      </h2>
      <p className="text-gray-600 mb-4">{description}</p>
      {stats ? (
        <ul className="text-sm text-gray-700 mb-4">
          <li><strong>Times Played:</strong> {stats.timesPlayed}</li>
          {statField && stats[statField] != null && (
            <li><strong>{statLabel}:</strong> {stats[statField]}</li>
          )}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm mb-4">No stats yet for this month.</p>
      )}
      <Link
        to={link}
        className="inline-block text-white px-4 py-2 rounded-md font-medium"
        style={{ backgroundColor: bgColor }}
      >
        Play
      </Link>
    </div>
  )
}

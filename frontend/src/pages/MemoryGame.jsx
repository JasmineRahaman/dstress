import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const quotes = [
    "Peace begins with a single breath.",
    "You are enough, just as you are.",
    "Let go of what you can't control.",
    "Inhale calm, exhale stress.",
    "Your mind is a garden — water it with kindness.",
    "Stillness is where clarity lives.",
    "Every breath is a chance to begin again.",
    "You’ve done enough for today. Rest is productive too."
]

const generateCards = () => {
    const base = ['🍎', '🍌', '🍇', '🍓', '🍍', '🥝']
    const cards = [...base, ...base]
    return cards.sort(() => Math.random() - 0.5).map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false
    }))
}

export default function MemoryGame({ user }) {
    const navigate = useNavigate()
    const [quote, setQuote] = useState('')
    const [cards, setCards] = useState(generateCards())
    const [flipped, setFlipped] = useState([])
    const [score, setScore] = useState(0)
    const [matchedCount, setMatchedCount] = useState(0)
    const [showSummary, setShowSummary] = useState(false)
    const [currentStats, setCurrentStats] = useState(null)


    useEffect(() => {
        if (flipped.length === 2) {
            const [a, b] = flipped
            if (cards[a].emoji === cards[b].emoji) {
                const updated = cards.map((card, i) =>
                    i === a || i === b ? { ...card, matched: true } : card
                )
                setCards(updated)
                setMatchedCount((prev) => prev + 1)
                setScore((prev) => prev + 100)
            } else {
                setTimeout(() => {
                    const updated = cards.map((card, i) =>
                        i === a || i === b ? { ...card, flipped: false } : card
                    )
                    setCards(updated)
                }, 1000)
                setScore((prev) => Math.max(prev - 10, 0))
            }
            setFlipped([])
        }
    }, [flipped])

    useEffect(() => {
        if (matchedCount === cards.length / 2) {
            updateStats()
        }
    }, [matchedCount])

    const handleFlip = (index) => {
        if (flipped.length === 2 || cards[index].flipped || cards[index].matched) return
        const updated = cards.map((card, i) =>
            i === index ? { ...card, flipped: true } : card
        )
        setCards(updated)
        setFlipped([...flipped, index])
    }

    const updateStats = () => {
        if (!user || !user.email) return

        const key = `gameStats_${user.email}`
        const stats = JSON.parse(localStorage.getItem(key) || '{}')
        const month = new Date().toISOString().slice(0, 7)

        const current = stats.memory?.[month] || {}
        const updated = {
            timesPlayed: (current.timesPlayed || 0) + 1,
            highestScore: Math.max(current.highestScore || 0, score),
        }

        const newStats = {
            ...stats,
            memory: {
                ...stats.memory,
                [month]: updated
            }
        }

        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
        setQuote(randomQuote)

        localStorage.setItem(key, JSON.stringify(newStats))
        setCurrentStats(updated)
        setShowSummary(true)
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-center text-[#4b5563] mb-6">Memory Cards</h1>
            <p className="text-center text-gray-600 mb-4">Score: {score}</p>
            <div className="grid grid-cols-4 gap-4">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        onClick={() => handleFlip(index)}
                        className={`cursor-pointer border rounded-lg flex items-center justify-center text-3xl h-24 ${card.flipped || card.matched ? 'bg-[#e0f2fe]' : 'bg-[#f3f4f6]'
                            }`}
                    >
                        {card.flipped || card.matched ? card.emoji : '❓'}
                    </div>
                ))}
            </div>

            {showSummary && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#fdfdfd] rounded-lg shadow-xl p-6 max-w-md w-full text-center relative transition duration-500 animate-fadeIn">
                        <h2 className="text-2xl font-bold text-[#4b5563] mb-4">Game Over</h2>
                        <p className="text-gray-700 mb-2">Score: <strong>{score}</strong></p>
                        <p className="text-gray-700 mb-2">Times Played: {currentStats.timesPlayed}</p>
                        <p className="text-gray-700 mb-2">Highest Score: {currentStats.highestScore}</p>
                        <div className="overflow-hidden">
                            <p className="typing-effect text-[#6ee7b7] italic text-lg">{quote}</p>
                        </div>
                        <button
                            onClick={() => navigate('/gameshub')}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
                            aria-label="Close"
                        >
                            ✖
                        </button>

                        <button
                            onClick={() => {
                                setCards(generateCards())
                                setScore(0)
                                setMatchedCount(0)
                                setShowSummary(false)
                            }}
                            className="mt-6 bg-[#93c5fd] hover:bg-[#60a5fa] text-white px-4 py-2 rounded-md font-medium"
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

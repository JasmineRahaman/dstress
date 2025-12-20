import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import mangoSummer from "../images/mango_summer.png";
import strawberry from "../images/strawberry_softie_shakeini.png";
import orange from "../images/orange_morning_rocketini.png";
import guava from "../images/guava_masala_gladiator.png";
import pineapple from "../images/pineapple.png";
import watermelon from "../images/watermelon_chili_crocodilo.png";
import apple from "../images/Apple_kashmiri_seb_classicini.png";
import banana from "../images/banana.png";
// import kiwi from "../images/kiwi.png";
import cherry from "../images/Cherry_Shimla_Sweetini.png";
import grape from "../images/grape_nashik_clusterini.png";
import nimbu from "../images/lemon.png";
import mosombi from "../images/Sweet_Lime_Mosambi_Chillini.png";
import coconut from "../images/Coconut Tender Coolini.png";
import pomogranate from "../images/Pomegranate_Anaar_Dana_Healthini.png";
import sugarcane from "../images/Sugarcane_Ganne_Ras_Stallini.png";

const characters = [
  { name: "Mango Summer Binini", image: mangoSummer },
  { name: "Strawberry Softie Shakeini", image: strawberry },
  { name: "Orange Morning Rocketini", image: orange },
  { name: "Guava Masala Gladiator", image: guava },
  { name: "Pineapple Pirate", image: pineapple },
  { name: "Watermelon Wizard", image: watermelon },
  { name: "Apple Kashmiri Seb Classicini", image: apple },
  { name: "Banana Barbarian", image: banana },
  // { name: "Kiwi Knight", image: kiwi },
  { name: "Cherry Shimla Sweetini", image: cherry },
  { name: "Grape Nashik Clusterini", image: grape },
  { name: "Nimbu Lancer", image: nimbu },
  { name: "Coconut Tender Coolini", image: coconut },
  { name: "Sweet Lime Mosambi Chillini", image: mosombi },
  { name: "Pomegranate Anaar Dana Healthini", image: pomogranate },
  { name: "Sugarcane Ganne Ras Stallini", image: sugarcane },
];

const UNLOCKABLE_SLOTS = 4;

const quotes = [
  "Peace begins with a single breath.",
  "You are enough, just as you are.",
  "Let go of what you can't control.",
  "Inhale calm, exhale stress.",
  "Your mind is a garden — water it with kindness.",
  "Stillness is where clarity lives.",
  "Every breath is a chance to begin again.",
  "You’ve done enough for today. Rest is productive too."
];

function BrainRot({ user }) {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [current, setCurrent] = useState(null);
  const [options, setOptions] = useState([]);
  const [unlockedRewards, setUnlockedRewards] = useState([]);
  const [showGameOver, setShowGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [quote, setQuote] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    startRound();
  }, [level]);

  const startRound = () => {
    const chosen = characters[Math.floor(Math.random() * characters.length)];
    setCurrent(chosen);

    const distractors = characters
      .filter(c => c.name !== chosen.name)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const opts = [...distractors, chosen].sort(() => 0.5 - Math.random());
    setOptions(opts);
  };

  const saveStats = (finalScore) => {
    if (!user || !user.email) return;
    const key = `gameStats_${user.email}`;
    const stats = JSON.parse(localStorage.getItem(key) || "{}");
    const month = new Date().toISOString().slice(0, 7);

    if (!stats["brain rot"]) stats["brain rot"] = {};
    if (!stats["brain rot"][month]) {
      stats["brain rot"][month] = { timesPlayed: 0, highestScore: 0 };
    }

    stats["brain rot"][month].timesPlayed += 1;
    stats["brain rot"][month].highestScore = Math.max(
      stats["brain rot"][month].highestScore || 0,
      finalScore
    );

    localStorage.setItem(key, JSON.stringify(stats));
    setHighScore(stats["brain rot"][month].highestScore);
  };

  const handleGuess = (choice) => {
    if (choice.name === current.name) {
      const newScore = score + 1;
      setScore(newScore);

      if (level % 5 === 0 && unlockedRewards.length < UNLOCKABLE_SLOTS) {
        setUnlockedRewards([...unlockedRewards, { name: `Reward ${level}`, image: null }]);
      }

      setLevel(level + 1);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        saveStats(score);
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        setShowGameOver(true);
      }
    }
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setLives(3);
    setUnlockedRewards([]);
    setShowGameOver(false);
    startRound();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 py-10">
      <h1 className="text-5xl font-extrabold text-purple-700 mb-6 animate-bounce">
        🍉 Brain Rot Guessers 🍍
      </h1>

      <div className="flex space-x-6 mb-6 text-lg font-semibold">
        <span className="bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg">Level: {level}</span>
        <span className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg">Score: {score}</span>
        <span className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg">Lives: {lives}</span>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Guess: <span className="text-purple-600">{current ? current.name : "—"}</span>
      </h2>

      <div className="flex justify-center items-center mb-12 w-full">
        <div className="grid grid-cols-2 gap-8">
          {options.map((opt, i) => (
            <div
              key={i}
              onClick={() => handleGuess(opt)}
              className="cursor-pointer transform hover:scale-110 transition duration-300"
            >
              <img
                src={opt.image}
                alt={opt.name}
                className="w-48 h-48 object-cover rounded-xl shadow-xl border-4 border-white"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Unlocked rewards section */}
      <div className="bg-white rounded-lg shadow-xl p-6 w-3/4">
        <h3 className="text-xl font-bold text-purple-700 mb-4">🎉 Unlocked Characters</h3>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(UNLOCKABLE_SLOTS)].map((_, i) => {
            const reward = unlockedRewards[i];
            return reward ? (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center bg-green-200 rounded-full shadow-md">
                  <span className="text-xs text-gray-800">{reward.name}</span>
                </div>
              </div>
            ) : (
              <div
                key={i}
                className="w-16 h-16 flex items-center justify-center bg-gray-300 rounded-full shadow-md"
                title="Locked"
              >
                <span className="text-2xl text-gray-600">?</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Game Over Modal */}
      {showGameOver && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center max-w-sm w-full relative">
            {/* X mark to go back to GamesHub */}
            <button
              onClick={() => navigate('/gameshub')}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
              aria-label="Close"
            >
              ✖
            </button>

            <h2 className="text-3xl font-bold text-red-600 mb-4">Game Over</h2>
            <p className="mb-2 text-gray-700">Final Score: <strong>{score}</strong></p>
            <p className="mb-2 text-gray-700">Level Reached: <strong>{level}</strong></p>
            <p className="mb-2 text-gray-700">High Score: <strong>{highScore}</strong></p>
            <p className="italic text-purple-600 mb-6">"{quote}"</p>

            <button
              onClick={resetGame}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default BrainRot;

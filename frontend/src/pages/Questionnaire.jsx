import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { submitQuestionnaire } from '../services/api'

const questions = [
  {
    id: 1,
    category: 'work',
    text: 'I feel overwhelmed by my work responsibilities',
  },
  {
    id: 2,
    category: 'work',
    text: 'I struggle to maintain work-life balance',
  },
  {
    id: 3,
    category: 'work',
    text: 'I feel pressured to meet deadlines',
  },
  {
    id: 4,
    category: 'relationship',
    text: 'I have conflicts with people close to me',
  },
  {
    id: 5,
    category: 'relationship',
    text: 'I feel isolated or lonely',
  },
  {
    id: 6,
    category: 'relationship',
    text: 'I struggle to communicate my feelings effectively',
  },
  {
    id: 7,
    category: 'financial',
    text: 'I worry about my financial situation',
  },
  {
    id: 8,
    category: 'financial',
    text: 'I struggle to pay bills or manage expenses',
  },
  {
    id: 9,
    category: 'financial',
    text: 'I feel anxious about my financial future',
  },
  {
    id: 10,
    category: 'health',
    text: 'I experience physical symptoms like headaches or fatigue',
  },
  {
    id: 11,
    category: 'health',
    text: 'I have difficulty sleeping',
  },
  {
    id: 12,
    category: 'health',
    text: 'I feel anxious or worried most of the time',
  },
]

const options = [
  { label: 'Strongly Disagree', value: 1 },
  { label: 'Disagree', value: 2 },
  { label: 'Neutral', value: 3 },
  { label: 'Agree', value: 4 },
  { label: 'Strongly Agree', value: 5 },
]

function Questionnaire({ setTestScore }) {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      alert('Please answer all questions before submitting.')
      return
    }

    setIsSubmitting(true)
    try {
      const result = await submitQuestionnaire({ answers })
      setTestScore(result)
      navigate('/results')
    } catch (error) {
      console.error('Error submitting questionnaire:', error)
      alert('Failed to submit questionnaire. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-calm-blue-700 mb-6 text-center">
            Stress Assessment Questionnaire
          </h1>

          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-calm-blue-500 to-calm-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-calm-blue-50 rounded-lg p-6 mb-6">
              <p className="text-sm text-calm-blue-700 font-medium mb-2">
                Category: {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
              </p>
              <p className="text-lg text-gray-800 font-medium">
                {question.text}
              </p>
            </div>

            <div className="space-y-3">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(question.id, option.value)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    answers[question.id] === option.value
                      ? 'border-calm-blue-500 bg-calm-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-calm-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium text-gray-800">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-calm-blue-500 text-white hover:bg-calm-blue-600'
              }`}
            >
              Previous
            </button>

            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!answers[question.id]}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  !answers[question.id]
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-calm-green-500 text-white hover:bg-calm-green-600'
                }`}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!answers[question.id] || isSubmitting}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  !answers[question.id] || isSubmitting
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-calm-green-500 text-white hover:bg-calm-green-600'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Questionnaire

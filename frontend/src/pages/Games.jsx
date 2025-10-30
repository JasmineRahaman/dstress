import React, { useState, useEffect } from 'react'
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api'

function Games({ user }) {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [activeGame, setActiveGame] = useState(null)
  const [breathingPhase, setBreathingPhase] = useState('inhale')

  useEffect(() => {
    loadTodos()
  }, [])

  useEffect(() => {
    if (activeGame === 'breathing') {
      const interval = setInterval(() => {
        setBreathingPhase((prev) => {
          if (prev === 'inhale') return 'hold'
          if (prev === 'hold') return 'exhale'
          return 'inhale'
        })
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [activeGame])

  const loadTodos = async () => {
    try {
      const data = await getTodos()
      setTodos(data)
    } catch (error) {
      console.error('Error loading todos:', error)
    }
  }

  const handleAddTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    
    try {
      await createTodo({ title: newTodo, completed: false })
      setNewTodo('')
      loadTodos()
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const handleToggleTodo = async (todo) => {
    try {
      await updateTodo(todo.id, { completed: !todo.completed })
      loadTodos()
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(todoId)
      loadTodos()
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-calm-blue-700 mb-8 text-center">
          Stress Relief Games & To-Do List
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quick Stress Relief</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-calm-blue-700 mb-3">
                  Breathing Exercise
                </h3>
                <p className="text-gray-600 mb-4">
                  Follow the guided breathing pattern to calm your mind
                </p>
                {activeGame === 'breathing' ? (
                  <div className="text-center">
                    <div className={`w-32 h-32 mx-auto rounded-full transition-all duration-4000 ${
                      breathingPhase === 'inhale' ? 'bg-calm-blue-300 scale-150' :
                      breathingPhase === 'hold' ? 'bg-calm-green-300 scale-150' :
                      'bg-calm-lavender-300 scale-100'
                    }`}></div>
                    <p className="mt-4 text-xl font-semibold text-gray-800 capitalize">
                      {breathingPhase}
                    </p>
                    <button
                      onClick={() => setActiveGame(null)}
                      className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                    >
                      Stop
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveGame('breathing')}
                    className="w-full bg-calm-blue-500 hover:bg-calm-blue-600 text-white px-4 py-2 rounded-md font-medium"
                  >
                    Start Breathing Exercise
                  </button>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-calm-green-700 mb-3">
                  Color Matching
                </h3>
                <p className="text-gray-600 mb-4">
                  A simple color matching game to distract and relax your mind
                </p>
                <button className="w-full bg-calm-green-500 hover:bg-calm-green-600 text-white px-4 py-2 rounded-md font-medium">
                  Coming Soon
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-calm-lavender-700 mb-3">
                  Memory Cards
                </h3>
                <p className="text-gray-600 mb-4">
                  Exercise your brain with this calming memory game
                </p>
                <button className="w-full bg-calm-lavender-500 hover:bg-calm-lavender-600 text-white px-4 py-2 rounded-md font-medium">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">My To-Do List</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleAddTodo} className="mb-6">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-calm-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-calm-blue-500 hover:bg-calm-blue-600 text-white px-6 py-2 rounded-md font-medium"
                  >
                    Add
                  </button>
                </div>
              </form>

              <div className="space-y-2">
                {todos.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No tasks yet. Add one above!</p>
                ) : (
                  todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-center space-x-3 p-3 bg-calm-blue-50 rounded-md"
                    >
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleTodo(todo)}
                        className="w-5 h-5 text-calm-blue-500"
                      />
                      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {todo.title}
                      </span>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Games

import React, { useState, useEffect } from 'react'
import {
  getAdminUsers,
  authorizeUser,
  getAdminProfessionals,
  createProfessional,
  updateProfessional,
  deleteProfessional
} from '../services/api'

function Admin() {
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState([])
  const [professionals, setProfessionals] = useState([])
  const [showProForm, setShowProForm] = useState(false)
  const [editingPro, setEditingPro] = useState(null)
  const [proForm, setProForm] = useState({
    name: '',
    contact: '',
    email:'',
    specialization: '',
    bio: '',
    rate: ''

  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [usersData, prosData] = await Promise.all([
        getAdminUsers(),
        getAdminProfessionals()
      ])
      setUsers(usersData)
      setProfessionals(prosData)
    } catch (error) {
      console.error('Error loading admin data:', error)
    }
  }

  const handleAuthorizeUser = async (userId) => {
    try {
      await authorizeUser(userId)
      loadData()
    } catch (error) {
      console.error('Error authorizing user:', error)
    }
  }

  const handleProSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingPro) {
        await updateProfessional(editingPro.id, proForm)
      } else {
        await createProfessional(proForm)
      }
      setShowProForm(false)
      setEditingPro(null)
      setProForm({ name: '',contact:'',email:'', specialization: '', bio: '', rate: '' })
      loadData()
    } catch (error) {
      console.error('Error saving professional:', error)
    }
  }

  const handleEditPro = (pro) => {
    setEditingPro(pro)
    setProForm({
      name: pro.name,
      contact: pro.contact,
      email: pro.email,
      specialization: pro.specialization,
      bio: pro.bio,
      rate: pro.rate
    })
    setShowProForm(true)
  }

  const handleDeletePro = async (proId) => {
    if (window.confirm('Are you sure you want to delete this professional?')) {
      try {
        await deleteProfessional(proId)
        loadData()
      } catch (error) {
        console.error('Error deleting professional:', error)
      }
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-calm-lavender-700 mb-8 text-center">
          Admin Dashboard
        </h1>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === 'users'
                ? 'bg-calm-lavender-500 text-white'
                : 'bg-white text-gray-700 hover:bg-calm-lavender-50'
            }`}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveTab('professionals')}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === 'professionals'
                ? 'bg-calm-lavender-500 text-white'
                : 'bg-white text-gray-700 hover:bg-calm-lavender-50'
            }`}
          >
            Professional Management
          </button>
        </div>

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-calm-blue-50">
                    <th className="px-4 py-3 text-left text-gray-700">Name</th>
                    <th className="px-4 py-3 text-left text-gray-700">Email</th>
                    <th className="px-4 py-3 text-left text-gray-700">Joined</th>
                    <th className="px-4 py-3 text-left text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          user.is_authorized
                            ? 'bg-calm-green-100 text-calm-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {user.is_authorized ? 'Authorized' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {!user.is_authorized && (
                          <button
                            onClick={() => handleAuthorizeUser(user.id)}
                            className="bg-calm-green-500 hover:bg-calm-green-600 text-white px-4 py-1 rounded-md text-sm"
                          >
                            Authorize
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'professionals' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Professionals</h2>
              <button
                onClick={() => setShowProForm(true)}
                className="bg-calm-lavender-500 hover:bg-calm-lavender-600 text-white px-6 py-2 rounded-md font-medium"
              >
                Add Professional
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {professionals.map((pro) => (
                <div key={pro.id} className="border rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-calm-blue-700 mb-2">
                    {pro.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{pro.specialization}</p>
                  <p className="text-gray-500 text-sm mb-3">{pro.bio}</p>
                  <p className="text-calm-green-600 font-medium mb-3">${pro.rate}/session</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditPro(pro)}
                      className="bg-calm-blue-500 hover:bg-calm-blue-600 text-white px-4 py-1 rounded-md text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePro(pro.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showProForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-calm-lavender-700 mb-4">
                {editingPro ? 'Edit Professional' : 'Add Professional'}
              </h2>
              <form onSubmit={handleProSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={proForm.name}
                    onChange={(e) => setProForm({ ...proForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-calm-lavender-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Contact</label>
                  <input
                    type="text"
                    value={proForm.contact}
                    onChange={(e) => setProForm({ ...proForm, contact: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-calm-lavender-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={proForm.email}
                    onChange={(e) => setProForm({ ...proForm, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-calm-lavender-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Specialization</label>
                  <input
                    type="text"
                    value={proForm.specialization}
                    onChange={(e) => setProForm({ ...proForm, specialization: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-calm-lavender-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Bio</label>
                  <textarea
                    value={proForm.bio}
                    onChange={(e) => setProForm({ ...proForm, bio: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-calm-lavender-500"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Rate (per session)</label>
                  <input
                    type="number"
                    value={proForm.rate}
                    onChange={(e) => setProForm({ ...proForm, rate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-calm-lavender-500"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-calm-lavender-500 hover:bg-calm-lavender-600 text-white px-4 py-2 rounded-md font-medium"
                  >
                    {editingPro ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowProForm(false)
                      setEditingPro(null)
                      setProForm({ name: '',contact: '',email: '', specialization: '', bio: '', rate: '' })
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin

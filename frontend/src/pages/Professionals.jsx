import React, { useState, useEffect } from 'react'
import { getProfessionals, bookSession, getMyBookings } from '../services/api'

function Professionals({ user }) {
  const [professionals, setProfessionals] = useState([])
  const [bookings, setBookings] = useState([])
  const [selectedPro, setSelectedPro] = useState(null)
  const [bookingForm, setBookingForm] = useState({ date: '', time: '', notes: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [prosData, bookingsData] = await Promise.all([
        getProfessionals(),
        getMyBookings()
      ])
      setProfessionals(prosData)
      setBookings(bookingsData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBooking = async (e) => {
    e.preventDefault()
    try {
      await bookSession(selectedPro.id, bookingForm)
      alert('Session booked successfully!')
      setSelectedPro(null)
      setBookingForm({ date: '', time: '', notes: '' })
      loadData()
    } catch (error) {
      console.error('Error booking session:', error)
      alert('Failed to book session. Please try again.')
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-calm-blue-700 text-xl">Loading...</div>
    </div>
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-calm-blue-700 mb-8 text-center">
          Mental Health Professionals
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Available Professionals</h2>
            <div className="space-y-4">
              {professionals.map((pro) => (
                <div key={pro.id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-calm-blue-700 mb-2">
                    {pro.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{pro.specialization}</p>
                  <p className="text-gray-500 text-sm mb-4">{pro.bio}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-calm-green-600 font-medium">${pro.rate}/session</span>
                    <button
                      onClick={() => setSelectedPro(pro)}
                      className="bg-calm-blue-500 hover:bg-calm-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Bookings</h2>
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No bookings yet</p>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-calm-blue-700 mb-2">
                      {booking.professional_name}
                    </h3>
                    <p className="text-gray-600 mb-1">
                      Date: {new Date(booking.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 mb-1">Time: {booking.time}</p>
                    <p className="text-gray-500 text-sm">Status: {booking.status}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {selectedPro && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-calm-blue-700 mb-4">
                Book Session with {selectedPro.name}
              </h2>
              <form onSubmit={handleBooking}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-calm-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Time</label>
                  <input
                    type="time"
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-calm-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Notes (Optional)</label>
                  <textarea
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-calm-blue-500"
                    rows="3"
                  ></textarea>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-calm-green-500 hover:bg-calm-green-600 text-white px-4 py-2 rounded-md font-medium"
                  >
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPro(null)}
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

export default Professionals

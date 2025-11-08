import React, { useState, useEffect } from 'react'
import { getCommunityPosts, createPost, getComments, addComment } from '../services/api'

function Community({ user }) {
  const [posts, setPosts] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [postType, setPostType] = useState('image')
  const [imageFile, setImageFile] = useState(null)
  const [eventForm, setEventForm] = useState({
    name: '',
    place: '',
    date: '',
    time: '',
    organizer_name: '',
    organizer_contact: ''
  })
  const [selectedPost, setSelectedPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const data = await getCommunityPosts()
      setPosts(data)
    } catch (error) {
      console.error('Error loading posts:', error)
    }
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()
    
    const formData = new FormData()
    
    if (postType === 'image' && imageFile) {
      formData.append('image', imageFile)
      formData.append('type', 'image')
    } else {
      formData.append('type', 'text')
      Object.keys(eventForm).forEach(key => {
        formData.append(key, eventForm[key])
      })
    }

    try {
      await createPost(formData)
      setShowCreateForm(false)
      setImageFile(null)
      setEventForm({
        name: '',
        place: '',
        date: '',
        time: '',
        organizer_name: '',
        organizer_contact: ''
      })
      loadPosts()
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post. Please try again.')
    }
  }

  const handleViewComments = async (post) => {
    setSelectedPost(post)
    try {
      const data = await getComments(post.id)
      setComments(data)
    } catch (error) {
      console.error('Error loading comments:', error)
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      await addComment(selectedPost.id, newComment)
      setNewComment('')
      const data = await getComments(selectedPost.id)
      setComments(data)
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-calm-blue-700">Community Events</h1>
          {user?.is_authorized && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-calm-green-500 hover:bg-calm-green-600 text-white px-6 py-2 rounded-md font-medium"
            >
              Create Event
            </button>
          )}
        </div>

        {!user?.is_authorized && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800">
              You need to be authorized by an admin to post events. Please contact an administrator.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              {post.type === 'image' && post.image_url && (
                <img
                  src={`http://localhost:8000${encodeURI(post.image_url)}`}
                  alt="Event poster"
                  className="w-full rounded-lg mb-4"
                />
              )}
              
              {post.type === 'text' && (
                <div className="bg-calm-blue-50 rounded-lg p-6 mb-4">
                  <h3 className="text-2xl font-semibold text-calm-blue-700 mb-3">
                    {post.name}
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Place:</strong> {post.place}</p>
                    <p><strong>Date:</strong> {new Date(post.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {post.time}</p>
                    <p><strong>Organizer:</strong> {post.organizer_name}</p>
                    <p><strong>Contact:</strong> {post.organizer_contact}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Posted by {post.author_name} on {new Date(post.created_at).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleViewComments(post)}
                  className="text-calm-blue-600 hover:text-calm-blue-700 font-medium"
                >
                  View Comments ({post.comment_count || 0})
                </button>
              </div>
            </div>
          ))}
        </div>

        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full my-8">
              <h2 className="text-2xl font-bold text-calm-blue-700 mb-4">Create Event</h2>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Post Type</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setPostType('image')}
                    className={`px-4 py-2 rounded-md ${
                      postType === 'image'
                        ? 'bg-calm-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Image/Poster
                  </button>
                  <button
                    onClick={() => setPostType('text')}
                    className={`px-4 py-2 rounded-md ${
                      postType === 'text'
                        ? 'bg-calm-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Text Details
                  </button>
                </div>
              </div>

              <form onSubmit={handleCreatePost}>
                {postType === 'image' ? (
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="w-full"
                      required
                    />
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Event Name *</label>
                      <input
                        type="text"
                        value={eventForm.name}
                        onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-calm-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Place *</label>
                      <input
                        type="text"
                        value={eventForm.place}
                        onChange={(e) => setEventForm({ ...eventForm, place: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-calm-blue-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Date *</label>
                        <input
                          type="date"
                          value={eventForm.date}
                          onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-calm-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Time *</label>
                        <input
                          type="time"
                          value={eventForm.time}
                          onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-calm-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Organizer Name *</label>
                      <input
                        type="text"
                        value={eventForm.organizer_name}
                        onChange={(e) => setEventForm({ ...eventForm, organizer_name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-calm-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Organizer Contact *</label>
                      <input
                        type="text"
                        value={eventForm.organizer_contact}
                        onChange={(e) => setEventForm({ ...eventForm, organizer_contact: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-calm-blue-500"
                        required
                      />
                    </div>
                  </>
                )}

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-calm-green-500 hover:bg-calm-green-600 text-white px-4 py-2 rounded-md font-medium"
                  >
                    Create Event
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full my-8">
              <h2 className="text-2xl font-bold text-calm-blue-700 mb-4">Comments</h2>
              
              <div className="mb-6 max-h-96 overflow-y-auto space-y-3">
                {comments.slice(0, 20).map((comment) => (
                  <div key={comment.id} className="bg-calm-blue-50 rounded-lg p-4">
                    <p className="text-gray-800">{comment.content}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {comment.author_name} - {new Date(comment.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
                {comments.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No comments yet</p>
                )}
              </div>

              <form onSubmit={handleAddComment} className="mb-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-calm-blue-500"
                  rows="3"
                ></textarea>
                <div className="flex space-x-4 mt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-calm-blue-500 hover:bg-calm-blue-600 text-white px-4 py-2 rounded-md font-medium"
                  >
                    Post Comment
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPost(null)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium"
                  >
                    Close
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

export default Community

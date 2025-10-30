import axios from 'axios'

const API_BASE = '/api'

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
})

export const getUserProfile = async () => {
  const response = await api.get('/auth/user')
  return response.data
}

export const submitQuestionnaire = async (answers) => {
  const response = await api.post('/questionnaire/submit', answers)
  return response.data
}

export const getActivities = async (score) => {
  const response = await api.get(`/activities?score=${score}`)
  return response.data
}

export const getProfessionals = async () => {
  const response = await api.get('/professionals')
  return response.data
}

export const bookSession = async (professionalId, bookingData) => {
  const response = await api.post(`/professionals/${professionalId}/book`, bookingData)
  return response.data
}

export const getMyBookings = async () => {
  const response = await api.get('/bookings/my')
  return response.data
}

export const getCommunityPosts = async () => {
  const response = await api.get('/community/posts')
  return response.data
}

export const createPost = async (formData) => {
  const response = await api.post('/community/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

export const getComments = async (postId) => {
  const response = await api.get(`/community/posts/${postId}/comments`)
  return response.data
}

export const addComment = async (postId, content) => {
  const response = await api.post(`/community/posts/${postId}/comments`, { content })
  return response.data
}

export const getTodos = async () => {
  const response = await api.get('/todos')
  return response.data
}

export const createTodo = async (todoData) => {
  const response = await api.post('/todos', todoData)
  return response.data
}

export const updateTodo = async (todoId, todoData) => {
  const response = await api.put(`/todos/${todoId}`, todoData)
  return response.data
}

export const deleteTodo = async (todoId) => {
  const response = await api.delete(`/todos/${todoId}`)
  return response.data
}

export const getAdminUsers = async () => {
  const response = await api.get('/admin/users')
  return response.data
}

export const authorizeUser = async (userId) => {
  const response = await api.post(`/admin/users/${userId}/authorize`)
  return response.data
}

export const getAdminProfessionals = async () => {
  const response = await api.get('/admin/professionals')
  return response.data
}

export const createProfessional = async (professionalData) => {
  const response = await api.post('/admin/professionals', professionalData)
  return response.data
}

export const updateProfessional = async (professionalId, professionalData) => {
  const response = await api.put(`/admin/professionals/${professionalId}`, professionalData)
  return response.data
}

export const deleteProfessional = async (professionalId) => {
  const response = await api.delete(`/admin/professionals/${professionalId}`)
  return response.data
}

export default api

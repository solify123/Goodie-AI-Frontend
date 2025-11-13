import axios from 'axios'
import API_CONFIG from '../config/api.config'

// Create axios instance with token interceptor
const messageAxios = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add token
messageAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const messageApi = {
  getMessages: async (chatId: string) => {
    const response = await messageAxios.get(`/v1/messages/${chatId}`)
    return response.data
  },

  sendMessage: async (chatId: string, content: string, characterId?: string) => {
    const response = await messageAxios.post('/v1/messages/send', {
      chatId,
      content,
      characterId
    })
    return response.data
  },

  deleteMessages: async (chatId: string) => {
    const response = await messageAxios.delete(`/v1/messages/${chatId}`)
    return response.data
  },

}


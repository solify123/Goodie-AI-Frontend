import axios from 'axios'
import API_CONFIG from '../config/api.config'

// Create axios instance with token interceptor
const chatsAxios = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add token
chatsAxios.interceptors.request.use(
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

export const chatsApi = {
    createChat: async (content: string, characterId: string) => {
        const response = await chatsAxios.post('/v1/chats/create', {
            content,
            characterId
        })
        return response.data
    },

    getChats: async () => {
        const response = await chatsAxios.get('/v1/chats')
        return response.data
    }
}
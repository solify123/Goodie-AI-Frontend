import axios from 'axios'
import API_CONFIG from '../config/api.config'

// Create axios instance with token interceptor
const generateImageAxios = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add token
generateImageAxios.interceptors.request.use(
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

export const generateImageApi = {
    generateImage: async (selectedCharacter: any, prompt: string, selectedCount: number) => {
        const response = await generateImageAxios.post('/v1/generate-image', {
            characterId: selectedCharacter.id,
            prompt: prompt,
            count: selectedCount
        })
        return response.data
    },
    getImages: async (characterId?: string) => {
        const params = characterId ? { characterId } : {}
        const response = await generateImageAxios.get('/v1/generate-image', { params })
        return response.data
    }
}
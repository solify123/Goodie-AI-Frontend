import axios from 'axios'
import API_CONFIG from '../config/api.config'

// Create axios instance with default config
const authAxios = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add token for authenticated requests
authAxios.interceptors.request.use(
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

// Create regular axios instance for public endpoints
const publicAxios = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const authApi = {
  register: async (credentials: { email: string; password: string }) => {
    const response = await publicAxios.post('/auth/register', credentials)
    return response.data
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await publicAxios.post('/auth/login', credentials)
    return response.data
  },

  logout: async () => {
    const response = await authAxios.post('/auth/logout')
    return response.data
  },

  getCurrentUser: async () => {
    const response = await authAxios.get('/auth/me')
    return response.data
  },

  resendConfirmation: async (email: string) => {
    const response = await publicAxios.post('/auth/resend-confirmation', { email })
    return response.data
  },

  forgotPassword: async (email: string) => {
    const response = await publicAxios.post('/auth/forgot-password', { email })
    return response.data
  },

  resetPassword: async (newPassword: string) => {
    const response = await authAxios.post('/auth/reset-password', { newPassword })
    return response.data
  },

  oauthCallback: async (provider: string, code: string) => {
    const response = await publicAxios.get(`/auth/oauth/callback?provider=${provider}&code=${code}`)
    return response.data
  }
}

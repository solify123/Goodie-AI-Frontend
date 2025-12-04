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
    const response = await publicAxios.post('/v1/auth/register', credentials)
    return response.data
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await publicAxios.post('/v1/auth/login', credentials)
    return response.data
  },

  logout: async () => {
    const response = await authAxios.post('/v1/auth/logout')
    return response.data
  },

  getCurrentUser: async () => {
    const response = await authAxios.get('/v1/auth/me')
    return response.data
  },

  resendConfirmation: async (email: string) => {
    const response = await publicAxios.post('/v1/auth/resend-confirmation', { email })
    return response.data
  },

  forgotPassword: async (email: string) => {
    const response = await publicAxios.post('/v1/auth/forgot-password', { email })
    return response.data
  },

  resetPassword: async (newPassword: string) => {
    const response = await authAxios.post('/v1/auth/reset-password', { newPassword })
    return response.data
  },

  oauthCallback: async (provider: string, code: string) => {
    const response = await publicAxios.get(`/v1/auth/oauth/callback?provider=${provider}&code=${code}`)
    return response.data
  },

  /**
   * Verify token with backend
   */
  verifyToken: async (token: string) => {
    const response = await publicAxios.get('/v1/auth/oauth/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
}


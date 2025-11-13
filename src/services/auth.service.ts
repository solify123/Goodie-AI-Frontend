import { authApi } from '../api/auth.api'

export interface User {
  id: string
  email: string
  email_confirmed_at?: string
  created_at: string
  updated_at?: string
  user_metadata?: Record<string, any>
}

export interface AuthResponse {
  user: User
  session: {
    access_token: string
    refresh_token: string
    expires_in: number
    token_type: string
  }
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
}

export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: string
  errors?: any[]
}

// Helper functions for token management
const saveAuthData = (authData: AuthResponse) => {
  const { session, user } = authData
  
  if (session) {
    localStorage.setItem('access_token', session.access_token)
    localStorage.setItem('refresh_token', session.refresh_token)
    localStorage.setItem('token_expires_in', session.expires_in.toString())
  }
  
  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
  }
}

const clearAuthData = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('token_expires_in')
  localStorage.removeItem('user')
}

export const authService = {
  /**
   * Register a new user
   */
  register: async (credentials: RegisterCredentials) => {
    try {
      const response = await authApi.register(credentials)
      
      if (response.success && response.data?.session) {
        saveAuthData(response.data)
      }
      
      return response
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Registration failed'
      } as ApiResponse<AuthResponse>
    }
  },

  /**
   * Login user
   */
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials)
      
      if (response.success && response.data?.session) {
        saveAuthData(response.data)
      }
      
      return response
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Login failed'
      } as ApiResponse<AuthResponse>
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearAuthData()
    }
  },

  /**
   * Get current user
   */
  getCurrentUser: async () => {
    try {
      const response = await authApi.getCurrentUser()
      return response
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to get current user'
      } as ApiResponse<User>
    }
  },

  /**
   * Resend confirmation email
   */
  resendConfirmation: async (email: string) => {
    try {
      const response = await authApi.resendConfirmation(email)
      return response
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to resend confirmation'
      } as ApiResponse
    }
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email: string) => {
    try {
      const response = await authApi.forgotPassword(email)
      return response
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to send password reset'
      } as ApiResponse
    }
  },

  /**
   * Reset password
   */
  resetPassword: async (newPassword: string) => {
    try {
      const response = await authApi.resetPassword(newPassword)
      return response
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to reset password'
      } as ApiResponse
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('access_token')
    const user = authService.getUser()
    return !!(token && user)
  },

  /**
   * Get stored user
   */
  getUser: (): User | null => {
    const userStr = localStorage.getItem('user')
    if (!userStr) return null
    
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  },

  /**
   * Clear all authentication data
   */
  clearAuth: (): void => {
    clearAuthData()
  },

  /**
   * OAuth sign in URL generator
   */
  getOAuthUrl: (provider: 'google' | 'discord' | 'twitter'): string => {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    return `${baseURL}/auth/oauth/${provider}`
  }
}

export default authService


import apiService, { type ApiResponse } from './api.service'

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

class AuthService {
  /**
   * Register a new user
   */
  async register(credentials: RegisterCredentials): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await apiService.post<AuthResponse>('/auth/register', credentials)
      
      if (response.success && response.data?.session) {
        this.saveAuthData(response.data)
      }
      
      return response
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed')
    }
  }

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await apiService.post<AuthResponse>('/auth/login', credentials)
      
      if (response.success && response.data?.session) {
        this.saveAuthData(response.data)
      }
      
      return response
    } catch (error: any) {
      throw new Error(error.message || 'Login failed')
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      this.clearAuthData()
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiService.get<User>('/auth/me')
  }

  /**
   * Resend confirmation email
   */
  async resendConfirmation(email: string): Promise<ApiResponse> {
    return apiService.post('/auth/resend-confirmation', { email })
  }

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<ApiResponse> {
    return apiService.post('/auth/forgot-password', { email })
  }

  /**
   * Reset password
   */
  async resetPassword(newPassword: string): Promise<ApiResponse> {
    return apiService.post('/auth/reset-password', { newPassword })
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token')
    const user = this.getUser()
    return !!(token && user)
  }

  /**
   * Get stored user
   */
  getUser(): User | null {
    const userStr = localStorage.getItem('user')
    if (!userStr) return null
    
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }

  /**
   * Save authentication data to localStorage
   */
  private saveAuthData(authData: AuthResponse) {
    const { session, user } = authData
    
    if (session) {
      apiService.setToken(session.access_token)
      localStorage.setItem('refresh_token', session.refresh_token)
      localStorage.setItem('token_expires_in', session.expires_in.toString())
    }
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }

  /**
   * Clear all authentication data
   */
  private clearAuthData() {
    apiService.clearToken()
    localStorage.removeItem('user')
  }

  /**
   * OAuth sign in URL generator
   */
  getOAuthUrl(provider: 'google' | 'discord' | 'twitter'): string {
    // This would need to be implemented based on your Supabase setup
    // For now, return a placeholder
    return `${apiService['baseURL']}/auth/oauth/${provider}`
  }
}

export default new AuthService()


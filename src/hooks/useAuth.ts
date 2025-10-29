import { useState, useEffect } from 'react'
import authService, { type User } from '../services/auth.service'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      if (authService.isAuthenticated()) {
        const response = await authService.getCurrentUser()
        if (response.success && response.data) {
          setUser(response.data)
          setIsAuthenticated(true)
        } else {
          setUser(null)
          setIsAuthenticated(false)
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password })
    if (response.success && response.data) {
      setUser(response.data.user)
      setIsAuthenticated(true)
    }
    return response
  }

  const register = async (email: string, password: string) => {
    const response = await authService.register({ email, password })
    if (response.success && response.data) {
      setUser(response.data.user)
      setIsAuthenticated(true)
    }
    return response
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
    setIsAuthenticated(false)
  }

  return {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
  }
}

export default useAuth


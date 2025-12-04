import { useState, useEffect } from 'react'
// import authService, { type User } from '../services/auth.service'
import { useGlobalContext } from '../contexts/GlobalContext'
import { authService } from '../services/auth.service'

export const useAuth = () => {
  const [loading, setLoading] = useState(true)
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useGlobalContext()
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      console.log("Authenticate ==================>")
      if (authService.isAuthenticated()) {
        setIsAuthenticated(true)
        const response = await authService.getCurrentUser()
        if (!(response.success && response.data)) {
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
    setUser(null)
    setIsAuthenticated(false)
    await authService.logout()
  }

  return {
    user,
    loading,
    isAuthenticated,
    setIsAuthenticated,
    login,
    register,
    logout,
    checkAuth,
  }
}

export default useAuth


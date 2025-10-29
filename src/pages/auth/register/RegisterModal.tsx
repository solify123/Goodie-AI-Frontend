import { useState } from 'react'
import { X, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import authService from '../../../services/auth.service'
import { toast } from 'sonner'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin?: () => void
  onRegistrationSuccess?: (email: string) => void
}

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin, onRegistrationSuccess }: RegisterModalProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authService.register({ email, password })
      
      if (response.success) {
        toast.success('Registration successful!', {
          description: 'Please check your email to confirm your account.',
        })
        // After successful registration, trigger the confirmation modal
        if (onRegistrationSuccess) {
          onRegistrationSuccess(email)
        }
      } else {
        const errorMsg = response.message || 'Registration failed'
        setError(errorMsg)
        toast.error('Registration failed', {
          description: errorMsg,
        })
      }
    } catch (err: any) {
      const errorMsg = err.message || 'An error occurred during registration'
      setError(errorMsg)
      toast.error('Registration error', {
        description: errorMsg,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    const oauthUrl = authService.getOAuthUrl('google')
    window.location.href = oauthUrl
  }

  const handleDiscordSignIn = () => {
    const oauthUrl = authService.getOAuthUrl('discord')
    window.location.href = oauthUrl
  }

  const handleXSignIn = () => {
    const oauthUrl = authService.getOAuthUrl('twitter')
    window.location.href = oauthUrl
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4 bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Image/Branding */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-900/60 via-pink-900/50 to-purple-800/60 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-800/70 to-purple-900/80"></div>
            {/* Placeholder for background image - add your actual image */}
            <div className="relative w-full h-full flex items-end justify-center p-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold">
                  <span className="text-white">goodie</span>
                  <span className="text-pink-500">.ai</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-8 lg:p-12 relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Form Content */}
            <div className="space-y-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                Create Account
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                    required
                  />
                </div>

                {/* Password Input */}
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Minimum 6 characters</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  <span>{loading ? 'Creating Account...' : 'Create Free Account'}</span>
                </button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#1a1a1a] text-gray-400">or continue with</span>
                </div>
              </div>

              {/* Social Sign-in Buttons */}
              <div className="space-y-3">
                {/* Google */}
                <button
                  onClick={handleGoogleSignIn}
                  className="cursor-pointer w-full bg-white text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                {/* Discord and X */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Discord */}
                  <button
                    onClick={handleDiscordSignIn}
                    className="cursor-pointer bg-[#5865F2] text-white py-3 rounded-lg font-medium hover:bg-[#4752C4] transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    <span>Discord</span>
                  </button>

                  {/* X (Twitter) */}
                  <button
                    onClick={handleXSignIn}
                    className="cursor-pointer bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>X</span>
                  </button>
                </div>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center">
                By signing up, you agree to{' '}
                <a href="#" className="cursor-pointer text-pink-500 hover:text-pink-400 transition-colors">
                  Terms of Service
                </a>
              </p>

              {/* Sign In Link */}
              <div className="text-center pt-4 border-t border-gray-800">
                <p className="text-sm text-gray-400">
                  Already have an account?{' '}
                  <button
                    onClick={onSwitchToLogin}
                    className="cursor-pointer text-pink-500 hover:text-pink-400 transition-colors font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterModal


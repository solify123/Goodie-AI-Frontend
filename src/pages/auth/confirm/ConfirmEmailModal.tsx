import { useState, useEffect } from 'react'
import { X, ChevronLeft, RefreshCw, Mail, Loader2 } from 'lucide-react'
import authService from '../../../services/auth.service'
import { toast } from 'sonner'

interface ConfirmEmailModalProps {
  isOpen: boolean
  onClose: () => void
  onBack?: () => void
  onSwitchToLogin?: () => void
  email: string
}

const ConfirmEmailModal = ({ isOpen, onClose, onBack, onSwitchToLogin, email }: ConfirmEmailModalProps) => {
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setCountdown(60)
      setCanResend(false)
      setMessage('')
      setError('')
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen])

  if (!isOpen) return null

  const handleResendLink = async () => {
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const response = await authService.resendConfirmation(email)
      
      if (response.success) {
        setMessage('Confirmation email sent successfully!')
        setCountdown(60)
        setCanResend(false)
        toast.success('Email sent!', {
          description: 'Confirmation email has been resent successfully.',
        })
      } else {
        const errorMsg = response.message || 'Failed to resend confirmation email'
        setError(errorMsg)
        toast.error('Resend failed', {
          description: errorMsg,
        })
      }
    } catch (err: any) {
      const errorMsg = err.message || 'An error occurred'
      setError(errorMsg)
      toast.error('Error', {
        description: errorMsg,
      })
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4 bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Image/Branding */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-900/60 via-[#00695c]/40 to-purple-800/60 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-[#00796b]/50 to-purple-900/80"></div>
            {/* Placeholder for background image */}
            <div className="relative w-full h-full flex items-end justify-center p-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold">
                  <span className="text-white">goodie</span>
                  <span className="text-[#009688]">.ai</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Right Side - Confirmation Content */}
          <div className="w-full md:w-1/2 p-8 lg:p-12 relative">
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-8">
              {/* Back Button */}
              {onBack && (
                <button
                  onClick={onBack}
                  className="cursor-pointer flex items-center space-x-2 text-white hover:text-[#009688] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-medium">Back</span>
                </button>
              )}
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="cursor-pointer ml-auto text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6 flex flex-col items-center text-center">
              {/* Email Icon Illustration */}
              <div className="relative">
                {/* Motion lines */}
                <div className="absolute -left-8 top-8">
                  <div className="h-0.5 w-6 bg-white/50 rounded-full"></div>
                  <div className="h-0.5 w-4 bg-white/30 rounded-full mt-2"></div>
                </div>
                <div className="absolute -right-8 top-8">
                  <div className="h-0.5 w-6 bg-white/50 rounded-full"></div>
                  <div className="h-0.5 w-4 bg-white/30 rounded-full mt-2"></div>
                </div>
                
                {/* Email envelope */}
                <div className="w-32 h-32 bg-gradient-to-br to-[#00bfa5] to-[#00897b] rounded-2xl flex items-center justify-center shadow-lg shadow-[0_6px_20px_-10px_rgba(0,150,136,0.55)]">
                  <Mail className="w-16 h-16 text-white" />
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                Confirm your E-mail
              </h2>

              {/* Description */}
              <div className="space-y-2">
                <p className="text-gray-400 text-sm lg:text-base">
                  We've sent a confirmation link to{' '}
                  <span className="text-[#009688] font-medium">{email}</span>.
                </p>
                <p className="text-gray-400 text-sm lg:text-base">
                  If you don't see it, check your SPAM folder.
                </p>
              </div>

              {/* Messages */}
              {message && (
                <div className="bg-green-500/10 border border-green-500/50 text-green-500 px-4 py-3 rounded-lg text-sm">
                  {message}
                </div>
              )}
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Timer */}
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="text-sm">{formatTime(countdown)}</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Resend Link Button */}
              <button
                onClick={handleResendLink}
                disabled={!canResend || loading}
                className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg ${
                  canResend && !loading
                    ? 'bg-gradient-to-r to-[#00bfa5] to-[#00897b] text-white hover:from-[#00897b] hover:to-[#00796b] shadow-[0_6px_20px_-10px_rgba(0,150,136,0.55)] cursor-pointer'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed shadow-gray-700/30'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className={`w-5 h-5 ${canResend ? '' : 'opacity-50'}`} />
                    <span>Resend Link</span>
                  </>
                )}
              </button>

              {/* Sign In Link */}
              <div className="pt-6 border-t border-gray-800 w-full">
                <p className="text-sm text-gray-400">
                  Already have an account?{' '}
                  <button
                    onClick={onSwitchToLogin}
                    className="cursor-pointer text-[#009688] hover:text-[#009688] transition-colors font-medium"
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

export default ConfirmEmailModal


import { useEffect } from 'react'
import { supabase } from '../../../config/supabase.config'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authApi } from '../../../api/auth.api'
import axios from 'axios'
import API_CONFIG from '../../../config/api.config'
import { toast } from 'sonner'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    // Two common options: use onAuthStateChange OR exchange the redirect result
    // Option A: get session from URL (exchange). This is common if you used redirect flow.
    async function finishOAuth() {
      try {
        // Get flow type from URL params or localStorage
        const flowParam = searchParams.get('flow')
        const flow = flowParam || localStorage.getItem('oauth_flow') || 'login'
        
        // getSessionFromUrl may be needed for some flows; if it exists in your version:
        // await supabase.auth.getSessionFromUrl({ storeSession: true })
        // The simpler and recommended approach: call getUser() to fetch validated user (server-checked)
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) {
          console.error('getUser error', error)
          toast.error('Authentication failed', {
            description: error.message || 'Failed to authenticate',
          })
          localStorage.removeItem('oauth_flow')
          setTimeout(() => {
            navigate('/')
          }, 2000)
          return
        }

        if (!user) {
          toast.error('Authentication failed', {
            description: 'No user found',
          })
          localStorage.removeItem('oauth_flow')
          setTimeout(() => {
            navigate('/')
          }, 2000)
          return
        }

        // User is signed in — you can fetch access token if needed:
        const { data: { session } } = await supabase.auth.getSession()
        const accessToken = session?.access_token
        
        if (!session || !accessToken) {
          toast.error('Authentication failed', {
            description: 'Failed to get session',
          })
          localStorage.removeItem('oauth_flow')
          setTimeout(() => {
            navigate('/')
          }, 2000)
          return
        }

        // Verify token with backend
        try {
          const verifyResponse = await authApi.verifyToken(accessToken)
          if (!verifyResponse.success) {
            console.error('Token verification failed:', verifyResponse)
            toast.error('Token verification failed', {
              description: verifyResponse.message || 'Failed to verify token',
            })
            localStorage.removeItem('oauth_flow')
            setTimeout(() => {
              navigate('/')
            }, 2000)
            return
          }
        } catch (verifyError) {
          console.error('Token verification error:', verifyError)
          toast.error('Token verification error', {
            description: 'Failed to verify token with backend',
          })
          localStorage.removeItem('oauth_flow')
          setTimeout(() => {
            navigate('/')
          }, 2000)
          return
        }

        // Save token to app state / send to backend for authenticated requests
        // Save to localStorage (matching authService format)
        localStorage.setItem('access_token', session.access_token)
        localStorage.setItem('refresh_token', session.refresh_token)
        localStorage.setItem('token_expires_in', (session.expires_in || 3600).toString())
        localStorage.setItem('user', JSON.stringify({
          id: user.id,
          email: user.email || '',
          email_confirmed_at: user.email_confirmed_at || undefined,
          created_at: user.created_at,
          updated_at: user.updated_at,
          user_metadata: user.user_metadata || {}
        }))

        // Send user info to backend
        try {
          const provider =
            // Prefer app_metadata.provider provided by Supabase
            // @ts-ignore - app_metadata exists at runtime
            (user?.app_metadata && (user as any).app_metadata.provider) ||
            // Fallback to user_metadata.provider if present
            // @ts-ignore
            (user?.user_metadata && (user as any).user_metadata.provider) ||
            'google'

          await axios.post(
            `${API_CONFIG.baseURL}/auth/oauth/login`,
            {
              id: user.id,
              email: user.email || '',
              access_token: accessToken,
              provider,
              user_metadata: user.user_metadata || {}
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
        } catch (backendError) {
          console.error('Backend sync error:', backendError)
          // Continue even if backend sync fails - user is still authenticated via Supabase
        }

        // Clear OAuth flow flag
        localStorage.removeItem('oauth_flow')

        // Handle different flows
        if (flow === 'register') {
          // After register, log out user and show login modal
          // Clear auth data so user needs to log in again
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('token_expires_in')
          localStorage.removeItem('user')
          
          // Sign out from Supabase
          await supabase.auth.signOut()
          
          toast.success('Registration successful!', {
            description: 'Please sign in to continue',
          })
          // Set flag to show login modal
          localStorage.setItem('show_login_modal', 'true')
          navigate('/')
          setTimeout(() => {
            window.location.reload()
          }, 100)
        } else {
          // After login, go to dashboard (my-ai page)
          toast.success('Login successful!', {
            description: 'Welcome to Goodie AI',
          })
          navigate('/my-ai')
          setTimeout(() => {
            window.location.reload()
          }, 100)
        }
      } catch (err) {
        console.error(err)
        toast.error('Authentication error', {
          description: 'An error occurred during authentication',
        })
        localStorage.removeItem('oauth_flow')
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    }

    finishOAuth()
  }, [navigate, searchParams])

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div className="relative w-full max-w-md mx-4 bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-2xl p-8">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#009688] border-t-transparent rounded-full animate-spin"></div>
        <h2 className="text-2xl font-bold text-white">Signing in…</h2>
        <p className="text-gray-400 text-sm">Please wait while we complete your authentication</p>
      </div>
    </div>
  </div>
}


import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useGlobalContext } from '../../contexts/GlobalContext'
import { useAuth } from '../../hooks/useAuth'
import { Loader2 } from 'lucide-react'

interface PrivateRouteProps {
    children: React.ReactNode
    redirectTo?: string
}

const PrivateRoute = ({ children, redirectTo = '/' }: PrivateRouteProps) => {
    const { isAuthenticated, setShowLoginModal } = useGlobalContext()
    const { loading } = useAuth()

    // Show login modal when not authenticated (using useEffect to avoid render-time state updates)
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            setShowLoginModal(true)
        }
    }, [loading, isAuthenticated, setShowLoginModal])

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f]">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="w-8 h-8 text-[#009688] animate-spin" />
                    <p className="text-gray-400 text-sm">Loading...</p>
                </div>
            </div>
        )
    }

    // Redirect to login/landing page if not authenticated
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />
    }

    // Render protected content if authenticated
    return <>{children}</>
}

export default PrivateRoute


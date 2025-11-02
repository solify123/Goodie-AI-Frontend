import { ChevronDown, User, CreditCard, Settings, LogOut, Menu, Diamond } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { RegisterModal } from '../../pages/auth/register'
import { LoginModal } from '../../pages/auth/login'
import { ConfirmEmailModal } from '../../pages/auth/confirm'
import { useAuth } from '../../hooks/useAuth'
import { useSidebar } from '../../contexts/SidebarContext'
import { toast } from 'sonner'

const Header = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState('')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { user, isAuthenticated, logout } = useAuth()
  const { toggleSidebar } = useSidebar()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false)
    setShowConfirmModal(false)
    setShowLoginModal(true)
  }

  const handleSwitchToRegister = () => {
    setShowLoginModal(false)
    setShowConfirmModal(false)
    setShowRegisterModal(true)
  }

  const handleRegistrationSuccess = (email: string) => {
    setRegisteredEmail(email)
    setShowRegisterModal(false)
    setShowConfirmModal(true)
  }

  const handleBackToRegister = () => {
    setShowConfirmModal(false)
    setShowRegisterModal(true)
  }

  const handleCloseAll = () => {
    setShowRegisterModal(false)
    setShowLoginModal(false)
    setShowConfirmModal(false)
  }

  const handleLogout = async () => {
    try {
      await logout()
      setShowProfileMenu(false)
      toast.success('Logged out', {
        description: 'You have been successfully logged out.',
      })
    } catch (error) {
      toast.error('Logout failed', {
        description: 'An error occurred while logging out.',
      })
    }
  }

  const getAvatarInitial = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return 'U'
  }

  return (
    <>
      <header className="bg-[#0f0f0f] border-b border-gray-800 fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3">
          {/* Left Section: Hamburger Menu + Logo */}
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
            {/* Sidebar Toggle Button */}
            <button 
              onClick={toggleSidebar}
              className="cursor-pointer text-white hover:text-pink-500 transition-colors flex-shrink-0"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            {/* Logo */}
            <div className="flex items-center space-x-1 min-w-0">
              <span className="text-white text-lg sm:text-xl font-semibold truncate">Goodie</span>
              <span className="text-white text-lg sm:text-xl font-bold">.ai</span>
            </div>
          </div>
          
          {/* Right Section: Premium Badge + Profile */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 flex-shrink-0">
            {isAuthenticated && user ? (
              <>
                {/* Premium Badge */}
                <button className="cursor-pointer hidden lg:flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 text-sm">
                  <Diamond className="w-4 h-4" />
                  <span>Premium 70% OFF</span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="cursor-pointer flex items-center space-x-2 text-white hover:text-pink-500 transition-colors"
                  >
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center font-semibold shadow-lg">
                      {getAvatarInitial()}
                    </div>
                    <span className="hidden md:block font-medium">My Profile</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-2xl py-2 z-50">
                      <button
                        onClick={() => {
                          setShowProfileMenu(false)
                          // Navigate to profile
                        }}
                        className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-[#2a2a2a] transition-colors"
                      >
                        <User className="w-5 h-5 text-pink-500" />
                        <span>My Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false)
                          // Navigate to subscription
                        }}
                        className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-[#2a2a2a] transition-colors"
                      >
                        <CreditCard className="w-5 h-5 text-pink-500" />
                        <span>Subscription</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false)
                          // Navigate to settings
                        }}
                        className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-[#2a2a2a] transition-colors"
                      >
                        <Settings className="w-5 h-5 text-pink-500" />
                        <span>Settings</span>
                      </button>

                      <div className="border-t border-gray-800 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-[#2a2a2a] transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Auth Buttons - Show when not authenticated */}
                <button 
                  onClick={() => setShowRegisterModal(true)}
                  className="cursor-pointer bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-[0.3rem] font-semibold shadow-lg shadow-pink-500/20 transition-all duration-200
                  px-2.5 py-1.5 text-[10px] leading-tight sm:px-3 sm:py-1.5 sm:text-xs md:px-4 md:py-2 md:text-sm lg:px-6
                  hover:from-pink-600 hover:to-pink-700 whitespace-nowrap"
                >
                  <span className="hidden sm:inline">Create Free Account</span>
                  <span className="sm:hidden">Sign Up</span>
                </button>
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="cursor-pointer rounded-[0.3rem] font-semibold transition-all duration-200
                  bg-[#1f1f1f] text-white border border-gray-700 hover:border-gray-600 hover:bg-[#272727]
                  px-2.5 py-1.5 text-[10px] leading-tight sm:px-3 sm:py-1.5 sm:text-xs md:px-4 md:py-2 md:text-sm lg:px-6
                  whitespace-nowrap"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Register Modal */}
      <RegisterModal 
        isOpen={showRegisterModal} 
        onClose={handleCloseAll}
        onSwitchToLogin={handleSwitchToLogin}
        onRegistrationSuccess={handleRegistrationSuccess}
      />

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={handleCloseAll}
        onSwitchToRegister={handleSwitchToRegister}
      />

      {/* Confirm Email Modal */}
      <ConfirmEmailModal 
        isOpen={showConfirmModal} 
        onClose={handleCloseAll}
        onBack={handleBackToRegister}
        onSwitchToLogin={handleSwitchToLogin}
        email={registeredEmail}
      />
    </>
  )
}

export default Header

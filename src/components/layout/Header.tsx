import { ChevronDown, User, CreditCard, LogOut, Menu, Diamond, Venus, Mars, Shell } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { RegisterModal } from '../../pages/auth/register'
import { LoginModal } from '../../pages/auth/login'
import { ConfirmEmailModal } from '../../pages/auth/confirm'
import { useAuth } from '../../hooks/useAuth'
import { useSidebar } from '../../contexts/SidebarContext'
import { toast } from 'sonner'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLandingTab } from '../../contexts/LandingTabContext'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState('')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { user, isAuthenticated, logout } = useAuth()
  const { toggleSidebar } = useSidebar()
  const { activeTab, setActiveTab } = useLandingTab()

  const isLandingPage = location.pathname === '/'

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
      <header className="fixed top-0 left-0 right-0 z-30 bg-[#0f0f0f]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0f0f0f]/70 border-b border-gray-800 shadow-[0_1px_0_0_rgba(255,255,255,0.03)]">
        {/* Main Header Bar */}
        <div className="flex items-center justify-between">
          {/* Left Section: Hamburger Menu + Logo + Tabs */}
          <div className="flex items-center space-x-4 sm:space-x-6 min-w-0">
            <div className='flex items-center space-x-4 justify-center w-58 m-0 px-3 sm:px-3 py-3.5'>
              {/* Sidebar Toggle Button */}
              <button
                onClick={toggleSidebar}
                className="cursor-pointer text-white hover:text-[#009688] transition-colors flex-shrink-0"
              >
                <Menu className="w-8 h-7" />
              </button>

              {/* Logo */}
              <div className="flex items-center space-x-1 min-w-0 select-none">
                <span className="text-white text-xl font-semibold truncate tracking-tight">Goodie</span>
                <span className="text-[#009688] text-xl font-bold tracking-tight">.ai</span>
              </div>
            </div>

            {/* soft divider */}
            {isLandingPage && (
              <div className="hidden md:block h-10 w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent" />
            )}

            {/* Category Tabs - Only show on landing page */}
            {isLandingPage && (
              <div className="hidden md:flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-3 ml-4 py-2">
                <button
                  onClick={() => setActiveTab('girls')}
                  aria-current={activeTab === 'girls'}
                  className={`flex items-center rounded-full px-3.5 py-1 cursor-pointer space-x-1.5 sm:space-x-2 font-medium transition-all text-xs font-semibold sm:text-[14px] ${activeTab === 'girls'
                    ? 'text-[#009688] bg-[#009688]/10 ring-1 ring-[#009688]/40'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <Venus />
                  <span>Girls</span>
                </button>
                <button
                  onClick={() => setActiveTab('anime')}
                  aria-current={activeTab === 'anime'}
                  className={`flex items-center rounded-full px-3.5 py-1 cursor-pointer space-x-1.5 sm:space-x-2 font-medium transition-all text-xs font-semibold sm:text-[14px] ${activeTab === 'anime'
                    ? 'text-[#009688] bg-[#009688]/10 ring-1 ring-[#009688]/40'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <Shell />
                  <span>Anime</span>
                </button>
                <button
                  onClick={() => setActiveTab('guys')}
                  aria-current={activeTab === 'guys'}
                  className={`flex items-center rounded-full px-3.5 py-1 cursor-pointer space-x-1.5 sm:space-x-2 font-medium transition-all text-xs font-semibold sm:text-[14px] ${activeTab === 'guys'
                    ? 'text-[#009688] bg-[#009688]/10 ring-1 ring-[#009688]/40'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <Mars />
                  <span>Guys</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Section: Premium Badge + Profile */}
          <div className="flex items-center space-x-1.5 flex-shrink-0 px-3 py-3.5">
            {isAuthenticated && user ? (
              <>
                {/* Premium Badge */}
                <button className="cursor-pointer hidden lg:flex items-center space-x-2 bg-gradient-to-r from-[#009688] to-[#00bfa5] text-white px-4 py-2 rounded-md font-medium hover:from-[#00897b] hover:to-[#00a78f] transition-all duration-200 shadow-[0_6px_20px_-10px_rgba(0,150,136,0.55)]">
                  <Diamond className="w-4 h-4" />
                  <span>Premium 70% OFF</span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="cursor-pointer flex items-center space-x-2 text-white hover:text-[#009688] transition-colors"
                  >
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br to-[#00bfa5] to-[#00897b] flex items-center justify-center font-semibold shadow-md">
                      {getAvatarInitial()}
                    </div>
                    <span className="hidden md:block font-medium">My Profile</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-[#121212]/90 backdrop-blur border border-white/10 rounded-lg shadow-2xl py-2 z-50">
                      <button
                        onClick={() => {
                          setShowProfileMenu(false)
                          navigate('/profile')
                        }}
                        className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                      >
                        <User className="w-5 h-5 text-[#009688]" />
                        <span>Settings</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false)
                          // Navigate to subscription
                        }}
                        className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                      >
                        <CreditCard className="w-5 h-5 text-[#009688]" />
                        <span>Subscription</span>
                      </button>

                      <div className="border-t border-white/10 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-white/10 transition-colors"
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
                  className="cursor-pointer rounded-md font-semibold transition-all duration-200
                  bg-[#009688]/20 text-white border border-[#009688]/40 backdrop-blur
                  px-2.5 py-1.5 leading-tight px-5 text-sm shadow-[0_6px_20px_-10px_rgba(0,150,136,0.45)]
                  hover:bg-[#009688]/30 hover:border-[#009688]/60 hover:shadow-[0_10px_30px_-12px_rgba(0,150,136,0.6)] whitespace-nowrap"
                >
                  <span className="hidden lg:inline">Create Free Account</span>
                  <span className="lg:hidden">Sign Up</span>
                </button>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="cursor-pointer rounded-md font-semibold transition-all duration-200
                  bg-white/5 text-white border border-white/10 hover:bg-white/10
                  px-2.5 py-1.5 leading-tight px-5 text-sm backdrop-blur
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

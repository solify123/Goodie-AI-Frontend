import { Menu, Venus, Sparkles, Mars } from 'lucide-react'
import { useState } from 'react'
import { RegisterModal } from '../../pages/auth/register'
import { LoginModal } from '../../pages/auth/login'
import { ConfirmEmailModal } from '../../pages/auth/confirm'

const Header = () => {
  const [activeTab, setActiveTab] = useState('girls')
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState('')

  const tabs = [
    { id: 'girls', name: 'Girls', icon: Venus },
    { id: 'anime', name: 'Anime', icon: Sparkles },
    { id: 'guys', name: 'Guys', icon: Mars }
  ]

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

  return (
    <>
      <header className="bg-[#0f0f0f] border-b border-gray-800 fixed top-0 left-64 right-0 z-30">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3">
          {/* Left Section: Menu + Tabs */}
          <div className="flex items-center space-x-6">
            {/* Mobile Menu */}
            <button className="cursor-pointer lg:hidden text-white hover:text-pink-500 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Category Tabs */}
            <nav className="hidden md:flex items-center space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'text-pink-500 bg-pink-500/10'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>
          
          {/* Right Section: Action Buttons */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowRegisterModal(true)}
              className="cursor-pointer bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 lg:px-6 py-2 rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-200 text-sm shadow-lg shadow-pink-500/20"
            >
              Create Free Account
            </button>
            <button 
              onClick={() => setShowLoginModal(true)}
              className="cursor-pointer border border-pink-500/50 text-white px-4 lg:px-6 py-2 rounded-lg font-medium hover:bg-pink-500/10 hover:border-pink-500 transition-all duration-200 text-sm"
            >
              Login
            </button>
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

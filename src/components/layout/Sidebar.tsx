import { Compass, MessageCircle, FolderHeart, Image, UserPlus, Sparkles, Globe, MessageSquare, HelpCircle, Mail, Award, Diamond } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSidebar } from '../../contexts/SidebarContext'
import LanguageSelectionPopup from './LanguageSelectionPopup'


const Sidebar = () => {
  const [showLanguagePopup, setShowLanguagePopup] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { isCollapsed } = useSidebar()

  const mainFeatures = [
    { name: 'Explore', icon: Compass, path: '/' },
    { name: 'Chat', icon: MessageCircle, path: '/chat' },
    { name: 'Collection', icon: FolderHeart, path: '/collection' },
    { name: 'Generate Image', icon: Image, path: '/generate' },
    { name: 'Create Character', icon: UserPlus, path: '/create' },
    { name: 'My AI', icon: Sparkles, path: '/my-ai' }
  ]


  const supportLinks = [
    { name: 'English', icon: Globe, isLanguageButton: true },
    { name: 'Discord', icon: MessageSquare },
    { name: 'Help Center', icon: HelpCircle },
    { name: 'Contact Us', icon: Mail },
    { name: 'Affiliate', icon: Award }
  ]


  const handleLanguageSelect = (language: any) => {
    console.log('Language selected:', language.name)
    setShowLanguagePopup(false)
  }

  return (
    <aside className={`fixed left-0 bg-[#1a1a1a] border-r border-gray-800 flex flex-col z-40 transition-all duration-500 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`} style={{ marginTop: '60px', height: 'calc(100vh - 60px)' }}>

      {/* Main Features */}
      <div className={`space-y-1 mt-2 ${isCollapsed ? 'p-2' : 'p-4'}`}>
        {mainFeatures.map((feature, index) => {
          const Icon = feature.icon
          const isActive = location.pathname === feature.path
          return (
            <button
              key={index}
              onClick={() => navigate(feature.path)}
              className={`w-full flex cursor-pointer items-center text-white rounded-lg transition-all duration-200 ${isActive
                ? 'bg-[#2a2a2a]'
                : 'hover:bg-[#2a2a2a]'
                } ${isCollapsed ? 'justify-center px-2 py-2.5' : 'space-x-3 px-3 py-2.5'}`}
              title={isCollapsed ? feature.name : undefined}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-white/10' : 'bg-transparent'
                }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-sm font-medium whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>{feature.name}</span>
            </button>
          )
        })}

        {/* Premium Button */}
        <button
          className={`w-full cursor-pointer flex items-center bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2.5 rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-200 mt-4 shadow-lg shadow-pink-500/30 ${isCollapsed ? 'justify-center px-2' : 'justify-center space-x-2 px-4'}`}
          title={isCollapsed ? 'Become Premium' : undefined}
        >
          <Diamond className="w-4 h-4" />
          <span className={`text-sm whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>Become Premium</span>
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mx-4 my-2"></div>

      {/* Support Links */}
      <div className={`space-y-1 flex-1 ${isCollapsed ? 'p-2' : 'p-4'}`}>
        {supportLinks.map((link, index) => {
          const Icon = link.icon
          return (
            <button
              key={index}
              onClick={() => link.isLanguageButton && setShowLanguagePopup(true)}
              className={`w-full cursor-pointer flex items-center text-gray-400 rounded-lg hover:bg-[#2a2a2a] hover:text-white transition-all duration-200 ${isCollapsed ? 'justify-center px-2 py-2.5' : 'space-x-3 px-3 py-2.5'}`}
              title={isCollapsed ? link.name : undefined}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-sm font-medium whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>{link.name}</span>
            </button>
          )
        })}
      </div>

      {/* Footer Links */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-800">
          <div className="space-y-2 text-xs text-gray-500">
            <a href="#" className="block hover:text-gray-300 transition-colors">
              Privacy Notice
            </a>
            <span className="text-gray-700">•</span>
            <a href="#" className="inline hover:text-gray-300 transition-colors ml-1">
              Terms of Service
            </a>
          </div>
        </div>
      )}

      {/* Language Selection Popup */}
      <LanguageSelectionPopup
        isOpen={showLanguagePopup}
        onClose={() => setShowLanguagePopup(false)}
        onLanguageSelect={handleLanguageSelect}
      />
    </aside>
  )

}

export default Sidebar

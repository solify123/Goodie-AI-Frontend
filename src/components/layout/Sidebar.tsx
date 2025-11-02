import { Compass, MessageCircle, FolderHeart, Image, UserPlus, Sparkles, Globe, MessageSquare, HelpCircle, Mail, Award, Diamond } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSidebar } from '../../contexts/SidebarContext'


const Sidebar = ({ setShowLanguagePopup, setShowContactModal }: { setShowLanguagePopup: (show: boolean) => void, setShowContactModal: (show: boolean) => void }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isCollapsed, setIsCollapsed } = useSidebar()

  const mainFeatures = [
    { name: 'Explore', icon: Compass, path: '/' },
    { name: 'Chat', icon: MessageCircle, path: '/chat' },
    { name: 'Collection', icon: FolderHeart, path: '/collection' },
    { name: 'Generate Image', icon: Image, path: '/generate' },
    { name: 'Create Character', icon: UserPlus, path: '/create-character' },
    { name: 'My AI', icon: Sparkles, path: '/my-ai' }
  ]

  const supportLinks = [
    { name: 'English', icon: Globe, isLanguageButton: true },
    { name: 'Discord', icon: MessageSquare },
    { name: 'Help Center', icon: HelpCircle },
    { name: 'Contact Us', icon: Mail, isContactButton: true },
    { name: 'Affiliate', icon: Award }
  ]

  return (
    <aside
      className={
        `fixed flex flex-col justify-between align-start overflow-y-auto left-0 bg-[#0f0f0f] border-r border-gray-800 flex flex-col z-40 transform ${isCollapsed ? '-translate-x-full md:translate-x-0 md:w-16' : 'translate-x-0 md:w-58'} w-66 mt-[65px]`
      }
      style={{ height: 'calc(100vh - 65px)' }}
    >

      {/* Main Features */}
      <div className={`space-y-2 mt-2 ${isCollapsed ? 'md:p-2 p-4x' : 'py-4 px-6'}`}>
        {mainFeatures.map((feature, index) => {
          const Icon = feature.icon
          const isActive = location.pathname === feature.path
          return (
            <button
              key={index}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsCollapsed(true)
                }
                navigate(feature.path)
              }}
              className={`w-full flex cursor-pointer items-center text-white rounded-lg transition-all border border-gray-800 duration-200 ${isActive
                ? 'bg-[#2a2a2a]'
                : 'hover:bg-[#2a2a2a]'
                } ${isCollapsed ? 'md:justify-center md:px-1 px-1 py-1' : 'space-x-1 px-1 py-1'}`}
              title={isCollapsed ? feature.name : undefined}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-white/10' : 'bg-transparent'
                }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-xs font-medium whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'md:opacity-0 md:hidden' : 'opacity-100'}`}>{feature.name}</span>
            </button>
          )
        })}

        {/* Premium Button */}
        <button
          className={`w-full cursor-pointer flex items-center bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2.5 rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-200 mt-4 shadow-lg shadow-pink-500/30 ${isCollapsed ? 'md:justify-center md:px-2 justify-center space-x-2 px-4' : 'justify-center space-x-2 px-4'}`}
          title={isCollapsed ? 'Become Premium' : undefined}
        >
          <Diamond className="w-4 h-4 m-0" />
          <span className={`text-sm whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'md:opacity-0 md:hidden' : 'opacity-100'}`}>Become Premium</span>
        </button>
      </div>

      {/* Support Links */}
      <div className={`space-y-1 border-t border-gray-800 flex flex-col ${isCollapsed ? 'md:p-2 p-4' : 'pt-6 px-6 pb-4'}`}>
        {supportLinks.map((link, index) => {
          const Icon = link.icon
          return (
            <button
              key={index}
              onClick={() => {
                if (link.isLanguageButton) {
                  setShowLanguagePopup(true)
                } else if (link.isContactButton) {
                  setShowContactModal(true)
                }
              }}
              className={`w-full cursor-pointer flex border border-gray-800 items-center text-gray-400 rounded-lg hover:bg-[#2a2a2a] hover:text-white transition-all duration-200 ${isCollapsed ? 'md:justify-center md:px-1 px-1 py-1' : 'space-x-1 px-1 py-1'}`}
              title={isCollapsed ? link.name : undefined}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-xs font-medium whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'md:opacity-0 md:hidden' : 'opacity-100'}`}>{link.name}</span>
            </button>
          )
        })}
        {
          isCollapsed ? null : (
            <div className="space-y-2 text-[10px] text-gray-500 flex justify-center align-center pt-3">
              <a href="#" className="block hover:text-gray-300 transition-colors">
                Privacy Notice
              </a>
              <span className="text-gray-700 text-[10px]">•</span>
              <a href="#" className="inline hover:text-gray-300 transition-colors ml-1">
                Terms of Service
              </a>
            </div>
          )
        }
      </div>

    </aside>
  )

}

export default Sidebar

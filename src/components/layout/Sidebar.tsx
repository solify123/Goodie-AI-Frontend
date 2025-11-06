import { Compass, MessageCircle, FolderHeart, Image, UserPlus, Sparkles, Globe, MessageSquare, HelpCircle, Mail, Award, Gem } from 'lucide-react'
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
        `fixed flex flex-col pb-16 md:pb-0 justify-between align-start overflow-y-auto left-0 bg-[#0f0f0f]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0f0f0f]/90 border-r border-gray-800 z-40 transform ${isCollapsed ? '-translate-x-full md:translate-x-0 md:w-16' : 'translate-x-0 md:w-58'} w-66 mt-[62px] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]`
      }
      style={{ 
        height: 'calc(100vh - 65px)',
        overflowY: 'auto'
      }}
    >

      {/* Main Features */}
      <div className={`space-y-2 mt-2 ${isCollapsed ? 'md:p-2 p-4x' : 'py-4 px-5'}`}>
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
              className={`w-full flex cursor-pointer items-center text-white rounded-lg transition-all duration-200 relative backdrop-blur ${isActive
                ? 'bg-white/10'
                : 'hover:bg-white/10'
                } ${isCollapsed ? 'md:justify-center md:px-2 px-2 py-1' : 'space-x-1 px-2 py-1'}`}
              title={isCollapsed ? feature.name : undefined}
            >
              {isActive && (<span className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-[#009688]" />)}
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
          className={`flex items-center cursor-pointer rounded-md font-semibold transition-all duration-200
                  bg-[#009688]/20 text-white border border-[#009688]/40 backdrop-blur
                  px-2.5 py-1.5 leading-tight px-5 text-sm shadow-[0_6px_20px_-10px_rgba(0,150,136,0.45)]
                  hover:bg-[#009688]/30 hover:border-[#009688]/60 hover:shadow-[0_10px_30px_-12px_rgba(0,150,136,0.6)] whitespace-nowrap ${isCollapsed ? 'md:justify-center md:px-2 justify-center space-x-2 px-4' : 'justify-center space-x-2 px-4'}`}
          title={isCollapsed ? 'Become Premium' : undefined}
        >
          <Gem className="w-4 h-4 m-0" />
          <span className={`text-sm ml-2 whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'md:opacity-0 md:hidden' : 'opacity-100'}`}>Become Premium</span>
        </button>
      </div>

      {/* Support Links */}
      <div className={`space-y-1 border-t border-white/10 flex flex-col ${isCollapsed ? 'md:p-2 p-4' : 'pt-6 px-5 pb-4'}`}>
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
              className={`w-full cursor-pointer flex items-center text-gray-300 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200 backdrop-blur ${isCollapsed ? 'md:justify-center md:px-1 px-1 py-1' : 'space-x-1 px-1 py-1'}`}
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

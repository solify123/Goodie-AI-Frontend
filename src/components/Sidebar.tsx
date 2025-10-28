import { Compass, MessageCircle, FolderHeart, Image, UserPlus, Sparkles, Globe, MessageSquare, HelpCircle, Mail, Award, Diamond } from 'lucide-react'

const Sidebar = () => {
  const mainFeatures = [
    { name: 'Explore', icon: Compass, active: true },
    { name: 'Chat', icon: MessageCircle },
    { name: 'Collection', icon: FolderHeart },
    { name: 'Generate Image', icon: Image },
    { name: 'Create Character', icon: UserPlus },
    { name: 'My AI', icon: Sparkles }
  ]

  const supportLinks = [
    { name: 'English', icon: Globe },
    { name: 'Discord', icon: MessageSquare },
    { name: 'Help Center', icon: HelpCircle },
    { name: 'Contact Us', icon: Mail },
    { name: 'Affiliate', icon: Award }
  ]

  return (
    <aside className="w-64 bg-[#1a1a1a] border-r border-gray-800 flex flex-col h-screen">
      {/* Main Features */}
      <div className="p-4 space-y-1 mt-2">
        {mainFeatures.map((feature, index) => {
          const Icon = feature.icon
          return (
            <button
              key={index}
              className={`w-full flex items-center space-x-3 text-white px-3 py-2.5 rounded-lg transition-all duration-200 ${
                feature.active 
                  ? 'bg-[#2a2a2a]' 
                  : 'hover:bg-[#2a2a2a]'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                feature.active ? 'bg-white/10' : 'bg-transparent'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{feature.name}</span>
            </button>
          )
        })}
        
        {/* Premium Button */}
        <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2.5 rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-200 mt-4 shadow-lg shadow-pink-500/30">
          <Diamond className="w-4 h-4" />
          <span className="text-sm">Become Premium</span>
        </button>
      </div>
      
      {/* Divider */}
      <div className="border-t border-gray-800 mx-4 my-2"></div>
      
      {/* Support Links */}
      <div className="p-4 space-y-1 flex-1">
        {supportLinks.map((link, index) => {
          const Icon = link.icon
          return (
            <button
              key={index}
              className="w-full flex items-center space-x-3 text-gray-400 px-3 py-2.5 rounded-lg hover:bg-[#2a2a2a] hover:text-white transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{link.name}</span>
            </button>
          )
        })}
      </div>
      
      {/* Footer Links */}
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
    </aside>
  )
}

export default Sidebar

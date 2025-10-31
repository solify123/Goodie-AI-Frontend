import Header from '../../components/layout/Header'
import Sidebar from '../../components/layout/Sidebar'
import { useSidebar } from '../../contexts/SidebarContext'
import { useState, useEffect } from 'react'
import ChatList from './components/ChatList'
import Conversation from './components/Conversation'
import ProfilePanel from './components/ProfilePanel'
import { Home, Compass, Sparkles, MessageCircle, Diamond } from 'lucide-react'

const ChatPage = () => {
  const { isCollapsed } = useSidebar()
  const [showChatList, setShowChatList] = useState(true)
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // On mobile, hide chat list when conversation is selected
  const handleChatSelect = (chatId: number) => {
    setSelectedChat(chatId)
    if (isMobile) {
      setShowChatList(false)
    }
  }
  
  // Back to chat list on mobile
  const handleBackToChatList = () => {
    setShowChatList(true)
    setSelectedChat(null)
  }
  
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Fixed Header */}
      <Header />
      
      {/* Fixed Sidebar - Hidden on mobile */}
      <Sidebar />
      
      {/* Main Content */}
      <div className={`flex min-h-screen transition-all duration-500 ease-in-out ml-0 ${isCollapsed ? 'md:ml-16' : 'md:ml-64'}`} style={{ paddingTop: '60px', paddingBottom: '70px' }}>
        {/* Chat List - Full width on mobile, side panel on tablet/desktop */}
        {/* On mobile: show when showChatList is true, on tablet+: always show */}
        <div className={`${
          (isMobile && showChatList && !selectedChat) || !isMobile ? 'flex' : 'hidden'
        } w-full md:w-80 bg-[#1a1a1a] border-r border-gray-800 flex-col`}>
          <ChatList onChatSelect={handleChatSelect} onClose={() => setShowChatList(false)} />
        </div>
        
        {/* Conversation Area */}
        {/* On mobile: show when chat is selected, on tablet+: always show */}
        <div className={`${
          (isMobile && selectedChat) || !isMobile ? 'flex' : 'hidden'
        } flex-1 flex-col`}>
          <div className="flex-1 flex">
            <div className="flex-1">
              <Conversation 
                onBack={handleBackToChatList}
                selectedChatId={selectedChat}
              />
            </div>
            
            {/* Profile Panel - Hidden on mobile/tablet */}
            <div className="hidden xl:block w-80 bg-[#1a1a1a] border-l border-gray-800">
              <ProfilePanel />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 md:hidden z-40" style={{ height: '70px', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex items-center justify-around h-full px-1">
          <button className="flex flex-col items-center justify-center space-y-1 px-2 py-1 text-gray-400 flex-1">
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center space-y-1 px-2 py-1 text-gray-400 flex-1">
            <Compass className="w-5 h-5" />
            <span className="text-xs">Discover</span>
          </button>
          <button className="flex flex-col items-center justify-center space-y-1 px-2 py-1 text-gray-400 flex-1">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs">Create</span>
          </button>
          <button className="flex flex-col items-center justify-center space-y-1 px-2 py-1 text-pink-500 bg-pink-500/10 rounded-lg flex-1">
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs">Chat</span>
          </button>
          <button className="flex flex-col items-center justify-center space-y-1 px-2 py-1 text-amber-500 bg-amber-500/10 rounded-lg flex-1">
            <Diamond className="w-5 h-5" />
            <span className="text-xs">Premium</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatPage

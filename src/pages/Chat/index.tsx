import { useState, useEffect } from 'react'
import ChatList from './components/ChatList'
import Conversation from './components/Conversation'
import ProfilePanel from './components/ProfilePanel'
import Layout from '../../components/layout'
import BottomNavigation from './components/BottomNavigation'
const ChatPage = () => {
  const [showChatList, setShowChatList] = useState(true)
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showProfilePanel, setShowProfilePanel] = useState(true)
  const [showResetModal, setShowResetModal] = useState(false)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
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
    <Layout>
      <div className="chat-page w-full flex">
        <div className={`${(isMobile && showChatList && !selectedChat) || !isMobile ? 'flex' : 'hidden'
          } w-full xl:w-80 lg:w-72 bg-[#1a1a1a] border-r border-gray-800 flex-col p-3`}>
          <ChatList onChatSelect={handleChatSelect} onClose={() => setShowChatList(false)} onShowResetModal={() => setShowResetModal(true)} />
        </div>
        {/* Conversation Area */}
        <div className={`${(isMobile && selectedChat) || !isMobile ? 'flex' : 'hidden'
          } flex-1 flex-col`}>
          <div className="flex-1 flex">
            <div className="flex-1">
              <Conversation
                onBack={handleBackToChatList}
                selectedChatId={selectedChat}
                onToggleProfilePanel={() => setShowProfilePanel(!showProfilePanel)}
                showResetModal={showResetModal}
                onCloseResetModal={() => setShowResetModal(false)}
                onShowResetModal={() => setShowResetModal(true)}
              />
            </div>
            {/* Profile Panel - Hidden on mobile/tablet */}
            {showProfilePanel && (
              <div className="hidden xl:block w-[30%] bg-[#1a1a1a] border-l border-gray-800">
                <ProfilePanel />
              </div>
            )}
          </div>
        </div>
        <BottomNavigation />
      </div>
    </Layout>
  )
}
export default ChatPage
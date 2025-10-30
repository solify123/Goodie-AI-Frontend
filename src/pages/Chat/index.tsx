import Header from '../../components/layout/Header'
import Sidebar from '../../components/layout/Sidebar'
import { useSidebar } from '../../contexts/SidebarContext'
import ChatList from './components/ChatList'
import Conversation from './components/Conversation'
import ProfilePanel from './components/ProfilePanel'

const ChatPage = () => {
  const { isCollapsed } = useSidebar()
  
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Fixed Header */}
      <Header />
      
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className={`flex min-h-screen transition-all duration-500 ease-in-out ${isCollapsed ? 'ml-16' : 'ml-64'}`} style={{ paddingTop: '60px' }}>
        {/* Chat List */}
        <div className="w-80 bg-[#1a1a1a] border-r border-gray-800 flex flex-col">
          <ChatList />
        </div>
        
        {/* Conversation Area */}
        <div className="flex-1 flex">
          <div className="flex-1">
            <Conversation />
          </div>
          
          {/* Profile Panel */}
          <div className="w-80 bg-[#1a1a1a] border-l border-gray-800">
            <ProfilePanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage

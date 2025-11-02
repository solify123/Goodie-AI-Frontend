import { Search, X, RotateCcw, Trash2 } from 'lucide-react'
import { useState } from 'react'
interface ChatListProps {
  onChatSelect?: (chatId: number) => void
  onClose?: () => void
  onShowResetModal?: () => void
}
const ChatList = ({ onChatSelect, onClose, onShowResetModal }: ChatListProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const chats = [
    {
      id: 1,
      name: 'Arthur Murphy',
      lastMessage: "My name's Arthur Murphy, but most people call me Art. What should I call you, cu...",
      timestamp: '11:58PM',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      isActive: true
    }
  ]
  return (
    <div className="flex flex-col h-full" style={{ height: 'calc(100vh - 60px - 70px)' }}>
      {/* Header */}
      <div className="p-4 sm:p-4 border-b border-gray-800 flex items-center justify-between">
        <h2 className="text-white text-2xl sm:text-lg font-bold sm:font-semibold">Chat</h2>
        {/* Close button - visible on mobile when chat list is open */}
        <button
          onClick={onClose}
          className="md:hidden text-white hover:text-gray-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {/* Search Bar */}
      <div className="px-4 pb-4 pt-2 sm:p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search for a profile..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 sm:py-2 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-gray-600"
          />
        </div>
      </div>
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect?.(chat.id)}
            className={`py-1 px-2 sm:py-2 sm:px-3 rounded-lg border-b border-gray-800 cursor-pointer hover:bg-[#2a2a2a] transition-colors ${chat.isActive ? 'bg-[#2a2a2a] rounded-lg' : ''
              }`}
          >
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className="w-14 h-14 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold sm:font-medium text-base sm:text-sm truncate">
                    {chat.name}
                  </h3>
                  <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                    <span className="text-gray-400 text-xs sm:text-xs">
                      {chat.timestamp}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-gray-400 text-sm sm:text-sm truncate max-w-[150px]">
                    {chat.lastMessage}
                  </p>
                  {/* Action buttons - visible on mobile */}
                  <div className="items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onShowResetModal?.()
                      }}
                      className="text-gray-400 hover:text-gray-300 p-1 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-400 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ChatList
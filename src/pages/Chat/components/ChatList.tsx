import { Search, X, RotateCcw, Trash2 } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
interface ChatListProps {
  onChatSelect?: (chatId: number) => void
  onClose?: () => void
  onShowResetModal?: () => void
  onConversationDelete: () => void
  conversationDelete: boolean
}

const initialChats = [
  {
    id: 1,
    name: 'Arthur Murphy',
    lastMessage: "My name's Arthur Murphy, but most people call me Art. What should I call you, cu...",
    timestamp: '11:58PM',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    isActive: true
  },
]

const ChatList = ({ onChatSelect, onClose, onShowResetModal, onConversationDelete, conversationDelete }: ChatListProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [chats, setChats] = useState<any>(initialChats)
  const originalChatsRef = useRef<any[]>(initialChats)

  // Filter chats based on search query
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setChats(originalChatsRef.current)
    } else {
      const filtered = originalChatsRef.current.filter((chat: any) =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setChats(filtered)
    }
  }, [searchQuery])

  useEffect(() => {
    if (conversationDelete) {
      setChats([])
      originalChatsRef.current = []
    }
  }, [conversationDelete])

  const handleDelete = () => {
    setChats([])
    originalChatsRef.current = []
    onConversationDelete()
  }

  const handleClearSearch = () => {
    setSearchQuery('')
  }

  return (
    <div className="flex flex-col h-full md:h-auto" style={{ height: 'calc(100vh - 86px)' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl sm:text-1xl font-bold sm:font-semibold mb-3 mt-3">Chat</h2>
        {/* Close button - visible on mobile when chat list is open */}
        <button
          onClick={onClose}
          className="md:hidden text-white hover:text-gray-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {/* Search Bar */}
      <div className="pb-4 pt-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search for a profile..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg pl-10 pr-10 py-2.5 sm:py-2 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-gray-600"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      {/* Chat List */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto mb-18">
        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-8">
            <p className="text-gray-400 text-sm">
              {searchQuery ? 'No profiles found matching your search.' : 'No chats available.'}
            </p>
          </div>
        ) : (
          chats.map((chat: any) => (
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
                      <button onClick={handleDelete} className="text-gray-400 hover:text-red-400 p-1 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
export default ChatList
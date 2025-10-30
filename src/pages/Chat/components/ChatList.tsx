import { Search } from 'lucide-react'
import { useState } from 'react'

const ChatList = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const chats = [
    {
      id: 1,
      name: 'Arthur Murphy',
      lastMessage: "My name's Arthur Murphy,...",
      timestamp: '11:58PM',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      isActive: true
    }
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-white text-lg font-semibold">Chat</h2>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search for a profile..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-gray-600"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`p-4 border-b border-gray-800 cursor-pointer hover:bg-[#2a2a2a] transition-colors ${
              chat.isActive ? 'bg-[#2a2a2a]' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium text-sm truncate">
                    {chat.name}
                  </h3>
                  <span className="text-gray-400 text-xs">
                    {chat.timestamp}
                  </span>
                </div>
                <p className="text-gray-400 text-sm truncate mt-1">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatList

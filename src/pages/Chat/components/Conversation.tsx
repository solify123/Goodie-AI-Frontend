import { Phone, MoreVertical, Menu, ChevronDown, ArrowLeft, Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'

interface ConversationProps {
  onBack?: () => void
  selectedChatId?: number | null
}

const Conversation = ({ onBack, selectedChatId }: ConversationProps) => {
  const [message, setMessage] = useState('')
  console.log(selectedChatId)
  const messages = [
    {
      id: 1,
      type: 'ai',
      content: 'An image of a man from the chest down, wearing a white button-up shirt with rolled-up sleeves, white pants, and a black belt with a watch on his left wrist.',
      timestamp: '11:57PM',
      isImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face'
    },
    {
      id: 2,
      type: 'user',
      content: 'how old are you?',
      timestamp: '11:57PM'
    },
    {
      id: 3,
      type: 'ai',
      content: "*laughs softly* Oh, you're curious now huh? Well, let's just say I'm mature enough to know what I want...and young enough to enjoy every minute of it. 😉",
      timestamp: '11:58PM',
      hasAudio: true
    },
    {
      id: 4,
      type: 'user',
      content: 'what is your name?',
      timestamp: '11:58PM'
    },
    {
      id: 5,
      type: 'ai',
      content: "*chuckles* My name's Arthur Murphy, but most people call me Art. What should I call you, cutie?",
      timestamp: '11:58PM',
      hasAudio: true
    }
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Handle sending message
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  return (
    <div className="flex flex-col h-full" style={{ height: 'calc(100vh - 60px)' }}>
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-gray-800 flex items-center justify-between bg-[#1a1a1a]">
        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
          {/* Back button - visible on mobile */}
          {onBack && (
            <button
              onClick={onBack}
              className="md:hidden text-white hover:text-gray-400 transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
              alt="Arthur"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-white font-medium text-base sm:text-base truncate">Arthur</h3>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <button className="p-2 text-green-400 hover:bg-[#2a2a2a] rounded-lg transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:bg-[#2a2a2a] rounded-lg transition-colors hidden sm:block">
            <MoreVertical className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:bg-[#2a2a2a] rounded-lg transition-colors hidden md:block">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-[#0f0f0f]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start items-start'} ${
              msg.type === 'ai' ? 'space-x-2' : ''
            }`}
          >
            {/* Avatar for AI messages - visible on mobile/tablet */}
            {msg.type === 'ai' && !msg.isImage && (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0 mt-1">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                  alt="Arthur"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div
              className={`max-w-[85%] sm:max-w-xs md:max-w-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-purple-600 sm:bg-purple-500 text-white'
                  : 'bg-[#2a2a2a] text-white'
              }`}
            >
              {msg.isImage ? (
                <div className="space-y-2">
                  <img
                    src={msg.imageUrl}
                    alt="Character"
                    className="w-full h-auto max-h-64 sm:h-48 object-cover rounded-lg"
                  />
                </div>
              ) : (
                <p className="text-sm sm:text-sm leading-relaxed">{msg.content}</p>
              )}
              
              <div className={`flex items-center ${msg.hasAudio ? 'justify-between' : 'justify-end'} mt-1.5 sm:mt-2`}>
                <span className="text-xs text-gray-300 sm:text-gray-400 opacity-70">{msg.timestamp}</span>
                {msg.hasAudio && (
                  <div className="flex items-center space-x-1.5 ml-2">
                    {/* Voice message icon indicator */}
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-3 sm:p-4 border-t border-gray-800 bg-[#1a1a1a]">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2 sm:space-x-2">
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-[#2a2a2a] border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-gray-600"
          />
          <button
            type="button"
            className="px-2.5 sm:px-3 py-2 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white hover:bg-[#3a3a3a] transition-colors flex items-center space-x-1"
          >
            <ImageIcon className="w-4 h-4 sm:w-4 sm:h-4" />
          </button>
          <button
            type="button"
            className="px-2.5 sm:px-3 py-2 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white hover:bg-[#3a3a3a] transition-colors flex items-center space-x-1"
          >
            <span className="text-xs sm:text-sm">Ask</span>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Conversation

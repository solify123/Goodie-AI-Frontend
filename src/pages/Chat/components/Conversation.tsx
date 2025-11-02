import { Phone, MoreVertical, PanelRightClose, ChevronDown, ArrowLeft, Send, ChevronUp, RefreshCw, Trash2, X, Info } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
interface ConversationProps {
  onBack?: () => void
  selectedChatId?: number | null
  onToggleProfilePanel?: () => void
  showResetModal?: boolean
  onCloseResetModal?: () => void
  onShowResetModal?: () => void
}
const Conversation = ({ onBack, selectedChatId, onToggleProfilePanel, showResetModal: externalShowResetModal, onCloseResetModal, onShowResetModal }: ConversationProps) => {
  const [message, setMessage] = useState('')
  const [showAskDropdown, setShowAskDropdown] = useState(false)
  const [showMoreDropdown, setShowMoreDropdown] = useState(false)
  const [internalShowResetModal, setInternalShowResetModal] = useState(false)
  const askDropdownRef = useRef<HTMLDivElement>(null)
  const moreDropdownRef = useRef<HTMLDivElement>(null)
  
  // Use external modal state if provided, otherwise use internal
  const showResetModal = externalShowResetModal !== undefined ? externalShowResetModal : internalShowResetModal
  
  const handleCloseResetModal = () => {
    if (onCloseResetModal) {
      onCloseResetModal()
    } else {
      setInternalShowResetModal(false)
    }
  }
  
  const handleOpenResetModal = () => {
    if (onShowResetModal) {
      onShowResetModal()
    } else {
      setInternalShowResetModal(true)
    }
  }
  
  console.log(selectedChatId)
 
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (askDropdownRef.current && !askDropdownRef.current.contains(event.target as Node)) {
        setShowAskDropdown(false)
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setShowMoreDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
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
    <div className="flex flex-col h-full" style={{ height: 'calc(100vh - 60px - 70px)' }}>
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-gray-800 flex items-center justify-between bg-[#0f0f0f]">
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
          <button className="p-2 text-green-400 rounded-lg transition-colors cursor-pointer">
            <Phone className="w-7 h-7" />
          </button>
          
          {/* More Options Dropdown */}
          <div className="relative hidden sm:block" ref={moreDropdownRef}>
            <button
              onClick={() => setShowMoreDropdown(!showMoreDropdown)}
              className="p-2 text-gray-400 rounded-lg transition-colors cursor-pointer"
            >
              <MoreVertical className="w-7 h-7" />
            </button>
            {/* Dropdown Menu */}
            {showMoreDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-lg min-w-[160px] py-1 z-20">
                <button
                  type="button"
                  onClick={() => {
                    setShowMoreDropdown(false)
                    handleOpenResetModal()
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2a2a2a] transition-colors flex items-center space-x-3 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset chat</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMoreDropdown(false)
                    // Handle delete chat
                    console.log('Delete chat')
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2a2a2a] transition-colors flex items-center space-x-3 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete chat</span>
                </button>
              </div>
            )}
          </div>
          <button
            onClick={onToggleProfilePanel}
            className="p-2 text-gray-400 rounded-lg transition-colors hidden md:block cursor-pointer"
          >
            <PanelRightClose className="w-7 h-7" />
          </button>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start items-start'} ${msg.type === 'ai' ? 'space-x-2' : ''
              }`}
          >
            <div
              className={`max-w-[85%] sm:max-w-xs md:max-w-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg`}
            >
              {msg.isImage ? (
                <div className="space-y-2">
                  <img
                    src={msg.imageUrl}
                    alt="Character"
                    className="rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-[4px] max-h-[60vh]"
                  />
                </div>
              ) : (
                <p className={`text-sm sm:text-sm leading-relaxed bg-[#252525] p-3 ${msg.type === "ai" ? 'rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-[4px]' : 'rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-[4px] bg-gradient-blue'} `}>{msg.content}</p>
              )}
              <div className={`flex items-center justify-start gap-2 mt-1.5 sm:mt-2`}>
                {msg.hasAudio && (
                  <div className="flex items-center space-x-1.5 ml-2 cursor-pointer">
                    {/* Voice message icon indicator */}
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-500/20 flex items-center justify-center p-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
                <span className="text-xs text-gray-300 sm:text-gray-400 opacity-70">{msg.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Message Input */}
      <div className="p-3 sm:p-4 w-[80%] mx-auto">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2 sm:space-x-2 w-full">
          <div className='flex items-center space-x-2s bg-[#2a2a2a] rounded-full px-2 sm:px-3 py-1 sm:py-1 w-full'>
            {/* Input Field */}
            <input
              type="text"
              placeholder="Write a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 rounded-lg px-4 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gray-600"
            />
            {/* Ask Button with Dropdown */}
            <div className="relative flex-shrink-0" ref={askDropdownRef}>
              <button
                type="button"
                onClick={() => setShowAskDropdown(!showAskDropdown)}
                className="flex items-center space-x-1 px-3 py-2 bg-[#1a1a1a] border border-gray-700 rounded-full cursor-pointer text-white hover:bg-[#2a2a2a] transition-colors"
              >
                <Send className="w-4 h-4" />
                <span className="text-sm">Ask</span>
                {showAskDropdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {/* Dropdown Menu */}
              {showAskDropdown && (
                <div className="absolute bottom-full mb-2 left-0 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-lg min-w-[180px] py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAskDropdown(false)
                      setMessage('Show me...')
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                  >
                    Show me...
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAskDropdown(false)
                      setMessage('Send me...')
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                  >
                    Send me...
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAskDropdown(false)
                      setMessage('Can I see...')
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                  >
                    Can I see...
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAskDropdown(false)}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2a2a2a] transition-colors flex items-center space-x-2 cursor-pointer"
                  >
                    <span>How to Use</span>
                    <span className="text-gray-400">ⓘ</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Send Button */}
          <button
            type="submit"
            className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center cursor-pointer"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </form>
      </div>
      {/* Reset Chat Modal */}
      {showResetModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          <div 
            className="bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-xl w-full max-w-md mx-4 relative"
            style={{ animation: 'fadeInScale 0.2s ease-out' }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseResetModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            {/* Modal Content */}
            <div className="p-6">
              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-4">Reset chat?</h2>
              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                This will start a new conversation with Arthur. Your current chat history will be cleared.
              </p>
              {/* Action Buttons */}
              <div className="flex space-x-3 mb-4">
                <button
                  onClick={handleCloseResetModal}
                  className="flex-1 px-4 py-2 border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-500/10 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle reset chat logic
                    console.log('Reset chat confirmed')
                    handleCloseResetModal()
                  }}
                  className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors cursor-pointer"
                >
                  Yes, Confirm
                </button>
              </div>
              {/* Info Text */}
              <div className="flex items-start space-x-2 text-xs text-gray-400">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>All generated media will stay in your gallery.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Conversation
import { Phone, MoreVertical, PanelRightClose, ChevronDown, ArrowLeft, Send, ChevronUp, RefreshCw, Trash2, Loader2, Volume2, VolumeX } from 'lucide-react'
import { useState, useRef, useEffect, type Dispatch, type SetStateAction } from 'react'
import type { GlobalMessage } from '../../../contexts/GlobalContext'
import { useMessage } from '../../../hooks/useMessage'
import { toast } from 'sonner'
import { API_CONFIG } from '../../../config/api.config'

interface ConversationProps {
  gender?: string
  onBack?: () => void
  selectedChatId?: string | null
  chatName?: string
  chatAvatar?: string
  characterId?: string
  onToggleProfilePanel?: () => void
  onShowResetModal: () => void
  handleCall?: () => void
  onConversationDelete?: (chatId: string | null) => void
  messages: GlobalMessage[]
  setMessages: Dispatch<SetStateAction<GlobalMessage[]>>
}

const Conversation = ({
  gender,
  onBack,
  selectedChatId,
  chatName,
  chatAvatar,
  characterId,
  onToggleProfilePanel,
  onShowResetModal,
  handleCall,
  onConversationDelete,
  messages,
  setMessages
}: ConversationProps) => {
  const { sendMessage } = useMessage()
  const [message, setMessage] = useState('')
  const [showAskDropdown, setShowAskDropdown] = useState(false)
  const [showMoreDropdown, setShowMoreDropdown] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const askDropdownRef = useRef<HTMLDivElement>(null)
  const moreDropdownRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isProcessingResponseRef = useRef(false)
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null)
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  
  // Get current time in 12-hour format
  const getCurrentTime = () => new Date().toISOString()

  // Convert database message to GlobalMessage format
  const mapDbMessageToGlobal = (dbMessage: any): GlobalMessage => {
    return {
      id: dbMessage.id,
      type: dbMessage.type === 'ai' ? 'ai' : 'user',
      content: dbMessage.content,
      timestamp: dbMessage.timestamp || getCurrentTime(),
      isImage: dbMessage.isImage || false,
      imageUrl: dbMessage.imageUrl || undefined,
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isProcessingResponseRef.current || !selectedChatId) return

    const userMessageContent = message.trim()
    setMessage('')
    setIsSending(true)
    isProcessingResponseRef.current = true

    // Optimistically add user message
    const tempUserMessageId = `temp-${Date.now()}`
    const timeStamp = getCurrentTime()
    const tempUserMessage: GlobalMessage = {
      id: tempUserMessageId,
      type: 'user',
      content: userMessageContent,
      timestamp: getCurrentTime(),
    }
    setMessages((prev) => [...prev, tempUserMessage])

    try {
      // Send message to backend
      const response = await sendMessage(selectedChatId, userMessageContent, characterId, timeStamp)
      if (response.success && response.data) {
        // Replace temp message with real user message
        const userMsg = mapDbMessageToGlobal(response.data.userMessage)
        let aiMsg = null
        if (response.data.aiMessage) {
          aiMsg = mapDbMessageToGlobal(response.data.aiMessage)
        }
        
        // Handle image message if it exists
        const messagesToAdd = [userMsg, aiMsg]
        if (response.data.imageMessage) {
          const imageMsg = mapDbMessageToGlobal(response.data.imageMessage)
          messagesToAdd.push(imageMsg)
        }

        setMessages((prev) => {
          // Remove temp message and add real messages
          const filtered = prev.filter((msg) => msg.id !== tempUserMessageId)
          return [...filtered, ...messagesToAdd.filter((msg): msg is GlobalMessage => msg !== null)]
        })
      } else {
        // Remove temp message on error
        setMessages((prev) => prev.filter((msg) => msg.id !== tempUserMessageId))
        toast.error(response.error || 'Failed to send message')
      }
    } catch (error: any) {
      // Remove temp message on error
      setMessages((prev) => prev.filter((msg) => msg.id !== tempUserMessageId))
      toast.error(error.message || 'Failed to send message')
    } finally {
      setIsSending(false)
      isProcessingResponseRef.current = false
    }
  }

  const handleDeleteChat = () => {
    setShowMoreDropdown(false)
    onConversationDelete?.(selectedChatId ?? null)
  }

  const handlePlayAudio = (messageId: string, content: string) => {
    // If clicking the same message that's playing, stop it
    if (playingMessageId === messageId && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
      setPlayingMessageId(null)
      speechUtteranceRef.current = null
      return
    }

    // Stop any currently playing audio
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
    }

    // Load voices if not already loaded
    let synthVoices = window.speechSynthesis.getVoices()
    if (synthVoices.length === 0) {
      // Wait for voices to load
      window.speechSynthesis.onvoiceschanged = () => {
        synthVoices = window.speechSynthesis.getVoices()
        startSpeech(messageId, content, synthVoices)
      }
      return
    }

    startSpeech(messageId, content, synthVoices)
  }

  const startSpeech = (messageId: string, content: string, voices: SpeechSynthesisVoice[]) => {
    let selectVoice = gender === 'girls' ? voices[5] : voices[6]

    // Fallback to first available voice if index doesn't exist
    if (!selectVoice && voices.length > 0) {
      selectVoice = voices[0]
    }

    const speech = new SpeechSynthesisUtterance(content)
    speech.lang = "en-US"
    speech.voice = selectVoice || null

    // Set up event handlers
    speech.onend = () => {
      setPlayingMessageId(null)
      speechUtteranceRef.current = null
    }

    speech.onerror = () => {
      setPlayingMessageId(null)
      speechUtteranceRef.current = null
    }

    speechUtteranceRef.current = speech
    setPlayingMessageId(messageId)
    window.speechSynthesis.speak(speech)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

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

  return (
    <div className="flex flex-col h-[100vh]" style={window.innerWidth <= 1024 ? { height: "100vh" } : { height: 'calc(100vh - 65px)' }}>
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-gray-800 flex items-center justify-between bg-[#0f0f0f]">
        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
          {/* Back button - visible on mobile */}
          {onBack && (
            <button
              onClick={onBack}
              className="lg:hidden text-white hover:text-gray-400 transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0 bg-[#1f1f1f]">
            {chatAvatar ? (
              <img src={chatAvatar} alt={chatName ?? 'Chat Avatar'} className="w-full h-full object-cover object-top" />
            ) : (
              <img src={(gender === "girls" ? API_CONFIG.DEFAULT_FEMALE_IMAGE : API_CONFIG.DEFAULT_MALE_IMAGE)} alt={chatName ?? 'Chat Avatar'} className="w-full h-full object-cover object-top" />
            )}
          </div>
          <h3 className="text-white font-medium text-base sm:text-base truncate">{chatName ?? 'AI Companion'}</h3>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <button onClick={handleCall} className="p-2 text-green-400 rounded-lg transition-colors cursor-pointer">
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
                    onShowResetModal()
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2a2a2a] transition-colors flex items-center space-x-3 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset chat</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteChat()
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
            className="p-2 text-gray-400 rounded-lg transition-colors hidden lg:block cursor-pointer"
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
              className={`max-w-[85%] sm:max-w-xs md:max-w-md lg:max-w-lg px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg`}
            >
              {msg.isImage && msg.imageUrl ? (
                <div className="space-y-2">
                  {msg.content && (
                    <p className={`text-sm sm:text-sm leading-relaxed bg-[#252525] p-3 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-[4px] mb-2`}>{msg.content}</p>
                  )}
                  <img
                    src={msg.imageUrl}
                    alt="Character"
                    className="rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-[4px] max-h-[60vh] w-full object-cover"
                  />
                </div>
              ) : (
                <p className={`text-sm sm:text-sm leading-relaxed bg-[#252525] p-3 ${msg.type === "ai" ? 'rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-[4px]' : 'rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-[4px] bg-gradient-blue'} `}>{msg.content}</p>
              )}
              <div className={`flex items-center justify-start gap-2 mt-1.5 sm:mt-2`}>
                <div className="flex items-center space-x-1.5 ml-2 cursor-pointer">
                  {/* Voice message icon indicator */}
                  {
                    msg.type === "ai" && (<div
                      onClick={() => handlePlayAudio(msg.id, msg.content)}
                      className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center p-1 transition-colors ${playingMessageId === msg.id
                          ? 'bg-purple-500/40 animate-pulse'
                          : 'bg-purple-500/20 hover:bg-purple-500/30'
                        }`}
                    >
                      {playingMessageId === msg.id ? (
                        <VolumeX className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300" />
                      ) : (
                        <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                      )}
                    </div>)
                  }
                </div>
                <span className="text-xs text-gray-300 sm:text-gray-400 opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isSending && (
          <div className="flex justify-start items-start space-x-2">
            <div className="max-w-[85%] sm:max-w-xs md:max-w-md lg:max-w-lg px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg">
              <div className="flex items-center space-x-1 bg-[#252525] px-3 py-2 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-[4px]">
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: `${dot * 0.2}s` }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 mt-1.5 sm:mt-2">
                <span className="text-xs text-gray-300 sm:text-gray-400 opacity-70">Typing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Message Input */}
      <div className="p-3 sm:p-4 border-t border-gray-800 bg-[#0f0f0f]">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2 sm:space-x-2 w-full max-w-4xl mx-auto">
          <div className='flex items-center space-x-2 bg-[#2a2a2a] rounded-full px-2 sm:px-3 py-1 sm:py-1.5 w-full'>
            {/* Input Field */}
            <input
              type="text"
              placeholder="Write a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent rounded-lg px-3 sm:px-4 py-2 text-white placeholder-gray-500 text-sm focus:outline-none"
            />
            {/* Ask Button with Dropdown */}
            <div className="relative flex-shrink-0" ref={askDropdownRef}>
              <button
                type="button"
                onClick={() => setShowAskDropdown(!showAskDropdown)}
                className="flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-[#1a1a1a] border border-gray-700 rounded-full cursor-pointer text-white hover:bg-[#2a2a2a] transition-colors"
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm hidden sm:inline">Ask</span>
                {showAskDropdown ? <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />}
              </button>
              {/* Dropdown Menu */}
              {showAskDropdown && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-lg min-w-[180px] py-1 z-20">
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
            disabled={isSending || !message.trim()}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#009688] to-[#00bfa5] hover:from-[#00897b] hover:to-[#00a78f] transition-all flex items-center justify-center cursor-pointer shadow-[0_6px_20px_-10px_rgba(0,150,136,0.55)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-spin" />
            ) : (
              <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            )}
          </button>
        </form>
      </div>

    </div>
  )
}
export default Conversation
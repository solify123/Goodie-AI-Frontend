import { useState, useEffect, useCallback, useMemo, useRef, type Dispatch, type SetStateAction } from 'react'
import ChatList from './components/ChatList'
import Conversation from './components/Conversation'
import ProfilePanel from './components/ProfilePanel'
import Layout from '../../components/layout'
import BottomNavigation from '../../components/layout/BottomNavigation'
import { toast } from 'sonner'
import { Info, X, Trash2, Loader2, PhoneOff, Mic, MicOff, Volume2 } from 'lucide-react'
import { useGlobalContext, type GlobalMessage } from '../../contexts/GlobalContext'
import { useMessage } from '../../hooks/useMessage'
import { useChats } from '../../hooks/useChats'
import { callService } from '../../services/call.service'

// Type definitions for Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
  onend: ((this: SpeechRecognition, ev: Event) => any) | null
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

const ChatPage = () => {
  const { chats, setChats, activeChatId, setActiveChat, resetChat, deleteChat, updateMessages } = useGlobalContext()
  const { getMessages, deleteMessages: deleteMessagesApi } = useMessage()
  const [showChatList, setShowChatList] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [showProfilePanel, setShowProfilePanel] = useState(true)
  const [showResetModal, setShowResetModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [pendingChatId, setPendingChatId] = useState<string | null>(null)
  const [hideHeader, setHideHeader] = useState(false)
  const [hideBottomNavigation, setHideBottomNavigation] = useState(false)
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const [showCallModal, setShowCallModal] = useState(false)
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'active' | 'ended'>('idle')
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [isListening, setIsListening] = useState(false)
  const [isProcessingVoiceResponse, setIsProcessingVoiceResponse] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)
  const handleVoiceInputRef = useRef<((transcript: string) => Promise<void>) | undefined>(undefined)
  const callStatusRef = useRef(callStatus)
  const isMutedRef = useRef(isMuted)
  const showCallModalRef = useRef(showCallModal)
  const isProcessingVoiceResponseRef = useRef(isProcessingVoiceResponse)

  const activeChat = useMemo(
    () => {
      if (activeChatId) {
        return chats.find((chat: any) => chat.id === activeChatId) ?? null
      }
      return null
    },
    [activeChatId, chats],
  )

  useEffect(() => {
    callStatusRef.current = callStatus
  }, [callStatus])

  useEffect(() => {
    isMutedRef.current = isMuted
  }, [isMuted])

  useEffect(() => {
    showCallModalRef.current = showCallModal
  }, [showCallModal])

  useEffect(() => {
    isProcessingVoiceResponseRef.current = isProcessingVoiceResponse
  }, [isProcessingVoiceResponse])

  const { getChats, deleteChat: deleteChatHook } = useChats()

  // Load messages from backend when chat is selected
  useEffect(() => {
    const loadMessages = async () => {
      if (!activeChatId) return
      setIsLoadingMessages(true)
      try {
        const response = await getMessages(activeChatId)
        if (response.success && response.data) {
          // Convert database messages to GlobalMessage format
          const globalMessages: GlobalMessage[] = response.data.map((msg: any) => ({
            id: msg.id,
            type: msg.type === 'ai' ? 'ai' : 'user',
            content: msg.content,
            timestamp: msg.timestamp || new Date(msg.created_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
            isImage: msg.isImage || false,
            imageUrl: msg.imageUrl || undefined,
            userId: msg.userId || (msg.type === 'ai' ? 'ai' : 'user'),
          }))

          // Update messages in context
          updateMessages(activeChatId, () => globalMessages)
        }
      } catch (error: any) {
        console.error('Error loading messages:', error)
        toast.error('Failed to load messages')
      } finally {
        setIsLoadingMessages(false)
      }
    }

    loadMessages()
  }, [activeChatId, updateMessages])

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (!mobile) {
        setShowChatList(true)
        setHideHeader(false)
        setHideBottomNavigation(false)
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (activeChatId) {
      setHideBottomNavigation(true)
      if (isMobile) {
        setHideHeader(true)
        setShowChatList(false)
      }
    }
  }, [activeChatId, isMobile])

  useEffect(() => {
    const fetchChats = async () => {
      const response = await getChats()
      if (response.success) {
        setChats(response.data.data)
      }
    }
    fetchChats()
  }, [])

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId)
    window.innerWidth < 1024 ? setHideHeader(true) : setHideHeader(false)
    setHideBottomNavigation(true)
    if (isMobile) {
      setShowChatList(false)
    }
  }

  const handleBackToChatList = () => {
    if (isMobile) {
      setShowChatList(true)
      setHideHeader(false)
      setHideBottomNavigation(false)
    }
  }

  // Initialize outgoing call
  const handleCall = async () => {
    if (!activeChat) return

    setShowCallModal(true)
    setHideBottomNavigation(true)
    setCallStatus('calling')
    callStatusRef.current = 'calling'
    setIsMuted(false)
    setIsSpeakerOn(true)

    // Initiate call with backend
    const response = await callService.initiateCall(activeChat.character_id, activeChat.id)
    if (!response.success) {
      toast.error(response.error || 'Failed to initiate call')
      handleCloseCallModal()
      return
    }

    await handleAnswerCall()
  }

  // AI character answers the call
  const handleAnswerCall = async () => {
    // Notify backend that AI character answered
    if (activeChat) {
      const response = await callService.answerCall(activeChat.character_id, activeChat.id)
      if (!response.success) {
        toast.error(response.error || 'Failed to answer call')
        return
      }

      // Play greeting audio if available
      if (response.data?.greeting?.audio) {
        await playAudioFromBase64(response.data.greeting.audio)
      }
    }

    setCallStatus('active')
    callStatusRef.current = 'active'
    toast.success('Call connected')

    // Start listening for voice input after greeting
    setTimeout(() => {
      startListening()
    }, 300)
  }

  // Helper function to play audio from base64
  const playAudioFromBase64 = (base64Audio: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        // Stop any currently playing audio
        if (currentAudioRef.current) {
          currentAudioRef.current.pause()
          currentAudioRef.current = null
        }

        const audioBlob = new Blob(
          [Uint8Array.from(atob(base64Audio), (c) => c.charCodeAt(0))],
          { type: 'audio/mp3' }
        )
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioUrl)
        
        // Set speaker output based on state
        if ('setSinkId' in audio && isSpeakerOn) {
          // Use speaker if available
          (audio as any).setSinkId('').catch(() => {
            // Fallback if setSinkId fails
          })
        }
        
        currentAudioRef.current = audio
        
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl)
          currentAudioRef.current = null
          resolve()
        }
        audio.onerror = (error) => {
          URL.revokeObjectURL(audioUrl)
          currentAudioRef.current = null
          reject(error)
        }
        
        audio.play().catch(reject)
      } catch (error) {
        reject(error)
      }
    })
  }

  // End the call
  const handleEndCall = async () => {
    // Stop speech recognition
    stopListening()

    // Stop any playing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current = null
    }

    // Notify backend that call ended
    if (activeChat) {
      await callService.endCall(activeChat.character_id, activeChat.id)
    }

    setCallStatus('ended')
    callStatusRef.current = 'ended'
    setIsListening(false)
    handleCloseCallModal()
    toast.info('Call ended')
  }

  // Close call modal and cleanup
  const handleCloseCallModal = () => {
    // Stop speech recognition
    stopListening()

    // Stop any playing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current = null
    }

    setShowCallModal(false)
    setCallStatus('idle')
    callStatusRef.current = 'idle'
    setIsMuted(false)
    setIsSpeakerOn(true)
    setIsListening(false)
    setIsProcessingVoiceResponse(false)
    isProcessingVoiceResponseRef.current = false

    if (!activeChatId) {
      setHideHeader(false)
      setHideBottomNavigation(false)
    }
  }

  const startListening = useCallback(() => {
    if (
      recognitionRef.current &&
      callStatusRef.current === 'active' &&
      showCallModalRef.current &&
      !isMutedRef.current &&
      !isProcessingVoiceResponseRef.current
    ) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        // Recognition may already be running
      }
    }
  }, [])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (error) {
        // Ignore errors when stopping
      }
    }
  }, [])

  useEffect(() => {
    if (callStatus === 'active' && showCallModal && !isMuted && !isProcessingVoiceResponse) {
      startListening()
    } else {
      stopListening()
    }
  }, [callStatus, showCallModal, isMuted, isProcessingVoiceResponse, startListening, stopListening])

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      const result = event.results[event.resultIndex]
      if (!result?.isFinal) return

      const transcript = result[0]?.transcript?.trim()
      if (
        transcript &&
        callStatusRef.current === 'active' &&
        !isMutedRef.current &&
        handleVoiceInputRef.current &&
        !isProcessingVoiceResponseRef.current
      ) {
        await handleVoiceInputRef.current(transcript)
      }
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        toast.error('Speech recognition error. Please try again.')
      }
    }

    recognition.onend = () => {
      setIsListening(false)
      if (
        callStatusRef.current === 'active' &&
        showCallModalRef.current &&
        !isMutedRef.current &&
        !isProcessingVoiceResponseRef.current
      ) {
        startListening()
      }
    }

    recognitionRef.current = recognition

    return () => {
      try {
        recognition.stop()
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  }, [startListening])

  // Handle voice input and get AI response
  const handleVoiceInput = useCallback(async (transcript: string) => {
    if (!activeChat || isProcessingVoiceResponse) return

    setIsProcessingVoiceResponse(true)
    isProcessingVoiceResponseRef.current = true
    
    // Stop listening temporarily while processing
    stopListening()

    try {
      // Send transcribed text to backend for AI voice response
      const response = await callService.generateVoiceResponse(
        activeChat.character_id,
        activeChat.id,
        transcript.trim()
      )

      if (response.success && response.data) {
        // Play AI voice response
        if (response.data.audio) {
          await playAudioFromBase64(response.data.audio)
        }

        // Update messages in context
        if (activeChatId) {
          // Reload messages to get the new ones from backend
          const messagesResponse = await getMessages(activeChatId)
          if (messagesResponse.success && messagesResponse.data) {
            const globalMessages: GlobalMessage[] = messagesResponse.data.map((msg: any) => ({
              id: msg.id,
              type: msg.type === 'ai' ? 'ai' : 'user',
              content: msg.content,
              timestamp: msg.timestamp || new Date(msg.created_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
              isImage: msg.isImage || false,
              imageUrl: msg.imageUrl || undefined,
              userId: msg.userId || (msg.type === 'ai' ? 'ai' : 'user'),
            }))
            updateMessages(activeChatId, () => globalMessages)
          }
        }

        // Restart listening after AI response is processed
        if (callStatus === 'active' && !isMuted) {
          setTimeout(() => {
            startListening()
          }, 500)
        }
      } else {
        toast.error(response.error || 'Failed to get voice response')
        // Restart listening even on error
        if (callStatus === 'active' && !isMuted) {
          setTimeout(() => {
            startListening()
          }, 800)
        }
      }
    } catch (error: any) {
      console.error('Error processing voice input:', error)
      toast.error('Failed to process voice input')
      // Restart listening even on error
      if (callStatus === 'active' && !isMuted) {
        setTimeout(() => {
          startListening()
        }, 800)
      }
    } finally {
      setIsProcessingVoiceResponse(false)
      isProcessingVoiceResponseRef.current = false
    }
  }, [activeChat, isProcessingVoiceResponse, activeChatId, getMessages, updateMessages, callStatus, isMuted])

  // Store handleVoiceInput in ref for use in recognition event handlers
  useEffect(() => {
    handleVoiceInputRef.current = handleVoiceInput
  }, [handleVoiceInput])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening()
      if (currentAudioRef.current) {
        currentAudioRef.current.pause()
        currentAudioRef.current = null
      }
    }
  }, [stopListening])

  const handleToggleMute = () => {
    const newMutedState = !isMuted
    setIsMuted(newMutedState)
    isMutedRef.current = newMutedState

    if (newMutedState) {
      stopListening()
      toast.info('Microphone muted')
    } else {
      startListening()
      toast.info('Microphone unmuted')
    }
  }

  const handleToggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn)
    toast.info(!isSpeakerOn ? 'Speaker on' : 'Speaker off')
  }

  const openResetModal = useCallback(
    (chatId: string) => {
      setPendingChatId(chatId)
      setShowResetModal(true)
      setHideHeader(false)
      setHideBottomNavigation(false)
      setIsResetting(false)
    },
    [],
  )

  const handleCloseResetModal = useCallback(() => {
    setShowResetModal(false)
    setPendingChatId(null)
    setHideHeader(false)
    setHideBottomNavigation(false)
  }, [])

  const handleResetConfirm = useCallback(async () => {
    if (!pendingChatId) return
    setIsResetting(true)
    try {
      const result = await deleteMessagesApi(pendingChatId)
      if (result.success) {
        toast.success('Chat reset successfully')
        handleCloseResetModal()
      } else {
        toast.error('Failed to reset chat')
      }
      resetChat(pendingChatId)
    } catch (error: any) {
      toast.error('Failed to reset chat')
    } finally {
      setIsResetting(false)
    }
  }, [handleCloseResetModal, pendingChatId, resetChat])

  const openDeleteModal = useCallback((chatId: string) => {
    setPendingChatId(chatId)
    setShowDeleteModal(true)
    setHideHeader(false)
    setHideBottomNavigation(false)
    setIsDeleting(false)
  }, [])

  const handleCloseDeleteModal = useCallback(() => {
    if (isDeleting) return // Prevent closing during deletion
    setShowDeleteModal(false)
    setPendingChatId(null)
    setHideHeader(false)
    setHideBottomNavigation(false)
    setIsDeleting(false)
  }, [isDeleting])

  const handleConfirmDelete = useCallback(async () => {
    if (!pendingChatId || isDeleting) return
    setIsDeleting(true)
    try {
      await deleteChatHook(pendingChatId)
      deleteChat(pendingChatId)
      toast.success('Chat deleted successfully')
      handleCloseDeleteModal()
    } catch (error: any) {
      toast.error('Failed to delete chat')
    } finally {
      setIsDeleting(false)
    }
  }, [deleteChatHook, deleteChat, handleCloseDeleteModal, pendingChatId, isDeleting])

  const handleConversationDelete = useCallback(
    (chatId: string | null) => {
      const targetId = chatId ?? activeChatId
      if (targetId) {
        openDeleteModal(targetId)
      }
    },
    [activeChatId, openDeleteModal],
  )

  const boundSetMessages = useCallback<Dispatch<SetStateAction<GlobalMessage[]>>>(
    (value) => {
      if (!activeChatId) return
      if (typeof value === 'function') {
        updateMessages(activeChatId, value as (prev: GlobalMessage[]) => GlobalMessage[])
      } else {
        const next = value
        updateMessages(activeChatId, () => next)
      }
    },
    [activeChatId, updateMessages]
  )

  return (
    <Layout hideHeader={hideHeader}>
      <div className="chat-page w-full flex flex-col lg:flex-row h-full pb-0">
        <div
          className={`${(isMobile && showChatList) || !isMobile ? 'flex' : 'hidden'
            } xl:w-80 bg-[#1a1a1a] border-r border-gray-800 flex-col p-3`}
        >
          <ChatList
            chats={chats}
            activeChatId={activeChatId}
            onChatSelect={handleChatSelect}
            onShowResetModal={openResetModal}
            onShowDeleteModal={openDeleteModal}
          />
        </div>
        {/* Conversation Area */}
        <div
          className={`${(isMobile && !showChatList && activeChat) || !isMobile ? 'flex' : 'hidden'
            } flex-1 flex-col min-w-0`}
        >
          {activeChat ? (
            <div className="flex-1 flex min-h-0">
              <div className="flex-1 min-w-0">
                {isLoadingMessages ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-8 h-8 animate-spin text-[#009688]" />
                  </div>
                ) : (
                  <Conversation
                    onBack={handleBackToChatList}
                    selectedChatId={activeChatId}
                    chatName={activeChat.characters.name}
                    chatAvatar={activeChat.characters.imageUrl}
                    characterId={activeChat.character_id}
                    gender={activeChat.characters.attributes.gender}
                    onToggleProfilePanel={() => setShowProfilePanel(!showProfilePanel)}
                    onShowResetModal={() => openResetModal(activeChat.id)}
                    handleCall={handleCall}
                    onConversationDelete={handleConversationDelete}
                    messages={activeChat.messages}
                    setMessages={boundSetMessages}
                  />
                )}
              </div>
              {/* Profile Panel - Hidden on mobile/tablet */}
              {showProfilePanel && activeChat && (
                <div className="hidden xl:block w-[30%] bg-[#1a1a1a] border-l border-gray-800 flex-shrink-0">
                  <ProfilePanel
                    handleCall={handleCall}
                    activeChat={activeChat}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center text-gray-500">
              Select a chat to start messaging.
            </div>
          )}
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
              <button
                onClick={handleCloseResetModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Reset chat?</h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  This will start a new conversation with this character. Your current chat history will be cleared.
                </p>
                <div className="flex space-x-3 mb-4">
                  <button
                    onClick={handleCloseResetModal}
                    className="flex-1 px-4 py-2 border border-[#009688] text-[#009688] rounded-lg hover:bg-[#009688]/10 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleResetConfirm}
                    disabled={isResetting}
                    className="flex-1 px-4 py-2 bg-[#009688] text-white rounded-lg hover:bg-[#00897b] transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isResetting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Resetting...</span>
                      </>
                    ) : (
                      <span>Yes, Confirm</span>
                    )}
                  </button>
                </div>
                <div className="flex items-start space-x-2 text-xs text-gray-400">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>All generated media will stay in your gallery.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Delete Chat Modal */}
        {showDeleteModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
            style={{ animation: 'fadeIn 0.2s ease-out' }}
          >
            <div
              className="bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-xl w-full max-w-md mx-4 relative"
              style={{ animation: 'fadeInScale 0.2s ease-out' }}
            >
              <button
                onClick={handleCloseDeleteModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 text-red-400 mb-4 mx-auto">
                  <Trash2 className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white text-center mb-3">Delete chat?</h2>
                <p className="text-gray-300 text-sm leading-relaxed text-center mb-6">
                  This will permanently remove your conversation history with this character. This action cannot be undone.
                </p>
                <div className="flex space-x-3 mb-4">
                  <button
                    onClick={handleCloseDeleteModal}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2 border border-gray-600 text-gray-200 rounded-lg hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <span>Delete Chat</span>
                    )}
                  </button>
                </div>
                <div className="flex items-start space-x-2 text-xs text-gray-400">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>Deleting the chat will not affect saved media in your gallery.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {!hideBottomNavigation && <BottomNavigation />}
        
        {/* Phone Call Modal */}
        {showCallModal && activeChat && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] backdrop-blur-sm"
            style={{ animation: 'fadeIn 0.2s ease-out' }}
          >
            <div
              className="relative bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
              style={{ animation: 'fadeInScale 0.2s ease-out' }}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseCallModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Character Photo */}
              <div className="relative w-full h-64 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#009688]/30 shadow-2xl">
                  {activeChat.characters.imageUrl ? (
                    <img
                      src={activeChat.characters.imageUrl}
                      alt={activeChat.characters.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#2a2a2a] flex items-center justify-center text-6xl font-bold text-white">
                      {activeChat.characters.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                  )}
                </div>
                {/* Animated rings for calling/active states */}
                {callStatus === 'calling' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full border-4 border-[#009688] animate-ping opacity-20"></div>
                  </div>
                )}
                {callStatus === 'active' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full border-4 border-[#4fab52] animate-ping opacity-20"></div>
                  </div>
                )}
              </div>

              {/* Call Info */}
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{activeChat.characters.name}</h2>
                <p className="text-gray-400 text-sm mb-6">
                  {callStatus === 'calling' && (
                    <span className="text-[#009688] flex items-center justify-center gap-2">
                      <span className="w-2 h-2 bg-[#009688] rounded-full animate-pulse"></span>
                      Calling...
                    </span>
                  )}
                  {callStatus === 'active' && (
                    <span className="text-[#4fab52] flex items-center justify-center gap-2">
                      <span className="w-2 h-2 bg-[#4fab52] rounded-full animate-pulse"></span>
                      Call in progress
                    </span>
                  )}
                </p>

                {/* Call Controls */}
                <div className="flex items-center justify-center gap-4">
                  {callStatus === 'calling' ? (
                    <>
                      {/* Cancel Call Button */}
                      <button
                        onClick={handleEndCall}
                        className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center cursor-pointer transition-colors shadow-lg"
                      >
                        <PhoneOff className="w-6 h-6 text-white" />
                      </button>
                    </>
                  ) : callStatus === 'active' ? (
                    <>
                      {/* Mute/Listening Button */}
                      <button
                        onClick={handleToggleMute}
                        disabled={isProcessingVoiceResponse}
                        className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                          isMuted 
                            ? 'bg-red-500/20 hover:bg-red-500/30' 
                            : isListening
                            ? 'bg-green-500/30 hover:bg-green-500/40 animate-pulse'
                            : 'bg-gray-700 hover:bg-gray-600'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {isProcessingVoiceResponse ? (
                          <Loader2 className="w-5 h-5 text-white animate-spin" />
                        ) : isMuted ? (
                          <MicOff className="w-5 h-5 text-red-400" />
                        ) : (
                          <Mic className={`w-5 h-5 ${isListening ? 'text-green-400' : 'text-white'}`} />
                        )}
                      </button>
                      {/* Speaker Button */}
                      <button
                        onClick={handleToggleSpeaker}
                        className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                          isSpeakerOn ? 'bg-[#009688]/20 hover:bg-[#009688]/30' : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                      >
                        <Volume2 className={`w-5 h-5 ${isSpeakerOn ? 'text-[#009688]' : 'text-gray-400'}`} />
                      </button>
                      {/* End Call Button */}
                      <button
                        onClick={handleEndCall}
                        className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center cursor-pointer transition-colors shadow-lg"
                      >
                        <PhoneOff className="w-6 h-6 text-white" />
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default ChatPage
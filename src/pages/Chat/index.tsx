import { useState, useEffect, useCallback, useMemo, type Dispatch, type SetStateAction } from 'react'
import ChatList from './components/ChatList'
import Conversation from './components/Conversation'
import ProfilePanel from './components/ProfilePanel'
import Layout from '../../components/layout'
import BottomNavigation from '../../components/layout/BottomNavigation'
import { toast } from 'sonner'
import { Info, X, Trash2, Loader2 } from 'lucide-react'
import { useGlobalContext, type GlobalMessage } from '../../contexts/GlobalContext'
import { useMessage } from '../../hooks/useMessage'
import { useChats } from '../../hooks/useChats'

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

  const activeChat = useMemo(
    () => {
      if (activeChatId) {
        return chats.find((chat: any) => chat.id === activeChatId) ?? null
      }
      return null
    },
    [activeChatId, chats],
  )

  const { getChats } = useChats() 

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

  const handleCall = () => {
    toast.warning('Now you are offline!')
  }

  const openResetModal = useCallback(
    (chatId: string) => {
      setPendingChatId(chatId)
      setShowResetModal(true)
      setHideHeader(true)
      setHideBottomNavigation(true)
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
    try {
      await deleteMessagesApi(pendingChatId)
      resetChat(pendingChatId)
      toast.success('Chat reset successfully')
      handleCloseResetModal()
    } catch (error: any) {
      toast.error('Failed to reset chat')
    }
  }, [handleCloseResetModal, pendingChatId, resetChat, deleteMessagesApi])

  const openDeleteModal = useCallback((chatId: string) => {
    setPendingChatId(chatId)
    setShowDeleteModal(true)
    setHideHeader(true)
    setHideBottomNavigation(true)
  }, [])

  const handleCloseDeleteModal = useCallback(() => {
    setShowDeleteModal(false)
    setPendingChatId(null)
    setHideHeader(false)
    setHideBottomNavigation(false)
  }, [])

  const handleConfirmDelete = useCallback(async () => {
    if (!pendingChatId) return
    try {
      await deleteMessagesApi(pendingChatId)
      deleteChat(pendingChatId)
      toast.success('Chat deleted successfully')
      handleCloseDeleteModal()
    } catch (error: any) {
      toast.error('Failed to delete chat')
    }
  }, [deleteChat, handleCloseDeleteModal, pendingChatId, deleteMessagesApi])

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
    [activeChatId, updateMessages],
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
              {showProfilePanel && (
                <div className="hidden xl:block w-[30%] bg-[#1a1a1a] border-l border-gray-800 flex-shrink-0">
                  <ProfilePanel handleCall={handleCall} />
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
                    className="flex-1 px-4 py-2 bg-[#009688] text-white rounded-lg hover:bg-[#00897b] transition-colors cursor-pointer"
                  >
                    Yes, Confirm
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
                    className="flex-1 px-4 py-2 border border-gray-600 text-gray-200 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    Delete Chat
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
      </div>
    </Layout>
  )
}

export default ChatPage
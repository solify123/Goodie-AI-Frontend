import { createContext, useContext, useMemo, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { User } from '../services/auth.service'

// ==================== Types ====================
type MessageType = 'ai' | 'user'

export type CreateCharacterGender = 'girls' | 'guys'
type LandingTabType = 'guys' | 'girls' | 'anime'

export interface GlobalMessage {
  id: string
  type: MessageType
  content: string
  timestamp: string
  isImage?: boolean
  imageUrl?: string
  hasAudio?: boolean
}

export interface GlobalChat {
  id: string
  character_id: string
  characters: any
  messages: any[]
  user_id: string
  created_at: string
}

interface CharacterPayload {
  name: string
  avatar: string
  description?: string
  characterId?: string
}

// ==================== Context Interface ====================
interface GlobalContextType {
  // Chat related
  chats: GlobalChat[]
  setChats: (chats: GlobalChat[]) => void
  activeChatId: string | null
  setActiveChat: (chatId: string) => void
  startChatFromCharacter: (payload: CharacterPayload) => void
  appendMessage: (chatId: string, message: Omit<GlobalMessage, 'id' | 'timestamp'> & Partial<Pick<GlobalMessage, 'id' | 'timestamp'>>) => GlobalMessage | null
  updateMessages: (chatId: string, updater: (prev: GlobalMessage[]) => GlobalMessage[]) => void
  resetChat: (chatId: string) => void
  deleteChat: (chatId: string) => void
  
  // Sidebar related
  isCollapsed: boolean
  toggleSidebar: () => void
  setIsCollapsed: (isCollapsed: boolean) => void
  
  // Landing tab related
  activeTab: LandingTabType
  setActiveTab: (tab: LandingTabType) => void
  
  // Create character gender related
  gender: CreateCharacterGender
  setGender: (gender: CreateCharacterGender) => void
  
  // Auth related
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  user: User | null
  setUser: (user: User | null) => void
  showLoginModal: boolean
  setShowLoginModal: (showLoginModal: boolean) => void
}

// ==================== Context Creation ====================
const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

// ==================== Helper Functions ====================
const generateId = () => Math.random().toString(36).slice(2, 11)

const getCurrentTime = () => {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

// const buildInitialMessages = (name: string, description?: string): GlobalMessage[] => {
//   const intro = description ?? `Hi, I'm ${name}. It's great to meet you!`
//   const timestamp = getCurrentTime()
//   const messages: GlobalMessage[] = [
//     {
//       id: generateId(),
//       type: 'ai',
//       content: intro,
//       timestamp,
//       hasAudio: true,
//       userId: 'ai',
//     },
//   ]

//   return messages
// }

const buildChat = (character_id: string, characters: any, messages: any[], user_id: string, created_at: string): GlobalChat => {
  return {
    id: generateId(),
    character_id,
    characters,
    messages,
    user_id,
    created_at,
  }
}

// ==================== Provider Component ====================
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Chat state
  const [chats, setChats] = useState<GlobalChat[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(chats[0]?.id ?? null)

  // Sidebar state
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1280
    }
    return false
  })

  // Landing tab state
  const [activeTab, setActiveTab] = useState<LandingTabType>('girls')

  // Create character gender state
  const [gender, setGender] = useState<CreateCharacterGender>('guys')

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Sidebar resize handler
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setIsCollapsed(true)
      } else {
        setIsCollapsed(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ==================== Chat Functions ====================
  const setActiveChat = useCallback((chatId: string) => {
    setActiveChatId(chatId)
  }, [])

  const startChatFromCharacter = useCallback(
    ({ characterId }: CharacterPayload) => {
      setChats((prev) => {
        // Find existing chat by characterId if provided, otherwise by name
        const existing = characterId 
          ? prev.find((chat) => (chat as any).characterId === characterId)
          : prev.find((chat) => chat.character_id === characterId)
        
        if (existing) {
          return prev
        }
        const newChat = buildChat(characterId ?? '', [], [], '', new Date().toISOString())       // Add characterId to chat if provided
        return [newChat, ...prev]
      })
    },
    [],
  )

  const appendMessage = useCallback(
    (
      chatId: string,
      message: Omit<GlobalMessage, 'id' | 'timestamp'> & Partial<Pick<GlobalMessage, 'id' | 'timestamp'>>,
    ) => {
      const messageId = message.id ?? generateId()
      const timestamp = message.timestamp ?? getCurrentTime()
      const newMessage: GlobalMessage = { ...message, id: messageId, timestamp }

      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id !== chatId) return chat
          const updatedMessages = [...chat.messages, newMessage]
          return {
            ...chat,
            messages: updatedMessages,
            lastMessage: newMessage.content,
            timestamp,
          }
        }),
      )

      return newMessage
    },
    [],
  )

  const updateMessages = useCallback((chatId: string, updater: (prev: GlobalMessage[]) => GlobalMessage[]) => {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== chatId) return chat
        const updatedMessages = updater(chat.messages)
        return {
          ...chat,
          messages: updatedMessages,
        }
      }),
    )
  }, [])

  const resetChat = useCallback((chatId: string) => {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== chatId) return chat
        const baseMessages = [chat.messages[0]]
        return {
          ...chat,
          messages: baseMessages,
        }
      }),
    )
  }, [])

  const deleteChat = useCallback((chatId: string) => {
    setChats((prev) => {
      const updated = prev.filter((chat) => chat.id !== chatId)
      setActiveChatId((prevActive) => {
        if (prevActive !== chatId) return prevActive
        return updated[0]?.id ?? null
      })
      return updated
    })
  }, [])

  // ==================== Sidebar Functions ====================
  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev)
  }, [])

  // ==================== Context Value ====================
  const value = useMemo<GlobalContextType>(
    () => ({
      // Chat
      chats,
      setChats,
      activeChatId,
      setActiveChat,
      startChatFromCharacter,
      appendMessage,
      updateMessages,
      resetChat,
      deleteChat,
      // Sidebar
      isCollapsed,
      toggleSidebar,
      setIsCollapsed,
      // Landing tab
      activeTab,
      setActiveTab,
      // Create character gender
      gender,
      setGender,
      // Auth
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      showLoginModal,
      setShowLoginModal
    }),
    [
      chats,
      setChats,
      activeChatId,
      setActiveChat,
      startChatFromCharacter,
      appendMessage,
      updateMessages,
      resetChat,
      deleteChat,
      isCollapsed,
      toggleSidebar,
      activeTab,
      gender,
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      showLoginModal,
      setShowLoginModal
    ],
  )

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

// ==================== Main Hook ====================
export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useGlobalContext must be used within GlobalProvider')
  }
  return context
}

// ==================== Specific Hooks for Backward Compatibility ====================
export const useSidebar = () => {
  const context = useGlobalContext()
  return {
    isCollapsed: context.isCollapsed,
    toggleSidebar: context.toggleSidebar,
    setIsCollapsed: context.setIsCollapsed,
  }
}

export const useLandingTab = () => {
  const context = useGlobalContext()
  return {
    activeTab: context.activeTab,
    setActiveTab: context.setActiveTab,
  }
}

export const useCreateCharacterGender = () => {
  const context = useGlobalContext()
  return {
    gender: context.gender,
    setGender: context.setGender,
  }
}

export const useCreateCharacterGenderOptional = () => {
  const context = useContext(GlobalContext)
  if (!context) return null
  return {
    gender: context.gender,
    setGender: context.setGender,
  }
}
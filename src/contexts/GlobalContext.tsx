import { createContext, useContext, useMemo, useState, useCallback, type ReactNode } from 'react'

type MessageType = 'ai' | 'user'

export interface GlobalMessage {
  id: string
  type: MessageType
  content: string
  timestamp: string
  isImage?: boolean
  imageUrl?: string
  hasAudio?: boolean
  userId: string
}

export interface GlobalChat {
  id: string
  name: string
  avatar: string
  description?: string
  messages: GlobalMessage[]
  initialMessages: GlobalMessage[]
  lastMessage: string
  timestamp: string
}

interface CharacterPayload {
  name: string
  avatar: string
  description?: string
}

interface GlobalContextType {
  chats: GlobalChat[]
  activeChatId: string | null
  setActiveChat: (chatId: string) => void
  startChatFromCharacter: (payload: CharacterPayload) => string
  appendMessage: (chatId: string, message: Omit<GlobalMessage, 'id' | 'timestamp'> & Partial<Pick<GlobalMessage, 'id' | 'timestamp'>>) => GlobalMessage | null
  updateMessages: (chatId: string, updater: (prev: GlobalMessage[]) => GlobalMessage[]) => void
  resetChat: (chatId: string) => void
  deleteChat: (chatId: string) => void
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

const generateId = () => Math.random().toString(36).slice(2, 11)

const getCurrentTime = () => {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

const buildInitialMessages = (name: string, description?: string, avatar?: string): GlobalMessage[] => {
  const intro = description ?? `Hi, I'm ${name}. It's great to meet you!`
  const timestamp = getCurrentTime()
  const messages: GlobalMessage[] = [
    {
      id: generateId(),
      type: 'ai',
      content: intro,
      timestamp,
      hasAudio: true,
      userId: 'ai',
    },
  ]

  if (avatar) {
    messages.unshift({
      id: generateId(),
      type: 'ai',
      content: `A portrait of ${name}.`,
      timestamp,
      isImage: true,
      imageUrl: avatar,
      userId: 'ai',
    })
  }

  return messages
}

const defaultArthurMessages: GlobalMessage[] = [
  {
    id: generateId(),
    type: 'ai',
    content:
      'An image of a man from the chest down, wearing a white button-up shirt with rolled-up sleeves, white pants, and a black belt with a watch on his left wrist.',
    timestamp: getCurrentTime(),
    isImage: true,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face',
    userId: 'ai',
  },
  {
    id: generateId(),
    type: 'user',
    content: 'how old are you?',
    timestamp: getCurrentTime(),
    userId: 'user',
  },
  {
    id: generateId(),
    type: 'ai',
    content:
      "*laughs softly* Oh, you're curious now huh? Well, let's just say I'm mature enough to know what I want...and young enough to enjoy every minute of it. 😉",
    timestamp: getCurrentTime(),
    hasAudio: true,
    userId: 'ai',
  },
  {
    id: generateId(),
    type: 'user',
    content: 'what is your name?',
    timestamp: getCurrentTime(),
    userId: 'user',
  },
  {
    id: generateId(),
    type: 'ai',
    content: "*chuckles* My name's Arthur Murphy, but most people call me Art. What should I call you, cutie?",
    timestamp: getCurrentTime(),
    hasAudio: true,
    userId: 'ai',
  },
]

const buildChat = (name: string, avatar: string, description?: string, initialMessages?: GlobalMessage[]): GlobalChat => {
  const messages = initialMessages ? initialMessages.map((msg) => ({ ...msg })) : buildInitialMessages(name, description, avatar)
  const lastMessage = messages[messages.length - 1]?.content ?? ''
  const timestamp = messages[messages.length - 1]?.timestamp ?? getCurrentTime()

  return {
    id: generateId(),
    name,
    avatar,
    description,
    messages,
    initialMessages: messages.map((msg) => ({ ...msg })),
    lastMessage,
    timestamp,
  }
}

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<GlobalChat[]>([
    buildChat('Arthur Murphy', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', undefined, defaultArthurMessages),
  ])
  const [activeChatId, setActiveChatId] = useState<string | null>(chats[0]?.id ?? null)

  const setActiveChat = useCallback((chatId: string) => {
    setActiveChatId(chatId)
  }, [])

  const startChatFromCharacter = useCallback(
    ({ name, avatar, description }: CharacterPayload) => {
      let chatId = ''

      setChats((prev) => {
        const existing = prev.find((chat) => chat.name.toLowerCase() === name.toLowerCase())
        if (existing) {
          chatId = existing.id
          return prev
        }
        const newChat = buildChat(name, avatar, description)
        chatId = newChat.id
        return [newChat, ...prev]
      })

      if (!chatId) {
        return ''
      }

      setActiveChat(chatId)
      return chatId
    },
    [chats, setActiveChat],
  )

  const appendMessage = useCallback(
    (
      chatId: string,
      message: Omit<GlobalMessage, 'id' | 'timestamp'> & Partial<Pick<GlobalMessage, 'id' | 'timestamp'>>,
    ) => {
      const messageId = message.id ?? generateId()
      const timestamp = message.timestamp ?? getCurrentTime()
      const userId = message.userId ?? (message.type === 'ai' ? 'ai' : 'user')
      const newMessage: GlobalMessage = { ...message, id: messageId, timestamp, userId }

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
        const last = updatedMessages[updatedMessages.length - 1]
        return {
          ...chat,
          messages: updatedMessages,
          lastMessage: last?.content ?? chat.lastMessage,
          timestamp: last?.timestamp ?? chat.timestamp,
        }
      }),
    )
  }, [])

  const resetChat = useCallback((chatId: string) => {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== chatId) return chat
        const baseMessages = chat.initialMessages.map((msg) => ({
          ...msg,
          id: generateId(),
          timestamp: getCurrentTime(),
          userId: msg.userId,
        }))
        const last = baseMessages[baseMessages.length - 1]
        return {
          ...chat,
          messages: baseMessages,
          lastMessage: last?.content ?? chat.lastMessage,
          timestamp: last?.timestamp ?? chat.timestamp,
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

  const value = useMemo<GlobalContextType>(
    () => ({
      chats,
      activeChatId,
      setActiveChat,
      startChatFromCharacter,
      appendMessage,
      updateMessages,
      resetChat,
      deleteChat,
    }),
    [activeChatId, appendMessage, chats, deleteChat, resetChat, setActiveChat, startChatFromCharacter, updateMessages],
  )

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useGlobalContext must be used within GlobalProvider')
  }
  return context
}


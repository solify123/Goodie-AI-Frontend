import { messageApi } from '../api/message.api'

export const messageService = {
  getMessages: async (chatId: string) => {
    try {
      const response = await messageApi.getMessages(chatId)
      if (response.success) {
        return response
      } else {
        return {
          success: false,
          error: response.error || response.message || 'Failed to fetch messages'
        }
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to fetch messages'
      }
    }
  },

  sendMessage: async (chatId: string, content: string, characterId?: string) => {
    try {
      const response = await messageApi.sendMessage(chatId, content, characterId)
      if (response.success) {
        return response
      } else {
        return {
          success: false,
          error: response.error || response.message || 'Failed to send message'
        }
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to send message'
      }
    }
  },

  deleteMessages: async (chatId: string) => {
    try {
      const response = await messageApi.deleteMessages(chatId)
      if (response.success) {
        return response
      } else {
        return {
          success: false,
          error: response.error || response.message || 'Failed to delete messages'
        }
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to delete messages'
      }
    }
  },

}


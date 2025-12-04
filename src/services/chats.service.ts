import { chatsApi } from "../api/chats.api"

export const chatsService = {
    createChat: async (content: string, characterId: string) => {
        try {
            const response = await chatsApi.createChat(content, characterId)
            if (response.success) {
                return response
            } else {
                return {
                    success: false,
                    error: response.error || response.message || 'Failed to create chat'
                }
            }
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to create chat'
            }
        }
    },

    getChats: async () => {
        try {
            const response = await chatsApi.getChats()
            if (response.success) {
                return response
            } else {
                return {
                    success: false,
                    error: response.error || response.message || 'Failed to get chats'
                }
            }
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to get chats'
            }
        }
    },

    deleteChat: async (chatId: string) => {
        try {
            const response = await chatsApi.deleteChat(chatId)
            if (response.success) {
                return response
            } else {
                return {
                    success: false,
                    error: response.error || response.message || 'Failed to delete chat'
                }
            }
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to delete chat'
            }
        }
    },

    getUserCollection: async () => {
        try {
            const response = await chatsApi.getUserCollection()
            if (response.success) {
                return response
            } else {
                return {
                    success: false,
                    error: response.error || response.message || 'Failed to get collection',
                    data: []
                }
            }
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to get collection',
                data: []
            }
        }
    }
}
import { chatsService } from "../services/chats.service"

export const useChats = () => {
    const createChat = async (content: string, characterId: string) => {
        const response = await chatsService.createChat(content, characterId)
        if (response.success) {
            return response
        } else {
            throw new Error(response.error)
        }
    }

    const getChats = async () => {
        const response = await chatsService.getChats()
        if (response.success) {
            return response
        } else {
            throw new Error(response.error)
        }
    }

    const deleteChat = async (chatId: string) => {
        const response = await chatsService.deleteChat(chatId)
        if (response.success) {
            return response
        } else {
            throw new Error(response.error)
        }
    }

    const getUserCollection = async () => {
        const response = await chatsService.getUserCollection()
        if (response.success) {
            return response
        } else {
            throw new Error(response.error)
        }
    }
    
    return { createChat, getChats, deleteChat, getUserCollection }
}

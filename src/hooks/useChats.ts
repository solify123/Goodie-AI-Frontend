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
    
    return { createChat, getChats }
}

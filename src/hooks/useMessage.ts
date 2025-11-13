import { messageService } from '../services/message.service'

export const useMessage = () => {
  const getMessages = async (chatId: string) => {
    const response = await messageService.getMessages(chatId)
    if (response.success) {
      return response
    } else {
      throw new Error(response.error)
    }
  }

  const sendMessage = async (chatId: string, content: string, characterId?: string) => {
    const response = await messageService.sendMessage(chatId, content, characterId)
    if (response.success) {
      return response
    } else {
      throw new Error(response.error)
    }
  }

  const deleteMessages = async (chatId: string) => {
    const response = await messageService.deleteMessages(chatId)
    if (response.success) {
      return response
    } else {
      throw new Error(response.error)
    }
  }


  return { getMessages, sendMessage, deleteMessages }
}


import { callApi } from '../api/call.api'

export const callService = {
  /**
   * Initiate an outgoing call to a character
   */
  initiateCall: async (characterId: string, chatId: string) => {
    try {
      const response = await callApi.initiateCall(characterId, chatId)
      if (response.success) {
        return response
      } else {
        return {
          success: false,
          error: response.error || response.message || 'Failed to initiate call',
        }
      }
    } catch (error: any) {
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          'Failed to initiate call',
      }
    }
  },

  /**
   * Answer/accept a call (called automatically by AI after 5s)
   */
  answerCall: async (characterId: string, chatId: string) => {
    try {
      const response = await callApi.answerCall(characterId, chatId)
      if (response.success) {
        return response
      } else {
        return {
          success: false,
          error: response.error || response.message || 'Failed to answer call',
        }
      }
    } catch (error: any) {
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          'Failed to answer call',
      }
    }
  },

  /**
   * End/terminate a call
   */
  endCall: async (characterId: string, chatId: string) => {
    try {
      const response = await callApi.endCall(characterId, chatId)
      if (response.success) {
        return response
      } else {
        return {
          success: false,
          error: response.error || response.message || 'Failed to end call',
        }
      }
    } catch (error: any) {
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          'Failed to end call',
      }
    }
  },

  /**
   * Generate AI voice response during call
   */
  generateVoiceResponse: async (characterId: string, chatId: string, userMessage: string) => {
    try {
      const response = await callApi.generateVoiceResponse(characterId, chatId, userMessage)
      if (response.success) {
        return response
      } else {
        return {
          success: false,
          error: response.error || response.message || 'Failed to generate voice response',
        }
      }
    } catch (error: any) {
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          'Failed to generate voice response',
      }
    }
  },

  /**
   * Get call status
   */
  getCallStatus: async (callId: string) => {
    try {
      const response = await callApi.getCallStatus(callId)
      if (response.success) {
        return response
      } else {
        return {
          success: false,
          error: response.error || response.message || 'Failed to get call status',
        }
      }
    } catch (error: any) {
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          'Failed to get call status',
      }
    }
  },
}


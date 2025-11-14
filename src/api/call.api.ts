import axios from 'axios'
import API_CONFIG from '../config/api.config'

// Create axios instance with token interceptor
const callAxios = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add token
callAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const callApi = {
  /**
   * Initiate an outgoing call to a character
   * @param characterId - The ID of the character to call
   * @param chatId - The chat ID associated with the call
   */
  initiateCall: async (characterId: string, chatId: string) => {
    const response = await callAxios.post('/v1/calls/initiate', {
      characterId,
      chatId,
    })
    return response.data
  },

  /**
   * Answer/accept a call (called automatically by AI after 5s)
   * @param characterId - The ID of the character
   * @param chatId - The chat ID associated with the call
   */
  answerCall: async (characterId: string, chatId: string) => {
    const response = await callAxios.post('/v1/calls/answer', {
      characterId,
      chatId,
    })
    return response.data
  },

  /**
   * End/terminate a call
   * @param characterId - The ID of the character
   * @param chatId - The chat ID associated with the call
   */
  endCall: async (characterId: string, chatId: string) => {
    const response = await callAxios.post('/v1/calls/end', {
      characterId,
      chatId,
    })
    return response.data
  },

  /**
   * Generate AI voice response during call
   * @param characterId - The ID of the character
   * @param chatId - The chat ID associated with the call
   * @param userMessage - The user's voice message (transcribed text)
   */
  generateVoiceResponse: async (characterId: string, chatId: string, userMessage: string) => {
    const response = await callAxios.post('/v1/calls/voice-response', {
      characterId,
      chatId,
      userMessage,
    })
    return response.data
  },

  /**
   * Get call status
   * @param callId - The call ID
   */
  getCallStatus: async (callId: string) => {
    const response = await callAxios.get(`/v1/calls/${callId}/status`)
    return response.data
  },
}


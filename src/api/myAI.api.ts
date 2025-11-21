import axios from "axios";
import API_CONFIG from "../config/api.config";

// Create axios instance with token interceptor
const myAIAxios = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  // Request interceptor to add token
  myAIAxios.interceptors.request.use(
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

export const myAIApi = {
    getMyAI: async () => {
        const response = await myAIAxios.get(`${API_CONFIG.baseURL}/v1/my-ai`)
        return response.data;
    }
}
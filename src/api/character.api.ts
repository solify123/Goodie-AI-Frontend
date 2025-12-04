import axios from 'axios'
import API_CONFIG from '../config/api.config'


// Create axios instance with token interceptor
const characterAxios = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor to add token
characterAxios.interceptors.request.use(
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

export const characterApi = {
    createCharacter: async (characterData: any) => {
        const response = await characterAxios.post(`${API_CONFIG.baseURL}/v1/characters`, characterData)
        return response.data;
    },
    getCharacters: async () => {
        const response = await characterAxios.get(`${API_CONFIG.baseURL}/v1/characters`)
        return response.data;
    },
    getCharacter: async (id: string) => {
        const response = await characterAxios.get(`${API_CONFIG.baseURL}/v1/characters/${id}`)
        return response.data;
    }
}
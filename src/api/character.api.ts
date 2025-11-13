import axios from 'axios'
import API_CONFIG from '../config/api.config'

export const characterApi = {
    createCharacter: async (characterData: any) => {
        const response = await axios.post(`${API_CONFIG.baseURL}/v1/characters`, characterData)
        return response.data;
    },
    getCharacters: async () => {
        const response = await axios.get(`${API_CONFIG.baseURL}/v1/characters`)
        return response.data;
    },
    getCharacter: async (id: string) => {
        const response = await axios.get(`${API_CONFIG.baseURL}/v1/characters/${id}`)
        return response.data;
    }
}
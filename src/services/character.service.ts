import { characterApi } from "../api/character.api"

export const characterService = {
    createCharacter: async (characterData: any) => {
        try {
            const response = await characterApi.createCharacter(characterData)
            // Backend already returns { success, data } structure
            if (response.success) {
                return response
            } else {
                return { 
                    success: false, 
                    error: response.error || response.message || 'Failed to create character' 
                }
            }
        } catch (error: any) {
            return { 
                success: false, 
                error: error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to create character' 
            };
        }
    },
    getCharacters: async () => {
        try {
            const response = await characterApi.getCharacters()
            return { success: true, data: response }
        } catch (error: any) {
            return { 
                success: false, 
                error: error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to fetch characters' 
            }
        }
    },
    getCharacter: async (id: string) => {
        try {
            const response = await characterApi.getCharacter(id)
            return { success: true, data: response }
        } catch (error: any) {
            return { 
                success: false, 
                error: error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to fetch character' 
            }
        }
    }
}
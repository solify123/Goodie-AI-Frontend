import { characterService } from "../services/character.service"

export const useCharacter = () => {
    const createCharacter = async (characterData: any) => {
        const response = await characterService.createCharacter(characterData);
        if (response.success) {
            return response
        } else {
            throw new Error(response.error)
        }
    }

    const getCharacters = async () => {
        const response = await characterService.getCharacters();
        if (response.success) {
            return response
        } else {
            throw new Error(response.error)
        }
    }

    const getCharacter = async (id: string) => {
        const response = await characterService.getCharacter(id);
        if (response.success) {
            return response
        } else {
            throw new Error(response.error)
        }
    }

    return { createCharacter, getCharacters, getCharacter }
}
import { generateImageApi } from "../api/generateImage.api"

const generateImageService = {
    generateImage: async (selectedCharacter: any, prompt: string, selectedCount: number) => {
        const response = await generateImageApi.generateImage(selectedCharacter, prompt, selectedCount)
        return response
    },
    getImages: async (characterId?: string) => {
        const response = await generateImageApi.getImages(characterId)
        return response
    }
}

export default generateImageService
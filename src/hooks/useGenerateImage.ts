import generateImageService from "../services/generateImage.service"

const useGenerateImage = () => {
    const generateImage = async (selectedCharacter: any, prompt: string, selectedCount: number) => {
        const response = await generateImageService.generateImage(selectedCharacter, prompt, selectedCount)
        if (response.success) {
            return response
        } else {
            return {
                success: false,
                error: response.error || response.message || 'Failed to generate image'
            }
        }
    }

    const getImages = async (characterId?: string) => {
        const response = await generateImageService.getImages(characterId)
        if (response.success) {
            return response
        } else {
            return {
                success: false,
                error: response.error || response.message || 'Failed to fetch images',
                images: []
            }
        }
    }

    return { generateImage, getImages }
}

export default useGenerateImage
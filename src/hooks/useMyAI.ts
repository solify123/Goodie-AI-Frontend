import myAIService from "../services/myAI.service"

const useMyAI = () => {
    const getMyAI = async () => {
        const response = await myAIService.getMyAI()
        if (response.success) {
            return response
        } else {
            throw new Error(response.error)
        }
    }
    return { getMyAI }
}

export default useMyAI;
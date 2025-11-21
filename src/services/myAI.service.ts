import { myAIApi } from "../api/myAI.api"

const myAIService = {
    getMyAI: async () => {
        const response = await myAIApi.getMyAI()
        if (response.success) {
            return response
        } else {
            throw new Error(response.error)
        }
    }
}

export default myAIService;
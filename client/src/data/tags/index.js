import { apiRequest } from "../../services"

export const getTags = async () => {
    const response = await apiRequest.get("/tags")
    return response || []
}
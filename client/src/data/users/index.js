import { apiRequest } from "../../services"

export const getUserProfile = async (userName) => {
  const response = await apiRequest.get("/profile", {
    userName
  })
  console.log({ response })
  return response?.data || {}
}


export const updateUserProfile = async (data) => {
  const response = await apiRequest.put("/profile", data)
  console.log({ response })
  return response?.data || {}
}

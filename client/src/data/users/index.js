import { apiRequest } from "../../services"

export const getUserProfile = async (userName) => {
  const response = await apiRequest.get("/user-profile", {
    userName
  })
  console.log({ response })
  return response?.data || {}
}


export const updateUserProfile = async (data) => {
  const response = await apiRequest.put("/auth/my-profile", data)
  console.log({ response })
  return response?.data || {}
}

export const getMyProfile = async () => {
  const response = await apiRequest.get("/auth/my-profile")
  return response || {}
}
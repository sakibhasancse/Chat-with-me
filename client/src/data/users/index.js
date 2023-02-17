import { apiRequest } from "../../services"

export const getUserProfile = async (userName) => {
  const response = await apiRequest({
    path="/profile", data={
      userName
    }
  })
  console.log({ response })
  return response?.data || {}
}


export const updateUserProfile = async (data) => {
  const response = await apiRequest({
    method="PUT",
    path="/profile", data=data
  })
  console.log({ response })
  return response?.data || {}
}

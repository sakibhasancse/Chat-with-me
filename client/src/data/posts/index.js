import { apiRequest } from "../../services"

export const getUserPosts = async (userName) => {
  const response = await apiRequest({
    path="/posts", data={
      userName
    }
  })
  console.log({ response })
  return response?.data || {}
}

export const createPosts = async (content) => {
  const response = await apiRequest({
    method="POST", path="/posts", data={
      content
    }
  })
  console.log({ response })
  return response?.data || {}
}

export const removePosts = async (postId) => {
  const response = await apiRequest({
    method="DELETE", path="/posts", data={
      postId
    }
  })
  console.log({ response })
  return response?.data || {}
}
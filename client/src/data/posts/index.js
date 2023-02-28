import { apiRequest } from "../../services"

export const getUserPosts = async () => {
  const response = await apiRequest.get("/posts")
  return response?.data || []
}

export const getAllPosts = async (queryPath) => {
  let path = "/posts"
  if (queryPath) path = path + queryPath
  const response = await apiRequest.get("/posts")
  return response?.data || []
}

export const createPosts = async (content) => {
  const response = await apiRequest.post('/posts', content)
  return response || {}
}

export const removePosts = async (postId) => {
  const response = await apiRequest.delete("/posts", {
    postId
  })
  console.log({ response })
  return response?.data || {}
}
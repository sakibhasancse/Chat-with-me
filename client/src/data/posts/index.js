import { apiRequest } from "../../services"

export const getUserPosts = async (queryPath) => {
  let path = `/posts/user`
  if (queryPath) path = path + queryPath
  console.log(path)
  const response = await apiRequest.get(path)
  return response || []
}

export const getAllPosts = async (queryPath) => {
  let path = "/posts"
  if (queryPath) path = path + queryPath
  const response = await apiRequest.get("/posts")
  return response?.data || []
}

export const createPosts = async (content) => {
  try {
    const response = await apiRequest.post('/posts', content)
    return response || {}
  } catch (error) {
    return error?.response?.data || {
      error: error?.message,
      status: "error"
    }
  }

}

export const removePosts = async (postId) => {
  const response = await apiRequest.delete("/posts", {
    postId
  })
  console.log({ response })
  return response?.data || {}
}
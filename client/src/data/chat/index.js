import { apiRequest } from "../../services"

export const getChatList = async (queryPath = '') => {
  let path = "/chat"
  if (queryPath) path = path + queryPath
  console.log({ path, queryPath })
  const response = await apiRequest.get(path)
  return response?.data || {}
}

export const createChat = async (userId) => {
  const response = await apiRequest.post('/chat', {
    userId
  })
  console.log({ response })
  return response?.data || {}
}


export const getMessages = async (chatId) => {
  const response = await apiRequest.get(`/message?chatId=${chatId}`)
  return response?.data || {}
}

export const sendMessage = async (chatId, content) => {
  const response = await apiRequest.post('/message', {
    content,
    chatId
  })
  console.log({ response })
  return response?.data || {}
}

export const removeMessage = async (chatId, content) => {
  const response = await apiRequest.delete("/message", {
    content,
    chatId
  })
  console.log({ response })
  return response?.data || {}
}

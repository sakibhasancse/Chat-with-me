import { apiRequest } from "../../services"

export const getChatList = async (queryPath = '') => {
  let path = "/chat"
  if (queryPath) path = path + queryPath
  const response = await apiRequest.get(path)
  console.log({ response })
  return response || {}
}

export const createChat = async (userId) => {
  const response = await apiRequest.post('/chat', {
    userId
  })
  return response || {}
}


export const getMessages = async (chatId) => {
  const response = await apiRequest.get(`/message?chatId=${chatId}`)
  return response || {}
}

export const sendMessage = async (chatId, content) => {
  const response = await apiRequest.post('/message', {
    content,
    chatId
  })
  console.log({ response })
  return response || {}
}

export const removeMessage = async (chatId, content) => {
  const response = await apiRequest.delete("/message", {
    content,
    chatId
  })
  console.log({ response })
  return response?.data || {}
}

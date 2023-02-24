import { apiRequest } from "../../services"

export const getChatList = async (queryPath = '') => {
  let path = "/chat"
  if (queryPath) path = path + queryPath
  console.log({ path, queryPath })
  const response = await apiRequest({ path })
  return response?.data || {}
}

export const createChat = async (userId) => {
  const response = await apiRequest({
    method: 'POST', path: "/chat", data: {
      userId
    }
  })
  console.log({ response })
  return response?.data || {}
}


export const getMessages = async (chatId) => {
  const response = await apiRequest({ path: `/message?chatId=${chatId}` })
  return response?.data || {}
}

export const sendMessage = async (chatId, content) => {
  const response = await apiRequest({
    method: 'POST', path: "/message", data: {
      content,
      chatId
    }
  })
  console.log({ response })
  return response?.data || {}
}

export const removeMessage = async (chatId, content) => {
  const response = await apiRequest({
    method: 'DELETE', path: "/message", data: {
      content,
      chatId
    }
  })
  console.log({ response })
  return response?.data || {}
}

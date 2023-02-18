import { apiRequest } from "../../services"

export const getChatList = async () => {
  const response = await apiRequest({
    path: "/chat"
  })
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


const getMessages = async (chatIdt) => {
  const response = await apiRequest({ path: "/message", data: { chatId } })
  console.log({ response })
  return response?.data || {}
}

const sendMessage = async (chatId, content) => {
  const response = await apiRequest({
    method: 'POST', path: "/message", data: {
      content,
      chatId
    }
  })
  console.log({ response })
  return response?.data || {}
}

const removeMessage = async (chatId, content) => {
  const response = await apiRequest({
    method: 'DELETE', path: "/message", data: {
      content,
      chatId
    }
  })
  console.log({ response })
  return response?.data || {}
}

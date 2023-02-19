import { ChatCollection } from "./chat.model"

export const getAChat = async (query = {}) => {
  const chat = await ChatCollection.findOne(query)
  return chat
}

export const getChats = async (query = {}) => {
  const chats = await ChatCollection.find(query)
  return chats
}
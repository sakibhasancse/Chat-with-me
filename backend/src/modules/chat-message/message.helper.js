import { MessageCollection } from './message.model.js'

export const getChatsMessages = async (query = {}) => {
  const chatsMessage = await MessageCollection.find(query)
  return chatsMessage
}
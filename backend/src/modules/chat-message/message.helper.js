import { MessageCollection } from './message.model'

export const getChatsMessages = async (query = {}) => {
  const chatsMessage = await MessageCollection.find(query)
  return chatsMessage
}
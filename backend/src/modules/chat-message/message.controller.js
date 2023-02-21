import _ from 'lodash'
import { CustomError } from '../../app/error.js'
import { ChatCollection } from '../chat/chat.model.js'
import { appHelper, chatHelper } from '../helpers.js'
import { MessageCollection } from './message.model.js'

export const addMessage = async (req, res, next) => {
  try {
    const { body = {}, user = {} } = req
    appHelper.checkRequiredFields(['content', 'chatId'], body)

    const chat = await chatHelper.getAChat({ _id: body.chatId })
    if (!chat) throw new CustomError(404, 'Chat not found')
    if (!chat.participants.find(participant => participant.userId === user.userId)) {
      throw new CustomError(401, 'Access denied')
    }

    const newMessage = {
      createdBy: user.userId,
      content: body.content,
      chatId: body.chatId
    }

    const message = await MessageCollection.create(newMessage)
    if (!_.size(message)) throw new CustomError(400, 'Failed to create the message')
    await ChatCollection.findOneAndUpdate({ _id: body.chatId },
      { lastMessage: body.content, lastMessageAt: new Date() })

    res.status(201).json(message)
  } catch (error) {
    return next(error)
  }
}

export const getMessages = async (req, res, next) => {
  try {
    const { user = {}, query } = req
    appHelper.checkRequiredFields(['chatId'], query)

    const chat = await chatHelper.getAChat({ _id: query.chatId })
    if (!chat) throw new CustomError(404, 'Chat not found')

    if (!chat.participants.find(participant => participant.userId === user.userId)) {
      throw new CustomError(401, 'Access denied')
    }

    const messageList = await MessageCollection.find({
      userId: user.userId,
      chatId: query.chatId
    }).sort({ createdAt: -1 })

    res.status(200).json(messageList)
  } catch (error) {
    return next(error)
  }
}
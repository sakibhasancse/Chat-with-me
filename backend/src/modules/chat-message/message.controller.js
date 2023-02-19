import _ from 'lodash'
import bcrypt from 'bcryptjs'

import { CustomError } from '../../app/error.js'
import { appHelper, userHelper, chatHelper } from '../helpers.js'
import { ChatCollection, MessageCollection } from './message.model.js'
getMessages, addMessage

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

    console.log({ newMessage })
    const message = await MessageCollection.create(newMessage)
    console.log({ message })
    if (!_.size(message)) throw new CustomError(400, 'Failed to create the message')

    res.status(201).json(message)
  } catch (error) {
    return next(error)
  }
}

export const getMessages = async (req, res, next) => {
  try {
    const { body = {}, user = {} } = req
    appHelper.checkRequiredFields(['content', 'chatId'], body)

    const chat = await chatHelper.getAChat({ _id: body.chatId })
    if (!chat) throw new CustomError(404, 'Chat not found')

    if (!chat.participants.find(participant => participant.userId === user.userId)) {
      throw new CustomError(401, 'Access denied')
    }

    const messageList = await MessageCollection.find({
      userId: user.userId,
      chatId: body.chatId
    })

    res.status(200).json(messageList)
  } catch (error) {
    return next(error)
  }
}
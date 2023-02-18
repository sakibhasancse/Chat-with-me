import _ from 'lodash'
import bcrypt from 'bcryptjs'

import { CustomError } from '../../app/error.js'
import { appHelper, userHelper } from '../helpers.js'
import { ChatCollection } from './chat.model.js'


export const createChat = async (req, res, next) => {
  try {
    const { body = {}, user = {} } = req
    appHelper.checkRequiredFields(['userId'], body)
    const participantUser = await userHelper.getAUser({ _id: body.userId })
    console.log({ user, participantUser })
    if (!participantUser) throw new CustomError(404, 'Participant user not found')

    const alreadyExistsUser = await ChatCollection.findOne({
      participants: {
        $elemMatch: {
          $and: [
            {
              userId: body.userId
            },
            {
              userId: user.userId
            }
          ]
        }
      }
    })
    console.log({ alreadyExistsUser })

    if (alreadyExistsUser) {
      return res.status(200).json(alreadyExistsUser)
    }

    const newChat = {
      createdBy: user.userId,
      participants: [
        {
          userId: body.userId
        },
        {
          userId: user.userId
        }
      ]
    }
    console.log({ newChat })
    const chat = await ChatCollection.create(newChat)
    console.log({ chat })
    if (!_.size(user)) throw new CustomError(400, 'Failed to create the chat')

    res.status(201).json(chat)
  } catch (error) {
    return next(error)
  }
}

export const GetChats = async (req, res, next) => {
  try {
    const { user = {} } = req
    const chatList = await ChatCollection.find({
      participants: {
        $elemMatch: {
          userId: user.userId
        }
      }
    })

    res.status(200).json(chatList)
  } catch (error) {
    return next(error)
  }
}
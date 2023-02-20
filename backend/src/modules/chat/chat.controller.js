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
    const chat = await ChatCollection.create(newChat)
    if (!_.size(chat)) throw new CustomError(400, 'Failed to create the chat')

    res.status(201).json(chat)
  } catch (error) {
    return next(error)
  }
}

export const GetChats = async (req, res, next) => {
  try {
    const { user = {} } = req
    const chatList = await ChatCollection.aggregate([{
      $match: {
        participants: {
          $elemMatch: {
            userId: user.userId
          }
        }
      }
    },
    {
      $lookup: {
        from: "messages",
        let: { chatId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$$chatId', '$chatId'] }]
              }
            }
          },
          { $sort: { createdAt: -1 } },
          { $limit: 10 }
        ],
        as: "messages",
      }

    }])
    console.log({ user, chatList })

    res.status(200).json(chatList)
  } catch (error) {
    return next(error)
  }
}
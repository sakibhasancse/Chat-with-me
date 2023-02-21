import _ from 'lodash'
import bcrypt from 'bcryptjs'

import { CustomError } from '../../app/error.js'
import { appHelper, userHelper } from '../helpers.js'
import { ChatCollection } from './chat.model.js'


export const createChat = async (req, res, next) => {
  try {
    const { body = {}, user = {} } = req
    appHelper.checkRequiredFields(['userId'], body)
    if (user.userId === body.userId) {
      throw new CustomError(400, 'Participant user not found')
    }
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
      $addFields: {
        loggedInUser: user.userId
      }
    },
    {
      $addFields: {
        participantOtherUsers: {
          $filter: {
            input: '$participants',
            as: 'participant',
            cond: { $ne: ['$$participant.userId', '$loggedInUser'] }
          }

        }
      },
    },
    {
      $unwind: {
        path: '$participantOtherUsers',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'users',
        // localField: 'participantOtherUsers.userId',
        // foreignField: '_id',
        let: { userId: '$participantOtherUsers.userId' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$$userId', { $toString: '$_id' }]
              }
            }
          },
          {
            $project: {
              _id: 1,
              email: 1,
              name: 1
            }
          }
        ],
        as: 'userInfo'
      }
    },
    {
      $unwind: { path: '$userInfo', preserveNullAndEmptyArrays: true }
    },
    {
      $addFields: {
        'userInfo.profileUrl': 'https://www.w3schools.com/w3images/avatar2.png'
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
                $and: [{ $eq: ['$chatId', { $toString: '$$chatId' }] }]
              }
            }
          },
          { $sort: { createdAt: -1 } },
          { $limit: 20 }
        ],
        as: "messages",
      }

    },
    {
      $group: {
        _id: '$_id',
        participantOtherUsers: {
          $push: '$userInfo'
        },
        messages: {
          $first: '$messages'
        },
        lastMessage: {
          $first: '$lastMessage'
        },
        lastMessageAt: {
          $first: '$lastMessageAt'
        },
        createdAt: {
          $first: '$createdAt'
        }
      }
    },

    {
      $project: {
        _id: 1,
        participantOtherUsers: 1,
        messages: 1,
        lastMessage: 1,
        lastMessageAt: 1,
        createdAt: 1,
      }
    }])
    res.status(200).json(chatList)
  } catch (error) {
    return next(error)
  }
}
import _ from 'lodash'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
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
    console.log({
      userIds: body.userId
      ,
      userId: user.userId
    })
    const alreadyExistsUser = await ChatCollection.findOne({
      participants: {
        $all: [
          {
            $elemMatch: {
              userId: body.userId
            }
          },
          {
            $elemMatch: {
              userId: user.userId
            }
          }]
      }
    })
    console.log({ alreadyExistsUser, userId: body.userId, userI2d: user.userId })
    if (alreadyExistsUser) {
      return res.status(200).json(alreadyExistsUser)
    }

    const newChat = new ChatCollection({
      createdBy: user.userId,
      participants: [
        {
          userId: body.userId
        },
        {
          userId: user.userId
        }
      ]
    })
    const chat = await newChat.save()
    if (!_.size(chat)) throw new CustomError(400, 'Failed to create the chat')

    res.status(201).json(chat)
  } catch (error) {
    console.log({ error })
    return next(error)
  }
}

export const GetChats = async (req, res, next) => {
  try {
    const { user = {}, query = {} } = req
    const { limit = 10, skip = 0, messageLimit = 10, sort = { createdAt: -1 } } = query
    const matchQuery = {
      participants: {
        $elemMatch: {
          userId: user.userId
        }
      }
    }

    if (query?.chatId) matchQuery._id = query.chatId
    const chatList = await ChatCollection.aggregate([{
      $match: matchQuery
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
          { $limit: messageLimit }
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
    { $sort: sort },
    { $skip: Number(skip) },
    { $limit: Number(limit) },
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
    const totalDocuments = await ChatCollection.countDocuments(matchQuery)
    const responseData = {
      chatList,
      totalDocuments
    }
    res.status(200).json(responseData)
  } catch (error) {
    return next(error)
  }
}
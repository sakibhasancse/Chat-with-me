import _ from 'lodash'
import bcrypt from 'bcryptjs'

import { CustomError } from '../../app/error.js'
import { appHelper, userHelper } from '../helpers.js'
import { UserCollection } from '../models.js'

export const registerUser = async (req, res, next) => {
  try {
    const { body = {} } = req
    appHelper.checkRequiredFields(
      ['email', 'name', 'password', 'phoneNumber'],
      body
    )

    const userData = await userHelper.validateAndPrepareRegisterData(body)
    const user = await UserCollection.create(userData)
    if (!_.size(user)) throw new CustomError(400, 'Failed to create the user')
    res.status(201).json({
      email: user.email,
      name: user.name,
      userId: user._id,
      phoneNumber: user.phoneNumber
    })
  } catch (error) {
    return next(error)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { body = {} } = req
    appHelper.checkRequiredFields(['email', 'password'], body)

    const user = await userHelper.getAUser({ email: body.email })
    if (!user) throw new CustomError(404, 'User not found.')

    const isPasswordMatch = await bcrypt.compare(body.password, user.password)
    if (!isPasswordMatch)
      throw new CustomError(400, 'Invalid email or password')

    const tokens = await userHelper.getAuthTokens(user)
    if (!tokens) throw new CustomError(500, 'Internal server error')

    res.status(200).json({
      tokens,
      status: 'success'
    })
  } catch (error) {
    return next(error)
  }
}

export const getRefreshToken = async (req, res, next) => {
  try {
    const { body = { refreshToken } } = req
    if (refreshToken) {
      const user = appHelper.verifyJwtToken(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      if (!user || user?.userId !== body?.user?.userId) throw new CustomError(400, 'User not found')
    } else throw new CustomError(400, 'Unauthenticated request')

    const tokens = await userHelper.getAuthTokens(body?.user)
    if (!tokens) throw new CustomError(500, 'Internal server error')

    res.status(200).json({
      tokens,
      status: 'success'
    })
  } catch (error) {
    return next(error)
  }
}


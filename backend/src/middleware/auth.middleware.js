import jwt from 'jsonwebtoken'

import { CustomError } from '../app/error.js'
import { userHelper } from '../modules/helpers.js'

export const Private = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (
      !authorization ||
      (authorization && !authorization.startsWith('Bearer'))
    )
      throw new CustomError(401, 'Unauthenticated request')

    const token = authorization.replace('Bearer ', '')

    if (!token) throw new CustomError(401, 'Unauthenticated request')

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await userHelper.getAUser(decoded.userId)
    if (!user) throw new CustomError(404, 'User not found')
    req.user = { userId: user._id, ...user }
    return next()
  } catch (error) {
    return next(error)
  }
}

export const checkAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (
      !authorization ||
      (authorization && !authorization.startsWith('Bearer'))
    )
      return next()

    const token = authorization.replace('Bearer ', '')
    if (token) {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      const user = await userHelper.getAUser(decoded?.userId)
      req.user = { userId: user._id, ...user }
    }
    return next()
  } catch (error) {
    return next()
  }
}

export const checkRefreshToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (
      !authorization ||
      (authorization && !authorization.startsWith('Bearer'))
    )
      throw new CustomError(401, 'Unauthenticated request')

    const token = authorization.replace('Bearer ', '')
    if (token) {
      const decoded = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)
      const user = await userHelper.getAUser(decoded?.userId)
      req.user = { userId: user._id, ...user }
    }
    return next()
  } catch (error) {
    return next()
  }
}
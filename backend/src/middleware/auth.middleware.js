import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { CustomError } from '../app/error.js'
import { userHelper } from '../modules/helpers.js'
import { verifyJwtToken } from '../app/appHelper.js'
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
    // console.log({ token })
    const decoded = await verifyJwtToken(token, process.env.ACCESS_TOKEN_SECRET)
    // console.log({ decoded })
    if (!decoded) {
      throw new CustomError(404, 'Unauthenticated user')
    }
    const query = { _id: decoded.userId }
    const user = await userHelper.getAUser(query)
    if (!user) throw new CustomError(404, 'Unauthenticated user')
    req.user = { userId: user._id, ...user }
    return next()
  } catch (error) {
    console.log('From private', error)
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
      const decoded = await verifyJwtToken(token, process.env.ACCESS_TOKEN_SECRET)
      const query = {
        _id: decoded.userId
      }
      const user = await userHelper.getAUser(query)
      if (!user) throw new CustomError(404, 'Unauthenticated user')
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
      const decoded = await verifyJwtToken(token, process.env.ACCESS_TOKEN_SECRET)
      const user = await userHelper.getAUser(decoded?.userId)
      req.user = { success: true, userId: user._id, ...user }
    }
    return next()
  } catch (error) {
    return next()
  }
}
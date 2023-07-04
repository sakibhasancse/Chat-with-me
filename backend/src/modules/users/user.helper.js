import jwt from 'jsonwebtoken'
import { CustomError } from '../../app/error.js'
import { appHelper } from '../helpers.js'
import { UserCollection } from '../models.js'

export const getAUser = async (query = {}) => {
  console.log({ query })
  const user = await UserCollection.findOne(query)
  console.log({ user })
  return user
}

export const validateAndPrepareRegisterData = async (body = {}) => {
  const { email, name, password, phoneNumber } = body
  const userExists = await getAUser({ email })
  console.log({ email, userExists })
  if (userExists) {
    throw new CustomError(400, 'User exists with email')
  }
  const userData = {
    email,
    name,
    password,
    phoneNumber
  }
  return userData
}

export const getAuthTokens = async (user = {}) => {
  const { email, name, _id } = user
  const data = {
    userId: _id,
    email,
    name
  }
  console.log({ data, user })
  const signAccessToken = appHelper.signJwtToken(data, process.env.ACCESS_TOKEN_SECRET, '6h')
  const signRefreshToken = appHelper.signJwtToken({ userId: _id }, process.env.REFRESH_TOKEN_SECRET, '60d')
  const [accessToken, refreshToken] = await Promise.all([signAccessToken, signRefreshToken]);
  return { accessToken, refreshToken };
}

export const prepareProfileData = (params) => {
  const updatedData = {}
  if (params.hasOwnProperty('name')) {
    updatedData.name = params.name
  }
  if (params.hasOwnProperty('phone')) {
    updatedData.phone = params.phone
  }
  if (params.hasOwnProperty('description')) {
    updatedData.description = params.description
  }
  if (params.hasOwnProperty('designation')) {
    updatedData.designation = params.designation
  }
  if (params.hasOwnProperty('name')) {
    updatedData.name = params.name
  }
  if (params.hasOwnProperty('profile_url')) {
    updatedData.profile_url = params.profile_url
  }
  if (params.hasOwnProperty('address')) {
    updatedData.address = params.address
  }

  //Links

  if (params.hasOwnProperty('website')) {
    updatedData['links.website'] = params.website
  }
  if (params.hasOwnProperty('tweeter')) {
    updatedData['links.tweeter'] = params.tweeter
  }
  if (params.hasOwnProperty('instragram')) {
    updatedData['links.instragram'] = params.instragram
  }
  if (params.hasOwnProperty('facebook')) {
    updatedData['links.facebook'] = params.facebook
  }
  return updatedData
}
import jwt from 'jsonwebtoken'
import _ from 'lodash'
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
  let updatedData = {}
  if (params.hasOwnProperty('name')) {
    updatedData.name = params.name
  }
  if (params.hasOwnProperty('phoneNumber')) {
    updatedData.phoneNumber = params.phoneNumber
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

  const links = []
  if (params.hasOwnProperty('website')) {
    links.push({ name: "website", url: params.website })
  }
  if (params.hasOwnProperty('tweeter')) {
    links.push({ name: "tweeter", url: params.tweeter })
  }
  if (params.hasOwnProperty('instragram')) {
    links.push({ name: "instragram", url: params.website })
  }
  if (params.hasOwnProperty('facebook')) {
    links.push({ name: "facebook", url: params.facebook })
  }
  if (_.size(updatedData)) updatedData = { $set: updatedData }
  if (_.size(links)) updatedData.$addToSet = { links: { $each: links } }
  return updatedData
}
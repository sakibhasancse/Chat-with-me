import { UserCollection } from '../../modules/models.js'

export const cleanUsers = async () => {
  await UserCollection.createCollection()
  await UserCollection.init()
  await UserCollection.deleteMany({})
}

export const createAUser = async (user) => {
  const userInfo = await UserCollection.create(user)
  return userInfo
}

export const seedAllDataForLoginPostRequest = async (params = {}) => {
  await cleanUsers()
  const { user } = params
  const userInfo = await createAUser(user)

  return {
    ...user,
    _id: userInfo._id
  }
}

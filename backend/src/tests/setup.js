import { UserTestHelper } from './helpers.js'
import { getLoginToken } from '../modules/users/user.helper.js'
import { testData } from './testdata.js'

export const getAuthenticatedUserAndToken = async () => {
  const { user } = testData()
  await UserTestHelper.cleanUsers()

  const userInfo = await UserTestHelper.createAUser(user)
  const token = getLoginToken(userInfo)
  return {
    userInfo,
    token
  }
}

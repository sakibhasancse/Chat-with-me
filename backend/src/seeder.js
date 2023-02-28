import dotenv from 'dotenv'
import slugify from 'slugify'

import {
  PostCollection,
  UserCollection
} from './modules/models.js'
import users from './data/users.js'
import initConnection from './app/mongodb.js'

dotenv.config()
initConnection()

const cleanUsers = async () => {
  await UserCollection.createCollection()
  await UserCollection.init()
  await UserCollection.deleteMany()
}


const seedUsers = async (data = []) => {
  const userPromiseArr = []
  data.map(async (user) => {
    userPromiseArr.push(UserCollection.create(user))
  })

  if (userPromiseArr.length) await Promise.all(userPromiseArr)
  console.log('Successfully users seeded')
}

const importData = async () => {
  try {
    // Seed new data
    await seedUsers(users)
    await seedposts(posts)

    console.log('Successfully seeded all data')
    process.exit()
  } catch (error) {
    console.log('Failed to seed data, error:', error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await cleanUsers()

    console.log('Successfully deleted all collection')
    process.exit()
  } catch (error) {
    console.log('Failed to destroy data, error:', error)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') destroyData()
else importData()

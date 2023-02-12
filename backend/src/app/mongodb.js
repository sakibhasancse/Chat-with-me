import mongoose from 'mongoose'

const initConnection = async () => {
  try {
    const dbUrl =
      process.NODE_ENV === 'test'
        ? process.env.MONGO_TEST_URL
        : process.env.MONGO_URL
    const connection = await mongoose.connect(dbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    console.log(`MongoDB Connected: ${connection.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}
export default initConnection

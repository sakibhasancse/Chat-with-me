import mongoose from 'mongoose'

const initConnection = async () => {
  try {
    const dbUrl =
      process.NODE_ENV === 'test'
        ? process.env.MONGO_TEST_URL
        : process.env.MONGO_URL
    const connection = await mongoose.connect(dbUrl, {
      useUnifiedTopology: true,
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      autoIndex: false, // Don't build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    })
    mongoose.connection.on('error', err => {
      console.log(`MongoDB Connection error: ${err}`)
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`)
  } catch (error) {
    console.log({ error })
    console.error(`Error: ${error.message}`)
    // process.exit(1)
  }
}
export default initConnection

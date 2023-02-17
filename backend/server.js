import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { Server } from "socket.io";


import routers from './src/routers.js'
import initConnection from './src/app/mongodb.js'
import { handleError } from './src/middleware/error.middleware.js'

dotenv.config()

initConnection()
const app = express()

app.use(cors())
app.use(express.json())
app.use(routers)
app.use(handleError)

const PORT = process.env.PORT || 8080
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);
})
export default app

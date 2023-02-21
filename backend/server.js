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
  console.log(`New connection: ${socket.id}`, socket.data);
  // console.log('socket', socket)
  socket.emit("me", socket.id)

  socket.on('user-join', ({ userId }) => {
    console.log(`A user joined userId-${userId}`);
    socket.join(`userId-${userId}`);
  });

  socket.on('user-send-message', ({ name, toUserId, chatId, newMessage, fromUserId }) => {
    socket
      .to(`userId-${toUserId}`)
      .emit('receive-message', {
        chatId: chatId,
        newMessage: newMessage,
        name,
        fromUserId
      });
  });

  socket.on('msgUser', ({ name, to, msg, sender }) => {
    console.log('ss', { name, to, msg, sender })
    io.to(to).emit("msgRcv", { name, msg, sender });
  })

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    console.log({ userToCall, from, name })
    io.to(userToCall).emit("callUser", {
      signal: signalData,
      from,
      name,
    });
  });

  socket.on("answerCall", (data) => {
    console.log({ data })
    socket.broadcast.emit("updateUserMedia", {
      type: data.type,
      currentMediaStatus: data.myMediaStatus,
    });
    io.to(data.to).emit("callAccepted", data);
  });

  socket.on("endCall", ({ id }) => {
    io.to(id).emit("endCall");
  });
})
export default app

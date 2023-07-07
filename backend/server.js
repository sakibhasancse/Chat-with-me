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

  console.log("initial transport", socket.conn.transport.name); // prints "polling"

  console.log('rooms', socket.rooms)
  socket.use(([event, ...args], next) => {
    // console.log({ event, args })
    // if (isUnauthorized(event)) {
    //   return next(new Error("unauthorized event"));
    // }
    // return next(new Error("unauthorized event"));
    next();
  });

  socket.on("error", (err) => {
    console.log({ err })
    if (err && err.message === "unauthorized event") {
      socket.disconnect();
    }
  });
  socket.conn.once("upgrade", () => {
    // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
    // console.log("upgraded transport", socket.conn.transport.name); // prints "websocket"
  });

  socket.conn.on("packet", ({ type, data }) => {
    // console.log("upgraded packet", { type, data }); // prints "websocket"
    // called for each packet received
  });

  socket.conn.on("packetCreate", ({ type, data }) => {
    // called for each packet sent
    // console.log("upgraded packetCreate", { type, data }); // prints "websocket"
  });

  socket.conn.on("drain", () => {
    // console.log("upgraded packdrainetCreate"); // prints "websocket"
    // called when the write buffer is drained
  });

  socket.conn.on("close", (reason) => {
    // console.log("upgraded reason", reason); // prints "websocket"
    // called when the underlying connection is closed
  });

  io.use((socket, next) => {
    // console.log('sss', socket.request)
    next();

  });
  socket.on("disconnecting", (reason) => {
    // console.log({ reason })
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit("user has left", socket.id);
      }
    }
  });
  // console.log('socket', socket)
  socket.emit("me", socket.id)

  socket.on('user-join', ({ userId }) => {
    // console.log(`A user joined userId-${userId}`);
    socket.join(`userId-${userId}`);
  });

  socket.on('user-send-message', ({ name, toUserId, chatId, newMessage, fromUserId }) => {
    console.log('message send', `userId-${toUserId}`)
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
    // console.log('ss', { name, to, msg, sender })
    io.to(to).emit("msgRcv", { name, msg, sender });
  })

  socket.on("callUser", ({ toUserId, signalData, fromUserId, name, chatId }) => {
    console.log({ toUserId, fromUserId, name })
    io.to(`userId-${toUserId}`).emit("callUser", {
      signalData: signalData,
      fromUserId,
      chatId,
      name,
    });
  });

  socket.on("answerCall", (data) => {
    console.log({ data })
    socket.broadcast.emit("updateUserMedia", {
      type: data.type,
      currentMediaStatus: data.myMediaStatus,
    });
    io.to(`userId-${data.toUserId}`).emit("callAccepted", data);
  });

  socket.on("updateMyMedia", ({ type, currentMediaStatus }) => {
    console.log("updateMyMedia", type);
    socket.broadcast.emit("updateUserMedia", { type, currentMediaStatus });
  });

  socket.on("endCall", (data) => {
    console.log('call end', data)
    io.to(data.id).emit("endCall");
  });
})
export default app

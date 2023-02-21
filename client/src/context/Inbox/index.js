import InboxContext from "./inboxContext"
import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";

import { API_URL } from "./inbox-helper";
export const socket = io(API_URL);

const InboxProvider = ({ children }) => {
  const [chatList, setChatList] = useState([])
  const [messages, setMessages] = useState([])

  const myVideo = useRef();
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      console.log('c', currentStream)
      // myVideo.current.srcObject = currentStream;
    })
    console.log({ API_URL })
    socket.on("connection", (id) => {
      console.log('hello', id)
    });

    socket.on("error", (id) => {
      console.log('hello', id)
    });

    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
      // else the socket will automatically try to reconnect
    });
  }, [])

  const sendNewMessage = (value) => {
    console.log({ value })
    setMessages(oldMessage => [...oldMessage, value])
    // socket.emit("msgUser", { name, to: otherUser, msg: value, sender: name });
  }

  return (
    <InboxContext.Provider value={{ sendNewMessage, chatList, setChatList, setMessages, messages }}>
      {children}
    </InboxContext.Provider>
  )
}

export default InboxProvider
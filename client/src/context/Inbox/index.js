
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";

import InboxContext from "./inboxContext"
import { AuthContext } from '../AuthContext/index'
import socket from "../../socket";
import { createChat, sendMessage } from "../../data/chat";


const InboxProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  const [chatList, setChatList] = useState([])
  const [messages, setMessages] = useState([])
  const [currentChatId, setCurrentChatId] = useState('')

  const navigate = useNavigate()


  useEffect(() => {
    socket.emit("connection", { data: user?.userId, s: 'ss' });
    socket.emit('user-join', { userId: user?.userId });

    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });

    socket.on("receive-message", (data,) => {
      console.log('data', data)
      setMessages(oldMessage => [...oldMessage, data.newMessage])
    })

    socket.on("error", (data) => {
      console.log('data', data)

    })
  }, [])


  const sendNewMessage = async (value) => {
    const otherUser = chatList.find(chatItem => chatItem._id === currentChatId)
    console.log({ value })
    setMessages(oldMessage => [...oldMessage, value])
    console.log('users', {
      name: user.name, ss: otherUser.participantOtherUsers[1]?._id, toUserId: otherUser.participantOtherUsers[0]?._id, chatId: currentChatId, newMessage: value, fromUserId: user.userId
    })
    socket.emit("user-send-message", { name: user.name, toUserId: otherUser.participantOtherUsers[0]?._id, chatId: currentChatId, newMessage: value, fromUserId: user.userId });
    await sendMessage(currentChatId, value?.content)
  }

  const handleMessage = (userId) => {
    createChat(userId)
      .then(res => {
        if (res._id) navigate(`/inbox/${res?._id}`)
      }).catch(err => {
        console.log({ err })
      })
  }

  return (
    <InboxContext.Provider value={{
      currentChatId,
      sendNewMessage,
      chatList,
      setChatList,
      setMessages,
      messages,
      setCurrentChatId,
      handleMessage
    }}>
      {children}
    </InboxContext.Provider>
  )
}

export default InboxProvider
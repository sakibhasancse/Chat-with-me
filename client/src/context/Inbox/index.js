
import { useRef, useEffect, useState, useContext } from "react";
import Peer from "simple-peer";

import InboxContext from "./inboxContext"
import { AuthContext } from '../AuthContext/index'
import socket from "../../socket";

const InboxProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  const [stream, setStream] = useState();
  const [chatList, setChatList] = useState([])
  const [messages, setMessages] = useState([])
  const [currentChatId, setCurrentChatId] = useState('')


  // Other user
  const [userVdoStatus, setUserVdoStatus] = useState();
  const [userMicStatus, setUserMicStatus] = useState();
  const [otherUsers, setOtherUsers] = useState([])

  const myVideo = useRef();

  useEffect(() => {
    console.log({ user })
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      console.log('c', currentStream)
      setStream(currentStream);
      // myVideo.current.srcObject = currentStream;
    })
    socket.emit("connection", { data: user?.userId, s: 'ss' });
    socket.emit('user-join', { userId: user?.userId });

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


    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    socket.on("updateUserMedia", ({ type, currentMediaStatus }) => {
      if (currentMediaStatus !== null || currentMediaStatus !== []) {
        switch (type) {
          case "video":
            setUserVdoStatus(currentMediaStatus);
            break;
          case "mic":
            setUserMicStatus(currentMediaStatus);
            break;
          default:
            setUserMicStatus(currentMediaStatus[0]);
            setUserVdoStatus(currentMediaStatus[1]);
            break;
        }
      }
    });

    socket.on("receive-message", (data) => {
      console.log('ss', data)
      setMessages(oldMessage => [...oldMessage, data.newMessage])
    })
  }, [])

  const sendNewMessage = (value) => {
    const otherUser = chatList.find(chatItem => chatItem._id === currentChatId)
    console.log({ value })
    setMessages(oldMessage => [...oldMessage, value])
    console.log('users', {
      name: user.name, ss: otherUser.participantOtherUsers[1]?._id, toUserId: otherUser.participantOtherUsers[0]?._id, chatId: currentChatId, newMessage: value, fromUserId: user.userId
    })
    socket.emit("user-send-message", { name: user.name, toUserId: otherUser.participantOtherUsers[0]?._id, chatId: currentChatId, newMessage: value, fromUserId: user.userId });
  }

  const callUser = (currentUser = {}) => {
    const otherUser = chatList.find(chatItem => chatItem._id === currentChatId)
    console.log({ otherUser, ss: otherUser.participantOtherUsers })
    const peer = new Peer({ initiator: true, trickle: false, stream })
    peer.on("signal", (data) => {
      console.log({
        otherUsers,
        userToCall: otherUser.participantOtherUsers[0]?._id,
        signalData: data,
        from: currentUser.userId,
        name: currentUser.name,
      })
      socket.emit("callUser", {
        userToCall: otherUser?.participantOtherUsers[0]?._id,
        signalData: data,
        from: currentUser.userId,
        name: currentUser.name,
      });
    })

    peer.on("stream", (currentStream) => {
      console.log('currentStream', currentStream)
    });

    console.log('call')
  }

  return (
    <InboxContext.Provider value={{ setOtherUsers, sendNewMessage, chatList, setChatList, setMessages, messages, setCurrentChatId, callUser }}>
      {children}
    </InboxContext.Provider>
  )
}

export default InboxProvider
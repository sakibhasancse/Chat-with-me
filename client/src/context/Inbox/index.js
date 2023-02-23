
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
  const userVideo = useRef()

  // my status 
  const [myMicStatus, setMyMicStatus] = useState(true);
  const [myVdoStatus, setMyVdoStatus] = useState(true);

  const [call, setCall] = useState({})

  const myVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    console.log({ user })
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      console.log('c', currentStream)
      setStream(currentStream);
      myVideo.current.srcObject = currentStream;
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


    socket.on("callUser", ({ fromUserId, name, signal }) => {
      console.log({ fromUserId, name, signal })
      setCall({ isReceivingCall: true, fromUserId, name, signal });
    });

    socket.on("updateUserMedia", ({ type, currentMediaStatus }) => {
      console.log('updateUserMedia', type, currentMediaStatus)
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


    socket.on("callAccepted", ({ signal, userName }) => {
      setCall(oldInfo => ({ ...oldInfo, callAccepted: true, userName }));
      console.log('callAccepted')
      peer.signal(signal);
      socket.emit("updateMyMedia", {
        type: "both",
        currentMediaStatus: [myMicStatus, myVdoStatus],
      });
    });
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
    const peer = new Peer({ initiator: true, trickle: false, stream })
    peer.on("signal", (data) => {
      console.log({
        toUserId: otherUser.participantOtherUsers[0]?._id,
        chatId: currentChatId,
        fromUserId: user.userId,
        signalData: data,
        name: user.name,
      })

      socket.emit("callUser", {
        toUserId: otherUser.participantOtherUsers[0]?._id,
        chatId: currentChatId,
        fromUserId: user.userId,
        signalData: data,
        name: user.name,
      });
    })

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", ({ signal, userName }) => {
      setCall(oldInfo => ({ ...oldInfo, callAccepted: true, userName }));
      console.log({ userName })
      peer.signal(signal);
      socket.emit("updateMyMedia", {
        type: "both",
        currentMediaStatus: [myMicStatus, myVdoStatus],
      });
    });

    connectionRef.current = peer;
    console.log(connectionRef.current);
  }

  const answerCall = () => {
    const peer = new Peer({ initiator: false, trickle: false, stream });
    console.log('answerCall', {
      myMicStatus, myVdoStatus
    })
    console.log({ peer })
    peer.on("signal", (data) => {
      console.log('signal1', call.fromUserId, call.toUserId)
      socket.emit("answerCall", {
        signalData: data,
        toUserId: call.fromUserId,
        userName: user.name,
        type: "both",
        myMediaStatus: [myMicStatus, myVdoStatus],
      });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
    console.log(connectionRef.current);
  }

  return (
    <InboxContext.Provider value={{ currentChatId, setMyVdoStatus, myVdoStatus, stream, myVideo, userVideo, answerCall, call, setOtherUsers, sendNewMessage, chatList, setChatList, setMessages, messages, setCurrentChatId, callUser }}>
      {children}
    </InboxContext.Provider>
  )
}

export default InboxProvider
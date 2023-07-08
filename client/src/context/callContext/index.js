
import { useRef, useEffect, useState, useContext, createContext } from "react";
import Peer from "simple-peer";

import { AuthContext } from '../AuthContext/index'
import socket from "../../socket";

export const CallContext = createContext();


const CallProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  const [stream, setStream] = useState();

  // Other user
  const [userVdoStatus, setUserVdoStatus] = useState();
  const [userMicStatus, setUserMicStatus] = useState();
  const [otherUsers, setOtherUsers] = useState([])
  const userVideo = useRef(null)

  // my status 
  const [myMicStatus, setMyMicStatus] = useState(true);
  const [myVdoStatus, setMyVdoStatus] = useState(true);
  const [screenShare, setScreenShare] = useState(false)

  const [call, setCall] = useState({})

  const [calling, setCalling] = useState(false)

  // Status of call page
  const [endCall, setEndCall] = useState(false)
  const [cancelCall, setCancelCall] = useState(false)


  // local state
  const [otherUserIds, setOtherUserIds] = useState([])

  const myVideo = useRef(null);
  const connectionRef = useRef();

  useEffect(() => {
    try {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          console.log('c', currentStream)
          setStream(currentStream);
          if (myVideo.current) myVideo.current.srcObject = currentStream;
        }).catch(err => {
          console.log({ err })
        })
    } catch (error) {
      console.log({ error })
    }

    socket.emit("connection", { data: user?.userId, s: 'ss' });

    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
      // else the socket will automatically try to reconnect
    });


    socket.on("callUser", ({ fromUserId, name, signalData, chatId }) => {
      console.log({ fromUserId, name, signalData, chatId })
      setCall({ isReceivingCall: true, fromUserId, name, signal: signalData, chatId });
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

    socket.on("declineCall", () => {
      console.log("call declineCall")
      setCalling(false)
      setCancelCall(true)
      setCall({})
    })

    socket.on("cancelCall", () => {
      console.log("call cancelCall")
      setCall({})
    })

    socket.on("endCall", () => {
      console.log("end call")
      setEndCall(true)
      setCall({})
      // window.location.reload();
    });
  }, [])


  const callUser = (participantOtherUsers, currentChatId) => {
    try {
      const toUserIds = participantOtherUsers.map((participantOtherUser) => participantOtherUser._id)
      console.log({ toUserIds })
      const peer = new Peer({ initiator: true, trickle: false, stream })

      console.log('callUser', {
        toUserId: toUserIds[0],
        chatId: currentChatId,
        fromUserId: user.userId,
        name: user.name,
        toUserIds: toUserIds
      })

      peer.on("signal", (data) => {
        console.log('ans')
        socket.emit("callUser", {
          toUserId: toUserIds[0],
          chatId: currentChatId,
          fromUserId: user.userId,
          signalData: data,
          name: user.name,
          toUserIds: toUserIds
        });
      })


      socket.on("callAccepted", ({ signalData, userName, name }) => {
        console.log('callAccepted', userName, name, signalData)
        setCall(oldInfo => ({ ...oldInfo, callAccepted: true, name, userName }));
        peer.signal(signalData);

        socket.emit("updateMyMedia", {
          type: "both",
          currentMediaStatus: [myMicStatus, myVdoStatus],
        });
      });
      console.log('stream')
      peer.on("stream", (currentStream) => {
        console.log('stream, from ans call', currentStream)
        userVideo.current.srcObject = currentStream;
      });
      console.log('end stream')

      // peer.on('data', data => {
      //   console.log('Received a message from the remote peer')
      // })
      console.log('connect')
      peer.on('connect', data => {
        console.log('Successfully connected to user', data)
      })
      console.log('track')
      peer.on('track', (track, stream) => {
        console.log('Successfully connected to user track')
      })
      console.log('error')
      peer.on('error', (err) => {
        console.log('Error connected to user track', err)
      })
      connectionRef.current = peer;
      console.log(connectionRef.current);
      setOtherUserIds(toUserIds)
    } catch (error) {
      console.log("Error in call user", error)
    }
  }

  const resetAll = () => {
    setEndCall(false)
    setCancelCall(false)
  }

  const answerCall = () => {
    resetAll()
    setCall(oldInfo => ({ ...oldInfo, callAccepted: true }))
    console.log({ call })
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signalData: data,
        toUserId: call.fromUserId,
        userName: user.name,
        name: user.name,
        type: "both",
        myMediaStatus: [myMicStatus, myVdoStatus],
      });
    });
    peer.signal(call.signal);
    connectionRef.current = peer;

    // peer.on('data', data => {
    //   console.log('Received a message from the remote peer')
    // })
    peer.on('connect', data => {
      console.log('Successfully connected to user')
    })
    peer.on("stream", (currentStream) => {
      console.log('stream, from receive call', userVideo)
      // if (userVideo.current) userVideo.current.srcObject = currentStream
      // else
      // userVideo.current = currentStream
      userVideo.current.srcObject = currentStream
    });
    peer.on('track', (track, stream) => {
      console.log('Successfully connected to user track', track, stream)
    })
    peer.on('error', (err) => {
      console.log('Error connected to user track', err)
    })

    console.log(connectionRef.current);
    console.log('userVideo', userVideo);
    console.log('call', call.signal)


  }



  const leaveCall = () => {
    setCall(oldCall => ({ ...oldCall, callEnded: true }));
    console.log({ call, otherUserIds })
    socket.emit("endCall", { toUserId: call?.fromUserId || otherUserIds[0] });
    setEndCall(true)
    connectionRef.current.destroy();
    // window.location.reload();
  }

  const handlerCancelCall = () => {
    socket.emit("cancelCall", { toUserId: otherUserIds[0] });
    setCancelCall(true)
  }

  const handlerDeclineCall = () => {
    console.log('declineCall', { call })
    socket.emit("declineCall", { toUserId: call.fromUserId });
  }

  return (
    <CallContext.Provider value={{
      setMyMicStatus,
      myMicStatus,
      userVdoStatus,
      userMicStatus,
      setStream,
      setMyVdoStatus,
      myVdoStatus,
      stream,
      myVideo,
      userVideo,
      answerCall,
      call,
      setOtherUsers,
      callUser,
      leaveCall,
      screenShare,
      setScreenShare,
      connectionRef,
      handlerCancelCall,
      handlerDeclineCall,
      endCall, setEndCall,
      cancelCall, setCancelCall,
      calling, setCalling,
      resetAll
    }}>
      {children}
    </CallContext.Provider>
  )
}

export default CallProvider



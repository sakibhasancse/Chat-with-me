
import { useRef, useEffect, useState, useContext } from "react";
import Peer from "simple-peer";

import CallContext from "./callContext"
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
  const userVideo = useRef()

  // my status 
  const [myMicStatus, setMyMicStatus] = useState(true);
  const [myVdoStatus, setMyVdoStatus] = useState(true);
  const [screenShare, setScreenShare] = useState(false)

  const [call, setCall] = useState({})

  const myVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    try {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          console.log('c', currentStream)
          setStream(currentStream);
          myVideo.current.srcObject = currentStream;
          console.log('ssss', userVideo, myVideo)
        }).catch(err => {
          console.log({ err })
        })
    } catch (error) {
      console.log('ss', { error })
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

    socket.on("endCall", () => {
      window.location.reload();
    });
  }, [])


  const callUser = (currentUser = {}) => {
    const otherUser = chatList.find(chatItem => chatItem._id === currentChatId)
    const peer = new Peer({ initiator: true, trickle: false, stream })
    console.log('callUser', {
      stream
    })
    peer.on("signal", (data) => {
      console.log('ans')
      socket.emit("callUser", {
        toUserId: otherUser.participantOtherUsers[0]?._id,
        chatId: currentChatId,
        fromUserId: user.userId,
        signalData: data,
        name: user.name,
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
  }

  const answerCall = () => {
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
    peer.on("stream", (currentStream) => {
      console.log('stream, from receive call', currentStream)
      userVideo.current.srcObject = currentStream
    });

    peer.signal(call.signal);
    connectionRef.current = peer;

    // peer.on('data', data => {
    //   console.log('Received a message from the remote peer')
    // })
    peer.on('connect', data => {
      console.log('Successfully connected to user')
    })
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
    connectionRef.current.destroy();
    socket.emit("endCall", { id: call.fromUserId });
    window.location.reload();
  }

  const cancelCall = () => {
    socket.emit("endCall", { id: call.fromUserId });
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
      cancelCall
    }}>
      {children}
    </CallContext.Provider>
  )
}

export default CallProvider


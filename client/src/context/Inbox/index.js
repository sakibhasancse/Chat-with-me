import InboxContext from "./inboxContext"
import { useRef, useEffect } from "react";
import { io } from "socket.io-client";

import { API_URL } from "./inbox-helper";
export const socket = io(API_URL);

const InboxProvider = ({ children }) => {

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

  return (
    <InboxContext.Provider value={{}}>
      {children}
    </InboxContext.Provider>
  )
}

export default InboxProvider
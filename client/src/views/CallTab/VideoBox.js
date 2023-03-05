import React, { useContext, useEffect } from "react";

import { AuthContext } from '../../context/AuthContext';
import VideoOff from "../../assets/images/video-off.svg";
import BottomIcons from "./BottomIcons";
import { CallContext } from "../../context/callContext";

const VideoBox = ({ isCallAcceptedTab }) => {
  const { stream, call = {}, myVdoStatus, myVideo, setStream } = useContext(CallContext);
  const { user } = useContext(AuthContext)
  const handleFullScreen = () => {

  }
  useEffect(() => {
    // if (!myVideo?.current) {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        console.log('c', currentStream)
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      }).catch(err => {
        console.log({ err })
      })
    // }

  }, [])
  console.log({ call, myVdoStatus, myVideo })
  return (
    <div class="card" style={{ minHeight: 400 }}>
      {
        stream && (
          <div
            style={{ textAlign: "center" }}
            id={call.callAccepted && !call.callEnded ? "video1" : "video3"}
          >
            <div style={{ height: "2rem" }}>
              <h3>{myVdoStatus && user?.name}</h3>
            </div>
            <div className="video-avatar-container">
              <video
                playsInline
                muted
                onClick={handleFullScreen}
                ref={myVideo}
                autoPlay
                className="video-active"
                style={{
                  opacity: `${myVdoStatus ? "1" : "0"}`,
                }}
              />
            </div>
          </div>
        )}
      { !myVdoStatus && (
        <div className="bouncing-loader">
          <img src={VideoOff} alt="video off icon" />
        </div>
      )}
      <BottomIcons />
    </div>
  )
}

export default VideoBox
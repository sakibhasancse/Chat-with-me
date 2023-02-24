import React, { useState, useContext, useEffect, useRef } from "react";
import { Input, Button, Tooltip, Modal, message, Row, Col, } from "antd";
import { useLocation } from 'react-router-dom'
import queryString from 'query-string';
import { size } from 'lodash'
import InboxContext from '../../../context/Inbox/inboxContext';
import { AuthContext } from '../../../context/AuthContext';
import Msg from "../../../assets/images/msg.svg";
import ScreenShare from '../../../assets/images/share_screen.svg'
import VideoIcon from "../../../assets/images/video.svg";
import VideoOff from "../../../assets/images/video-off.svg";
import Msg_Illus from "../../../assets/images/msg_illus.svg";
import BottomIcons from "./BottomIcons";
import Avatar from "antd/es/avatar/avatar";

const VideoBox = () => {
  const { stream, call = {}, answerCall, myVdoStatus, myVideo, myMicStatus, userVideo, setMyVdoStatus, setMessages, setCurrentChatId, userVdoStatus, userMicStatus, sendNewMessage } = useContext(InboxContext);
  const { user } = useContext(AuthContext)
  const handleFullScreen = () => {

  }

  return (
    <div class="card" style={{ minHeight: 400 }}>
      {
        !stream ? (
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

              <Avatar
                style={{
                  backgroundColor: "#116",
                  position: "absolute",
                  opacity: `${myVdoStatus ? "-1" : "2"}`,
                }}
                size={98}
                icon={!user?.name && <UserOutlined />}
              >
                {user?.name}
              </Avatar>
            </div>
          </div>
        ) : (
          <div className="bouncing-loader">
            <img src={VideoOff} alt="video off icon" />
          </div>
        )}
      <BottomIcons />
    </div>
  )
}

export default VideoBox
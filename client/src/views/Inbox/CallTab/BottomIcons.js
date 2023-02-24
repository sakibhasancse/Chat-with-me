import React, { useState, useContext, useEffect, useRef } from "react";
import { Input, Button, Tooltip, Modal, message, Row, Col, Dropdown, Space } from "antd";
import { useLocation } from 'react-router-dom'
import { AudioMutedOutlined, CheckOutlined, DownOutlined, SettingOutlined, SmileOutlined, UserDeleteOutlined } from '@ant-design/icons';

import queryString from 'query-string';
import { size } from 'lodash'
import InboxContext from '../../../context/Inbox/inboxContext';
import Msg from "../../../assets/images/msg.svg";
import ScreenShare from '../../../assets/images/share_screen.svg'
import VideoIcon from "../../../assets/images/video.svg";
import VideoOff from "../../../assets/images/video-off.svg";
import Msg_Illus from "../../../assets/images/msg_illus.svg";

const BottomIcons = () => {
  const { stream, call = {}, answerCall, myVdoStatus, myVideo, myMicStatus, userVideo, setMyVdoStatus, setMessages, setCurrentChatId, userVdoStatus, userMicStatus, sendNewMessage } = useContext(InboxContext);

  const handleVideoSharing = () => {
    setMyVdoStatus((currentStatus) => {
      socket.emit("updateMyMedia", {
        type: "video",
        currentMediaStatus: !currentStatus,
      });
      stream.getVideoTracks()[0].enabled = !currentStatus;
      return !currentStatus;
    });
  }
  
  const handleMic = () => {

  }

  const handleSound = () => {

  }

  return (
    <div className="iconsDiv">
      <div className="icons" onClick={() => handleVideoSharing()} tabIndex="0">
        {myVdoStatus ? (
          <img src={VideoIcon} alt="video on icon" />
        ) : (
          <img src={VideoOff} alt="video off icon" />
        )}
      </div>
      <div
        className="icons"
        onClick={handleMic}
        tabIndex="0"
      >
        <i
          className={`fa fa-microphone${myMicStatus ? "" : "-slash"}`}
          style={{ transform: "scaleX(-1)" }}
          aria-label={`${myMicStatus ? "mic on" : "mic off"}`}
          aria-hidden="true"
        ></i>
      </div>
      {call.callAccepted && !call.callEnded && (
        <div
          className="icons"
          onClick={() => {
            setIsChatModalVisible(oldModalStatus => !oldModalStatus);
          }}
          tabIndex="0"
        >
          <img src={Msg} alt="chat icon" />
        </div>
      )}
      {call.callAccepted && !call.callEnded && (
        <div
          className="icons"
          onClick={() => handleScreenSharing()}
          tabIndex="0"
        >
          <img src={ScreenShare} alt="share screen" />
        </div>
      )}

      <div
        className="icons"
        onClick={handleSound}
        tabIndex="0"
      >
        <i
          className={`fa fa-volume${myMicStatus ? "-up" : "-off"}`}
          style={{ transform: "scaleX(-1)" }}
          aria-label={`${myMicStatus ? "mic on" : "mic off"}`}
          aria-hidden="true"
        ></i>
      </div>
      <div className="icons" tabIndex="0">
        <CallOptions />
      </div>
    </div>
  )
}


const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/">
        Mark as unread
      </a>
    ),
    icon: <CheckOutlined />,
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/">
        Mute notification
      </a>
    ),
    icon: <AudioMutedOutlined />,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/">
        View profile
      </a>
    ),
    icon: <SmileOutlined />,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/">
        Delete chat
      </a>
    ),
    icon: <UserDeleteOutlined />,
  },
];

const CallOptions = () => (
  <Dropdown
    menu={{ items }}
  >
    <SettingOutlined />
  </Dropdown>
);

export default BottomIcons
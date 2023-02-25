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
import socket from '../../../socket'
const BottomIcons = () => {
  const { stream, call = {},
    setMyMicStatus, myVdoStatus, myVideo,
    myMicStatus, setMyVdoStatus,
    screenShare, setScreenShare, setStream, connectionRef } = useContext(InboxContext);

  const handleVideoSharing = () => {

    if (!stream) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          console.log('c', currentStream)
          setStream(currentStream);
          myVideo.current.srcObject = currentStream;
          console.log('ssss', userVideo, myVideo)
        }).catch((error) => {
          console.log({ error })
          message.error("Please toured on your camera from browser", 2);
        })
      return false
    }

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
    setMyMicStatus((currentStatus) => {
      socket.emit("updateMyMedia", {
        type: "mic",
        currentMediaStatus: !currentStatus,
      });
      stream.getAudioTracks()[0].enabled = !currentStatus;
      return !currentStatus;
    });
  };


  const handleScreenSharing = () => {

    if (!myVdoStatus) {
      message.error("Turn on your video to share the content", 2);
      return;
    }

    if (!screenShare) {
      navigator.mediaDevices
        .getDisplayMedia({ cursor: true })
        .then((currentStream) => {
          const screenTrack = currentStream.getTracks()[0];

          // replaceTrack (oldTrack, newTrack, oldStream);
          connectionRef.current.replaceTrack(
            connectionRef.current.streams[0]
              .getTracks()
              .find((track) => track.kind === 'video'),
            screenTrack,
            stream
          );

          // Listen click end
          screenTrack.onended = () => {
            connectionRef.current.replaceTrack(
              screenTrack,
              connectionRef.current.streams[0]
                .getTracks()
                .find((track) => track.kind === 'video'),
              stream
            );

            myVideo.current.srcObject = stream;
            setScreenShare(false);
          };

          myVideo.current.srcObject = currentStream;
          screenTrackRef.current = screenTrack;
          setScreenShare(true);
        }).catch((error) => {
          console.log("No stream for sharing")
        });
    } else {
      screenTrackRef.current.onended();
    }
  };

  const handleSound = () => {

  }

  console.log('from button', call)
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
      {call.callAccepted && (
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
      {call.callAccepted ? (
        <div
          className="icons"
          onClick={() => handleScreenSharing()}
          tabIndex="0"
        >
          <img src={ScreenShare} alt="share screen" />
        </div>
      ) : null}

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
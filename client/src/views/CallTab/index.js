import React, { useState, useContext, useEffect } from "react";
import { Row, Col } from "antd";
import { useLocation } from 'react-router-dom'
import queryString from 'query-string';
import { size } from 'lodash'


import { AuthContext } from '../../context/AuthContext';
import './call.css'
import socket from "../../socket";
import { getChatList } from "../../data/chat";
import UserListBox from "./UserListBox";
import VideoBox from "./VideoBox";
import CancelCallTab from "./CancelCallTab";
import { CallContext } from "../../context/callContext";
import Avatar from "antd/es/avatar/avatar";
import Modal from "antd/es/modal/Modal";
import Msg_Illus from "../../assets/images/msg_illus.svg";
import Search from "antd/es/transfer/search";
import ScreenShare from '../../assets/images/share_screen.svg'
import VideoIcon from "../../assets/images/video.svg";
import VideoOff from "../../assets/images/video-off.svg";
import InboxContext from "../../context/Inbox/inboxContext";
import EndCallTab from "./EndCall";

const CallTab = () => {
  const { stream, handlerCancelCall, calling, setCalling, call, myVdoStatus, myMicStatus, userVideo, setMyVdoStatus, myVideo, callUser, answerCall, endCall } = useContext(CallContext);
  const { user } = useContext(AuthContext)
  const { setMessages, setCurrentChatId, currentChatId, setChatList } = useContext(InboxContext)
  const [message, setMessage] = useState('')
  const [isWrongUrl, setIsWrongUrl] = useState(false)
  const [chat, setChat] = useState({})

  const [canceled, setCancelled] = useState(false)
  const [callAcceptedTab, setCallAcceptedTab] = useState(false)

  const [isChatModalVisible, setIsChatModalVisible] = useState(false)

  const handleFullScreen = () => {

  }

  const handleMic = () => {

  }

  const handleCallUser = (params, params2) => {
    console.log({ params, params2, currentChatId })
    callUser(chat.participantOtherUsers, currentChatId)
    setCalling(true)
  }

  const handleCancelCall = () => {
    console.log("cancel calling ...")
    setCalling(false)
    setCancelled(true)
    handlerCancelCall()
  }

  const handleMessage = (value) => {
    if (value) {
      // sendNewMessage({ chatId, content: value, createdAt: new Date(), createdBy: user.userId })
    }
    setMessage('')
  }

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

  let { search } = useLocation();

  useEffect(() => {
    try {
      const currentPath = queryString.parse(search, { parseBooleans: true });
      if (!size(currentPath) ||
        // size(currentPath) !== 2
        // ||
        (currentPath && 'has_video' in currentPath === false
          || 'ig_thread_id' in currentPath === false) ||
        !currentPath?.ig_thread_id
      ) {
        setIsWrongUrl(true)
      } else {
        setIsWrongUrl(false)
        const { ig_thread_id, callAccepted } = currentPath
        getChatList(`?chatId=${ig_thread_id}`)
          .then(({ chatList }) => {
            if (size(chatList)) {
              setChat(chatList[0])
              // setMessages(chatList[0].messages)
              setCurrentChatId(ig_thread_id)
              setChatList(chatList)
              console.log("test ", ig_thread_id)
            } else setIsWrongUrl(true)
          }).catch(err => {
            console.log({ err })
          })
        if (callAccepted) {
          console.log("calling index")
          setCallAcceptedTab(true)
          answerCall()
        } else setCallAcceptedTab(false)
      }
    } catch (error) {
      console.log({ error })
      setIsWrongUrl(true)
    }
    console.log("parent loading")
  }, [search])

  if (isWrongUrl) {
    return (
      <div style={{ padding: '20px', paddingTop: '40px', minHeight: "300px" }}> Sorry, this page isn't available.
        <br />
      The link you followed may be broken, or the page may have been removed.Go back to home page
      </div>
    )
  }

  const renderPage = () => {
    if (endCall) return <EndCallTab user={chat?.participantOtherUsers && chat?.participantOtherUsers[0] || {}} />
    else if (canceled) return (<CancelCallTab user={chat?.participantOtherUsers && chat?.participantOtherUsers[0] || {}} />)
    else return (
      <>
        <Row justify="space-around" align="middle">
          <Col xs={12} xl={12}>
            <VideoBox />
          </Col>
          <Col xs={12} xl={12}>
            <UserListBox
              userList={chat?.participantOtherUsers || {}}
              calling={calling}
              callUser={handleCallUser}
              handleCancelCall={handleCancelCall}
              isCallAcceptedTab={callAcceptedTab}
            />
          </Col>
        </Row >
      </>
    )
  }

  return (
    <section className="container">
      {
        renderPage()
      }

      {/* <div className="grid">
        {stream ? (
          <div
            style={{ textAlign: "center" }}
            className="card"
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

            <div className="iconsDiv">
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
              <Modal
                title="Chat"
                footer={null}
                visible={isChatModalVisible}
                onOk={() => setIsChatModalVisible(false)}
                onCancel={() => setIsChatModalVisible(false)}
                style={{ maxHeight: "100px" }}
              >
                {chat.length ? (
                  <div className="msg_flex">
                    {chat.map((msg) => (
                      <div
                        className={msg.type === "sent" ? "msg_sent" : "msg_rcv"}
                      >
                        {msg.msg}
                      </div>
                    ))}
                    <div ref={dummy} id="no_border"></div>
                  </div>
                ) : (
                  <div className="chat_img_div">
                    <img src={Msg_Illus} alt="msg_illus" className="img_illus" />
                  </div>
                )}
                <Search
                  placeholder="your message"
                  allowClear
                  className="input_msg"
                  enterButton="Send 🚀"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  size="large"
                  onSearch={handleMessage}
                />
              </Modal>
              {call.callAccepted && !call.callEnded && (
                <div
                  className="icons"
                  onClick={() => handleScreenSharing()}
                  tabIndex="0"
                >
                  <img src={ScreenShare} alt="share screen" />
                </div>
              )}

              <div className="icons" onClick={() => handleVideoSharing()} tabIndex="0">
                {myVdoStatus ? (
                  <img src={VideoIcon} alt="video on icon" />
                ) : (
                  <img src={VideoOff} alt="video off icon" />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}

        {call.callAccepted && !call.callEnded && userVideo && (
          <div className="card2" style={{ textAlign: "center" }} id="video2">
            <div style={{ height: "2rem" }}>
              <h3>{userVdoStatus && (call.name)}</h3>
            </div>

            <div className="video-avatar-container">
              <video
                playsInline
                ref={userVideo}
                onClick={fullScreen}
                autoPlay
                className="video-active"
                style={{
                  opacity: `${userVdoStatus ? "1" : "0"}`,
                }}
              />

              <Avatar
                style={{
                  backgroundColor: "#116",
                  position: "absolute",
                  opacity: `${userVdoStatus ? "-1" : "2"}`,
                }}
                size={98}
                icon={!(call.name) && <UserOutlined />}
              >
                {userName || call.name}
              </Avatar>
              {!userMicStatus && (
                <i
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    padding: "0.3rem",
                    backgroundColor: "#fefefebf",
                  }}
                  className="fad fa-volume-mute fa-2x"
                  aria-hidden="true"
                  aria-label="microphone muted"
                ></i>
              )}
            </div>
          </div>
        )}
      </div> */}
    </section >
  )
}
export default CallTab
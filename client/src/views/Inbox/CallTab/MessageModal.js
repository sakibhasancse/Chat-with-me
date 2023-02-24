import React, { useState, useContext, useEffect, useRef } from "react";
import { Input, Button, Tooltip, Modal, message, Row, Col, } from "antd";
import { useLocation } from 'react-router-dom'
import queryString from 'query-string';
import { size } from 'lodash'
import InboxContext from '../../../context/Inbox/inboxContext';
import Msg from "../../../assets/images/msg.svg";
import ScreenShare from '../../../assets/images/share_screen.svg'
import VideoIcon from "../../../assets/images/video.svg";
import VideoOff from "../../../assets/images/video-off.svg";
import Msg_Illus from "../../../assets/images/msg_illus.svg";


const MessageModal = () => {
  const { stream, call = {}, answerCall, myVdoStatus, myVideo, myMicStatus, userVideo, setMyVdoStatus, setMessages, setCurrentChatId, userVdoStatus, userMicStatus, sendNewMessage } = useContext(InboxContext);
  const { user } = useContext(AuthContext)
  const [message, setMessage] = useState('')

  const handleMessage = (value) => {
    if (value) {
      // sendNewMessage({ chatId, content: value, createdAt: new Date(), createdBy: user.userId })
    }
    setMessage('')
  }
  return (
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
  )
}
export default MessageModal
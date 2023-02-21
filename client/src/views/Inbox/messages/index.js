import { useContext, useEffect, useRef, useState } from "react"
import { Card, Modal, Button, Input, notification, Avatar } from "antd";
import moment from 'moment'
import { size } from 'lodash'
const { Search } = Input;
import Msg_Illus from '../../../assets/images/msg_illus.svg'
import InboxContext from "../../../context/Inbox/inboxContext";
import { useLocation } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import { getMessages } from '../../../data/chat'

const ChatBox = () => {
  const { sendNewMessage, messages = [], setMessages } = useContext(InboxContext);
  const { user } = useContext(AuthContext);

  const [message, setMessage] = useState('')
  const [chatId, setChatId] = useState('')

  let { pathname } = useLocation();
  const dummy = useRef();

  useEffect(() => {
    const currentChatId = pathname.split('/')[2] || ''
    if (!size(messages) && currentChatId) {
      getMessages(currentChatId).then(response => {
        if (size(response)) {
          setMessages(response)
        }
      })  
    }
    setChatId(currentChatId)
  }, [pathname])


  const handleMessage = (value) => {
    if (value) {
      sendNewMessage({ chatId, content: value, createdAt: new Date(), createdBy: user.userId })
    }
    setMessage('')
  }

  useEffect(() => {
    if (dummy?.current) dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ padding: "20px" }}>
      {
        messages.length ? (
          <div className="msg_flex">
            {messages.map((msg) => (
              <div
                className={msg.createdBy === user.userId ? "msg_sent" : "msg_rcv"}
              >
                {msg.content}
                <br />
                <span style={{
                  color: "rgb(136 121 121)",
                  fontSize: "smaller"
                }}>{moment(msg.createdAt).fromNow()}</span>
              </div>
            ))}
            <div ref={dummy} id="no_border"></div>
          </div>
        ) : (
          <div className="chat_img_div">
            <img src={Msg_Illus} alt="msg_illus" className="img_illus" />
          </div>
        )
      }
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
    </div>
  )
}

export default ChatBox
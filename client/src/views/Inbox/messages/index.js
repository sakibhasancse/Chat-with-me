import { useContext, useEffect, useRef, useState } from "react"
import { Card, Modal, Button, Input, notification, Avatar } from "antd";
const { Search } = Input;
import Msg_Illus from '../../../assets/images/msg_illus.svg'
import InboxContext from "../../../context/Inbox/inboxContext";
import { useLocation } from "react-router";

const ChatBox = ({ messages = [], setMessages }) => {
  const { sendNewMessage } = useContext(InboxContext);
  const [message, setMessage] = useState('')
  const [chatId, setChatId] = useState('')

  let { pathname } = useLocation();
  const dummy = useRef();

  useEffect(() => {
    const currentChatId = pathname.split('/')[2] || ''
    setChatId(currentChatId)
  }, [pathname])


  const handleMessage = (value) => {
    if (value) {
      sendNewMessage(value)
      messages.push({
        type: 'sent',
        msg: content
      })
    }
    setMessage('')
  }

  useEffect(() => {
    if (dummy?.current) dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {
        messages.length ? (
          <div className="msg_flex">
            {messages.map((msg) => (
              <div
                className={msg.type === "sent" ? "msg_sent" : "msg_rcv"}
              >
                {msg.content}
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
    </>
  )
}

export default ChatBox
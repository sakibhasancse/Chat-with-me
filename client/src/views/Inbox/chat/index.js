import { useContext, useState } from "react"
import { Card, Modal, Button, Input, notification, Avatar } from "antd";
const { Search } = Input;
import Msg_Illus from '../../../assets/images/msg_illus.svg'
import InboxContext from "../../../context/Inbox/inboxContext";

const ChatBox = ({ messages = [] }) => {
  const { sendNewMessage } = useContext(InboxContext);

  const [message, setMessage] = useState('')

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
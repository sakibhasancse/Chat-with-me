import { PhoneOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import InboxContext from "../../../context/Inbox/inboxContext";

const ChatTopBar = ({ otherUser = {} }) => {
  const { sendNewMessage, messages = [], setMessages, callUser, currentChatId = 'ss' } = useContext(InboxContext);
  const { user = {} } = useContext(AuthContext)

  const navigator = useNavigate()

  const handleRedirectUrl = (isVideoCall = false) => {
    const path = `/call?has_video=${isVideoCall}&ig_thread_id=${currentChatId}`
    navigator(path)
  }

  return (
    <div style={{ float: "right", position: "sticky", top: "0" }}>
      <Button
        type="primary"
        icon={<PhoneOutlined />}
        onClick={() => handleRedirectUrl(false)}
        // className={classes.btn}
        tabIndex="0"
      />
      <Button
        type="primary"
        icon={<VideoCameraOutlined />}
        onClick={() => handleRedirectUrl(true)}
        // className={classes.btn}
        tabIndex="0"
      />
    </div>
  )
}
export default ChatTopBar
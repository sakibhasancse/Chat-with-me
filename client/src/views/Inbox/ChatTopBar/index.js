import { PhoneOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import InboxContext from "../../../context/Inbox/inboxContext";

const ChatTopBar = ({otherUser = {}}) => {
  const { sendNewMessage, messages = [], setMessages, callUser } = useContext(InboxContext);
  const {user = {}} = useContext(AuthContext)

  return (
    <div style={{ float: "right" }}>
      <Button
        type="primary"
        icon={<PhoneOutlined />}
        onClick={() => callUser(user)}
        // className={classes.btn}
        tabIndex="0"
      >
        Call
      </Button>
    </div>
  )
}
export default ChatTopBar
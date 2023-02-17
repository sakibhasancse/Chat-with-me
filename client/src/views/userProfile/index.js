
import { Button, message } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { createChat } from '../../data/chat'

const UserProfile = () => {
  const navigate = useNavigate()
  const { username } = useParams()

  const initiateMessage = async ({ username }) => {
    const conversation = await createChat(username)
    console.log({ conversation })
    if (conversation?._id) navigate.push(`/inbox/${conversation._id}`)
  }

  return (<div style={{ padding: "50px" }}>
    User profile {username}
    <div style={{ padding: "50px" }}>
      <Button onClick={initiateMessage}>Send messages</Button>
    </div>

  </div>)
}
export default UserProfile
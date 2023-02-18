
import { Button, message } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { createChat } from '../../data/chat'

const UserProfile = () => {
  const navigate = useNavigate()
  const { username } = useParams()

  const initiateMessage = async () => {
    const conversation = await createChat('63d5506d67a2310bda2645ca')
    console.log({ conversation, username })
    // if (conversation?._id) navigate.push(`/inbox/${conversation._id}`)
  }

  return (<div style={{ padding: "50px" }}>
    User profile {username}
    <div style={{ padding: "50px" }}>
      <Button onClick={initiateMessage}>Send messages</Button>
    </div>

  </div>)
}
export default UserProfile
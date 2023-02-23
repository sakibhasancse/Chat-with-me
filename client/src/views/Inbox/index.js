import { Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import Chats from './Chats';
import ChatBox from './messages';
import Options from './Options';
import './Video.css'

const inbox = () => {
  const [messages, setMessages] = useState([{
    type: 'sent',
    content: "Hello developer"
  },
  {
    type: 'receive',
    content: "Hello developer"
  }
    , {
    type: 'sent',
    content: "Hello developer"
  }])

  return (
    <Content style={{ padding: '50px' }}>
      <Options />
      <Row>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          <Chats setMessages={setMessages} />
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          <ChatBox messages={messages} setMessages={setMessages} />
        </Col>
      </Row>
    </Content>
  );
}

export default inbox;

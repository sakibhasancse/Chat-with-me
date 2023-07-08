import { Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import Chats from './Chats';
import ChatBox from './messages';

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
    <div
      style={{ padding: '0px 25px', height: '100%' }}
    >
      <Row justify="space-between">
        <Col xs={10} sm={8} md={8} lg={8} xl={8}>
          <Chats setMessages={setMessages} />
        </Col>
        <Col xs={14} sm={16} md={16} lg={16} xl={16}>
          <ChatBox messages={messages} setMessages={setMessages} />
        </Col>
      </Row>
    </div>
  );
}

export default inbox;

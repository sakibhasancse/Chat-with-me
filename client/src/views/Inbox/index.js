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
    <div style={{ padding: '0px 50px', height: '100%' }}>
      <Row>
        <Col xs={24} sm={4} md={6} lg={8} xl={7}>
          <Chats setMessages={setMessages} />
        </Col>
        <Col xs={24} sm={4} md={6} lg={8} xl={17}>
          <ChatBox messages={messages} setMessages={setMessages} />
        </Col>
      </Row>
    </div>
  );
}

export default inbox;

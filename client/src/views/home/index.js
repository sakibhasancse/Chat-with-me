import React, { useState } from 'react';
import TopNavBar from "../../components/Layout";
import { Layout, Typography, Row, Col, Button, Space, Steps } from 'antd';
import { VideoCameraOutlined, AudioOutlined, MessageOutlined, UsergroupAddOutlined, FileDoneOutlined, CheckCircleOutlined } from '@ant-design/icons';

import APPBANER from '../../assets/images/man-and-woman.webp'
import Footer from '../../components/Layout/Footer';
const { Title, Paragraph } = Typography;
const { Content } = Layout;
import './style.css'
const Home = () => {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState('');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    // handle logic for logging in or joining the conversation
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Content style={{ padding: '50px' }}>
        <Row>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Title level={2}>Stay connected with your loved ones</Title>
            <Paragraph>
              This chatting app allows you to video call, audio call, and message with your friends and family from anywhere, anytime.
          </Paragraph>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ textAlign: 'right' }}>
            <img style={{
              width: "100%",
              maxWidth: "400px",
              height: "245px"
            }} src={APPBANER} alt="Chatting App Logo" />
          </Col>
        </Row>
        <Row className="home-button" justify="space-between" style={{ marginTop: '50px' }}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <span style={{ color: 'read' }}>
              <Button textAlign="center" icon={<VideoCameraOutlined />} size="large">
                Video Call
               <span></span>
              </Button>
              <Title level={5} textAlign="center">
                Send a video landing page along with a GIF preview to share your video in email.
            </Title>
            </span>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Button icon={<AudioOutlined />} size="large">
              Audio Call
          </Button>
            <Title level={5}>
              Send a Audio landing page along with a GIF preview to share your video in email.
            </Title>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Button icon={<MessageOutlined />} size="large">
              Messaging
          </Button>
            <Title level={5}>
              Now share videos videos through text message, LinkedIn, or anywhere you can share a link.
            </Title>
          </Col>
        </Row>
        <Row className="home-button" style={{ marginTop: '50px' }}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Button icon={<UsergroupAddOutlined />} size="large">
              Group chat
          </Button>
            <Title level={5}>
              Now share videos videos through text message, LinkedIn, or anywhere you can share a link.
            </Title>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Button icon={<FileDoneOutlined />} size="large">
              File sharing
          </Button>
            <Title level={5}>
              Now share videos videos through text message, LinkedIn, or anywhere you can share a link.
            </Title>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Button icon={<CheckCircleOutlined />} size="large">
              Privacy and Security
          </Button>
            <Title level={5}>
              Now share videos videos through text message, LinkedIn, or anywhere you can share a link.
            </Title>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <Title align="center" level={1}>How to create a conversation in seconds</Title>
        <br />
        <br />
        <Steps
          progressDot
          current={1}
          direction="vertical"
          items={[
            {
              title: 'Sign Up',
              description: 'This is a description. This is a description.',
            },
            {
              title: 'Sign in',
              description: 'This is a description. This is a description.',
            },
            {
              title: 'Update profile',
              description: 'This is a description. This is a description.',
            },
            {
              title: 'Sent massage to your friend',
              description: 'This is a description.',
            },
            {
              title: 'Waiting to reply',
              description: 'This is a description.',
            },
            {
              title: 'Enjoy',
              description: 'This is a description.',
            },
          ]}
        />
      </Content>
    </div >
  );
};
export default Home;

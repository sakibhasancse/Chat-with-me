import React from 'react';
import { Layout, Typography, Row, Col, } from 'antd';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter = () => {
  return (
    <Footer style={{ padding: '50px', background: "ghostwhite" }}>
      <Row>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Title level={4}>Company</Title>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Title level={4}>Support</Title>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-use">Terms of Use</Link></li>
          </ul>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Title level={4}>Follow Us</Title>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Title level={4}>Contact Us</Title>
          <Text type="secondary">
            123 Main Street<br />
            Anytown, USA 12345<br />
            Phone: (123) 456-7890<br />
            Email: info@chattingapp.com
          </Text>
        </Col>
      </Row>
      <Row style={{ marginTop: '50px' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Text type="secondary">Copyright © {new Date().getFullYear()} Chatting App</Text>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;

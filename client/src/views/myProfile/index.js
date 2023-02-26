
import { Button, Col, message, Row } from 'antd';
import Grid from 'antd/es/card/Grid';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

const MyProfile = () => {
  return (
    <div style={{ padding: "50px" }}>
      <Row justify="space-around" align="middle" >
        <Col xs={24} xl={14}>
          User profile
        </Col>
        <Col xs={24} xl={10}>
        </Col>
      </Row>
    </div>
  )
}

export default MyProfile
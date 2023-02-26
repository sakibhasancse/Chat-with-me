import React, { useState } from "react";
import Cookie from "js-cookie";

import { validateInputFields } from "./login-helper";
import apiRequest from "../../services/ApiRequest/apiRequest.service";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.css';

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    const errors = validateInputFields(values);
    if (errors.length) setErrors(errors);
    else {
      setErrors({});
      const response = await apiRequest.post("/auth/login", values);
      console.log({ response })
      if (response.error) {
        setErrors({ error: response.error });
      } else {
        const from = location.state?.from?.pathname || "/";
        console.log('s', auth)
        auth.signIn(response?.tokens || "token", () => {
          navigate(from, { replace: true });
        });
      }
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    setValues((oldValue) => ({
      ...oldValue,
      [event.target.name]: event.target.value,
    }));
  };


  console.log({ errors, loading });
  return (
    <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <div className="align">
        <Form
          title="Login from"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
        >
          <Col><p>Please Login with your Account</p></Col>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
        </a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
        </Button>
        Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </Row>
  )
};
export default Login;

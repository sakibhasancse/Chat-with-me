import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';

import { validateInputFields } from "../login/login-helper";
import apiRequest from "../../services/ApiRequest/apiRequest.service";

const Register = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    const errors = validateInputFields(values);
    console.log({ values })
    if (errors.length) setErrors(errors);
    else {
      const response = await apiRequest({
        method: "POST",
        path: "/auth/register",
        data: values,
      });
      if (response.error) {
        setErrors({ error: response.error });
      } else navigate("/login");
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
          <Col><p>Register Account</p></Col>
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
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: 'Please input your Phone number!',
              },
            ]}
          >
            <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Phone number" />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your Name!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
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
          <Form.Item
            name="re_password"
            rules={[
              {
                required: true,
                message: 'Please input your Password again!',
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
            <Button type="primary" htmlType="submit" className="login-form-button">
              SignUp
        </Button>
        Or <a href=""> Already have an account ?{" "}</a>
          </Form.Item>
        </Form>
      </div>
    </Row>
  );
};

export default Register;

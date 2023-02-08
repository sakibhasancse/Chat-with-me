import React, { useState } from "react";
import Cookie from "js-cookie";

import { validateInputFields } from "./login-helper";
import apiRequest from "../../services/ApiRequest/apiRequest.service";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.css';

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ phone_number: "", password: "" });

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const errors = validateInputFields(values);
    if (errors.length) setErrors(errors);
    else {
      setErrors({});
      const response = await apiRequest({
        method: "POST",
        path: "api/v1/user/signin/",
        data: values,
      });

      console.log({ response });

      if (response.error) {
        setErrors({ error: response.error });
      } else {
        const from = location.state?.from?.pathname || "/";
        Cookie.set("token", response.data || "token");
        auth.signIn(response.data || "token", () => {
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
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  console.log({ errors, loading });
  return (
    <div className="align" style={{ padding: '50px', alignContent: 'center' }}>
      <Form
        alignContent="center"
        
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
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
  )
  // return (
  //   <div className="col-lg-6">
  //     <div className="p-lg-5 p-4">
  //       <div>
  //         <h5 className="text-primary">Welcome Back !</h5>
  //         <p className="text-muted">Sign in to continue to Velzon.</p>
  //       </div>
  //       <div className="mt-4">
  //         <form onSubmit={handleSubmit}>
  //           <div className="mb-3">
  //             <label htmlFor="Number" className="form-label">
  //               Phone Number
  //             </label>
  //             <input
  //               id="phone"
  //               name="phone_number"
  //               type="number"
  //               placeholder="Enter your phone number"
  //               value={values.phone_number}
  //               onChange={handleChange}
  //               className="form-control"
  //             />
  //             {errors.phone_number && (
  //               <div className="input-feedback">{errors.phone_number}</div>
  //             )}
  //           </div>
  //           <div className="mb-3">
  //             <div className="float-end">
  //               <a href="auth-pass-reset-cover.html" className="text-muted">
  //                 Forgot password?
  //               </a>
  //             </div>
  //             <label className="form-label" htmlFor="password-input">
  //               Password
  //             </label>
  //             <div className="position-relative auth-pass-inputgroup mb-3">
  //               <input
  //                 id="password"
  //                 name="password"
  //                 type="password"
  //                 placeholder="Enter your password"
  //                 value={values.password}
  //                 onChange={handleChange}
  //                 className="form-control pe-5 password-input"
  //               />
  //               {errors.password && (
  //                 <div className="input-feedback">{errors.password}</div>
  //               )}
  //               <button
  //                 className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
  //                 type="button"
  //                 id="password-addon"
  //               >
  //                 <i className="ri-eye-fill align-middle" />
  //               </button>
  //             </div>
  //           </div>
  //           <div className="form-check">
  //             <input
  //               className="form-check-input"
  //               type="checkbox"
  //               defaultValue
  //               id="auth-remember-check"
  //             />
  //             <label className="form-check-label" htmlFor="auth-remember-check">
  //               Remember me
  //             </label>
  //           </div>
  //           <div className="mt-4">
  //             <button
  //               className="btn btn-success w-100"
  //               type="submit"
  //               disabled={loading}
  //             >
  //               Sign In
  //             </button>
  //           </div>
  //           <div className="mt-4 text-center">
  //             <div className="signin-other-title">
  //               <h5 className="fs-13 mb-4 title">Sign In with</h5>
  //             </div>
  //             <div>
  //               <button
  //                 type="button"
  //                 className="btn btn-primary btn-icon waves-effect waves-light"
  //               >
  //                 <i className="ri-facebook-fill fs-16" />
  //               </button>
  //               <button
  //                 type="button"
  //                 className="btn btn-danger btn-icon waves-effect waves-light"
  //               >
  //                 <i className="ri-google-fill fs-16" />
  //               </button>
  //               <button
  //                 type="button"
  //                 className="btn btn-dark btn-icon waves-effect waves-light"
  //               >
  //                 <i className="ri-github-fill fs-16" />
  //               </button>
  //               <button
  //                 type="button"
  //                 className="btn btn-info btn-icon waves-effect waves-light"
  //               >
  //                 <i className="ri-twitter-fill fs-16" />
  //               </button>
  //             </div>
  //           </div>
  //         </form>
  //       </div>
  //       <div className="mt-5 text-center">
  //         <p className="mb-0">
  //           Dont have an account ?{" "}
  //           <Link
  //             to="/register"
  //             className="fw-semibold text-primary text-decoration-underline"
  //           >
  //             {" "}
  //             Signup
  //           </Link>{" "}
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );
};
export default Login;

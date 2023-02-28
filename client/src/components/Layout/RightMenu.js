import React from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";



const RightMenu = ({ mode }) => {
  const auth = useAuth();
  const navigator = useNavigate()
  console.log({ auth })
  return (
    <>
      {
        auth?.user ? (
          <>
            <Menu mode={mode} >
              <Menu.SubMenu
                title={
                  <Avatar icon={<UserOutlined />} />
                }
              >
                <Menu.Item key="project" onClick={() => navigator('/inbox')}>
                  <CodeOutlined /> Inbox
            </Menu.Item>
                <Menu.Item key="about-us" onClick={() => navigator('/profile')}>
                  <UserOutlined /> Profile
            </Menu.Item >
                <Menu.Item key="log-out" onClick={() => auth.signOut()}>
                  <LogoutOutlined />
              Logout
            </Menu.Item>
              </Menu.SubMenu>
            </Menu >
            <span className="username">{auth?.user?.name || 'Sakib'}</span>
          </>
        ) : (
          <Menu mode={mode}>
            <Menu.Item key="login"> <Link to="/login">Sign In</Link></Menu.Item >
            <Menu.Item key="signup"><Link to="/register">Sign Up</Link></Menu.Item>
          </Menu >
        )
      }
    </>
  )

};

export default RightMenu
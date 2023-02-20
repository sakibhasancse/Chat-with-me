import React from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RightMenu = ({ mode }) => {
  const auth = useAuth();
  return (
    <>
      {
        auth?.user ? (
          <Menu mode={mode} >
            <Menu.SubMenu
              title={
                <>
                  <Avatar icon={<UserOutlined />} />
                  <span className="username">{auth.user.name}</span>
                </>
              }
            >
              <Menu.Item key="project">
                <CodeOutlined /> Projects
          </Menu.Item>
              <Menu.Item key="about-us">
                <UserOutlined /> Profile
          </Menu.Item >
              <Menu.Item key="log-out" onClick={() => auth.signOut()}>
                <LogoutOutlined />
            Logout
          </Menu.Item>
            </Menu.SubMenu>
          </Menu >
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
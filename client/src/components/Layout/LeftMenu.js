import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router";

const LeftMenu = ({ mode }) => {
  const navigate = useNavigate()
  return (
    <Menu mode={mode}>
      <Menu.Item key="feed" onClick={() => navigate('/feed')}>Feed</Menu.Item>
      <Menu.Item key="features">Features</Menu.Item>
      <Menu.Item key="about">About Us</Menu.Item>
      <Menu.Item key="contact">Contact Us</Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
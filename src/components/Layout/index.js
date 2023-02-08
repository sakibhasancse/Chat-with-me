import React, { useState, useEffect } from 'react'
import { Layout, Button, Drawer } from "antd";
import LeftMenu from "./LeftMenu.js";
import RightMenu from "./RightMenu.js";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";

import './style.css'
import myLogo from '../../assets/images/mylogo.png'
import SessionStore from '../../store/SessionStore';

import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  let { pathname: location } = useLocation();

  useEffect(() => {
    setVisible(false);
  }, [location]);


  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header className="nav-header">
          <div className="logo">
            <img className="header-logo" src={myLogo} />
          </div>
          <div className="navbar-menu">
            <div className="leftMenu">
              <LeftMenu mode={"horizontal"} />
            </div>
            <Button className="menuButton" type="text" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            <div className="rightMenu">
              <RightMenu mode={"horizontal"} />
            </div>

            <Drawer
              title={"Brand Here"}
              placement="right"
              closable={true}
              onClose={showDrawer}
              visible={visible}
              style={{ zIndex: 99999 }}
            >
              <LeftMenu mode={"inline"} />
              <RightMenu mode={"inline"} />
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
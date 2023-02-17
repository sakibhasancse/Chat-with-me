import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PrivateRoute } from "./services";
import About from "./views/about";
import Dashboard from "./views/dashboard";
import Home from "./views/home";
import Login from "./views/login";
import NotFound from "./views/notFound";
import Register from "./views/register";
import Service from "./views/services";
import Inbox from './views/Inbox'
import InboxProvider from "./context/Inbox";
import { AuthProvider } from "./context/AuthContext";
import Feed from "./views/newsFeed";
import UserProfile from "./views/userProfile";
import Navbar from "./components/Layout";
import AppFooter from "./components/Layout/Footer";

const Main = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InboxProvider>
          <Navbar />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Service />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/user/:username" element={<UserProfile />} />
            {/* Your private router */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            {/* 404/notfound page */}
            <Route path="*" element={<NotFound />} />

          </Routes>
          <AppFooter />
        </InboxProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Main;

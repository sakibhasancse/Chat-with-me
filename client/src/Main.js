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
import Layout from './components/Layout'
const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Layout> */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
        {/* </Layout> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Main;

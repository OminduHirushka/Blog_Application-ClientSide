import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/post/Posts";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/SignUp";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/post/*" element={<Posts />} />
    </Routes>
  );
};

export default App;

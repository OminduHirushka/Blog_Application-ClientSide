import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";

const App = () => {
  return (
    <Routes path="/*">
      <Route path="/*" element={<Home />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  );
};

export default App;

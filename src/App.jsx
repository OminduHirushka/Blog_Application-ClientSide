import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import AddPostForm from "./pages/AddPostForm";

const App = () => {
  return (
    <Routes path="/*">
      <Route path="/*" element={<Home />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/add-posts" element={<AddPostForm />} />
    </Routes>
  );
};

export default App;

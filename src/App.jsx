import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import AddPostForm from "./pages/AddPostForm";
import EditPostForm from "./pages/EditPostForm";

const App = () => {
  return (
    <Routes path="/*">
      <Route path="/*" element={<Home />} />
      <Route path="/" element={<Posts />} />
      <Route path="/add-posts" element={<AddPostForm />} />
      <Route path="/edit-post/:id" element={<EditPostForm />} />
    </Routes>
  );
};

export default App;

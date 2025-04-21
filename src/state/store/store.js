import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import postReducer from "../user/post/postSlice";
import userReducer from "../admin/users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    users: userReducer,
  },
});

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchPostsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = null;
    },
    fetchPostsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    deletePostRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deletePostSuccess: (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter(
        (post) => post.blog_id !== action.payload
      );
      state.error = null;
    },
    deletePostFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    addPostRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addPostSuccess: (state, action) => {
      state.isLoading = false;
      state.posts = [action.payload, ...state.posts];
      state.error = null;
    },
    addPostFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
  addPostRequest,
  addPostSuccess,
  addPostFailure,
} = postSlice.actions;
export default postSlice.reducer;

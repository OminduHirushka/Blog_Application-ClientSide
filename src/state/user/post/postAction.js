import axios from "axios";
import {
  deletePostFailure,
  deletePostRequest,
  deletePostSuccess,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess,
} from "./postSlice";

const API_URL = "http://localhost:3000/api/v1";

export const getAllPosts = () => async (dispatch) => {
  dispatch(fetchPostsRequest());

  try {
    const result = await axios.get(`${API_URL}/post/all-posts`);

    if (result.data && Array.isArray(result.data.posts)) {
      dispatch(fetchPostsSuccess(result.data.posts));
    }

    return result.data.posts;
  } catch (error) {
    console.error(error);
    dispatch(fetchPostsFailure("Failed to load posts"));
    throw error;
  }
};

export const getUserPosts = (email) => async (dispatch) => {
  dispatch(fetchPostsRequest());

  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const result = await axios.get(`${API_URL}/post/user-posts/${email}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (result.data && Array.isArray(result.data.post)) {
      dispatch(fetchPostsSuccess(result.data.post));
    } else {
      dispatch(fetchPostsSuccess([]));
    }
  } catch (error) {
    console.error(error);

    if (error.result && error.result.status === 404) {
      dispatch(fetchPostsSuccess([]));
    } else {
      dispatch(fetchPostsFailure("Failed to load posts"));
    }
    throw error;
  }
};

export const deletePost = (id) => async (dispatch) => {
  dispatch(deletePostRequest());

  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    await axios.delete(`${API_URL}/post/delete-posts/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    dispatch(deletePostSuccess(id));
    return { success: true };
  } catch (error) {
    console.error(error);
    dispatch(deletePostFailure("Failed to delete post"));
    throw error;
  }
};

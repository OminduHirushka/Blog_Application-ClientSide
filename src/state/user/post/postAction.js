import axios from "axios";
import { fetchPostsFailure, fetchPostsRequest, fetchPostsSuccess } from "./postSlice";

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

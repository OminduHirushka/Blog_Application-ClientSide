import axios from "axios";
import {
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
} from "./userSlice";

const API_URL = "http://localhost:3000/api/v1";

export const getCurrentUser = () => async (dispatch) => {
  dispatch(fetchUserRequest());

  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(fetchUserFailure("No token found"));
    return false;
  }

  try {
    const result = await axios.get(`${API_URL}/user/me`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    dispatch(fetchUserSuccess(result.data.user));
    return result.data.user;
  } catch (error) {
    console.error(error);
    dispatch(fetchUserFailure("Failed to load user data"));
    throw error;
  }
};

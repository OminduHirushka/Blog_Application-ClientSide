import axios from "axios";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  signupRequest,
  signupSuccess,
} from "./authSlice";

const API_URL = "http://localhost:3000/api/v1";

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const result = await axios.post(`${API_URL}/auth/login`, credentials);

    localStorage.setItem("token", result.data.token);
    dispatch(loginSuccess(result.data));

    return result.data;
  } catch (error) {
    console.log(error);
    dispatch(loginFailure("Login Failed"));
    throw error;
  }
};

export const signupUser = (user) => async (dispatch) => {
  dispatch(signupRequest());

  try {
    const result = await axios.post(`${API_URL}/auth/signup`, user);

    dispatch(signupSuccess());
    return result.data;
  } catch (error) {
    console.log(error);

    if (error.response && error.response.status === 400) {
      message.error("Email already exists");
    } else {
      message.error("Registration failed. Please try again.");
    }

    dispatch(signupFailure(errorMessage));
    throw error;
  }
};

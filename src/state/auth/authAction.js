import axios from "axios";
import { loginFailure, loginRequest, loginSuccess } from "./authSlice";

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

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
  user: null,
  success: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
      state.success = "Login Success";
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = null;
    },
    logoutRequest: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      state.success = "Logout Success";
    },

    signupRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.registrationSuccess = false;
    },
    signupSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
      state.registrationSuccess = true;
      state.success = "SignUp Success";
    },
    signupFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.registrationSuccess = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  signupRequest,
  signupSuccess,
  signupFailure,
} = authSlice.actions;
export default authSlice.reducer;

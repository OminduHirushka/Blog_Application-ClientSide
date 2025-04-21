import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    },
    fetchUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    logoutRequest: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  logoutRequest,
} = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: null,
};

const AuthSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login(state, action) {
      const userData = action.payload.data;
      if (userData && Object.keys(userData).length > 0) {
        state.user = userData;
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
    },
    logout(state, action) {
      state.isAuthenticated = false;
      state.user = {};
    },
  },
});

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";


const AuthSlice = createSlice({
  name: "userInfo",
  initialState:null,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout(state) {
      return null
    },
  },
});

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;

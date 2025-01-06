import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAdmin = action.payload.role === "admin"; // Set isAdmin based on role
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAdmin = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
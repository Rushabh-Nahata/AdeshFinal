import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    userLoginRequest(state) {
      state.loading = true;
    },
    userRegisterRequest(state) {
      state.loading = true;
    },
    userLoadRequest(state) {
      state.loading = true;
    },

    userLoginSuccess(state, action) {
      state.user = action.payload.user;
      state.loading = false;
      state.isAuthenticated = true;
      state.error = null;
    },
    userRegisterSuccess(state, action) {
      state.user = action.payload.user;
      state.loading = false;
      state.isAuthenticated = true;
      state.error = null;
    },
    userLoadSuccess(state, action) {
      state.user = action.payload.user;
      state.loading = false;
      state.isAuthenticated = true;
      state.error = null;
    },
    userLogOutSuccess(state) {
      state.user = null;
      state.loading = false;
      state.isAuthenticated = false;
      state.error = null;
    },

    userLoginFail(state, action) {
      state.user = null;
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    },
    userRegisterFail(state, action) {
      state.user = null;
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    },
    userLoadFail(state, action) {
      state.user = null;
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    },
    userLogOutFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    
    setError(state, action) {
      state.error = action.payload.error;
      state.loading = action.payload.loading;
    },

    clearError(state) {
      state.error = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;

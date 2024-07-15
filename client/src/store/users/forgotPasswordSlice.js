import { createSlice } from "@reduxjs/toolkit";

const forgotPasswordSlice = createSlice({
  name: "forgot",
  initialState: {
    loading: false,
    error: null,
    message: "",
    success: "",
  },
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
    },
    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
    },

    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.success = action.payload.success;
    },

    forgotPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    resetPasswordFail(state, action) {
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

export const forgotPasswordActions = forgotPasswordSlice.actions;

export default forgotPasswordSlice;

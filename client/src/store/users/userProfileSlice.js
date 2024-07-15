import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
  name: "profile",
  initialState: {
    user: {},
    loading: false,
    error: null,
    isUpdated: false,
  },
  reducers: {
    updateProfileRequest(state) {
      state.loading = true;
    },
    updatePasswordRequest(state) {
      state.loading = true;
    },

    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdated = action.payload.isUpdated;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = action.payload.isUpdated;
    },
  

    updateProfileFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    updatePasswordFail(state, action) {
      state.loading = false;
      state.isUpdated = action.payload.isUpdated;
    },

    updateProfileReset(state) {
      state.isUpdated = false;
    },
    updatePasswordReset(state) {
      state.isUpdated = false;
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

export const userProfileActions = userProfileSlice.actions;

export default userProfileSlice;

import { createSlice } from "@reduxjs/toolkit";

const adminProductSlice = createSlice({
  name: "adminProductAdmin",
  initialState: {
    loading: false,
    error: null,
    isDeleted: false,
    isUpdated:false
  },
  reducers: {
    // eslint-disable-next-line no-unused-vars
    deleteProductRequest(state) {
      state.loading = true;
    },
    updateProductRequest(state) {
      state.loading = true;
    },

    deleteProductSuccess(state, action) {
      state.loading = false;
      state.isDeleted = action.payload.isDeleted;
    },
    updateProductSuccess(state, action) {
      state.loading = false;
      state.isUpdated = action.payload.isUpdated;
    },


    deleteProductFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    updateProductFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },


    deleteProductReset(state) {
      state.isDeleted = false;
    },
    updateProductReset(state) {
      state.isUpdated= false;
    },

    clearError(state) {
      state.error = null;
    },
  },
});

export const adminProductActions = adminProductSlice.actions;

export default adminProductSlice;

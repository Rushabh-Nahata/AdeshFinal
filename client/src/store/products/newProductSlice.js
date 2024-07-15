import { createSlice } from "@reduxjs/toolkit";

const newProductSlice = createSlice({
  name: "newProductAdmin",
  initialState: {
    product: {},
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    // eslint-disable-next-line no-unused-vars
    newProductRequest(state, action) {
      state.loading = true;
    },
    newProductSuccess(state, action) {
      state.loading = false;
      state.success = action.payload.success;
      state.product = action.payload.product;
    },
    newProductFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    newProductReset(state) {
      state.success = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const newProductActions = newProductSlice.actions;

export default newProductSlice;

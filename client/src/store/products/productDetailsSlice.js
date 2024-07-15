import { createSlice } from "@reduxjs/toolkit";

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    product: {},
    loading: true,
    error: null,
  },
  reducers: {
    // eslint-disable-next-line no-unused-vars
    getAllProductDetails(state, action) {
      state.loading = false;
      state.product = action.payload.product;
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

export const productDetailsSliceActions = productDetailsSlice.actions;

export default productDetailsSlice;

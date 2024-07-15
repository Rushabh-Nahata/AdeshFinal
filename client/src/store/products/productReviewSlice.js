import { createSlice } from "@reduxjs/toolkit";

const productReviewSlice = createSlice({
  name: "productReview",
  initialState: {
    success: false,
    loading: true,
    error: null,
  },
  reducers: {
    // eslint-disable-next-line no-unused-vars
    newReviewRequest(state, action) {
      state.loading = true;
    },
    newReviewSuccess(state, action) {
        state.loading = false;
        state.success = action.payload.success;
    },
    newReviewFail(state, action) {
        state.loading = false;
        state.error = action.payload.error;
    },
    newReviewReset(state) {
      state.success = false;
      state.loading=false;
      state.error=null
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const productReviewActions = productReviewSlice.actions;

export default productReviewSlice;

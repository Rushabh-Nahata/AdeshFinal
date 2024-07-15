import { createSlice } from "@reduxjs/toolkit";

const orderDetailsSlice = createSlice({
  name: "myOrder",
  initialState: {
    loading: false,
    order: {},
    error: null,
  },
  reducers: {
    // eslint-disable-next-line no-unused-vars
    orderDetailsRequest(state, action) {
      state.loading = true;
    },
    orderDetailsSuccess(state, action) {
      state.order = action.payload.order;
      state.loading = false;
    },
    orderDetailsFail(state, action) {
      state.error = action.payload.error;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const orderDetailsActions = orderDetailsSlice.actions;

export default orderDetailsSlice;

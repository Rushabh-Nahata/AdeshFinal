import { createSlice } from "@reduxjs/toolkit";

const allOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState: {
    loading: false,
    orders: [],
    error: null,
  },
  reducers: {
    // eslint-disable-next-line no-unused-vars
    allOrderRequest(state, action) {
      state.loading = true;
    },
    allOrderSuccess(state, action) {
      state.orders = action.payload.orders;
      state.loading = false;
    },
    allOrderFail(state, action) {
        state.error = action.payload.error;
        state.loading = false;
    },
    allOrderError(state) {
      state.error = null;
    },
  },
});

export const allOrderActions = allOrderSlice.actions;

export default allOrderSlice;
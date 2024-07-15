import { createSlice } from "@reduxjs/toolkit";

const myOrdersSlice = createSlice({
  name: "myOrder",
  initialState: {
    loading: false,
    orders: [],
    error: null,
  },
  reducers: {
    // eslint-disable-next-line no-unused-vars
    myOrderRequest(state, action) {
      state.loading = true;
    },
    myOrderSuccess(state, action) {
      state.orders = action.payload.orders;
      state.loading = false;
    },
    myOrderFail(state, action) {
        state.error = action.payload.error;
        state.loading = false;
    },
    myOrderError(state) {
      state.error = null;
    },
  },
});

export const myOrderActions = myOrdersSlice.actions;

export default myOrdersSlice;
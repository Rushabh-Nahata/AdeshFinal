import { createSlice } from "@reduxjs/toolkit";

const adminOrderSlice = createSlice({
  name: "adminOrderAdmin",
  initialState: {
    loading: false,
    error: null,
    isDeleted: false,
    isUpdated:false
  },
  reducers: {
    // eslint-disable-next-line no-unused-vars
    deleteOrderRequest(state) {
      state.loading = true;
    },
    updateOrderRequest(state) {
      state.loading = true;
    },

    deleteOrderSuccess(state, action) {
      state.loading = false;
      state.isDeleted = action.payload.isDeleted;
    },
    updateOrderSuccess(state, action) {
      state.loading = false;
      state.isUpdated = action.payload.isUpdated;
    },


    deleteOrderFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    updateOrderFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },


    deleteOrderReset(state) {
      state.isDeleted = false;
    },
    updateOrderReset(state) {
      state.isUpdated= false;
    },

    clearError(state) {
      state.error = null;
    },
  },
});

export const adminOrderActions = adminOrderSlice.actions;

export default adminOrderSlice;

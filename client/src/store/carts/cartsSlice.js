import { createSlice } from "@reduxjs/toolkit";

const cartsSlice = createSlice({
  name: "carts",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    item: {},
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  reducers: {
    addToCart(state, action) {
      state.item = action.payload.item;

      const isItemExist = state.cartItems.find(
        (i) => i.product === state.item.product
      );

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? state.item : i
        );
      } else {
        state.cartItems.push(state.item);
        // state.cartItems = [...state.cartItems, state.item];
      }
    },

    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (i) => i.product !== action.payload.id
      );
    },

    saveShippingInfo(state, action) {
      state.shippingInfo = action.payload.shippingInfo;
    },
  },
});

export const cartsActions = cartsSlice.actions;

export default cartsSlice;

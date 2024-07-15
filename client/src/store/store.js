// store.js
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productSlice from "./products/productSlice";
import productDetailsSlice from "./products/productDetailsSlice";
import userSlice from "./users/userSlice";
import userProfileSlice from "./users/userProfileSlice";
import forgotPasswordSlice from "./users/forgotPasswordSlice";
import cartsSlice from "./carts/cartsSlice";
import orderSlice from "./orders/orderSlice";
import myOrdersSlice from "./orders/myOrdersSlice";
import orderDetailsSlice from "./orders/orderDetailsSlice";
import productReviewSlice from "./products/productReviewSlice";
import newProductSlice from "./products/newProductSlice";
import adminProductSlice from "./products/adminProductSlice";
import allOrderSlice from "./orders/orderAdmin/allOrderSlice";
import adminOrderSlice from "./orders/orderAdmin/adminOrderSlice";

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    productDetails: productDetailsSlice.reducer,
    user: userSlice.reducer,
    profile: userProfileSlice.reducer,
    forgot: forgotPasswordSlice.reducer,
    carts: cartsSlice.reducer,
    order: orderSlice.reducer,
    myOrders: myOrdersSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
    newReview: productReviewSlice.reducer,
    newProduct: newProductSlice.reducer,
    adminProduct: adminProductSlice.reducer,
    allOrders: allOrderSlice.reducer,
    adminOrder: adminOrderSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

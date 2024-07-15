import axios from "axios";
import { orderActions } from "./orderSlice";
import { myOrderActions } from "./myOrdersSlice";
import { orderDetailsActions } from "./orderDetailsSlice";
import { allOrderActions } from "./orderAdmin/allOrderSlice";
import { adminOrderActions } from "./orderAdmin/adminOrderSlice";

// Create Order
export const createOrder = async (dispatch, order) => {
  try {
    dispatch(orderActions.orderRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      "https://karwadenge-server.onrender.com/api/v1/order/new",
      order,
      config
    );

    console.log(data);

    dispatch(
      orderActions.orderSuccess({
        order: data,
      })
    );
  } catch (e) {
    console.log(e);
    dispatch(
      orderActions.orderFail({
        error: e.response.data.message,
      })
    );
  }
};

// My Orders
export const myOrders = async (dispatch) => {
  try {
    dispatch(myOrderActions.myOrderRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(
      "https://karwadenge-server.onrender.com/api/v1/orders/me",
      config
    );

    dispatch(
      myOrderActions.myOrderSuccess({
        orders: data.orders,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      myOrderActions.myOrderFail({
        error: error.response.data.message,
      })
    );
  }
};

// Get All Orders (admin)
export const getAllOrders = async (dispatch) => {
  try {
    dispatch(allOrderActions.allOrderRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(
      "https://karwadenge-server.onrender.com/api/v1/admin/orders",
      config
    );
    console.log(data);

    dispatch(
      allOrderActions.allOrderSuccess({
        orders: data.orders,
      })
    );
  } catch (error) {
    dispatch(allOrderActions.allOrderFail());
  }
};

// Delete Order (Admin)
export const deleteOrder = async (dispatch, id) => {
  try {
    dispatch(adminOrderActions.deleteOrderRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.delete(
      `https://karwadenge-server.onrender.com/api/v1/admin/order/${id}`,
      config
    );

    dispatch(
      adminOrderActions.deleteOrderSuccess({
        isDeleted: data.success,
      })
    );
  } catch (error) {
    dispatch(
      adminOrderActions.deleteOrderFail({
        error: error.response.data.message,
      })
    );
  }
};

// Update Order (Admin)
export const updateOrder = async (dispatch, id, order) => {
  try {
    dispatch(adminOrderActions.updateOrderRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `https://karwadenge-server.onrender.com/api/v1/admin/order/${id}`,
      order,
      config
    );

    dispatch(
      adminOrderActions.updateOrderSuccess({
        isUpdated: data.success,
      })
    );
  } catch (error) {
    dispatch(
      adminOrderActions.updateOrderFail({
        error: error.response.data.message,
      })
    );
  }
};

// Get Order Details
export const getOrderDetails = async (dispatch, id) => {
  try {
    dispatch(orderDetailsActions.orderDetailsRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(
      `https://karwadenge-server.onrender.com/api/v1/order/${id}`,
      config
    );

    dispatch(
      orderDetailsActions.orderDetailsSuccess({
        order: data.order,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      orderDetailsActions.orderDetailsFail({
        error: error.response.data.message,
      })
    );
  }
};

// Clearing Errors
export const clearErrors = async (dispatch) => {
  dispatch(orderActions.clearError());
};

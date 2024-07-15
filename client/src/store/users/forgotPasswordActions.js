import axios from "axios";
import { forgotPasswordActions } from "./forgotPasswordSlice";

// Forgot Password
export const forgotPassword = async (dispatch, email) => {
  try {
    dispatch(forgotPasswordActions.forgotPasswordRequest());

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `http://localhost:4000/api/v1/password/forgot`,
      email,
      config
    );

    dispatch(
      forgotPasswordActions.forgotPasswordSuccess({
        message: data.message,
      })
    );
  } catch (e) {
    console.log(e);
    dispatch(
      forgotPasswordActions.forgotPasswordFail({
        error: e.response.data.message,
      })
    );
  }
};

// Reset Password
export const resetPassword = async (dispatch, token, passwords) => {
  try {
    dispatch(forgotPasswordActions.resetPasswordRequest());

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `http://localhost:4000/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch(
      forgotPasswordActions.resetPasswordSuccess({
        success: data.message,
      })
    );
  } catch (e) {
    console.log(e);
    dispatch(
      forgotPasswordActions.resetPasswordFail({
        error: e.response.data.message,
      })
    );
  }
};

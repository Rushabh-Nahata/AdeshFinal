import axios from "axios";
import { userProfileActions } from "./userProfileSlice";

// Update Profile
export const updateProfile = async (dispatch, userData) => {
  try {
    dispatch(userProfileActions.updateProfileRequest());

    const config = {
      headers: {
        "Content-Type": "application/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `https://karwadenge-server.onrender.com/api/v1/me/update`,
      userData,
      config
    );

    dispatch(
      userProfileActions.updateProfileSuccess({
        isUpdated: data.success,
      })
    );
  } catch (e) {
    console.log(e);
    dispatch(
      userProfileActions.updateProfileFail({
        error: e.response.data.message,
      })
    );
  }
};

// Update Password
export const updatePassword = async (dispatch, passwords) => {
  try {
    dispatch(userProfileActions.updatePasswordRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `https://karwadenge-server.onrender.com/api/v1/password/update`,
      passwords,
      config
    );

    dispatch(
      userProfileActions.updateProfileSuccess({
        isUpdated: data.success,
      })
    );
  } catch (e) {
    console.log(e);
    dispatch(
      userProfileActions.updateProfileFail({
        error: e.response.data.message,
      })
    );
  }
};

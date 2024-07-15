import axios from "axios";
import { userActions } from "../users/userSlice";

export const login = async (dispatch, email, password) => {
  try {
    dispatch(userActions.userLoginRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `http://localhost:4000/api/v1/login`,
      { email, password },
      config
    );

     const token = data.token;
    // Store the token in localStorage
  localStorage.setItem('token', token);

    dispatch(
      userActions.userLoginSuccess({
        user: data.user,
      })
    );
  } catch (e) {
    console.log(e);
    dispatch(
      userActions.setError({
        error: e.response.data.message,
        loading: false,
      })
    );
  }
};

// Register
export const register = async (dispatch, userData) => {
  try {
    dispatch(userActions.userRegisterRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/register",
      userData,
      config
    );
    const token = data.token;
    // Store the token in localStorage
     localStorage.setItem('token', token);

    dispatch(
      userActions.userRegisterSuccess({
        user: data.user,
        loading: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      userActions.setError({
        error: error.response.data.message,
        loading: false,
      })
    );
  }
};

// Load User

export const loadUser = () => async (dispatch) => {
  console.log("Inisde loaduSer")
  try {
    dispatch(userActions.userLoadRequest());

    const token = localStorage.getItem('token');
    console.log("hi");

    if (!token) {
      // throw new Error('No token found in localStorage.');
      // alert("No token fond");
      console.log("No token found in localStorage.")
    }else{
       console.log("token found .");
    }
    

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get('http://localhost:4000/api/v1/me', config);

    dispatch(userActions.userLoadSuccess({ user: data.user }));
  } catch (error) {
    console.error('Error loading user:', error);
    dispatch(userActions.userLoadFail({ error: error.response ? error.response.data.message : error.message }));
  }
};



// Logout User
export const logout = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    await axios.get("http://localhost:4000/api/v1/logout", config);

    console.log("Logout Loading");

    // Remove token from localStorage
    console.log('Before removing token:', localStorage.getItem('token'));
    localStorage.removeItem('token');
    console.log('After removing token:', localStorage.getItem('token'));


    // Dispatch the logout action to update the state
    dispatch(userActions.userLogOutSuccess());
  } catch (error) {
    console.error('Logout error:', error);
    dispatch(
      userActions.setError({
        error: error.response?.data?.message || error.message,
        loading: false,
      })
    );
  }
};

// Clearing Errors
export const clearErrors = async (dispatch) => {
  dispatch(userActions.clearError());
};

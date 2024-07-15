import  { useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../../store/users/userActions";
import {  resetPassword} from "../../../store/users/forgotPasswordActions";
import { useAlert } from "react-alert";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, useParams } from "react-router";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigateTo = useNavigate();
  const params = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgot
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    resetPassword(dispatch,params.token, myForm)
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      clearErrors(dispatch);
    }

    if (success) {
      alert.success("Password Updated Successfully");

      navigateTo("/login");
    }
  }, [dispatch, error, alert, navigateTo , success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOutlinedIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;

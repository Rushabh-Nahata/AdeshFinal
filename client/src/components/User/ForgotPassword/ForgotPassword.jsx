import { useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../../layout/Loader/Loader";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../../store/users/userActions";
import {  forgotPassword } from "../../../store/users/forgotPasswordActions";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgot
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    forgotPassword(dispatch,myForm);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      clearErrors(dispatch)
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <EmailOutlinedIcon/>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;

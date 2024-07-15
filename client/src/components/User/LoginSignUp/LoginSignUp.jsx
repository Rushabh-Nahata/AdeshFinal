import { useRef, useState, useEffect } from "react";
import {  Box } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import FaceIcon from "@mui/icons-material/Face";
import Loader from "../../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../../store/users/userActions";
import { useAlert } from "react-alert";
import "./LoginSignUp.css";

function LoginSignUp() {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
      login(dispatch, loginEmail, loginPassword);
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    register(dispatch, myForm);
    navigateTo("/verify")

    console.log("Register Form Submitted !");
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (error) {
      alert.error(error);
      clearErrors(dispatch);
    }
    if (isAuthenticated) {
      navigateTo(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, navigateTo, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      <Box className="LoginSignUpContainer">
        <Box className="LoginSignUpBox">
          {loading ? (
            <Loader />
          ) : (
            <>
              {" "}
              <Box>
                <Box className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                  <p onClick={(e) => switchTabs(e, "register")}>Register</p>
                </Box>
                <button ref={switcherTab}></button>
              </Box>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <Box className="loginEmail">
                  <EmailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    className="highlight-on-focus"
                    required  
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </Box>
                <Box className="loginPassword">
                  <LockOpenOutlinedIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    className="highlight-on-focus"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </Box>
                  <Link to="/password/forgot" className="forgot-password-link">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
                {/* <Alert severity="warning">
                  Use these credentials to log in as an admin ! <br />
                  <br />
                  <p>Username : admin@gmail.com</p>
                  <p>Password : 12345678</p>
                  <br />
                </Alert> */}
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    className="highlight-on-focus"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <EmailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    className="highlight-on-focus"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenOutlinedIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    className="highlight-on-focus"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default LoginSignUp;

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Typography } from "@mui/material";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserOptions from "../UserOptions/UserOptions";

function NavBar() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.carts);
  console.log(cartItems)

  return (
    <Box
      className="home-navbar-container"
      sx={{
        // border: "2px solid black",
        width: "100% !important",
        height: "9vh !important",
        display: "flex !important",
        alignItems: "center !important",
        justifyContent: "space-between !important",
        borderBottom: "1px solid #0000001f !important",
        position: "fixed",
        top: "0px !important",
        zIndex: "2 !important",
        backgroundColor: "white !important",
      }}
    >
      <Box
        className="navbar-logo-container"
        sx={{
          // border: "2px solid black",
          width: "fit-content !important",
          height: "67% !important",
          display: "flex !important",
          alignItems: "center !important",
          fontSize: "1.8rem !important",
          fontWeight: "700 !important",
          marginLeft: "3vw !important",
          fontFamily: "Montserrat !important",
        }}
      >
        <span>KARWADENGE</span>
      </Box>
      <Box
        className="navbar-options-container"
        sx={{
          // border: "2px solid black",
          display: "flex !important",
          alignItems: "center !important",
          justifyContent: "space-evenly !important",
          width: "fit-content !important",
          marginRight: "4vw !important",
        }}
      >
        <Link to="/">
          <Typography
            sx={{
              marginLeft: "3vw !important",
              fontWeight: "500 !important",
              fontFamily: "Montserrat !important",
              cursor: "pointer !important",
              textDecoration: "none !important",
              color: "black !important",
            }}
          >
            Home
          </Typography>
        </Link>
        <Link to="/products">
          <Typography
            sx={{
              marginLeft: "3vw !important",
              fontWeight: "500 !important",
              fontFamily: "Montserrat !important",
              cursor: "pointer !important",
              textDecoration: "none !important",
              color: "black !important",
            }}
          >
            Products
          </Typography>
        </Link>

        <Link to="/contact">
          <Typography
            sx={{
              marginLeft: "3vw !important",
              fontWeight: "500 !important",
              fontFamily: "Montserrat !important",
              cursor: "pointer !important",
              textDecoration: "none !important",
              color: "black !important",
            }}
          >
            Contact
          </Typography>
        </Link>

        <Link to="/about">
          <Typography
            sx={{
              marginLeft: "3vw !important",
              fontWeight: "500 !important",
              fontFamily: "Montserrat !important",
              cursor: "pointer !important",
              textDecoration: "none !important",
              color: "black !important",
            }}
          >
            About
          </Typography>
        </Link>

        {isAuthenticated ? (
          <UserOptions user={user} />
        ) : (
          <Link to="/login">
            <AccountCircleIcon
              sx={{
                marginLeft: "2.5vw",
                fontWeight: "500",
                fontSize: "26px",
                cursor: "pointer",
                textDecoration: "none",
                color: "black",
              }}
            />
          </Link>
        )}
        <Link to="/cart">
          <LocalMallOutlinedIcon
            sx={{
              marginLeft: "2.5vw",
              fontWeight: "500",
              fontSize: "26px",
              cursor: "pointer",
              textDecoration: "none",
              color: "black",
            }}
          />
        </Link>
        <Link to="/search">
          <SearchIcon
            sx={{
              marginLeft: "2.5vw",
              fontWeight: "500",
              fontSize: "26px",
              cursor: "pointer",
              textDecoration: "none",
              color: "black",
            }}
          />
        </Link>
      </Box>
    </Box>
  );
}

export default NavBar;

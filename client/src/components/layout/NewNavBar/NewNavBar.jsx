import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import UserOptions from "../UserOptions/UserOptions";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NewNavBar.css";

// const pages = ["Home", "Products", "Contact", "About"];
const pages = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Contact", path: "/contact" },
  { name: "About", path: "/about" },
];
function NewNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.carts);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        // marginTop: "98px !important",
        backgroundColor: "white !important",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            className="navbar-logo-container"
            sx={{
              // border: "2px solid black",
              width: "fit-content !important",
              height: "67% !important",
              display: "flex !important",
              alignItems: "center !important",
              fontSize: { xs: "1.3rem !important", sm: "1.8rem !important" },
              fontWeight: "700 !important",
              fontFamily: "Montserrat !important",
              marginRight: "2vh",
              color: "black !important",
            }}
          >
            <span>KARWADENGE</span>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              color: "black !important",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link
                    to={`${page.path}`}
                    sx={{
                      color: "black !important",
                    }}
                  >
                    <Typography
                      textAlign="center"
                      sx={{
                        color: "black !important",
                      }}
                    >
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <>
                <Link
                  key={page.name}
                  to={`${page.path}`}
                  sx={{
                    color: "black !important",
                  }}
                >
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "black !important",
                      display: "block",
                      marginRight: "1vh !important",
                    }}
                  >
                    {page.name}
                  </Button>
                </Link>
              </>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
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
            </Tooltip>
          </Box>
          <Link to="/cart" className="cartLink">
            <LocalMallOutlinedIcon
              sx={{
                marginLeft: "2.5vw",
                fontWeight: "500",
                fontSize: "26px",
                cursor: "pointer",
                textDecoration: "none",
                color: "#4e4e4e",
              }}
            />
            {
              cartItems.length > 0 ? (<span className="cartCount">{cartItems.length}</span>):null
            }
            
          </Link>
          <Link to="/search">
            <SearchIcon
              sx={{
                marginLeft: "2.5vw",
                fontWeight: "500",
                fontSize: "26px",
                cursor: "pointer",
                textDecoration: "none",
                color: "#4e4e4e",
              }}
            />
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NewNavBar;

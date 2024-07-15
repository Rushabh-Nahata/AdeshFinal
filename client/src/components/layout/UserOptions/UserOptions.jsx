/* eslint-disable react/prop-types */
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAlert } from "react-alert";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/users/userActions";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

// eslint-disable-next-line react/prop-types
function UserOptions({ user }) {
  const navigateTo = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function dashboard() {
    navigateTo("/admin/dashboard");
  }

  function orders() {
    navigateTo("/orders");
  }
  function account() {
    navigateTo("/account");
  }
  function cart() {
    navigateTo("/cart");
  }

    const logoutUser = async () => {
    try {
      await dispatch(logout());
    } catch (error) {
      console.error('Logout error:', error);
      // Handle any logout errors or dispatch additional actions as needed
    }
     navigateTo("/")
    alert.success("Logout Successfully");
  };

  
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 32, height: 32 }}
              alt={user.name}
              src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            >
              M
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {user.role === "admin" ? (
          <MenuItem
            onClick={() => {
              handleClose();
              dashboard();
            }}
          >
            <DashboardIcon
              fontSize="small"
              sx={{
                color: "rgba(0, 0, 0, 0.54)",
                marginRight: "1vw",
              }}
            />
            Dashboard
          </MenuItem>
        ) : (
          ""
        )}

        <MenuItem
          onClick={() => {
            handleClose();
            orders();
          }}
        >
          <ListAltIcon
            fontSize="small"
            sx={{
              color: "rgba(0, 0, 0, 0.54)",
              marginRight: "1vw",
            }}
          />{" "}
          Orders
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            cart();
          }}
        >
          <ShoppingCartOutlinedIcon
            fontSize="small"
            sx={{
              color: "rgba(0, 0, 0, 0.54)",
              marginRight: "1vw",
            }}
          />{" "}
          Cart
        </MenuItem>
        <MenuItem
          fontSize="small"
          onClick={() => {
            handleClose();
            account();
          }}
        >
          <PersonIcon
            sx={{
              color: "rgba(0, 0, 0, 0.54)",
              marginRight: "1vw",
            }}
          />{" "}
          My Account
        </MenuItem>
        <Divider />

        <MenuItem
          onClick={() => {
            handleClose();
            logoutUser();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserOptions;

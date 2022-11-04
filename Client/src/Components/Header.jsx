import React, { useEffect, useState } from "react";
import {
  AppBar,
  Tab,
  Tabs,
  Box,
  Toolbar,
  Typography,
  styled,
  InputBase,
  Badge,
  Avatar,
  MenuItem,
  Menu,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { BsFillChatFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FiLogOut, FiMoreVertical, FiSettings } from "react-icons/fi";
import { RiNotificationFill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import "@fontsource/roboto/700.css";
import LogoImage from "./Logo";
import { useDispatch } from "react-redux";
import { logout } from "../Features/Auth/authSlice";
import { useNavigate } from "react-router-dom";
const ToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const Logo = styled(LogoImage)(({ theme }) => ({
  display: "block",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "25%",
  height: "30px",
  display: "block",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "25px",
  fontSize: "20px",
  alignItems: "center",
}));
const SearchIcon = styled(BsSearch)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));
const TabNew = styled(Tab)(({ theme }) => ({
  border: "2px solid white",
  color: "white",
  borderRadius: "5px",
  margin: "5px",
}));
function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = async () => {
    console.log("logout");
    dispatch(logout());
    window.location.reload();
    //  localStorage.removeItem('user')

    navigate("/");
  };
  // let user = true;

  return (
    <div>
      <AppBar sx={{ background: "#00303F", position: "fixed" }}>
        <ToolBar>
          <div style={{ display: "flex" }}>
            {/* <Logo /> */}
            <Typography
              variant="h4"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              InstaBook
            </Typography>
          </div>
          {/* {
            user &&
            <> */}
          <Icons>
            <SearchIcon
              onClick={() => {
                navigate("/user");
              }}
            />
            <Badge badgeContent={4} color="error">
              <FaUser />
            </Badge>
            <Badge badgeContent={4} color="error">
              <BsFillChatFill />
            </Badge>
            <Badge badgeContent={4} color="error">
              <RiNotificationFill />
            </Badge>
          </Icons>
          <Search>
            <InputBase placeholder="Search..." />
          </Search>
          <Icons>
            <Badge
              badgeContent={0}
              color="error"
              style={{ alignItems: "center" }}
              onClick={handleClick}
              size="small"
              sx={{ ml: 2, cursor: "pointer" }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar src="" sx={{ width: 24, height: 24 }} />
              <FiMoreVertical />
            </Badge>
          </Icons>
          {/* </>
} */}

          {/* {!user && 
          <Tabs >
            <TabNew label="Login" />
            <TabNew label="Sign Up" />

          </Tabs>
          
          } */}
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
            <MenuItem>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                {/* <PersonAdd fontSize="small" /> */}
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <FiSettings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={logOut}>
              <ListItemIcon>
                <FiLogOut fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </ToolBar>
      </AppBar>
    </div>
  );
}

export default Header;

import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
} from "@mui/material";
import { BsSearch } from "react-icons/bs";
import ChatLoading from "./Extras/ChatLoading";

function SideDrawer(props) {
  const {
    onclick,
    toggle,
    onclose,
    handleSearch,
    loading,
    searchResult,
    accessChat,
  } = props;
  return (
    <>
      <Box sx={{ backgroundColor: "", margintop: "0", marginRight: "auto" }}>
        <Tooltip title="Search user" arrow>
          <Button
            variant="outlined"
            size="large"
            sx={{ fontSize: "1.5rem", marginLeft: "10px", color: "#00303f" }}
            onClick={onclick}
          >
            <BsSearch />
          </Button>
        </Tooltip>
      </Box>
      <Drawer
        anchor={"left"}
        open={toggle}
        onClose={onclose}
        variant="temporary"
        // sx={{ backgroundColor: "#00303f" }}
        // ModalProps={{
        //   keepMounted: true, // Better open performance on mobile.
        // }}
      >
        {/* <Box
          sx={{ width: 250 }}
          role="search"
          onClick={toggleDrawer(false)}

          //   onKeyDown={toggleDrawer(false)}
        > */}
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
              {/* <ListItemText primary={"text"} /> */}
              <TextField
                //   label="Outlined secondary"
                color="secondary"
                focused
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ fontSize: "1.5rem" }}>
                      <BsSearch />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
              />
            </ListItemButton>
          </ListItem>
          {/* ))} */}
        </List>
        <Divider />
        <List>
          {loading ? (
            <ChatLoading />
          ) : (
            searchResult.map((user, index) => (
              <ListItem key={user._id} disablePadding>
                <ListItemButton onClick={() => accessChat(user._id, index)}>
                  <ListItemIcon>
                    <Avatar />
                  </ListItemIcon>
                  <ListItemText primary={user.name} />
                </ListItemButton>
              </ListItem>
            ))
          )}
          {/* ))} */}
        </List>
        {/* </Box> */}
      </Drawer>
    </>
  );
}

export default SideDrawer;

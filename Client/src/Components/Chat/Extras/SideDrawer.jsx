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
  Typography,
} from "@mui/material";
import { BsSearch } from "react-icons/bs";
import ChatLoading from "./ChatLoading";

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
            sx={{
              fontSize: "1rem",
              color: "#00303f",
              borderColor: "black",
              padding: " 10px",
            }}
            onClick={onclick}
          >
            <BsSearch
              style={{
                paddingRight: "5px",
                fontSize: "1.5rem",
              }}
            />
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
          ) : searchResult.length > 0 ? (
            searchResult.map((user, index) => (
              <ListItem key={user._id} disablePadding>
                <ListItemButton
                  sx={{
                    backgroundColor: "gray",
                    margin: "2px 15px",
                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    accessChat(user._id);
                  }}
                >
                  <ListItemIcon>
                    <Avatar />
                  </ListItemIcon>
                  <ListItemText primary={user.name} />
                </ListItemButton>
              </ListItem>
            ))
          ) : // <Typography>No User found</Typography>
          null}
          {/* ))} */}
        </List>
        {/* </Box> */}
      </Drawer>
    </>
  );
}

export default SideDrawer;

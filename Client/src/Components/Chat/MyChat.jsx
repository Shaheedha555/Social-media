import {
  Avatar,
  Box,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

// const style = (theme) => ({
//   root: {
//     display: "flex",
//     width: "100vw",
//     backgroundColor: "yellow",
//   },
//   [theme.breakpoints.down("md")]: {
//     display: "none",
//     width: "31vw",
//   },
// });

function MyChat(props) {
  const { chat, accessChat } = props;
  const { user } = useSelector((state) => state.chat);
  const getSenderName = (user, users) => {
    return users[0]._id === user._id ? users[1].name : users[0].name;
  };
  const getSenderId = (user, users) => {
    return users[0]._id === user._id ? users[1]._id : users[0]._id;
  };

  return (
    // <Grid container>
    //   <Grid item>
    <Box
      // display={"flex"}
      // justifyContent={"space-between"}
      width={"20vw"}
      height={"91.5vh"}
      backgroundColor={"pink"}
      padding={"10px"}
    >
      {/* <Drawer
        anchor={"left"}
        // open={toggle}
        // onClose={toggleDrawer(false)}
        variant="permanent"
        // sx={{ minWidth: "50vw" }}
        PaperProps={{
          sx: { width: "20%", padding: "20px" },
        }}
      > */}
      {/* <SideDrawer /> */}
      <List>
        {/* {loading ? (
            <ChatLoading />
          ) : ( */}
        {chat &&
          chat.map((chat) => (
            <ListItem key={chat._id} disablePadding>
              <ListItemButton
                onClick={() => {
                  accessChat(getSenderId(user, chat.users));
                }}
              >
                <ListItemIcon>
                  <Avatar />
                </ListItemIcon>
                <ListItemText primary={getSenderName(user, chat.users)} />
              </ListItemButton>
            </ListItem>
            // {/* ))} */}
            // {/* )} */}
          ))}
      </List>
      {/* </Drawer> */}
      {/* {selectedChat ? (
        <ChatBox chat={getSender} messages={msg} />
      ) : (
        <div>No Chat selected</div>
      )} */}
    </Box>

    //   </Grid>
    // </Grid>
  );
}

export default MyChat;

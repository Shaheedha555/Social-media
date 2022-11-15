import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button as Button2,
} from "@mui/material";
import Button from "../Controls/Button/Button";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import {
  getAllChat,
  getChat,
  getAllMessages,
  searchUser,
} from "../../Features/Chat/chatSlice";
import ChatLoading from "./Extras/ChatLoading";
import SideDrawer from "./Extras/SideDrawer";
import { getSender } from "./Extras/ChatLogics/ChatFunctions";
import GroupChatModal from "./Extras/GroupChatModal";
import "./Chat.scss";
import { useNavigate } from "react-router-dom";
function MyChat({ fetchAgain, selectedChat, setSelectedChat }) {
  const { user } = useSelector((state) => state.auth);
  const { chat, isLoading } = useSelector((state) => state.chat);
  const [toggle, setToggle] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSearch = async (e) => {
    try {
      setLoading(true);
      const { payload } = await dispatch(searchUser(e.target.value));
      setSearchResult(payload);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleDrawer = (action) => () => {
    setToggle(action);
  };

  const fetchChat = async () => {
    await dispatch(getAllChat());
  };
  useEffect(() => {
    fetchChat();
  }, [fetchAgain]);

  const accessChat = async (userId) => {
    setToggle(false);
    await dispatch(getChat(userId));
  };
  return (
    <Box
      className="chatlist"
      display={{ xs: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems={"center"}
      width={{ xs: "100vw", md: "25vw" }}
      borderRadius="10px"
      height={"99vh"}
      padding={"3px"}
    >
      <Box
        padding={"10px 5px 20px"}
        fontSize={{ xs: "28px", md: "30px" }}
        fontFamily="Work sans"
        display={"flex"}
        width={"100%"}
        alignItems={"center"}
      >
        <Button2 sx={{ color: "black" }} onClick={() => navigate("/")}>
          <CloseIcon />
        </Button2>
        <Typography paddingRight={"1rem"} sx={{ fontSize: "30px" }}>
          My Chats
        </Typography>{" "}
      </Box>
      <Box
        display={"flex"}
        flexDirection="row"
        width="100%"
        justifyContent={"space-between"}
      >
        <SideDrawer
          onclick={toggleDrawer(true)}
          toggle={toggle}
          onclose={toggleDrawer(false)}
          handleSearch={handleSearch}
          loading={loading}
          searchResult={searchResult}
          accessChat={accessChat}
        />
        <GroupChatModal>
          <Button class="primarySmall">
            <GroupAddIcon />
            <span>Create group</span>
          </Button>
        </GroupChatModal>
      </Box>
      <List sx={{ width: "100%", backgroundColor: "grey" }}>
        {isLoading ? (
          <ChatLoading />
        ) : chat.length > 0 ? (
          chat.map((chat) => (
            <ListItem
              className={`lists ${
                selectedChat?._id === chat._id ? "selected" : null
              }`}
              key={chat._id}
              disablePadding
            >
              <ListItemButton
                onClick={() => {
                  setSelectedChat(chat);
                }}
              >
                <ListItemIcon>
                  <Avatar />
                </ListItemIcon>
                <ListItemText
                  primary={
                    !chat.isGroupChat
                      ? getSender(user, chat.users)
                      : chat.chatName
                  }
                />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <Typography
            variant="h5"
            style={{ textAlign: "center", marginTop: "2rem" }}
          >
            No Chats
          </Typography>
        )}
      </List>
    </Box>
  );
}

export default MyChat;

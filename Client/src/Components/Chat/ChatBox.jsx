import { Box } from "@mui/material";
import React from "react";
import SingleChat from "./Extras/SingleChat";
import "./Chat.scss";

const ChatBox = ({
  fetchAgain,
  setFetchAgain,
  selectedChat,
  setSelectedChat,
}) => {
  return (
    <Box
      className="chatbox"
      display={{ xs: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDirection="column"
      width={{ xs: "100vw", md: "75vw" }}
      borderRadius="8px"
      height={"100vh"}
    >
      <SingleChat
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
    </Box>
  );
};

export default ChatBox;

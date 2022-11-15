import React, { useState } from "react";
import { Box } from "@mui/material";
import MyChat from "./MyChat";
import Chatbox from "./ChatBox";

function Chat() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <MyChat
          fetchAgain={fetchAgain}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />

        <Chatbox
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      </Box>
    </>
  );
}

export default Chat;

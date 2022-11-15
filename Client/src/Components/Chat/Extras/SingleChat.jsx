import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAlert,
  getAllMessages,
  sendMessage,
} from "../../../Features/Chat/chatSlice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import io from "socket.io-client";
import ChatInput from "./ChatInput";
import ScrollableChat from "./ScrollableChat";
import { getSender, getSenderFull } from "../Extras/ChatLogics/ChatFunctions";
import styled from "@emotion/styled";
import LoadingSpinner from "../../LoadingSpinner/Spinner";
import Alert from "../../Alert";
import "../Chat.scss";
const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;
const SingleChat = ({
  fetchAgain,
  setFetchAgain,
  selectedChat,
  setSelectedChat,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isMessageLoading, notification } = useSelector((state) => state.chat);
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const data = await dispatch(getAllMessages(selectedChat._id));
      setMessages(data.payload.data);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(error);
    }
  };
  const sendmessage = async (event) => {
    if (newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const { payload } = await dispatch(
          sendMessage({ chatId: selectedChat._id, content: newMessage })
        );
        socket.emit("new message", payload.data);
        setMessages([...messages, payload.data]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (user) {
      socket = io(ENDPOINT);
      socket.emit("setup", user);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
    }
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          dispatch(
            createAlert({ time: Date.now(), message: newMessageRecieved })
          );
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  const getName = (user, users) => {
    const data = getSenderFull(user, users);
    let name = data.name;
    let fName = name.split(" ");
    return fName[0];
  };
  return (
    <>
      <Alert />
      {selectedChat ? (
        <>
          <div className="chat-header">
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "center",
                    }}
                  >
                    <ArrowBackIosIcon
                      sx={{ display: { xs: "flex", md: "none" } }}
                      color={"black"}
                      onClick={() => {
                        setSelectedChat(null);
                      }}
                    />
                    <Avatar />
                    <Typography textTransform={"capitalize"} variant="h6">
                      {getSender(user, selectedChat.users)}
                    </Typography>
                  </div>

                  {/* <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  /> */}
                  <button>UserDetails</button>
                </>
              ) : (
                <>
                  <Typography>{selectedChat.chatName.toUpperCase()}</Typography>
                  <button>GroupDetails</button>
                  {/* <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  /> */}
                </>
              ))}
          </div>
          <Box
            position={"relative"}
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            paddingTop={"3px"}
            width="100%"
            height="100%"
            borderRadius="lg"
            overflow="hidden"
          >
            {isMessageLoading ? (
              <LoadingSpinner
                style={{
                  position: "absolute",
                  top: "45%",
                  right: "45%",
                  height: "50px",
                  width: "50px",
                }}
              />
            ) : (
              <Container className="messages">
                <ScrollableChat messages={messages} />
              </Container>
            )}

            {istyping && (
              <div style={{}}>
                {getName(user, selectedChat?.users)} is typing....
              </div>
            )}

            <ChatInput
              value={newMessage}
              onChange={typingHandler}
              handleSendMsg={sendmessage}
              setValue={setNewMessage}
            />
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Typography variant="h4" paddingBottom={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
const Container = styled.div`
  // padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  // overflow: auto;
`;

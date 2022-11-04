import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
// import { allUsersRoute, host } from "../utiles/APIRputes";
import { useNavigate } from "react-router-dom";
import Contacts from "./Extras/Contacts";
// import Welcome from "./Extras/Welcome";
import ChatContainer from "./Extras/ChatContainer";
import Header from "../Header";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getAllChat } from "../../Features/Chat/chatSlice";
function Chat() {
  const socket = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      await dispatch(getAllChat());
      // console.log(chat);
    }
    fetchData();
    // console.log(chat);
  }, []);
  const { user, chat, selectedChat } = useSelector((state) => state.chat);
  const getSenderName = (user, users) => {
    console.log(users[1], user);
    return users[0]._id === user.id ? users[1].name : users[0].name;
  };
  const getSenderId = (user, users) => {
    return users[0]._id === user.id ? users[1]._id : users[0]._id;
  };
  //   const [currentUser, setCurrentUser] = useState(undefined);
  //   const [contacts, setContacts] = useState([]);
  //   const [currentChat, setCurrentChat] = useState(undefined);
  //   useEffect(() => {
  // async function fetchData() {
  //   if (!localStorage.getItem("chat-app-user")) {
  //     navigate("/login");
  //   } else {
  //     setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
  //   }
  // }
  //     fetchData();
  //   }, []);
  //   useEffect(() => {
  //     async function fetchData() {
  //     //   if (currentUser) {
  //     //     if (currentUser.isAvatarImageSet) {
  //           const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);

  //           setContacts(data.data);
  //         // } else {
  //         //   navigate("/setAvatar");
  //         // }
  //     //   }
  //     }
  //     // fetchData();
  //   }, [currentUser]);
  //   const handleChatChange = (chat) => {
  //     setCurrentChat(chat);
  //   };
  //   useEffect(() => {
  //     if (currentUser) {
  //       socket.current = io(host);
  //       socket.current.emit("add-user", currentUser._id);
  //     }
  //   }, [currentUser]);

  return (
    <>
      {/* <Header /> */}
      <Container>
        <div className="container">
          <Contacts getSenderName={getSenderName} getSenderId={getSenderId} />
          {/* // contacts={chat}
          // currentUser={user}
          // changeChat={handleChatChange} */}

          {selectedChat === null ? (
            // <Welcome currentUser={user} />
            <div>Welcome user</div>
          ) : (
            <ChatContainer
              getSenderName={getSenderName}
              getSenderId={getSenderId}
              // currentChat={selectedChat}
              // currentUser={user}
              socket={socket}
            />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding-top: 9.5vh;
  height: 89vh;
  // width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  // background-color: #131324;
  .container {
    height: 100%;
    width: 100%;
    background-color: #cae4db;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;

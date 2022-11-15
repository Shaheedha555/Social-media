// import { Avatar } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";
// // import Logo from "../assets/logo.svg";
// import SideDrawer from "../SideDrawer";
// import chatService from "../../../Features/Chat/chatService";

// import chatSlice, {
//   getChat,
//   reset,
//   getAllChat,
//   getAllMessages,
// } from "../../../Features/Chat/chatSlice";
// var selectedChatCompare;
// function Contacts({ getSenderName, getSenderId, socket }) {
//   const { chat, selectedChat, user } = useSelector((state) => state.chat);
//   const [toggle, setToggle] = useState(false);
//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   // useEffect(() => {
//   //   if (currentUser) {
//   //     setCurrentUserName(currentUser.name);
//   //     // setCurrentUserImage(currentUser.avatarImage);
//   //   }
//   // }, [currentUser]);

//   const handleSearch = async (e) => {
//     try {
//       //   console.log(e.target.value);
//       //   searchfunction hereeee
//       setLoading(true);
//       const data = await chatService.searchUser(e.target.value);
//       setSearchResult(data.data);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const toggleDrawer = (action) => () => {
//     setToggle(action);
//   };

//   const accessChat = async (userId) => {
//     setToggle(false);
//     const getchat = await dispatch(getChat(userId));
//     const getMessages = await dispatch(getAllMessages(selectedChat._id));
//     selectedChatCompare = selectedChat;
//     // const [chat, messages] = await Promise.all([getchat, getMessages]);
//     console.log(getchat.payload.data);
//     console.log(selectedChat._id, "  id of chat");
//     setCurrentSelected(getchat.payload.data);
//     socket.emit("join chat", selectedChat._id);
//   };

//   return (
//     <>
//       <Container>
//         <div className="brand">
//           {/* <img src={""} alt="logo" />
//             <h3>SNAPPY</h3> */}
//           <SideDrawer
//             onclick={toggleDrawer(true)}
//             toggle={toggle}
//             onclose={toggleDrawer(false)}
//             handleSearch={handleSearch}
//             loading={loading}
//             searchResult={searchResult}
//             accessChat={accessChat}
//           />
//         </div>
//         <div className="contacts">
//           {chat.map((contact) => {
//             return (
//               <div
//                 key={contact._id}
//                 className={`contact ${
//                   JSON.stringify(currentSelected) === JSON.stringify(contact)
//                     ? "selected"
//                     : ""
//                 }`}
//                 onClick={() => {
//                   accessChat(getSenderId(user, contact.users));
//                 }}
//               >
//                 <div className="avatar">
//                   <Avatar />
//                   {/* <img src={``} alt="avatar" /> */}
//                 </div>
//                 <div className="username">
//                   <h3>{getSenderName(user, contact.users)}</h3>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </Container>
//     </>
//   );
// }

// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 10% 90%;
//   overflow: hidden;
//   background-color: #7a9d96;
//   border-radius: 10px;
//   @media screen and (max-width: 700px) {
//     // display: block;
//     width: 100vw;
//   }
//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     img {
//       height: 2rem;
//     }
//     h3 {
//       color: white;
//       text-transform: uppercase;
//     }
//   }
//   .contacts {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     overflow: auto;
//     // gap: 0.8rem;
//     &::-webkit-scrollbar {
//       width: 0.2rem;
//       &-thumb {
//         background-color: #00303f;
//         width: 0.1rem;
//         border-radius: 1rem;
//       }
//     }
//     .contact {
//       // background-color: #00303f;
//       border: 1px solid black;
//       min-height: 2rem;
//       cursor: pointer;
//       width: 95%;
//       border-radius: 0.2rem;
//       padding: 0 0.4rem;
//       display: flex;
//       gap: 1rem;
//       align-items: center;
//       transition: 0.5s ease-in-out;
//       .avatar {
//         img {
//           height: 3rem;
//         }
//       }
//       .username {
//         h3 {
//           color: white;
//         }
//       }
//     }
//     .selected {
//       background-color: #cae4db;
//       .username {
//         h3 {
//           color: #00303f;
//         }
//       }
//     }
//   }
// `;

// export default Contacts;

// import React, { useState } from "react";
// import MyChat from "./MyChat";
// import SideDrawer from "./SideDrawer";
// import { useDispatch, useSelector } from "react-redux";
// import chatService from "../../Features/Chat/chatService";
// import { useEffect } from "react";
// import {
//   getChat,
//   reset,
//   getAllChat,
//   getAllMessages,
// } from "../../Features/Chat/chatSlice";
// const ChatList = () => {
//   //   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   //   const [loadingChat, setLoadingChat] = useState(false);
//   const [toggle, setToggle] = useState(false);
//   const dispatch = useDispatch();
//   const toggleDrawer = (action) => () => {
//     setToggle(action);
//   };
//   const { chat, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.chat
//   );
//   const handleSearch = async (e) => {
//     try {
//       //   console.log(e.target.value);
//       //   searchfunction hereeee
//       setLoading(true);
//       const data = await chatService.searchUser(e.target.value);
//       console.log(data);

//       setSearchResult(data.data);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const accessChat = async (userId) => {
//     console.log(userId, " iddd");
//     const chat = await dispatch(getChat(userId));
//     console.log(chat.payload.data._id);
//     await dispatch(getAllMessages(chat.payload.data._id));
//     toggleDrawer(false);
//   };
//   //   const [loggedUser, setLoggedUser] = useState();
//   const { selectedChat, user } = useSelector((state) => state.chat);
//   //   const [msg, setMsg] = useState([]);
//   // console.log(loggedUser, "uuuuuuser");

//   const getAllChats = async () => {
//     console.log("pls call");
//     await dispatch(getAllChat());
//   };
//   useEffect(() => {
//     // setLoggedUser(user);
//     console.log("call all chat");
//     getAllChats();
//   }, []);

//   //   const getSender = (loggedUser, users) => {

//   //     return users[0]._id === loggedUser._id ? users[1] : users[0];
//   //   };

//   // const getAllMessage = async () => {
//   //   const ss = await dispatch(getAllMessages(selectedChat?._id));
//   //   console.log(ss, "thaaaaaaaat");
//   //   return ss;
//   // };
//   //   useEffect(() => {
//   //     const msgs = getAllMessages();
//   //     console.log(msgs, "msgsss");
//   //     setMsg(msgs);
//   //   }, []);
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         position: "absolute",
//         top: "0",
//         left: "0",
//       }}
//     >
//       <SideDrawer
//         onclick={toggleDrawer(true)}
//         toggle={toggle}
//         onclose={toggleDrawer(false)}
//         handleSearch={handleSearch}
//         loading={loading}
//         searchResult={searchResult}
//         accessChat={accessChat}
//       />
//       <MyChat chat={chat} accessChat={accessChat} />
//     </div>
//   );
// };

// export default ChatList;

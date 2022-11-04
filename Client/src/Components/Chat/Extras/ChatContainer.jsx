import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
// import LOgOut from "./LOgOut";
import axios from "axios";
// import { addMessageRoute, getAllMessagesRoute } from "../utiles/APIRputes";
import { getAllMessages } from "../../../Features/Chat/chatSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

export default function ChatContainer({ socket }) {
  const [allMessages, setAllMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const { selectedChat, messages } = useSelector((state) => state.chat);
  useEffect(() => {
    async function fetchData() {
      const response = await dispatch(getAllMessages(selectedChat._id));
      console.log(response, " ttt");
    }
    fetchData();
  }, [selectedChat]);
  console.log(messages);
  // const handleSendMsg = async (msg) => {
  //   const data = await axios.post(addMessageRoute, {
  //     from: currentUser._id,
  //     to: currentChat._id,
  //     message: msg,
  //   });
  //   socket.current.emit("send-msg", {
  //     from: currentUser._id,
  //     to: currentChat._id,
  //     message: msg,
  //   });

  //   const msgs = [...messages];
  //   msgs.push({ fromSelf: true, message: msg });
  //   setMessages(msgs);
  // };
  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("msg-receive", (msg) => {
  //       setArrivalMessage({ fromSelf: false, message: msg });
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            {/* <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            /> */}
          </div>
          <div className="username">
            <h3>{selectedChat?.name}</h3>
          </div>
        </div>
        {/* <LOgOut /> */}
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          console.log(message);
          return (
            <div ref={scrollRef} key={message._id}>
              <div
                className={`message recieved
                `}
                //  ${
                //   message.fromSelf ? "sended" : "recieved"
                // }
              >
                <div className="content">
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput
      // handleSendMsg={handleSendMsg}
      />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding:0 0.5rem;
        font-size: 1.1rem;
        border-radius: 0.5herem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
        color : #000;
      }
    }
  }
  
`;

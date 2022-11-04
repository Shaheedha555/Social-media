import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Chat.scss";
import InfoBar from "./Extras/InfoBar/InfoBar";
import Messages from "./Extras/Message/Messages";
import styled from "styled-components";

const ChatBox = ({ messages }) => {
  return (
    // <div className="outerContainer">
    //   <div className="container">
    //     <InfoBar name="sample" />
    //     <Messages messages={[]} name="sample2" />
    //     {/* <Input
    //     // message={messages}
    //     // setMessage={setMessage}
    //     // sendMessage={sendMessage}
    //     /> */}
    //   </div>
    // </div>
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={{}} alt="pro img" />
          </div>
          <div className="username">
            <h3>sample</h3>
          </div>
        </div>
        {/* <Logout /> */}
      </div>
      <div className="chat-messages">
        {messages.length > 0 ? (
          messages.map((message) => {
            return (
              <div key={message._id}>
                <div
                // className={`message ${
                //   message.fromSelf ? "sended" : "recieved"
                // }`}
                >
                  <div className="content ">
                    <p>{message.content}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h3>No msgs</h3>
        )}
      </div>
      {/* <ChatInput handleSendMsg={handleSendMsg} /> */}
    </Container>
  );
};

export default ChatBox;

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
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
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
      }
    }
  }
`;

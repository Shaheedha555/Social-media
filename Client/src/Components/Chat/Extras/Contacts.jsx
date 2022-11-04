import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import Logo from "../assets/logo.svg";
import SideDrawer from "../SideDrawer";
import chatService from "../../../Features/Chat/chatService";

import {
  getChat,
  reset,
  getAllChat,
  getAllMessages,
} from "../../../Features/Chat/chatSlice";
function Contacts() {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  // const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const { chat, selectedChat, user } = useSelector((state) => state.chat);
  const [toggle, setToggle] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (currentUser) {
  //     setCurrentUserName(currentUser.name);
  //     // setCurrentUserImage(currentUser.avatarImage);
  //   }
  // }, [currentUser]);
  const changeCurrentChat = (index) => {
    setCurrentSelected(index);
    // changeChat(contact);
  };
  const handleSearch = async (e) => {
    try {
      //   console.log(e.target.value);
      //   searchfunction hereeee
      setLoading(true);
      const data = await chatService.searchUser(e.target.value);
      console.log(data);

      setSearchResult(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const accessChat = async (userId, index) => {
    changeCurrentChat(index);
    await dispatch(getChat(userId));
    await dispatch(getAllMessages(selectedChat._id));
    toggleDrawer(false);
  };
  const getSenderName = (user, users) => {
    console.log(users[1], user);
    return users[0]._id === user.id ? users[1].name : users[0].name;
  };
  const getSenderId = (user, users) => {
    return users[0]._id === user.id ? users[1]._id : users[0]._id;
  };
  const toggleDrawer = (action) => () => {
    setToggle(action);
  };
  return (
    <>
      {user && (
        <Container>
          <div className="brand">
            {/* <img src={""} alt="logo" />
            <h3>SNAPPY</h3> */}
            <SideDrawer
              onclick={toggleDrawer(true)}
              toggle={toggle}
              onclose={toggleDrawer(false)}
              handleSearch={handleSearch}
              loading={loading}
              searchResult={searchResult}
              accessChat={accessChat}
            />
          </div>
          <div className="contacts">
            {chat.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() =>
                    accessChat(getSenderId(user, contact.users), index)
                  }
                >
                  <div className="avatar">
                    <Avatar />
                    {/* <img src={``} alt="avatar" /> */}
                  </div>
                  <div className="username">
                    <h3>{getSenderName(user, contact.users)}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className="current-user">
            <div className="avatar">
              <img src={``} alt="avatar" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div> */}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #7a9d96;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #00303f;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #00303f;
      min-height: 2rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
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
    .selected {
      background-color: #cae4db;
      .username {
        h3 {
          color: #00303f;
        }
      }
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts;

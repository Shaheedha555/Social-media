import React, { useState } from "react";
import Picker from "emoji-picker-react";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
export default function ChatInput({
  handleSendMsg,
  value,
  onChange,
  setValue,
}) {
  const [showEmojiPicker, setEmojiPicker] = useState(false);
  // const [msg, setmsg] = useState("");
  const handleEmojiPickerHideShow = () => {
    setEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emoji, event) => {
    let message = value;
    message += emoji.emoji;
    setValue(message);
  };
  const sendMsg = (event) => {
    event.preventDefault();
    setValue(value.trimStart());
    if (value.length > 0) {
      handleSendMsg(value);
      setValue("");
    }
  };
  const enterMessage = (e) => {
    if (e.key === "Enter") sendMsg(e);
  };
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <div className="emojiSet">
              <Picker
                onEmojiClick={handleEmojiClick}
                height="380px"
                skinTonesDisabled="true"
                emojiStyle="google"
                previewConfig={{ showPreview: false }}
              />
            </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={sendMsg}>
        <textarea
          style={{ fontSize: "15px" }}
          autoFocus="true"
          placeholder="your message here"
          value={value}
          onChange={onChange}
          onKeyDown={enterMessage}
        />
        <button className="submit" type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  height: 20%;
  @media screen and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emojiSet {
        position: absolute;
        top: -380px;
        height: 100px;
      }
      .emoji-picker-react {
        position: absolute;
        top: 0px;
        right: 100px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    height: 80%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    textarea {
      width: 90%;
      height: 90%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 2rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

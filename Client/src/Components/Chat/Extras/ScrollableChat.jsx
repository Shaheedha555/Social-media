import { Avatar, Tooltip, Container } from "@mui/material";
import { useSelector } from "react-redux";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../Extras/ChatLogics/ChatFunctions";

const ScrollableChat = ({ messages }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Container
      style={{
        overflow: "auto",
        height: "80vh",
        width: "100%",
      }}
    >
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            <div
              style={{
                marginLeft: isSameSenderMargin(messages, m, i, user._id)
                  ? "auto"
                  : "0",
                display: "flex",
                flexDirection: isSameSenderMargin(messages, m, i, user._id)
                  ? "row-reverse"
                  : "row",
              }}
            >
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip title={m.sender.name} placement="bottom-start" arrow>
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  display: "flex",
                  backgroundColor: `${
                    m.sender._id === user._id ? "#BEE3F8" : "#FFABE1"
                  }`,
                  marginLeft: isSameSenderMargin(messages, m, i, user._id)
                    ? "auto"
                    : "0",
                  marginTop: isSameUser(messages, m, i, user._id)
                    ? "5px"
                    : "15px",
                  marginRight:
                    isSameSender(messages, m, i, user._id) ||
                    isLastMessage(messages, i, user._id)
                      ? "10px"
                      : "0px",
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "50%",
                  wordBreak: "break-word",
                }}
              >
                {m.content}
              </span>
            </div>
          </div>
        ))}
    </Container>
  );
};

export default ScrollableChat;

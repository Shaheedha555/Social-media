const express = require("express");
const ChatRouter = express.Router();
const {
  getAllChats,
  accessChat,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addGroup,
  createNewChat,
  removeChat,
} = require("../Controllers/ChatController");
const {
  allMessages,
  sendMessage,
} = require("../Controllers/MessageController");
const { protect } = require("../Middlewares/authMiddleware");

ChatRouter.route("/").get(protect, getAllChats).post(protect, accessChat);
ChatRouter.post("/group", protect, createGroupChat);
ChatRouter.put("/rename", protect, renameGroup);
ChatRouter.post("/remove-group", protect, removeFromGroup);
ChatRouter.post("/add-group", protect, addGroup);
ChatRouter.get("/:chatId", protect, allMessages);
ChatRouter.post("/message", protect, sendMessage);
ChatRouter.post("/new-chat", protect, createNewChat);
ChatRouter.post("/remove-chat", protect, removeChat);

module.exports = ChatRouter;

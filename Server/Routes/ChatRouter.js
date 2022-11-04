const express = require("express");
const ChatRouter = express.Router();
const { searchUser } = require("../Controllers/UserController");
const {
  getAllChats,
  accessChat,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addGroup,
  removeChat,
} = require("../Controllers/ChatController");

const { protect } = require("../Middlewares/authMiddleware");

ChatRouter.route("/").get(protect, getAllChats).post(protect, accessChat);
ChatRouter.get("/search", protect, searchUser);
ChatRouter.post("/group", protect, createGroupChat);
ChatRouter.put("/rename", protect, renameGroup);
ChatRouter.post("/remove-group", protect, removeFromGroup);
ChatRouter.post("/add-group", protect, addGroup);
ChatRouter.post("/remove-chat", protect, removeChat);

module.exports = ChatRouter;

const express = require("express");
const ChatRouter = express.Router();
const { searchUser } = require("../Controllers/UserController");
const {
  getAllChats,
  accessChat,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
  removeChat,
} = require("../Controllers/ChatController");

const { protect } = require("../Middlewares/authMiddleware");

ChatRouter.route("/").get(protect, getAllChats).post(protect, accessChat);
ChatRouter.get("/search", protect, searchUser);
ChatRouter.post("/group", protect, createGroupChat);
ChatRouter.put("/group/rename", protect, renameGroup);
ChatRouter.post("/group/remove", protect, removeFromGroup);
ChatRouter.post("/group/add", protect, addToGroup);
ChatRouter.post("/remove-chat", protect, removeChat);

module.exports = ChatRouter;

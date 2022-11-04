const express = require("express");
const MessageRouter = express.Router();
const {
  allMessages,
  sendMessage,
} = require("../Controllers/MessageController");
const { protect } = require("../Middlewares/authMiddleware");

MessageRouter.get("/:chatId", protect, allMessages);
MessageRouter.post("/send", protect, sendMessage);
module.exports = MessageRouter;

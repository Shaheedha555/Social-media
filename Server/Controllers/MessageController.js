const Chat = require("../Models/Chat");
const User = require("../Models/user");
const Message = require("../Models/Message");
const { default: mongoose, Mongoose } = require("mongoose");

const allMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    next(error);
  }
};
const sendMessage = async (req, res, next) => {
  try {
    const { content, chatId } = req.body;
    // let id = mongoose.Types.ObjectId(chatId);
    // console.log(content, id);
    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };

    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findById({ _id: chatId });
    res.json(message);
  } catch (error) {
    console.log("errrr");
    next(error);
  }
};

module.exports = { allMessages, sendMessage };

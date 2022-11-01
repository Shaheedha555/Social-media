const Chat = require("../Models/Chat");
const User = require("../Models/user");

const getAllChats = async (req, res, next) => {
  try {
    Chat.find({ users: { $in: [req.user._id] } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).json(results);
      });
  } catch (error) {
    next(error);
  }
};
const accessChat = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) res.json({ status: false, message: "No user Id" });
    const chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [req.user._id, userId] },
    }).populate("users", "-password");
    //   .populate("latestMessage");
    const isChat = await User.populate(chat, {
      path: "sender",
      select: "name email",
    });
    if (isChat?.length > 0) res.json(isChat[0]);
    else {
      const newChat = new Chat({
        isGroupChat: false,
        users: [userId, req.user._id],
        chatName: "sender",
      });
      await newChat.save();
      const chat = await Chat.findOne({ _id: newChat._id }).populate(
        "users",
        "-password"
      );
      res.json(chat);
    }
  } catch (error) {
    next(error);
  }
};
const createGroupChat = async (req, res, next) => {
  try {
    if (!req.body.users || !req.body.name) {
      return res.status(400).send({ message: "Please Fill all the feilds" });
    }

    let users = JSON.parse(req.body.users);

    if (users.length < 2) {
      return res
        .status(400)
        .send("More than 2 users are required to form a group chat");
    }

    users.push(req.user);

    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    next(error);
  }
};
const renameGroup = async (req, res, next) => {
  try {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    // if (!updatedChat) {
    //   res.status(404);
    //   throw new Error("Chat Not Found");
    // } else {
    res.json(updatedChat);
    // }
  } catch (error) {
    next(error);
  }
};
const removeFromGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    // if (!removed) {
    //   res.status(404);
    //   throw new Error("Chat Not Found");
    // } else {
    res.json(removed);
    // }
  } catch (error) {
    next(error);
  }
};
const addGroup = async (req, res, next) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  // if (!added) {
  //   res.status(404);
  //   throw new Error("Chat Not Found");
  // } else {
  res.json(added);
  // }
  try {
  } catch (error) {
    next(error);
  }
};
const createNewChat = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const removeChat = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllChats,
  accessChat,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addGroup,
  createNewChat,
  removeChat,
};

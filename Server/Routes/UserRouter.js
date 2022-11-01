const express = require("express");
const userRouter = express.Router();
const { protect } = require("../Middlewares/authMiddleware");
const {
  userRegister,
  userLogin,
  sendOTP,
  verifyOTP,
  searchUsername,
  searchUser,
} = require("../Controllers/UserController");

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/sendOTP", sendOTP);
userRouter.post("/verifyOTP", verifyOTP);
userRouter.post("/searchUsername", searchUsername);
userRouter.post("/", protect, searchUser);

module.exports = userRouter;

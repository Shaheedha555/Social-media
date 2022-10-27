const express = require('express');
const userRouter = express.Router();
// const colors = require('colors/safe');
const {userRegister,userLogin,sendOTP,verifyOTP,searchUsername} = require('../Controllers/UserController')

userRouter.post('/register',userRegister)
userRouter.post('/login',userLogin)
userRouter.post('/sendOTP', sendOTP)
userRouter.post('/verifyOTP', verifyOTP)
userRouter.post('/searchUsername', searchUsername)

module.exports = userRouter ;
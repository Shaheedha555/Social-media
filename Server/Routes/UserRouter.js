const express = require('express');
const userRouter = express.Router();
// const colors = require('colors/safe');
const {userRegister,userLogin} = require('../Controllers/UserController')

userRouter.post('/register',userRegister)
userRouter.post('/login',userLogin)


module.exports = userRouter ; 
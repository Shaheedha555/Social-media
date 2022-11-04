const express = require('express')
const adminRouter = express.Router()
// const { body, validationResult } = require('express-validator');
const {adminProtect} = require('../middlewares/authMiddleware')

const { adminLogin,getAllUsers,blockUser } = require('../Controllers/adminController');

// adminRouter.use(cors())  

adminRouter.post('/login',adminLogin)
adminRouter.post('/getAllUsers',getAllUsers)
adminRouter.post('/blockUser',blockUser)


module.exports = adminRouter
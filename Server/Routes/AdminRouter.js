const express = require("express");
const adminRouter = express.Router();
// const { body, validationResult } = require('express-validator');
const { adminProtect } = require("../middlewares/authMiddleware");

const { adminLogin } = require("../Controllers/adminController");

adminRouter.post("/login", adminLogin);

adminRouter.get("/", (req, res) => {
  res.send("good");
});

module.exports = adminRouter;

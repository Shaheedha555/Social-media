const jwt = require("jsonwebtoken");
const Admin = require("../Models/admin");
const User = require("../Models/user");
const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    const jwt = require("jsonwebtoken");
    const Admin = require("../Models/admin");
    const User = require("../Models/user");

    if (admin && password === admin.password) {
      console.log("admin matched");
      let token = generateToken(admin._id);
      console.log(token);
      req.admin = admin;

      res.json({
        status: true,
        token: token,
      });
    } else {
      console.log("admin not matching");
      res.json({ status: false, message: "invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.json({ status: true, users: users });
  } catch (error) {
    next(error);
  }
};

const blockUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.body.id });
    User.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { activeStatus: user.activeStatus ? false : true } }
    ).then((s) => {
      console.log("blocked", s);
      res.json({ message: "blocked" });
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  adminLogin,
  getAllUsers,
  blockUser,
};

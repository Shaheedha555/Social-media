const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const Admin = require("../Models/admin");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
    // req.headers.activeStatus
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token + " tokennn");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      if (req.user.activeStatus) {
        next();
      } else {
        res.status(401).json({ blocked: "you are blocked by admin" });
      }
    } catch (error) {
      console.log(error);
      res.status(401).json("error");
    }
  }
  if (!token) {
    res.status(401).json("not authorized");
  }
};
const adminProtect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token + " midle");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.admin = await Admin.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json("error");
    }
  }
  if (!token) {
    res.status(401).json("not authorized");
  }
};

module.exports = { protect, adminProtect };

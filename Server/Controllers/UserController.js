const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/user");
const { validationResult } = require("express-validator");
const accountSid = process.env.ACCOUNTS_ID;
const authToken = process.env.AUTH_TOKEN;
const userEmail = process.env.EMAIL_ID;
const userPassword = process.env.EMAIL_PASSWORD;
const client = require("twilio")(accountSid, authToken);
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const OTPModel = require("../Models/OTP");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userEmail,
    pass: userPassword,
  },
});

transporter.verify((err, success) => {
  if (err) console.log(err);
  else {
    console.log("nodemailer ready for messages");
    console.log(success);
  }
});

const sendEmailOTP = async (email) => {
  try {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    console.log(otp + "  otp");
    const mailOptions = {
      from: userEmail,
      to: email,
      subject: "InstaBook",
      html: `<p>Your InstaBook OTP is : ${otp}.</p><p>This will <b>expire in 3 minutes</b>.</p>`,
    };
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);
    console.log("otp hashed  " + hashedOtp);
    const newOtp = new OTPModel({
      user: email,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 1000 * 60 * 3,
    });
    await newOtp.save();
    console.log("otp saved");

    await transporter.sendMail(mailOptions);
    console.log("otp sent");
  } catch (error) {
    console.log(" otp email not sent");
    console.log(error);
    res.json({ status: false });
  }
};

const userRegister = async (req, res, next) => {
  try {
    const {
      name,
      email,
      contact,
      password,
      username,
      gender,
      birthDate,
      about,
      country,
    } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      console.log("user exist");
      res.json({ status: false, message: "User already exists!" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        name,
        email,
        contact,
        password: hashedPassword,
        username,
        userDetails: { gender, birthDate, about, country },
      });
      await newUser.save();

      res.json({
        status: true,
        name: newUser.name,
        email: newUser.email,
        contact: newUser.contact,
      });
    }
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { id, password } = req.body;
    console.log(id, password, " user credentials");
    let item = id.match(/@/) ? "email" : "username";
    const user =
      item === "email"
        ? await User.findOne({ email: id })
        : await User.findOne({ username: id });
    if (user && (await bcrypt.compare(password, user.password))) {
      console.log("usermatched");
      console.log(user.name, user.email);
      if (user.activeStatus) {
        if (user.verified.email || user.verified.contact) {
          let token = generateToken(user._id);
          req.user = user;
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            contact: user.contact,
            status: true,
            token: token,
          });
        } else {
          res.json({
            name: user.name,
            email: user.email,
            contact: user.contact,
            status: true,
          });
        }
      } else {
        res.json({ status: false, message: "Your account is blocked" });
      }
    } else {
      if (!user) res.json({ status: false, message: "Not registered User" });
      console.log("user not matching");
      res.json({ status: false, message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};

const searchUsername = async (req, res, next) => {
  try {
    const username = req.body.username;
    User.find({ username: username }).then((result) => {
      if (result.length != 0) {
        console.log("username present");
        res.json({ status: false, message: "user alreasy present" });
      } else {
        console.log("username not present");

        res.json({ status: true });
      }
    });
  } catch (error) {
    next(error);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const sendOTP = async (req, res, next) => {
  try {
    const data = req.body;
    if (data.contact) {
      console.log("mob");
      await sendContactOTP(data.contact);

      res.json({ status: true });
    } else {
      console.log("email");
      await sendEmailOTP(data.email);
      res.json({ status: true });
    }
  } catch (err) {
    next(err);
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const { contact, email, OTP } = req.body;
    // const stringData = data.toString();
    if (contact) {
      console.log("its mobile nm");
      const verification = await verifyContactOTP(OTP, contact);
      console.log(verification.status);
      if (verification.status === "approved") {
        const user = await User.findOneAndUpdate(
          { contact: contact, email: email },
          { $set: { "verified.contact": true } }
        );
        let token = generateToken(user._id);
        res.json({
          status: true,
          token,
          id: user._id,
          name: user.name,
          email: user.email,
          contact: user.contact,
        });
      } else {
        res.json({ status: false, message: "verification failed" });
      }
    } else {
      console.log("its email");
      OTPModel.find({ user: email })
        .then(async (result) => {
          if (result.length > 0) {
            const { expiresAt } = result[result.length - 1];
            const sentOtp = result[result.length - 1].otp;
            if (expiresAt < Date.now()) {
              console.log("expired");
              OTPModel.findOneAndDelete({ user: email })
                .then(() => {
                  res.json({ status: false, message: "OTP Expired" });
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              console.log(OTP + "  " + sentOtp);
              const same = await bcrypt.compare(OTP, sentOtp);
              if (same) {
                User.updateOne(
                  { email: email },
                  { $set: { "verified.email": true } }
                )
                  .then((user) => {
                    OTPModel.deleteMany({ user: email })
                      .then(() => {
                        User.findOne({ email: email }).then((user) => {
                          res.json({
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            contact: user.contact,
                            status: true,
                            token: generateToken(user._id),
                          });
                        });
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                res.json({ status: false, message: "Invalid OTP" });
              }
            }
          } else {
            res.json({ status: false, message: "No user found" });
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("error in find");
        });
    }
  } catch (error) {
    next(error);
    console.log("errrrrrrr");
    res.json({ status: false });
  }
};

const sendContactOTP = (contact) => {
  return client.verify.v2
    .services(process.env.SERVICE_ID)
    .verifications.create({ to: "+91" + contact, channel: "sms" });
};

const verifyContactOTP = (otp, mobile) => {
  return client.verify.v2
    .services(process.env.SERVICE_ID)
    .verificationChecks.create({ to: "+91" + mobile, code: otp });
};

const searchUser = async (req, res, next) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegister,
  userLogin,
  sendOTP,
  verifyOTP,
  searchUsername,
  searchUser,
};

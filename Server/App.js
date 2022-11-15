const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const { errorHandler } = require("./Middlewares/errorMiddleware");
const cors = require("cors");
const app = express();
const colors = require("colors");
const port = process.env.PORT || 5000;

const userRouter = require("./Routes/UserRouter");
const adminRouter = require("./Routes/AdminRouter");
const chatRouter = require("./Routes/ChatRouter");
const MessageRouter = require("./Routes/MessageRouter");

const connectDB = require("./config/database");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB();
app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/chat", chatRouter);
app.use("/message", MessageRouter);

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log("connected on ", port);
});
const io = require("socket.io")(server, {
  pingeTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("socket connected");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => {
    console.log(room, " rrom");
    socket.in(room).emit("typing");
  });
  socket.on("stop typing", (room) => {
    console.log(room, " rrom");
    socket.in(room).emit("stop typing");
  });

  socket.on("new message", (newMessageRecieved) => {
    console.log(newMessageRecieved, "mmmmm");
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

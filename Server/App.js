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

const connectDB = require("./config/database");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB();
app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/chat", chatRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log("connected on ", port);
});

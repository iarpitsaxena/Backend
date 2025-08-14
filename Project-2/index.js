const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/user");
const { connectDB } = require("./connection");
const { logReqRes } = require("./middlewares");
const userSchema = require("./models/user");
const PORT = 3000;

//connection

connectDB("mongodb://127.0.0.1:27017/dummydatabase").then(() => {
  console.log("mongodb connected");
});

//Schema
const User = mongoose.model("User", "userSchema");

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("logs.txt"));

//Routes
app.use("/user", userRouter); // agar /user par koi bhi request aata hai to userRouter handle karega

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

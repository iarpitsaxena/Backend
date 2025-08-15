const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./connect");
const cookieParser = require("cookie-parser");
// const {
//   restrictedToLoggedInUserOnly,
//   checkAuth,
// } = require("./Middlewares/auth");
const { checkForAuthentication, restrictedTo } = require("./Middlewares/auth");
const PORT = 8001;

const urlRoute = require("./Routes/url");
const staticRoute = require("./Routes/staticRoutes");
const userRoute = require("./Routes/user");

connectDB("mongodb://localhost:27017/url-shortener").then(() =>
  console.log("Connected to DB")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);
// app.use("/url", restrictedToLoggedInUserOnly, urlRoute);
// app.use("/", checkAuth, staticRoute);
app.use("/url", restrictedTo(["user", "admin"]), urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

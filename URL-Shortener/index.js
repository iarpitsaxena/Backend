const express = require("express");
const path = require("path");
const app = express();
const urlRoute = require("./Routes/url");
const staticRoute = require("./Routes/staticRoutes");
const connectDB = require("./connect");
const URL = require("./Models/url");
const PORT = 8001;

connectDB("mongodb://localhost:27017/url-shortener").then(() =>
  console.log("Connected to DB")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlRoute);
app.use("/", staticRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

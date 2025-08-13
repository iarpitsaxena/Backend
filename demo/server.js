// const fs = require("fs");
// const http = require("http");

// const myServer = http.createServer((req, res) => {
//   console.log("Request received");
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("Hello from server");
// });

// myServer.listen(8000, () => {
//   console.log("Server is running on port 8000");
// });

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send(
    "Hello from home page" + "hey" + req.query.name + "you are" + req.query.age
  );
});

app.get("/about", (req, res) => {
  return res.send("hello from about page");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

const express = require("express");
const app = express();
const urlRoute = require("./Routes/url");
// const { connectDB } = require("./connect");
const connectDB = require("./connect");
const URL = require("./Models/url");
const PORT = 8001;

connectDB("mongodb://localhost:27017/url-shortener").then(() =>
  console.log("Connected to DB")
);

app.use(express.json());
app.use("/url", urlRoute);

// app.get("/:shortId", async (req, res) => {
//   const shortId = req.params.shortId;
//   const entry = await URL.findOneAndUpdate(
//     { shortID: shortId },
//     {
//       $push: {
//         visitHistory: {
//           timestamp: Date.now(),
//         },
//       },
//     }
//   );
//   if (!entry) {
//     return res.status(404).send("Short URL not found");
//   }
//   res.redirect(entry.redirectURL);
// });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

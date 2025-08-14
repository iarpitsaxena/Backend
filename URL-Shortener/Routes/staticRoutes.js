const express = require("express");
const URL = require("../Models/url");
const router = express.Router();

router.get("/", async (req, res) => {
  const allURLs = await URL.find({});
  return res.render("home", {
    allURLs: allURLs,
  });
});

module.exports = router;

const express = require("express");
const URL = require("../Models/url");
const { restrictedTo } = require("../Middlewares/auth");
const router = express.Router();

router.get("/admin/urls", restrictedTo(["ADMIN"]), async (req, res) => {
  const allURLs = await URL.find({});
  return res.render("home", {
    allURLs: allURLs,
  });
});

router.get("/", restrictedTo(["NORMAL", "ADMIN"]), async (req, res) => {
  // if (!req.user) {
  //   return res.redirect("/login");
  // }
  const allURLs = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    allURLs: allURLs,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});
module.exports = router;

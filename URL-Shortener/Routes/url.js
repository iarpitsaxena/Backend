const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleRedirectURL,
} = require("../Controllers/url");

router.post("/", handleGenerateNewShortURL);
router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/:shortId", handleRedirectURL);

module.exports = router;

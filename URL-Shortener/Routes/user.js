const express = require("express");
const router = express.Router();
const { handleUserSignUp, handleUserLogin } = require("../Controllers/user");

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);




module.exports = router;


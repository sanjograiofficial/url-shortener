const express = require("express");
const { userSignUp, userLogin } = require("../controllers/user");

const router = express.Router();

router.post("/", userSignUp);
router.post("/login", userLogin);

module.exports = router;

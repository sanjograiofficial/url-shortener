const express = require("express");
const { createUrl, showanalytics } = require("../controllers/url");

const router = express.Router();

router.post("/", createUrl);

router.get("/analytics/:shortId", showanalytics);

module.exports = router;

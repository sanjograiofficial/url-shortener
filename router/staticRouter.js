const express = require("express");
const URL = require("../model/url");

const router = express.Router();

router.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  console.log(allUrls);
  return res.render("home", {
    urls: allUrls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

module.exports = router;

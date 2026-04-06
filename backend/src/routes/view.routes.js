const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.redirect("/signup");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/upload", (req, res) => {
  return res.render("upload");
});

module.exports = router;

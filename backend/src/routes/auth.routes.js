const express = require("express");
const router = express.Router();

const authController = require("../controller/auth.controller");
const { profileImageUpload } = require("../middleware/multer.middleware");

// routes
router.post("/signup", profileImageUpload.single("profileImage"), authController.signup);
router.post("/login", authController.login);

module.exports = router;
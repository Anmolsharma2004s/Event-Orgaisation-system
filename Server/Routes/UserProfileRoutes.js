const express = require("express");
const router = express.Router();
const { updateProfile } = require("../Controllers/UserProfileController");
const authMiddleware = require("../midlleware/authMiddleware");

router.put("/profile", authMiddleware, updateProfile);

module.exports = router;


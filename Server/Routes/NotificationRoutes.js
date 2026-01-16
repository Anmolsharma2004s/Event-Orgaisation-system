const express = require("express");
const router = express.Router();

const { getAdminNotifications } = require("../Controllers/NotificationController");
const authMiddleware = require("../midlleware/authMiddleware");
const adminOnly = require("../midlleware/isAdmin");

router.get("/", authMiddleware, adminOnly, getAdminNotifications);

module.exports = router;
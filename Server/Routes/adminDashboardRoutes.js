const express = require("express");
const router = express.Router();

const { getAdminDashboard } = require("../Controllers/AdminDashboardController");
const authMiddleware = require("../midlleware/authMiddleware");
const adminOnly = require("../midlleware/isAdmin");

router.get("/dashboard", authMiddleware, adminOnly, getAdminDashboard);

module.exports = router;
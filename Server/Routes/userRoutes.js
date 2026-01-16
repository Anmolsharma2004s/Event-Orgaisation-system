const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../Controllers/userController");
const authMiddleware = require("../midlleware/authMiddleware");
const adminOnly = require("../midlleware/isAdmin");

router.get("/users", authMiddleware, adminOnly, getAllUsers);

module.exports = router;
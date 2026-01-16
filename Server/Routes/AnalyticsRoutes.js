const express = require("express");
const router = express.Router();

const {
  getTotalEvents,
  getTotalBookings,
  getTotalRevenue,
  getStatusStats,
  getMonthlyRevenue,
} = require("../Controllers/AnalyticsController");

const authMiddleware = require("../midlleware/authMiddleware");
const adminOnly = require("../midlleware/isAdmin");


// 🔒 All analytics routes are ADMIN ONLY

// Total events
router.get("/total-events", authMiddleware, adminOnly, getTotalEvents);

// Total bookings
router.get("/total-bookings", authMiddleware, adminOnly, getTotalBookings);

// Total revenue
router.get("/total-revenue", authMiddleware, adminOnly, getTotalRevenue);

// Event status stats (upcoming, completed, cancelled)
router.get("/status-stats", authMiddleware, adminOnly, getStatusStats);

// Monthly revenue
router.get("/monthly-revenue", authMiddleware, adminOnly, getMonthlyRevenue);

module.exports = router;
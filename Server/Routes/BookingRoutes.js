const express = require('express');
const router = express.Router();
const { CreateBooking, getAllBookings, updateBookingStatus, deleteBooking, getMyBookings } = require('../Controllers/BookController');
const authMiddleware = require('../midlleware/authMiddleware');
const adminOnly = require('../midlleware/isAdmin');

//public routes
router.post('/', authMiddleware, CreateBooking);
router.get("/my",authMiddleware,getMyBookings);

//protected routes for admin only
router.get('/all', authMiddleware,adminOnly,getAllBookings);
router.put('/:id', authMiddleware, adminOnly, updateBookingStatus);
router.delete('/:id', authMiddleware, adminOnly, deleteBooking);

module.exports = router;
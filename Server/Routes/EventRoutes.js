const express= require('express');
const { createEvent,getAllEvents,updateEvent,deleteEvent,getEventById, getApprovedEvents, approveEvent, getEventCategory } = require('../Controllers/EventController');
const router= express.Router();
const adminOnly=require('../midlleware/isAdmin');
const authMiddleware=require('../midlleware/authMiddleware');

//public routes


router.get('/approved',authMiddleware,getApprovedEvents);
router.patch('/:id/approve', authMiddleware, adminOnly, approveEvent);

router.get('/',authMiddleware,getAllEvents);
router.get('/:id',authMiddleware,getEventById);

//protected routes for admin only
router.post('/',authMiddleware,adminOnly,createEvent);
router.put('/:id',authMiddleware,adminOnly,updateEvent);
router.delete('/:id',authMiddleware,adminOnly,deleteEvent);

router.get("/category/:category",getEventCategory)

module.exports= router;
const express = require('express');
const router= express.Router();
const {register,Login,logout,changePassword}=require('../Controllers/AuthContoller');
const authMiddleware= require('../midlleware/authMiddleware')

//Register route
router.post('/register',register);

//Login route
router.post('/login',Login);

router.post('/logout',authMiddleware,logout);
router.put("/change-password", authMiddleware, changePassword);


module.exports=router;


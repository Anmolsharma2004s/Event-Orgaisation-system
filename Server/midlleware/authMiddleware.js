    
const jwt = require('jsonwebtoken');
const AuthModle = require('../Models/AuthModel');

const authMiddleware = async (req, res, next) => {
    const token=req.cookies.token || req.header('Authorization')?.replace('Bearer ','');
    if(!token){
        return res.status(401).json({message:'No token provided'});
    }
    try{
        const decoded=jwt.verify(token,'your_jwt_secret');
        const user= await AuthModle.findById(decoded.id);
        if(!user){
            return res.status(401).json({message:'Invalid token'});
        }
        req.user=user;
        next();
    }
    catch(err){
        return res.status(401).json({message:'inavlid credentials'});
        
    }
}
module.exports=authMiddleware;

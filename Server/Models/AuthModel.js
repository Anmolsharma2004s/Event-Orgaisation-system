const mongoose = require('mongoose');
const db=require('../config/mongoose-connection');


const authSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
     enum:['user','admin'],
     type:String,
     default:'user',
    }
})

const AuthModel=mongoose.model('Auth',authSchema);
module.exports=AuthModel;

const mongoose=require('mongoose');

const MongoConnection=mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    return   console.log("Connected to MongoDB successfully");
})
.catch((err)=>{
    return console.log("Failed to connect to MongoDB", err);
})

module.exports=MongoConnection;
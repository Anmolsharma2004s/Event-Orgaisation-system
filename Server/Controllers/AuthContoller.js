
const AuthModle = require("../Models/AuthModel");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');



//register user
const register = async (req, res) => {
  console.log("📥 Incoming register request body:", req.body);
  try {
    const { username, password, email, role } = req.body;
    console.log("✅ Step 1: Parsed body");

    const salt = await bcrypt.genSalt(10);
    console.log("✅ Step 2: Salt generated");

    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("✅ Step 3: Password hashed");

    const existingUser = await AuthModle.findOne({ email });
    console.log("✅ Step 4: Checked existing user");

    if (existingUser) {
      console.log("⚠️ Existing user found");
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await AuthModle.create({
      username,
      password: hashedPassword,
      email,
      role: role || "user",
    });
    console.log("✅ Step 5: User created");

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_TOKEN,
      { expiresIn: "1d" }
    );
    console.log("✅ Step 6: Token generated");

    res.cookie("token", token, { httpOnly: true });
    console.log("✅ Step 7: Cookie set");

    return res.status(201).json({
      message: "User registered successfully",
      User: { username, email, role, token },
      newUser,
    });
  } catch (err) {
    console.error("❌ Error in register:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//Login user
const Login= async(req,res)=>{
    const{email,password}=req.body;
    console.log(req.body);
    try{

        const user= await AuthModle.findOne({  email})
        if(!user){
            return res.status(400).json({message:'Invalid credentials'});
        }
        const isPasswordValid= await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:'Invalid credentials'});
        }
        const token= jwt.sign({
            id: user._id,
            email: user.email,
            role:user.role
        }, process.env.JWT_TOKEN,{expiresIn:'1d'});
        res.cookie('token',token,{httpOnly:true});
        return res.status(200).json({message:'Login successful',User:{username:user.username,email:user.email,role:user.role,token},user});
    }
    catch(err){
        res.status(500).json({message:'server error',err:err.message});
    }
}
const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(200).json({
    message: "Logout successful",
  });
};
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await AuthModle.findById(req.user._id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports={register,Login,logout,changePassword};

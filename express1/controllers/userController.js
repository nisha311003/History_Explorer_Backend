const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/credentialsModel");
const crypto = require('crypto')
//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async  (req, res)=>{
    const {Uname, email, password} = req.body;
    if(!Uname || !email || !password){
        res.status(400);
        return;
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(402);
        throw new Error("User already registered!");
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Psassword:", hashedPassword);
    const user = await User.create({
        Uname,
        email,
        password: hashedPassword,
    })
    console.log(`User created ${user}`)
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }else{
        res.status(400).json({message: "User not created"});
        // throw new Error("User data was not valid");
    }
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async  (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        //res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email});
    //compare password with hashedpassword
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESSS_TOKEN_SECERT,
        { expiresIn: "1d"}
        );
        res.status(200).json({accessToken});
    }else{
        //res.status(401);
        throw new Error("email or password is not valid");
    }
});
function generateToken() {
    return crypto.randomBytes(20).toString('hex');
  }
const forgot = asyncHandler(async(req,res)=>{
    const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const token = generateToken();
  const tokenExpiry = Date.now() + 3600000; // 1 hour
  user.resetToken = token;
  user.resetTokenExpiry = tokenExpiry;
  await user.save();
  res.status(200).json({ message: token });
  console.log("token generated", token)
})
const reset = asyncHandler(async(req,res)=>{
    const { email, token, Newpassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (user.resetToken !== token || user.resetTokenExpiry < Date.now()) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  // Update password
  user.password = Newpassword;
  const hashedPassword = await bcrypt.hash(Newpassword, 10);
  console.log("Hashed Psassword:", hashedPassword);
  user.password = hashedPassword;
  console.log(user.password);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();
  res.status(200).json({ message: 'Password reset successful' });
})

module.exports = {registerUser, loginUser, forgot, reset};
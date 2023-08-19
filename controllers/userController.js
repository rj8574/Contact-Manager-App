const asyncHandler =require("express-async-handler")
const bcyrpt=require("bcrypt")
const jwt =require("jsonwebtoken")
const User=require("../models/userModel");

const registerUser = asyncHandler(async (req,res)=>{
    const {userName ,email,password}=req.body;

    if(!userName||!email ||!password)
    {
        res.status(400);
        throw new Error("all fields are mandatory")
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable)
    {
        res.status(400)
        throw new Error("User already register")
    }
    const hashpassword=await bcyrpt.hash(password,10)
    console.log("hashed Password" ,hashpassword)
    const user=await User.create({
        userName ,
        email,
        password:hashpassword,
    })
    console.log(`user created ${user}`)
    if(user)
    {
        res.status(201).json({_id:user.id, email:user.email})
    }
    else{
        res.status(400);
        throw new Error("user data not valid");
    }
    res.json({message:"Register the user"})
});
const loginUser = asyncHandler(async (req,res)=>{
    const {email, password}=req.body;
    if(!email ||!password)
    {
        res.status(400)
        throw new Error("All fields mandatory")
    }
    const user =await User.findOne({email})
    if(user && (await bcyrpt.compare(password, user.password)))
    {
        const accessToken=jwt.sign(
            {
                user:{
                    username: user.username,
                    email: user.email,
                    id: user.id,
                 },
        },
        process.env.ACCESS_TOKEN_SECERT,
        {expiresIn:"15m"}
        );
        res.status(200).json({accessToken});

    }
    else{
        res.status(401);
        throw new Error ("Email or password not valid")
    }
   
   
});
const currentUser = asyncHandler(async (req,res)=>{
   res.json(req.user);
});

module.exports={registerUser,
    loginUser,
    currentUser}
import User from "../models/user.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
  );    
}

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
  ); 
}
let refreshTokens = [];

export async function handleSignUp(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(404).json({ message: "All fields are required" });

  try {
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(404).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword)
      return res.status(500).json({ message: "Error hashing password" });

    await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}


export async function handleLogin(req,res){
  const {email,password} = req.body;
  if(!email || !password) 
  return res.status(404).json({message : "Email and password required"});

  try {
    const user = await User.findOne({email});
    console.log("Login Attempt:", email);
    if(!user) res.status(404).json({message:"Invalid credentials"});

    const isMatch = await bcrypt.compare(password,user.password);
    console.log("Found user:", user);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    console.log("accessToken",accessToken)
    const refreshToken = generateRefreshToken(user);
    console.log("refreshToken",refreshToken)

    res.cookie("refreshToken",refreshToken,{
     httpOnly: true,
      secure: false,
      sameSite: "strict",
    })
    // console.log(res.headers)
    
    res.status(200).json({ accessToken });
  } catch (error) {
     console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
}

export async function handleRefreshToken(req, res) {
  const token = req.cookies.refreshToken;
  
  if (!token) {
    return res.status(404).json({ message: "Token is not available" });
  }

  console.log("Refresh token received:", token);

 jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const accessToken = generateAccessToken(user);
    return res.status(200).json({ accessToken });
  });
}


export async function handleLogout(req, res) {
  await res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false, 
    sameSite: "strict"
  });

  return res.status(200).json({ message: "Logged out successfully" });
}

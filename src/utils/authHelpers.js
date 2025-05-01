import bcrypt from "bcrypt";
import { accessTokenSecret, refreshTokenSecret, nodeEnvironment } from "../config/config.js";
import jwt from "jsonwebtoken";


export const encryptPassword = async (password)=>{
  const saltRounds = 11;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

export const generateAccessToken = (customerId)=>{
  return jwt.sign({ customerId }, accessTokenSecret, { expiresIn: '15m' }); 
};

export const generateRefreshToken = (customerId)=>{
  return jwt.sign({ customerId }, refreshTokenSecret, { expiresIn: '7d' }); 
};

export const sendRefreshTokenAsCookie = (res, token) =>{
    res.cookie("refreshToken", token, {
      httpOnly: true,  
      secure: nodeEnvironment === "production", 
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
  });
};
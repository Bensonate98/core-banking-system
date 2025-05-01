import jwt from "jsonwebtoken";
import AppError from "../utils/customError.js";
import ErrorTypes from "../constants/errorTypes.js";
import { accessTokenSecret } from "../config/config.js";

export const authenticateCustomer = (req, res, next)=>{
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer ")){
    throw new AppError("Access token not found, login", 401, ErrorTypes.UNAUTHORIZED);
  }
  const accessToken = authHeader.split(' ')[1];

  jwt.verify(accessToken, accessTokenSecret, (err, decoded)=>{
    if(err) throw new AppError("Invalid or expired access token, login", 401, ErrorTypes.UNAUTHORIZED);
    req.customer = decoded;
    next();
  });
}
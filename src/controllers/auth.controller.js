import sendResponse from "../utils/sendResponse.js";
import AuthService from "../services/auth.service.js";
import { sendRefreshTokenAsCookie } from "../utils/authHelpers.js";
import AppError from "../utils/customError.js";
import ErrorTypes from "../constants/errorTypes.js";
import logger from "../utils/logger.js";


const authService = new AuthService();

export const registerCustomer = async (req, res, next)=>{
  try{
    const { confirmPassword, ...customerData } = req.customer;
    const registeredCustomer = await authService.registerCustomer(customerData);
    return sendResponse(res, 201, "Customer Registration Successful", registeredCustomer);
  }
  catch(err){
    console.log(err)
    next(err);
  }
};

export const loginCustomer = async (req, res, next)=>{
  try{
    const loginData = req.customer;
    const { customerRecord, accessToken, refreshToken } = await authService.loginCustomer(loginData);
    const { password, ...sanitizedRecord } = customerRecord;
    authService.saveRefreshToken(refreshToken, sanitizedRecord.id);
    sendRefreshTokenAsCookie(res, refreshToken);
    logger.info(`User ${sanitizedRecord.email} logged in`);
    return sendResponse(res, 200, "Logged in successfully", {
      ...sanitizedRecord,
      accessToken
    });
  }
  catch(err){
    next(err);
  }
};

export const refreshToken = async (req, res, next)=>{
  const token = req.cookies.refreshToken;
  if(!token) throw new AppError("Refresh token token not found", 403, ErrorTypes.FORBIDDEN);
  try{
    const refreshedToken = await authService.refreshToken(token);
    return sendResponse(res, 200, "Access token refreshed successfully", {
      accessToken: refreshedToken
    });
  }
  catch(err){
    next(err);
  }
}

export const logoutCustomer = async (req, res, next)=>{
  try{
    const refreshToken = req.cookies.refreshToken;
    if(refreshToken){
      await authService.deleteRefreshToken(refreshToken);
    }
    res.clearCookie("refreshToken");
    return sendResponse(res, 200, "You are logged out!")
  }
  catch(err){
    next(err)
  }
}
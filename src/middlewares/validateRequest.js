import { registerSchema, loginSchema } from "../validations/auth.validation.js";
import { createAccountSchema } from "../validations/account.validation.js";
import AppError from "../utils/customError.js";
import ErrorTypes from "../constants/errorTypes.js";
import { depositSchema, transferSchema, withdrawalSchema } from "../validations/transaction.validation.js";

export const validateRegisterInput =  (req, res, next) =>{
  const customerData = req.body;
  const { error } = registerSchema.validate(customerData);
  if(error) throw new AppError(error.message, 400, ErrorTypes.VALIDATION_ERROR);
  req.customer = customerData;
  next();
};

export const validateLoginInput =  (req, res, next) =>{
  const loginData = req.body;
  const { error } = loginSchema.validate(loginData);
  if(error) throw new AppError(error.message, 400, ErrorTypes.VALIDATION_ERROR);
  req.customer = loginData;
  next();
}

export const validateCreateAccountInput = (req, res, next)=>{
  const requestData = req.body;
  const { error } = createAccountSchema.validate(requestData);
  if(error) throw new AppError(error.message, 400, ErrorTypes.VALIDATION_ERROR);
  req.account = requestData;
  next();
};

export const validateDepositInput = (req, res, next)=>{
  const depositData = req.body;
  const { error } = depositSchema.validate(depositData);
  if(error) throw new AppError(error.message, 400, ErrorTypes.VALIDATION_ERROR);
  req.deposit = depositData;
  next();
};

export const validateWithdrawalInput = (req, res, next)=>{
  const withdrawalData = req.body;
  const { error } = withdrawalSchema.validate(withdrawalData);
  if(error) throw new AppError(error.message, 400, ErrorTypes.VALIDATION_ERROR);
  req.withdrawal = withdrawalData;
  next();
};

export const validateTransfer = (req, res, next)=>{
  const transferData = req.body;
  const { error } = transferSchema.validate(transferData);
  if(error) throw new AppError(error.message, 400, ErrorTypes.VALIDATION_ERROR);
  req.transfer = transferData;
  next();
};
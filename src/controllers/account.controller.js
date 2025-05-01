import ErrorTypes from "../constants/errorTypes.js";
import AccountService from "../services/account.service.js";
import AppError from "../utils/customError.js";
import sendResponse from "../utils/sendResponse.js";

const accountService = new AccountService();

export const createAccount = async (req, res, next)=>{
  try{
    const { customerId } = req.customer;
    const { type } = req.account;
    const newAccount = await accountService.createAccount(customerId, type);
    return sendResponse(res, 201, "Account Created sccesfully", newAccount);
  }
  catch(err){
    next(err);
  }
}

export const getCustomerAccount = async (req, res, next)=>{
  try{
    const { customerId } = req.customer;
    const { accountNumber } = req.params;
    const accountDetails = await accountService.getCustomerAccount(accountNumber, customerId)
    if(!accountDetails) throw new AppError("Account not found", 404, ErrorTypes.NOT_FOUND);
    return sendResponse(res, 200, "Account details retrieved", accountDetails);
  }
  catch(err){
    next(err);
  }
}

export const updateAccountDetails = async (req, res, next)=>{
  try{
    const { customerId } = req.customer;
    const { type } = req.account;
    const { id } = req.params;
    const accountUpdate = await accountService.updateAccountDetails(id, customerId, type);
    return sendResponse(res, 200, "Account updated succesfully", accountUpdate);
  }
  catch(err){
    next(err);
  }
}

export const deactivateAccount = async (req, res, next)=>{
  try{
    const { customerId } = req.customer;
    const { id } = req.params;
    const closedAccount = await accountService.deactivateAccount(id, customerId);
    return sendResponse(res, 200, "Account deactivated successfully", closedAccount);
  }
  catch(err){
    next(err);
  }
}

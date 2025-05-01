import ErrorTypes from "../constants/errorTypes.js";
import TransactionService from "../services/transaction.service.js";
import AppError from "../utils/customError.js";
import sendResponse from "../utils/sendResponse.js";

const transactionService = new TransactionService();

export const deposit = async (req, res, next)=>{
  try{
    const { customerId } = req.customer;
    const { accountNumber, amount } = req.deposit;
    const customerDeposit = await transactionService.deposit(accountNumber, amount, customerId);
    return  sendResponse(res, 200, "Deposit successful", customerDeposit);
  }
  catch(err){
    next(err);
  }
};

export const withdraw = async(req, res, next)=>{
  try{
    const { customerId } = req.customer;
    const { accountNumber, amount } = req.withdrawal;
    const withdrawal = await transactionService.withdraw(accountNumber, amount, customerId);
    return  sendResponse(res, 200, "Withdrawal successful", withdrawal);
  }
  catch(err){
    next(err);
  }
}

export const transfer = async(req, res, next)=>{
  try{
    const { customerId } = req.customer;
    const {amount, fromAccountNumber, toAccountNumber} = req.transfer;
    console.log(amount, fromAccountNumber, toAccountNumber);
    const transferResponse = await transactionService.transfer(fromAccountNumber, toAccountNumber, amount, customerId);
    return sendResponse(res, 200, "Transfer successful", transferResponse);
  }
  catch(err){
    console.log(err)
    next(err);
  }
}

export const getTransactionHistory = async(req, res, next)=>{
  try{
    const { customerId } = req.customer;
    console.log(amount, fromAccountNumber, toAccountNumber);
    const transferResponse = await transactionService.transfer(fromAccountNumber, toAccountNumber, amount, customerId);
    return sendResponse(res, 200, "Transfer successful", transferResponse);
  }
  catch(err){
    console.log(err)
    next(err);
  }
}


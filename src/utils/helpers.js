import crypto from "crypto";
import AccountService from "../services/account.service.js";

const accountService = new AccountService();

export const generateAccountNumber = async(bankCode = "3")=>{
  let accountNumber, unique = false;
  do {
    accountNumber = bankCode + crypto.randomInt(100000000, 999999999).toString(); 
    const existingAccount = await accountService.getAccountByNumber(accountNumber);
    if(!existingAccount) unique = true;
  } while (!unique);
  
  return accountNumber;
}

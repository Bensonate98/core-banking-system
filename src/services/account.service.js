import prisma from "../config/db.js";
import ErrorTypes from "../constants/errorTypes.js";
import AppError from "../utils/customError.js";
import { generateAccountNumber } from "../utils/helpers.js";


class AccountService {

  async getAccountByNumber(accountNumber){
    return prisma.account.findFirst({
      where: { accountNumber }
    });
  }

  async getCustomerAccount(accountNumber, customerId){
    return prisma.account.findFirst({
      where: { accountNumber, customerId, status: "ACTIVE" }
    });
  }

  async createAccount(customerId, type){
    return prisma.account.create({
      data:{
        accountNumber: await generateAccountNumber(),
        type,
        customerId: parseInt(customerId)
      }
    });
  }

  async updateAccountDetails(id, customerId, type){
    const existingAccount = await prisma.account.findFirst({
      where: { id: parseInt(id), customerId, status: "ACTIVE"}
    });

    if(!existingAccount) throw new AppError("Account not found", 404, ErrorTypes.NOT_FOUND);
    return prisma.account.update({
      where: { id: parseInt(id) },
      data:{
        type
      }
    })
  }

  async deactivateAccount(id, customerId){
    const existingAccount = await prisma.account.findFirst({
      where: { id: parseInt(id), customerId, status: "ACTIVE" }
    });

    if(!existingAccount) throw new AppError("Account not found", 404, ErrorTypes.NOT_FOUND);
    if(existingAccount.balance > 0) 
      throw new AppError("Account must have zero balance to be closed", 404, ErrorTypes.NOT_FOUND);
    return prisma.account.update({
      where: { id: parseInt(id) },
      data:{
        status: "CLOSED",
        closedAt: new Date()
      }
    })
  }
}

export default AccountService;
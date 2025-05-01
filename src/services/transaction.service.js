import prisma from "../config/db.js";
import ErrorTypes from "../constants/errorTypes.js";
import AppError from "../utils/customError.js";
import logger from "../utils/logger.js"

class TransactionService {
  async deposit(accountNumber, amount, customerId){
    return await prisma.$transaction(async(tx)=>{
      const account = await tx.account.findFirst({
        where: { accountNumber, customerId, status: "ACTIVE" }
      });

      if(!account) throw new AppError("Account not found", 404, ErrorTypes.NOT_FOUND);

      await tx.account.update({
        where: { id: account.id },
        data: {
          balance: { increment: amount }
        }
      });
      logger.info(`Deposit: ₦${amount} to ${accountNumber} by user ${customerId}`);

      return await tx.transaction.create({
        data: {
          type: "DEPOSIT",
          amount,
          toAccountId: account.id 
        }
      });
    });
  }

  async withdraw(accountNumber, amount, customerId){
    return await prisma.$transaction(async(tx)=>{
      const account = await tx.account.findFirst({
        where: { accountNumber, customerId, status: "ACTIVE" }
      });

      if(!account) throw new AppError("Account not found", 404, ErrorTypes.NOT_FOUND);
      if(account.balance < amount) throw new AppError("Insufficient balance", 400, ErrorTypes.BAD_REQUEST);

      await tx.account.update({
        where: { id: account.id },
        data: {
          balance: { decrement: amount }
        }
      });

      logger.info(`Withdrawal: ₦${amount} from ${accountNumber} by user ${customerId}`);


      return await tx.transaction.create({
        data: {
          type: "WITHDRAWAL",
          amount,
          fromAccountId: account.id 
        }
      });
    });
  }

  async transfer(fromAccountNumber, toAccountNumber, amount, customerId) {
    if (fromAccountNumber === toAccountNumber) {
      throw new AppError('Cannot transfer to the same account', 400, ErrorTypes.BAD_REQUEST);
    }

    return prisma.$transaction(async (tx) => {
      const fromAccount = await tx.account.findFirst({
        where: {
          accountNumber: fromAccountNumber,
          customerId,
          status: "ACTIVE"
        }
      });

      if (!fromAccount) throw new AppError("Sender account not found", 404, ErrorTypes.NOT_FOUND);
      if (fromAccount.balance < amount) throw new AppError("Insufficient balance", 400, ErrorTypes.BAD_REQUEST);

      const toAccount = await tx.account.findFirst({
        where: {
          accountNumber: toAccountNumber,
          status: "ACTIVE"
        }
      });

      if (!toAccount) throw new AppError('Recipient account not found', 404);

      await tx.account.update({
        where: { id: fromAccount.id },
        data: { balance: { decrement: amount } }
      });

      await tx.account.update({
        where: { id: toAccount.id },
        data: { balance: { increment: amount } }
      });

      logger.info(
        `Transfer: ₦${amount} from ${fromAccountNumber} to ${toAccountNumber} by user ${customerId}`
      );    

      return await tx.transaction.create({
        data: {
          type: 'TRANSFER',
          amount,
          fromAccountId: fromAccount.id,
          toAccountId: toAccount.id
        }
      });
    });
  }

}

export default TransactionService;
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";
import { encryptPassword, comparePassword, generateAccessToken, generateRefreshToken } from "../utils/authHelpers.js";
import { refreshTokenSecret } from "../config/config.js"
import { generateAccountNumber } from "../utils/helpers.js";
import AppError from "../utils/customError.js";
import ErrorTypes from "../constants/errorTypes.js";

class AuthService {
  async registerCustomer(customerData){
    const hashedPassword = await encryptPassword(customerData.password);

    const result = await prisma.$transaction(async(tx)=>{
      const newCustomer = await tx.customer.create({
        data:{
          firstname: customerData.firstname,
          lastname: customerData.lastname,
          email: customerData.email,
          phone: customerData.phone,
          password: hashedPassword,
        }
      });

      const account = await tx.account.create({
        data: {
          accountNumber: await generateAccountNumber(),
          customerId: newCustomer.id
        }
      })
      const {password, ...customer } = newCustomer;
      const {closedAt, ...customerAccount } = account;
      return { customer, customerAccount};
    });
    return result;
  }

  async loginCustomer(loginData){
    const { email, password } = loginData;
    const customerRecord = await prisma.customer.findFirst({
      where: { email }
    });
    if(!customerRecord) throw new AppError("incorrect credentials", 404, ErrorTypes.NOT_FOUND);
    const match = await comparePassword(password, customerRecord.password);
    if(!match) throw new AppError("incorrect credentials", 404, ErrorTypes.NOT_FOUND);
    const accessToken = generateAccessToken(customerRecord.id);
    const refreshToken = generateRefreshToken(customerRecord.id);
    return { customerRecord, accessToken, refreshToken };
  }

  async saveRefreshToken(refreshToken, customerId){
    return await prisma.token.create({
      data:{
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        customer: { connect: { id: parseInt(customerId) } }
      }
    })
  }

  async refreshToken(token){
    const dbToken = await prisma.token.findFirst({
      where:{ refreshToken: token }
    });

    if(!dbToken || dbToken.expiresAt < new Date()){
      throw new AppError("Invalid or expired refresh token", 403, ErrorTypes.FORBIDDEN);
    }
      return generateAccessToken(dbToken.customerId); 
  }

  async deleteRefreshToken (refreshToken){
    return await prisma.token.deleteMany({
      where: { refreshToken }
    })
  }

}


export default AuthService;
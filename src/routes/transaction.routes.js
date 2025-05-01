import express from "express";
import { deposit, withdraw, transfer } from "../controllers/transaction.controller.js"
import { validateDepositInput, validateTransfer, validateWithdrawalInput } from "../middlewares/validateRequest.js";
import { authenticateCustomer } from "../middlewares/authCheck.js";


const router = express.Router();

router.post("/deposit", authenticateCustomer, validateDepositInput, deposit);
router.post("/withdraw", authenticateCustomer, validateWithdrawalInput, withdraw);
router.post("/transfer", authenticateCustomer, validateTransfer, transfer);


export default router;
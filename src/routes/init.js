import express from "express";
import authRoutes from "./auth.routes.js";
import accountRoutes from "../routes/account.routes.js";
import transactionRoutes from "../routes/transaction.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/accounts", accountRoutes);
router.use("/transactions", transactionRoutes);


export default router;
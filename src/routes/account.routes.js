import express from "express";
import { validateCreateAccountInput } from "../middlewares/validateRequest.js";
import { authenticateCustomer } from "../middlewares/authCheck.js"
import { createAccount, getCustomerAccount, updateAccountDetails, deactivateAccount } from "../controllers/account.controller.js";
const router = express.Router();

router.post("/", authenticateCustomer, validateCreateAccountInput, createAccount);
router.get("/:accountNumber", authenticateCustomer, getCustomerAccount);
router.patch("/:id", authenticateCustomer, validateCreateAccountInput, updateAccountDetails);
router.delete("/:id", authenticateCustomer, deactivateAccount);



export default router;
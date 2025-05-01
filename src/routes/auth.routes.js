import express from "express";
import { registerCustomer, loginCustomer, refreshToken, logoutCustomer } from "../controllers/auth.controller.js";
import { validateRegisterInput, validateLoginInput } from "../middlewares/validateRequest.js";
const router = express.Router();

router.post("/register", validateRegisterInput, registerCustomer);
router.post("/login", validateLoginInput, loginCustomer);
router.post("/refresh", refreshToken);
router.get("/logout", logoutCustomer);

export default router;
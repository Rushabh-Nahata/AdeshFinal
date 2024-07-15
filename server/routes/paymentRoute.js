import express from "express";
import { processPayment } from "../controllers/paymentControllers.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.post("/payment/process", processPayment);

export default router;

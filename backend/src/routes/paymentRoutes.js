import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { createPaymentOrder } from "../controllers/paymentController.js"

const router = express.Router()

router.post("/payment/create-order", authMiddleware, createPaymentOrder)

export default router
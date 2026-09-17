import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { createPaymentOrder, verifyPayment } from "../controllers/paymentController.js"

const router = express.Router()

router.post("/payment/create-order", authMiddleware, createPaymentOrder)
router.post("/payment/verify", authMiddleware, verifyPayment)

export default router
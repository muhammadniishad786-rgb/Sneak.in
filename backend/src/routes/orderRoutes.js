import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { createOrder } from "../controllers/orderController.js"

const router = express.Router()

router.post("/order", authMiddleware, createOrder)

export default router
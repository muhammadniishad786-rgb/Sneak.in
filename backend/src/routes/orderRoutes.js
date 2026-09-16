import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { createOrder, getOrderById } from "../controllers/orderController.js"

const router = express.Router()

router.post("/order", authMiddleware, createOrder)
router.get("/order/:id", authMiddleware, getOrderById)

export default router
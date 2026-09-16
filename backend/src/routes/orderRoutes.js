import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { createOrder, getOrderById, getOrders } from "../controllers/orderController.js"

const router = express.Router()

router.post("/order", authMiddleware, createOrder)
router.get("/order/:id", authMiddleware, getOrderById)
router.get("/order", authMiddleware, getOrders)

export default router
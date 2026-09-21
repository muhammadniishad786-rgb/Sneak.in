import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { cancelOrder, createOrder, getOrderById, getOrders } from "../controllers/orderController.js"

const router = express.Router()

router.post("/order", authMiddleware, createOrder)
router.get("/order/:id", authMiddleware, getOrderById)
router.get("/orders", authMiddleware, getOrders)
router.patch("/orders/:id/cancel", authMiddleware, cancelOrder)

export default router
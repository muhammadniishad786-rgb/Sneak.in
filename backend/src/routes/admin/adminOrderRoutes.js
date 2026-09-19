import express from "express"
import authMiddleware from "../../middleware/authMiddleware.js"
import adminMiddleware from "../../middleware/adminMiddleware.js"
import { getAdminOrderById, getAdminOrders, updateOrderStatus } from "../../controllers/admin/adminOrderController.js"

const router = express.Router()

router.get("/admin/orders", authMiddleware, adminMiddleware, getAdminOrders)
router.get("/admin/orders/:id", authMiddleware, adminMiddleware, getAdminOrderById)
router.put("/admin/orders/:id/status", authMiddleware, adminMiddleware, updateOrderStatus)

export default router
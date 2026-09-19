import express from "express"
import authMiddleware from "../../middleware/authMiddleware.js"
import adminMiddleware from "../../middleware/adminMiddleware.js"
import { getAdminOrders } from "../../controllers/admin/adminOrderController.js"

const router = express.Router()

router.get("/admin/orders", authMiddleware, adminMiddleware, getAdminOrders)

export default router
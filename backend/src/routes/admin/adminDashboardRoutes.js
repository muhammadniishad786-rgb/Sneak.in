import express from "express"
import authMiddleware from "../../middleware/authMiddleware.js"
import adminMiddleware from "../../middleware/adminMiddleware.js"
import { getAdminDashboard } from "../../controllers/admin/adminDashboardController.js"

const router = express.Router()

router.get("/admin/dashboard", authMiddleware, adminMiddleware, getAdminDashboard)

export default router
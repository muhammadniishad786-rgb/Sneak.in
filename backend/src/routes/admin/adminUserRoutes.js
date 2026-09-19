import express from "express"
import authMiddleware from "../../middleware/authMiddleware.js"
import adminMiddleware from "../../middleware/adminMiddleware.js"
import { getAdminUserById, getAdminUsers } from "../../controllers/admin/adminUserController.js"

const router = express.Router()

router.get("/admin/users", authMiddleware, adminMiddleware, getAdminUsers)
router.get("/admin/users/:id", authMiddleware, adminMiddleware, getAdminUserById)

export default router
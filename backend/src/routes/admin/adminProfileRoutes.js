import express from "express"
import authMiddleware from "../../middleware/authMiddleware.js"
import adminMiddleware from "../../middleware/adminMiddleware.js"
import { getAdminProfile, updateAdminProfile } from "../../controllers/admin/adminProfileController.js"

const router = express.Router()

router.get("/admin/profile", authMiddleware, adminMiddleware, getAdminProfile)
router.put("/admin/profile", authMiddleware, adminMiddleware, updateAdminProfile)

export default router
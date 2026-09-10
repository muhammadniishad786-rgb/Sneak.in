import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"
import { adminController } from "../controllers/adminController.js"

const router = express.Router()

router.get("/admin", authMiddleware, adminMiddleware, adminController)

export default router
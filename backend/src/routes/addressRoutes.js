import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { addAddress, deleteAddress, getAddresses, setDefaultAddress, updateAddress } from "../controllers/addressController.js"

const router = express.Router()

router.post("/address", authMiddleware, addAddress)
router.get("/address", authMiddleware, getAddresses)
router.put("/address/:id", authMiddleware, updateAddress)
router.delete("/address/:id", authMiddleware, deleteAddress)
router.patch("/address/:id/default", authMiddleware, setDefaultAddress)

export default router
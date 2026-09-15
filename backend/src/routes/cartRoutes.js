import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { addToCart, getCart, removeCartItem, updateCartItem } from "../controllers/cartController.js"

const router = express.Router()

router.post("/cart", authMiddleware, addToCart)
router.get("/cart", authMiddleware, getCart)
router.put("/cart/:itemId", authMiddleware, updateCartItem)
router.delete("/cart/:itemId", authMiddleware, removeCartItem)

export default router
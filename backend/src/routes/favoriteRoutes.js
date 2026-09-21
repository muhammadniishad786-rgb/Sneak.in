import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addFavorite, checkFavorite, getFavorites, removeFavorite } from "../controllers/favoriteController.js";



const router = express.Router();

// Get all favorites
router.get("/favorite", authMiddleware, getFavorites);

// Add a product to favorites
router.post("/favorite", authMiddleware, addFavorite);

// Check if product is favorited
router.get("/favorite/check/:productId", authMiddleware, checkFavorite);

// Remove product from favorites
router.delete("/favorite/:productId", authMiddleware, removeFavorite);

export default router;
import express from "express";

import {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

import protect from "../middleware/authMiddleware.js";
import reviewUpload from "../middleware/reviewUpload.js";

const router = express.Router();

// =========================
// Get all reviews for a product
// =========================
router.get("/review/:productId", getProductReviews);

// =========================
// Add a review
// Supports image upload
// =========================
router.post(
  "/review/:productId",
  protect,
  reviewUpload.single("image"),
  addReview
);

// =========================
// Update own review
// Supports image update
// =========================
router.patch(
  "/review/:reviewId",
  protect,
  reviewUpload.single("image"),
  updateReview
);

// =========================
// Delete own review
// =========================
router.delete(
  "/reveiw/:reviewId",
  protect,
  deleteReview
);

export default router;
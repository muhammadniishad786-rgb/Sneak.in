import Review from "../models/reviewModel.js";
import Product from "../models/productModel.js";

// =========================
// Add Review
// =========================
export const addReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;
    const { rating, comment } = req.body;

    // Check product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Check rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    // Check comment
    if (!comment || !comment.trim()) {
      return res.status(400).json({
        message: "Comment is required",
      });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      user: userId,
      product: productId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this product",
      });
    }

    // Create review
    const review = await Review.create({
      user: userId,
      product: productId,
      rating,
      comment,
      image: req.file ? `/uploads/reviews/${req.file.filename}` : null,
    });

    // Populate user information
    await review.populate("user", "name");

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    console.error("Add review error:", error);

    // Duplicate compound index protection
    if (error.code === 11000) {
      return res.status(400).json({
        message: "You have already reviewed this product",
      });
    }

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// Get Product Reviews
// =========================
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({
      product: productId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    console.error("Get reviews error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// Update Review
// =========================
export const updateReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    // Find review belonging to current user
    const review = await Review.findOne({
      _id: reviewId,
      user: userId,
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found or you are not the owner",
      });
    }

    // Validate rating
    if (rating !== undefined && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    // Validate comment
    if (comment !== undefined && !comment.trim()) {
      return res.status(400).json({
        message: "Comment cannot be empty",
      });
    }

    // Update rating
    if (rating !== undefined) {
      review.rating = rating;
    }

    // Update comment
    if (comment !== undefined) {
      review.comment = comment;
    }

    // Update image
    if (req.file) {
      review.image = `/uploads/reviews/${req.file.filename}`;
    }

    await review.save();

    await review.populate("user", "name");

    res.status(200).json({
      message: "Review updated successfully",
      review,
    });
  } catch (error) {
    console.error("Update review error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// Delete Review
// =========================
export const deleteReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { reviewId } = req.params;

    // Only owner can delete
    const review = await Review.findOneAndDelete({
      _id: reviewId,
      user: userId,
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found or you are not the owner",
      });
    }

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Delete review error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

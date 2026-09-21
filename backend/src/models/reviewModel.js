import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// One user can review a product only once
reviewSchema.index(
  { user: 1, product: 1 },
  { unique: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
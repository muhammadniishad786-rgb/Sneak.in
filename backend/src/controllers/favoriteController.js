import Favorite from "../models/favoriteModel.js";
import Product from "../models/productModel.js";

// Add product to favorites
export const addFavorite = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const existingFavorite = await Favorite.findOne({
      user: userId,
      product: productId,
    });

    if (existingFavorite) {
      return res.status(400).json({
        message: "Product already in favorites",
      });
    }

    const favorite = await Favorite.create({
      user: userId,
      product: productId,
    });

    res.status(201).json({
      message: "Product added to favorites",
      favorite,
    });
  } catch (error) {
    console.error("Add favorite error:", error);

    // Handle duplicate favorite
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Product already in favorites",
      });
    }

    res.status(500).json({
      message: "Failed to add favorite",
      error: error.message,
    });
  }
};

// Remove product from favorites
export const removeFavorite = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    const favorite = await Favorite.findOneAndDelete({
      user: userId,
      product: productId,
    });

    if (!favorite) {
      return res.status(404).json({
        message: "Favorite not found",
      });
    }

    res.status(200).json({
      message: "Product removed from favorites",
    });
  } catch (error) {
    console.error("Remove favorite error:", error);

    res.status(500).json({
      message: "Failed to remove favorite",
      error: error.message,
    });
  }
};

// Get user's favorites
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user.userId;

    const favorites = await Favorite.find({
      user: userId,
    })
      .populate("product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Favorites fetched successfully",
      favorites,
    });
  } catch (error) {
    console.error("Get favorites error:", error);

    res.status(500).json({
      message: "Failed to fetch favorites",
      error: error.message,
    });
  }
};

// Check if a product is favorited
export const checkFavorite = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    const favorite = await Favorite.findOne({
      user: userId,
      product: productId,
    });

    res.status(200).json({
      isFavorite: !!favorite,
    });
  } catch (error) {
    console.error("Check favorite error:", error);

    res.status(500).json({
      message: "Failed to check favorite",
      error: error.message,
    });
  }
};
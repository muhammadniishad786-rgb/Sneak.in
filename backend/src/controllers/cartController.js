import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js"

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, size } = req.body;

    const userId = req.user.userId;

    // 1. Check whether product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // 2. Find user's cart
    let cart = await Cart.findOne({ user: userId });

    // 3. If cart doesn't exist, create it
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [
          {
            product: productId,
            quantity,
            size,
          },
        ],
      });

      await cart.save();

      return res.status(201).json({
        message: "Product added to cart",
        cart,
      });
    }

    // 4. Check whether same product + same size already exists
    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.size === size
    );

    // 5. If it exists, increase quantity
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      // 6. Otherwise add new item
      cart.items.push({
        product: productId,
        quantity,
        size,
      });
    }

    // 7. Save updated cart
    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add product to cart",
      error: error.message,
    });
  }
};


// to get cart items 
export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product");

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    res.status(200).json({
      message: "Cart fetched successfully",
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cart",
      error: error.message
    });
  }
};

// to update the cart
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { itemId } = req.params;
    const { quantity } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    // Find the specific item
    const cartItem = cart.items.id(itemId);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }

    // Validate quantity
    if (quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1"
      });
    }

    // Update quantity
    cartItem.quantity = quantity;

    await cart.save();

    res.status(200).json({
      message: "Cart item updated successfully",
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update cart item",
      error: error.message
    });
  }
};

// to delete a specific product
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { itemId } = req.params;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    // Check whether the cart item exists
    const cartItem = cart.items.id(itemId);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }

    // Remove the item
    cart.items.pull(itemId);

    // Save updated cart
    await cart.save();

    res.status(200).json({
      message: "Cart item removed successfully",
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to remove cart item",
      error: error.message
    });
  }
};
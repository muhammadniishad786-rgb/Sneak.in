import "dotenv/config";
import Razorpay from "razorpay";
import crypto from "crypto";

import Cart from "../models/cartModel.js";
import Address from "../models/addressModel.js";
import Order from "../models/orderModel.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ========================================
// Create Razorpay Payment Order
// ========================================

export const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        message: "Amount is required",
      });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json({
      message: "Payment order created successfully",
      order,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);

    res.status(500).json({
      message: "Failed to create payment order",
      error: error.message,
    });
  }
};

// ========================================
// Verify Razorpay Payment + Create Order
// ========================================

export const verifyPayment = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      addressId,
    } = req.body;

    // ----------------------------------------
    // 1. Check required payment details
    // ----------------------------------------

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !addressId
    ) {
      return res.status(400).json({
        message: "Payment details and address are required",
      });
    }

    // ----------------------------------------
    // 2. Generate Razorpay signature
    // ----------------------------------------

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    // ----------------------------------------
    // 3. Verify payment signature
    // ----------------------------------------

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }

    // ----------------------------------------
    // 4. Get user's cart
    // ----------------------------------------

    const cart = await Cart.findOne({
      user: userId,
    }).populate("items.product");

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    if (cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // ----------------------------------------
    // 5. Get user's address
    // ----------------------------------------

    const address = await Address.findOne({
      _id: addressId,
      user: userId,
    });

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    // ----------------------------------------
    // 6. Create order items
    // ----------------------------------------

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      size: item.size,
    }));

    // ----------------------------------------
    // 7. Calculate total amount
    // ----------------------------------------

    const totalAmount = orderItems.reduce(
      (total, item) => {
        return total + item.price * item.quantity;
      },
      0
    );

    // ----------------------------------------
    // 8. Generate Sneak.in order number
    // ----------------------------------------

    const orderNumber = `ORD-${Date.now()}-${Math.floor(
      Math.random() * 1000
    )}`;

    // ----------------------------------------
    // 9. Create Sneak.in order
    // ----------------------------------------

    const order = await Order.create({
      orderNumber,

      user: userId,

      items: orderItems,

      shippingAddress: {
        name: address.name,
        phone: address.phone,
        addressLine: address.addressLine,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      },

      totalAmount,

      paymentMethod: "RAZORPAY",

      paymentStatus: "Paid",

      razorpayOrderId: razorpay_order_id,

      razorpayPaymentId: razorpay_payment_id,

      orderStatus: "Placed",
    });

    // ----------------------------------------
    // 10. Clear user's cart
    // ----------------------------------------

    cart.items = [];

    await cart.save();

    // ----------------------------------------
    // 11. Send response
    // ----------------------------------------

    res.status(200).json({
      message:
        "Payment verified and order created successfully",

      order,
    });
  } catch (error) {
    console.error(
      "Payment verification error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to verify payment and create order",

      error: error.message,
    });
  }
};

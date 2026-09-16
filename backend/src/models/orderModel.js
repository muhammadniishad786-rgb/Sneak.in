import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },

    // User who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Products included in the order
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        size: {
          type: String,
          required: true,
        },
      },
    ],

    // Shipping address snapshot
    shippingAddress: {
      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      addressLine: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      pincode: {
        type: String,
        required: true,
      },
    },

    // Total order amount
    totalAmount: {
      type: Number,
      required: true,
    },

    // Payment method
    paymentMethod: {
      type: String,
      enum: ["COD", "RAZORPAY"],
      default: "COD",
    },

    // Payment status
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    // Order status
    orderStatus: {
      type: String,
      enum: ["Placed", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Placed",
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

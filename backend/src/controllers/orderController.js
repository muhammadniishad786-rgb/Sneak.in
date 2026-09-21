import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Address from "../models/addressModel.js";

export const createOrder = async (req, res) => {
  try {
    // 1. Get logged-in user's ID
    const userId = req.user.userId;

    // 2. Get address ID and payment method
    const { addressId, paymentMethod } = req.body;

    // 3. Find user's cart
    const cart = await Cart.findOne({
      user: userId,
    }).populate("items.product");

    // 4. Check whether cart exists
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    // 5. Check whether cart has products
    if (cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // 6. Check product stock
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          message: `Only ${item.product.stock} units of ${item.product.name} are available`,
        });
      }
    }

    // 7. Find the selected address
    const address = await Address.findOne({
      _id: addressId,
      user: userId,
    });

    // 8. Check whether address exists
    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    // 9. Convert cart items into order items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      size: item.size,
    }));

    // 10. Calculate total amount
    const totalAmount = orderItems.reduce(
      (total, item) => {
        return total + item.price * item.quantity;
      },
      0
    );

    // 11. Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.floor(
      Math.random() * 1000
    )}`;

    // 12. Create order
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

      paymentMethod: paymentMethod || "COD",

      paymentStatus: "Pending",

      orderStatus: "Placed",
    });

    // 13. Reduce product stock
    for (const item of cart.items) {
      item.product.stock -= item.quantity;

      await item.product.save();
    }

    // 14. Clear cart after successful order creation
    cart.items = [];

    await cart.save();

    // 15. Return successful response
    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// get order status

export const getOrderById = async (req, res) => {
  try {
    // 1. Get logged-in user's ID
    const userId = req.user.userId;

    // 2. Get order ID from URL
    const { id } = req.params;

    // 3. Find order belonging to this user
    const order = await Order.findOne({
      _id: id,
      user: userId,
    }).populate("items.product");

    // 4. Check whether order exists
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // 5. Return order
    res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    console.error("Get order error:", error);

    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// get all orders
export const getOrders = async (req, res) => {
  try {
    // Get logged-in user's ID from JWT
    const userId = req.user.userId;

    // Find all orders belonging to this user
    const orders = await Order.find({
      user: userId,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};


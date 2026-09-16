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

    // 6. Find the selected address
    const address = await Address.findOne({
      _id: addressId,
      user: userId,
    });

    // 7. Check whether address exists
    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    // 8. Convert cart items into order items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      size: item.size,
    }));

    // 9. Calculate total amount
    const totalAmount = orderItems.reduce(
      (total, item) => {
        return total + item.price * item.quantity;
      },
      0
    );

    // 10. Create order
    const order = await Order.create({
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

    // 11. Clear cart after successful order creation
    cart.items = [];

    await cart.save();

    // 12. Return successful response
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

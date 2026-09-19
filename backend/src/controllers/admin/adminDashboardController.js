import Order from "../../models/orderModel.js";
import Product from "../../models/productModel.js";
import User from "../../models/userModel.js";

export const getAdminDashboard = async (req, res) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments({
      role: "user",
    });

    // Total products
    const totalProducts = await Product.countDocuments();

    // Total orders
    const totalOrders = await Order.countDocuments();

    // Pending orders
    const pendingOrders = await Order.countDocuments({
      orderStatus: {
        $in: ["Placed", "Confirmed", "Shipped"],
      },
    });

    // Total revenue
    const revenueResult = await Order.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    // Low stock products
    const lowStockProducts = await Product.find({
      stock: {
        $lte: 5,
      },
    })
      .select("name stock image")
      .sort({ stock: 1 });

    // Recent orders
    const recentOrders = await Order.find()
      .populate("user", "name email")
      .select(
        "orderNumber user totalAmount paymentStatus orderStatus createdAt",
      )
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      message: "Dashboard data fetched successfully",
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        pendingOrders,
      },
      lowStockProducts,
      recentOrders,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    res.status(500).json({
      message: "Failed to fetch dashboard data",
      error: error.message,
    });
  }
};

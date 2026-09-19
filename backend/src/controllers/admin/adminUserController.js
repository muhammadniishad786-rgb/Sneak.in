import User from "../../models/userModel.js";

// Get all users
export const getAdminUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Get admin users error:", error);

    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// Get single user
export const getAdminUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Get admin user by ID error:", error);

    res.status(500).json({
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

// Block / Unblock user
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isBlocked } = req.body;

    // Validate input
    if (typeof isBlocked !== "boolean") {
      return res.status(400).json({
        message: "isBlocked must be true or false",
      });
    }

    // Find user
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Prevent admin from blocking an admin
    if (user.role === "admin") {
      return res.status(403).json({
        message: "Admin users cannot be blocked",
      });
    }

    // Update status
    user.isBlocked = isBlocked;

    await user.save();

    res.status(200).json({
      message: isBlocked
        ? "User blocked successfully"
        : "User unblocked successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isBlocked: user.isBlocked,
      },
    });
  } catch (error) {
    console.error("Update user status error:", error);

    res.status(500).json({
      message: "Failed to update user status",
      error: error.message,
    });
  }
};


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

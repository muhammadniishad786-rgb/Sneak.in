import User from "../models/userModel.js";

export const getProfile = async (req, res) => {
  try {
    // Get user ID from the verified JWT
    const userId = req.user.userId;

    // Find that user in MongoDB
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(200).json({
        message: "user not found",
      });
    }
    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { name, email } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name;
    user.email = email;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

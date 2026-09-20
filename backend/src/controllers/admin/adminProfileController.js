import User from "../../models/userModel.js";

// ============================================
// GET ADMIN PROFILE
// ============================================

export const getAdminProfile = async (req, res) => {
  try {
    // Get logged-in admin ID from JWT
    const adminId = req.user.userId;

    const admin = await User.findById(adminId).select(
      "-password"
    );

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    // Make sure the logged-in user is actually an admin
    if (admin.role !== "admin") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    res.status(200).json({
      message: "Admin profile fetched successfully",
      user: admin,
    });
  } catch (error) {
    console.error("Get admin profile error:", error);

    res.status(500).json({
      message: "Failed to fetch admin profile",
      error: error.message,
    });
  }
};


// ============================================
// UPDATE ADMIN PROFILE
// ============================================

export const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.userId;

    const { name, email } = req.body;

    const admin = await User.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    if (admin.role !== "admin") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    // Update name if provided
    if (name) {
      admin.name = name;
    }

    // Update email if provided
    if (email) {
      admin.email = email;
    }

    await admin.save();

    // Don't send password back
    const updatedAdmin = await User.findById(adminId).select(
      "-password"
    );

    res.status(200).json({
      message: "Admin profile updated successfully",
      user: updatedAdmin,
    });
  } catch (error) {
    console.error("Update admin profile error:", error);

    res.status(500).json({
      message: "Failed to update admin profile",
      error: error.message,
    });
  }
};

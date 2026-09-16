import Address from "../models/addressModel.js";

// to create address
export const addAddress = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      name,
      phone,
      addressLine,
      city,
      state,
      pincode,
      isDefault,
    } = req.body;

    const address = await Address.create({
      user: userId,
      name,
      phone,
      addressLine,
      city,
      state,
      pincode,
      isDefault,
    });

    res.status(201).json({
      message: "Address added successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add address",
      error: error.message,
    });
  }
};

// to fetch address
export const getAddresses = async (req, res) => {
  try {
    const userId = req.user.userId;

    const addresses = await Address.find({ user: userId });

    res.status(200).json({
      message: "Addresses fetched successfully",
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch addresses",
      error: error.message,
    });
  }
};

// to update address
export const updateAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const {
      name,
      phone,
      addressLine,
      city,
      state,
      pincode,
      isDefault,
    } = req.body;

    const address = await Address.findOneAndUpdate(
      {
        _id: id,
        user: userId,
      },
      {
        name,
        phone,
        addressLine,
        city,
        state,
        pincode,
        isDefault,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    res.status(200).json({
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update address",
      error: error.message,
    });
  }
};

// to delete addresses
export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const address = await Address.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    res.status(200).json({
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete address",
      error: error.message,
    });
  }
};

// to set a default address
export const setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    // First, make all user's addresses non-default
    await Address.updateMany(
      { user: userId },
      { isDefault: false }
    );

    // Then, make the selected address default
    const address = await Address.findOneAndUpdate(
      {
        _id: id,
        user: userId,
      },
      {
        isDefault: true,
      },
      {
        new: true,
      }
    );

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    res.status(200).json({
      message: "Default address updated successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to set default address",
      error: error.message,
    });
  }
};
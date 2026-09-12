import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken"

// register controller
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //1. check user exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({
        message: "user already exist",
      });
    }

    //2. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. create user
    const users = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // 3. response
    res.status(200).json({
      message: "user register successful",
      user: {
        id: users._id,
        name: users.name,
        email: users.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

// login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 2. Compare password
    const comparePassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!comparePassword) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 3. Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_TOKEN,
      {
        expiresIn: "30d",
      }
    );

    // 4. Send response
    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

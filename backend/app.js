import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import { connectDB } from "./src/config/connectDB.js";
import authRoute from "./src/routes/authRoutes.js";
import userRoute from "./src/routes/userRoutes.js";
import productRoute from "./src/routes/productRoutes.js";
import cartRoute from "./src/routes/cartRoutes.js"
import addressRoute from "./src/routes/addressRoutes.js"
import orderRoute from "./src/routes/orderRoutes.js"
import paymentRoute from "./src/routes/paymentRoutes.js"

import adminProductRoute from "./src/routes/admin/adminProductRoute.js"
import adminOrderRoute from "./src/routes/admin/adminOrderRoutes.js"
import adminUserRoute from "./src/routes/admin/adminUserRoutes.js"
import adminDashboardRoute from "./src/routes/admin/adminDashboardRoutes.js"
import path from "path";

console.log(process.env.RAZORPAY_KEY_ID)
console.log(process.env.RAZORPAY_KEY_SECRET);

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api", userRoute);
app.use("/api", productRoute);
app.use("/api", cartRoute)
app.use("/api", addressRoute)
app.use("/api", orderRoute)
app.use("/api", paymentRoute)
// admin routes
app.use("/api", adminProductRoute)
app.use("/api", adminOrderRoute)
app.use("/api", adminUserRoute)
app.use("/api", adminDashboardRoute)

// Serve uploaded images
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "src", "uploads"))
);

// MongoDB connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});